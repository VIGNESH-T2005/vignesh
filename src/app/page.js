import Link from "next/link";
import Cover from "@/components/Cover";
import CountUp from "@/components/CountUp";
import ProjectCard, { ProjectShowcase } from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import CopyEmail from "@/components/CopyEmail";
import { Heatmap } from "@/components/Charts";
import { Section, ButtonLink, Tag } from "@/components/ui";
import { DownloadIcon, ArrowUpRightIcon, GithubIcon, LinkedinIcon, CodeIcon } from "@/components/Icons";
import { projectSummaries } from "@/lib/summaries";
import { TOTALS, ACTIVITY } from "@/data/repos";
import { ALL_SKILLS, SKILL_GROUPS } from "@/data/skills";
import { POSTS, readingMinutes } from "@/data/blog";
import { EXPERIENCE, EDUCATION, CERTIFICATIONS, ACHIEVEMENTS } from "@/data/journey";
import { SITE } from "@/data/site";
import { GRAPH_NODES } from "@/data/graph";
import { fmtMonth, fmtDate } from "@/lib/cache";
import Image from "next/image";

export const metadata = { alternates: { canonical: "/" } };

const ORDER = ["backend", "frontend", "languages", "databases", "data", "tools"];
const social = [
  { ...SITE.socials.github, Icon: GithubIcon }, { ...SITE.socials.linkedin, Icon: LinkedinIcon }, { ...SITE.socials.leetcode, Icon: CodeIcon },
];

