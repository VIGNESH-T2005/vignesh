import { PageHeader, Section, Tag } from "@/components/ui";
import Timeline from "@/components/Timeline";
import Reveal from "@/components/Reveal";
import { EDUCATION, CERTIFICATIONS } from "@/data/journey";

export const metadata = { title: "Education", description: "Education and certifications of Vignesh T: B.E. Electronics and Communication Engineering, HackerRank Java and Microsoft Learn." };

export default function Education() {
  return (
    <>
      <PageHeader eyebrow="Education" title="Education and *credentials*" crumbs={[["/", "Home"], [null, "Education"]]}>An Electronics and Communication Engineering degree, backed by certifications in Java, ASP.NET Core and data analytics.</PageHeader>

      <Section className="pt-0">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal from="left">
            <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface/70 p-8">
              <p aria-hidden="true" className="display outline-text text-[clamp(5rem,14vw,9rem)] leading-none">B.E.</p>
              <p className="eyebrow mt-4">In progress · 2023 – 2027</p>
              <p className="display mt-3 text-3xl">Electronics and Communication Engineering</p>
              <p className="serif-i mt-1 text-xl text-muted">Dhanalakshmi Srinivasan Engineering College, Perambalur</p>
              <p className="display gradient-text mt-6 text-5xl">8.21<span className="text-xl text-muted"> / 10 CGPA</span></p>
            </div>
          </Reveal>
          <Timeline items={EDUCATION.map((e) => ({ label: e.period, tag: e.current ? "In progress" : undefined, title: e.title, subtitle: e.place, detail: e.detail }))} />
        </div>
      </Section>

      <Section num="01" eyebrow="Certifications" title="Courses and *badges*">
        <div className="grid gap-6 md:grid-cols-3">
          {CERTIFICATIONS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div data-spot className="spot ticket flex h-full flex-col rounded-3xl border border-line bg-surface/70 p-6">
                <div className="flex items-center justify-between"><Tag tone="accent">{c.kind}</Tag><span className="font-mono text-xs text-muted">{c.year}</span></div>
                <h3 className="display mt-6 text-2xl leading-tight">{c.title}</h3>
                <p className="serif-i mt-1 text-lg text-muted">{c.issuer}</p>
                <p className="mt-auto border-t border-dashed border-line-2 pt-8 text-sm text-muted">{c.relevance}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
