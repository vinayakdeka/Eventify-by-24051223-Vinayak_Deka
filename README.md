# K Explore — Responsive Event Management Website

**Task Title:** Design and Develop a Responsive Event Management Website (`K Explore – Web Designing`)

**K Explore** is a modern, responsive, and interactive Event Management Web Application built using **HTML5**, **CSS3**, **Tailwind CSS**, and **Vanilla JavaScript (ES6+)**. It allows participants to discover upcoming campus and technology events, search and filter across categories, inspect full event schedules and speaker lineups, track real-time countdown timers, and register with instant client-side validation and **Local Storage** persistence.

## 1. Core Assignment Requirements Implemented

| Requirement Area | Implementation Details |
| :--- | :--- |
| **Attractive Hero Section** | Features a high-contrast visual stage spotlight, platform metrics (total events, remaining passes, active registrations), quick CTA navigation, and a live 4-unit (`Days : Hours : Mins : Secs`) countdown timer. |
| **Upcoming & Featured Events Grid** | Displays 6 curated events across Technology, Cultural, Design, Robotics, Entrepreneurship, and Esports. Each card shows the event image, title, category badge, featured tag, date/time, venue, short description, seat capacity bar, and an individual live countdown timer. |
| **Search, Category Filter & Sorting** | Real-time keyword search bar (filters by title, venue, category, or topic), 7 interactive category filter pills, a "Featured Only" toggle, a bookmarked events filter, and a multi-option sort dropdown (`Date: Soonest First`, `Featured Spotlight`, `Seats Left`, `Name A-Z`). |
| **Detailed Event Information Modal** | Clicking any event card or **Event Details** button opens an interactive modal displaying the full event overview, date/time, venue location, remaining seat count, chronological agenda, speakers & perks, bookmark toggle, and a direct **Register for This Event** button. |
| **Registration Form & JS Validation** | Collects Participant Full Name, Email Address, Phone Number, Selected Event (auto-synced with event cards), Pass Tier, Department/Roll ID, and Team/Notes. Includes real-time (`input`/`change`) and on-submit validation with inline error feedback and duplicate-email protection. |
| **Submission Confirmation & Digital Pass** | Upon valid submission, displays an animated confirmation banner with a unique Pass ID (`KEXP-2026-XXXX`) and a printable **Official Digital Ticket Pass** modal. |
| **Responsive UI/UX Design** | Built mobile-first with fluid grids (`1 col` on mobile, `2 cols` on tablet, `3 cols` on desktop), a collapsible mobile navigation drawer, accessible contrast ratios, and smooth transitions. |

## 2. Bonus Challenges Implemented

| Bonus Feature | How It Works in K Explore |
| :--- | :--- |
| **Dark / Light Mode Toggle** | Integrated in the sticky navigation header (`#themeToggleBtn`). Switches seamlessly between a sleek slate-dark theme and a crisp daylight theme, saving the user's preference in `localStorage` (`k_explore_theme_v1`). |
| **Live Event Countdown Timers** | Runs a synchronized 1-second ticker updating the top announcement ribbon, the Hero Featured Spotlight card, every individual Event Card badge, and the open Event Details Modal simultaneously. |
| **Smooth CSS3 & UI Animations** | Implements `@keyframes fadeUp` staggered card entrances, image zoom-on-hover transitions (`cubic-bezier(0.16, 1, 0.3, 1)`), pulsing live indicators, animated capacity bars, and modal scale-pop transitions. |
| **Local Storage Registration Data Management** | Includes a dedicated **Registered Participants & Pass Manager** dashboard (`#myRegistrationsSection`) backed by `localStorage` (`k_explore_registrations_v1`). Users can search saved registrations, open digital passes, cancel individual registrations (which dynamically restores available seats), seed sample records, export all records to a `.csv` spreadsheet, or clear storage via an in-page confirmation dialog. |

## 3. Repository Folder Structure

For GitHub submission, the project is organized in both a single self-contained Canvas build (`k_explore_events.html`) and a modular repository structure (`k_explore_github_repo.zip`):

```text
k-explore-event-management/
├── index.html                  # Main semantic HTML5 structure
├── css/
│   └── style.css               # Custom animations, theme variables & scrollbar rules
├── js/
│   └── app.js                  # Event catalog, filters, countdowns, validation & LocalStorage CRUD
├── assets/
│   └── images/                 # High-resolution event & hero visual assets
│       ├── hero-stage.jpg
│       ├── event-ai-hackathon.jpg
│       ├── event-cultural-night.jpg
│       ├── event-ux-workshop.jpg
│       ├── event-robotics-expo.jpg
│       ├── event-startup-summit.jpg
│       └── event-esports-arena.jpg
└── README.md                   # Complete project documentation & deployment guide
```

## 4. Form Validation Rules (`js/app.js`)

1. **Participant Full Name (`#regName`)**: Required, minimum 3 characters, alphabetic characters and standard name punctuation only (`/^[a-zA-Z\s.'-]+$/`).
2. **Email Address (`#regEmail`)**: Required, verified against standard email syntax (`/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`), plus a duplicate check ensuring the same email cannot register twice for the same event.
3. **Phone Number (`#regPhone`)**: Required, validates 10 to 15 numeric digits with optional country code prefix (`/^[+]?[\d\s()-]{10,16}$/`).
4. **Selected Event (`#regEvent`)**: Required, verifies that the chosen event still has available seat capacity (`remaining > 0`).
5. **Code of Conduct Consent (`#regConsent`)**: Mandatory checkbox verification before pass generation.

## 5. Git Version Control & Deployment Guide

Follow these steps to push your project to GitHub and deploy it live on **GitHub Pages**, **Vercel**, or **Netlify**:

### Step 1: Initialize Git & Push to GitHub

```bash
# 1. Unzip k_explore_github_repo.zip and enter the project folder
cd k-explore-event-management

# 2. Initialize Git repository
git init
git branch -M main

# 3. Stage and commit all files with clean commit messages
git add .
git commit -m "feat: implement K Explore responsive event management platform with bonus features"

# 4. Link your GitHub repository and push
git remote add origin https://github.com/<your-username>/k-explore-event-management.git
git push -u origin main
```

### Step 2: Deploy Live (Choose Any Platform)

* **Option A — GitHub Pages:**
  1. Open your repository on GitHub and go to **Settings** -> **Pages**.
  2. Under **Build and deployment**, select **Deploy from a branch**.
  3. Select branch `main` and folder `/ (root)`, then click **Save**.
  4. Your live URL will be published at `https://<your-username>.github.io/k-explore-event-management/`.
* **Option B — Vercel / Netlify (Instant Drag-and-Drop or Git Import):**
  1. Sign in to Vercel or Netlify and click **Add New Project** -> **Import Git Repository**.
  2. Select `k-explore-event-management` and click **Deploy** (no build command required for static HTML/CSS/JS).
