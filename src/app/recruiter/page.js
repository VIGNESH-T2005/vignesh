import Image from "next/image";
import Link from "next/link";
import { PageHeader, Section, ButtonLink, Tag } from "@/components/ui";
import Reveal from "@/components/Reveal";
import PrintButton from "@/components/PrintButton";
import { PROJECTS, projectStats } from "@/data/projects";
import { ALL_SKILLS } from "@/data/skills";
import { TOTALS } from "@/data/repos";
import { SITE } from "@/data/site";
import { DownloadIcon, MailIcon, ArrowUpRightIcon } from "@/components/Icons";

export const metadata = { title: "Recruiter overview", description: "One-page summary of Vignesh T for recruiters: role fit, strongest projects, core skills and where to verify the details." };

const FACTS = [
  ["Target role", SITE.roleFocus], ["Availability", "Internships and full-time roles"],
  ["Education", "B.E. ECE, final year · CGPA 8.21"], ["Location", SITE.location], ["Primary stack", "React · ASP.NET Core · Node.js · PostgreSQL"], ["Also", "Java and DSA · Power BI"],
];

export default function Recruiter() {
  const top = PROJECTS.slice(0, 3);
  const core = ALL_SKILLS.filter((s) => s.tier === "Core");
  const live = PROJECTS.filter((p) => p.status === "Deployed").length;
  return (
    <>
      <PageHeader index="13" eyebrow="Recruiter overview" title="The one-page *summary*" crumbs={[["/", "Home"], [null, "Recruiter overview"]]}>Role fit, strongest projects and core skills in about a minute.</PageHeader>

      <Section className="pt-0">
        <Reveal className="glass overflow-hidden rounded-[2rem]">
          <div className="grid gap-0 lg:grid-cols-[auto_1fr]">
            <div className="relative aspect-square w-full bg-surface lg:w-56"><Image src="/dp.png" alt="Portrait of Vignesh T" fill sizes="224px" className="object-cover object-top" /></div>
            <div className="p-6 sm:p-8">
              <h2 className="display text-4xl">{SITE.name}</h2><p className="serif-i text-2xl text-muted">{SITE.role}</p>
              <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">{FACTS.map(([k, v]) => <div key={k}><dt className="eyebrow text-muted">{k}</dt><dd className="mt-1 text-sm">{v}</dd></div>)}</dl>
              <div className="no-print mt-7 flex flex-wrap gap-3"><ButtonLink href={SITE.resume} download><DownloadIcon width={16} height={16} />Download résumé</ButtonLink><ButtonLink href={`mailto:${SITE.email}`} variant="ghost"><MailIcon width={16} height={16} />{SITE.email}</ButtonLink><PrintButton /></div>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section num="01" eyebrow="Start here" title="Three projects to *look at first*">
        <div className="space-y-5">
          {top.map((p, i) => { const st = projectStats(p); return (
            <Reveal key={p.slug} delay={i * 0.06}>
              <div data-spot className="spot rounded-3xl border border-line bg-surface/70 p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3"><h3 className="display text-3xl"><Link href={`/projects/${p.slug}`} className="hover:text-accent">{p.title}</Link></h3><p className="font-mono text-xs text-muted">{st.commits} commits · {p.status}</p></div>
                <p className="mt-3 max-w-3xl text-muted">{p.summary}</p>
                <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-3">{p.features.slice(0, 3).map((f) => <li key={f} className="rounded-xl border border-line bg-white/[0.02] p-3 text-fg/90">{f}</li>)}</ul>
                <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  <Link href={`/projects/${p.slug}`} className="u-link inline-flex items-center gap-1 text-accent">Case study <ArrowUpRightIcon width={14} height={14} /></Link>
                  {p.live ? <a href={p.live} target="_blank" rel="noopener noreferrer" className="u-link text-accent">Live demo<span className="sr-only"> (opens in a new tab)</span></a> : null}
                  {st.repos.map((r) => <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" className="u-link text-muted hover:text-fg">{r.name}<span className="sr-only"> (opens in a new tab)</span></a>)}
                </p>
              </div>
            </Reveal>); })}
        </div>
      </Section>

      <Section num="02" eyebrow="Core stack" title="What I use *most*" intro="Technologies used in deployed projects or across many repositories.">
        <ul className="flex flex-wrap gap-2">{core.map((s) => <li key={s.name}><Tag tone="accent">{s.name}</Tag></li>)}</ul>
        <p className="mt-5 text-sm"><Link href="/skills" className="u-link text-accent">See every skill and where it was used</Link></p>
      </Section>

      <Section num="03" eyebrow="Track record" title="In *numbers*">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">{[["Repositories", TOTALS.repos], ["Commits", TOTALS.commits], ["Active days", TOTALS.activeDays], ["Live projects", live]].map(([k, v]) => <div key={k} className="border-l border-line-2 pl-5"><dt className="eyebrow text-muted">{k}</dt><dd className="display gradient-text mt-2 text-[clamp(2.4rem,5vw,4rem)]">{v}</dd></div>)}</dl>
      </Section>

      <Section num="04" eyebrow="Good to know" title="Context for *your decision*">
        <ul className="grid gap-3 md:grid-cols-2">
          {["Final-year student with one short internship (Jun to Jul 2025) and no full-time experience yet.", "HRC TECH processes payments in Stripe test mode and its backend runs on a free hosting tier.", "The LMS repository is an AI-assisted prototype.", "Shop-Zone's storefront currently uses the product API; login and order screens are next."].map((t) => <li key={t} className="rounded-2xl border border-amber-400/25 bg-amber-400/[0.04] p-5 text-muted">{t}</li>)}
        </ul>
      </Section>

      <Section num="05" eyebrow="Dig deeper" title="See the *evidence*" className="no-print">
        <ul className="grid gap-3 sm:grid-cols-2">
          {[["/github", "GitHub activity", "Live statistics and all 18 repositories."], ["/changelog", "Changelog", "Dated project milestones."], ["/coding", "Coding profiles", "LeetCode and practice repositories."], ["/experience", "Experience and education", "Matches the downloadable résumé."]].map(([h, t, d]) => (
            <li key={h}><Link href={h} className="group block rounded-2xl border border-line bg-surface/70 p-5 transition hover:border-accent"><span className="display text-xl group-hover:text-accent">{t}</span><p className="mt-1 text-sm text-muted">{d}</p></Link></li>
          ))}
        </ul>
      </Section>
    </>
  );
}
