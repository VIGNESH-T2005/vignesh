import Link from "next/link";
import { PageHeader, Section, Tag } from "@/components/ui";
import Timeline from "@/components/Timeline";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import { ACHIEVEMENTS, MILESTONES } from "@/data/journey";
import { TOTALS } from "@/data/repos";
import { PROJECTS } from "@/data/projects";

export const metadata = { title: "Achievements", description: "Awards and engineering milestones of Vignesh T." };

const BIG = { "Shield Award: 3rd rank in academics": "3rd", "Solved 75+ LeetCode problems": "75+" };

export default function Achievements() {
  const deployed = PROJECTS.filter((p) => p.status === "Deployed").length;
  return (
    <>
      <PageHeader index="07" eyebrow="Achievements" title="Recognition and *milestones*" crumbs={[["/", "Home"], [null, "Achievements"]]}>Academic awards, problem-solving progress and the engineering milestones behind my projects.</PageHeader>

      <Section className="pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          {ACHIEVEMENTS.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.1}>
              <div data-spot className="spot relative h-full overflow-hidden rounded-[2rem] border border-line bg-surface/70 p-8">
                <p aria-hidden="true" className="display gradient-text text-[clamp(5rem,13vw,9rem)] leading-none">{BIG[a.title] ?? "★"}</p>
                <div className="mt-4 flex items-center gap-3"><Tag tone="accent">{a.kind}</Tag><span className="font-mono text-xs text-muted">{a.year}</span></div>
                <h2 className="display mt-4 text-3xl leading-tight">{a.title}</h2>
                <p className="serif-i mt-1 text-xl text-muted">{a.org}</p>
                {a.note ? <p className="mt-4 text-muted">{a.note} <Link href="/coding" className="u-link text-accent">View coding profiles</Link></p> : null}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section num="01" eyebrow="By the numbers" title="The engineering *record*">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {[["Repositories", TOTALS.repos], ["Commits", TOTALS.commits], ["Active days", TOTALS.activeDays], ["Live projects", deployed]].map(([k, v]) => (
            <div key={k} className="border-l border-line-2 pl-5"><dt className="eyebrow text-muted">{k}</dt><dd className="display gradient-text mt-3 text-[clamp(2.8rem,6vw,5rem)]"><CountUp value={v} /></dd></div>
          ))}
        </dl>
      </Section>

      <Section num="02" eyebrow="Milestones" title="Moments that *mattered*"><Timeline items={MILESTONES} /></Section>
    </>
  );
}
