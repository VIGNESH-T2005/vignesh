import Link from "next/link";
import { FOOTER_LINKS, SITE } from "@/data/site";
import CopyEmail from "./CopyEmail";
import { GithubIcon, LinkedinIcon, CodeIcon } from "./Icons";

const social = [
  { label: "GitHub", href: SITE.socials.github.href, Icon: GithubIcon },
  { label: "LinkedIn", href: SITE.socials.linkedin.href, Icon: LinkedinIcon },
  { label: "LeetCode", href: SITE.socials.leetcode.href, Icon: CodeIcon },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-10 pt-14 sm:px-8 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div>
          <p className="serif-i text-3xl leading-tight">Let&apos;s talk.</p>
          <div className="mt-5"><CopyEmail /></div>
          <ul className="mt-5 flex gap-3">
            {social.map(({ label, href, Icon }) => (
              <li key={label}><a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`} className="grid h-10 w-10 place-items-center rounded-full border border-line-2 text-muted transition hover:border-accent hover:text-accent"><Icon /></a></li>
            ))}
          </ul>
        </div>
        {FOOTER_LINKS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="eyebrow text-muted">{col.title}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {col.items.map(([href, label]) => <li key={href}><Link href={href} className="u-link text-fg/80 hover:text-accent">{label}</Link></li>)}
            </ul>
          </nav>
        ))}
      </div>
      <p aria-hidden="true" className="display outline-text pointer-events-none -mb-[0.18em] select-none whitespace-nowrap text-center text-[clamp(4rem,17vw,15rem)]">VIGNESH T.</p>
      <div className="relative flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-5 text-xs text-muted sm:px-8">
        <p>© <span suppressHydrationWarning>{new Date().getFullYear()}</span> {SITE.name}. Designed and built by me.</p>
        <p><a href={SITE.resume} download="Vignesh-T-Resume.pdf" className="u-link hover:text-fg">Download résumé</a></p>
      </div>
    </footer>
  );
}
