import Image from "next/image";
import { PageHeader, Section, ButtonLink, Tag } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { ABOUT, SITE } from "@/data/site";
import { TOTALS } from "@/data/repos";

export const metadata = { title: "About", description: "About Vignesh T: an ECE student building full-stack web applications with React, ASP.NET Core and Node.js." };

export default function About() {
  return (
    <>
      <PageHeader eyebrow="About" title="About *Vignesh*" crumbs={[["/", "Home"], [null, "About"]]}>Background, approach and what I&apos;m working toward next.</PageHeader>

      <Section className="pt-0">
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <Reveal from="left" className="relative mx-auto w-64 sm:w-80 lg:col-span-5 lg:w-full lg:max-w-md">
            <div className="absolute -inset-3 -rotate-3 rounded-[2.2rem] border border-accent/30" aria-hidden="true" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-line-2">
              <Image src="/dp.png" alt="Portrait of Vignesh T" fill sizes="(max-width: 1024px) 320px, 440px" className="object-cover object-top" />
            </div>
            <div className="glass float absolute -bottom-5 -right-3 rounded-2xl px-4 py-3 text-xs sm:-right-8">
              <p className="font-mono text-[10px] uppercase tracking-widest text-accent">Based in</p><p className="mt-1 font-display text-base font-bold">{SITE.location}</p>
            </div>
          </Reveal>
          <div className="lg:col-span-7">
            <Reveal><p className="serif-i text-2xl leading-snug sm:text-4xl">{ABOUT.paragraphs[0]}</p></Reveal>
            <Reveal delay={0.1} className="mt-8 space-y-5 text-lg leading-relaxed text-muted">{ABOUT.paragraphs.slice(1).map((p) => <p key={p}>{p}</p>)}</Reveal>
            <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-2">{ABOUT.interests.map((i) => <Tag key={i}>{i}</Tag>)}</Reveal>
          </div>
        </div>
      </Section>

      <Section num="01" eyebrow="Right now" title="Where I am *headed*">
        <div className="grid gap-4 md:grid-cols-3">
          {ABOUT.focus.map(([k, v], i) => (
            <Reveal key={k} delay={i * 0.08}>
              <div data-spot className="spot h-full rounded-3xl border border-line bg-surface/70 p-7">
                <p className="eyebrow">{k}</p><p className="display mt-4 text-2xl leading-tight">{v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section num="02" eyebrow="Principles" title="How I *work*">
        <ul className="border-t border-line">
          {ABOUT.principles.map(([t, d], i) => (
            <Reveal as="li" key={t} delay={i * 0.06} className="grid items-baseline gap-3 border-b border-line py-8 md:grid-cols-[6rem_1fr_1.4fr]">
              <span className="display outline-text text-6xl">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display text-3xl">{t}</h3><p className="text-lg text-muted">{d}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section>
        <Reveal className="glass flex flex-wrap items-center justify-between gap-6 rounded-[2rem] p-8 sm:p-10">
          <p className="display max-w-xl text-3xl sm:text-4xl">{TOTALS.repos} repositories, {TOTALS.commits} commits and counting.</p>
          <div className="flex flex-wrap gap-3"><ButtonLink href="/projects">See the work</ButtonLink><ButtonLink href="/experience" variant="ghost">Experience</ButtonLink></div>
        </Reveal>
      </Section>
    </>
  );
}
