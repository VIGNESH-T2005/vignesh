"use client";
import { useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SITE } from "@/data/site";
import { useParallax } from "./FX";
import { ButtonLink } from "./ui";
import HeroStage from "./HeroStage";
import { GithubIcon, LinkedinIcon, CodeIcon, DownloadIcon } from "./Icons";

const social = [
  { ...SITE.socials.github, Icon: GithubIcon },
  { ...SITE.socials.linkedin, Icon: LinkedinIcon },
  { ...SITE.socials.leetcode, Icon: CodeIcon },
];

export default function Hero({ graph }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  useParallax(ref);
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 500], [0, -70]);
  const textOpacity = useTransform(scrollY, [0, 420], [1, 0.25]);

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-70" />
      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8">
        <p className="rise eyebrow flex items-center gap-3"><span className="h-px w-10 bg-accent" aria-hidden="true" />Full-stack developer · Final-year ECE</p>
        <h1 id="hero-title" className="rise display relative z-10 mt-5 whitespace-nowrap leading-[0.95] text-[clamp(3.4rem,14.6vw,13rem)]" style={{ "--d": "80ms" }}>
          Vignesh <span className="gradient-text">T</span><span className="text-accent">.</span>
        </h1>
        <div className="grid items-center gap-10 lg:grid-cols-12">
        <motion.div className="relative z-10 lg:col-span-6" style={reduce ? undefined : { y: textY, opacity: textOpacity }}>
          <p className="rise serif-i min-h-[1.4em] text-3xl text-fg/90 sm:text-5xl" style={{ "--d": "240ms" }} aria-live="off">
            {reduce ? SITE.roles[0] : <TypeAnimation sequence={SITE.roles.flatMap((r) => [r, 1800])} wrapper="span" speed={55} repeat={Infinity} />}
          </p>
          <p className="rise mt-6 max-w-xl text-lg leading-relaxed text-muted" style={{ "--d": "320ms" }}>
            {SITE.headline} {SITE.intro}
          </p>
          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ "--d": "400ms" }}>
            <ButtonLink href="/projects">See the work</ButtonLink>
            <ButtonLink href={SITE.resume} download variant="ghost"><DownloadIcon width={16} height={16} />Résumé</ButtonLink>
            <ButtonLink href="/contact" variant="ghost">Contact</ButtonLink>
            <ul className="ml-1 flex items-center gap-2">
              {social.map(({ label, href, Icon }) => (
                <li key={label}><a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`} className="grid h-11 w-11 place-items-center rounded-full border border-line-2 text-muted transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"><Icon /></a></li>
              ))}
            </ul>
          </div>
        </motion.div>

        <HeroStage graph={graph} />
        </div>
      </div>
    </section>
  );
}
