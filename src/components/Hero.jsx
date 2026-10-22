"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import { useReducedMotion } from "framer-motion";
import { SITE } from "@/data/site";
import { repoStats } from "@/data/repos";
import { useParallax } from "./FX";
import { ButtonLink } from "./ui";
import { GithubIcon, LinkedinIcon, CodeIcon, DownloadIcon } from "./Icons";

const social = [
  { ...SITE.socials.github, Icon: GithubIcon },
  { ...SITE.socials.linkedin, Icon: LinkedinIcon },
  { ...SITE.socials.leetcode, Icon: CodeIcon },
];

// Technologies orbiting the portrait. Each links to where it was used.
const INNER = [
  ["C#", "/projects/hrc-tech", "#a78bfa"], ["PostgreSQL", "/projects/hrc-tech", "#38e1ff"],
  ["Stripe", "/projects/hrc-tech", "#8b6cff"], ["React", "/skills", "#38e1ff"],
];
const OUTER = [
  ["Node.js", "/projects/shop-zone", "#c6ff3d"], ["MongoDB", "/projects/shop-zone", "#4ade80"], ["Java", "/projects/java-problems", "#fb923c"],
  ["Docker", "/projects/hrc-tech", "#38bdf8"], ["Next.js", "/projects/portfolio", "#eef1f7"], ["Power BI", "/projects/powerbi-analytics", "#facc15"],
];

function Ring({ nodes, r, dur, reverse }) {
  const step = 360 / nodes.length;
  return (
    <>
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 rounded-full border border-dashed border-line-2" style={{ width: `${r * 2}cqw`, height: `${r * 2}cqw`, transform: "translate(-50%,-50%)" }} />
      <ul className="orbit-ring absolute inset-0" style={{ "--dur": dur, animationDirection: reverse ? "reverse" : "normal" }}>
        {nodes.map(([name, href, color], i) => {
          const a = i * step + (reverse ? 20 : 0);
          return (
            <li key={name} className="absolute left-1/2 top-1/2" style={{ transform: `translate(-50%,-50%) rotate(${a}deg) translateX(${r}cqw) rotate(${-a}deg)` }}>
              <div className="orbit-counter" style={{ "--dur": dur, animationDirection: reverse ? "normal" : "reverse" }}>
                <Link href={href} aria-label={`${name}: see where I used it`} className="glass flex items-center gap-1.5 whitespace-nowrap rounded-full px-[2.2cqw] py-[1.1cqw] text-[max(11px,2.7cqw)] font-medium transition hover:scale-110 hover:border-accent">
                  <span className="h-[1.6cqw] w-[1.6cqw] min-h-[6px] min-w-[6px] rounded-full" style={{ background: color }} aria-hidden="true" />{name}
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function Chip({ className, depth, children, href }) {
  const inner = <div className="float glass rounded-2xl px-4 py-3 text-xs shadow-2xl">{children}</div>;
  return (
    <div className={`absolute z-20 ${className}`} style={{ translate: `calc(var(--px,0) * ${depth}px) calc(var(--py,0) * ${depth}px)` }}>
      {href ? <Link href={href} className="block transition hover:scale-105">{inner}</Link> : inner}
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  useParallax(ref);
  const hrc = repoStats("hrc-tech");
  const days = Math.round((new Date(hrc.last) - new Date(hrc.first)) / 864e5) + 1;

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-70" />
      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8">
        <p className="rise eyebrow flex items-center gap-3"><span className="h-px w-10 bg-accent" aria-hidden="true" />Full-stack developer · Final-year ECE</p>
        <h1 id="hero-title" className="rise display relative z-10 mt-5 whitespace-nowrap leading-[0.95] text-[clamp(3.4rem,14.6vw,13rem)]" style={{ "--d": "80ms" }}>
          Vignesh <span className="gradient-text">T</span><span className="text-accent">.</span>
        </h1>
        <div className="grid items-center gap-10 lg:grid-cols-12">
        <div className="relative z-10 lg:col-span-6">
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
        </div>

        <div className="relative mx-auto w-full max-w-[460px] lg:col-span-6 lg:justify-self-end">
          <div className="orbit relative aspect-square w-full [container-type:inline-size]">
            <div aria-hidden="true" className="absolute inset-[18%] rounded-full bg-accent/10 blur-3xl" />
            <Ring nodes={OUTER} r={42} dur="90s" />
            <Ring nodes={INNER} r={26} dur="60s" reverse />
            <div className="absolute left-1/2 top-1/2 h-[30cqw] w-[30cqw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-accent via-accent-2 to-violet p-[0.8cqw] shadow-[0_0_60px_var(--glow)]">
              <div className="relative h-full w-full overflow-hidden rounded-full bg-bg">
                <Image src="/dp.png" alt="Portrait of Vignesh T" fill priority sizes="150px" className="object-cover object-top" />
              </div>
            </div>
          </div>
          <Chip className="left-0 top-[4%] sm:-left-6" depth={-16} href="/projects/hrc-tech">
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent">HRC TECH</p>
            <p className="mt-1 font-display text-lg font-bold">{hrc.commits} commits</p>
            <p className="text-muted">in {days} days</p>
          </Chip>
          <Chip className="right-0 bottom-[17%] sm:-right-2" depth={20} href="/coding">
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent">LeetCode</p>
            <p className="mt-1 font-display text-lg font-bold">75+ solved</p>
          </Chip>
        </div>
        </div>
      </div>
    </section>
  );
}
