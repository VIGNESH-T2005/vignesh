"use client";
import { useEffect, useState } from "react";
import { BarList, Heatmap } from "./Charts";
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
  <div className="rounded-xl border border-line bg-surface-2 p-4"><p className="font-display text-2xl font-bold">{value}</p><p className="text-xs text-muted">{label}</p></div>
);
const Skeleton = () => <div className="grid animate-pulse grid-cols-2 gap-3 sm:grid-cols-4" role="status" aria-label="Loading"><div className="h-20 rounded-xl bg-surface-2" /><div className="h-20 rounded-xl bg-surface-2" /><div className="h-20 rounded-xl bg-surface-2" /><div className="h-20 rounded-xl bg-surface-2" /></div>;
const ago = (iso) => { const d = Math.max(0, Date.now() - new Date(iso).getTime()); const h = Math.floor(d / 36e5); return h < 1 ? "just now" : h < 24 ? `${h}h ago` : `${Math.floor(h / 24)}d ago`; };

function Unavailable({ what, href, snapshot }) {
  return (
    <div className="rounded-xl border border-dashed border-line p-5 text-sm text-muted">
      <p>Live {what} data is unavailable right now, so nothing is shown rather than guessing.{snapshot ? ` ${snapshot}` : ""}</p>
      <a href={href} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-accent hover:underline">Open profile <ExternalIcon width={14} height={14} /></a>
    </div>
  );
}

export function GithubLive({ showEvents = true }) {
  const { loading, data: d } = useApi("/api/github");
  if (loading) return <Skeleton />;
  if (!d?.available) return <Unavailable what="GitHub" href={SITE.socials.github.href} snapshot="The repository totals elsewhere on this page come from my git history." />;
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Tile label="Public repositories" value={d.user.publicRepos} />
        <Tile label="Followers" value={d.user.followers} />
        <Tile label="Stars earned" value={d.totals.stars} />
        <Tile label="Forks" value={d.totals.forks} />
      </div>
      {d.languages.length ? (
        <div className="mt-6"><h3 className="mb-3 text-sm font-semibold">Primary language by repository</h3><BarList items={d.languages.map((l) => ({ label: l.name, value: l.count }))} /></div>
      ) : null}
      {showEvents && d.events.length ? (
        <div className="mt-6"><h3 className="mb-3 text-sm font-semibold">Recent public activity</h3>
          <ul className="space-y-2 text-sm">{d.events.map((e) => <li key={e.id} className="flex justify-between gap-3 rounded-lg bg-surface-2 px-3 py-2"><span>{e.text}</span><span className="shrink-0 text-xs text-muted">{ago(e.at)}</span></li>)}</ul></div>
      ) : null}
      <p className="mt-4 text-xs text-muted">Live from the GitHub API{d.stale ? " (last successful fetch, GitHub is currently unreachable)" : ""}. Cached for an hour.</p>
    </div>
  );
}

export function LeetCodeLive({ fullView = false }) {
  const { loading, data: d } = useApi("/api/leetcode");
  if (loading) return <Skeleton />;
  if (!d?.available) return <Unavailable what="LeetCode" href={SITE.socials.leetcode.href} snapshot="My resume lists 75+ problems solved, mostly in Java." />;
  const hasCal = Object.keys(d.calendar ?? {}).length > 0;
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Tile label="Solved" value={d.total} /><Tile label="Easy" value={d.easy} /><Tile label="Medium" value={d.medium} /><Tile label="Hard" value={d.hard} />
      </div>
      {fullView && (d.ranking || d.streak != null) ? (
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {d.ranking ? <Tile label="Global ranking" value={d.ranking.toLocaleString("en-IN")} /> : null}
          {d.streak != null ? <Tile label="Current streak (days)" value={d.streak} /> : null}
          {d.activeDays != null ? <Tile label="Active days (past year)" value={d.activeDays} /> : null}
        </div>
      ) : null}
      {fullView && hasCal ? <div className="mt-6"><h3 className="mb-3 text-sm font-semibold">Submission activity</h3><Heatmap daily={d.calendar} label="submissions" /></div> : null}
      {fullView && d.recent?.length ? (
        <div className="mt-6"><h3 className="mb-3 text-sm font-semibold">Recently solved</h3>
          <ul className="space-y-2 text-sm">{d.recent.map((r) => <li key={r.slug + r.at} className="flex justify-between gap-3 rounded-lg bg-surface-2 px-3 py-2"><a href={`https://leetcode.com/problems/${r.slug}/`} target="_blank" rel="noopener noreferrer" className="hover:text-accent">{r.title}</a><span className="shrink-0 text-xs text-muted">{ago(new Date(r.at).toISOString())}</span></li>)}</ul></div>
      ) : null}
      <p className="mt-4 text-xs text-muted">Source: {d.source === "leetcode" ? "LeetCode" : "community LeetCode API (counts only)"}{d.stale ? ", last successful fetch" : ""}. Cached for an hour.</p>
    </div>
  );
}
