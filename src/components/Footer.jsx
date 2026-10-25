import Link from "next/link";
import { SITE } from "@/data/site";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-muted sm:px-8">
        <p>© <span suppressHydrationWarning>{new Date().getFullYear()}</span> {SITE.name}. All rights reserved.</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li><Link href="/recruiter" className="u-link hover:text-fg">Hiring summary</Link></li>
          <li><Link href="/github" className="u-link hover:text-fg">GitHub activity</Link></li>
          <li><Link href="/blog" className="u-link hover:text-fg">Engineering notes</Link></li>
          <li><a href={SITE.resume} download="Vignesh-T-Resume.pdf" className="u-link hover:text-fg">Résumé</a></li>
          <li><a href={`mailto:${SITE.email}`} className="u-link hover:text-fg">{SITE.email}</a></li>
        </ul>
      </div>
    </footer>
  );
}
