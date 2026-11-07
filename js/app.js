(function () {
      'use strict';

      // Safe LocalStorage Helpers
      const STORAGE_KEYS = {
        THEME: 'k_explore_theme_v1',
        REGISTRATIONS: 'k_explore_registrations_v1',
        BOOKMARKS: 'k_explore_bookmarks_v1'
      };

      function safeGetStorage(key, fallback) {
        try {
          const raw = window.localStorage.getItem(key);
          return raw ? JSON.parse(raw) : fallback;
        } catch (err) {
          return fallback;
        }
      }

      function safeSetStorage(key, value) {
        try {
          window.localStorage.setItem(key, JSON.stringify(value));
        } catch (err) {
          // Ignore quota/iframe storage restrictions gracefully
        }
      }

      // Dynamic future timestamps relative to current moment so countdowns are ALWAYS live
      const nowMs = Date.now();
      const DAY_MS = 86400000;
      const HOUR_MS = 3600000;

      function buildFutureDate(daysAhead, hoursAhead) {
        return new Date(nowMs + daysAhead * DAY_MS + hoursAhead * HOUR_MS);
      }

      function formatReadableDate(dateObj) {
        return dateObj.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
      }

      // Curated Events Catalog with Custom High-Res Images
      const EVENTS_DATA = [
        {
          id: 'evt-ai-hackathon',
          name: 'K-Nexa AI & Next-Gen Dev Hackathon 2026',
          category: 'Technology',
          featured: true,
          targetDate: buildFutureDate(3, 14),
          timeLabel: '09:30 AM - 06:00 PM IST',
          venue: 'Central Innovation Atrium, Campus Block B',
          totalSeats: 120,
          baseTakenSeats: 52,
          image: 'assets/images/event-ai-hackathon.jpg',
          shortDescription: '36-hour collaborative coding marathon building autonomous AI agents, multimodal web apps, and cloud-native developer tools.',
          fullDescription: 'Join top student developers, AI researchers, and industry mentors for a high-energy hackathon experience. Teams of 1 to 4 builders compete across Generative AI, FinTech, and Sustainable Campus tracks with live cloud credits and instant prototype feedback.',
          agenda: [
            '09:30 AM — Opening Keynote & Problem Statement Reveal',
            '11:00 AM — Architecture Mentoring & API Workshop',
            '02:30 PM — Mid-Sprint Prototype Evaluation & Lightning Demos',
            '05:00 PM — Final Jury Pitch & Winner Felicitation'
          ],
          speakers: [
            'Dr. Ananya Verma (Principal AI Architect, CloudScale Labs)',
            'Rohan Mehta (Staff Frontend Engineer & Open Source Maintainer)',
            'Perks: ₹1,50,000 Prize Pool, Cloud Credits & Official Swag Kit'
          ]
        },
        {
          id: 'evt-cultural-night',
          name: 'K-Pulse Acoustic & Cultural Amphitheater Night',
          category: 'Cultural',
          featured: true,
          targetDate: buildFutureDate(6, 19),
          timeLabel: '06:00 PM - 10:30 PM IST',
          venue: 'Open-Air Heritage Amphitheater',
          totalSeats: 250,
          baseTakenSeats: 164,
          image: 'assets/images/event-cultural-night.jpg',
          shortDescription: 'An enchanting evening of indie acoustic bands, classical fusion ensembles, live theatrical arts, and campus fest celebrations.',
          fullDescription: 'Experience the vibrant artistic heartbeat of campus under the string lights of the Open-Air Heritage Amphitheater. Featuring 8 curated student bands, contemporary folk fusion, spoken word poetry, and interactive light installations.',
          agenda: [
            '06:00 PM — Gates Open & Acoustic Sunset Sessions',
            '07:15 PM — Classical & Contemporary Fusion Ensemble',
            '08:30 PM — Headliner Indie Band Live Performance',
            '09:45 PM — Starlight Jam & Cultural Awards'
          ],
          speakers: [
            'The EchoVerse Collective (National Campus Battle of Bands Winners)',
            'Aarohi Performing Arts Society',
            'Perks: Complimentary Festival Wristband & Food Court Vouchers'
          ]
        },
        {
          id: 'evt-ux-masterclass',
          name: 'PixelCraft UI/UX Design Systems & Figma Sprint',
          category: 'Design',
          featured: false,
          targetDate: buildFutureDate(9, 11),
          timeLabel: '10:30 AM - 04:00 PM IST',
          venue: 'Creative Design Studio, Floor 3, Architecture Wing',
          totalSeats: 80,
          baseTakenSeats: 48,
          image: 'assets/images/event-ux-workshop.jpg',
          shortDescription: 'Hands-on product design workshop covering design tokens, micro-interactions, accessibility standards, and rapid prototyping.',
          fullDescription: 'Master modern interface engineering in this intensive studio workshop. Participants will audit real-world mobile and web workflows, construct scalable Figma component libraries with dark/light tokens, and present interactive prototypes.',
          agenda: [
            '10:30 AM — Foundations of Visual Hierarchy & Color Systems',
            '12:00 PM — Building Multi-Brand Tokens & Auto-Layout Systems',
            '02:00 PM — Live Redesign Challenge & Accessibility Critique',
            '03:30 PM — Portfolio Reviews & Certificate Distribution'
          ],
          speakers: [
            'Meera Krishnan (Lead Product Designer, FinVerse Studio)',
            'Kabir Sen (Design Systems Advocate)',
            'Perks: Figma Pro Templates, UX Checklist & Verified Certificate'
          ]
        },
        {
          id: 'evt-robotics-expo',
          name: 'MechaNova Autonomous Robotics & Drone Expo',
          category: 'Robotics',
          featured: true,
          targetDate: buildFutureDate(12, 10),
          timeLabel: '10:00 AM - 05:00 PM IST',
          venue: 'Main Engineering Hangar & Flight Cage',
          totalSeats: 150,
          baseTakenSeats: 89,
          image: 'assets/images/event-robotics-expo.jpg',
          shortDescription: 'Live quadruped robot demonstrations, FPV autonomous drone obstacle trials, and embedded ROS2 hardware showcases.',
          fullDescription: 'Step inside the Engineering Hangar to witness cutting-edge robotics prototypes built by student labs and hardware startups. Includes an indoor netted drone flight arena, quadruped locomotion demos, and PCB soldering stations.',
          agenda: [
            '10:00 AM — Quadruped & Biped Locomotion Live Showcase',
            '11:45 AM — Autonomous Vision Drone Obstacle Time-Trials',
            '02:00 PM — Embedded Edge AI & ROS2 Hands-on Clinic',
            '04:15 PM — Best Hardware Prototype Awards'
          ],
          speakers: [
            'Prof. Devendra Rao (Head, Center for Autonomous Systems)',
            'AeroPulse Student Flight Team',
            'Perks: Lab Access Pass, Hardware Schematics Pack & Refreshments'
          ]
        },
        {
          id: 'evt-startup-summit',
          name: 'K-Venture Startup Pitch & Founder Summit',
          category: 'Entrepreneurship',
          featured: false,
          targetDate: buildFutureDate(15, 15),
          timeLabel: '11:00 AM - 05:30 PM IST',
          venue: 'Executive Convention Auditorium',
          totalSeats: 180,
          baseTakenSeats: 96,
          image: 'assets/images/event-startup-summit.jpg',
          shortDescription: 'Pitch your campus startup to seed investors, learn zero-to-one product validation, and network with YC & unicorn alumni.',
          fullDescription: 'Whether you have an early-stage idea or a revenue-generating campus startup, K-Venture connects student founders directly with angel investors, incubator leads, and product operators for live pitch feedback and seed grants.',
          agenda: [
            '11:00 AM — Fireside Chat: From Campus Dorm to Series A',
            '01:00 PM — Founder Networking Lunch & Mentor Speed-Dating',
            '02:30 PM — Top 10 Student Startup Live Pitch Battle',
            '04:45 PM — Seed Grant Announcement & Closing Keynote'
          ],
          speakers: [
            'Vikramaditya Nair (Managing Partner, Horizon Seed Fund)',
            'Neha Kulkarni (Co-Founder & CEO, StackFlow AI)',
            'Perks: Investor Pitch Deck Template & Incubation Fast-Track'
          ]
        },
        {
          id: 'evt-esports-arena',
          name: 'Nexus Campus Esports Championship & Game Dev Expo',
          category: 'Esports',
          featured: false,
          targetDate: buildFutureDate(19, 16),
          timeLabel: '12:00 PM - 08:00 PM IST',
          venue: 'Indoor Sports Complex & Digital Arena',
          totalSeats: 200,
          baseTakenSeats: 119,
          image: 'assets/images/event-esports-arena.jpg',
          shortDescription: 'High-stakes LAN esports finals, Unreal Engine 5 & Unity indie game booths, and live shoutcasted team tournaments.',
          fullDescription: 'The ultimate convergence of competitive gaming and interactive game development. Watch the top collegiate rosters clash on stage while exploring 15+ student-built indie games in the Playtest Zone.',
          agenda: [
            '12:00 PM — Indie Game Developer Showcase & VR Playtest Zone',
            '02:00 PM — Tactical Shooter & MOBA Semi-Finals (Live LAN)',
            '04:30 PM — Shader Art & Real-Time Physics Tech Talk',
            '06:00 PM — Grand Finals on Main Stage & Trophy Ceremony'
          ],
          speakers: [
            'Siddharth "Vortex" Roy (Pro Esports Shoutcaster & Analyst)',
            'PixelForge Campus Game Dev Guild',
            'Perks: Arena Collector Lanyard, Energy Drink Bar & Digital Loot Code'
          ]
        }
      ];

      // Application State
      let state = {
        searchQuery: '',
        selectedCategory: 'All',
        sortBy: 'date-asc',
        featuredOnly: false,
        bookmarksOnly: false,
        selectedEventId: EVENTS_DATA[0].id,
        activeModalEventId: null,
        activeTicketRegId: null,
        regManagerQuery: '',
        registrations: safeGetStorage(STORAGE_KEYS.REGISTRATIONS, null),
        bookmarks: safeGetStorage(STORAGE_KEYS.BOOKMARKS, ['evt-ai-hackathon'])
      };

      // Seed 2 initial realistic registrations on very first visit so LocalStorage table is immediately informative
      if (!Array.isArray(state.registrations)) {
        state.registrations = [
          {
            passId: 'KEXP-2026-4819',
            name: 'Priya Nair',
            email: 'priya.nair@kexplore.edu',
            phone: '+91 9823412098',
            eventId: 'evt-ai-hackathon',
            eventName: 'K-Nexa AI & Next-Gen Dev Hackathon 2026',
            passTier: 'Team / Hackathon Delegate Pass',
            college: 'CSE - 2305182',
            notes: 'Team QuantumByte',
            timestamp: new Date(nowMs - 3600000 * 5).toLocaleString('en-US', {
              month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
            })
          },
          {
            passId: 'KEXP-2026-7304',
            name: 'Rohan Deshmukh',
            email: 'rohan.d@kexplore.edu',
            phone: '+91 9765019283',
            eventId: 'evt-cultural-night',
            eventName: 'K-Pulse Acoustic & Cultural Amphitheater Night',
            passTier: 'Standard Student Pass (Free)',
            college: 'ECE - 2304091',
            notes: 'Acoustic Guitar Club',
            timestamp: new Date(nowMs - 3600000 * 2).toLocaleString('en-US', {
              month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
            })
          }
        ];
        safeSetStorage(STORAGE_KEYS.REGISTRATIONS, state.registrations);
      }

      // Calculate remaining seats dynamically based on stored registrations
      function getEventSeatStats(eventObj) {
        const extraRegs = state.registrations.filter(function (r) {
          return r.eventId === eventObj.id;
        }).length;
        const taken = Math.min(eventObj.totalSeats, eventObj.baseTakenSeats + extraRegs);
        const remaining = Math.max(0, eventObj.totalSeats - taken);
        const percentFull = Math.min(100, Math.round((taken / eventObj.totalSeats) * 100));
        return { taken: taken, remaining: remaining, percentFull: percentFull };
      }

      // Format countdown breakdown
      function getCountdownParts(targetDate) {
        const diff = Math.max(0, targetDate.getTime() - Date.now());
        const days = Math.floor(diff / DAY_MS);
        const hours = Math.floor((diff % DAY_MS) / HOUR_MS);
        const minutes = Math.floor((diff % HOUR_MS) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        return {
          days: String(days).padStart(2, '0'),
          hours: String(hours).padStart(2, '0'),
          minutes: String(minutes).padStart(2, '0'),
          seconds: String(seconds).padStart(2, '0')
        };
      }

      // Toast Notification Helper
      function showToast(message, type) {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        const toast = document.createElement('div');
        const bgClass = type === 'error'
          ? 'bg-rose-600 text-white border-rose-500'
          : type === 'info'
          ? 'bg-indigo-600 text-white border-indigo-500'
          : 'bg-emerald-600 text-white border-emerald-500';

        toast.className = 'pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-2xl shadow-xl border text-xs sm:text-sm font-semibold animate-scale-pop ' + bgClass;
        toast.innerHTML = '<span>' + escapeHtml(message) + '</span>' +
          '<button type="button" class="opacity-80 hover:opacity-100 font-bold text-base leading-none">&times;</button>';

        toast.querySelector('button').addEventListener('click', function () {
          toast.remove();
        });
        container.appendChild(toast);
        setTimeout(function () {
          if (toast.parentNode) toast.remove();
        }, 4000);
      }

      function escapeHtml(str) {
        return String(str || '')
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
      }

      // 1. Theme Manager (Dark / Light Mode Bonus Feature)
      function initTheme() {
        const savedTheme = safeGetStorage(STORAGE_KEYS.THEME, 'dark');
        applyTheme(savedTheme);

        const toggleBtn = document.getElementById('themeToggleBtn');
        if (toggleBtn) {
          toggleBtn.addEventListener('click', function () {
            const isDark = document.documentElement.classList.contains('dark');
            const nextTheme = isDark ? 'light' : 'dark';
            applyTheme(nextTheme);
            safeSetStorage(STORAGE_KEYS.THEME, nextTheme);
            showToast('Switched to ' + (nextTheme === 'dark' ? 'Dark' : 'Light') + ' Mode', 'info');
          });
        }
      }

      function applyTheme(theme) {
        const root = document.documentElement;
        const textSpan = document.getElementById('themeToggleText');
        if (theme === 'dark') {
          root.classList.add('dark');
          if (textSpan) textSpan.textContent = 'Light';
        } else {
          root.classList.remove('dark');
          if (textSpan) textSpan.textContent = 'Dark';
        }
      }

      // 2. Render Hero & Global Metrics
      function updateGlobalMetrics() {
        let totalOpenSeats = 0;
        EVENTS_DATA.forEach(function (ev) {
          totalOpenSeats += getEventSeatStats(ev).remaining;
        });

        const statTotalEvents = document.getElementById('statTotalEvents');
        const statOpenSeats = document.getElementById('statOpenSeats');
        const statSavedRegs = document.getElementById('statSavedRegs');
        const navBadge = document.getElementById('navRegCountBadge');
        const mobileBadge = document.getElementById('mobileRegCountBadge');
        const bookmarkBadge = document.getElementById('bookmarkCountBadge');
        const navBookmarkBtn = document.getElementById('navBookmarkBtn');

        if (statTotalEvents) statTotalEvents.textContent = String(EVENTS_DATA.length);
        if (statOpenSeats) statOpenSeats.textContent = String(totalOpenSeats);
        if (statSavedRegs) statSavedRegs.textContent = String(state.registrations.length);
        if (navBadge) navBadge.textContent = String(state.registrations.length);
        if (mobileBadge) mobileBadge.textContent = String(state.registrations.length);

        if (bookmarkBadge) {
          if (state.bookmarks.length > 0) {
            bookmarkBadge.textContent = String(state.bookmarks.length);
            bookmarkBadge.classList.remove('hidden');
          } else {
            bookmarkBadge.classList.add('hidden');
          }
        }
        if (navBookmarkBtn) {
          if (state.bookmarksOnly) {
            navBookmarkBtn.classList.add('ring-2', 'ring-indigo-500', 'text-indigo-600', 'dark:text-indigo-400');
          } else {
            navBookmarkBtn.classList.remove('ring-2', 'ring-indigo-500', 'text-indigo-600', 'dark:text-indigo-400');
          }
        }

        const heroDateEl = document.getElementById('heroSpotlightDate');
        if (heroDateEl) {
          heroDateEl.textContent = formatReadableDate(EVENTS_DATA[0].targetDate) + ' • ' + EVENTS_DATA[0].timeLabel;
        }
      }

      // 3. Filter, Sort & Render Event Cards
      function getFilteredEvents() {
        const q = state.searchQuery.trim().toLowerCase();
        let list = EVENTS_DATA.filter(function (ev) {
          if (state.selectedCategory !== 'All' && ev.category !== state.selectedCategory) {
            return false;
          }
          if (state.featuredOnly && !ev.featured) {
            return false;
          }
          if (state.bookmarksOnly && state.bookmarks.indexOf(ev.id) === -1) {
            return false;
          }
          if (q) {
            const haystack = (
              ev.name + ' ' +
              ev.category + ' ' +
              ev.venue + ' ' +
              ev.shortDescription + ' ' +
              ev.fullDescription
            ).toLowerCase();
            if (haystack.indexOf(q) === -1) return false;
          }
          return true;
        });

        list.sort(function (a, b) {
          if (state.sortBy === 'date-asc') {
            return a.targetDate.getTime() - b.targetDate.getTime();
          }
          if (state.sortBy === 'featured') {
            return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
          }
          if (state.sortBy === 'seats-asc') {
            return getEventSeatStats(a).remaining - getEventSeatStats(b).remaining;
          }
          if (state.sortBy === 'name-asc') {
            return a.name.localeCompare(b.name);
          }
          return 0;
        });

        return list;
      }

      function renderEventsGrid() {
        const grid = document.getElementById('eventsGrid');
        const emptyState = document.getElementById('eventsEmptyState');
        const summaryEl = document.getElementById('ShowingEventsSummary');
        const resetBtn = document.getElementById('resetFiltersBtn');
        if (!grid) return;

        const filtered = getFilteredEvents();
        const hasFilters = state.searchQuery.trim() !== '' ||
          state.selectedCategory !== 'All' ||
          state.featuredOnly ||
          state.bookmarksOnly;

        if (resetBtn) {
          if (hasFilters) resetBtn.classList.remove('hidden');
          else resetBtn.classList.add('hidden');
        }

        if (summaryEl) {
          summaryEl.textContent = 'Showing ' + filtered.length + ' of ' + EVENTS_DATA.length + ' events';
        }

        if (filtered.length === 0) {
          grid.innerHTML = '';
          if (emptyState) emptyState.classList.remove('hidden');
          return;
        }

        if (emptyState) emptyState.classList.add('hidden');

        grid.innerHTML = filtered.map(function (ev, idx) {
          const seatStats = getEventSeatStats(ev);
          const cd = getCountdownParts(ev.targetDate);
          const isBookmarked = state.bookmarks.indexOf(ev.id) !== -1;
          const dateStr = formatReadableDate(ev.targetDate);

          return (
            '<article class="event-card group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl flex flex-col justify-between animate-fade-up" style="animation-delay:' + (idx * 60) + 'ms">' +
              '<div>' +
                '<div class="relative h-48 sm:h-52 overflow-hidden bg-slate-900">' +
                  '<img src="' + ev.image + '" alt="' + escapeHtml(ev.name) + '" class="event-card-img w-full h-full object-cover max-w-full" />' +
                  '<div class="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent"></div>' +
                  '<div class="absolute top-3.5 left-3.5 flex flex-wrap items-center gap-1.5">' +
                    '<span class="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-600/95 text-white shadow">' + escapeHtml(ev.category) + '</span>' +
                    (ev.featured ? '<span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-400 text-slate-950 shadow">&#9733; Featured</span>' : '') +
                  '</div>' +
                  '<button type="button" data-action="bookmark" data-id="' + ev.id + '" class="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-slate-900/75 text-white hover:bg-indigo-600 flex items-center justify-center backdrop-blur-md border border-white/15 transition-colors" title="Bookmark Event" aria-label="Bookmark ' + escapeHtml(ev.name) + '">' +
                    '<svg class="w-4 h-4 ' + (isBookmarked ? 'fill-rose-500 text-rose-500' : 'fill-none') + '" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">' +
                      '<path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />' +
                    '</svg>' +
                  '</button>' +
                  '<!-- Live Per-Card Countdown Timer -->' +
                  '<div class="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">' +
                    '<span class="font-mono text-[11px] bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15 flex items-center gap-1.5">' +
                      '<span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>' +
                      '<span data-countdown-card="' + ev.id + '">' + cd.days + 'd : ' + cd.hours + 'h : ' + cd.minutes + 'm : ' + cd.seconds + 's</span>' +
                    '</span>' +
                    '<span class="text-[11px] font-semibold bg-emerald-500/90 text-slate-950 px-2 py-0.5 rounded-md font-mono">' + seatStats.remaining + ' spots left</span>' +
                  '</div>' +
                '</div>' +

                '<div class="p-5 space-y-3">' +
                  '<div class="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-medium">' +
                    '<svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">' +
                      '<path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />' +
                    '</svg>' +
                    '<span>' + escapeHtml(dateStr) + ' &bull; ' + escapeHtml(ev.timeLabel.split(' - ')[0]) + '</span>' +
                  '</div>' +

                  '<h3 class="font-display font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug cursor-pointer" data-action="details" data-id="' + ev.id + '">' +
                    escapeHtml(ev.name) +
                  '</h3>' +

                  '<p class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">' +
                    '<svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">' +
                      '<path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />' +
                      '<path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />' +
                    '</svg>' +
                    '<span class="truncate">' + escapeHtml(ev.venue) + '</span>' +
                  '</p>' +

                  '<p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">' +
                    escapeHtml(ev.shortDescription) +
                  '</p>' +
                '</div>' +
              '</div>' +

              '<div class="px-5 pb-5 pt-2 space-y-3 border-t border-slate-100 dark:border-slate-800/80">' +
                '<div>' +
                  '<div class="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">' +
                    '<span>Seats Filled (' + seatStats.taken + '/' + ev.totalSeats + ')</span>' +
                    '<span class="font-mono font-semibold">' + seatStats.percentFull + '%</span>' +
                  '</div>' +
                  '<div class="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">' +
                    '<div class="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-500" style="width:' + seatStats.percentFull + '%"></div>' +
                  '</div>' +
                '</div>' +

                '<div class="grid grid-cols-2 gap-2.5 pt-1">' +
                  '<button type="button" data-action="details" data-id="' + ev.id + '" class="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors">' +
                    'Event Details' +
                  '</button>' +
                  '<button type="button" data-action="register" data-id="' + ev.id + '" class="py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm shadow-indigo-600/20 transition-all">' +
                    'Register Now &rarr;' +
                  '</button>' +
                '</div>' +
              '</div>' +
            '</article>'
          );
        }).join('');
      }

      // 4. Populate Event Select Dropdown & Left Preview Card
      function populateEventDropdown() {
        const selectEl = document.getElementById('regEvent');
        if (!selectEl) return;

        selectEl.innerHTML = EVENTS_DATA.map(function (ev) {
          const stats = getEventSeatStats(ev);
          const dateStr = formatReadableDate(ev.targetDate);
          return '<option value="' + ev.id + '">' +
            escapeHtml(ev.name) + ' (' + dateStr + ' — ' + stats.remaining + ' seats left)' +
          '</option>';
        }).join('');

        selectEl.value = state.selectedEventId;
        updateSelectedEventPreview();
      }

      function updateSelectedEventPreview() {
        const ev = EVENTS_DATA.find(function (item) {
          return item.id === state.selectedEventId;
        }) || EVENTS_DATA[0];

        const stats = getEventSeatStats(ev);
        const catEl = document.getElementById('previewEventCategory');
        const imgEl = document.getElementById('previewEventImage');
        const titleEl = document.getElementById('previewEventTitle');
        const dateEl = document.getElementById('previewEventDate');
        const venueEl = document.getElementById('previewEventVenue');
        const seatsEl = document.getElementById('previewEventSeats');

        if (catEl) catEl.textContent = ev.category;
        if (imgEl) {
          imgEl.src = ev.image;
          imgEl.alt = ev.name;
        }
        if (titleEl) titleEl.textContent = ev.name;
        if (dateEl) dateEl.textContent = formatReadableDate(ev.targetDate) + ' • ' + ev.timeLabel;
        if (venueEl) venueEl.textContent = ev.venue;
        if (seatsEl) seatsEl.textContent = stats.remaining + ' / ' + ev.totalSeats + ' Seats Available';
      }

      // 5. Event Details Modal
      function openEventModal(eventId) {
        const ev = EVENTS_DATA.find(function (item) {
          return item.id === eventId;
        });
        if (!ev) return;
        state.activeModalEventId = ev.id;

        const stats = getEventSeatStats(ev);
        const cd = getCountdownParts(ev.targetDate);
        const isBookmarked = state.bookmarks.indexOf(ev.id) !== -1;

        document.getElementById('modalEventImage').src = ev.image;
        document.getElementById('modalEventCategory').textContent = ev.category;
        document.getElementById('modalEventCountdown').textContent =
          'Starts in ' + cd.days + 'd : ' + cd.hours + 'h : ' + cd.minutes + 'm : ' + cd.seconds + 's';
        document.getElementById('modalEventTitle').textContent = ev.name;
        document.getElementById('modalEventDateTime').textContent =
          formatReadableDate(ev.targetDate) + ' (' + ev.timeLabel + ')';
        document.getElementById('modalEventVenue').textContent = ev.venue;
        document.getElementById('modalEventSeats').textContent =
          stats.remaining + ' of ' + ev.totalSeats + ' Passes Available';
        document.getElementById('modalEventDescription').textContent = ev.fullDescription;

        document.getElementById('modalEventAgenda').innerHTML = ev.agenda.map(function (item) {
          return '<li class="flex items-start gap-2"><span class="text-indigo-500 font-bold">&bull;</span><span>' + escapeHtml(item) + '</span></li>';
        }).join('');

        document.getElementById('modalEventSpeakers').innerHTML = ev.speakers.map(function (item) {
          return '<li class="flex items-start gap-2"><span class="text-cyan-500 font-bold">&#10003;</span><span>' + escapeHtml(item) + '</span></li>';
        }).join('');

        const bookmarkBtn = document.getElementById('modalBookmarkBtn');
        if (bookmarkBtn) {
          bookmarkBtn.textContent = isBookmarked ? '★ Bookmarked (Remove)' : '☆ Bookmark Event';
        }

        const modal = document.getElementById('eventDetailModal');
        if (modal) modal.classList.remove('hidden');
      }

      function closeEventModal() {
        const modal = document.getElementById('eventDetailModal');
        if (modal) modal.classList.add('hidden');
        state.activeModalEventId = null;
      }

      // 6. Select Event & Scroll to Registration Form
      function selectEventForRegistration(eventId) {
        state.selectedEventId = eventId;
        const selectEl = document.getElementById('regEvent');
        if (selectEl) selectEl.value = eventId;
        updateSelectedEventPreview();
        closeEventModal();

        const regSection = document.getElementById('registerSection');
        if (regSection) {
          regSection.scrollIntoView({ behavior: 'smooth' });
        }
        const nameInput = document.getElementById('regName');
        if (nameInput) {
          setTimeout(function () {
            nameInput.focus();
          }, 450);
        }
      }

      // 7. JavaScript Form Validation Engine
      function setFieldError(inputId, errId, message) {
        const inputEl = document.getElementById(inputId);
        const errEl = document.getElementById(errId);
        if (message) {
          if (inputEl) {
            inputEl.classList.add('border-rose-500', 'ring-1', 'ring-rose-500');
          }
          if (errEl) {
            errEl.textContent = message;
            errEl.classList.remove('hidden');
          }
          return false;
        } else {
          if (inputEl) {
            inputEl.classList.remove('border-rose-500', 'ring-1', 'ring-rose-500');
          }
          if (errEl) {
            errEl.textContent = '';
            errEl.classList.add('hidden');
          }
          return true;
        }
      }

      function validateNameField() {
        const val = (document.getElementById('regName').value || '').trim();
        if (!val) {
          return setFieldError('regName', 'errName', 'Participant full name is required.');
        }
        if (val.length < 3) {
          return setFieldError('regName', 'errName', 'Name must be at least 3 characters long.');
        }
        if (!/^[a-zA-Z\s.'-]+$/.test(val)) {
          return setFieldError('regName', 'errName', 'Name should contain only letters and spaces.');
        }
        return setFieldError('regName', 'errName', '');
      }

      function validateEmailField() {
        const val = (document.getElementById('regEmail').value || '').trim();
        const eventId = document.getElementById('regEvent').value;
        if (!val) {
          return setFieldError('regEmail', 'errEmail', 'Email address is required.');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(val)) {
          return setFieldError('regEmail', 'errEmail', 'Please enter a valid email address (e.g., name@domain.com).');
        }
        // Check duplicate registration for the same event
        const duplicate = state.registrations.some(function (r) {
          return r.eventId === eventId && r.email.toLowerCase() === val.toLowerCase();
        });
        if (duplicate) {
          return setFieldError('regEmail', 'errEmail', 'This email is already registered for the selected event.');
        }
        return setFieldError('regEmail', 'errEmail', '');
      }

      function validatePhoneField() {
        const val = (document.getElementById('regPhone').value || '').trim();
        if (!val) {
          return setFieldError('regPhone', 'errPhone', 'Phone number is required.');
        }
        const digitsOnly = val.replace(/\D/g, '');
        if (!/^[+]?[\d\s()-]{10,16}$/.test(val) || digitsOnly.length < 10 || digitsOnly.length > 15) {
          return setFieldError('regPhone', 'errPhone', 'Enter a valid 10 to 15 digit mobile phone number.');
        }
        return setFieldError('regPhone', 'errPhone', '');
      }

      function validateEventField() {
        const eventId = document.getElementById('regEvent').value;
        const ev = EVENTS_DATA.find(function (item) {
          return item.id === eventId;
        });
        if (!ev) {
          return setFieldError('regEvent', 'errEvent', 'Please select an upcoming event.');
        }
        const stats = getEventSeatStats(ev);
        if (stats.remaining <= 0) {
          return setFieldError('regEvent', 'errEvent', 'Sorry, this event has reached full capacity.');
        }
        return setFieldError('regEvent', 'errEvent', '');
      }

      function validateConsentField() {
        const checked = document.getElementById('regConsent').checked;
        const errEl = document.getElementById('errConsent');
        if (!checked) {
          if (errEl) {
            errEl.textContent = 'Please accept the event code of conduct to proceed.';
            errEl.classList.remove('hidden');
          }
          return false;
        }
        if (errEl) {
          errEl.textContent = '';
          errEl.classList.add('hidden');
        }
        return true;
      }

      // 8. Render LocalStorage Registrations Table
      function renderRegistrationsTable() {
        const tbody = document.getElementById('registrationsTableBody');
        const emptyState = document.getElementById('registrationsEmptyState');
        const tableWrapper = document.getElementById('registrationsTableWrapper');
        const countLabel = document.getElementById('regTableCountLabel');
        if (!tbody) return;

        const q = state.regManagerQuery.trim().toLowerCase();
        const filtered = state.registrations.filter(function (reg) {
          if (!q) return true;
          const hay = (
            reg.passId + ' ' +
            reg.name + ' ' +
            reg.email + ' ' +
            reg.phone + ' ' +
            reg.eventName + ' ' +
            reg.passTier
          ).toLowerCase();
          return hay.indexOf(q) !== -1;
        });

        if (countLabel) {
          countLabel.textContent = filtered.length + (filtered.length === 1 ? ' Record' : ' Records');
        }

        if (filtered.length === 0) {
          tbody.innerHTML = '';
          if (tableWrapper) tableWrapper.classList.add('hidden');
          if (emptyState) emptyState.classList.remove('hidden');
          return;
        }

        if (tableWrapper) tableWrapper.classList.remove('hidden');
        if (emptyState) emptyState.classList.add('hidden');

        tbody.innerHTML = filtered.map(function (reg) {
          return (
            '<tr class="hover:bg-slate-50/90 dark:hover:bg-slate-800/40 transition-colors">' +
              '<td class="py-3.5 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400 whitespace-nowrap">' +
                escapeHtml(reg.passId) +
              '</td>' +
              '<td class="py-3.5 px-4">' +
                '<div class="font-semibold text-slate-900 dark:text-white">' + escapeHtml(reg.name) + '</div>' +
                (reg.college ? '<div class="text-[11px] text-slate-400">' + escapeHtml(reg.college) + '</div>' : '') +
              '</td>' +
              '<td class="py-3.5 px-4">' +
                '<div class="text-slate-700 dark:text-slate-300">' + escapeHtml(reg.email) + '</div>' +
                '<div class="text-[11px] font-mono text-slate-400">' + escapeHtml(reg.phone) + '</div>' +
              '</td>' +
              '<td class="py-3.5 px-4">' +
                '<span class="font-medium text-slate-800 dark:text-slate-200">' + escapeHtml(reg.eventName) + '</span>' +
              '</td>' +
              '<td class="py-3.5 px-4">' +
                '<span class="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-300">' +
                  escapeHtml(reg.passTier) +
                '</span>' +
              '</td>' +
              '<td class="py-3.5 px-4 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">' +
                escapeHtml(reg.timestamp) +
              '</td>' +
              '<td class="py-3.5 px-4 text-right whitespace-nowrap space-x-1.5">' +
                '<button type="button" data-reg-action="ticket" data-pass="' + escapeHtml(reg.passId) + '" class="px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-xs font-semibold transition-colors">' +
                  'View Pass' +
                '</button>' +
                '<button type="button" data-reg-action="delete" data-pass="' + escapeHtml(reg.passId) + '" class="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold transition-colors">' +
                  'Cancel' +
                '</button>' +
              '</td>' +
            '</tr>'
          );
        }).join('');
      }

      // 9. Open Digital Ticket Modal
      function openTicketModal(passId) {
        const reg = state.registrations.find(function (r) {
          return r.passId === passId;
        });
        if (!reg) return;
        const ev = EVENTS_DATA.find(function (item) {
          return item.id === reg.eventId;
        }) || EVENTS_DATA[0];

        document.getElementById('ticketEventName').textContent = reg.eventName;
        document.getElementById('ticketEventMeta').textContent =
          formatReadableDate(ev.targetDate) + ' • ' + ev.venue;
        document.getElementById('ticketHolderName').textContent = reg.name;
        document.getElementById('ticketPassId').textContent = reg.passId;
        document.getElementById('ticketHolderEmail').textContent = reg.email;
        document.getElementById('ticketHolderPhone').textContent = reg.phone;
        document.getElementById('ticketPassTier').textContent = reg.passTier;

        document.getElementById('ticketPassModal').classList.remove('hidden');
      }

      // 10. Live 1-Second Interval Countdown Ticker
      function tickCountdowns() {
        const spotlight = EVENTS_DATA[0];
        const heroParts = getCountdownParts(spotlight.targetDate);

        const dEl = document.getElementById('heroCdDays');
        const hEl = document.getElementById('heroCdHours');
        const mEl = document.getElementById('heroCdMinutes');
        const sEl = document.getElementById('heroCdSeconds');
        const ribbonEl = document.getElementById('ribbonCountdown');

        if (dEl) dEl.textContent = heroParts.days;
        if (hEl) hEl.textContent = heroParts.hours;
        if (mEl) mEl.textContent = heroParts.minutes;
        if (sEl) sEl.textContent = heroParts.seconds;
        if (ribbonEl) {
          ribbonEl.textContent = heroParts.days + 'd : ' + heroParts.hours + 'h : ' + heroParts.minutes + 'm : ' + heroParts.seconds + 's';
        }

        // Update all visible card countdowns
        EVENTS_DATA.forEach(function (ev) {
          const cardBadge = document.querySelector('[data-countdown-card="' + ev.id + '"]');
          if (cardBadge) {
            const p = getCountdownParts(ev.targetDate);
            cardBadge.textContent = p.days + 'd : ' + p.hours + 'h : ' + p.minutes + 'm : ' + p.seconds + 's';
          }
        });

        // Update active modal countdown if open
        if (state.activeModalEventId) {
          const modalEv = EVENTS_DATA.find(function (item) {
            return item.id === state.activeModalEventId;
          });
          if (modalEv) {
            const mp = getCountdownParts(modalEv.targetDate);
            const modalCdEl = document.getElementById('modalEventCountdown');
            if (modalCdEl) {
              modalCdEl.textContent = 'Starts in ' + mp.days + 'd : ' + mp.hours + 'h : ' + mp.minutes + 'm : ' + mp.seconds + 's';
            }
          }
        }
      }

      // 11. Wire All Interactive Event Listeners
      function bindEventListeners() {
        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileNavDrawer = document.getElementById('mobileNavDrawer');
        const openIcon = document.getElementById('mobileMenuOpenIcon');
        const closeIcon = document.getElementById('mobileMenuCloseIcon');

        if (mobileMenuBtn && mobileNavDrawer) {
          mobileMenuBtn.addEventListener('click', function () {
            const isHidden = mobileNavDrawer.classList.contains('hidden');
            if (isHidden) {
              mobileNavDrawer.classList.remove('hidden');
              openIcon.classList.add('hidden');
              closeIcon.classList.remove('hidden');
            } else {
              mobileNavDrawer.classList.add('hidden');
              openIcon.classList.remove('hidden');
              closeIcon.classList.add('hidden');
            }
          });

          document.querySelectorAll('.mobile-nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
              mobileNavDrawer.classList.add('hidden');
              openIcon.classList.remove('hidden');
              closeIcon.classList.add('hidden');
            });
          });
        }

        // Hero Spotlight Buttons
        document.getElementById('heroViewSpotlightBtn').addEventListener('click', function () {
          openEventModal(EVENTS_DATA[0].id);
        });
        document.getElementById('heroRegisterSpotlightBtn').addEventListener('click', function () {
          selectEventForRegistration(EVENTS_DATA[0].id);
        });
        document.getElementById('heroQuickRegisterBtn').addEventListener('click', function () {
          document.getElementById('registerSection').scrollIntoView({ behavior: 'smooth' });
        });

        // Search Input
        const searchInput = document.getElementById('eventSearchInput');
        const clearSearchBtn = document.getElementById('clearSearchBtn');
        searchInput.addEventListener('input', function (e) {
          state.searchQuery = e.target.value;
          if (state.searchQuery.trim().length > 0) {
            clearSearchBtn.classList.remove('hidden');
          } else {
            clearSearchBtn.classList.add('hidden');
          }
          renderEventsGrid();
        });

        clearSearchBtn.addEventListener('click', function () {
          searchInput.value = '';
          state.searchQuery = '';
          clearSearchBtn.classList.add('hidden');
          renderEventsGrid();
        });

        // Sort Select
        document.getElementById('eventSortSelect').addEventListener('change', function (e) {
          state.sortBy = e.target.value;
          renderEventsGrid();
        });

        // Featured Only Toggle
        const featuredBtn = document.getElementById('featuredOnlyToggle');
        featuredBtn.addEventListener('click', function () {
          state.featuredOnly = !state.featuredOnly;
          if (state.featuredOnly) {
            featuredBtn.classList.add('bg-amber-400/20', 'border-amber-400', 'text-amber-600', 'dark:text-amber-300');
          } else {
            featuredBtn.classList.remove('bg-amber-400/20', 'border-amber-400', 'text-amber-600', 'dark:text-amber-300');
          }
          renderEventsGrid();
        });

        // Bookmarks Navbar Filter Toggle
        document.getElementById('navBookmarkBtn').addEventListener('click', function () {
          state.bookmarksOnly = !state.bookmarksOnly;
          updateGlobalMetrics();
          renderEventsGrid();
          document.getElementById('eventsSection').scrollIntoView({ behavior: 'smooth' });
          showToast(state.bookmarksOnly ? 'Showing bookmarked events only' : 'Showing all events', 'info');
        });

        // Category Filter Pills
        document.getElementById('categoryFilterBar').addEventListener('click', function (e) {
          const btn = e.target.closest('[data-category]');
          if (!btn) return;
          state.selectedCategory = btn.getAttribute('data-category');

          document.querySelectorAll('.category-pill').forEach(function (pill) {
            if (pill.getAttribute('data-category') === state.selectedCategory) {
              pill.className = 'category-pill shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 text-white shadow-sm transition-all';
            } else {
              pill.className = 'category-pill shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-all';
            }
          });
          renderEventsGrid();
        });

        // Reset Filters
        function resetAllFilters() {
          state.searchQuery = '';
          state.selectedCategory = 'All';
          state.featuredOnly = false;
          state.bookmarksOnly = false;
          searchInput.value = '';
          clearSearchBtn.classList.add('hidden');
          featuredBtn.classList.remove('bg-amber-400/20', 'border-amber-400', 'text-amber-600', 'dark:text-amber-300');
          document.querySelectorAll('.category-pill').forEach(function (pill) {
            if (pill.getAttribute('data-category') === 'All') {
              pill.className = 'category-pill shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 text-white shadow-sm transition-all';
            } else {
              pill.className = 'category-pill shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-all';
            }
          });
          updateGlobalMetrics();
          renderEventsGrid();
        }

        document.getElementById('resetFiltersBtn').addEventListener('click', resetAllFilters);
        document.getElementById('emptyStateResetBtn').addEventListener('click', resetAllFilters);

        // Event Cards Grid Delegation (Details, Register, Bookmark)
        document.getElementById('eventsGrid').addEventListener('click', function (e) {
          const target = e.target.closest('[data-action]');
          if (!target) return;
          const action = target.getAttribute('data-action');
          const id = target.getAttribute('data-id');
          if (action === 'details') {
            openEventModal(id);
          } else if (action === 'register') {
            selectEventForRegistration(id);
          } else if (action === 'bookmark') {
            toggleBookmark(id);
          }
        });

        function toggleBookmark(eventId) {
          const idx = state.bookmarks.indexOf(eventId);
          if (idx === -1) {
            state.bookmarks.push(eventId);
            showToast('Event added to your bookmarks!', 'info');
          } else {
            state.bookmarks.splice(idx, 1);
            showToast('Event removed from bookmarks.', 'info');
          }
          safeSetStorage(STORAGE_KEYS.BOOKMARKS, state.bookmarks);
          updateGlobalMetrics();
          renderEventsGrid();
        }

        // Event Modal Controls
        document.getElementById('closeEventModalBtn').addEventListener('click', closeEventModal);
        document.getElementById('modalCancelBtn').addEventListener('click', closeEventModal);
        document.getElementById('eventDetailModal').addEventListener('click', function (e) {
          if (e.target.id === 'eventDetailModal') closeEventModal();
        });
        document.getElementById('modalProceedRegisterBtn').addEventListener('click', function () {
          if (state.activeModalEventId) {
            selectEventForRegistration(state.activeModalEventId);
          }
        });
        document.getElementById('modalBookmarkBtn').addEventListener('click', function () {
          if (state.activeModalEventId) {
            toggleBookmark(state.activeModalEventId);
            const isBookmarked = state.bookmarks.indexOf(state.activeModalEventId) !== -1;
            document.getElementById('modalBookmarkBtn').textContent =
              isBookmarked ? '★ Bookmarked (Remove)' : '☆ Bookmark Event';
          }
        });

        // Registration Form Controls & Real-time Validation
        document.getElementById('regEvent').addEventListener('change', function (e) {
          state.selectedEventId = e.target.value;
          updateSelectedEventPreview();
          validateEventField();
        });
        document.getElementById('openSelectedEventDetailsBtn').addEventListener('click', function () {
          openEventModal(state.selectedEventId);
        });

        document.getElementById('regName').addEventListener('input', validateNameField);
        document.getElementById('regEmail').addEventListener('input', validateEmailField);
        document.getElementById('regPhone').addEventListener('input', validatePhoneField);
        document.getElementById('regConsent').addEventListener('change', validateConsentField);

        // Auto-fill Sample Participant Button
        document.getElementById('fillSampleDataBtn').addEventListener('click', function () {
          const sampleNames = ['Aarav Sharma', 'Diya Mohanty', 'Kabir Verma', 'Ananya Das', 'Vikram Sen'];
          const pick = sampleNames[Math.floor(Math.random() * sampleNames.length)];
          const slug = pick.toLowerCase().replace(/\s+/g, '.') + Math.floor(10 + Math.random() * 89);
          document.getElementById('regName').value = pick;
          document.getElementById('regEmail').value = slug + '@university.edu';
          document.getElementById('regPhone').value = '+91 98' + Math.floor(10000000 + Math.random() * 89999999);
          document.getElementById('regCollege').value = 'CSE - 2305' + Math.floor(100 + Math.random() * 899);
          document.getElementById('regNotes').value = 'Team NovaBuilders';
          document.getElementById('regConsent').checked = true;
          validateNameField();
          validateEmailField();
          validatePhoneField();
          validateConsentField();
          showToast('Auto-filled sample participant details!', 'info');
        });

        // Reset Form Button
        document.getElementById('resetFormBtn').addEventListener('click', function () {
          document.getElementById('eventRegistrationForm').reset();
          setFieldError('regName', 'errName', '');
          setFieldError('regEmail', 'errEmail', '');
          setFieldError('regPhone', 'errPhone', '');
          setFieldError('regEvent', 'errEvent', '');
          document.getElementById('regEvent').value = state.selectedEventId;
        });

        // Form Submission Handler
        document.getElementById('eventRegistrationForm').addEventListener('submit', function (e) {
          e.preventDefault();

          const vEvent = validateEventField();
          const vName = validateNameField();
          const vEmail = validateEmailField();
          const vPhone = validatePhoneField();
          const vConsent = validateConsentField();

          if (!vEvent || !vName || !vEmail || !vPhone || !vConsent) {
            showToast('Please fix the highlighted validation errors before submitting.', 'error');
            return;
          }

          const ev = EVENTS_DATA.find(function (item) {
            return item.id === state.selectedEventId;
          }) || EVENTS_DATA[0];

          const newPassId = 'KEXP-2026-' + Math.floor(1000 + Math.random() * 9000);
          const newReg = {
            passId: newPassId,
            name: document.getElementById('regName').value.trim(),
            email: document.getElementById('regEmail').value.trim(),
            phone: document.getElementById('regPhone').value.trim(),
            eventId: ev.id,
            eventName: ev.name,
            passTier: document.getElementById('regPassType').value,
            college: document.getElementById('regCollege').value.trim(),
            notes: document.getElementById('regNotes').value.trim(),
            timestamp: new Date().toLocaleString('en-US', {
              month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
            })
          };

          state.registrations.unshift(newReg);
          state.activeTicketRegId = newPassId;
          safeSetStorage(STORAGE_KEYS.REGISTRATIONS, state.registrations);

          // Update Confirmation Banner
          document.getElementById('confirmPassIdBadge').textContent = newPassId;
          document.getElementById('confirmMessageText').textContent =
            'Congratulations ' + newReg.name + '! Your seat for "' + ev.name + '" is confirmed and stored in Local Storage.';
          document.getElementById('registrationSuccessBanner').classList.remove('hidden');

          // Reset text inputs while keeping selected event
          document.getElementById('regName').value = '';
          document.getElementById('regEmail').value = '';
          document.getElementById('regPhone').value = '';
          document.getElementById('regCollege').value = '';
          document.getElementById('regNotes').value = '';

          // Refresh all UI views
          updateGlobalMetrics();
          renderEventsGrid();
          populateEventDropdown();
          renderRegistrationsTable();
          showToast('Registration confirmed! Pass ID: ' + newPassId, 'success');
        });

        document.getElementById('dismissSuccessBannerBtn').addEventListener('click', function () {
          document.getElementById('registrationSuccessBanner').classList.add('hidden');
        });

        document.getElementById('viewPassModalBtn').addEventListener('click', function () {
          if (state.activeTicketRegId) {
            openTicketModal(state.activeTicketRegId);
          }
        });

        // Ticket Modal Controls
        document.getElementById('closeTicketModalBtn').addEventListener('click', function () {
          document.getElementById('ticketPassModal').classList.add('hidden');
        });
        document.getElementById('doneTicketBtn').addEventListener('click', function () {
          document.getElementById('ticketPassModal').classList.add('hidden');
        });
        document.getElementById('printTicketBtn').addEventListener('click', function () {
          window.print();
        });

        // LocalStorage Manager Search & Actions
        document.getElementById('regManagerSearchInput').addEventListener('input', function (e) {
          state.regManagerQuery = e.target.value;
          renderRegistrationsTable();
        });

        document.getElementById('registrationsTableBody').addEventListener('click', function (e) {
          const btn = e.target.closest('[data-reg-action]');
          if (!btn) return;
          const action = btn.getAttribute('data-reg-action');
          const passId = btn.getAttribute('data-pass');

          if (action === 'ticket') {
            openTicketModal(passId);
          } else if (action === 'delete') {
            state.registrations = state.registrations.filter(function (r) {
              return r.passId !== passId;
            });
            safeSetStorage(STORAGE_KEYS.REGISTRATIONS, state.registrations);
            updateGlobalMetrics();
            renderEventsGrid();
            populateEventDropdown();
            renderRegistrationsTable();
            showToast('Cancelled registration ' + passId, 'info');
          }
        });

        // Seed Sample Registrations
        document.getElementById('seedDemoRegsBtn').addEventListener('click', function () {
          const demoBatch = [
            {
              passId: 'KEXP-2026-' + Math.floor(1000 + Math.random() * 8999),
              name: 'Sneha Patnaik',
              email: 'sneha.patnaik@kexplore.edu',
              phone: '+91 9437011223',
              eventId: 'evt-ux-masterclass',
              eventName: 'PixelCraft UI/UX Design Systems & Figma Sprint',
              passTier: 'VIP Front-Row & Workshop Kit',
              college: 'Design - 2308014',
              notes: 'Figma Design Lead',
              timestamp: new Date().toLocaleString('en-US', {
                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
              })
            },
            {
              passId: 'KEXP-2026-' + Math.floor(1000 + Math.random() * 8999),
              name: 'Aditya Kulkarni',
              email: 'aditya.k@kexplore.edu',
              phone: '+91 9861099876',
              eventId: 'evt-robotics-expo',
              eventName: 'MechaNova Autonomous Robotics & Drone Expo',
              passTier: 'Team / Hackathon Delegate Pass',
              college: 'Robotics - 2302119',
              notes: 'FPV Drone Squad',
              timestamp: new Date().toLocaleString('en-US', {
                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
              })
            }
          ];
          state.registrations = demoBatch.concat(state.registrations);
          safeSetStorage(STORAGE_KEYS.REGISTRATIONS, state.registrations);
          updateGlobalMetrics();
          renderEventsGrid();
          populateEventDropdown();
          renderRegistrationsTable();
          showToast('Added 2 sample registrations to Local Storage!', 'success');
        });

        // Export CSV
        document.getElementById('exportCsvBtn').addEventListener('click', function () {
          if (state.registrations.length === 0) {
            showToast('No registrations available to export.', 'error');
            return;
          }
          const headers = ['Pass ID', 'Name', 'Email', 'Phone', 'Event Name', 'Pass Tier', 'Department/ID', 'Notes', 'Timestamp'];
          const rows = state.registrations.map(function (r) {
            return [
              r.passId, r.name, r.email, r.phone, r.eventName, r.passTier, r.college || '', r.notes || '', r.timestamp
            ].map(function (cell) {
              return '"' + String(cell).replace(/"/g, '""') + '"';
            }).join(',');
          });
          const csvContent = [headers.join(',')].concat(rows).join('\n');
          const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'k_explore_registrations.csv';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          showToast('Exported ' + state.registrations.length + ' registrations as CSV!', 'success');
        });

        // Clear All LocalStorage Confirmation Dialog
        const confirmModal = document.getElementById('confirmDialogModal');
        document.getElementById('clearAllRegsBtn').addEventListener('click', function () {
          if (state.registrations.length === 0) {
            showToast('Local Storage is already empty.', 'info');
            return;
          }
          confirmModal.classList.remove('hidden');
        });
        document.getElementById('confirmDialogCancelBtn').addEventListener('click', function () {
          confirmModal.classList.add('hidden');
        });
        document.getElementById('confirmDialogApproveBtn').addEventListener('click', function () {
          state.registrations = [];
          safeSetStorage(STORAGE_KEYS.REGISTRATIONS, state.registrations);
          confirmModal.classList.add('hidden');
          updateGlobalMetrics();
          renderEventsGrid();
          populateEventDropdown();
          renderRegistrationsTable();
          showToast('Cleared all registrations from Local Storage.', 'info');
        });
      }

      // Initialize Application
      function initApp() {
        initTheme();
        updateGlobalMetrics();
        renderEventsGrid();
        populateEventDropdown();
        renderRegistrationsTable();
        bindEventListeners();
        tickCountdowns();
        setInterval(tickCountdowns, 1000);
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
      } else {
        initApp();
      }
    })();
