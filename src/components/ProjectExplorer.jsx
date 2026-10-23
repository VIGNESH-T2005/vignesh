"use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import ProjectCard, { ProjectShowcase } from "./ProjectCard";
import { Tag, statusTone } from "./ui";
import { SearchIcon, ArrowUpRightIcon } from "./Icons";

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
  const [view, setView] = useState("gallery");
  const [hover, setHover] = useState(null);
  const previewRef = useRef(null);

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return projects
      .filter((p) => (cat === "All" || p.category === cat) && (!liveOnly || p.live))
      .filter((p) => !t || `${p.title} ${p.tagline} ${p.summary} ${p.stack.join(" ")} ${p.category}`.toLowerCase().includes(t))
      .sort(SORTS[sort][1]);
  }, [projects, q, cat, sort, liveOnly]);
  const counts = useMemo(() => Object.fromEntries(["All", ...categories].map((c) => [c, c === "All" ? projects.length : projects.filter((p) => p.category === c).length])), [projects, categories]);
  const showcaseFirst = view === "gallery" && sort === "rank" && cat === "All" && !q.trim() && !liveOnly;
  const hovered = projects.find((p) => p.slug === hover);

  const onMove = (e) => { if (previewRef.current) previewRef.current.style.transform = `translate(${e.clientX + 28}px, ${e.clientY - 90}px)`; };
  const seg = (on) => `rounded-full px-4 py-2 text-sm transition ${on ? "bg-accent text-accent-ink" : "text-muted hover:text-fg"}`;

  return (
    <div>
      <div className="glass mb-6 flex flex-col gap-4 rounded-3xl p-4 lg:flex-row lg:items-center">
        <label className="relative block flex-1">
          <span className="sr-only">Search projects</span>
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" width={18} height={18} />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or technology: Stripe, Java, MongoDB…" className="w-full rounded-2xl border border-line bg-bg/60 py-3 pl-11 pr-3 text-sm placeholder:text-muted focus:border-accent focus:outline-none" />
        </label>
        <label className="flex items-center gap-2 text-sm text-muted">Sort
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-2xl border border-line bg-bg/60 px-3 py-3 text-sm text-fg focus:border-accent focus:outline-none">
            {Object.entries(SORTS).map(([k, [label]]) => <option key={k} value={k}>{label}</option>)}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-muted"><input type="checkbox" checked={liveOnly} onChange={(e) => setLiveOnly(e.target.checked)} className="h-4 w-4 accent-[var(--accent)]" /> Live demo only</label>
        <div role="group" aria-label="Layout" className="flex rounded-full border border-line-2 p-1">
          <button type="button" aria-pressed={view === "gallery"} onClick={() => setView("gallery")} className={seg(view === "gallery")}>Gallery</button>
          <button type="button" aria-pressed={view === "index"} onClick={() => setView("index")} className={seg(view === "index")}>Index</button>
        </div>
      </div>

      <div role="group" aria-label="Filter by category" className="mb-8 flex flex-wrap gap-2">
        {["All", ...categories].map((c) => (
          <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={`rounded-full border px-4 py-1.5 text-sm transition ${cat === c ? "border-accent bg-accent/10 text-accent" : "border-line-2 text-muted hover:border-accent hover:text-fg"}`}>
            {c} <span className="opacity-60">({counts[c]})</span>
          </button>
        ))}
      </div>

      <p className="mb-5 font-mono text-xs text-muted" role="status" aria-live="polite">Showing {list.length} of {projects.length} projects</p>

      {list.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-line-2 p-12 text-center text-muted">
          No projects match. <button type="button" className="text-accent underline" onClick={() => { setQ(""); setCat("All"); setLiveOnly(false); }}>Clear filters</button>
        </div>
      ) : view === "gallery" ? (
        <div className="grid gap-8 md:grid-cols-2">
          {list.map((p, i) => (
            <div key={p.slug} className={showcaseFirst && i === 0 ? "md:col-span-2" : (showcaseFirst ? i + 1 : i) % 2 === 1 ? "md:mt-14" : ""}>
              {showcaseFirst && i === 0 ? <ProjectShowcase p={p} /> : <ProjectCard p={p} index={i + 1} />}
            </div>
          ))}
        </div>
      ) : (
        <div onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
          <ul className="border-t border-line">
            {list.map((p, i) => (
              <li key={p.slug} className="border-b border-line">
                <Link href={`/projects/${p.slug}`} onMouseEnter={() => setHover(p.slug)} onFocus={() => setHover(p.slug)} onBlur={() => setHover(null)}
                  className="group grid items-center gap-x-6 gap-y-2 py-6 transition-all hover:pl-4 md:grid-cols-[3rem_1.4fr_1fr_1.2fr_auto_2rem]">
                  <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display text-3xl transition-colors group-hover:text-accent sm:text-4xl">{p.title}</span>
                  <span className="text-sm text-muted">{p.category}</span>
                  <span className="hidden text-sm text-muted lg:block">{p.stack.slice(0, 3).join(" · ")}</span>
                  <span><Tag tone={statusTone(p.status)}>{p.status}</Tag></span>
                  <ArrowUpRightIcon className="hidden text-muted transition group-hover:text-accent md:block" />
                </Link>
              </li>
            ))}
          </ul>
          <div ref={previewRef} aria-hidden="true" className={`pointer-events-none fixed left-0 top-0 z-30 hidden h-44 w-80 overflow-hidden rounded-2xl border border-line-2 bg-bg shadow-2xl transition-opacity duration-200 lg:block ${hovered ? "opacity-100" : "opacity-0"}`}>
            {hovered?.image ? <Image src={hovered.image} alt="" fill sizes="320px" className="object-cover object-top" /> : hovered ? <div className="grid h-full place-items-center bg-gradient-to-br from-teal/30 to-accent/15 p-4 text-center"><span className="display text-2xl">{hovered.title}</span></div> : null}
          </div>
        </div>
      )}
    </div>
  );
}
