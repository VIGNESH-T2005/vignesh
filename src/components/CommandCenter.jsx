"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { searchIndex, SEARCH_INDEX } from "@/lib/search";
import { SearchIcon, ArrowUpRightIcon } from "./Icons";
import { Tag } from "./ui";

const TYPES = ["All", "Page", "Project", "Repository", "Skill", "Note", "Action"];

function Result({ r }) {
  const inner = (<><div className="flex items-center justify-between gap-2"><span className="display text-lg">{r.title}</span><Tag tone="accent">{r.type}</Tag></div><p className="mt-1 line-clamp-2 text-sm text-muted">{r.desc}</p></>);
  const cls = "spot block h-full rounded-2xl border border-line bg-surface/70 p-5 transition hover:border-accent";
  if (r.external || r.download || r.href.startsWith("mailto:")) return <a href={r.href} className={cls} {...(r.download ? { download: "" } : {})} {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{inner}</a>;
  return <Link href={r.href} className={cls}>{inner}</Link>;
}

export default function CommandCenter() {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [type, setType] = useState("All");
  const results = useMemo(() => (q.trim() ? searchIndex(q, 60) : []), [q]);
  const shown = results.filter((r) => type === "All" || r.type === type);
  const counts = useMemo(() => Object.fromEntries(TYPES.map((t) => [t, t === "All" ? results.length : results.filter((r) => r.type === t).length])), [results]);
  const actions = SEARCH_INDEX.filter((i) => i.type === "Action");

  return (
    <div>
      <label className="relative block"><span className="sr-only">Search everything</span>
        <SearchIcon className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-muted" />
        <input autoFocus type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects, skills, repositories, notes, pages…" className="glass w-full rounded-full py-5 pl-14 pr-6 text-lg placeholder:text-muted focus:border-accent focus:outline-none" />
      </label>
      <p className="mt-2 text-xs text-muted">Tip: press Ctrl/Cmd + K or / on any page to open the quick palette.</p>

      {q.trim() ? (
        <div className="mt-6">
          <div role="group" aria-label="Filter results by type" className="mb-4 flex flex-wrap gap-2">
            {TYPES.filter((t) => counts[t] > 0 || t === "All").map((t) => <button key={t} type="button" aria-pressed={type === t} onClick={() => setType(t)} className={`rounded-full border px-4 py-1.5 text-sm transition ${type === t ? "border-accent bg-accent/10 text-accent" : "border-line-2 text-muted hover:border-accent"}`}>{t} ({counts[t]})</button>)}
          </div>
          <p className="mb-3 text-sm text-muted" role="status" aria-live="polite">{shown.length} result{shown.length === 1 ? "" : "s"} for “{q}”</p>
          {shown.length ? <ul className="grid gap-3 md:grid-cols-2">{shown.map((r) => <li key={`${r.type}${r.href}${r.title}`}><Result r={r} /></li>)}</ul> : <p className="rounded-xl border border-dashed border-line p-8 text-center text-muted">Nothing found. Try a technology such as “Stripe”, “Java” or “MongoDB”.</p>}
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div><h2 className="eyebrow mb-4 text-muted">Quick actions</h2><ul className="space-y-3">{actions.map((a) => <li key={a.title}><Result r={a} /></li>)}</ul></div>
          <div><h2 className="eyebrow mb-4 text-muted">Try searching for</h2><ul className="flex flex-wrap gap-2">{["Stripe", "React", "Java", "MongoDB", "Docker", "JWT", "Power BI", "LeetCode", "architecture"].map((t) => <li key={t}><button type="button" onClick={() => setQ(t)} className="inline-flex items-center gap-1.5 rounded-full border border-line-2 px-4 py-2 text-sm transition hover:border-accent hover:text-accent">{t}<ArrowUpRightIcon width={14} height={14} /></button></li>)}</ul></div>
        </div>
      )}
    </div>
  );
}
