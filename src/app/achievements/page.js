import Link from "next/link";
import { PageHeader, Section, Tag, StatTile } from "@/components/ui";
import Timeline from "@/components/Timeline";
import { ACHIEVEMENTS, MILESTONES } from "@/data/journey";
import { TOTALS } from "@/data/repos";
import { PROJECTS } from "@/data/projects";

export const metadata = { title: "Achievements", description: "Awards and engineering milestones of Vignesh T." };

export default function Achievements() {
  return (
    <>
      <PageHeader eyebrow="Achievements" title="Awards and milestones" crumbs={[["/", "Home"], [null, "Achievements"]]}>A short list on purpose. Awards come from my resume; engineering milestones are computed from my commit history.</PageHeader>
      <Section eyebrow="Recognition" title="Awards and problem solving">
        <div className="grid gap-4 md:grid-cols-2">
          {ACHIEVEMENTS.map((a) => (
            <div key={a.title} className="rounded-2xl border border-line bg-surface p-6"><div className="flex justify-between"><Tag tone="accent">{a.kind}</Tag><span className="font-mono text-xs text-muted">{a.year}</span></div><h3 className="mt-3 text-lg font-semibold">{a.title}</h3><p className="text-sm text-muted">{a.org}</p>{a.note ? <p className="mt-3 text-sm text-muted">{a.note} <Link href="/coding" className="text-accent hover:underline">See Coding profiles</Link></p> : null}</div>
          ))}
        </div>
      </Section>
      <Section eyebrow="By the numbers" title="Engineering record">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4"><StatTile label="Public repositories" value={TOTALS.repos} /><StatTile label="Commits" value={TOTALS.commits} /><StatTile label="Active days" value={TOTALS.activeDays} /><StatTile label="Deployed projects" value={PROJECTS.filter((p) => p.status === "Deployed").length} note="live on Vercel, Render or Netlify" /></div>
      </Section>
      <Section eyebrow="Milestones" title="Moments that mattered"><Timeline items={MILESTONES} /></Section>
    </>
  );
}
