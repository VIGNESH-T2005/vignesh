import { SITE, NAV } from "@/data/site";
import { PROJECTS } from "@/data/projects";
import { ALL_REPOS } from "@/data/repos";
import { ALL_SKILLS } from "@/data/skills";
import { POSTS } from "@/data/blog";

const pages = [
  ["/", "Home", "Featured work, stats and activity"],
  ["/recruiter", "Hiring summary", "One-page summary for hiring teams"],
  ["/projects", "Projects", "All projects with search, filters and sorting"],
  ["/skills", "Skills", "Stack, linked to projects"],
  ["/github", "GitHub activity", "Live stats and repository explorer"],
  ["/coding", "Coding profiles", "LeetCode statistics and activity"],
  ["/blog", "Engineering notes", "How the hard parts work"],
  ["/changelog", "Release history", "Dated project milestones"],
  ["/learning", "Growth timeline", "From first apps to full-stack"],
  ...NAV.groups.flatMap((g) => g.items).filter((i) => ["/about", "/experience", "/education", "/achievements"].includes(i.href)).map((i) => [i.href, i.label, i.desc]),
  ["/command", "Search", "Find anything on this site"],
  ["/contact", "Contact", "Send a message"],
];

export const SEARCH_INDEX = [
  ...pages.map(([href, title, desc]) => ({ type: "Page", title, desc, href, keywords: "" })),
  ...PROJECTS.map((p) => ({ type: "Project", title: p.title, desc: p.tagline, href: `/projects/${p.slug}`, keywords: `${p.category} ${p.status} ${p.stack.join(" ")}` })),
  ...ALL_REPOS.map((r) => ({ type: "Repository", title: r.name, desc: r.summary, href: r.url, external: true, keywords: `${r.category} ${r.language ?? ""} ${r.status}` })),
  ...ALL_SKILLS.map((s) => ({ type: "Skill", title: s.name, desc: `${s.tier} · ${s.group}`, href: "/skills", keywords: s.projects.map((p) => p.title).join(" ") })),
  ...POSTS.map((p) => ({ type: "Note", title: p.title, desc: p.summary, href: `/blog/${p.slug}`, keywords: p.tags.join(" ") })),
  { type: "Action", title: "Download resume", desc: "PDF", href: SITE.resume, download: true, keywords: "cv" },
  { type: "Action", title: "Send email", desc: SITE.email, href: `mailto:${SITE.email}`, keywords: "contact mail" },
  { type: "Action", title: "Open GitHub profile", desc: SITE.socials.github.href, href: SITE.socials.github.href, external: true, keywords: "code" },
  { type: "Action", title: "Open LinkedIn", desc: SITE.socials.linkedin.href, href: SITE.socials.linkedin.href, external: true, keywords: "" },
  { type: "Action", title: "Open LeetCode", desc: SITE.socials.leetcode.href, href: SITE.socials.leetcode.href, external: true, keywords: "dsa" },
];

export function searchIndex(query, limit = 40) {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];
  return SEARCH_INDEX.map((item) => {
    const t = item.title.toLowerCase(), d = item.desc.toLowerCase(), k = item.keywords.toLowerCase();
    let score = 0;
    for (const tok of tokens) {
      const s = (t.startsWith(tok) ? 6 : t.includes(tok) ? 4 : 0) + (k.includes(tok) ? 2 : 0) + (d.includes(tok) ? 1 : 0) + (item.type.toLowerCase().startsWith(tok) ? 1 : 0);
      if (!s) return { item, score: 0 };
      score += s;
    }
    return { item, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.item);
}

// Default suggestions shown before the user types.
export const QUICK_ITEMS = SEARCH_INDEX.filter((i) =>
  ["/projects", "/recruiter", "/skills", "/github", "/blog", "/contact"].includes(i.href) && i.type === "Page" || i.title === "Download resume" || i.title === "Send email"
);
