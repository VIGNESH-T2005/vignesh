import { PageHeader, Section, StatTile } from "@/components/ui";
import { LeetCodeLive } from "@/components/LiveStats";
import { Heatmap, BarList } from "@/components/Charts";
import { ALL_REPOS, ACTIVITY } from "@/data/repos";
import { fmtDate } from "@/lib/cache";
import { SITE } from "@/data/site";

export const metadata = { title: "Coding profiles", description: "LeetCode statistics, problem-solving practice repositories and commit activity of Vignesh T." };

const PRACTICE = ["Java_Problems", "ps_java", "java_oops_dsa", "DSA", "js_basics"];

export default function Coding() {
  const practice = ALL_REPOS.filter((r) => PRACTICE.includes(r.name)).sort((a, b) => b.commits - a.commits);
  return (
    <>
      <PageHeader eyebrow="Coding profiles" title="Problem solving and practice" crumbs={[["/", "Home"], [null, "Coding profiles"]]}>LeetCode numbers are fetched live and cached. My practice also lives in public repositories, listed below.</PageHeader>
      <Section eyebrow="LeetCode" title={`@${SITE.socials.leetcode.user}`}><div className="rounded-2xl border border-line bg-surface p-6"><LeetCodeLive fullView /></div></Section>
      <Section eyebrow="Practice repositories" title="DSA and fundamentals in code" intro="Commits per practice repository, from git history.">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-surface p-6"><BarList items={practice.map((r) => ({ label: r.name, value: r.commits }))} unit=" commits" /></div>
          <ul className="space-y-3">{practice.map((r) => <li key={r.name} className="rounded-xl border border-line bg-surface p-4 text-sm"><a href={r.url} target="_blank" rel="noopener noreferrer" className="font-mono font-semibold hover:text-accent">{r.name}<span className="sr-only"> (opens in a new tab)</span></a><p className="mt-1 text-muted">{r.summary}</p><p className="mt-1 text-xs text-muted">{fmtDate(r.first)} to {fmtDate(r.last)}</p></li>)}</ul>
        </div>
      </Section>
      <Section eyebrow="Consistency" title="Commit activity across all repositories">
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-3"><StatTile label="Active days" value={Object.keys(ACTIVITY.daily).length} /><StatTile label="Busiest day" value={`${Math.max(...Object.values(ACTIVITY.daily))} commits`} /><StatTile label="Practice commits" value={practice.reduce((a, r) => a + r.commits, 0)} /></div>
        <div className="rounded-2xl border border-line bg-surface p-5"><Heatmap daily={ACTIVITY.daily} /></div>
      </Section>
    </>
  );
}
