// Single source of truth for the portfolio.
// Every section AND the AI chatbot read from this file, so the site and the
// assistant can never drift apart. Edit facts here only.

export const SITE = {
  url: "https://vignesh-me.vercel.app",
  name: "Vignesh T",
  shortName: "Vicky",
  role: "Full-Stack Developer",
  email: "vigneshhari8739@gmail.com",
  resume: "/Vignesh-T-Resume.pdf",
  location: "Perambalur, Tamil Nadu, India",
  intro:
    "Final-year Electronics & Communication Engineering student who builds secure, production-style web apps with React, ASP.NET Core and PostgreSQL, and sharpens problem solving with DSA in Java.",
  roles: ["Full-Stack Developer", "React + ASP.NET Core", "Java Problem Solver"],
  socials: {
    github: { label: "GitHub", href: "https://github.com/VIGNESH-T2005", user: "VIGNESH-T2005" },
    linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/vignesh-t-web-dev/" },
    leetcode: { label: "LeetCode", href: "https://leetcode.com/u/vignesh_webdev/", user: "vignesh_webdev" },
  },
};

export const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "coding", label: "Coding" },
  { id: "contact", label: "Contact" },
];

export const ABOUT = {
  paragraphs: [
    "I'm an Electronics & Communication Engineering student who moved into software because I enjoy building things people can actually use. I work across the stack: React on the front, ASP.NET Core or Node/Express on the back, and PostgreSQL, MySQL or MongoDB underneath.",
    "My flagship project, HRC TECH, is a full e-learning platform with role-based access, Stripe payments and watermarked course content. I care about the unglamorous parts too: authentication, validation, error handling and deployment.",
  ],
  interests: [
    "Secure, full-stack web applications",
    "REST API design and authentication",
    "Data structures & algorithms in Java",
    "Clean, maintainable component architecture",
  ],
};

// Newest first. Facts come from the current resume.
export const TIMELINE = [
  {
    period: "Ongoing",
    title: "Java Full Stack Development training",
    place: "Placement-focused program",
    detail: "MVC and DAO patterns, web and desktop apps in Java, alongside self-directed MERN-stack learning.",
    type: "learning",
  },
  {
    period: "2026",
    title: "Microsoft badge: ASP.NET Core web development",
    place: "Introduction to .NET Web Development with ASP.NET Core",
    detail: "Foundation for the HRC TECH backend.",
    type: "certification",
  },
  {
    period: "In progress",
    title: "Data Analytics course (100 hours)",
    place: "ICT Academy / Infosys Foundation",
    type: "certification",
  },
  {
    period: "2025",
    title: "Java Programming Course",
    place: "HackerRank certification",
    type: "certification",
  },
  {
    period: "Jun – Jul 2025",
    title: "Web Developer Intern",
    place: "Skill Craft (remote)",
    detail: "Built and styled responsive pages and forms with HTML, CSS and JavaScript; practised testing and debugging UI.",
    type: "experience",
  },
  {
    period: "2024",
    title: "Shield Award, 3rd rank in academics",
    place: "Hertz 24 Symposium, DSEC",
    type: "achievement",
  },
  {
    period: "2023 – 2027",
    title: "B.E. Electronics and Communication Engineering",
    place: "Dhanalakshmi Srinivasan Engineering College, Perambalur",
    detail: "CGPA 8.21 / 10",
    type: "education",
  },
  {
    period: "2020 – 2023",
    title: "Higher Secondary & Secondary School",
    place: "Jawahar Higher Secondary School, Neyveli",
    detail: "Class XII: 78.6%  ·  Class X: 76.4%",
    type: "education",
  },
];

