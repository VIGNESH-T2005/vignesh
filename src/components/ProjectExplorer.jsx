"use client";
import { useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";
import { SearchIcon } from "./Icons";

const SORTS = {
  rank: ["Strongest first", (a, b) => a.rank - b.rank],
  recent: ["Recently updated", (a, b) => (b.last ?? "").localeCompare(a.last ?? "")],
  commits: ["Most commits", (a, b) => b.commits - a.commits],
  name: ["Name A to Z", (a, b) => a.title.localeCompare(b.title)],
};

export default function ProjectExplorer({ projects, categories }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("rank");
  const [liveOnly, setLiveOnly] = useState(false);

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return projects
      .filter((p) => (cat === "All" || p.category === cat) && (!liveOnly || p.live))
      .filter((p) => !t || `${p.title} ${p.tagline} ${p.summary} ${p.stack.join(" ")} ${p.category}`.toLowerCase().includes(t))
      .sort(SORTS[sort][1]);
  }, [projects, q, cat, sort, liveOnly]);

  const counts = useMemo(() => Object.fromEntries(["All", ...categories].map((c) => [c, c === "All" ? projects.length : projects.filter((p) => p.category === c).length])), [projects, categories]);
  const featuredFirst = sort === "rank" && cat === "All" && !q.trim() && !liveOnly;

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-line bg-surface p-4 lg:flex-row lg:items-center">
        <label className="relative block flex-1">
          <span className="sr-only">Search projects</span>
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" width={18} height={18} />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, technology or keyword (e.g. Stripe, Java, MongoDB)" className="w-full rounded-xl border border-line bg-bg py-2.5 pl-10 pr-3 text-sm placeholder:text-muted focus:border-accent focus:outline-none" />
        </label>
        <label className="flex items-center gap-2 text-sm text-muted">Sort
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-xl border border-line bg-bg px-3 py-2.5 text-sm text-fg focus:border-accent focus:outline-none">
            {Object.entries(SORTS).map(([k, [label]]) => <option key={k} value={k}>{label}</option>)}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-muted"><input type="checkbox" checked={liveOnly} onChange={(e) => setLiveOnly(e.target.checked)} className="h-4 w-4 accent-[var(--accent)]" /> Live demo only</label>
      </div>

      <div role="group" aria-label="Filter by category" className="mb-6 flex flex-wrap gap-2">
        {["All", ...categories].map((c) => (
          <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={`rounded-full border px-4 py-1.5 text-sm transition ${cat === c ? "border-accent bg-accent text-accent-ink" : "border-line bg-surface text-muted hover:border-accent hover:text-fg"}`}>
            {c} <span className="opacity-70">({counts[c]})</span>
          </button>
        ))}
      </div>

      <p className="mb-4 text-sm text-muted" role="status" aria-live="polite">Showing {list.length} of {projects.length} projects</p>

      {list.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line p-10 text-center text-muted">
          No projects match. <button type="button" className="text-accent underline" onClick={() => { setQ(""); setCat("All"); setLiveOnly(false); }}>Clear filters</button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <div key={p.slug} className={featuredFirst && i === 0 ? "md:col-span-2 lg:col-span-3" : ""}>
              <ProjectCard p={p} featured={featuredFirst && i === 0} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
