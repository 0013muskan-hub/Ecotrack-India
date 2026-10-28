# EcoTrack India — Smart Sustainability Platform

> **"Small Actions. Big Impact."**  
> A clean, responsive sustainability web application empowering Indian citizens and households to build eco-friendly habits, complete challenges, calculate carbon emissions, earn rewards, and monitor cumulative environmental savings.

---

## 📖 Table of Contents
1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Technology Stack](#technology-stack)
4. [Project File Structure](#project-file-structure)
5. [Getting Started (Run Locally)](#getting-started-run-locally)
6. [Data Persistence Architecture](#data-persistence-architecture)
7. [Calculation Methodology & Environmental Benchmarks](#calculation-methodology--environmental-benchmarks)
8. [Competition Submission & BharatCode.txt](#competition-submission--bharatcodetxt)
9. [Publishing to GitHub](#publishing-to-github)

---

## 🌍 Project Overview

India is home to over 1.4 billion people with a rapidly growing urban population. While the average per-capita emission in India (~1.9 tonnes CO₂/year) is lower than global averages (~4.7 tonnes), adopting everyday conservation habits—such as segregating household waste, switching to bucket baths, refusing single-use plastics at the sabzi mandi, and running air conditioners at 24°C—collectively saves gigawatt-hours of electricity, billions of liters of potable water, and keeps tons of plastic out of landfills.

**EcoTrack India** is built specifically with this Indian lifestyle context in mind. It provides an intuitive, beginner-friendly interface that turns sustainability into an engaging, rewarding daily routine.

---

## ✨ Key Features

### 1. Landing Page
- **Hero & Mission**: Vibrant brand hero communicating the platform vision.
- **Interactive Eco Tip of the Day**: Features randomized actionable tips citing BEE standards, Swachh Bharat guidelines, and water conservation facts with a shuffle button.
- **Feature Showcase**: Highlights habit tracking, localized footprint calculator, rewards, and the eco guide.

### 2. Sustainability Dashboard
- **Live Metrics**: Total Eco-Points earned, active day streak, challenges completed, and estimated CO₂ avoided.
- **Level Rank Indicator**: Gamified ranking system (*Green Seedling* → *Eco Sprout* → *Earth Guardian* → *Eco Warrior* → *Planet Champion*) with animated progress to the next tier.
- **Environmental Savings Breakdown**: Cumulative savings for CO₂ emissions (kg), freshwater (liters), and single-use plastic items diverted.
- **Weekly Habit Activity Chart**: Pure CSS bar chart tracking actions over the last 7 days.
- **Recent Activities Feed**: Real-time log of recently completed habits with points and timestamps.
- **First-Time User Empty State**: Friendly 3-step onboarding guide.
- **Reset Data Option**: Secure confirmation modal to erase LocalStorage data safely.

### 3. Eco Challenges & Habits
- **14 Realistic Challenges**: Designed for Indian households (e.g. carry water bottle, cloth bag for mandi, bucket bath, waste segregation, unplug standby electronics, 24°C AC setting, public transit weekly commute).
- **Period Duplicate Prevention**: Daily challenges reset at midnight; weekly challenges reset every Sunday. Users cannot double-claim points within the same period.
- **Dynamic Category & Status Filtering**: Filter by category (Waste & Plastic, Energy, Water, Mobility, Lifestyle) or status (All, Pending, Completed).

### 4. Carbon Footprint Calculator
- **Localized Inputs**: Petrol/diesel car distance, 2-wheeler distance, public transit (metro/bus), monthly electricity (kWh), 14.2 kg LPG cooking cylinders, household size, and diet preference.
- **Rigorous Validation**: Rejects negative numbers and non-numeric inputs with user-friendly error messages.
- **Comparative Analysis**: Compares the user's estimated annual footprint against India's national average (~1.9 tonnes CO₂/yr).
- **Source Breakdown**: Pure CSS progress bars showing transport, electricity, LPG, and diet shares.
- **Assumptions Accordion**: Full transparency showing the exact formulas and emission coefficients used.
- **Save to Profile**: Persists the result into LocalStorage and unlocks the *Carbon Conscious* achievement badge.

### 5. Progress & Analytics
- **Milestone Progress Rings & Trackers**: Tracks progress toward 100, 250, 500, and 1000 Eco-Points.
- **Category Distribution**: Visual distribution of sustainable actions across focus areas.
- **Full Chronological Activity Log**: Searchable and scrollable table of all recorded actions.

### 6. Rewards & Badges
- **Dynamic Unlocking System**: Badges evaluate dynamically against actual user metrics (challenges completed, points, streaks, footprint calculations).
- **Locked vs Unlocked States**: Distinct celebratory green/gold styling for unlocked badges versus grayscale and lock icons for locked goals.

### 7. Indian Sustainability Eco Guide
- Practical knowledge base on:
  - Swachh Bharat 2-bin & 3-bin waste segregation (Green, Blue, Black).
  - Urban water crisis solutions (RO reject water harvesting, faucet aerators).
  - BEE Star appliance ratings and the 24°C AC rule.
  - Traditional Indian plastic alternatives (cloth thaili, steel dabba, clay matka).
  - Central Pollution Control Board (CPCB) authorized E-waste recycling centers.
- Instant search filter and category buttons.

---

## 🛠️ Technology Stack

Strictly following the project constraints:
- **UI Framework**: React 18+ (using standard JSX and React functional components).
- **Styling**: Pure CSS3 (`index.css`) with CSS custom properties, flexbox, CSS grid, transitions, and keyframes. **Zero CSS frameworks** (No Tailwind, No Bootstrap).
- **Build Tool**: Vite 5 for fast development and production bundling.
- **Language**: Modern JavaScript (ES6+), standard array methods (`map`, `filter`, `reduce`), and hooks (`useState`, `useEffect`).
- **Icons & Visuals**: Clean inline SVGs and pure CSS charts. **No external chart or icon libraries**.
- **Data Storage**: Browser `localStorage` with error handling, validation, and safe defaults. **No external databases or backend servers**.

---

## 📂 Project File Structure

```
ecotrack-india/
├── BharatCode.txt           # Official competition submission file (in root)
├── README.md                # Comprehensive documentation
├── package.json             # Project dependencies and npm scripts
├── vite.config.js           # Vite configuration
├── index.html               # Main HTML entry point
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Responsive navigation bar with points counter
│   │   ├── StatCard.jsx     # Reusable metric card
│   │   ├── ChallengeCard.jsx# Individual challenge card with completion state
│   │   ├── ProgressBar.jsx  # Accessible pure CSS progress bar
│   │   └── Toast.jsx        # Floating action notifications
│   ├── pages/
│   │   ├── Home.jsx         # Landing page with hero, tips, and feature cards
│   │   ├── Dashboard.jsx    # Sustainability dashboard and live savings
│   │   ├── Challenges.jsx   # Daily and weekly eco habits
│   │   ├── Calculator.jsx   # India-specific carbon footprint calculator
│   │   ├── Analytics.jsx    # Visual analytics and chronological log
│   │   ├── Rewards.jsx      # Achievements and badges gallery
│   │   └── EcoGuide.jsx     # Educational sustainability guides
│   ├── utils/
│   │   ├── calculations.js  # Emission factors, savings logic, badge checks
│   │   ├── challengesData.js# 14 Indian lifestyle challenges
│   │   └── storage.js       # LocalStorage wrapper & period duplicate prevention
│   ├── App.jsx              # Application state coordinator
│   ├── main.jsx             # React DOM root entry
│   └── index.css            # Custom responsive CSS design system
└── public/
```

---

## 🚀 Getting Started (Run Locally)

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### 1. Installation
Open your terminal in the `ecotrack-india` folder and install dependencies:
```bash
cd ecotrack-india
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173` (or the URL shown in your terminal).

### 3. Build for Production
To test the production build:
```bash
npm run build
npm run preview
```

---

## 💾 Data Persistence Architecture

All user data is stored locally in the browser under the key `ecotrack_india_user_data_v1`:

```javascript
{
  points: 125,                    // Total Eco-Points earned
  streak: 3,                      // Active consecutive days logged
  lastActiveDate: "2026-10-27T...",// ISO date of last recorded action
  completedChallenges: [          // List of completed challenge records
    {
      id: "c1_bottle",
      completedAt: "2026-10-27T...",
      periodKey: "daily-2026-10-27",
      pointsEarned: 15
    }
  ],
  footprintHistory: [ ... ],      // Saved carbon footprint calculation results
  unlockedBadges: [ ... ],        // IDs of unlocked achievements
  activityLog: [ ... ]            // Chronological feed of actions
}
```

- **Resilient**: Corrupted or missing storage entries safely revert to initial defaults without crashing.
- **Period Keys**: Challenges use `daily-YYYY-MM-DD` and `weekly-YYYY-Wxx` to enforce one-time rewards per period.
- **Privacy First**: All calculations and data stay 100% inside your local browser.

---

## 📊 Calculation Methodology & Environmental Benchmarks

All emission factors and habit savings are grounded in published Indian environmental standards:

| Emission Source | Factor Value | Official Source / Reference |
|---|---|---|
| **Indian Electricity Grid** | 0.71 kg CO₂ / kWh | Central Electricity Authority (CEA) CO₂ Baseline Database for Indian Power Sector (v19) |
| **Petrol Car (1.2L Hatchback)** | 0.17 kg CO₂ / km | Automotive Research Association of India (ARAI) fleet baseline |
| **Two-Wheeler (100-125cc)** | 0.045 kg CO₂ / km | Typical commuter motorcycle / scooter ARAI fuel economy |
| **Public Transit (Bus/Metro)** | 0.035 kg CO₂ / p-km | Weighted urban transit average in Indian metro cities |
| **LPG Cylinder (14.2 kg)** | 42.5 kg CO₂ / cylinder | Ministry of Petroleum & Natural Gas (MoPNG) stoichiometric combustion |
| **Indian Average per Capita** | ~1,900 kg CO₂ / year | International Energy Agency (IEA) / World Bank India baseline |

> **Educational Note**: While emissions factors reflect official Indian baselines, actual personal carbon emissions vary based on specific vehicle models, traffic conditions, regional energy mixes, and consumer habits.

---

## 📝 Competition Submission & BharatCode.txt

The file `BharatCode.txt` is located **directly in the root of the repository** (not in `src` or `public`).

### How to Complete `BharatCode.txt`:
1. Open `BharatCode.txt` in any text editor.
2. Fill in the placeholder fields under **PARTICIPANT / TEAM INFORMATION**:
   - `Candidate Name`: Your full name
   - `Team Name`: Your team name (or Individual)
   - `Registration ID`: Your BharatCode registration/roll number
   - `Email Address`: Your registered email address
   - `College / Org`: Your institution name
3. Save the file.

---

## 📤 Publishing to GitHub

When you are ready to publish your repository to GitHub:

1. **Initialize Git** in the project folder:
   ```bash
   git init
   ```
2. **Add all files**:
   ```bash
   git add .
   ```
3. **Commit the changes**:
   ```bash
   git commit -m "Initial commit: EcoTrack India Smart Sustainability Platform"
   ```
4. **Create a new repository** on GitHub (e.g. `ecotrack-india`).
5. **Link and push**:
   ```bash
   git remote add origin https://github.com/<your-username>/ecotrack-india.git
   git branch -M main
   git push -u origin main
   ```

*Note: Ensure `.gitignore` ignores `node_modules/` and `dist/` before pushing.*

---

## 📜 License
This project is submitted for the BharatCode Competition. Built with pride for a cleaner, greener India. 🇮🇳
