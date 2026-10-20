"use client";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { useReducedMotion } from "framer-motion";
import { SITE } from "@/data/site";
import { ButtonLink } from "./ui";
import { GithubIcon, LinkedinIcon, CodeIcon, DownloadIcon, ArrowRightIcon, MailIcon } from "./Icons";

const social = [
  { ...SITE.socials.github, Icon: GithubIcon },
  { ...SITE.socials.linkedin, Icon: LinkedinIcon },
  { ...SITE.socials.leetcode, Icon: CodeIcon },
];

export default function Hero() {
  const reduce = useReducedMotion();
  return (
    <section aria-labelledby="hero-title" className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-14 sm:px-6 md:grid-cols-[1.3fr_1fr] md:pt-24">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-muted">
          <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />{SITE.availability}
        </p>
        <h1 id="hero-title" className="mt-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">Hi, I&apos;m <span className="gradient-text">{SITE.name}</span></h1>
        <p className="mt-3 min-h-9 font-display text-xl sm:text-2xl" aria-live="off">
          {reduce ? SITE.roles[0] : <TypeAnimation sequence={SITE.roles.flatMap((r) => [r, 1800])} wrapper="span" speed={55} repeat={Infinity} />}
        </p>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{SITE.intro}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/projects">View Projects <ArrowRightIcon width={18} height={18} /></ButtonLink>
          <ButtonLink href={SITE.resume} download variant="ghost"><DownloadIcon width={18} height={18} /> Download Resume</ButtonLink>
          <ButtonLink href="/contact" variant="ghost"><MailIcon width={18} height={18} /> Contact</ButtonLink>
        </div>
        <ul className="mt-8 flex items-center gap-3">
          {social.map(({ label, href, Icon }) => (
            <li key={label}><a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`} className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-muted transition hover:-translate-y-0.5 hover:border-accent hover:text-fg"><Icon /></a></li>
          ))}
        </ul>
      </div>
      <div className="mx-auto w-48 sm:w-60 md:w-full md:max-w-xs">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line bg-surface p-1.5 shadow-[0_0_80px_var(--glow)]">
          <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
            <Image src="/dp.png" alt="Portrait of Vignesh T" fill priority sizes="(max-width: 768px) 240px, 320px" className="object-cover object-top" />
          </div>
        </div>
      </div>
    </section>
  );
}
