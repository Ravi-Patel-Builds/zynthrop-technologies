# Zynthrop Technologies

> **Production Systems Engineering** — High-performance web applications, distributed backend services, and low-latency AI integrations.

---

## Overview

**Zynthrop Technologies** is the engineering portfolio and consulting platform of **Ravi Shankar Patel**, Principal Systems Architect. The site showcases production-grade architectural patterns, verified case studies, and an interactive latency & throughput simulator.

Built entirely with a modern React + Vite + TypeScript stack, it features:

- **Sliding Architecture Flashcards** — 5 system pillars with live latency metrics, auto-rotating every 4 seconds
- **Latency & Throughput Simulator** — Real-time canvas telemetry with high-DPI rendering and configurable traffic tiers
- **Architecture Modal** — Deep-dive topology diagrams, TypeScript contract previews, and SLA guardrails per service
- **Scope & Budget Estimator** — Interactive project configurator with milestone and timeline output
- **Command Palette** — `Cmd+K` / `Ctrl+K` keyboard-driven navigation across all sections
- **Direct Inquiry Form** — RFC-validated contact intake with client confidentiality and 24h response SLA

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, TypeScript (Strict), Vite 6 |
| **Styling** | Tailwind CSS v4, custom design tokens |
| **Animation** | Motion (Framer Motion v12) |
| **Icons** | Lucide React |
| **Backend** | Node.js, Express 4 |
| **Build** | Vite, esbuild, tsx |
| **Type Safety** | TypeScript ~5.8, strict mode |

---

## Getting Started

### Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/zynthrop-technologies.git
cd zynthrop-technologies

# 2. Install all dependencies
npm install

# 3. Start the development server
npm run dev
```

The dev server starts at **http://localhost:3000** with hot module reloading enabled.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server on port 3000 |
| `npm run build` | Production build output to `/dist` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run TypeScript type checking (`tsc --noEmit`) |
| `npm run clean` | Remove `/dist` and `server.js` artifacts |

---

## Project Structure

```
zynthrop-technologies/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx              # Sticky nav with active-section tracking
│   │   ├── Hero.tsx                # Landing hero with CTA buttons
│   │   ├── HeroFlashcards.tsx      # Auto-sliding architecture carousel
│   │   ├── Capabilities.tsx        # Service capability cards
│   │   ├── CaseStudies.tsx         # Production case studies with metrics
│   │   ├── TechStack.tsx           # Tech stack grid with spec details
│   │   ├── SystemSimulator.tsx     # Live latency canvas simulator
│   │   ├── ArchitectureModal.tsx   # Spec modal with topology + contracts
│   │   ├── AboutFounder.tsx        # Founder profile and engineering philosophy
│   │   ├── ContactSection.tsx      # Inquiry form + scope estimator
│   │   ├── ProjectEstimator.tsx    # Budget and milestone estimator
│   │   ├── CommandPalette.tsx      # Keyboard-driven command palette
│   │   ├── Footer.tsx              # Minimalist footer with nav links
│   │   ├── CircuitBackground.tsx   # Animated SVG circuit background
│   │   └── LogoMark.tsx            # Zynthrop logomark component
│   ├── App.tsx                     # Root component and routing logic
│   ├── types.ts                    # Shared TypeScript interfaces
│   ├── index.css                   # Global styles and Tailwind base
│   └── main.tsx                    # React entry point
├── index.html                      # HTML shell
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Contact

**Ravi Shankar Patel** — Founder & Principal Systems Architect

- Email: ravishankarpatel431@gmail.com
- LinkedIn: https://linkedin.com/in/ravi-shankar-patel
- GitHub: https://github.com/ravishankar-patel

---

## License

Private repository — all rights reserved. © 2025 Zynthrop Technologies.
