import { PageHeader, Section, StatTile } from "@/components/ui";
import { GithubLive } from "@/components/LiveStats";
import { Heatmap, BarList } from "@/components/Charts";
import RepoExplorer from "@/components/RepoExplorer";
import { ALL_REPOS, TOTALS, ACTIVITY } from "@/data/repos";
import { SITE } from "@/data/site";

export const metadata = { title: "GitHub activity", description: "Live GitHub statistics, commit heatmap, lines of code and a classified explorer of all of Vignesh T's repositories." };

export default function GithubPage() {
  const byMonth = {};
  Object.entries(ACTIVITY.daily).forEach(([d, n]) => { const k = d.slice(0, 7); byMonth[k] = (byMonth[k] || 0) + n; });
  const months = Object.entries(byMonth).map(([k, v]) => ({ label: new Date(k + "-01T00:00:00Z").toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" }), value: v }));
  const byRepo = ALL_REPOS.filter((r) => r.commits).sort((a, b) => b.commits - a.commits).slice(0, 8).map((r) => ({ label: r.name, value: r.commits }));
  const loc = Object.entries(ACTIVITY.loc).map(([label, value]) => ({ label, value }));
  return (
    <>
      <PageHeader eyebrow="GitHub activity" title={`@${SITE.socials.github.user}`} crumbs={[["/", "Home"], [null, "GitHub activity"]]}>Live profile data from the GitHub API, plus statistics computed directly from the git history of every repository (snapshot {SITE.dataAsOf}).</PageHeader>
      <Section eyebrow="Live" title="Profile statistics"><div className="rounded-2xl border border-line bg-surface p-6"><GithubLive /></div></Section>
      <Section eyebrow="From git history" title="Commit activity">
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4"><StatTile label="Repositories" value={TOTALS.repos} /><StatTile label="Commits" value={TOTALS.commits} /><StatTile label="Active days" value={TOTALS.activeDays} /><StatTile label="Lines of code" value={TOTALS.loc.toLocaleString("en-IN")} /></div>
        <div className="rounded-2xl border border-line bg-surface p-5"><Heatmap daily={ACTIVITY.daily} /></div>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-line bg-surface p-6"><h3 className="mb-4 font-semibold">Commits per month</h3><BarList items={months} /></div>
          <div className="rounded-2xl border border-line bg-surface p-6"><h3 className="mb-4 font-semibold">Commits per repository</h3><BarList items={byRepo} /></div>
          <div className="rounded-2xl border border-line bg-surface p-6"><h3 className="mb-4 font-semibold">Lines of code by language</h3><BarList items={loc} /><p className="mt-3 text-xs text-muted">Tracked source files only; build output, migrations and lock files excluded.</p></div>
        </div>
      </Section>
      <Section eyebrow="Repository explorer" title="All 18 repositories, classified" intro="Projects are applications; learning repositories are practice; the rest are profile, scaffold or empty repositories, labelled as such."><RepoExplorer repos={ALL_REPOS.map(({ name, kind, category, status, language, summary, project, url, commits, first, last, loc }) => ({ name, kind, category, status, language, summary, project, url, commits, first, last, loc }))} /></Section>
    </>
  );
}
