"use client";
import { useEffect, useState } from "react";
import { BarList, Heatmap, Donut } from "./Charts";
import { ExternalIcon } from "./Icons";
import { SITE } from "@/data/site";

function useApi(url) {
  const [s, setS] = useState({ loading: true, data: null });
  useEffect(() => {
    const c = new AbortController();
    fetch(url, { signal: c.signal }).then((r) => r.json()).catch(() => ({ available: false }))
      .then((data) => !c.signal.aborted && setS({ loading: false, data }));
    return () => c.abort();
  }, [url]);
  return s;
}

const Tile = ({ label, value }) => (
  <div className="border-l border-line-2 pl-4"><p className="display gradient-text text-4xl">{value}</p><p className="mt-1 text-xs text-muted">{label}</p></div>
);
const Skeleton = () => (
  <div className="grid animate-pulse grid-cols-2 gap-6 sm:grid-cols-4" role="status" aria-label="Loading">{[0, 1, 2, 3].map((i) => <div key={i} className="h-20 rounded-2xl bg-white/5" />)}</div>
);
const ago = (iso) => { const d = Math.max(0, Date.now() - new Date(iso).getTime()); const h = Math.floor(d / 36e5); return h < 1 ? "just now" : h < 24 ? `${h}h ago` : `${Math.floor(h / 24)}d ago`; };

function Unavailable({ what, href, extra }) {
  return (
    <div className="rounded-2xl border border-dashed border-line-2 p-6 text-sm text-muted">
      <p>{what} statistics are temporarily unavailable.{extra ? ` ${extra}` : ""}</p>
      <a href={href} target="_blank" rel="noopener noreferrer" className="u-link mt-3 inline-flex items-center gap-1.5 text-accent">View the live profile <ExternalIcon width={14} height={14} /></a>
    </div>
  );
}

export function GithubLive({ showEvents = true }) {
  const { loading, data: d } = useApi("/api/github");
  if (loading) return <Skeleton />;
  if (!d?.available) return <Unavailable what="GitHub" href={SITE.socials.github.href} />;
  return (
    <div>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        <Tile label="Public repositories" value={d.user.publicRepos} /><Tile label="Followers" value={d.user.followers} /><Tile label="Stars earned" value={d.totals.stars} /><Tile label="Forks" value={d.totals.forks} />
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {d.languages.length ? <div><h3 className="eyebrow mb-4 text-muted">Languages by repository</h3><BarList items={d.languages.map((l) => ({ label: l.name, value: l.count }))} /></div> : null}
        {showEvents && d.events.length ? (
          <div><h3 className="eyebrow mb-4 text-muted">Recent activity</h3>
            <ul className="space-y-2 text-sm">{d.events.slice(0, 6).map((e) => <li key={e.id} className="flex justify-between gap-3 rounded-xl border border-line bg-white/[0.02] px-3 py-2"><span>{e.text}</span><span className="shrink-0 font-mono text-xs text-muted">{ago(e.at)}</span></li>)}</ul></div>
        ) : null}
      </div>
      <p className="mt-6 font-mono text-[11px] text-muted">Updated hourly from GitHub{d.stale ? " (showing the last successful update)" : ""}.</p>
    </div>
  );
}

export function LeetCodeLive({ fullView = false }) {
  const { loading, data: d } = useApi("/api/leetcode");
  if (loading) return <Skeleton />;
  if (!d?.available) return <Unavailable what="LeetCode" href={SITE.socials.leetcode.href} extra="My résumé lists 75+ problems solved, mostly in Java." />;
  const hasCal = Object.keys(d.calendar ?? {}).length > 0;
  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
        <Donut label="LeetCode problems solved" total={d.total} parts={[{ label: "Easy", value: d.easy, color: "#ff7a3d" }, { label: "Medium", value: d.medium, color: "#2dd4bf" }, { label: "Hard", value: d.hard, color: "#ff5a45" }]} />
        {fullView && (d.ranking || d.streak != null) ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {d.ranking ? <Tile label="Global ranking" value={d.ranking.toLocaleString("en-IN")} /> : null}
            {d.streak != null ? <Tile label="Current streak (days)" value={d.streak} /> : null}
            {d.activeDays != null ? <Tile label="Active days, past year" value={d.activeDays} /> : null}
          </div>
        ) : null}
      </div>
      {fullView && hasCal ? <div className="mt-8"><h3 className="eyebrow mb-4 text-muted">Submission activity</h3><Heatmap daily={d.calendar} label="submissions" /></div> : null}
      {fullView && d.recent?.length ? (
        <div className="mt-8"><h3 className="eyebrow mb-4 text-muted">Recently solved</h3>
          <ul className="grid gap-2 text-sm sm:grid-cols-2">{d.recent.map((r) => <li key={r.slug + r.at} className="flex justify-between gap-3 rounded-xl border border-line bg-white/[0.02] px-3 py-2"><a href={`https://leetcode.com/problems/${r.slug}/`} target="_blank" rel="noopener noreferrer" className="hover:text-accent">{r.title}</a><span className="shrink-0 font-mono text-xs text-muted">{ago(new Date(r.at).toISOString())}</span></li>)}</ul></div>
      ) : null}
      <p className="mt-6 font-mono text-[11px] text-muted">Updated hourly from LeetCode{d.stale ? " (showing the last successful update)" : ""}.</p>
    </div>
  );
}
