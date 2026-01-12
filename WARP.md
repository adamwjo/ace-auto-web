# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development commands

This project is a Next.js App Router application bootstrapped with `create-next-app`.

Use `npm` (recommended, since `package-lock.json` is present) from the project root:

- Run the dev server on port 3000:
  - `npm run dev`
- Create a production build:
  - `npm run build`
- Start the production server (after `npm run build`):
  - `npm run start`
- Run linting (Next.js + TypeScript ESLint config):
  - `npm run lint`

Testing is not currently configured (there is no `test` script or test runner set up). If tests are added later, prefer using the scripts defined in `package.json` and update this file with how to run a single test in the chosen framework.

## High-level architecture

### Framework and entrypoints

- The app uses **Next.js 16 App Router**.
- All routes live under the `app/` directory.
  - `app/layout.tsx` is the **root layout**, defining the global `<html>`/`<body>`, top navigation, footer, and site-wide shell.
  - `app/page.tsx` is the **home page**, implemented as a client component (`"use client"`) and uses `framer-motion` for hero and card animations.
- Top-level route directories under `app/` each contain a single `page.tsx` and are rendered within the shared layout:
  - `app/guides/page.tsx` – static content describing basic repair & maintenance guides.
  - `app/faqs/page.tsx` – FAQ page using a structured `faqs` array and `<details>` accordions.
  - `app/service-request/page.tsx` – interactive service request form.
  - `app/info/page.tsx` – static info/about/contact/credentials layout.

There are currently no shared component or utility directories (e.g. `components/`, `lib/`); each route’s JSX and logic live in its `page.tsx`, with small helper components defined inline where needed.

### Routing and navigation shell

- `app/layout.tsx` exports `metadata` (title and description) for the entire site.
- Navigation items are defined once in the `navItems` array in `layout.tsx` and reused in:
  - `NavDesktop` – desktop navigation bar with a primary "Request Service" CTA.
  - `NavMobile` – mobile navigation using a `<details>` disclosure for the menu.
- The `SiteShell` component wraps every page with:
  - A sticky, blurred header (`.nav-blur`) containing the brand/logo and navigation.
  - A `<main>` section that renders the current route’s `children`.
  - A footer with site links, contact info, and placeholder credentials.

When adding new top-level routes, the intended pattern is to:
- Create a new directory under `app/` (e.g. `app/new-section/`) with a `page.tsx`.
- Rely on `SiteShell` from `layout.tsx` for consistent header/footer and layout.
- Optionally add a corresponding entry to `navItems` so it appears in the header/footer nav.

### Styling system

- Global styles live in `app/globals.css`.
- Tailwind CSS v4 is wired through PostCSS:
  - `postcss.config.mjs` registers the `"@tailwindcss/postcss"` plugin.
  - `globals.css` starts with `@import "tailwindcss";` and uses `@theme inline` to define design tokens.
- Key design tokens and layout utilities:
  - CSS custom properties (`:root`) define the core palette and glassmorphism variables: `--background`, `--foreground`, `--accent`, `--card-bg`, `--card-border`, `--glass-elevated`, etc.
  - `@theme inline` maps these tokens into Tailwind design tokens (e.g. `--color-background`, `--font-sans`).
  - Dark mode is handled via the `prefers-color-scheme: dark` media query by changing the CSS variables.
  - Custom utility/layout classes are defined and reused across pages:
    - `.main-shell` – wraps the entire app body and enforces full-height flex layout.
    - `.section-shell` – centers content, constrains max width, and controls horizontal/vertical padding.
    - `.glass-panel` / `.glass-panel-soft` – primary card and softer card surfaces with borders, radii, shadows, and backdrop blur.
    - `.nav-blur` – sticky header background and border treatment.
    - `.hero-grid` – responsive two-column layout for the home hero + aside.

Pages primarily use Tailwind utility classes together with these custom classes for consistent spacing and typography.

### Interactive flow: Service request form

- `app/service-request/page.tsx` is a client component (`"use client"`) implementing the main interactive flow in the app.
- Core pieces:
  - `FormState` interface and `initialState` define all form fields (contact, vehicle details, concern, timing, urgency).
  - Local `useState` hooks manage `values`, `submitting`, and `submitted` status.
  - `handleChange` updates individual fields by key.
  - `handleSubmit` prevents default form submission, simulates an async submit with a timeout, then resets the form and sets `submitted` to `"success"`.
  - Helper components `Field` and `Fieldset` are defined in the same file for consistent labeling, required indicators, and shared input/textarea styling.
- There is **no backend integration yet** (no `app/api/*` routes or external API calls). The submission is explicitly a front-end-only simulation.

### Configuration and tooling

- `tsconfig.json`:
  - Strict TypeScript configuration (`"strict": true`, `"noEmit": true`).
  - Uses `moduleResolution: "bundler"` and includes Next-specific TypeScript plugin (`"name": "next"`).
  - Defines a path alias `@/*` mapped to the project root (`"@/*": ["./*"]`), which can be used for future shared modules (e.g. `@/components/...`).
- `next.config.ts`:
  - Currently exports a minimal `NextConfig` with no custom options; defaults are in effect.
- `eslint.config.mjs`:
  - Uses ESLint flat config via `defineConfig`.
  - Extends `eslint-config-next` core web vitals and TypeScript presets (`core-web-vitals` and `typescript`).
  - Overrides ignores using `globalIgnores` to exclude build artifacts (`.next/**`, `out/**`, `build/**`) and `next-env.d.ts`.

There are no additional project-specific AI/assistant rules files (`WARP.md`, `CLAUDE.md`, Cursor rules, or Copilot instructions) beyond this file at present.
