import { PageHeader, Section, Tag } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { EXPERIENCE } from "@/data/journey";

export const metadata = { title: "Experience", description: "Experience of Vignesh T: a web development internship, Java full-stack training and independent project work." };

export default function Experience() {
  return (
    <>
      <PageHeader eyebrow="Experience" title="Internship, training and project work" crumbs={[["/", "Home"], [null, "Experience"]]}>I&apos;m early in my career, so this page is honest about scale: one internship, structured training and a lot of self-directed building.</PageHeader>
      <Section>
        <div className="space-y-6">
          {EXPERIENCE.map((e) => (
            <Reveal key={e.id} className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-2"><div><h2 className="text-xl font-bold">{e.role}</h2><p className="text-muted">{e.org} · {e.mode}</p></div><Tag tone="accent">{e.period}</Tag></div>
              <p className="mt-4 text-muted">{e.summary}</p>
              <ul className="mt-4 space-y-2 text-sm">{e.points.map((p) => <li key={p} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />{p}</li>)}</ul>
              <ul className="mt-5 flex flex-wrap gap-1.5">{e.tech.map((t) => <li key={t}><Tag>{t}</Tag></li>)}</ul>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
