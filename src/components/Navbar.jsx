"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV, SITE } from "@/data/site";
import { MenuIcon, CloseIcon, SearchIcon, ChevronDownIcon } from "./Icons";

const isActive = (path, href) => (href === "/" ? path === "/" : path === href || path.startsWith(href + "/"));

function Dropdown({ group, path }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const active = group.items.some((i) => isActive(path, i.href));

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button type="button" aria-expanded={open} aria-haspopup="true" onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition ${active ? "bg-surface-2 text-fg" : "text-muted hover:text-fg"}`}>
        {group.label} <ChevronDownIcon width={14} height={14} />
      </button>
      {open ? (
        <ul className="absolute left-0 top-full z-50 mt-2 w-64 rounded-xl border border-line bg-surface p-2 shadow-2xl">
          {group.items.map((i) => (
            <li key={i.href}>
              <Link href={i.href} onClick={() => setOpen(false)} aria-current={isActive(path, i.href) ? "page" : undefined}
                className={`block rounded-lg px-3 py-2 transition hover:bg-surface-2 ${isActive(path, i.href) ? "bg-surface-2" : ""}`}>
                <span className="block text-sm font-medium">{i.label}</span>
                <span className="block text-xs text-muted">{i.desc}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default function Navbar() {
  const path = usePathname();
  const [mobile, setMobile] = useState(false);
  const [lastPath, setLastPath] = useState(path);
  if (lastPath !== path) { setLastPath(path); setMobile(false); }

  useEffect(() => {
    if (!mobile) return;
    document.body.classList.add("no-scroll");
    const onKey = (e) => e.key === "Escape" && setMobile(false);
    window.addEventListener("keydown", onKey);
    return () => { document.body.classList.remove("no-scroll"); window.removeEventListener("keydown", onKey); };
  }, [mobile]);

  const link = (l) => (
    <Link key={l.href} href={l.href} aria-current={isActive(path, l.href) ? "page" : undefined}
      className={`rounded-full px-3 py-1.5 text-sm transition ${isActive(path, l.href) ? "bg-surface-2 text-fg" : "text-muted hover:text-fg"}`}>
      {l.label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-lg">
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-display font-bold" aria-label={`${SITE.name}, home`}>
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-sm text-accent-ink">VT</span>
          <span className="hidden sm:inline">{SITE.name}</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV.main.map(link)}
          {NAV.groups.map((g) => <Dropdown key={g.label} group={g} path={path} />)}
          {NAV.tail.map(link)}
        </div>

        <div className="flex items-center gap-2">
          <button type="button" onClick={() => window.dispatchEvent(new Event("open-palette"))} aria-label="Open command palette (Ctrl or Command + K)"
            className="flex h-10 items-center gap-2 rounded-full border border-line bg-surface px-3 text-sm text-muted transition hover:border-accent hover:text-fg">
            <SearchIcon width={16} height={16} />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden rounded border border-line px-1.5 font-mono text-[10px] sm:inline">Ctrl K</kbd>
          </button>
          <Link href="/recruiter" className="hidden rounded-full bg-gradient-to-r from-accent to-accent-2 px-4 py-2 text-sm font-semibold text-accent-ink transition hover:brightness-110 xl:inline-block">Recruiter overview</Link>
          <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface lg:hidden" aria-label={mobile ? "Close menu" : "Open menu"} aria-expanded={mobile} aria-controls="mobile-menu" onClick={() => setMobile((v) => !v)}>
            {mobile ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {mobile ? (
        <div id="mobile-menu" className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-line bg-bg lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
            {[...NAV.main, { href: "/recruiter", label: "Recruiter overview" }].map((l) => (
              <Link key={l.href} href={l.href} className={`rounded-lg px-3 py-3 ${isActive(path, l.href) ? "bg-surface-2" : "text-muted"}`}>{l.label}</Link>
            ))}
            {NAV.groups.map((g) => (
              <div key={g.label} className="mt-2">
                <p className="px-3 font-mono text-xs uppercase tracking-widest text-accent">{g.label}</p>
                {g.items.map((i) => (
                  <Link key={i.href} href={i.href} className={`block rounded-lg px-3 py-2.5 ${isActive(path, i.href) ? "bg-surface-2" : "text-muted"}`}>{i.label}</Link>
                ))}
              </div>
            ))}
            {NAV.tail.map((l) => (
              <Link key={l.href} href={l.href} className={`mt-2 rounded-lg px-3 py-3 ${isActive(path, l.href) ? "bg-surface-2" : "text-muted"}`}>{l.label}</Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
