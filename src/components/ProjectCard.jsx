import Image from "next/image";
import Link from "next/link";
import { Tag, statusTone } from "./ui";
import { GithubIcon, ExternalIcon } from "./Icons";
import { fmtMonth } from "@/lib/cache";

// `p` is a light, serialisable project summary (see lib/projectSummaries).
export default function ProjectCard({ p, featured = false }) {
  return (
    <article className={`group relative flex overflow-hidden rounded-2xl border border-line bg-surface transition hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_10px_40px_var(--glow)] ${featured ? "flex-col md:flex-row" : "flex-col"}`}>
      <div className={`relative aspect-[2.1/1] overflow-hidden border-b border-line bg-black ${featured ? "md:aspect-auto md:min-h-[300px] md:w-1/2 md:border-b-0 md:border-r" : ""}`}>
        {p.image ? (
          <Image src={p.image} alt={p.imageAlt ?? ""} fill sizes={featured ? "(max-width: 768px) 100vw, 560px" : "(max-width: 768px) 100vw, 420px"} className={featured ? "object-contain" : "object-cover object-top"} />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-accent/20 to-accent-2/20 p-4 text-center" aria-hidden="true">
            <span className="font-display text-2xl font-bold gradient-text">{p.title}</span>
          </div>
        )}
        {p.rank === 1 ? <span className="absolute left-3 top-3 rounded-full bg-bg/85 px-3 py-1 font-mono text-xs backdrop-blur">Flagship</span> : null}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2"><Tag tone="accent">{p.category}</Tag><Tag tone={statusTone(p.status)}>{p.status}</Tag></div>
        <h3 className="mt-3 text-xl font-bold">
          <Link href={`/projects/${p.slug}`} className="after:absolute after:inset-0 after:content-['']">{p.title}</Link>
        </h3>
        <p className="mt-1 text-sm font-medium">{p.tagline}</p>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{p.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
          {p.stack.slice(0, featured ? 9 : 5).map((t) => <li key={t}><Tag>{t}</Tag></li>)}
        </ul>
        <div className="relative z-10 mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5 text-sm">
          <span className="text-xs text-muted">{p.commits} commits{p.last ? ` · updated ${fmtMonth(p.last)}` : ""}</span>
          <span className="ml-auto flex gap-3">
            {p.github ? <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-fg"><GithubIcon width={16} height={16} />Code<span className="sr-only"> (opens in a new tab)</span></a> : null}
            {p.live ? <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-fg"><ExternalIcon width={16} height={16} />Live<span className="sr-only"> (opens in a new tab)</span></a> : null}
          </span>
        </div>
      </div>
    </article>
  );
}
