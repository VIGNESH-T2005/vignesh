import { PROJECTS, projectStats } from "@/data/projects";

// Light, serialisable project summaries for client components and listings.
export function projectSummaries() {
  return PROJECTS.map((p) => {
    const st = projectStats(p);
    return {
      slug: p.slug, title: p.title, tagline: p.tagline, summary: p.summary, category: p.category, status: p.status,
      stack: p.stack, image: p.image, imageAlt: p.imageAlt ?? null, rank: p.rank, type: p.type,
      commits: st.commits, first: st.first, last: st.last, github: st.repos[0]?.url ?? null, live: p.live ?? null,
    };
  });
}
