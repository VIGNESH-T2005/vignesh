"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import Reveal from "./Reveal";
import { SearchIcon } from "./Icons";

const TIERS = {
  Core: { dot: "bg-accent", text: "text-accent", info: "Used in a deployed project or across many repositories" },
  Working: { dot: "bg-accent-2", text: "text-accent-2", info: "Used in a real project" },
  Learning: { dot: "bg-teal", text: "text-teal", info: "Practice or prototype use so far" },
};
const SPAN = { languages: "lg:col-span-3", frontend: "lg:col-span-3", backend: "lg:col-span-4", databases: "lg:col-span-2", data: "lg:col-span-2", tools: "lg:col-span-4" };

export default function SkillsExplorer({ skills, groups }) {
  const [q, setQ] = useState("");
  const [tier, setTier] = useState("All");
  const [open, setOpen] = useState(null);
  const t = q.trim().toLowerCase();
  const matches = (s) => (tier === "All" || s.tier === tier) && (!t || `${s.name} ${s.note} ${s.projects.map((p) => p.title).join(" ")}`.toLowerCase().includes(t));
  const shown = useMemo(() => skills.filter(matches).length, [skills, q, tier]); // eslint-disable-line react-hooks/exhaustive-deps
  const pill = (on) => `rounded-full border px-4 py-1.5 text-sm transition ${on ? "border-accent bg-accent/10 text-accent" : "border-line-2 text-muted hover:border-accent hover:text-fg"}`;

  return (
    <div>
      <div className="glass mb-6 flex flex-col gap-4 rounded-3xl p-4 lg:flex-row lg:items-center">
        <label className="relative block flex-1"><span className="sr-only">Search skills</span>
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" width={18} height={18} />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a skill or project…" className="w-full rounded-2xl border border-line bg-bg/60 py-3 pl-11 pr-3 text-sm placeholder:text-muted focus:border-accent focus:outline-none" />
        </label>
        <div role="group" aria-label="Filter by level" className="flex flex-wrap gap-2">{["All", "Core", "Working", "Learning"].map((x) => <button key={x} type="button" aria-pressed={tier === x} onClick={() => setTier(x)} className={pill(tier === x)}>{x}</button>)}</div>
      </div>
      <ul className="mb-6 flex flex-wrap gap-x-8 gap-y-2 text-xs text-muted">{Object.entries(TIERS).map(([k, v]) => <li key={k} className="flex items-center gap-2"><span className={`h-2.5 w-2.5 rounded-full ${v.dot}`} /><span className="font-semibold text-fg">{k}</span>{v.info}</li>)}</ul>
      <p className="mb-5 font-mono text-xs text-muted" role="status" aria-live="polite">{shown} skills match</p>

      <div className="grid gap-4 lg:grid-cols-6">
        {groups.map((g, gi) => {
          const items = skills.filter((s) => s.group === g);
          return (
            <Reveal key={g} delay={gi * 0.05} className={SPAN[g.toLowerCase().split(" ")[0]] ?? "lg:col-span-3"}>
              <section aria-labelledby={`g-${gi}`} data-spot className="spot h-full rounded-3xl border border-line bg-surface/70 p-6">
                <h2 id={`g-${gi}`} className="display text-2xl">{g}</h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {items.map((s) => {
                    const key = `${g}:${s.name}`, on = matches(s), isOpen = open === key;
                    return (
                      <li key={s.name} className={`transition-opacity ${on ? "" : "opacity-20"}`}>
                        <button type="button" aria-pressed={isOpen} aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : key)}
                          className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm transition ${isOpen ? "border-accent bg-accent text-accent-ink" : "border-line-2 bg-bg/40 hover:border-accent"}`}>
                          <span className={`h-2 w-2 rounded-full ${isOpen ? "bg-accent-ink" : TIERS[s.tier].dot}`} aria-hidden="true" />{s.name}
                          <span className="sr-only"> ({s.tier})</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <div aria-live="polite" className="mt-5 min-h-16 border-t border-line pt-4 text-sm">
                  {(() => {
                    const s = items.find((x) => `${g}:${x.name}` === open);
                    return s ? (
                      <><p className="text-fg/90">{s.note}</p><p className="mt-2 text-xs text-muted"><span className={TIERS[s.tier].text}>{s.tier}</span> · used in {s.projects.slice(0, 4).map((p, i) => <span key={p.slug}>{i ? ", " : ""}<Link href={`/projects/${p.slug}`} className="u-link text-accent">{p.title}</Link></span>)}{s.projects.length > 4 ? ` +${s.projects.length - 4} more` : ""}</p></>
                    ) : <p className="text-muted">Select a skill to see where I used it.</p>;
                  })()}
                </div>
              </section>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
