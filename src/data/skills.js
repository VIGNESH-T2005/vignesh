import { PROJECTS } from "./projects";

// Skills are evidence-based: each lists the projects/repositories where it was actually used.
// Tier is computed, not self-rated:
//   Core     = used in a deployed full-stack project, or across four or more repositories
//   Working  = used in at least one real project
//   Learning = only used in practice or AI-assisted prototype repositories
const S = (name, used, note) => ({ name, used, note });

export const SKILL_GROUPS = [
  {
    id: "languages",
    title: "Languages",
    items: [
      S("Java", ["java-problems", "ps-java", "java-oops", "dsa-java", "java-mvc", "java-awt", "lms"], "OOP, collections, problem solving and servlet-based web apps."),
      S("JavaScript", ["js-basics", "shop-zone", "portfolio", "tic-tac-toe", "stopwatch"], "ES6+, async/await, closures; used in every web project."),
      S("C#", ["hrc-tech"], "Backend language of HRC TECH on .NET 8."),
      S("SQL", ["hrc-tech", "java-mvc", "lms"], "Queries and schema design on PostgreSQL and MySQL."),
      S("DAX", ["powerbi-analytics"], "Measures and data modelling in Power BI."),
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    items: [
      S("React", ["hrc-tech", "shop-zone", "lms"], "Hooks, context, routing and protected routes."),
      S("Next.js", ["portfolio"], "App Router, static generation and API routes."),
      S("Tailwind CSS", ["hrc-tech", "shop-zone", "portfolio"], "Responsive, token-based UI styling."),
      S("HTML & CSS", ["tic-tac-toe", "stopwatch", "shop-zone"], "Semantic markup and responsive layout."),
      S("Vite", ["hrc-tech", "shop-zone", "lms"], "Build tooling for React apps."),
    ],
  },
  {
    id: "backend",
    title: "Backend",
    items: [
      S("ASP.NET Core", ["hrc-tech"], "Layered Web API with Identity, rate limiting and background workers."),
      S("Node.js & Express", ["shop-zone"], "REST API with MVC folders and middleware."),
      S("REST API design", ["hrc-tech", "shop-zone", "lms"], "Resource routes, validation, status codes."),
      S("JWT & role-based auth", ["hrc-tech", "shop-zone"], "Access tokens, refresh cookies, admin authorization."),
      S("Stripe payments", ["hrc-tech"], "Checkout sessions and signed, idempotent webhooks."),
      S("Spring Boot", ["lms"], "Layered service over Spring Data JPA (AI-assisted prototype)."),
      S("Servlets & JSP", ["java-mvc"], "MVC web app with JDBC."),
    ],
  },
  {
    id: "databases",
    title: "Databases",
    items: [
      S("PostgreSQL", ["hrc-tech"], "EF Core migrations, relational modelling."),
      S("MongoDB", ["shop-zone"], "Mongoose models on Atlas."),
      S("MySQL", ["lms", "java-mvc"], "Relational basics with JDBC and JPA."),
      S("Entity Framework Core", ["hrc-tech"], "Code-first migrations and DbContext."),
    ],
  },
  {
    id: "data",
    title: "Data & Analytics",
    items: [S("Power BI", ["powerbi-analytics"], "Five report projects with cleaning, modelling and visuals.")],
  },
  {
    id: "tools",
    title: "Tools & Deployment",
    items: [
      S("Git & GitHub", PROJECTS.map((p) => p.slug), "Version control for every project."),
      S("Docker", ["hrc-tech", "lms"], "Compose setups for API, database and frontend."),
      S("FFmpeg", ["hrc-tech"], "Video watermarking pipeline."),
      S("Swagger / OpenAPI", ["hrc-tech"], "API documentation and manual testing."),
      S("Vercel, Render, Netlify", ["shop-zone", "hrc-tech", "portfolio", "tic-tac-toe", "stopwatch"], "Hosting for frontends and backends."),
    ],
  },
];

const bySlug = Object.fromEntries(PROJECTS.map((p) => [p.slug, p]));

export function tierOf(skill) {
  const used = skill.used.map((s) => bySlug[s]).filter(Boolean);
  const real = used.filter((p) => p.type !== "learning" && p.slug !== "lms");
  const deployed = real.some((p) => ["hrc-tech", "shop-zone", "portfolio"].includes(p.slug));
  if (deployed || skill.used.length >= 4) return "Core";
  if (real.length >= 1) return "Working";
  return "Learning";
}

export const ALL_SKILLS = SKILL_GROUPS.flatMap((g) =>
  g.items.map((s) => ({ ...s, group: g.title, tier: tierOf(s), projects: s.used.map((u) => bySlug[u]).filter(Boolean) }))
);
