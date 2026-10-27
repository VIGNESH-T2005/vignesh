"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { INDEX, SITE } from "@/data/site";
import CopyEmail from "./CopyEmail";
import { CloseIcon, GithubIcon, LinkedinIcon, CodeIcon, DownloadIcon } from "./Icons";

// Running numbers (01, 02, ...) assigned once, outside render.
let count = 0;
const NUMBERED = INDEX.map((g) => ({ ...g, items: g.items.map((i) => ({ ...i, n: ++count })) }));

const social = [
  { label: "GitHub", href: SITE.socials.github.href, Icon: GithubIcon },
  { label: "LinkedIn", href: SITE.socials.linkedin.href, Icon: LinkedinIcon },
  { label: "LeetCode", href: SITE.socials.leetcode.href, Icon: CodeIcon },
];

// Full-screen typographic index of every page.
export default function IndexMenu({ onClose }) {
  const path = usePathname();
  const ref = useRef(null);
  const firstPath = useRef(path);

  useEffect(() => { if (path !== firstPath.current) onClose(); }, [path, onClose]);

  useEffect(() => {
    document.body.classList.add("no-scroll");
    ref.current?.querySelector("a")?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !ref.current) return;
      const f = ref.current.querySelectorAll("a[href], button:not([disabled])");
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); document.body.classList.remove("no-scroll"); };
  }, [onClose]);

  return (
    <div ref={ref} role="dialog" aria-modal="true" aria-label="Site menu" className="fixed inset-0 z-[65] overflow-y-auto bg-bg/95 backdrop-blur-xl">
      <div className="stage" aria-hidden="true" style={{ zIndex: 0, opacity: 0.9 }} />
      <div className="relative z-10 mx-auto flex min-h-full max-w-7xl flex-col px-5 pb-10 sm:px-8">
        <div className="flex h-[68px] items-center justify-between">
          <p className="eyebrow">Menu</p>
          <button type="button" onClick={onClose} aria-label="Close menu" className="flex h-11 items-center gap-2 rounded-full border border-line-2 px-5 text-sm transition hover:border-accent hover:text-accent">
            Close <CloseIcon width={16} height={16} />
          </button>
        </div>

        <div className="mt-6 grid flex-1 gap-12 lg:grid-cols-[1.7fr_1fr]">
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {NUMBERED.map((g) => (
              <div key={g.group}>
                <p className="eyebrow mb-3 text-muted">{g.group}</p>
                <ul>
                  {g.items.map((i) => {
                    const current = i.href === "/" ? path === "/" : path === i.href || path.startsWith(i.href + "/");
                    return (
                      <li key={i.href} className="rise" style={{ "--d": `${i.n * 35}ms` }}>
                        <Link href={i.href} onClick={onClose} aria-current={current ? "page" : undefined} className="group flex items-baseline gap-3 border-b border-line py-3 transition-all hover:pl-3">
                          <span className="font-mono text-[11px] text-muted">{String(i.n).padStart(2, "0")}</span>
                          <span className={`display text-[clamp(1.6rem,3.4vw,2.6rem)] transition-colors group-hover:text-accent ${current ? "text-accent" : ""}`}>{i.label}</span>
                          <span className="ml-auto hidden text-xs text-muted sm:block">{i.desc}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <aside className="flex flex-col gap-6 lg:border-l lg:border-line lg:pl-10">
            <div>
              <p className="eyebrow">Let&apos;s talk</p>
              <p className="serif-i mt-3 text-4xl leading-tight">Have a role or a project in mind?</p>
            </div>
            <CopyEmail />
            <a href={SITE.resume} download="Vignesh-T-Resume.pdf" className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition hover:bg-white">
              <DownloadIcon width={16} height={16} /> Download résumé
            </a>
            <ul className="flex gap-3">
              {social.map(({ label, href, Icon }) => (
                <li key={label}><a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`} className="grid h-11 w-11 place-items-center rounded-full border border-line-2 text-muted transition hover:border-accent hover:text-accent"><Icon /></a></li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}
