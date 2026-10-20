import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS, getProject, projectStats } from "@/data/projects";
import { POSTS } from "@/data/blog";
import { PageHeader, Section, Tag, StatTile, ButtonLink, statusTone } from "@/components/ui";
import ArchDiagram from "@/components/ArchDiagram";
import Timeline from "@/components/Timeline";
import { GithubIcon, ExternalIcon, CheckIcon } from "@/components/Icons";
import { fmtDate } from "@/lib/cache";

export const dynamicParams = false;
export const generateStaticParams = () => PROJECTS.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return { title: `${p.title}: case study`, description: `${p.tagline}. ${p.summary}`.slice(0, 200), alternates: { canonical: `/projects/${p.slug}` } };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const st = projectStats(p);
  const idx = PROJECTS.findIndex((x) => x.slug === slug);
  const prev = PROJECTS[idx - 1], next = PROJECTS[idx + 1];
  const notes = POSTS.filter((n) => n.project === p.slug);
  const days = st.first && st.last ? Math.round((new Date(st.last) - new Date(st.first)) / 864e5) + 1 : null;

  return (
    <>
      <PageHeader eyebrow={`${p.category} case study`} title={p.title} crumbs={[["/", "Home"], ["/projects", "Projects"], [null, p.title]]}>{p.tagline}</PageHeader>
      <div className="mx-auto -mt-4 flex max-w-6xl flex-wrap items-center gap-3 px-4 pb-8 sm:px-6">
        <Tag tone="accent">{p.category}</Tag><Tag tone={statusTone(p.status)}>{p.status}</Tag>
        {st.repos.map((r) => <ButtonLink key={r.name} href={r.url} variant="ghost" external><GithubIcon width={16} height={16} />{p.repos.length > 1 ? r.label : "Source code"}</ButtonLink>)}
        {p.live ? <ButtonLink href={p.live} external><ExternalIcon width={16} height={16} />Live demo</ButtonLink> : null}
      </div>

      {p.image ? (
        <div className="mx-auto max-w-6xl px-4 sm:px-6"><div className="relative aspect-[2.1/1] overflow-hidden rounded-2xl border border-line bg-black"><Image src={p.image} alt={p.imageAlt ?? ""} fill priority sizes="(max-width: 1152px) 100vw, 1152px" className="object-contain" /></div></div>
      ) : null}

      <Section>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatTile label="Commits" value={st.commits} note={st.repos.length > 1 ? `across ${st.repos.length} repositories` : "from git history"} />
          <StatTile label="Development window" value={days ? `${days} days` : "n/a"} note={st.first ? `${fmtDate(st.first)} to ${fmtDate(st.last)}` : ""} />
          <StatTile label="Lines of code" value={st.loc.toLocaleString("en-IN")} note="source files, excluding generated code" />
          <StatTile label="Technologies" value={p.stack.length} />
        </div>
      </Section>

      <Section eyebrow="Overview" title="What it is and why I built it">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4 leading-relaxed text-muted"><p>{p.summary}</p><p><span className="font-semibold text-fg">Goal. </span>{p.problem}</p></div>
          <div className="rounded-2xl border border-line bg-surface p-5"><p className="font-mono text-xs uppercase tracking-widest text-accent">My role</p><p className="mt-2 text-sm">{p.role}</p></div>
        </div>
      </Section>

      <Section eyebrow="Features" title="What it does">
        <ul className="grid gap-3 md:grid-cols-2">{p.features.map((f) => <li key={f} className="flex gap-3 rounded-xl border border-line bg-surface p-4 text-sm"><CheckIcon width={18} height={18} className="mt-0.5 shrink-0 text-accent" />{f}</li>)}</ul>
      </Section>

      {p.architecture ? <Section eyebrow="Architecture" title="How it fits together"><ArchDiagram arch={p.architecture} title={p.title} /></Section> : null}

      {p.decisions?.length ? (
        <Section eyebrow="Engineering decisions" title="Choices worth explaining">
          <div className="grid gap-4 md:grid-cols-2">{p.decisions.map(([t, d]) => <div key={t} className="rounded-2xl border border-line bg-surface p-5"><h3 className="font-semibold">{t}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{d}</p></div>)}</div>
        </Section>
      ) : null}

      <Section eyebrow="Tech stack" title="Built with"><ul className="flex flex-wrap gap-2">{p.stack.map((t) => <li key={t}><Tag>{t}</Tag></li>)}</ul></Section>

      <Section eyebrow="Changelog" title="Project history" intro="Milestones summarised from the commit history of the repository."><Timeline items={p.milestones.map((m) => ({ date: m.date, title: m.title, detail: m.detail }))} /></Section>

      {p.limitations?.length ? (
        <Section eyebrow="Honest notes" title="Limitations">
          <ul className="space-y-2">{p.limitations.map((l) => <li key={l} className="rounded-xl border border-amber-400/30 bg-amber-400/5 p-4 text-sm text-muted">{l}</li>)}</ul>
        </Section>
      ) : null}

      {notes.length ? (
        <Section eyebrow="Related" title="Engineering notes">
          <div className="grid gap-4 md:grid-cols-2">{notes.map((n) => <Link key={n.slug} href={`/blog/${n.slug}`} className="rounded-2xl border border-line bg-surface p-5 transition hover:border-accent"><h3 className="font-semibold">{n.title}</h3><p className="mt-1 text-sm text-muted">{n.summary}</p></Link>)}</div>
        </Section>
      ) : null}

      <Section>
        <nav aria-label="More projects" className="flex flex-col justify-between gap-4 sm:flex-row">
          {prev ? <Link href={`/projects/${prev.slug}`} className="rounded-2xl border border-line bg-surface p-5 transition hover:border-accent sm:w-1/2"><span className="text-xs text-muted">Previous</span><span className="block font-semibold">{prev.title}</span></Link> : <span className="sm:w-1/2" />}
          {next ? <Link href={`/projects/${next.slug}`} className="rounded-2xl border border-line bg-surface p-5 text-right transition hover:border-accent sm:w-1/2"><span className="text-xs text-muted">Next</span><span className="block font-semibold">{next.title}</span></Link> : null}
        </nav>
      </Section>
    </>
  );
}
