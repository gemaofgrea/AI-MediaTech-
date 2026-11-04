# AI-MediaTech-

> Modern, attractive and fully responsive promotional website for a premier AI MediaTech creative atelier and production platform.

## 🎬 Core Services & Disciplines
- **Movie & Video Making**: ARRI ALEXA 35, Unreal Engine 5.5 ICVFX & Handheld Cinema
- **Video Editing & Processing**: DaVinci Resolve 19 Advanced Panels & 8K Neural Telecine
- **Model & Fashion Photography**: 100MP Hasselblad, Broncolor lighting & CLO 3D cloth physics
- **AI Image Generation & Processing**: Custom FLUX.1 Pro LoRAs & High-Fidelity Synthetics
- **Professional Photographers, Videographers & Artists**: Vetted global roster of directors & artisans

## 🔥 Tech Stack & Integrations
- **Framework**: Next.js (App Router, Turbopack/Webpack, TypeScript)
- **Styling & Motion**: Tailwind CSS, Framer Motion, Canvas Confetti
- **Cloud Database**: Firebase Firestore with real-time leads ingestion and resilience fallback
- **Interactive Features**: Custom magnetic cursor, floating navigation dock, 5-step survey inquiry system, live telemetry leads HUD, dynamic case studies, and cinema reels with spatial audio

---

## 🏗️ Architecture & Project Structure

```
├── .editorconfig              # Consistent IDE & editor formatting
├── .env.example               # Template for environment variables
├── .env.local                 # Local environment overrides
├── .prettierrc                # Prettier configuration with Tailwind class sorting
├── eslint.config.mjs          # ESLint 9 Flat Config (Core Web Vitals + TypeScript)
├── next.config.ts             # Next.js config with hardened security headers
├── postcss.config.mjs         # PostCSS configuration for Tailwind CSS
├── tsconfig.json              # Strict TypeScript configuration
└── src/
    ├── app/
    │   ├── api/health/        # Uptime & production readiness check (/api/health)
    │   ├── error.tsx          # Client-side error boundary with recovery action
    │   ├── not-found.tsx      # Custom accessible 404 page
    │   ├── loading.tsx        # Suspense skeleton fallback
    │   ├── layout.tsx         # Root layout with SEO metadata & system fonts
    │   ├── page.tsx           # Polished landing showcase
    │   └── globals.css        # Tailwind v4 theme design tokens (light/dark)
    ├── components/
    │   ├── ui/                # Atomic primitives (Button, Card, Badge, Input, Skeleton)
    │   └── layout/            # Layout components (Navbar, Footer)
    ├── config/
    │   └── site.ts            # Centralized site metadata & navigation
    ├── hooks/
    │   ├── use-mounted.ts     # Hydration-safe client mount hook (useSyncExternalStore)
    │   └── use-media-query.ts # Responsive media query hook (useSyncExternalStore)
    ├── lib/
    │   ├── utils.ts           # Class merging utility (clsx + tailwind-merge)
    │   └── env.ts             # Type-safe runtime environment schema validation (Zod)
    └── types/
        └── index.ts           # Shared TypeScript interfaces & types
```

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
pnpm install
# or
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

### 3. Run development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Available Scripts

| Script              | Command                | Purpose                                       |
| :------------------ | :--------------------- | :-------------------------------------------- |
| `pnpm dev`          | `next dev --webpack`   | Starts local development server               |
| `pnpm build`        | `next build --webpack` | Generates optimized production build          |
| `pnpm start`        | `next start`           | Runs production server                        |
| `pnpm type-check`   | `tsc --noEmit`         | Verifies TypeScript types across the codebase |
| `pnpm lint`         | `eslint .`             | Runs ESLint analysis                          |
| `pnpm lint:fix`     | `eslint . --fix`       | Automatically fixes autofixable ESLint issues |
| `pnpm format`       | `prettier --write .`   | Formats code & sorts Tailwind classes         |
| `pnpm format:check` | `prettier --check .`   | Verifies code formatting in CI/CD             |

---

## 🛡️ Production Highlights

- **Type Safety**: Strict TypeScript settings, zero unchecked `any`.
- **Runtime Env Validation**: Zod-validated `src/lib/env.ts` fails loudly on missing critical variables during startup.
- **Hardened HTTP Headers**: Pre-configured security headers (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy).
- **Design Tokens**: Standardized CSS variables for light & dark mode in `globals.css`.
- **Atomic UI Components**: Reusable components built with `class-variance-authority` (CVA), `clsx`, and `tailwind-merge`.
- **Health Check Endpoint**: `/api/health` returns status, uptime, and timestamp for load balancers and orchestrators.
- **Robust Error Handling**: App Router `error.tsx` boundary with digest reporting and reset action, plus user-friendly `not-found.tsx`.