export default function Home() {
  const all = projectSummaries().sort((a, b) => a.rank - b.rank);
  const [flagship, ...rest] = all;
  const graph = Object.entries(GRAPH_NODES).map(([id, n]) => {
    const skill = ALL_SKILLS.find((x) => x.name === n.skill);
    return { id, label: n.label, color: n.color, pos: n.pos, tier: skill?.tier ?? "Working", used: (skill?.projects ?? []).slice(0, 3).map((p) => p.title), href: `/projects/${skill?.projects?.[0]?.slug ?? "hrc-tech"}` };
  });
  const groups = ORDER.map((id) => SKILL_GROUPS.find((g) => g.id === id));
  const metrics = [
    ["Public repositories", TOTALS.repos], ["Commits", TOTALS.commits], ["Active days", TOTALS.activeDays], ["Live projects", all.filter((p) => p.status === "Deployed").length],
  ];
  const degree = EDUCATION[0];

  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pt-4 sm:px-8 xl:pt-6"><Cover graph={graph} /></div>

      <section aria-labelledby="profile-name" className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative -mt-12 flex flex-wrap items-end gap-x-6 gap-y-4 px-2 sm:-mt-14 sm:px-6 xl:mt-6 xl:items-center">
          <span className="relative block h-28 w-28 shrink-0 rounded-full xl:hidden bg-gradient-to-br from-accent via-accent-2 to-violet p-[3px] shadow-[0_0_50px_var(--glow)] sm:h-32 sm:w-32">
            <span className="relative block h-full w-full overflow-hidden rounded-full border-4 border-bg bg-bg"><Image src="/dp.png" alt="Portrait of Vignesh T" fill priority sizes="128px" className="object-cover object-top" /></span>
          </span>
          <div className="min-w-[15rem] flex-1 pb-1">
            <h1 id="profile-name" className="display whitespace-nowrap">{SITE.name}</h1>
            <p className="mt-1 text-base text-fg/90 sm:text-lg">{SITE.role} <span className="text-muted">· Final-year ECE</span></p>
            <p className="mt-1 text-sm text-muted">{SITE.location} · {SITE.availability}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 pb-1">
            <ButtonLink href={SITE.resume} download><DownloadIcon width={16} height={16} />Download résumé</ButtonLink>
            <ButtonLink href="/contact" variant="ghost">Contact</ButtonLink>
            <ul className="flex gap-2">
              {social.map(({ label, href, Icon }) => (
                <li key={label}><a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`} className="grid h-11 w-11 place-items-center rounded-full border border-line-2 text-muted transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"><Icon /></a></li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-7 max-w-3xl px-2 text-lg leading-relaxed text-fg/85 sm:px-6">{SITE.headline} {SITE.intro}</p>
      </section>

      <Section>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {metrics.map(([label, value], i) => (
            <Reveal key={label} delay={i * 0.06} className="border-l border-line-2 pl-5">
              <dt className="eyebrow text-muted">{label}</dt>
              <dd className="display gradient-text mt-2"><CountUp value={value} /></dd>
            </Reveal>
          ))}
        </dl>
      </Section>

      <Section eyebrow="Projects" title="Selected *projects*" intro="Full-stack work with real authentication, payments and deployment. Each project has a detailed case study.">
        <Reveal><ProjectShowcase p={flagship} /></Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {rest.slice(0, 2).map((p, i) => <Reveal key={p.slug} delay={i * 0.08}><ProjectCard p={p} index={i + 2} /></Reveal>)}
        </div>
        <div className="mt-8"><ButtonLink href="/projects" variant="ghost">View all {all.length} projects</ButtonLink></div>
      </Section>

      <Section eyebrow="Experience" title="Experience and *training*">
        <div className="grid gap-4 md:grid-cols-3">
          {EXPERIENCE.map((e, i) => (
            <Reveal key={e.id} delay={i * 0.07}>
              <div data-spot className="spot h-full rounded-3xl border border-line bg-surface/70 p-6">
                <p className="font-mono text-xs text-accent">{e.period}</p>
                <h3 className="display mt-3 text-xl">{e.role}</h3>
                <p className="mt-1 text-sm text-muted">{e.org}</p>
                <p className="mt-4 text-sm leading-relaxed text-fg/80">{e.summary}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-sm"><Link href="/experience" className="u-link text-accent">Full experience</Link></p>
      </Section>

      <Section eyebrow="Expertise" title="Technical *expertise*" intro="Technologies applied in shipped projects, grouped by area.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {groups.map((g, i) => {
            const items = ALL_SKILLS.filter((s) => s.group === g.title).sort((a, b) => ["Core", "Working", "Learning"].indexOf(a.tier) - ["Core", "Working", "Learning"].indexOf(b.tier));
            return (
              <Reveal key={g.id} delay={i * 0.04}>
                <Link href="/skills" data-spot className="spot group flex h-full min-h-44 flex-col justify-between rounded-3xl border border-line bg-surface/70 p-6 transition hover:border-line-2">
                  <div className="flex items-start justify-between"><h3 className="display text-xl">{g.title}</h3><ArrowUpRightIcon className="text-muted transition group-hover:text-accent" /></div>
                  <ul className="mt-5 flex flex-wrap gap-1.5">{items.slice(0, 6).map((s) => <li key={s.name}><Tag tone={s.tier === "Core" ? "accent" : "default"}>{s.name}</Tag></li>)}</ul>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Education" title="Education and *credentials*">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div className="h-full rounded-3xl border border-line bg-surface/70 p-7">
              <p className="eyebrow">In progress · {degree.period}</p>
              <h3 className="display mt-3 text-2xl">{degree.title}</h3>
              <p className="mt-1 text-muted">{degree.place}</p>
              <p className="display gradient-text mt-6 text-4xl">8.21<span className="ml-2 text-base text-muted">/ 10 CGPA</span></p>
            </div>
          </Reveal>
          <ul className="space-y-3">
            {CERTIFICATIONS.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 0.06}>
                <div className="flex items-start justify-between gap-4 rounded-2xl border border-line bg-surface/70 p-5">
                  <div><p className="font-semibold leading-snug">{c.title}</p><p className="mt-1 text-sm text-muted">{c.issuer}</p></div>
                  <Tag tone="accent">{c.year}</Tag>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-sm"><Link href="/education" className="u-link text-accent">Education details</Link></p>
      </Section>

      <Section eyebrow="Recognition" title="Recognition and *milestones*">
        <div className="grid gap-4 md:grid-cols-2">
          {ACHIEVEMENTS.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.07}>
              <div data-spot className="spot h-full rounded-3xl border border-line bg-surface/70 p-6">
                <div className="flex items-center gap-3"><Tag tone="accent">{a.kind}</Tag><span className="font-mono text-xs text-muted">{a.year}</span></div>
                <h3 className="display mt-4 text-xl leading-snug">{a.title}</h3>
                <p className="mt-1 text-sm text-muted">{a.org}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow="Engineering activity" title="Consistent *delivery*" intro={`${TOTALS.commits} commits across ${TOTALS.repos} repositories since ${fmtMonth(TOTALS.since)}.`}>
        <Reveal className="frost rounded-3xl p-5 sm:p-7"><Heatmap daily={ACTIVITY.daily} /></Reveal>
        <div className="mt-6 flex flex-wrap gap-3"><ButtonLink href="/github" variant="ghost">GitHub activity</ButtonLink><ButtonLink href="/coding" variant="ghost">Coding profiles</ButtonLink></div>
      </Section>

      <Section eyebrow="Writing" title="Engineering *notes*">
        <ul className="border-t border-line">
          {POSTS.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 0.05} className="border-b border-line">
              <Link href={`/blog/${p.slug}`} className="group grid items-baseline gap-2 py-5 transition-all hover:pl-3 md:grid-cols-[1fr_auto]">
                <h3 className="display text-lg transition-colors group-hover:text-accent sm:text-xl">{p.title}</h3>
                <span className="font-mono text-xs text-muted">{fmtDate(p.date)} · {readingMinutes(p)} min read</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section className="pb-4">
        <Reveal className="relative overflow-hidden rounded-[32px] border border-line-2 bg-surface/60 px-6 py-14 text-center sm:px-12">
          <div aria-hidden="true" className="absolute inset-x-0 -top-24 mx-auto h-56 w-2/3 rounded-full bg-accent/15 blur-3xl" />
          <p className="eyebrow relative">{SITE.availability}</p>
          <h2 className="display relative mx-auto mt-4 max-w-2xl">Let&apos;s discuss your <span className="gradient-text">next hire</span></h2>
          <p className="relative mx-auto mt-3 max-w-xl text-muted">Open to full-stack developer roles. The hiring summary covers my strongest evidence on one page.</p>
          <div className="relative mt-7 flex flex-wrap items-center justify-center gap-3"><ButtonLink href="/recruiter">Hiring summary</ButtonLink><ButtonLink href="/contact" variant="ghost">Send a message</ButtonLink></div>
          <div className="relative mt-5 flex justify-center"><CopyEmail /></div>
        </Reveal>
      </Section>
    </>
  );
}
