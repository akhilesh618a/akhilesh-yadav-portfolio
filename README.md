# Akhilesh Yadav — Portfolio

Personal portfolio and digital engineering identity for **Akhilesh Yadav** —
a 3rd-year B.Tech CSE (AI & ML) student at NIET, Greater Noida, and an
aspiring Machine Learning Engineer.

Built with React, TypeScript, Vite, Tailwind CSS and Framer Motion.

## What's real, what's a placeholder

This project is intentionally honest about the data it shows:

- **GitHub section** fetches live, public data from the real GitHub API for
  `akhilesh618a` (see `src/lib/github.ts`). Forked / open-source repos are
  automatically detected (`fork === true`) and clearly labeled
  **"Fork / Open Source"** — never presented as original work.
- **No invented facts.** There are no fake CGPA numbers, project metrics,
  internships, certificates, or testimonials anywhere in this codebase.
- A few fields are intentionally left blank because no verified value was
  supplied, and the UI is written to handle each gracefully rather than
  invent one:
  - `profile.profileImageSrc` (`src/data/profile.ts`) — `null` by default,
    which renders an elegant initials placeholder. Add a real photo to
    `src/assets/` and point this at it.
  - `profile.resumeUrl` — empty by default; the "Download Resume" button
    only appears once this is set to a real file.
  - `profile.links.email` / `profile.links.leetcode` — empty by default;
    related buttons/links only render once real, confirmed URLs are added.
  - Project case-study fields (`implementation`, `challenges`,
    `contribution`, `github`, `liveDemo` in `src/data/projects.ts`) render
    as **"Details coming soon"** in the case-study modal until filled in.
  - The contact form (`src/components/ContactForm.tsx`) is fully validated
    and interactive, but honestly tells the visitor it isn't connected to a
    backend yet unless `VITE_FORM_ENDPOINT` is configured (see `.env.example`).

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173` by default.

### Production build

```bash
npm run build
npm run preview   # optional, serves the built dist/ locally
```

### Optional configuration

Copy `.env.example` to `.env` and set `VITE_FORM_ENDPOINT` to a real form
backend (e.g. a Formspree endpoint or your own API route) to make the
contact form actually deliver messages.

## Project structure

```
src/
  components/   Reusable UI: Navbar, MagneticButton, CustomCursor,
                 SectionHeading, ProjectCard, ProjectModal, SkillOrb,
                 GitHubRepositoryCard, Timeline, ContactForm, Footer, ...
  sections/      Hero, About, Education, Skills, FeaturedProjects,
                 GitHub, Journey, HowIThink, CurrentlyLearning, Contact
  data/          profile.ts, projects.ts, skills.ts, education.ts
                 — the single source of truth; edit these to update content
  hooks/         useMousePosition, useScrollProgress, useReducedMotion,
                 useIsTouchDevice, useGitHubRepositories, useTheme
  lib/           github.ts (GitHub API client + classification), utils.ts
```

## Editing content

Almost everything on the page is driven by the files in `src/data/`. To:

- **Update bio, links, or hero copy** → edit `src/data/profile.ts`
- **Add/edit a featured project** → edit `src/data/projects.ts`. Leave any
  case-study field you don't have real information for as `null` — the UI
  will show "Details coming soon" instead of inventing content.
- **Update skills** → edit `src/data/skills.ts`. Only list technologies
  actually used or being learned.
- **Update education/journey timeline** → edit `src/data/education.ts`

## Accessibility & motion

- Respects `prefers-reduced-motion`: disables the custom cursor, 3D tilt,
  continuous animations, and orbiting skill nodes in favor of simple fades.
- The custom cursor and magnetic buttons are automatically disabled on
  touch devices.
- All interactive elements have visible focus states, semantic HTML, and
  ARIA labels; no information is exposed via hover alone.

## Notes on GitHub API usage

`src/lib/github.ts` calls the unauthenticated public GitHub REST API
(`https://api.github.com/users/<username>/repos`). No token is used or
required for public repository listings. Responses are cached in
`sessionStorage` for 15 minutes to be considerate of GitHub's rate limits,
and the UI degrades gracefully (with a clear message and a link straight to
the GitHub profile) if the API is temporarily unavailable or rate-limited.

## Theming

Dark is the default and primary theme. Light mode is a fully separate,
intentionally designed palette (not just an inversion) — see the CSS
custom properties in `src/index.css`. The chosen theme persists in
`localStorage`.
