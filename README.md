<div align="center">

#  Vignesh T — Portfolio Website

**A modern, AI-powered personal portfolio built with Next.js 16**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

##  Overview

A sleek, interactive portfolio website that goes beyond static pages — featuring an **AI-powered chatbot** that understands my projects, skills, and experience to answer visitor questions in real time. Built with a modern full-stack setup using Next.js App Router, animated with Framer Motion, and styled with Tailwind CSS v4.

---

##  Features

| Feature | Description |
|---|---|
|  **AI Chatbot** | Powered by LLaMA 3.1 via Groq SDK — answers questions about projects, skills & experience using semantic search with Xenova embeddings |
|  **Contact Form** | Email integration via Resend with server-side API route |
|  **Smooth Animations** | Framer Motion transitions & React Type Animation for a polished feel |
|  **Fully Responsive** | Mobile-first design that looks great on all screen sizes |
|  **LeetCode Stats** | Live stats fetched from LeetCode Stats API |
|  **Optimized Performance** | Next.js image optimization, API response caching, and code splitting |
|  **Modular Architecture** | Clean, reusable component structure for easy maintenance |

---

##  Tech Stack

### Frontend
- **[Next.js 16](https://nextjs.org/)** — App Router, Server Components, API Routes
- **[React 19](https://react.dev/)** — UI library with latest concurrent features
- **[Tailwind CSS 4](https://tailwindcss.com/)** — Utility-first styling with PostCSS
- **[Framer Motion](https://www.framer.com/motion/)** — Declarative animations
- **[React Type Animation](https://github.com/maxeth/react-type-animation)** — Typewriter effects

### Backend & AI
- **[Groq SDK](https://groq.com/)** — Ultra-fast LLaMA 3.1 inference for the chatbot
- **[Xenova Transformers](https://github.com/xenova/transformers.js)** — Client-side embeddings for semantic context retrieval
- **[LeetCode Stats API](https://github.com/JeremyTsaii/leetcode-stats-api)** — Dynamic coding stats
- **[Resend](https://resend.com/)** — Transactional email API

### Tooling
- **ESLint** + **Babel React Compiler** — Code quality & optimization
- **[HeroIcons](https://heroicons.com/)** — Icon library
- **PDF.js** — PDF handling

---

##  Project Structure

```
portfolio-website/
├── public/
│   ├── github-icon.svg
│   ├── linkedin-icon.svg
│   └── ...                        # Static assets
│
└── src/
    ├── api/
    │   └── send/
    │       └── route.js            # Email API route (Resend)
    │
    ├── app/
    │   ├── favicon.ico
    │   ├── globals.css             # Global styles
    │   ├── layout.js               # Root layout
    │   └── page.js                 # Home page entry
    │
    └── components/
        ├── HeroSection.jsx         # Landing / intro section
        ├── AboutMeSection.jsx      # About section with tabs
        ├── ProjectSection.jsx      # Projects grid
        ├── ProjectCard.jsx         # Individual project card
        ├── EmailSection.jsx        # Contact form
        ├── Navbar.jsx              # Top navigation bar
        ├── NavLink.jsx             # Navigation link component
        ├── MenuCard.jsx            # Mobile menu card
        ├── TabButton.jsx           # Reusable tab button
        └── Footer.jsx              # Footer
```


##  How the AI Chatbot Works

1. Portfolio data (projects, skills, experience) is preprocessed into text chunks.
2. **Xenova Transformers** generates local embeddings for each chunk.
3. When a user sends a message, the query is embedded and the most relevant chunks are retrieved via cosine similarity.
4. The retrieved context + user message are sent to **Groq's LLaMA 3.1** API.
5. The response streams back to the UI in real time.

---

<div align="center">

Made with ❤️ by **Vignesh T**

[LinkedIn](https://www.linkedin.com/in/vignesh-t-web-dev/) · [GitHub](https://github.com/VIGNESH-T2005) · [Portfolio](https://vignesh-me.vercel.app)

</div>
