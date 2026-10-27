import { PageHeader, Section, Tag } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { EXPERIENCE } from "@/data/journey";

export const metadata = { title: "Experience", description: "Experience of Vignesh T: a web development internship, Java full-stack training and independent project work." };

export default function Experience() {
  return (
    <>
      <PageHeader eyebrow="Experience" title="Experience and *training*" crumbs={[["/", "Home"], [null, "Experience"]]}>A web development internship, structured Java full-stack training and a growing body of independent, deployed projects.</PageHeader>
      <Section className="pt-0">
        <ol className="border-t border-line">
          {EXPERIENCE.map((e, i) => (
            <Reveal as="li" key={e.id} className="grid gap-6 border-b border-line py-12 lg:grid-cols-[minmax(0,1fr)_2fr]">
              <div>
                <p className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</p>
                <p className="display outline-text mt-2 text-[clamp(2.6rem,6vw,4.8rem)] leading-none">{e.period.split(" – ")[0]}</p>
                <p className="mt-2 font-mono text-xs text-accent">{e.period}</p>
              </div>
              <div>
                <h2 className="display text-[clamp(1.8rem,3.4vw,2.8rem)]">{e.role}</h2>
                <p className="serif-i mt-1 text-2xl text-muted">{e.org} · {e.mode}</p>
                <p className="mt-5 max-w-2xl text-lg text-fg/90">{e.summary}</p>
                <ul className="mt-5 space-y-3">{e.points.map((p) => <li key={p} className="flex gap-3 text-muted"><span className="mt-2.5 h-px w-5 shrink-0 bg-accent" aria-hidden="true" />{p}</li>)}</ul>
                <ul className="mt-6 flex flex-wrap gap-1.5">{e.tech.map((t) => <li key={t}><Tag>{t}</Tag></li>)}</ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>
    </>
  );
}
