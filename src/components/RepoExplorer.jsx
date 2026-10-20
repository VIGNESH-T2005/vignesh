"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Tag, statusTone } from "./ui";
import { SearchIcon, StarIcon, GithubIcon } from "./Icons";
import { fmtDate } from "@/lib/cache";

const SORTS = {
  recent: ["Latest commit", (a, b) => (b.last ?? "").localeCompare(a.last ?? "")],
  commits: ["Most commits", (a, b) => b.commits - a.commits],
  name: ["Name", (a, b) => a.name.localeCompare(b.name)],
  loc: ["Lines of code", (a, b) => b.loc - a.loc],
};
const DOT = { "C#": "#9b6bff", Java: "#e8883a", JavaScript: "#f1e05a", HTML: "#e34c26", CSS: "#a371f7" };

export default function RepoExplorer({ repos }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [lang, setLang] = useState("All");
  const [sort, setSort] = useState("recent");
  const [live, setLive] = useState({}); // name -> { stars, language }

  useEffect(() => {
    const c = new AbortController();
    fetch("/api/github", { signal: c.signal }).then((r) => r.json()).then((d) => {
      if (d?.available && d.repos) setLive(Object.fromEntries(d.repos.map((r) => [r.name, r])));
    }).catch(() => {});
    return () => c.abort();
  }, []);

  const cats = useMemo(() => ["All", ...new Set(repos.map((r) => r.category))], [repos]);
  const langs = useMemo(() => ["All", ...new Set(repos.map((r) => r.language).filter(Boolean))], [repos]);

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return repos
      .filter((r) => (cat === "All" || r.category === cat) && (lang === "All" || r.language === lang))
      .filter((r) => !t || `${r.name} ${r.summary} ${r.category} ${r.language ?? ""}`.toLowerCase().includes(t))
      .sort(SORTS[sort][1]);
  }, [repos, q, cat, lang, sort]);

  const sel = "rounded-xl border border-line bg-bg px-3 py-2.5 text-sm focus:border-accent focus:outline-none";
  return (
    <div>
      <div className="mb-5 grid gap-3 rounded-2xl border border-line bg-surface p-4 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <label className="relative block"><span className="sr-only">Search repositories</span>
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" width={18} height={18} />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search repositories…" className={`${sel} w-full pl-10`} />
        </label>
        <label className="text-sm text-muted">Category<select value={cat} onChange={(e) => setCat(e.target.value)} className={`${sel} mt-1 w-full text-fg`}>{cats.map((c) => <option key={c}>{c}</option>)}</select></label>
        <label className="text-sm text-muted">Language<select value={lang} onChange={(e) => setLang(e.target.value)} className={`${sel} mt-1 w-full text-fg`}>{langs.map((c) => <option key={c}>{c}</option>)}</select></label>
        <label className="text-sm text-muted">Sort by<select value={sort} onChange={(e) => setSort(e.target.value)} className={`${sel} mt-1 w-full text-fg`}>{Object.entries(SORTS).map(([k, [l]]) => <option key={k} value={k}>{l}</option>)}</select></label>
      </div>
      <p className="mb-3 text-sm text-muted" role="status" aria-live="polite">{list.length} of {repos.length} repositories</p>
      <ul className="grid gap-4 md:grid-cols-2">
        {list.map((r) => (
          <li key={r.name} className="flex flex-col rounded-2xl border border-line bg-surface p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="break-all font-mono text-sm font-semibold"><a href={r.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">{r.name}<span className="sr-only"> (opens in a new tab)</span></a></h3>
              <Tag tone={statusTone(r.status)}>{r.status}</Tag>
            </div>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{r.summary}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
              <Tag tone="accent">{r.category}</Tag>
              {r.language ? <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full" style={{ background: DOT[r.language] ?? "var(--accent)" }} />{r.language}</span> : null}
              {r.commits ? <span>{r.commits} commits</span> : <span>No commits</span>}
              {r.last ? <span>Last: {fmtDate(r.last)}</span> : null}
              {live[r.name]?.stars ? <span className="inline-flex items-center gap-1"><StarIcon width={13} height={13} />{live[r.name].stars}</span> : null}
            </div>
            <div className="mt-4 flex gap-4 text-sm">
              {r.project ? <Link href={`/projects/${r.project}`} className="text-accent hover:underline">Case study</Link> : null}
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-fg"><GithubIcon width={15} height={15} />Repository</a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
