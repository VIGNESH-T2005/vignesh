"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SITE } from "@/data/site";
import IndexMenu from "./IndexMenu";
import { SearchIcon } from "./Icons";

// Compact top bar for screens without the profile rail.
export default function MobileBar() {
  const [open, setOpen] = useState(false);
  const barRef = useRef(null);
  const triggerRef = useRef(null);
  useEffect(() => {
    const el = barRef.current;
    const onScroll = () => el?.classList.toggle("header-solid", window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <header ref={barRef} className="sticky top-0 z-40 border-b border-transparent transition-colors xl:hidden">
        <nav aria-label="Primary" className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label={`${SITE.name}, overview`}>
            <span className="relative block h-10 w-10 overflow-hidden rounded-full border border-line-2"><Image src="/dp.png" alt="" fill sizes="40px" className="object-cover object-top" /></span>
            <span className="leading-tight"><span className="display block text-base">{SITE.name}</span><span className="block text-[11px] text-muted">{SITE.role}</span></span>
          </Link>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => window.dispatchEvent(new Event("open-palette"))} aria-label="Search" className="frost grid h-11 w-11 place-items-center rounded-full text-muted transition hover:text-fg"><SearchIcon width={18} height={18} /></button>
            <button ref={triggerRef} type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open}
              className="flex h-11 items-center gap-3 rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink transition hover:bg-white">
              Menu
              <span aria-hidden="true" className="flex flex-col gap-[5px]"><span className="block h-[2px] w-5 bg-current" /><span className="block h-[2px] w-3 bg-current" /></span>
            </button>
          </div>
        </nav>
      </header>
      {open ? <IndexMenu onClose={() => { setOpen(false); triggerRef.current?.focus(); }} /> : null}
    </>
  );
}
