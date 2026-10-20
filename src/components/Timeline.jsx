import { fmtDate } from "@/lib/cache";
import Reveal from "./Reveal";

// items: [{ label | date, title, subtitle?, detail?, tag?, href? }]
export default function Timeline({ items }) {
  return (
    <ol className="relative space-y-7 border-l border-line pl-6 sm:pl-8">
      {items.map((it, i) => (
        <Reveal as="li" key={`${it.title}-${i}`} className="relative">
          <span className="absolute -left-[1.85rem] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-bg sm:-left-[2.35rem]" aria-hidden="true" />
          <p className="font-mono text-xs text-accent">
            {it.label ?? fmtDate(it.date)}
            {it.tag ? <span className="text-muted"> · {it.tag}</span> : null}
          </p>
          <p className="mt-1 font-semibold">{it.title}</p>
          {it.subtitle ? <p className="text-sm text-muted">{it.subtitle}</p> : null}
          {it.detail ? <p className="mt-1 text-sm leading-relaxed text-muted">{it.detail}</p> : null}
          {it.children}
        </Reveal>
      ))}
    </ol>
  );
}
