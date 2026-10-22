import Link from "next/link";
import Reveal, { Rule } from "./Reveal";
import { ArrowRightIcon } from "./Icons";

// Renders "plain text *serif italic words* plain" with the starred part in the editorial italic.
export function rich(text) {
  if (typeof text !== "string") return text;
  return text.split("*").map((part, i) => (i % 2 ? <em key={i} className="serif-i gradient-text pr-1 font-normal">{part}</em> : <span key={i}>{part}</span>));
}

export function Container({ children, className = "" }) {
  return <div className={`mx-auto max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function PageHeader({ eyebrow, title, children, crumbs, index }) {
  return (
    <header className="relative mx-auto max-w-7xl px-5 pb-12 pt-14 sm:px-8 sm:pt-20">
      {index ? <span aria-hidden="true" className="display outline-text pointer-events-none absolute -top-2 right-4 select-none text-[clamp(6rem,22vw,18rem)] opacity-60 sm:right-8">{index}</span> : null}
      {crumbs ? (
        <nav aria-label="Breadcrumb" className="relative mb-6 font-mono text-xs text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            {crumbs.map(([href, label], i) => (
              <li key={label} className="flex items-center gap-2">
                {i > 0 ? <span aria-hidden="true">/</span> : null}
                {href ? <Link href={href} className="u-link hover:text-fg">{label}</Link> : <span aria-current="page" className="text-fg">{label}</span>}
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
      <p className="eyebrow relative">{eyebrow}</p>
      <h1 className="display relative mt-4 max-w-5xl text-[clamp(2.6rem,7.5vw,6.5rem)] leading-[0.95]">{rich(title)}</h1>
      {children ? <p className="relative mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{children}</p> : null}
    </header>
  );
}

export function Section({ title, eyebrow, intro, children, id, className = "", num }) {
  return (
    <section id={id} aria-labelledby={id && title ? `${id}-h` : undefined} className={`mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 ${className}`}>
      {title ? (
        <div className="mb-10">
          <Reveal className="flex items-center gap-4">
            {num ? <span className="font-mono text-xs text-muted">{num}</span> : null}
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            <Rule className="flex-1" />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id={id ? `${id}-h` : undefined} className="display mt-5 max-w-4xl text-[clamp(2rem,5vw,4rem)]">{rich(title)}</h2>
            {intro ? <p className="mt-4 max-w-2xl text-lg text-muted">{intro}</p> : null}
          </Reveal>
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function Tag({ children, tone = "default" }) {
  const tones = {
    default: "border-line-2 bg-surface-2/60 text-muted",
    accent: "border-accent/40 bg-accent/10 text-accent",
    good: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    warn: "border-amber-400/30 bg-amber-400/10 text-amber-300",
    violet: "border-violet/40 bg-violet/10 text-violet",
  };
  return <span className={`inline-block rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${tones[tone]}`}>{children}</span>;
}

export const statusTone = (s) => (/deployed|complete|maintained/i.test(s) ? "good" : /prototype|early|scaffold|empty|ongoing|practice/i.test(s) ? "warn" : "default");

// Oversized numeral with label.
export function StatTile({ label, value, note }) {
  return (
    <div className="spot group relative overflow-hidden rounded-3xl border border-line bg-surface/70 p-6 transition-colors hover:border-line-2" data-spot>
      <p className="display gradient-text text-[clamp(2.4rem,5vw,4rem)]">{value}</p>
      <p className="mt-3 text-sm font-medium">{label}</p>
      {note ? <p className="mt-1 text-xs text-muted">{note}</p> : null}
    </div>
  );
}

export function ButtonLink({ href, children, variant = "primary", external, download, className = "" }) {
  const styles = {
    primary: "bg-accent text-accent-ink hover:bg-white hover:shadow-[0_0_40px_var(--glow)]",
    ghost: "glass text-fg hover:border-accent hover:text-accent",
  };
  const cls = `group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${styles[variant]} ${className}`;
  const arrow = variant === "primary" ? <ArrowRightIcon width={16} height={16} className="transition-transform duration-300 group-hover:translate-x-1" /> : null;
  if (external || download || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} {...(download ? { download: "Vignesh-T-Resume.pdf" } : {})} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}{arrow}{external ? <span className="sr-only"> (opens in a new tab)</span> : null}
      </a>
    );
  }
  return <Link href={href} className={cls}>{children}{arrow}</Link>;
}

// Infinite horizontal ticker (decorative).
export function Marquee({ items }) {
  const row = [...items, ...items];
  return (
    <div aria-hidden="true" className="marquee relative overflow-hidden border-y border-line bg-surface/40 py-5 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="display flex items-center gap-10 text-3xl text-muted/70 sm:text-4xl">{t}<span className="text-accent">✦</span></span>
        ))}
      </div>
    </div>
  );
}
