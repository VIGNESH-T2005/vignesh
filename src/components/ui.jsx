import Link from "next/link";
import Reveal from "./Reveal";

export function Container({ children, className = "" }) {
  return <div className={`mx-auto max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function PageHeader({ eyebrow, title, children, crumbs }) {
  return (
    <header className="mx-auto max-w-6xl px-4 pb-10 pt-12 sm:px-6 sm:pt-16">
      {crumbs ? (
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            {crumbs.map(([href, label], i) => (
              <li key={label} className="flex items-center gap-2">
                {i > 0 ? <span aria-hidden="true">/</span> : null}
                {href ? <Link href={href} className="hover:text-fg">{label}</Link> : <span aria-current="page" className="text-fg">{label}</span>}
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h1 className="mt-2 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">{title}</h1>
      {children ? <p className="mt-4 max-w-2xl text-lg text-muted">{children}</p> : null}
    </header>
  );
}

export function Section({ title, eyebrow, intro, children, id, className = "" }) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-h` : undefined} className={`mx-auto max-w-6xl px-4 py-10 sm:px-6 ${className}`}>
      {title ? (
        <Reveal className="mb-8 max-w-2xl">
          {eyebrow ? <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p> : null}
          <h2 id={id ? `${id}-h` : undefined} className="mt-1 text-2xl font-bold sm:text-3xl">{title}</h2>
          {intro ? <p className="mt-2 text-muted">{intro}</p> : null}
        </Reveal>
      ) : null}
      {children}
    </section>
  );
}

export function Tag({ children, tone = "default" }) {
  const tones = { default: "border-line bg-surface-2 text-muted", accent: "border-accent/40 bg-accent/10 text-accent", good: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300", warn: "border-amber-400/30 bg-amber-400/10 text-amber-300" };
  return <span className={`inline-block rounded-md border px-2 py-0.5 font-mono text-xs ${tones[tone]}`}>{children}</span>;
}

export const statusTone = (s) => (/deployed|complete|maintained/i.test(s) ? "good" : /prototype|early|scaffold|empty|ongoing|practice/i.test(s) ? "warn" : "default");

export function StatTile({ label, value, note }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <p className="font-display text-3xl font-bold gradient-text">{value}</p>
      <p className="mt-1 text-sm font-medium">{label}</p>
      {note ? <p className="mt-1 text-xs text-muted">{note}</p> : null}
    </div>
  );
}

export function ButtonLink({ href, children, variant = "primary", external, download, className = "" }) {
  const styles = {
    primary: "bg-gradient-to-r from-accent to-accent-2 text-accent-ink hover:brightness-110",
    ghost: "border border-line bg-surface hover:border-accent",
  };
  const cls = `inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${styles[variant]} ${className}`;
  if (external || download || href.startsWith("mailto:")) {
    return <a href={href} className={cls} {...(download ? { download: "Vignesh-T-Resume.pdf" } : {})} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}{external ? <span className="sr-only"> (opens in a new tab)</span> : null}</a>;
  }
  return <Link href={href} className={cls}>{children}</Link>;
}
