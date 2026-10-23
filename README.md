# Vignesh T: Developer Portfolio

Multi-page Next.js 16 (App Router) portfolio with a dark-only, editorial design: Bricolage Grotesque, Instrument Serif and Geist type, Tailwind CSS v4, Framer Motion and a Groq-powered assistant.

Live: https://vignesh-me.vercel.app

## Pages
`/` Home · `/about` · `/skills` · `/projects` (search, filter, sort) · `/projects/[slug]` (case studies with architecture diagrams and changelogs) · `/experience` · `/education` · `/achievements` · `/learning` · `/coding` · `/github` (live stats + repository explorer) · `/blog` + `/blog/[slug]` · `/changelog` · `/recruiter` · `/command` (global search) · `/contact`

Press **Ctrl/Cmd + K** or **/** anywhere for the command palette. The **Index** button opens the full-screen site map.

## 3D experience (React Three Fiber)
- **Hero:** an interactive graph of the technologies I use, wired together like the real HRC TECH and Shop-Zone architectures, with data packets flowing along the connections. Hover or focus a node to trace its links; click to open where it was used.
- **Project previews:** the flagship showcase and every case study with a screenshot render it as a tilting 3D screen with floating tags.
- **Performance:** the 3D code (`three`, `@react-three/fiber`, `@react-three/drei`) is a separate lazy chunk loaded when the browser is idle. Rendering pauses off-screen, resolution adapts to the frame rate, and slow devices fall back to the 2D version automatically. Visitors without WebGL, with reduced-motion or data-saver enabled get the 2D version too.
- **Other motion:** magnetic buttons, a soft cursor glow, a page-transition curtain, scroll-linked hero parallax. All respect reduced motion.

## Single source of truth
All content lives in `src/data/`. Pages, the search index, the sitemap and the AI assistant's knowledge are generated from these files.

| File | Contents |
|---|---|
| `site.js` | identity, navigation, about text |
| `repos.js` | all 18 repositories, classified (project / learning / meta) |
| `projects.js` | 14 case studies with features, architecture, decisions, milestones |
| `skills.js` | skills with the projects that prove them (tier is computed) |
| `journey.js` | experience, education, certifications, achievements, learning timeline |
| `blog.js` | engineering notes |
| `activity.json` | commit history, active days and lines of code, generated from git |

`activity.json` is a snapshot (see `SITE.dataAsOf`). Regenerate it after adding repositories.

## Live data
`/api/github` and `/api/leetcode` run server-side, are cached by the CDN for an hour, keep a last-good copy in memory and return `{ available: false }` when unreachable. The UI then shows a fallback instead of numbers.

## Setup
```
yarn install
yarn dev
```
Copy `.env.example` to `.env.local`:

| Variable | Purpose |
|---|---|
| `GROQ_API_KEY` | chatbot (server-only) |
| `GROQ_MODEL` | optional, defaults to `openai/gpt-oss-20b` |
| `GITHUB_TOKEN` | optional, raises the GitHub API rate limit |
| `NEXT_PUBLIC_FORMSPREE_ID` | optional, defaults to the existing form |

## Deploy
Push to GitHub, import into Vercel, add `GROQ_API_KEY`.
