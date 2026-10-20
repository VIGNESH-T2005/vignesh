import Link from "next/link";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { Heatmap } from "@/components/Charts";
import { Section, StatTile, ButtonLink, Tag } from "@/components/ui";
import { projectSummaries } from "@/lib/summaries";
import { TOTALS, ACTIVITY } from "@/data/repos";
import { ALL_SKILLS } from "@/data/skills";
import { POSTS, readingMinutes } from "@/data/blog";
import { ABOUT } from "@/data/site";
import { fmtMonth, fmtDate } from "@/lib/cache";

export const metadata = { alternates: { canonical: "/" } };

export default function Home() {
  const top = projectSummaries().sort((a, b) => a.rank - b.rank).slice(0, 3);
  const core = ALL_SKILLS.filter((s) => s.tier === "Core");
  return (
    <>
      <Hero />
      <Section>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatTile label="Public repositories" value={TOTALS.repos} note={`${TOTALS.projects} application repos, the rest practice`} />
          <StatTile label="Commits across repos" value={TOTALS.commits} note={`since ${fmtMonth(TOTALS.since)}`} />
          <StatTile label="Active coding days" value={TOTALS.activeDays} note="days with at least one commit" />
          <StatTile label="Lines of code" value={TOTALS.loc.toLocaleString("en-IN")} note="source files, excluding generated code" />
        </div>
        <p className="mt-3 text-xs text-muted">Computed from git history, snapshot {ACTIVITY.asOf}. See <Link href="/github" className="text-accent hover:underline">GitHub activity</Link>.</p>
      </Section>

      <Section eyebrow="Featured work" title="Projects I&apos;m proudest of" intro="Strongest first. Every project has a case study with architecture, decisions and honest limitations.">
        <div className="grid gap-6 md:grid-cols-2">
          {top.map((p, i) => <div key={p.slug} className={i === 0 ? "md:col-span-2" : ""}><ProjectCard p={p} featured={i === 0} /></div>)}
        </div>
        <div className="mt-8"><ButtonLink href="/projects" variant="ghost">Browse all {projectSummaries().length} projects</ButtonLink></div>
      </Section>

      <Section eyebrow="How I work" title="Principles">
        <div className="grid gap-4 md:grid-cols-3">
          {ABOUT.principles.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.06} className="rounded-2xl border border-line bg-surface p-6"><h3 className="font-semibold">{t}</h3><p className="mt-2 text-sm text-muted">{d}</p></Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow="Core stack" title="Technologies I use most" intro="Core means used in several real projects, including a deployed one.">
        <ul className="flex flex-wrap gap-2">{core.map((s) => <li key={s.name}><Tag tone="accent">{s.name}</Tag></li>)}</ul>
        <div className="mt-6"><ButtonLink href="/skills" variant="ghost">See skills with evidence</ButtonLink></div>
      </Section>

      <Section eyebrow="Consistency" title="Commit activity" intro="Every commit across my public repositories, from my first repo in June 2025 to October 2026.">
        <div className="rounded-2xl border border-line bg-surface p-5"><Heatmap daily={ACTIVITY.daily} /></div>
      </Section>

      <Section eyebrow="Engineering notes" title="How my projects work">
        <div className="grid gap-4 md:grid-cols-2">
          {POSTS.slice(0, 2).map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="rounded-2xl border border-line bg-surface p-6 transition hover:border-accent">
              <p className="font-mono text-xs text-accent">{fmtDate(p.date)} · {readingMinutes(p)} min read</p>
              <h3 className="mt-2 font-semibold">{p.title}</h3><p className="mt-2 text-sm text-muted">{p.summary}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-3xl border border-line bg-gradient-to-br from-accent/10 to-accent-2/10 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">Hiring for a full-stack role?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">The recruiter overview summarises my strongest evidence on one page, with links to verify every claim.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3"><ButtonLink href="/recruiter">Recruiter overview</ButtonLink><ButtonLink href="/contact" variant="ghost">Get in touch</ButtonLink></div>
        </div>
      </Section>
    </>
  );
}
