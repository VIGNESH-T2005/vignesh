import { PageHeader, Section } from "@/components/ui";
import { LeetCodeLive } from "@/components/LiveStats";
import { Heatmap, BarList } from "@/components/Charts";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import { ALL_REPOS, ACTIVITY } from "@/data/repos";
import { fmtDate } from "@/lib/cache";
import { SITE } from "@/data/site";

export const metadata = { title: "Coding profiles", description: "LeetCode statistics, problem-solving practice repositories and commit activity of Vignesh T." };

const PRACTICE = ["Java_Problems", "ps_java", "java_oops_dsa", "DSA", "js_basics"];

export default function Coding() {
  const practice = ALL_REPOS.filter((r) => PRACTICE.includes(r.name)).sort((a, b) => b.commits - a.commits);
  const busiest = Math.max(...Object.values(ACTIVITY.daily));
  return (
    <>
      <PageHeader eyebrow="Coding profiles" title="Problem *solving*" crumbs={[["/", "Home"], [null, "Coding profiles"]]}>Live LeetCode statistics, the public repositories where I practise Java and JavaScript, and my commit rhythm.</PageHeader>

      <Section className="pt-0">
        <Reveal className="glass rounded-[2rem] p-6 sm:p-10">
          <p className="eyebrow mb-6">LeetCode · @{SITE.socials.leetcode.user}</p>
          <LeetCodeLive fullView />
        </Reveal>
      </Section>

      <Section num="01" eyebrow="Practice" title="Fundamentals in *code*" intro="Where the Java and JavaScript practice lives, ranked by commits.">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal className="rounded-3xl border border-line bg-surface/70 p-6"><BarList items={practice.map((r) => ({ label: r.name, value: r.commits }))} unit=" commits" /></Reveal>
          <ul className="space-y-3">{practice.map((r, i) => (
            <Reveal as="li" key={r.name} delay={i * 0.05}>
              <div data-spot className="spot rounded-2xl border border-line bg-surface/70 p-5 text-sm">
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="font-mono font-semibold hover:text-accent">{r.name}<span className="sr-only"> (opens in a new tab)</span></a>
                <p className="mt-1 text-muted">{r.summary}</p><p className="mt-2 font-mono text-[11px] text-muted">{fmtDate(r.first)} – {fmtDate(r.last)}</p>
              </div>
            </Reveal>))}</ul>
        </div>
      </Section>

      <Section num="02" eyebrow="Rhythm" title="Commit *activity*">
        <dl className="mb-8 grid grid-cols-3 gap-6">
          {[["Active days", Object.keys(ACTIVITY.daily).length], ["Busiest day", busiest], ["Practice commits", practice.reduce((a, r) => a + r.commits, 0)]].map(([k, v]) => (
            <div key={k} className="border-l border-line-2 pl-5"><dt className="eyebrow text-muted">{k}</dt><dd className="display gradient-text mt-2 text-[clamp(2rem,5vw,4rem)]"><CountUp value={v} /></dd></div>
          ))}
        </dl>
        <Reveal className="glass rounded-3xl p-5 sm:p-8"><Heatmap daily={ACTIVITY.daily} /></Reveal>
      </Section>
    </>
  );
}
