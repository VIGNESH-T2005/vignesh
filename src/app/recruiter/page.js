import Link from "next/link";
import { PageHeader, Section, StatTile, ButtonLink, Tag } from "@/components/ui";
import { PROJECTS, projectStats } from "@/data/projects";
import { ALL_SKILLS } from "@/data/skills";
import { TOTALS } from "@/data/repos";
import { SITE } from "@/data/site";
import { EDUCATION } from "@/data/journey";
import { DownloadIcon, MailIcon } from "@/components/Icons";

export const metadata = { title: "Recruiter overview", description: "One-page summary of Vignesh T for recruiters: role fit, strongest projects, verified skills and how to verify every claim." };

export default function Recruiter() {
  const top = PROJECTS.slice(0, 3);
  const core = ALL_SKILLS.filter((s) => s.tier === "Core");
  return (
    <>
      <PageHeader eyebrow="Recruiter overview" title="Vignesh T at a glance" crumbs={[["/", "Home"], [null, "Recruiter overview"]]}>Everything you need in about a minute, with links to verify each claim.</PageHeader>
      <Section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[["Target role", SITE.roleFocus], ["Availability", "Internships and full-time roles"], ["Education", `${EDUCATION[0].title.replace("B.E. ", "B.E. ")} (final year, CGPA 8.21)`], ["Location", SITE.location]].map(([k, v]) => (
            <div key={k} className="rounded-2xl border border-line bg-surface p-5"><p className="font-mono text-xs uppercase tracking-widest text-accent">{k}</p><p className="mt-2 text-sm">{v}</p></div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3"><ButtonLink href={SITE.resume} download><DownloadIcon width={16} height={16} />Download resume</ButtonLink><ButtonLink href={`mailto:${SITE.email}`} variant="ghost"><MailIcon width={16} height={16} />{SITE.email}</ButtonLink><ButtonLink href="/contact" variant="ghost">Contact form</ButtonLink></div>
      </Section>

      <Section eyebrow="Strongest evidence" title="Three projects to look at first">
        <div className="space-y-4">
          {top.map((p) => { const st = projectStats(p); return (
            <div key={p.slug} className="rounded-2xl border border-line bg-surface p-6">
              <div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-lg font-bold"><Link href={`/projects/${p.slug}`} className="hover:text-accent">{p.title}</Link></h3><span className="text-xs text-muted">{st.commits} commits · {p.status}</span></div>
              <p className="mt-2 text-sm text-muted">{p.summary}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">{p.features.slice(0, 3).map((f) => <li key={f}>{f}</li>)}</ul>
              <p className="mt-3 flex flex-wrap gap-3 text-sm"><Link href={`/projects/${p.slug}`} className="text-accent hover:underline">Case study</Link>{p.live ? <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Live demo<span className="sr-only"> (opens in a new tab)</span></a> : null}{st.repos.map((r) => <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{r.name}<span className="sr-only"> (opens in a new tab)</span></a>)}</p>
            </div>); })}
        </div>
      </Section>

      <Section eyebrow="Verified stack" title="Core technologies" intro="Core = used in several real projects, including a deployed one."><ul className="flex flex-wrap gap-2">{core.map((s) => <li key={s.name}><Tag tone="accent">{s.name}</Tag></li>)}</ul><p className="mt-4 text-sm"><Link href="/skills" className="text-accent hover:underline">See every skill with its evidence</Link></p></Section>

      <Section eyebrow="Numbers" title="Engineering record"><div className="grid grid-cols-2 gap-4 lg:grid-cols-4"><StatTile label="Public repositories" value={TOTALS.repos} /><StatTile label="Commits" value={TOTALS.commits} /><StatTile label="Active days" value={TOTALS.activeDays} /><StatTile label="Deployed projects" value={PROJECTS.filter((p) => p.status === "Deployed").length} /></div></Section>

      <Section eyebrow="Honest context" title="What to know before you decide">
        <ul className="space-y-2 text-sm">
          {["I'm a final-year student: one short internship (Jun to Jul 2025) and no full-time experience yet.", "HRC TECH uses Stripe in test mode and its backend runs on a free hosting tier.", "The LMS repository is an AI-assisted prototype and is labelled that way.", "Shop-Zone's frontend does not yet use its login and order endpoints."].map((t) => <li key={t} className="rounded-xl border border-amber-400/30 bg-amber-400/5 p-4 text-muted">{t}</li>)}
        </ul>
      </Section>

      <Section eyebrow="Verify" title="Check any claim yourself">
        <ul className="grid gap-3 text-sm sm:grid-cols-2">
          <li className="rounded-xl border border-line bg-surface p-4"><Link href="/github" className="font-semibold text-accent hover:underline">GitHub activity</Link><p className="mt-1 text-muted">Live stats and all 18 repositories, classified.</p></li>
          <li className="rounded-xl border border-line bg-surface p-4"><Link href="/changelog" className="font-semibold text-accent hover:underline">Changelog</Link><p className="mt-1 text-muted">Dated milestones from commit history.</p></li>
          <li className="rounded-xl border border-line bg-surface p-4"><Link href="/coding" className="font-semibold text-accent hover:underline">Coding profiles</Link><p className="mt-1 text-muted">LeetCode and practice repositories.</p></li>
          <li className="rounded-xl border border-line bg-surface p-4"><Link href="/experience" className="font-semibold text-accent hover:underline">Experience and education</Link><p className="mt-1 text-muted">Matches the downloadable resume.</p></li>
        </ul>
      </Section>
    </>
  );
}
