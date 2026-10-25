import Link from "next/link";
import { Tag, statusTone } from "./ui";
import { GithubIcon, ExternalIcon, ArrowUpRightIcon } from "./Icons";
import { fmtMonth } from "@/lib/cache";
import ProjectHolo from "./ProjectHolo";
import Frame from "./Frame";

function Links({ p }) {
  return (
    <span className="relative z-10 flex gap-4 text-sm">
      {p.github ? <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted transition hover:text-accent"><GithubIcon width={16} height={16} />Code<span className="sr-only"> (opens in a new tab)</span></a> : null}
      {p.live ? <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted transition hover:text-accent"><ExternalIcon width={16} height={16} />Live<span className="sr-only"> (opens in a new tab)</span></a> : null}
    </span>
  );
}

// Standard card for grids.
export default function ProjectCard({ p, index }) {
  return (
    <article data-spot className="spot group relative flex h-full flex-col rounded-[28px] border border-line bg-surface/70 p-3 transition-all duration-300 hover:-translate-y-1.5 hover:border-line-2">
      <Frame p={p} sizes="(max-width: 768px) 100vw, 480px" />
      <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2"><Tag tone="accent">{p.category}</Tag><Tag tone={statusTone(p.status)}>{p.status}</Tag></div>
          {index ? <span className="font-mono text-xs text-muted">{String(index).padStart(2, "0")}</span> : null}
        </div>
        <h3 className="display mt-4 text-3xl">
          <Link href={`/projects/${p.slug}`} className="after:absolute after:inset-0 after:z-0 after:rounded-[28px] after:content-['']">{p.title}</Link>
        </h3>
        <p className="mt-2 text-sm font-medium text-fg/90">{p.tagline}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">{p.stack.slice(0, 5).map((t) => <li key={t}><Tag>{t}</Tag></li>)}</ul>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="font-mono text-[11px] text-muted">{p.commits} commits{p.last ? ` · ${fmtMonth(p.last)}` : ""}</span>
          <Links p={p} />
        </div>
      </div>
    </article>
  );
}

// Large immersive layout for the flagship project.
export function ProjectShowcase({ p }) {
  return (
    <article data-spot className="spot group relative grid items-center gap-8 rounded-[36px] border border-line bg-surface/50 p-4 sm:p-8 lg:grid-cols-12 lg:gap-0">
      <div className="lg:col-span-7 lg:col-start-1 lg:row-start-1">
        <ProjectHolo p={p} href={`/projects/${p.slug}`} sizes="(max-width: 1024px) 100vw, 720px" contain />
      </div>
      <div className="relative z-20 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:-ml-14">
        <div className="rounded-3xl border border-line-2 bg-bg/92 p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,.9)] backdrop-blur-xl sm:p-8">
          <div className="flex flex-wrap items-center gap-2"><Tag tone="accent">Flagship</Tag><Tag tone={statusTone(p.status)}>{p.status}</Tag><Tag>{p.category}</Tag></div>
          <h3 className="display mt-5 text-4xl"><Link href={`/projects/${p.slug}`} className="after:absolute after:inset-0 after:z-0 after:rounded-[36px] after:content-['']">{p.title}</Link></h3>
          <p className="mt-2 text-lg font-medium text-fg/90">{p.tagline}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">{p.summary}</p>
          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">{p.stack.slice(0, 8).map((t) => <li key={t}><Tag>{t}</Tag></li>)}</ul>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent">Read the case study <ArrowUpRightIcon width={16} height={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></span>
            <Links p={p} />
          </div>
        </div>
      </div>
    </article>
  );
}
