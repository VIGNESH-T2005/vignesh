"use client";
import { useEffect, useState } from "react";

// Sticky chapter list that follows the reader through a case study.
export default function ChapterNav({ chapters }) {
  const [active, setActive] = useState(chapters[0]?.id);
  useEffect(() => {
    const els = chapters.map((c) => document.getElementById(c.id)).filter(Boolean);
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-30% 0px -60% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [chapters]);
  return (
    <nav aria-label="Case study chapters" className="sticky top-28 hidden lg:block">
      <p className="eyebrow mb-4 text-muted">Chapters</p>
      <ol className="space-y-1 border-l border-line">
        {chapters.map((c, i) => (
          <li key={c.id}>
            <a href={`#${c.id}`} aria-current={active === c.id ? "true" : undefined}
              className={`-ml-px flex items-baseline gap-3 border-l py-2 pl-4 text-sm transition ${active === c.id ? "border-accent text-accent" : "border-transparent text-muted hover:text-fg"}`}>
              <span className="font-mono text-[10px]">{String(i + 1).padStart(2, "0")}</span>{c.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
