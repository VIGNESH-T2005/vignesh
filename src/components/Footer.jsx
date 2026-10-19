import { NAV, SITE } from "@/data/site";
import { GithubIcon, LinkedinIcon, CodeIcon, MailIcon } from "./Icons";

const social = [
  { label: "GitHub", href: SITE.socials.github.href, Icon: GithubIcon },
  { label: "LinkedIn", href: SITE.socials.linkedin.href, Icon: LinkedinIcon },
  { label: "LeetCode", href: SITE.socials.leetcode.href, Icon: CodeIcon },
  { label: "Email", href: `mailto:${SITE.email}`, Icon: MailIcon },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold">{SITE.name}</p>
          <p className="mt-1 text-sm text-muted">{SITE.role}</p>
          <a href={SITE.resume} download="Vignesh-T-Resume.pdf" className="mt-3 inline-block text-sm text-accent hover:underline">Download resume</a>
        </div>

        <nav aria-label="Footer">
          <p className="text-sm font-semibold">Quick links</p>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-muted">
            {NAV.map((n) => (
              <li key={n.id}><a href={`#${n.id}`} className="hover:text-fg">{n.label}</a></li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold">Connect</p>
          <ul className="mt-3 flex gap-3">
            {social.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition hover:border-accent hover:text-fg"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="border-t border-line py-5 text-center text-xs text-muted">
        © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {SITE.name}. Built with Next.js and Tailwind CSS.
      </p>
    </footer>
  );
}
