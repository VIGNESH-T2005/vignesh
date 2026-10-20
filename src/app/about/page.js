import Image from "next/image";
import { PageHeader, Section, ButtonLink } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { ABOUT, SITE } from "@/data/site";

export const metadata = { title: "About", description: "About Vignesh T: an ECE student building full-stack web applications with React, ASP.NET Core and Node.js." };

export default function About() {
  return (
    <>
      <PageHeader eyebrow="About" title="An engineer who ships full-stack projects" crumbs={[["/", "Home"], [null, "About"]]}>{SITE.intro}</PageHeader>
      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-[1.5fr_1fr]">
          <Reveal className="space-y-4 text-lg leading-relaxed text-muted">{ABOUT.paragraphs.map((p) => <p key={p}>{p}</p>)}</Reveal>
          <Reveal delay={0.1} className="mx-auto w-56 lg:w-full lg:max-w-xs">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-line"><Image src="/chair2.jpeg" alt="Vignesh T" fill sizes="320px" className="object-cover" /></div>
          </Reveal>
        </div>
      </Section>
      <Section eyebrow="Where I am" title="Now, next and looking for">
        <div className="grid gap-4 md:grid-cols-3">{ABOUT.focus.map(([k, v]) => <div key={k} className="rounded-2xl border border-line bg-surface p-6"><p className="font-mono text-xs uppercase tracking-widest text-accent">{k}</p><p className="mt-2">{v}</p></div>)}</div>
      </Section>
      <Section eyebrow="Principles" title="How I work">
        <div className="grid gap-4 md:grid-cols-3">{ABOUT.principles.map(([t, d]) => <div key={t} className="rounded-2xl border border-line bg-surface p-6"><h3 className="font-semibold">{t}</h3><p className="mt-2 text-sm text-muted">{d}</p></div>)}</div>
      </Section>
      <Section eyebrow="Interests" title="What I enjoy working on">
        <ul className="grid gap-3 sm:grid-cols-2">{ABOUT.interests.map((i) => <li key={i} className="flex gap-3 rounded-xl border border-line bg-surface p-4"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />{i}</li>)}</ul>
        <div className="mt-8 flex flex-wrap gap-3"><ButtonLink href="/experience" variant="ghost">Experience</ButtonLink><ButtonLink href="/education" variant="ghost">Education</ButtonLink><ButtonLink href="/contact">Contact me</ButtonLink></div>
      </Section>
    </>
  );
}
