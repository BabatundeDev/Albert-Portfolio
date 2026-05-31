# Albert Oluwatosin — Data Analyst Portfolio

A high-performance, fully responsive personal portfolio built to showcase data analytics expertise, featured projects, professional experience, and credentials. Engineered with React, TypeScript, and Vite for blazing-fast delivery and a premium user experience.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS + Inline CSS-in-JS |
| Icons | Lucide React |
| Fonts | Cormorant Garamond + DM Sans (Google Fonts) |
| Deployment | Vercel |

---

## Features

**Animated Hero Section** — Typewriter effect cycling through professional titles, an interactive particle canvas background, and floating stat badges.

**Scroll-triggered Animations** — Every section fades and slides into view via a custom `useInView` hook built on the Intersection Observer API.

**Animated Skill Bars** — Proficiency bars that animate on scroll for both Analytics and Data Engineering skill sets.

**Project Showcase** — Four featured projects with hover effects, tech stack tags, and links to live demos and GitHub repositories.

**Timeline Experience Section** — Alternating left/right card layout with a glowing vertical timeline connector.

**Credentials Section** — Certifications, education, and a peer-reviewed publication, all in a clean two-column layout.

**Responsive Design** — Fully optimised for mobile, tablet, and desktop viewports with a collapsible mobile navigation menu.

**Sticky Navbar** — Glassmorphism nav that highlights the active section as the user scrolls.

**Back-to-Top Button** — Smooth scroll utility that appears after scrolling past the fold.

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm v9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/BabatundeDev/Albert-Portfolio.git

# Navigate into the project directory
cd Albert-Portfolio

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## Project Structure

```
Albert-Portfolio/
├── public/
│   └── images/
│       └── profile.jpg        # Profile photo
├── src/
│   └── App.tsx                # Full application (components, hooks, data)
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Customisation

All content is co-located in `src/App.tsx` for straightforward updates:

| Data Constant | What it Controls |
|---|---|
| `TITLES` | Typewriter role titles in the Hero |
| `STATS` | About section stat counters |
| `ANALYTICS_SKILLS` | Analytics skill bars and percentages |
| `ENGINEERING_SKILLS` | Data engineering skill bars |
| `SOFT_SKILLS` | Soft skill tags |
| `PROJECTS` | Project cards (title, description, stack, links) |
| `EXPERIENCE` | Work history timeline cards |
| `CERTS` | Certification cards |
| `SOCIAL_LINKS` | Footer social media links |

To swap the profile photo, replace `public/images/profile.jpg` with your own image, keeping the same filename.

---

## Deployment on Vercel

This project is configured for zero-config deployment on Vercel.

1. Push the repository to GitHub.
2. Import the project on [vercel.com](https://vercel.com).
3. Vercel auto-detects Vite and runs `npm run build` with output from the `dist/` directory.
4. Every push to `main` triggers an automatic re-deployment.

---

## Featured Projects

| Project | Stack | Description |
|---|---|---|
| Sales Revenue Dashboard | Power BI, SQL, DAX | Tracks $50M+ in annual revenue across 8 business units |
| Customer Churn Prediction | Python, Scikit-learn, XGBoost | 87% accuracy ML model, saving $2M+ annually |
| Marketing Attribution Analysis | Python, BigQuery, Looker | Revealed 35% ad spend misallocation, lifted ROI by 28% |
| Real-Time KPI Tracker | Tableau, SQL, REST APIs | Live dashboard monitoring 12 metrics across 5 regions |

---

## Publication

**SRTM-DEM Fracture Mapping for Groundwater Potential around Oyo and Ogun States, Southwestern Nigeria**
Open Access Library Journal · September 27, 2025
[View Publication](https://www.scirp.org/journal/paperinformation?paperid=145927)

---

## Contact

**Albert Oluwatosin**
Senior Data Analyst · Osun, Nigeria · Open to Remote

[LinkedIn](https://linkedin.com/in/albert-oluwatosin) · [GitHub](https://github.com/albert-oluwatosin) · [Email](mailto:albert.oluwatosin@email.com)

---

## License

This project is proprietary. All rights reserved by Albert Oluwatosin.
Unauthorised copying, modification, or distribution of this codebase is not permitted.
