import Link from "next/link";
import { PageHeader, Section, Tag } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { PROJECTS } from "@/data/projects";
import { fmtDate, fmtMonth } from "@/lib/cache";

export const metadata = { title: "Changelog", description: "A dated changelog of Vignesh T's projects, from first commit to deployment." };

export default function Changelog() {
  const all = PROJECTS.flatMap((p) => p.milestones.map((m) => ({ ...m, project: p }))).sort((a, b) => b.date.localeCompare(a.date));
  const groups = [];
  all.forEach((e) => { const k = e.date.slice(0, 7); const g = groups.find((x) => x.k === k); g ? g.items.push(e) : groups.push({ k, items: [e] }); });
  return (
    <>
      <PageHeader index="12" eyebrow="Changelog" title="What shipped, *and when*" crumbs={[["/", "Home"], [null, "Changelog"]]}>Project milestones from first commit to deployment, newest first.</PageHeader>
      <Section className="pt-0">
        <div className="space-y-16">
          {groups.map((g) => (
            <div key={g.k} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_2.2fr]">
              <h2 className="display outline-text text-[clamp(2.6rem,6vw,4.6rem)] leading-none lg:sticky lg:top-28 lg:h-fit">{fmtMonth(g.k + "-01")}</h2>
              <ul className="space-y-3">
                {g.items.map((e) => (
                  <Reveal as="li" key={e.project.slug + e.date + e.title}>
                    <div data-spot className="spot rounded-2xl border border-line bg-surface/70 p-5">
                      <div className="flex flex-wrap items-center gap-3"><span className="font-mono text-xs text-accent">{fmtDate(e.date)}</span><Link href={`/projects/${e.project.slug}`}><Tag tone="violet">{e.project.title}</Tag></Link></div>
                      <p className="display mt-2 text-xl">{e.title}</p><p className="mt-1 text-sm text-muted">{e.detail}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
