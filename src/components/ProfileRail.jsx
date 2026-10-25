"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { SITE } from "@/data/site";
import IndexMenu from "./IndexMenu";
import CopyEmail from "./CopyEmail";
import Magnetic from "./Magnetic";
import { SearchIcon, DownloadIcon, GithubIcon, LinkedinIcon, CodeIcon } from "./Icons";

export const PRIMARY = [
  { href: "/", label: "Overview" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/education", label: "Education" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/github", label: "Engineering" },
  { href: "/contact", label: "Contact" },
];
const isActive = (path, href) => (href === "/" ? path === "/" : path === href || path.startsWith(href + "/") || (href === "/github" && ["/coding", "/blog", "/changelog"].some((h) => path.startsWith(h))));

const social = [
  { label: "GitHub", href: SITE.socials.github.href, Icon: GithubIcon },
  { label: "LinkedIn", href: SITE.socials.linkedin.href, Icon: LinkedinIcon },
  { label: "LeetCode", href: SITE.socials.leetcode.href, Icon: CodeIcon },
];

function Avatar({ size = 64 }) {
  return (
    <span className="relative block shrink-0 rounded-full bg-gradient-to-br from-accent via-accent-2 to-violet p-[2px]" style={{ width: size, height: size }}>
      <span className="relative block h-full w-full overflow-hidden rounded-full bg-bg"><Image src="/dp.png" alt="" fill sizes={`${size}px`} className="object-cover object-top" /></span>
    </span>
  );
}

// Persistent profile card + navigation (desktop). Mobile uses MobileBar.
export default function ProfileRail() {
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const moreRef = useRef(null);
  return (
    <aside aria-label="Profile" className="hidden w-[344px] shrink-0 xl:block">
      <div className="sticky top-0 h-svh p-4">
        <div className="frost flex h-full flex-col overflow-y-auto rounded-[28px] p-5">
          <Link href="/" className="group flex items-center gap-4" aria-label={`${SITE.name}, overview`}>
            <Avatar size={60} />
            <span>
              <span className="display block text-2xl leading-none">{SITE.name}</span>
              <span className="mt-1.5 block text-sm text-muted">{SITE.role}</span>
            </span>
          </Link>

          <Link href="/contact" className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-line-2 bg-bg/40 px-3.5 py-1.5 text-xs text-muted transition hover:border-accent hover:text-fg">
            <span className="live-dot h-2 w-2 rounded-full bg-accent" aria-hidden="true" />{SITE.availability}
          </Link>

          <dl className="mt-4 space-y-2.5 border-y border-line py-4 text-sm">
            <div className="flex justify-between gap-4"><dt className="text-muted">Location</dt><dd>{SITE.location}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-muted">Education</dt><dd>B.E. ECE · 2027</dd></div>
          </dl>

          <nav aria-label="Primary" className="mt-4">
            <ul className="space-y-1">
              {PRIMARY.map((l) => {
                const on = isActive(path, l.href);
                return (
                  <li key={l.href}>
                    <Link href={l.href} aria-current={on ? "page" : undefined}
                      className={`group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${on ? "bg-accent/10 text-accent" : "text-fg/80 hover:bg-white/5 hover:text-fg"}`}>
                      <span aria-hidden="true" className={`h-4 w-[3px] rounded-full transition ${on ? "bg-accent" : "bg-transparent group-hover:bg-line-2"}`} />{l.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <button ref={moreRef} type="button" onClick={() => setMenu(true)} aria-haspopup="dialog" className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-muted transition hover:bg-white/5 hover:text-fg">
                  <span aria-hidden="true" className="h-4 w-[3px] rounded-full bg-transparent" />All pages
                </button>
              </li>
            </ul>
          </nav>

          <div className="mt-auto space-y-2.5 pt-4">
            <Magnetic className="w-full">
              <a href={SITE.resume} download="Vignesh-T-Resume.pdf" className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink transition hover:bg-white">
                <DownloadIcon width={16} height={16} />Download résumé
              </a>
            </Magnetic>
            <button type="button" onClick={() => window.dispatchEvent(new Event("open-palette"))} aria-label="Search (Ctrl or Command + K)"
              className="flex w-full items-center justify-between rounded-full border border-line-2 px-4 py-2 text-sm text-muted transition hover:border-accent hover:text-fg">
              <span className="flex items-center gap-2"><SearchIcon width={16} height={16} />Search</span><kbd className="font-mono text-[10px]">Ctrl K</kbd>
            </button>
            <div className="flex items-center justify-between">
              <ul className="flex gap-2">
                {social.map(({ label, href, Icon }) => (
                  <li key={label}><a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`} className="grid h-9 w-9 place-items-center rounded-full border border-line-2 text-muted transition hover:border-accent hover:text-accent"><Icon width={16} height={16} /></a></li>
                ))}
              </ul>
              <CopyEmail compact />
            </div>
          </div>
        </div>
      </div>
      {menu ? <IndexMenu onClose={() => { setMenu(false); moreRef.current?.focus(); }} /> : null}
    </aside>
  );
}
