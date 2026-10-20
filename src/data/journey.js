import { repoStats } from "./repos";

export const EXPERIENCE = [
  {
    id: "skill-craft",
    role: "Web Developer Intern",
    org: "Skill Craft",
    mode: "Remote",
    period: "Jun 2025 – Jul 2025",
    summary: "Short web development internship focused on front-end fundamentals.",
    points: [
      "Built and styled responsive web pages and forms with HTML, CSS and JavaScript.",
      "Practised testing and debugging user-interface behaviour.",
      "Started my first public repositories during this period (stopwatch and Tic-Tac-Toe apps).",
    ],
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: "java-fsd",
    role: "Java Full Stack Development training",
    org: "Placement-focused training program",
    mode: "Ongoing",
    period: "2026 – present",
    summary: "Structured training alongside self-directed MERN and .NET projects.",
    points: [
      "MVC and DAO patterns, web and desktop applications in Java (see the java-mvc and java-awt repositories).",
      "Core Java OOP, collections and problem solving (java_oops_dsa, ps_java, Java_Problems).",
    ],
    tech: ["Java", "Servlets", "JSP", "JDBC", "MySQL"],
  },
  {
    id: "projects",
    role: "Independent project work",
    org: "Self-directed",
    mode: "Open source on GitHub",
    period: "2025 – present",
    summary: "Full-stack projects built end to end and deployed.",
    points: [
      "HRC TECH: ASP.NET Core and React e-learning platform with Stripe and watermarking.",
      "Shop-Zone: React storefront with an Express and MongoDB API.",
      "Power BI: five dashboard projects.",
    ],
    tech: ["ASP.NET Core", "React", "Node.js", "PostgreSQL", "MongoDB", "Power BI"],
  },
];

export const EDUCATION = [
  { period: "2023 – 2027", title: "B.E. Electronics and Communication Engineering", place: "Dhanalakshmi Srinivasan Engineering College (DSEC), Perambalur", detail: "CGPA 8.21 / 10", current: true },
  { period: "2020 – 2023", title: "Higher Secondary (Class XII)", place: "Jawahar Higher Secondary School, Neyveli", detail: "78.6%" },
  { period: "2020 – 2021", title: "Secondary School (Class X)", place: "Jawahar Higher Secondary School, Neyveli", detail: "76.4%" },
];

export const CERTIFICATIONS = [
  { year: "2026", title: "Introduction to .NET Web Development with ASP.NET Core", issuer: "Microsoft Learn", kind: "Badge", relevance: "Backend foundation for HRC TECH" },
  { year: "2025", title: "Java Programming Course", issuer: "HackerRank", kind: "Certificate", relevance: "Java fundamentals" },
  { year: "In progress", title: "Data Analytics Certificate Course (100 hours)", issuer: "ICT Academy / Infosys Foundation", kind: "Course", relevance: "Pairs with the Power BI projects" },
];

export const ACHIEVEMENTS = [
  { year: "2024", title: "Shield Award: 3rd rank in academics", org: "Hertz 24 Symposium, DSEC", kind: "Academic" },
  { year: "Ongoing", title: "Solved 75+ LeetCode problems", org: "LeetCode (per resume)", kind: "Problem solving", note: "Focused on Java and core data structures. Live numbers appear on the Coding page when available." },
];

// Engineering milestones computed from real git history.
export const MILESTONES = [
  { title: "First public repository", date: repoStats("Sw_wd").first, detail: "Interactive stopwatch in HTML, CSS and JavaScript." },
  { title: "First full-stack project deployed", date: repoStats("shop_zone-backend").last, detail: "Shop-Zone frontend on Vercel and API on Render." },
  { title: "Flagship platform built in 18 days", date: repoStats("hrc-tech").last, detail: `HRC TECH: ${repoStats("hrc-tech").commits} commits from ${repoStats("hrc-tech").first} to ${repoStats("hrc-tech").last}.` },
];

// Learning timeline built from first/last commit dates of each repository.
export const LEARNING = [
  { date: "2025-06-21", title: "HTML, CSS and JavaScript apps", detail: "Stopwatch (Jun 2025) and Tic-Tac-Toe (Jul 2025), deployed on Netlify; alongside the Skill Craft internship.", repo: "Sw_wd", topic: "Web basics" },
  { date: "2026-03-03", title: "Exploring Spring Boot with AI assistance", detail: "A centralized LMS prototype built through AI-assisted pull requests.", repo: "lms", topic: "Backend" },
  { date: "2026-05-28", title: "Java OOP and collections", detail: "22 commits covering the four OOP pillars, methods and collections.", repo: "java_oops_dsa", topic: "Java" },
  { date: "2026-06-01", title: "JavaScript fundamentals", detail: "Array methods, closures, callbacks, promises and async/await.", repo: "js_basics", topic: "JavaScript" },
  { date: "2026-06-04", title: "Portfolio v1 in Next.js", detail: "First Next.js site with a LeetCode stats section and contact form.", repo: "vignesh", topic: "Frontend" },
  { date: "2026-06-07", title: "React and Node.js: Shop-Zone", detail: "React storefront, then an Express and MongoDB API with JWT and orders; deployed 20 Jun.", repo: "shop_zone", topic: "Full-stack" },
  { date: "2026-06-09", title: "DSA in Java begins", detail: "Arrays and two-pointer patterns.", repo: "DSA", topic: "DSA" },
  { date: "2026-06-23", title: "Java GUI and MVC web apps", detail: "AWT/Swing forms, then a Servlet + JSP + JDBC registration app.", repo: "java-awt", topic: "Java" },
  { date: "2026-07-19", title: "Problem-solving practice", detail: "30 Java programs across strings, arrays and number problems.", repo: "ps_java", topic: "DSA" },
  { date: "2026-09-03", title: "Daily Java problems", detail: "28 commits of numbered problems and LeetCode solutions.", repo: "Java_Problems", topic: "DSA" },
  { date: "2026-09-19", title: "HRC TECH on .NET 8", detail: "Clean architecture, Stripe, watermarking, quizzes and a React frontend in 18 days.", repo: "hrc-tech", topic: "Full-stack" },
  { date: "2026-10-07", title: "Power BI analytics", detail: "Five dashboards with DAX and data modelling.", repo: "PowerBI-DataAnalytics", topic: "Data" },
];
