import Image from "next/image";
import { GithubIcon, ExternalIcon, ArrowRightIcon } from "./Icons";

export default function ProjectCard({ project, onOpen, featured = false }) {
  return (
    <article className={`group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_10px_40px_var(--glow)] ${featured ? "md:col-span-2 md:flex-row" : ""}`}>
      <div className={`relative aspect-[2.1/1] overflow-hidden border-b border-line bg-black ${featured ? "md:aspect-auto md:min-h-[300px] md:w-1/2 md:border-b-0 md:border-r" : ""}`}>
        {project.image ? (
          <Image src={project.image} alt={project.imageAlt ?? ""} fill sizes={featured ? "(max-width: 768px) 100vw, 560px" : "(max-width: 768px) 100vw, 420px"} className={`transition duration-500 group-hover:scale-[1.02] ${featured ? "object-contain" : "object-cover object-top"}`} />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-accent/20 to-accent-2/20" aria-hidden="true">
            <span className="font-display text-3xl font-bold gradient-text">{project.title}</span>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-bg/80 px-3 py-1 font-mono text-xs backdrop-blur">{project.badge}</span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-mono text-xs text-accent">{project.category}</p>
        <h3 className="mt-1 text-xl font-bold sm:text-2xl">{project.title}</h3>
        <p className="mt-1 text-sm font-medium">{project.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{project.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${project.title} tech stack`}>
          {project.stack.slice(0, featured ? 9 : 6).map((t) => (
            <li key={t} className="rounded-md border border-line bg-surface-2 px-2 py-0.5 font-mono text-xs text-muted">{t}</li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          <button type="button" onClick={() => onOpen(project)} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-4 py-2 text-sm font-semibold text-accent-ink transition hover:brightness-110">
            View details <ArrowRightIcon width={16} height={16} />
          </button>
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition hover:border-accent">
            <GithubIcon width={16} height={16} /> Code<span className="sr-only"> (opens in a new tab)</span>
          </a>
          {project.live ? (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition hover:border-accent">
              <ExternalIcon width={16} height={16} /> Live demo<span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
