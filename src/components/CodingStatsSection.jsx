"use client";
import { useEffect, useState } from "react";
import { SITE, CODING } from "@/data/site";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { GithubIcon, CodeIcon, ExternalIcon } from "./Icons";

// Fetches once; resolves to {available:false} on any failure so the UI can show a fallback.
function useStats(url) {
  const [state, setState] = useState({ loading: true, data: null });
  useEffect(() => {
    const controller = new AbortController();
    fetch(url, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : { available: false }))
      .catch(() => ({ available: false }))
      .then((data) => !controller.signal.aborted && setState({ loading: false, data }));
    return () => controller.abort();
  }, [url]);
  return state;
}

const Stat = ({ label, value }) => (
  <div className="rounded-xl border border-line bg-surface-2 p-4">
    <p className="font-display text-2xl font-bold">{value}</p>
    <p className="text-xs text-muted">{label}</p>
  </div>
);

function Fallback({ href, label, text }) {
  return (
    <p className="text-sm text-muted">
      {text}{" "}
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent underline-offset-4 hover:underline">
        {label} <ExternalIcon width={14} height={14} />
      </a>
    </p>
  );
}

function Card({ icon, title, href, children }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-lg font-semibold">{icon} {title}</h3>
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline">
          View profile<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
      {children}
    </div>
  );
}

export default function CodingStatsSection() {
  const gh = useStats("/api/github");
  const lc = useStats("/api/leetcode");
  const g = gh.data;
  const l = lc.data;

  return (
    <section id="coding" aria-labelledby="coding-title" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
      <SectionHeading eyebrow="Coding" title={<span id="coding-title">GitHub & problem solving</span>}>
        Live numbers pulled from the public APIs. If a service is unreachable, the card says so instead of guessing.
      </SectionHeading>

      <div className="grid gap-6 md:grid-cols-2">
        <Reveal>
          <Card icon={<GithubIcon />} title="GitHub" href={SITE.socials.github.href}>
            {gh.loading ? (
              <p className="text-sm text-muted" role="status">Loading GitHub stats…</p>
            ) : g?.available ? (
              <>
                <div className="grid grid-cols-3 gap-3">
                  <Stat label="Public repos" value={g.publicRepos} />
                  <Stat label="Followers" value={g.followers} />
                  <Stat label="Stars earned" value={g.stars} />
                </div>
                {g.topLanguages.length ? (
                  <p className="mt-4 text-sm text-muted">
                    Most-used languages across repos: {g.topLanguages.map((x) => x.name).join(", ")}
                  </p>
                ) : null}
              </>
            ) : (
              <Fallback href={SITE.socials.github.href} label="Open GitHub" text="Live stats are unavailable right now." />
            )}
          </Card>
        </Reveal>

        <Reveal delay={0.08}>
          <Card icon={<CodeIcon />} title="LeetCode" href={SITE.socials.leetcode.href}>
            {lc.loading ? (
              <p className="text-sm text-muted" role="status">Loading LeetCode stats…</p>
            ) : l?.available ? (
              <>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <Stat label="Solved" value={l.total} />
                  <Stat label="Easy" value={l.easy} />
                  <Stat label="Medium" value={l.medium} />
                  <Stat label="Hard" value={l.hard} />
                </div>
                {l.ranking ? <p className="mt-4 text-sm text-muted">Global ranking: {l.ranking.toLocaleString("en-IN")}</p> : null}
              </>
            ) : (
              <Fallback href={SITE.socials.leetcode.href} label="Open LeetCode" text={`${CODING.leetcodeNote} Live stats are unavailable right now.`} />
            )}
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
