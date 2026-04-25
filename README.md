# Carlo Ceccarelli, P.Eng. — Portfolio

**Director of Operations | Accenture Infrastructure & Capital Projects**

A high-performance Next.js 14 portfolio website built with TypeScript strict mode, pure CSS custom properties, and zero external UI frameworks.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 (strict mode) |
| Styling | Pure CSS with custom properties |
| Font | Inter (Google Fonts) |
| Widgets | TradingView (ticker tape, market overview) |
| Data | GitHub REST API, RSS feeds via rss2json |
| Visualizers | 7 original HTML5 Canvas animations |

## 7 Canvas Visualizers

1. **Structural Load Distribution** — animated beam with force vectors and deflection curve
2. **Tunnel Boring Machine Progress** — cross-section with rotating cutter head
3. **Transit Network Flow** — animated trains on rail station network
4. **Concrete Curing Strength Curve** — real-time 28-day f'c strength plot
5. **Soil Compaction Waveform** — density layers with compaction percentage
6. **Project Schedule Gantt Flow** — animated Gantt chart with critical path
7. **Blueprint Grid Plotter** — AutoCAD-style drawing with cursor crosshair

## Site Sections

Hero · Global Orientation · About the Work · Architecture of Value Creation · Flagship Initiatives · Live Intelligence Hub · Quantified Impact Dashboard · Professional Experience · Standards & Certifications · Trusted Ecosystem · Thought Leadership · Connect

## Deploy to Vercel

### Option 1: GitHub + Vercel (Recommended)

```bash
git init
git add .
git commit -m "Initial commit: Carlo Ceccarelli Portfolio"
git branch -M main
git remote add origin https://github.com/iceccarelli/carlo-ceccarelli-portfolio.git
git push -u origin main
```

Then import at [vercel.com/new](https://vercel.com/new) — Vercel auto-detects Next.js.

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

### Option 3: Local Development

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Project Structure

```
├── app/
│   ├── globals.css          # Pure CSS with custom properties
│   ├── layout.tsx           # Root layout, SEO metadata, JSON-LD, footer
│   └── page.tsx             # All sections, 7 visualizers, live feeds
├── components/
│   └── Header.tsx           # Sticky nav with scroll-hide, mobile menu
├── public/
│   └── portrait.jpg         # Professional portrait
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md
```

## Portrait

Place `portrait.jpg` in the `public/` directory. The image is referenced as `/portrait.jpg` in the hero section.

## License

All rights reserved. Carlo Ceccarelli, P.Eng.
