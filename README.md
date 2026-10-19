# Vignesh T: Developer Portfolio

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Framer Motion · Groq (LLaMA) chatbot

Live: https://vignesh-me.vercel.app

## Features
- Dark theme by default with a light toggle (saved, no flash on load)
- Sticky navbar with active-section highlighting and a mobile menu
- Hero with animated roles, resume download and social links
- About, education and learning timeline
- Skills grouped by area; only technologies used in real projects
- Projects with category filters and detail modals (HRC TECH, Shop-Zone, this portfolio)
- Live GitHub and LeetCode stats with graceful fallbacks (no invented numbers)
- AI assistant grounded in the same data file as the site
- Validated contact form (Formspree) with a spam trap; footer with dynamic year
- SEO: metadata, Open Graph, JSON-LD, sitemap, robots

## Edit your content in one place
Everything on the page and everything the chatbot knows comes from `src/data/site.js`.

## Setup
```
yarn install
yarn dev
```
Copy `.env.example` to `.env.local` and fill in:

| Variable | Required | Purpose |
|---|---|---|
| `GROQ_API_KEY` | for chatbot | Server-only. Without it the chatbot shows a friendly fallback. |
| `GROQ_MODEL` | no | Defaults to `llama-3.1-8b-instant` |
| `GITHUB_TOKEN` | no | Raises the GitHub API rate limit for the stats card |
| `NEXT_PUBLIC_FORMSPREE_ID` | no | Defaults to the existing form |

## Deploy
Push to GitHub, import in Vercel, add `GROQ_API_KEY` under Project Settings > Environment Variables.

## Structure
```
src/app/            layout, page, api/chat, api/github, api/leetcode, robots, sitemap
src/components/     Navbar, HeroSection, AboutMeSection, SkillsSection, ProjectSection,
                    ProjectCard, ProjectModal, CodingStatsSection, EmailSection,
                    AiChatbotSection, Footer, Icons, Reveal, ThemeToggle
src/data/site.js    single source of truth
```
