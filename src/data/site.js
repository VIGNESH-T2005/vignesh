// Core identity + navigation. Everything else lives in the other data files.
export const SITE = {
  url: "https://vignesh-me.vercel.app",
  name: "Vignesh T",
  shortName: "Vicky",
  role: "Full-Stack Developer",
  email: "vigneshhari8739@gmail.com",
  resume: "/Vignesh-T-Resume.pdf",
  location: "Tamil Nadu, India",
  headline: "I build secure, production-style full-stack web apps.",
  intro:
    "Final-year Electronics & Communication Engineering student building full-stack applications with React, ASP.NET Core, Node.js and PostgreSQL, and practising problem solving with DSA in Java.",
  roles: ["Full-Stack Developer", "React + ASP.NET Core", "Java Problem Solver"],
  availability: "Open to internships and full-time full-stack developer roles",
  roleFocus: "Full-Stack Developer",
  roles2: [],
  socials: {
    github: { label: "GitHub", href: "https://github.com/VIGNESH-T2005", user: "VIGNESH-T2005" },
    linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/vignesh-t-web-dev/" },
    leetcode: { label: "LeetCode", href: "https://leetcode.com/u/vignesh_webdev/", user: "vignesh_webdev" },
  },
  formspreeId: "xvzpylkw",
  dataAsOf: "19 Oct 2026",
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
        { href: "/learning", label: "Learning timeline", desc: "How my skills grew, repo by repo" },
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
  { title: "Code", items: [["/github", "GitHub activity"], ["/coding", "Coding profiles"], ["/blog", "Engineering notes"], ["/changelog", "Changelog"], ["/command", "Command center"]] },
];

export const ABOUT = {
  paragraphs: [
    "I'm an Electronics & Communication Engineering student who moved into software because I like building things people can actually use. I work across the stack: React on the front, ASP.NET Core or Node/Express on the back, and PostgreSQL, MySQL or MongoDB underneath.",
    "My flagship project, HRC TECH, is a full e-learning platform with role-based access, Stripe payments and watermarked course content. I care about the unglamorous parts too: authentication, validation, error handling and deployment.",
    "I learn in public. Every repository on my GitHub is real work, from my first HTML/CSS/JS apps in 2025 to Java problem-solving practice and a .NET platform. This site shows all of it, including the small and unfinished parts.",
  ],
  interests: [
    "Secure, full-stack web applications",
    "REST API design, authentication and payments",
    "Data structures & algorithms in Java",
    "Clean, maintainable architecture",
    "Data analytics with Power BI",
  ],
  principles: [
    ["Verify, then claim", "Everything on this site is traceable to a repository, a commit or my resume."],
    ["Security by default", "Hashed tokens, httpOnly cookies, rate limits and server-side authorization."],
    ["Ship it", "Deployed demos on Vercel, Render and Netlify, not just local projects."],
  ],
  focus: [
    ["Now", "Full-stack projects with .NET and React; Java DSA practice"],
    ["Next", "Deeper testing and deployment automation for HRC TECH"],
    ["Looking for", "Internships and full-time full-stack developer roles"],
  ],
};

export const CHAT_SUGGESTIONS = [
  "What is HRC TECH?",
  "Which technologies does Vignesh know?",
  "What is his education?",
  "How can I contact him?",
];
