import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS, getProject, projectStats } from "@/data/projects";
import { POSTS } from "@/data/blog";
import { Tag, ButtonLink, statusTone, rich } from "@/components/ui";
import ArchDiagram from "@/components/ArchDiagram";
import Timeline from "@/components/Timeline";
import ChapterNav from "@/components/ChapterNav";
import ParallaxFrame from "@/components/ParallaxFrame";
import Reveal from "@/components/Reveal";
import { Frame } from "@/components/ProjectCard";
import { GithubIcon, ExternalIcon, ArrowUpRightIcon } from "@/components/Icons";
import { fmtDate } from "@/lib/cache";

export const dynamicParams = false;
export const generateStaticParams = () => PROJECTS.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return { title: `${p.title}: case study`, description: `${p.tagline}. ${p.summary}`.slice(0, 200), alternates: { canonical: `/projects/${p.slug}` } };
}

const H = ({ id, n, children }) => (
  <div className="mb-8 flex items-baseline gap-4"><span className="font-mono text-xs text-accent">{String(n).padStart(2, "0")}</span><h2 id={id} className="display text-[clamp(1.9rem,4vw,3rem)]">{children}</h2></div>
);

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const st = projectStats(p);
  const idx = PROJECTS.findIndex((x) => x.slug === slug);
  const next = PROJECTS[idx + 1] ?? PROJECTS[0];
  const notes = POSTS.filter((n) => n.project === p.slug);
  const days = st.first && st.last ? Math.round((new Date(st.last) - new Date(st.first)) / 864e5) + 1 : null;
  const summary = { ...p, github: st.repos[0]?.url };

  const chapters = [
    { id: "overview", label: "Overview" },
    { id: "features", label: "Features" },
    p.architecture && { id: "architecture", label: "Architecture" },
    p.decisions?.length && { id: "decisions", label: "Engineering decisions" },
    { id: "stack", label: "Tech stack" },
    { id: "timeline", label: "Timeline" },
    p.limitations?.length && { id: "scope", label: "Scope and next steps" },
    notes.length && { id: "notes", label: "Related notes" },
  ].filter(Boolean);
  const n = (id) => chapters.findIndex((c) => c.id === id) + 1;

  return (
    <>
      <header className="relative mx-auto max-w-7xl px-5 pb-10 pt-12 sm:px-8 sm:pt-16">
        <span aria-hidden="true" className="display outline-text pointer-events-none absolute right-4 top-0 select-none text-[clamp(7rem,24vw,20rem)] opacity-50 sm:right-8">{String(p.rank).padStart(2, "0")}</span>
        <nav aria-label="Breadcrumb" className="relative mb-6 font-mono text-xs text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="u-link hover:text-fg">Home</Link></li><li aria-hidden="true">/</li>
            <li><Link href="/projects" className="u-link hover:text-fg">Projects</Link></li><li aria-hidden="true">/</li>
            <li aria-current="page" className="text-fg">{p.title}</li>
          </ol>
        </nav>
        <p className="eyebrow relative">{p.category} case study</p>
        <h1 className="display relative mt-4 max-w-5xl text-[clamp(3.2rem,11vw,9rem)] leading-[0.95]">{p.title}</h1>
        <p className="serif-i relative mt-5 max-w-3xl text-3xl leading-snug text-fg/90 sm:text-4xl">{rich(p.tagline)}</p>
        <div className="relative mt-8 flex flex-wrap items-center gap-3">
          <Tag tone="accent">{p.category}</Tag><Tag tone={statusTone(p.status)}>{p.status}</Tag>
          {p.live ? <ButtonLink href={p.live} external><ExternalIcon width={16} height={16} />Live demo</ButtonLink> : null}
          {st.repos.map((r) => <ButtonLink key={r.name} href={r.url} variant="ghost" external><GithubIcon width={16} height={16} />{p.repos.length > 1 ? r.label : "Source code"}</ButtonLink>)}
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 sm:px-8"><ParallaxFrame><Frame p={summary} sizes="(max-width: 1280px) 100vw, 1216px" contain /></ParallaxFrame></div>

      <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-8 px-5 py-16 sm:px-8 lg:grid-cols-4">
        {[["Commits", st.commits, st.repos.length > 1 ? `across ${st.repos.length} repositories` : "in the repository"], ["Build window", days ? `${days} days` : "n/a", st.first ? `${fmtDate(st.first)} to ${fmtDate(st.last)}` : ""], ["Lines of code", st.loc.toLocaleString("en-IN"), "hand-written source"], ["Technologies", p.stack.length, "in the stack"]].map(([k, v, note]) => (
          <Reveal key={k} className="border-l border-line-2 pl-5"><dt className="eyebrow text-muted">{k}</dt><dd className="display gradient-text mt-3 text-[clamp(2.2rem,4.5vw,3.8rem)]">{v}</dd><p className="mt-1 text-sm text-muted">{note}</p></Reveal>
        ))}
      </dl>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-10 sm:px-8 lg:grid-cols-[200px_1fr]">
        <ChapterNav chapters={chapters} />
        <div className="min-w-0 space-y-24">
          <section aria-labelledby="overview" className="scroll-mt-28">
            <H id="overview" n={n("overview")}>Overview</H>
            <div className="grid gap-8 xl:grid-cols-[1.5fr_1fr]">
              <div className="space-y-5 text-lg leading-relaxed text-muted"><p>{p.summary}</p><p><span className="font-semibold text-fg">Goal. </span>{p.problem}</p></div>
              <div className="glass h-fit rounded-3xl p-6"><p className="eyebrow">My role</p><p className="mt-3 text-fg/90">{p.role}</p></div>
            </div>
          </section>

          <section aria-labelledby="features" className="scroll-mt-28">
            <H id="features" n={n("features")}>What it does</H>
            <ul className="border-t border-line">
              {p.features.map((f, i) => (
                <Reveal as="li" key={f} delay={Math.min(i, 5) * 0.04} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-4"><span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span><span className="text-fg/90">{f}</span></Reveal>
              ))}
            </ul>
          </section>

          {p.architecture ? (
            <section aria-labelledby="architecture" className="scroll-mt-28"><H id="architecture" n={n("architecture")}>Architecture</H><Reveal><ArchDiagram arch={p.architecture} title={p.title} /></Reveal></section>
          ) : null}

          {p.decisions?.length ? (
            <section aria-labelledby="decisions" className="scroll-mt-28">
              <H id="decisions" n={n("decisions")}>Engineering decisions</H>
              <div className="grid gap-4 md:grid-cols-2">
                {p.decisions.map(([t, d], i) => (
                  <Reveal key={t} delay={Math.min(i, 5) * 0.05}>
                    <div data-spot className="spot relative h-full overflow-hidden rounded-3xl border border-line bg-surface/70 p-6">
                      <span aria-hidden="true" className="display outline-text absolute -right-2 -top-4 text-8xl opacity-60">{i + 1}</span>
                      <h3 className="display relative text-xl">{t}</h3><p className="relative mt-3 text-sm leading-relaxed text-muted">{d}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          ) : null}

          <section aria-labelledby="stack" className="scroll-mt-28"><H id="stack" n={n("stack")}>Tech stack</H><ul className="flex flex-wrap gap-2.5">{p.stack.map((t) => <li key={t} className="rounded-full border border-line-2 bg-surface/70 px-4 py-2 font-mono text-sm">{t}</li>)}</ul></section>

          <section aria-labelledby="timeline" className="scroll-mt-28"><H id="timeline" n={n("timeline")}>Timeline</H><Timeline items={p.milestones.map((m) => ({ date: m.date, title: m.title, detail: m.detail }))} /></section>

          {p.limitations?.length ? (
            <section aria-labelledby="scope" className="scroll-mt-28">
              <H id="scope" n={n("scope")}>Scope and next steps</H>
              <ul className="space-y-3">{p.limitations.map((l) => <li key={l} className="rounded-2xl border border-amber-400/25 bg-amber-400/[0.04] p-5 text-muted">{l}</li>)}</ul>
            </section>
          ) : null}

          {notes.length ? (
            <section aria-labelledby="notes" className="scroll-mt-28">
              <H id="notes" n={n("notes")}>Related notes</H>
              <div className="grid gap-4 md:grid-cols-2">{notes.map((x) => <Link key={x.slug} href={`/blog/${x.slug}`} className="group rounded-3xl border border-line bg-surface/70 p-6 transition hover:border-accent"><h3 className="display text-xl group-hover:text-accent">{x.title}</h3><p className="mt-2 text-sm text-muted">{x.summary}</p></Link>)}</div>
            </section>
          ) : null}
        </div>
      </div>

      <Link href={`/projects/${next.slug}`} className="group mx-auto mt-20 block max-w-7xl border-t border-line px-5 py-16 sm:px-8">
        <p className="eyebrow text-muted">Next project</p>
        <p className="display mt-3 flex items-center gap-6 text-[clamp(2.6rem,9vw,7.5rem)] transition-colors group-hover:text-accent">{next.title}<ArrowUpRightIcon className="h-[0.6em] w-[0.6em] shrink-0 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" /></p>
      </Link>
    </>
  );
}
