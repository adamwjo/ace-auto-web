# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development commands

This project is a Next.js App Router application. Use `npm` from the project root:

- `npm run dev` – run dev server on port 3000
- `npm run build` – create production build
- `npm run start` – start production server (after build)
- `npm run lint` – run ESLint (Next.js + TypeScript config)

Testing is not currently configured.

## High-level architecture

### Framework

- **Next.js 16 App Router** with routes under `app/`
- **Tailwind CSS v4** via PostCSS (`@tailwindcss/postcss`)
- **framer-motion** for animations
- **lucide-react** for icons

### Directory structure

```
app/                    # Next.js App Router pages
  layout.tsx            # Root layout with Navbar, Footer, AppProviders
  page.tsx              # Home page
  globals.css           # Global styles + Tailwind theme tokens
  account/              # Customer account dashboard (protected)
    login/page.tsx
  servicetechportal/    # Technician/admin portal (protected)
    login/page.tsx
  service-request/
    page.tsx            # Submit service request form
    status/page.tsx     # Check request status by ID
  guides/, faqs/, info/, testimonials/  # Static content pages
src/
  components/           # Shared React components
    Navbar.tsx          # Site navigation (desktop + mobile)
    Footer.tsx          # Site footer
    GlassCard.tsx       # Animated glassmorphism card
  context/              # React contexts
    AppProviders.tsx    # Wraps CustomerAuthProvider + TechAuthProvider
    CustomerAuthContext.tsx  # Customer authentication state
    TechAuthContext.tsx      # Technician/admin authentication state
  mocks/
    serviceApi.ts       # Mock backend API (localStorage-persisted)
```

### Authentication system

Two separate auth contexts manage customer and technician sessions:

- **CustomerAuthContext** (`useCustomerAuth`) – for customer-facing features (`/account`)
  - Supports email, Apple, and Google auth providers (simulated)
  - Persists to localStorage key `aceauto-customer-auth`

- **TechAuthContext** (`useTechAuth`) – for technician portal (`/servicetechportal`)
  - Admin vs tech roles with different views
  - Demo credentials in `TechAuthContext.tsx` (e.g., `admin@aceauto.example` / `demo-admin`)
  - Persists to localStorage key `aceauto-tech-auth`

Both contexts are composed in `AppProviders` and wrapped in `app/layout.tsx`.

### Mock service API

`src/mocks/serviceApi.ts` provides a **front-end-only simulation** of backend operations:

- Service request lifecycle: `submitted` → `accepted` → `scheduled` → `tech_on_the_way` → `in_progress` → `completed` → `billed` → `paid`
- Key functions: `submitServiceRequest`, `listCustomerRequests`, `listAllRequestsForAdmin`, `assignRequest`, `updateRequestStatus`
- State persists to localStorage key `aceauto-mock-state-v1`
- Includes demo customers and technicians for testing

### Styling system

- Global styles in `app/globals.css`
- CSS custom properties (`:root`) define the palette: `--background`, `--foreground`, `--accent`, `--card-bg`, etc.
- `@theme inline` maps tokens to Tailwind (e.g., `--color-luxury-accent`)
- Dark mode via `prefers-color-scheme: dark` media query
- Reusable layout classes: `.main-shell`, `.section-shell`, `.glass-panel`, `.glass-panel-soft`, `.hero-grid`

### Adding new routes

1. Create directory under `app/` with `page.tsx`
2. Use `section-shell` class for consistent content width
3. For protected routes, check auth context and redirect to login if needed
4. Add to `navLinks` array in `src/components/Navbar.tsx` if it should appear in navigation
