import { PageHeader, Section, Tag } from "@/components/ui";
import Timeline from "@/components/Timeline";
import { EDUCATION, CERTIFICATIONS } from "@/data/journey";

export const metadata = { title: "Education", description: "Education and certifications of Vignesh T: B.E. Electronics and Communication Engineering, HackerRank Java and Microsoft Learn." };

export default function Education() {
  return (
    <>
      <PageHeader eyebrow="Education" title="Degree, school and certifications" crumbs={[["/", "Home"], [null, "Education"]]}>An ECE degree gave me the engineering foundations; software is where I&apos;ve chosen to build.</PageHeader>
      <Section eyebrow="Academics" title="Education timeline">
        <Timeline items={EDUCATION.map((e) => ({ label: e.period, tag: e.current ? "In progress" : undefined, title: e.title, subtitle: e.place, detail: e.detail }))} />
      </Section>
      <Section eyebrow="Certifications" title="Courses and badges">
        <div className="grid gap-4 md:grid-cols-3">
          {CERTIFICATIONS.map((c) => (
            <div key={c.title} className="rounded-2xl border border-line bg-surface p-5"><div className="flex justify-between gap-2"><Tag tone="accent">{c.kind}</Tag><span className="font-mono text-xs text-muted">{c.year}</span></div><h3 className="mt-3 font-semibold">{c.title}</h3><p className="text-sm text-muted">{c.issuer}</p><p className="mt-3 text-xs text-muted">Relevance: {c.relevance}</p></div>
          ))}
        </div>
      </Section>
    </>
  );
}
