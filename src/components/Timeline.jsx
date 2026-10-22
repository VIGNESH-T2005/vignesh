import { fmtDate } from "@/lib/cache";
import Reveal from "./Reveal";

// items: [{ label | date, title, subtitle?, detail?, tag?, children? }]
export default function Timeline({ items }) {
  return (
    <ol className="relative ml-2 space-y-9 border-l border-line-2 pl-7 sm:pl-10">
      <span aria-hidden="true" className="absolute -left-px top-0 h-24 w-px bg-gradient-to-b from-accent to-transparent" />
      {items.map((it, i) => (
        <Reveal as="li" key={`${it.title}-${i}`} from="left" className="relative">
          <span className="absolute -left-[2.2rem] top-1.5 grid h-3.5 w-3.5 place-items-center rounded-full border border-accent bg-bg sm:-left-[2.85rem]" aria-hidden="true"><span className="h-1.5 w-1.5 rounded-full bg-accent" /></span>
          <p className="font-mono text-xs text-accent">{it.label ?? fmtDate(it.date)}{it.tag ? <span className="text-muted"> · {it.tag}</span> : null}</p>
          <p className="display mt-1.5 text-2xl">{it.title}</p>
          {it.subtitle ? <p className="serif-i text-xl text-muted">{it.subtitle}</p> : null}
          {it.detail ? <p className="mt-2 max-w-2xl leading-relaxed text-muted">{it.detail}</p> : null}
          {it.children}
        </Reveal>
      ))}
    </ol>
  );
}
