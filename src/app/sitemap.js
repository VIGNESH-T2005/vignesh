import { SITE, NAV } from "@/data/site";
import { PROJECTS } from "@/data/projects";
import { POSTS } from "@/data/blog";

export default function sitemap() {
  const now = new Date();
  const staticPaths = ["/", "/projects", "/skills", "/recruiter", "/github", "/coding", "/blog", "/changelog", "/learning", "/command", "/contact", ...NAV.groups.flatMap((g) => g.items.map((i) => i.href))];
  const uniq = [...new Set(staticPaths)];
  return [
    ...uniq.map((p) => ({ url: `${SITE.url}${p === "/" ? "" : p}`, lastModified: now, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 })),
    ...PROJECTS.map((p) => ({ url: `${SITE.url}/projects/${p.slug}`, lastModified: now, changeFrequency: "monthly", priority: p.rank <= 3 ? 0.9 : 0.6 })),
    ...POSTS.map((p) => ({ url: `${SITE.url}/blog/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "yearly", priority: 0.6 })),
  ];
}
