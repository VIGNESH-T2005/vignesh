import Image from "next/image";

const host = (u) => { try { return new URL(u).host; } catch { return "github.com"; } };

// Browser-window frame around a screenshot (or a typographic placeholder).
export default function Frame({ p, sizes, contain = false }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line-2 bg-[#071013] shadow-[0_30px_70px_-25px_rgba(0,0,0,.9)]">
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
            <span className="display outline-text relative px-4 text-center text-[clamp(1.8rem,5vw,3.4rem)]" style={{ WebkitTextStroke: "1px rgba(255,122,61,.45)" }}>{p.title}</span>
          </div>
        )}
      </div>
    </div>
  );
}

