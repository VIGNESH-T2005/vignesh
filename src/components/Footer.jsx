import Link from "next/link";
import { FOOTER_LINKS, SITE } from "@/data/site";
import { GithubIcon, LinkedinIcon, CodeIcon, MailIcon } from "./Icons";

const social = [
  { label: "GitHub", href: SITE.socials.github.href, Icon: GithubIcon },
  { label: "LinkedIn", href: SITE.socials.linkedin.href, Icon: LinkedinIcon },
  { label: "LeetCode", href: SITE.socials.leetcode.href, Icon: CodeIcon },
  { label: "Email", href: `mailto:${SITE.email}`, Icon: MailIcon },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <p className="font-display text-lg font-bold">{SITE.name}</p>
          <p className="mt-1 text-sm text-muted">{SITE.role}</p>
          <p className="mt-3 max-w-xs text-sm text-muted">{SITE.availability}.</p>
          <a href={SITE.resume} download="Vignesh-T-Resume.pdf" className="mt-4 inline-block text-sm text-accent hover:underline">Download resume (PDF)</a>
          <ul className="mt-5 flex gap-3">
            {social.map(({ label, href, Icon }) => (
              <li key={label}>
                <a href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition hover:border-accent hover:text-fg"><Icon /></a>
              </li>
            ))}
          </ul>
        </div>
        {FOOTER_LINKS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="text-sm font-semibold">{col.title}</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {col.items.map(([href, label]) => <li key={href}><Link href={href} className="hover:text-fg">{label}</Link></li>)}
            </ul>
          </nav>
        ))}
      </div>
      <p className="border-t border-line py-5 text-center text-xs text-muted">
        © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {SITE.name}. Content verified against GitHub repositories as of {SITE.dataAsOf}.
      </p>
    </footer>
  );
}
