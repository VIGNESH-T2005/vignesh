import Link from "next/link";
import Hero from "@/components/Hero";
import CountUp from "@/components/CountUp";
import ProjectCard, { ProjectShowcase } from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import CopyEmail from "@/components/CopyEmail";
import { Heatmap } from "@/components/Charts";
import { Section, ButtonLink, Marquee, Tag } from "@/components/ui";
import { projectSummaries } from "@/lib/summaries";
import { TOTALS, ACTIVITY } from "@/data/repos";
import { ALL_SKILLS, SKILL_GROUPS } from "@/data/skills";
import { POSTS, readingMinutes } from "@/data/blog";
import { ABOUT, SITE } from "@/data/site";
import { fmtMonth, fmtDate } from "@/lib/cache";
import { ArrowUpRightIcon } from "@/components/Icons";
import { GRAPH_NODES } from "@/data/graph";

export const metadata = { alternates: { canonical: "/" } };

const TILE = { backend: "lg:col-span-2", languages: "", frontend: "", databases: "", data: "", tools: "lg:col-span-2" };
const ORDER = ["backend", "languages", "frontend", "databases", "data", "tools"];

export default function Home() {
  const all = projectSummaries().sort((a, b) => a.rank - b.rank);
  const [flagship, ...rest] = all;
  const marquee = ALL_SKILLS.filter((s) => s.tier === "Core").map((s) => s.name);
  const metrics = [
    ["Repositories", TOTALS.repos, "applications and practice"],
    ["Commits", TOTALS.commits, `since ${fmtMonth(TOTALS.since)}`],
    ["Active days", TOTALS.activeDays, "of shipping code"],
    ["Lines of code", TOTALS.loc, "across all projects"],
  ];
  const graph = Object.entries(GRAPH_NODES).map(([id, n]) => {
    const skill = ALL_SKILLS.find((x) => x.name === n.skill);
    return { id, label: n.label, color: n.color, pos: n.pos, tier: skill?.tier ?? "Working", used: (skill?.projects ?? []).slice(0, 3).map((p) => p.title), href: `/projects/${skill?.projects?.[0]?.slug ?? "hrc-tech"}` };
  });
  const groups = ORDER.map((id) => SKILL_GROUPS.find((g) => g.id === id));

  return (
    <>
      <Hero graph={graph} />
      <Marquee items={marquee} />

      <Section>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {metrics.map(([label, value, note], i) => (
            <Reveal key={label} delay={i * 0.07} className="border-l border-line-2 pl-5">
              <dt className="eyebrow text-muted">{label}</dt>
              <dd className="display mt-3 text-[clamp(2.6rem,5vw,4.6rem)]"><CountUp value={value} className="gradient-text" /></dd>
              <p className="mt-2 text-sm text-muted">{note}</p>
            </Reveal>
          ))}
        </dl>
      </Section>

      <Section num="01" eyebrow="Selected work" title="Products built *end to end*" intro="Full-stack projects with real authentication, payments and deployment, each with a detailed case study.">
        <Reveal><ProjectShowcase p={flagship} /></Reveal>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {rest.slice(0, 2).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1} className={i === 1 ? "md:mt-16" : ""}><ProjectCard p={p} index={i + 2} /></Reveal>
          ))}
        </div>
        <div className="mt-12 flex justify-center"><ButtonLink href="/projects" variant="ghost">Browse all {all.length} projects</ButtonLink></div>
      </Section>

      <Section num="02" eyebrow="Capabilities" title="One developer, *the whole stack*" intro="From React interfaces to ASP.NET Core and Node APIs, relational and document databases, payments and deployment.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {groups.map((g, i) => {
            const items = ALL_SKILLS.filter((s) => s.group === g.title).sort((a, b) => ["Core", "Working", "Learning"].indexOf(a.tier) - ["Core", "Working", "Learning"].indexOf(b.tier));
            return (
              <Reveal key={g.id} delay={i * 0.05} className={TILE[g.id]}>
                <Link href="/skills" data-spot className="spot group flex h-full min-h-48 flex-col justify-between rounded-3xl border border-line bg-surface/70 p-6 transition hover:border-line-2">
                  <div className="flex items-start justify-between"><h3 className="display text-2xl">{g.title}</h3><ArrowUpRightIcon className="text-muted transition group-hover:text-accent" /></div>
                  <ul className="mt-6 flex flex-wrap gap-1.5">{items.slice(0, 6).map((s) => <li key={s.name}><Tag tone={s.tier === "Core" ? "accent" : "default"}>{s.name}</Tag></li>)}</ul>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section num="03" eyebrow="Consistency" title="Shipping *every week*" intro={`${TOTALS.commits} commits across ${TOTALS.repos} repositories since ${fmtMonth(TOTALS.since)}.`}>
        <Reveal className="glass rounded-3xl p-5 sm:p-8"><Heatmap daily={ACTIVITY.daily} /></Reveal>
        <div className="mt-6 flex flex-wrap gap-3"><ButtonLink href="/github" variant="ghost">GitHub activity</ButtonLink><ButtonLink href="/coding" variant="ghost">Coding profiles</ButtonLink></div>
      </Section>

      <Section num="04" eyebrow="Engineering notes" title="How the *hard parts* work">
        <ul className="border-t border-line">
          {POSTS.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 0.06} className="border-b border-line">
              <Link href={`/blog/${p.slug}`} className="group grid items-baseline gap-2 py-7 transition-all hover:pl-4 md:grid-cols-[4rem_1.6fr_1fr_auto]">
                <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display text-2xl transition-colors group-hover:text-accent sm:text-3xl">{p.title}</h3>
                <span className="text-sm text-muted">{fmtDate(p.date)} · {readingMinutes(p)} min read</span>
                <ArrowUpRightIcon className="hidden text-muted transition group-hover:text-accent md:block" />
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section className="pb-4">
        <Reveal className="relative overflow-hidden rounded-[40px] border border-line-2 bg-surface/60 px-6 py-16 text-center sm:px-12 sm:py-24">
          <div aria-hidden="true" className="absolute inset-x-0 -top-24 mx-auto h-64 w-2/3 rounded-full bg-accent/15 blur-3xl" />
          <p className="eyebrow relative">{SITE.availability}</p>
          <h2 className="display relative mx-auto mt-5 max-w-4xl text-[clamp(2.6rem,7vw,6rem)] leading-[0.98]">Let&apos;s build something <em className="serif-i gradient-text pr-2 font-normal">solid.</em></h2>
          <div className="relative mt-9 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/recruiter">Recruiter overview</ButtonLink>
            <ButtonLink href="/contact" variant="ghost">Send a message</ButtonLink>
          </div>
          <div className="relative mt-6 flex justify-center"><CopyEmail /></div>
        </Reveal>
      </Section>
    </>
  );
}
