// Core identity + navigation. Everything else lives in the other data files.
export const SITE = {
  url: "https://vignesh-me.vercel.app",
  name: "Vignesh T",
  shortName: "Vicky",
  role: "Full-Stack Developer",
  email: "vigneshhari8739@gmail.com",
  resume: "/Vignesh-T-Resume.pdf",
  location: "Tamil Nadu, India",
  headline: "Full-stack engineer building secure, production-grade web products.",
  intro:
    "Final-year Electronics & Communication Engineering student with hands-on delivery across React, ASP.NET Core, Node.js and PostgreSQL: payment flows, protected media delivery and responsive interfaces, backed by a strong Java and data-structures foundation.",
  roles: ["Full-Stack Developer", "React + ASP.NET Core", "Java Problem Solver"],
  availability: "Open to full-time and internship roles",
  roleFocus: "Full-Stack Developer",
  roles2: [],
  socials: {
    github: { label: "GitHub", href: "https://github.com/VIGNESH-T2005", user: "VIGNESH-T2005" },
    linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/vignesh-t-web-dev/" },
    leetcode: { label: "LeetCode", href: "https://leetcode.com/u/vignesh_webdev/", user: "vignesh_webdev" },
  },
  formspreeId: "xvzpylkw",
};

// Primary nav shows `main`; grouped pages live in dropdown menus.
export const NAV = {
  main: [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/skills", label: "Skills" },
  ],
  groups: [
    {
      label: "Journey",
      items: [
        { href: "/about", label: "About", desc: "Who I am and how I work" },
        { href: "/experience", label: "Experience", desc: "Internship and training" },
        { href: "/education", label: "Education", desc: "Degree, school, certifications" },
        { href: "/achievements", label: "Achievements", desc: "Awards and milestones" },
        { href: "/learning", label: "Growth timeline", desc: "How my skills developed" },
      ],
    },
    {
      label: "Code",
      items: [
        { href: "/github", label: "GitHub activity", desc: "Live stats and repository explorer" },
        { href: "/coding", label: "Coding profiles", desc: "LeetCode and activity" },
        { href: "/blog", label: "Engineering notes", desc: "How my projects work" },
        { href: "/changelog", label: "Changelog", desc: "Project history from git" },
      ],
    },
  ],
  tail: [{ href: "/contact", label: "Contact" }],
};

export const FOOTER_LINKS = [
  { title: "Explore", items: [["/", "Home"], ["/about", "About"], ["/skills", "Skills"], ["/projects", "Projects"], ["/recruiter", "Recruiter overview"]] },
  { title: "Journey", items: [["/experience", "Experience"], ["/education", "Education"], ["/achievements", "Achievements"], ["/learning", "Learning timeline"]] },
  { title: "Code", items: [["/github", "GitHub activity"], ["/coding", "Coding profiles"], ["/blog", "Engineering notes"], ["/changelog", "Changelog"], ["/command", "Search"]] },
];

export const ABOUT = {
  paragraphs: [
    "I'm a final-year Electronics & Communication Engineering student who builds across the full stack: React interfaces, ASP.NET Core and Node.js services, and PostgreSQL, MySQL or MongoDB data layers.",
    "My flagship project, HRC TECH, is an e-learning platform with role-based access, Stripe payments and watermarked course content. I focus on the parts that make software dependable: authentication, validation, error handling and deployment.",
    "Eighteen public repositories document the journey, from my first HTML, CSS and JavaScript apps in 2025 to Java problem solving and a .NET platform with payments.",
  ],
  interests: [
    "Secure full-stack applications",
    "REST API design, authentication and payments",
    "Data structures and algorithms in Java",
    "Clean, maintainable architecture",
    "Data analytics with Power BI",
  ],
  principles: [
    ["Security by default", "Hashed tokens, httpOnly cookies, rate limits and server-side authorization."],
    ["Delivery over demos", "Live projects on Vercel, Render and Netlify rather than local-only builds."],
    ["Maintainable architecture", "Layered backends and small, well-named components that are easy to extend."],
  ],
  focus: [
    ["Currently", "Full-stack projects with .NET and React; daily Java DSA practice"],
    ["Next", "Deeper testing and deployment automation for HRC TECH"],
    ["Seeking", "Full-time and internship roles in full-stack development"],
  ],
};

export const CHAT_SUGGESTIONS = [
  "What is HRC TECH?",
  "Which technologies does Vignesh know?",
  "What is his education?",
  "How can I contact him?",
];

// Site index: grouped, numbered. Used by the full-screen menu and the page transition label.
export const INDEX = [
  { group: "Profile", items: [
    { href: "/", label: "Overview", desc: "Profile summary" },
    { href: "/about", label: "About", desc: "Background and approach" },
    { href: "/experience", label: "Experience", desc: "Internship and training" },
    { href: "/education", label: "Education", desc: "Degree and certifications" },
    { href: "/achievements", label: "Achievements", desc: "Awards and milestones" },
  ] },
  { group: "Work", items: [
    { href: "/projects", label: "Projects", desc: "Case studies and code" },
    { href: "/skills", label: "Skills", desc: "Technical expertise" },
    { href: "/learning", label: "Growth timeline", desc: "How my skills developed" },
    { href: "/recruiter", label: "Hiring summary", desc: "The one-page overview" },
  ] },
  { group: "Engineering", items: [
    { href: "/github", label: "GitHub activity", desc: "Statistics and repositories" },
    { href: "/coding", label: "Coding profiles", desc: "LeetCode and practice" },
    { href: "/blog", label: "Engineering notes", desc: "How the hard parts work" },
    { href: "/changelog", label: "Release history", desc: "Project milestones" },
  ] },
  { group: "Connect", items: [
    { href: "/contact", label: "Contact", desc: "Get in touch" },
    { href: "/command", label: "Search", desc: "Find anything" },
  ] },
];
