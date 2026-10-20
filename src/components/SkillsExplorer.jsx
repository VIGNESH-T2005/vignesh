"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Tag } from "./ui";
import { SearchIcon } from "./Icons";

const TIER_INFO = { Core: ["good", "Used in several real projects, including a deployed one"], Working: ["accent", "Used in at least one real project"], Practice: ["warn", "Only used in practice or prototype repositories"] };

export default function SkillsExplorer({ skills, groups }) {
  const [q, setQ] = useState("");
  const [tier, setTier] = useState("All");
  const [group, setGroup] = useState("All");
  const list = useMemo(() => skills.filter((s) => (tier === "All" || s.tier === tier) && (group === "All" || s.group === group) && (!q.trim() || `${s.name} ${s.note} ${s.projects.map((p) => p.title).join(" ")}`.toLowerCase().includes(q.trim().toLowerCase()))), [skills, q, tier, group]);
  const byGroup = groups.map((g) => ({ g, items: list.filter((s) => s.group === g) })).filter((x) => x.items.length);
  const pill = (active) => `rounded-full border px-3.5 py-1.5 text-sm transition ${active ? "border-accent bg-accent text-accent-ink" : "border-line bg-surface text-muted hover:border-accent hover:text-fg"}`;

  return (
    <div>
      <div className="mb-6 space-y-4 rounded-2xl border border-line bg-surface p-4">
        <label className="relative block"><span className="sr-only">Search skills</span>
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" width={18} height={18} />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search skills or projects…" className="w-full rounded-xl border border-line bg-bg py-2.5 pl-10 pr-3 text-sm placeholder:text-muted focus:border-accent focus:outline-none" />
        </label>
        <div role="group" aria-label="Filter by tier" className="flex flex-wrap gap-2">{["All", "Core", "Working", "Practice"].map((t) => <button key={t} type="button" aria-pressed={tier === t} onClick={() => setTier(t)} className={pill(tier === t)}>{t}</button>)}</div>
        <div role="group" aria-label="Filter by area" className="flex flex-wrap gap-2">{["All", ...groups].map((t) => <button key={t} type="button" aria-pressed={group === t} onClick={() => setGroup(t)} className={pill(group === t)}>{t}</button>)}</div>
      </div>
      <dl className="mb-6 grid gap-2 text-xs text-muted sm:grid-cols-3">{Object.entries(TIER_INFO).map(([k, [tone, d]]) => <div key={k} className="flex items-center gap-2"><Tag tone={tone}>{k}</Tag><dd>{d}</dd></div>)}</dl>
      <p className="mb-4 text-sm text-muted" role="status" aria-live="polite">{list.length} skills shown</p>
      <div className="space-y-8">
        {byGroup.map(({ g, items }) => (
          <section key={g} aria-labelledby={`g-${g}`}>
            <h2 id={`g-${g}`} className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">{g}</h2>
            <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {items.map((s) => (
                <li key={s.name} className="rounded-2xl border border-line bg-surface p-5">
                  <div className="flex items-start justify-between gap-2"><h3 className="font-semibold">{s.name}</h3><Tag tone={TIER_INFO[s.tier][0]}>{s.tier}</Tag></div>
                  <p className="mt-2 text-sm text-muted">{s.note}</p>
                  <p className="mt-3 text-xs text-muted">Used in: {s.projects.slice(0, 4).map((p, i) => <span key={p.slug}>{i ? ", " : ""}<Link href={`/projects/${p.slug}`} className="text-accent hover:underline">{p.title}</Link></span>)}{s.projects.length > 4 ? ` +${s.projects.length - 4} more` : ""}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
