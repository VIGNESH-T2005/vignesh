"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SITE } from "@/data/site";
import IndexMenu from "./IndexMenu";
import { SearchIcon } from "./Icons";
import Magnetic from "./Magnetic";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const barRef = useRef(null);
  const triggerRef = useRef(null);

  // Frosted background appears once the page scrolls (class toggled directly, no re-render).
  useEffect(() => {
    const el = barRef.current;
    const onScroll = () => el?.classList.toggle("header-solid", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header ref={barRef} className="sticky top-0 z-40 border-b border-transparent transition-colors">
        <nav aria-label="Primary" className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-3 px-5 sm:px-8">
          <Link href="/" className="group flex items-center gap-3" aria-label={`${SITE.name}, home`}>
            <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-accent font-display text-base font-extrabold text-accent-ink transition-transform duration-300 group-hover:-rotate-6">VT</span>
            <span className="hidden font-display text-lg font-bold tracking-tight sm:block">Vignesh T<span className="text-accent">.</span></span>
          </Link>

          <Link href="/contact" className="glass hidden items-center gap-2 rounded-full px-4 py-2 text-xs text-muted transition hover:text-fg md:flex">
            <span className="live-dot h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            Available for full-stack roles
          </Link>

          <div className="flex items-center gap-2">
            <button type="button" onClick={() => window.dispatchEvent(new Event("open-palette"))} aria-label="Search (Ctrl or Command + K)"
              className="glass flex h-11 items-center gap-2 rounded-full px-4 text-sm text-muted transition hover:border-accent hover:text-fg">
              <SearchIcon width={16} height={16} />
              <kbd className="hidden font-mono text-[10px] sm:inline">Ctrl K</kbd>
            </button>
            <Magnetic>
              <button ref={triggerRef} type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open}
                className="flex h-11 items-center gap-3 rounded-full bg-fg px-5 text-sm font-semibold text-bg transition hover:bg-accent">
                Index
                <span aria-hidden="true" className="flex flex-col gap-[5px]"><span className="block h-[2px] w-5 bg-current" /><span className="block h-[2px] w-3 bg-current" /></span>
              </button>
            </Magnetic>
          </div>
        </nav>
      </header>
      {open ? <IndexMenu onClose={() => { setOpen(false); triggerRef.current?.focus(); }} /> : null}
    </>
  );
}
