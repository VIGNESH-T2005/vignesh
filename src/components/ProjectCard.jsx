import Image from "next/image";
import Link from "next/link";
import { Tag, statusTone } from "./ui";
import { GithubIcon, ExternalIcon, ArrowUpRightIcon } from "./Icons";
import { fmtMonth } from "@/lib/cache";

const host = (u) => { try { return new URL(u).host; } catch { return "github.com"; } };

// Browser-window frame around a screenshot (or a typographic placeholder).
export function Frame({ p, sizes, contain = false }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line-2 bg-[#080a10] shadow-[0_30px_70px_-25px_rgba(0,0,0,.9)]">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-coral/80" /><span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" /><span className="h-2.5 w-2.5 rounded-full bg-accent/80" />
        <span className="ml-3 min-w-0 flex-1 truncate rounded-md bg-surface-2 px-3 py-1 font-mono text-[10px] text-muted">{p.live ? host(p.live) : p.github ? "github.com/VIGNESH-T2005" : "project"}</span>
      </div>
      <div className="relative aspect-[2.1/1] bg-black">
        {p.image ? (
          <Image src={p.image} alt={p.imageAlt ?? ""} fill sizes={sizes} className={`${contain ? "object-contain" : "object-cover object-top"} transition duration-700 group-hover:scale-[1.04]`} />
        ) : (
          <div className="absolute inset-0 grid place-items-center overflow-hidden bg-gradient-to-br from-violet/25 via-bg to-accent/15" aria-hidden="true">
            <div className="grid-lines absolute inset-0 opacity-60" />
            <span className="display outline-text relative px-4 text-center text-[clamp(1.8rem,5vw,3.4rem)]" style={{ WebkitTextStroke: "1px rgba(198,255,61,.45)" }}>{p.title}</span>
          </div>
        )}
      </div>
    </div>
  );
}

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
      <div className="lg:col-span-7 lg:col-start-1 lg:row-start-1 [perspective:1600px]">
        <div className="transition-transform duration-700 ease-out lg:[transform:rotateY(7deg)_rotateX(2deg)] lg:group-hover:[transform:rotateY(1deg)_rotateX(0deg)_scale(1.015)]">
          <Frame p={p} sizes="(max-width: 1024px) 100vw, 720px" contain />
        </div>
      </div>
      <div className="relative lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:-ml-14">
        <div className="rounded-3xl border border-line-2 bg-bg/92 p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,.9)] backdrop-blur-xl sm:p-8">
          <div className="flex flex-wrap items-center gap-2"><Tag tone="accent">Flagship</Tag><Tag tone={statusTone(p.status)}>{p.status}</Tag><Tag>{p.category}</Tag></div>
          <h3 className="display mt-5 text-[clamp(2.6rem,5vw,4.5rem)]"><Link href={`/projects/${p.slug}`} className="after:absolute after:inset-0 after:z-0 after:rounded-[36px] after:content-['']">{p.title}</Link></h3>
          <p className="serif-i mt-2 text-2xl text-fg/90">{p.tagline}</p>
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
