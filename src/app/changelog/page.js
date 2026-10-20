import Link from "next/link";
import { PageHeader, Section } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { PROJECTS } from "@/data/projects";
import { fmtDate, fmtMonth } from "@/lib/cache";

export const metadata = { title: "Changelog", description: "A dated changelog of Vignesh T's projects, summarised from real git history." };

export default function Changelog() {
  const all = PROJECTS.flatMap((p) => p.milestones.map((m) => ({ ...m, project: p }))).sort((a, b) => b.date.localeCompare(a.date));
  const groups = [];
  all.forEach((e) => { const k = e.date.slice(0, 7); const g = groups.find((x) => x.k === k); g ? g.items.push(e) : groups.push({ k, items: [e] }); });
  return (
    <>
      <PageHeader eyebrow="Changelog" title="What changed, and when" crumbs={[["/", "Home"], [null, "Changelog"]]}>Milestones across all projects, newest first, summarised from commit history.</PageHeader>
      <Section>
        <div className="space-y-10">
          {groups.map((g) => (
            <div key={g.k}>
              <h2 className="mb-4 font-display text-xl font-bold">{fmtMonth(g.k + "-01")}</h2>
              <ul className="space-y-3">{g.items.map((e) => (
                <Reveal as="li" key={e.project.slug + e.date + e.title} className="rounded-xl border border-line bg-surface p-4">
                  <p className="font-mono text-xs text-accent">{fmtDate(e.date)} · <Link href={`/projects/${e.project.slug}`} className="hover:underline">{e.project.title}</Link></p>
                  <p className="mt-1 font-semibold">{e.title}</p><p className="text-sm text-muted">{e.detail}</p>
                </Reveal>))}</ul>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
