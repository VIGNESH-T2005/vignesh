"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { GithubIcon, ExternalIcon, CloseIcon, CheckIcon } from "./Icons";

export default function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    document.body.classList.add("no-scroll");
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !dialogRef.current) return;
      // Keep keyboard focus inside the dialog.
      const f = dialogRef.current.querySelectorAll("a[href], button:not([disabled])");
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("no-scroll");
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="project-modal-title" className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-line bg-surface sm:rounded-3xl">
        <div className="flex items-start justify-between gap-4 border-b border-line p-5">
          <div>
            <p className="font-mono text-xs text-accent">{project.category}</p>
            <h3 id="project-modal-title" className="text-2xl font-bold">{project.title}</h3>
            <p className="text-sm text-muted">{project.tagline}</p>
          </div>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close project details" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line hover:border-accent">
            <CloseIcon />
          </button>
        </div>

        <div className="space-y-6 overflow-y-auto p-5 sm:p-6">
          {project.image ? (
            <div className="relative aspect-[2.1/1] overflow-hidden rounded-xl border border-line bg-black">
              <Image src={project.image} alt={project.imageAlt ?? ""} fill sizes="(max-width: 768px) 100vw, 720px" className="object-contain" />
            </div>
          ) : null}

          <p className="leading-relaxed text-muted">{project.summary}</p>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">Key features</h4>
            <ul className="space-y-2">
              {project.features.map((f) => (
                <li key={f} className="flex gap-3 text-sm text-muted">
                  <CheckIcon width={18} height={18} className="mt-0.5 shrink-0 text-accent" /> {f}
                </li>
              ))}
            </ul>
          </div>

          {project.highlights?.length ? (
            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">Engineering notes</h4>
              <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted">
                {project.highlights.map((h) => <li key={h}>{h}</li>)}
              </ul>
            </div>
          ) : null}

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">Tech stack</h4>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((t) => <li key={t} className="rounded-md border border-line bg-surface-2 px-2.5 py-1 font-mono text-xs">{t}</li>)}
            </ul>
          </div>

          {project.note ? <p className="rounded-lg border border-line bg-surface-2 p-3 text-sm text-muted">{project.note}</p> : null}
        </div>

        <div className="flex flex-wrap gap-3 border-t border-line p-5">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold hover:border-accent">
            <GithubIcon width={16} height={16} /> View code<span className="sr-only"> (opens in a new tab)</span>
          </a>
          {project.live ? (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-5 py-2.5 text-sm font-semibold text-accent-ink hover:brightness-110">
              <ExternalIcon width={16} height={16} /> Open live demo<span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