// Only technologies that appear in the resume or in verified project code.
export const SKILL_GROUPS = [
  {
    id: "programming",
    title: "Programming",
    items: [
      { name: "Java", note: "OOP, Collections, DSA practice and MVC/DAO training projects." },
      { name: "JavaScript", note: "ES6+, async/await, closures and array methods; used in every web project." },
      { name: "C#", note: "Backend language for HRC TECH (ASP.NET Core, .NET 8)." },
      { name: "SQL", note: "Queries and schema design on MySQL and PostgreSQL." },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    items: [
      { name: "React", note: "Hooks, context, routing and protected routes in HRC TECH and Shop-Zone." },
      { name: "Next.js", note: "App Router and API routes; this portfolio and its AI chatbot." },
      { name: "Tailwind CSS", note: "Responsive, theme-aware UI across all projects." },
      { name: "HTML5 & CSS3", note: "Semantic, accessible markup and responsive layouts." },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    items: [
      { name: "ASP.NET Core", note: "Web API with layered architecture, JWT auth, rate limiting and background workers." },
      { name: "Node.js & Express", note: "REST API for the Shop-Zone product catalogue." },
      { name: "REST APIs", note: "Resource design, validation, status codes and error handling." },
      { name: "JWT & role-based auth", note: "Access tokens, httpOnly refresh cookies and Admin/Student authorization." },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    items: [
      { name: "PostgreSQL", note: "Primary database for HRC TECH via Entity Framework Core." },
      { name: "MySQL", note: "Relational modelling and SQL practice." },
      { name: "MongoDB", note: "Product data for Shop-Zone on MongoDB Atlas." },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    items: [
      { name: "Git & GitHub", note: "Version control, issues and repository management." },
      { name: "Docker", note: "Docker Compose setup for the HRC TECH stack." },
      { name: "Postman & Swagger", note: "API testing and documentation." },
      { name: "Vercel & Render", note: "Frontend hosting on Vercel, backend hosting on Render." },
    ],
  },
];

// Verified against the actual repositories (see README for notes).
export const PROJECTS = [
  {
    id: "hrc-tech",
    title: "HRC TECH",
    badge: "Flagship",
    category: "Full-Stack",
    tagline: "Secure e-learning platform with payments and protected course content",
    summary:
      "Students browse and buy courses, then learn from video and PDF lessons with quizzes and progress tracking. Admins manage courses, lessons, quizzes and enrollments.",
    image: "/hrc-tech.png",
    imageAlt: "HRC TECH sign-up screen with the Create a student account form",
    stack: ["React", "Vite", "Tailwind CSS", "ASP.NET Core 8", "Entity Framework Core", "PostgreSQL", "Stripe", "FFmpeg", "Docker"],
    features: [
      "Student and Admin roles with backend-enforced authorization",
      "JWT access tokens plus an httpOnly refresh-token cookie; rate-limited auth endpoints",
      "Stripe Checkout (test mode) with signature-verified, idempotent webhooks",
      "Purchase-based access to video and PDF lessons through short-lived content tokens",
      "Background pipeline that watermarks videos (FFmpeg) and PDFs for each lesson",
      "Quizzes with scored attempts and per-lesson progress tracking",
      "Admin screens for courses, lessons, quizzes and enrollments",
    ],
    highlights: [
      "Layered backend: Domain, Application, Infrastructure and Api projects",
      "Content is never served as static files; access tokens are stored hashed (SHA-256)",
      "Frontend keeps the access token in memory, not in localStorage",
    ],
    github: "https://github.com/VIGNESH-T2005/hrc-tech",
    live: "https://hrctech.onrender.com/",
    note: "The backend runs on Render, so the first request after idle time can be slow.",
  },
  {
    id: "shop-zone",
    title: "Shop-Zone",
    badge: "E-commerce",
    category: "E-Commerce",
    tagline: "Responsive storefront with search, filtering and a live cart",
    summary:
      "A React storefront that loads its catalogue from a REST API, with real-time search, category filters, product detail pages and a cart with quantity controls.",
    image: "/shop_zone.png",
    imageAlt: "Shop-Zone storefront showing the product grid",
    stack: ["React 18", "Vite", "Tailwind CSS", "React Router", "Context API", "Axios", "Node.js", "Express", "MongoDB Atlas"],
    features: [
      "Product catalogue fetched from a REST API (Node/Express on Render, MongoDB Atlas)",
      "Real-time search and category filtering",
      "Product detail pages with description and rating",
      "Cart with add, remove and quantity controls and a live total",
      "Navbar cart badge and fully responsive layout",
    ],
    highlights: [
      "Frontend on Vercel and API on Render, with CORS configured between them",
      "Global cart state managed with React Context",
    ],
    github: "https://github.com/VIGNESH-T2005/shop_zone",
    live: "https://shop-zone-ecomm.vercel.app/",
    note: "Checkout is a demo flow; no real payments are processed.",
  },
  {
    id: "portfolio",
    title: "This Portfolio",
    badge: "AI + Web",
    category: "AI & Web",
    tagline: "Next.js portfolio with a grounded AI assistant",
    summary:
      "The site you're on: a Next.js App Router portfolio with a Groq-powered chatbot that answers only from verified facts about my skills and projects.",
    image: null,
    stack: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Groq (LLaMA)", "Vercel"],
    features: [
      "Server-side chat API route; the API key never reaches the browser",
      "Chatbot grounded in a single data file, with validation and rate limiting",
      "Live GitHub and LeetCode stats with graceful fallbacks",
      "Dark and light themes, keyboard-accessible navigation and project modals",
    ],
    highlights: ["Content lives in one data file shared by the UI and the chatbot"],
    github: "https://github.com/VIGNESH-T2005/vignesh",
    live: "https://vignesh-me.vercel.app",
  },
];

export const CODING = {
  // Used only as a static fallback line; live numbers are never invented.
  leetcodeNote: "Practising DSA in Java on LeetCode.",
};

// Starter prompts for the chatbot.
export const CHAT_SUGGESTIONS = [
  "What is HRC TECH?",
  "Which technologies does Vignesh know?",
  "Tell me about his education",
  "How can I contact him?",
];

// Plain-text knowledge base handed to the chatbot (small enough to send whole).
export function buildKnowledgeBase() {
  const skills = SKILL_GROUPS.map((g) => `${g.title}: ${g.items.map((i) => i.name).join(", ")}`).join("\n");
  const projects = PROJECTS.map(
    (p) =>
      `${p.title} (${p.category}): ${p.summary}\nStack: ${p.stack.join(", ")}\nKey features: ${p.features.join("; ")}\nGitHub: ${p.github}\nLive: ${p.live}${p.note ? `\nNote: ${p.note}` : ""}`
  ).join("\n\n");
  const timeline = TIMELINE.map(
    (t) => `${t.period}: ${t.title} - ${t.place}${t.detail ? ` (${t.detail})` : ""}`
  ).join("\n");

  return `NAME: ${SITE.name}
ROLE: ${SITE.role} (final-year ECE student seeking a full-stack developer position)
LOCATION: ${SITE.location}
SUMMARY: ${SITE.intro}
ABOUT: ${ABOUT.paragraphs.join(" ")}
INTERESTS: ${ABOUT.interests.join("; ")}

SKILLS
${skills}

PROJECTS
${projects}

EDUCATION, EXPERIENCE AND ACHIEVEMENTS
${timeline}

LEETCODE: ${SITE.socials.leetcode.href} (solved 75+ problems at the time of the latest resume, mainly in Java)
CONTACT: ${SITE.email}; GitHub ${SITE.socials.github.href}; LinkedIn ${SITE.socials.linkedin.href}
RESUME: ${SITE.url}${SITE.resume}`;
}
