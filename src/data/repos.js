import activity from "./activity.json";

// All 18 public repositories, reviewed and classified. Commit data comes from git history
// (see activity.json, snapshot dated in SITE.dataAsOf). Nothing here is estimated.
//   kind: "project" (an application) | "learning" (practice/exercises) | "meta" (profile, scaffold, empty)
export const REPOS = [
  { name: "hrc-tech", kind: "project", category: "Full-Stack", status: "Deployed", language: "C#", project: "hrc-tech", summary: "Secure e-learning platform: ASP.NET Core 8 API, React/Vite frontend, PostgreSQL, Stripe, and watermarked video/PDF lessons." },
  { name: "shop_zone", kind: "project", category: "Full-Stack", status: "Deployed", language: "JavaScript", project: "shop-zone", summary: "React storefront with search, category filter, product pages and a cart; consumes the Shop-Zone REST API." },
  { name: "shop_zone-backend", kind: "project", category: "Full-Stack", status: "Deployed", language: "JavaScript", project: "shop-zone", summary: "Node/Express REST API with MongoDB, JWT auth, bcrypt, admin middleware and order processing." },
  { name: "vignesh", kind: "project", category: "Full-Stack", status: "Deployed", language: "JavaScript", project: "portfolio", summary: "This portfolio: Next.js multi-page site with live GitHub/LeetCode data and an AI assistant." },
  { name: "lms", kind: "project", category: "Full-Stack", status: "Prototype", language: "Java", project: "lms", summary: "Centralized LMS prototype with Spring Boot, React and MySQL. Built with AI-assisted tooling (Codex pull requests)." },
  { name: "PowerBI-DataAnalytics", kind: "project", category: "Data Analytics", status: "Complete", language: null, project: "powerbi-analytics", summary: "Five Power BI dashboard projects: IPL, HR, college placement, Amazon Prime and AdventureWorks." },
  { name: "Tic-Tac-Toe", kind: "project", category: "Frontend", status: "Deployed", language: "JavaScript", project: "tic-tac-toe", summary: "Browser Tic-Tac-Toe against a simple computer opponent." },
  { name: "Sw_wd", kind: "project", category: "Frontend", status: "Deployed", language: "JavaScript", project: "stopwatch", summary: "Browser stopwatch with lap tracking and keyboard shortcuts." },
  { name: "java-mvc", kind: "project", category: "Java", status: "Practice", language: "Java", project: "java-mvc", summary: "Beginner Java MVC web app: Servlet, JSP and JDBC against a MySQL student database." },
  { name: "java-awt", kind: "project", category: "Java", status: "Practice", language: "Java", project: "java-awt", summary: "Java GUI practice: login and reset-password forms." },
  { name: "Java_Problems", kind: "learning", category: "Learning", status: "Ongoing", language: "Java", project: "java-problems", summary: "Java problem-solving practice including LeetCode solutions." },
  { name: "ps_java", kind: "learning", category: "Learning", status: "Complete", language: "Java", project: "ps-java", summary: "Java problem-solving: strings, arrays, control flow and number problems." },
  { name: "java_oops_dsa", kind: "learning", category: "Learning", status: "Complete", language: "Java", project: "java-oops", summary: "Java OOP concepts and collections exercises." },
  { name: "DSA", kind: "learning", category: "Learning", status: "Early stage", language: "Java", project: "dsa-java", summary: "Java DSA practice starting with arrays and two-pointer problems." },
  { name: "js_basics", kind: "learning", category: "Learning", status: "Complete", language: "JavaScript", project: "js-basics", summary: "JavaScript fundamentals: array methods, closures and async patterns." },
  { name: "VIGNESH-T2005", kind: "meta", category: "Profile", status: "Maintained", language: null, project: null, summary: "GitHub profile README." },
  { name: "Java_lib", kind: "meta", category: "Scaffold", status: "Scaffold only", language: null, project: null, summary: "Eclipse dynamic-web-project scaffold with no application code yet." },
  { name: "SkyWay", kind: "meta", category: "Empty", status: "Empty repository", language: null, project: null, summary: "Empty repository with no commits yet." },
];

const gh = (n) => `https://github.com/VIGNESH-T2005/${n}`;

export function repoStats(name) {
  return activity.repos[name] ?? { commits: 0, first: null, last: null, activeDays: 0 };
}

export function repoWithStats(r) {
  const s = repoStats(r.name);
  return { ...r, url: gh(r.name), ...s, loc: Object.values(activity.locByRepo[r.name] ?? {}).reduce((a, b) => a + b, 0) };
}

export const ALL_REPOS = REPOS.map(repoWithStats);

export const TOTALS = (() => {
  const withCode = ALL_REPOS.filter((r) => r.commits > 0);
  return {
    repos: ALL_REPOS.length,
    commits: withCode.reduce((a, r) => a + r.commits, 0),
    activeDays: Object.keys(activity.daily).length,
    since: Object.keys(activity.daily)[0],
    loc: Object.values(activity.loc).reduce((a, b) => a + b, 0),
    projects: ALL_REPOS.filter((r) => r.kind === "project").length,
  };
})();

export const ACTIVITY = activity;
export { gh };
