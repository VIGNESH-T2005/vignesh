import { PageHeader, Section } from "@/components/ui";
import { GithubLive } from "@/components/LiveStats";
import { Heatmap, BarList } from "@/components/Charts";
import RepoExplorer from "@/components/RepoExplorer";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import { ALL_REPOS, TOTALS, ACTIVITY } from "@/data/repos";
import { SITE } from "@/data/site";

export const metadata = { title: "GitHub activity", description: "Live GitHub statistics, commit heatmap, lines of code and a classified explorer of all of Vignesh T's repositories." };

export default function GithubPage() {
  const byMonth = {};
  Object.entries(ACTIVITY.daily).forEach(([d, n]) => { const k = d.slice(0, 7); byMonth[k] = (byMonth[k] || 0) + n; });
  const months = Object.entries(byMonth).map(([k, v]) => ({ label: new Date(k + "-01T00:00:00Z").toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" }), value: v }));
  const byRepo = ALL_REPOS.filter((r) => r.commits).sort((a, b) => b.commits - a.commits).slice(0, 8).map((r) => ({ label: r.name, value: r.commits }));
  const loc = Object.entries(ACTIVITY.loc).map(([label, value]) => ({ label, value }));
  const card = "rounded-3xl border border-line bg-surface/70 p-6";
  return (
    <>
      <PageHeader index="09" eyebrow="GitHub activity" title="Code, *in the open*" crumbs={[["/", "Home"], [null, "GitHub activity"]]}>Live statistics for @{SITE.socials.github.user}, my commit rhythm, and every repository grouped by what it is.</PageHeader>

      <Section className="pt-0"><Reveal className="glass rounded-[2rem] p-6 sm:p-10"><p className="eyebrow mb-6">Live from GitHub</p><GithubLive /></Reveal></Section>

      <Section num="01" eyebrow="Activity" title="Commits over *time*">
        <dl className="mb-8 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {[["Repositories", TOTALS.repos], ["Commits", TOTALS.commits], ["Active days", TOTALS.activeDays], ["Lines of code", TOTALS.loc]].map(([k, v]) => (
            <div key={k} className="border-l border-line-2 pl-5"><dt className="eyebrow text-muted">{k}</dt><dd className="display gradient-text mt-2 text-[clamp(2.2rem,5vw,4rem)]"><CountUp value={v} /></dd></div>
          ))}
        </dl>
        <Reveal className="glass rounded-3xl p-5 sm:p-8"><Heatmap daily={ACTIVITY.daily} /></Reveal>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Reveal className={card}><h3 className="display mb-5 text-xl">Commits per month</h3><BarList items={months} /></Reveal>
          <Reveal delay={0.08} className={card}><h3 className="display mb-5 text-xl">Commits per repository</h3><BarList items={byRepo} /></Reveal>
          <Reveal delay={0.16} className={card}><h3 className="display mb-5 text-xl">Lines of code by language</h3><BarList items={loc} /></Reveal>
        </div>
      </Section>

      <Section num="02" eyebrow="Repository explorer" title="All 18 repositories, *grouped*" intro="Applications, practice repositories and housekeeping repos, filterable by category and language.">
        <RepoExplorer repos={ALL_REPOS.map(({ name, kind, category, status, language, summary, project, url, commits, first, last, loc }) => ({ name, kind, category, status, language, summary, project, url, commits, first, last, loc }))} />
      </Section>
    </>
  );
}
