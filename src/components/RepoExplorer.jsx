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
const DOT = { "C#": "#e879a6", Java: "#ff9f5a", JavaScript: "#f1e05a" };

export default function RepoExplorer({ repos }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [lang, setLang] = useState("All");
  const [sort, setSort] = useState("recent");
  const [live, setLive] = useState({});

  useEffect(() => {
    const c = new AbortController();
    fetch("/api/github", { signal: c.signal }).then((r) => r.json()).then((d) => {
      if (d?.available && d.repos) setLive(Object.fromEntries(d.repos.map((r) => [r.name, r])));
    }).catch(() => {});
    return () => c.abort();
  }, []);

  const cats = useMemo(() => ["All", ...new Set(repos.map((r) => r.category))], [repos]);
  const langs = useMemo(() => ["All", ...new Set(repos.map((r) => r.language).filter(Boolean))], [repos]);
  const maxCommits = Math.max(...repos.map((r) => r.commits), 1);

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return repos
      .filter((r) => (cat === "All" || r.category === cat) && (lang === "All" || r.language === lang))
      .filter((r) => !t || `${r.name} ${r.summary} ${r.category} ${r.language ?? ""}`.toLowerCase().includes(t))
      .sort(SORTS[sort][1]);
  }, [repos, q, cat, lang, sort]);

  const sel = "mt-1 w-full rounded-2xl border border-line bg-bg/60 px-3 py-3 text-sm text-fg focus:border-accent focus:outline-none";
  return (
    <div>
      <div className="glass mb-5 grid gap-3 rounded-3xl p-4 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <label className="relative block"><span className="sr-only">Search repositories</span>
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 mt-[2px] -translate-y-1/2 text-muted" width={18} height={18} />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search repositories…" className="mt-0 w-full rounded-2xl border border-line bg-bg/60 py-3 pl-11 pr-3 text-sm placeholder:text-muted focus:border-accent focus:outline-none md:mt-[26px]" />
        </label>
        <label className="text-sm text-muted">Category<select value={cat} onChange={(e) => setCat(e.target.value)} className={sel}>{cats.map((c) => <option key={c}>{c}</option>)}</select></label>
        <label className="text-sm text-muted">Language<select value={lang} onChange={(e) => setLang(e.target.value)} className={sel}>{langs.map((c) => <option key={c}>{c}</option>)}</select></label>
        <label className="text-sm text-muted">Sort by<select value={sort} onChange={(e) => setSort(e.target.value)} className={sel}>{Object.entries(SORTS).map(([k, [l]]) => <option key={k} value={k}>{l}</option>)}</select></label>
      </div>
      <p className="mb-4 font-mono text-xs text-muted" role="status" aria-live="polite">{list.length} of {repos.length} repositories</p>
      <ul className="grid gap-4 md:grid-cols-2">
        {list.map((r) => (
          <li key={r.name} data-spot className="spot flex flex-col rounded-3xl border border-line bg-surface/70 p-6 transition-colors hover:border-line-2">
            <div className="flex items-start justify-between gap-3">
              <h3 className="break-all font-mono text-sm font-semibold"><a href={r.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">{r.name}<span className="sr-only"> (opens in a new tab)</span></a></h3>
              <Tag tone={statusTone(r.status)}>{r.status}</Tag>
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{r.summary}</p>
            <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/5" aria-hidden="true"><div className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2" style={{ width: `${(r.commits / maxCommits) * 100}%` }} /></div>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
              <Tag tone="accent">{r.category}</Tag>
              {r.language ? <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full" style={{ background: DOT[r.language] ?? "var(--accent)" }} />{r.language}</span> : null}
              <span>{r.commits ? `${r.commits} commits` : "No commits"}</span>
              {r.last ? <span>Last: {fmtDate(r.last)}</span> : null}
              {live[r.name]?.stars ? <span className="inline-flex items-center gap-1"><StarIcon width={13} height={13} />{live[r.name].stars}</span> : null}
            </div>
            <div className="mt-4 flex gap-5 text-sm">
              {r.project ? <Link href={`/projects/${r.project}`} className="u-link text-accent">Case study</Link> : null}
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-fg"><GithubIcon width={15} height={15} />Repository</a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
