"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SITE } from "@/data/site";
import IndexMenu from "./IndexMenu";
import { SearchIcon } from "./Icons";
import Magnetic from "./Magnetic";

const openPalette = () => window.dispatchEvent(new Event("open-palette"));

// Desktop: a slim vertical rail pinned to the left edge. Mobile/tablet: a compact top bar.
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const barRef = useRef(null);
  const lastTrigger = useRef(null);

  // Frosted background on the mobile top bar appears once the page scrolls.
  useEffect(() => {
    const el = barRef.current;
    const onScroll = () => el?.classList.toggle("header-solid", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openIndex = (e) => { lastTrigger.current = e.currentTarget; setOpen(true); };
  const closeIndex = () => { setOpen(false); lastTrigger.current?.focus(); };

  return (
    <>
      {/* Mobile / tablet top bar */}
      <header ref={barRef} className="sticky top-0 z-40 border-b border-transparent transition-colors lg:hidden">
        <nav aria-label="Primary" className="mx-auto flex h-[64px] max-w-7xl items-center justify-between gap-3 px-5 sm:px-8">
          <Link href="/" className="group flex items-center gap-3" aria-label={`${SITE.name}, home`}>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent font-display text-base font-extrabold text-accent-ink transition-transform duration-300 group-hover:-rotate-6">VT</span>
            <span className="hidden font-display text-lg font-bold tracking-tight sm:block">Vignesh T<span className="text-accent">.</span></span>
          </Link>

          <Link href="/contact" className="glass hidden items-center gap-2 rounded-full px-4 py-2 text-xs text-muted transition hover:text-fg md:flex">
            <span className="live-dot h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            Available for full-stack roles
          </Link>

          <div className="flex items-center gap-2">
            <button type="button" onClick={openPalette} aria-label="Search"
              className="glass grid h-11 w-11 place-items-center rounded-full text-muted transition hover:border-accent hover:text-fg">
              <SearchIcon width={16} height={16} />
            </button>
            <button type="button" onClick={openIndex} aria-haspopup="dialog" aria-expanded={open}
              className="flex h-11 items-center gap-3 rounded-full bg-fg px-5 text-sm font-semibold text-bg transition hover:bg-accent hover:text-accent-ink">
              Index
              <span aria-hidden="true" className="flex flex-col gap-[5px]"><span className="block h-[2px] w-5 bg-current" /><span className="block h-[2px] w-3 bg-current" /></span>
            </button>
          </div>
        </nav>
      </header>

      {/* Desktop left rail */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-24 flex-col items-center justify-between border-r border-line bg-bg/60 py-7 backdrop-blur-xl lg:flex">
        <Link href="/" aria-label={`${SITE.name}, home`}
          className="group grid h-12 w-12 place-items-center rounded-2xl bg-accent font-display text-lg font-extrabold text-accent-ink transition-transform duration-300 hover:-rotate-6">
          VT
        </Link>

        <nav aria-label="Primary" className="flex flex-col items-center gap-3">
          <button type="button" onClick={openPalette} aria-label="Search (Ctrl or Command + K)"
            className="glass grid h-12 w-12 place-items-center rounded-full text-muted transition hover:border-accent hover:text-fg">
            <SearchIcon width={18} height={18} />
          </button>
          <span aria-hidden="true" className="font-mono text-[9px] uppercase tracking-widest text-muted">Ctrl K</span>
          <div className="mt-4">
            <Magnetic>
              <button type="button" onClick={openIndex} aria-haspopup="dialog" aria-expanded={open} aria-label="Open index menu"
                className="flex h-14 w-14 flex-col items-center justify-center gap-[5px] rounded-full bg-fg text-bg transition hover:bg-accent hover:text-accent-ink">
                <span aria-hidden="true" className="block h-[2px] w-5 bg-current" /><span aria-hidden="true" className="block h-[2px] w-3 bg-current" />
              </button>
            </Magnetic>
          </div>
          <span aria-hidden="true" className="font-mono text-[9px] uppercase tracking-widest text-muted">Index</span>
        </nav>

        <Link href="/contact" aria-label="Available for full-stack roles. Contact me" className="group flex flex-col items-center gap-3">
          <span className="live-dot h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />
          <span aria-hidden="true" className="rotate-180 font-mono text-[10px] uppercase tracking-[0.22em] text-muted transition group-hover:text-fg [writing-mode:vertical-rl]">Open to roles</span>
        </Link>
      </aside>

      {open ? <IndexMenu onClose={closeIndex} /> : null}
    </>
  );
}
