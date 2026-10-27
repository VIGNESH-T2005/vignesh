"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { repoStats } from "@/data/repos";
import { useWebGLCapable } from "./three/capability";
import SceneBoundary from "./three/SceneBoundary";

// The 3D scene is a separate chunk, loaded only on capable devices once the browser is idle.
const HeroScene = dynamic(() => import("./three/HeroScene"), { ssr: false });

const INNER = [["C#", "/projects/hrc-tech", "#a78bfa"], ["PostgreSQL", "/projects/hrc-tech", "#38e1ff"], ["Stripe", "/projects/hrc-tech", "#8b6cff"], ["React", "/skills", "#38e1ff"]];
const OUTER = [["Node.js", "/projects/shop-zone", "#c6ff3d"], ["MongoDB", "/projects/shop-zone", "#4ade80"], ["Java", "/projects/java-problems", "#fb923c"], ["Docker", "/projects/hrc-tech", "#38bdf8"], ["Next.js", "/projects/portfolio", "#eef1f7"], ["Power BI", "/projects/powerbi-analytics", "#facc15"]];

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

// 2D version: used while the 3D scene loads, without WebGL, and for reduced motion.
function Orbit2D() {
  return (
    <div className="orbit relative aspect-square h-full w-full [container-type:inline-size]">
      <div aria-hidden="true" className="absolute inset-[18%] rounded-full bg-accent/10 blur-3xl" />
      <Ring nodes={OUTER} r={42} dur="90s" />
      <Ring nodes={INNER} r={26} dur="60s" reverse />
      <div className="absolute left-1/2 top-1/2 h-[30cqw] w-[30cqw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-accent via-accent-2 to-violet p-[0.8cqw] shadow-[0_0_60px_var(--glow)]">
        <div className="relative h-full w-full overflow-hidden rounded-full bg-bg"><Image src="/dp.png" alt="Portrait of Vignesh T" fill priority sizes="150px" className="object-cover object-top" /></div>
      </div>
    </div>
  );
}

function Chip({ className, depth, children, href }) {
  const inner = <div className="float rounded-2xl border border-line-2 bg-bg/85 px-4 py-3 text-xs shadow-2xl">{children}</div>;
  return (
    <div className={`absolute z-20 ${className}`} style={{ translate: `calc(var(--px,0) * ${depth}px) calc(var(--py,0) * ${depth}px)` }}>
      {href ? <Link href={href} className="block transition hover:scale-105">{inner}</Link> : inner}
    </div>
  );
}

export default function HeroStage({ graph }) {
  const capable = useWebGLCapable();
  const wrapRef = useRef(null);
  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [visible, setVisible] = useState(true);
  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, [0, 720], [0, 1]);
  const fade = useTransform(scrollY, [0, 620], [1, 0.12]);
  const hrc = repoStats("hrc-tech");
  const days = Math.round((new Date(hrc.last) - new Date(hrc.first)) / 864e5) + 1;
  const show3D = ready && !failed;

  useEffect(() => {
    if (!capable) return;
    const w = window, ric = "requestIdleCallback" in w;
    const id = ric ? w.requestIdleCallback(() => setMount(true), { timeout: 1200 }) : w.setTimeout(() => setMount(true), 500);
    return () => (ric ? w.cancelIdleCallback(id) : w.clearTimeout(id));
  }, [capable]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="relative mx-auto w-full max-w-[560px] lg:col-span-6 lg:justify-self-end">
      <div className="relative aspect-square w-full sm:aspect-[1.15] lg:aspect-[1.3]">
        <div className={`absolute inset-0 transition-opacity duration-700 ${show3D ? "pointer-events-none opacity-0" : ""}`} inert={show3D} aria-hidden={show3D}>
          <div className="mx-auto h-full max-w-[470px]"><Orbit2D /></div>
        </div>

        {mount && !failed ? (
          <motion.div className="absolute inset-0" style={{ opacity: fade }}>
            <div className={`h-full w-full transition-opacity duration-1000 ${show3D ? "opacity-100" : "opacity-0"}`}>
              <SceneBoundary onFail={() => setFailed(true)}>
                <HeroScene nodes={graph} progress={progress} active={visible} onReady={() => setReady(true)} onFail={() => setFailed(true)} />
              </SceneBoundary>
            </div>
          </motion.div>
        ) : null}

        <div className={`absolute right-0 top-0 z-20 transition-opacity duration-700 ${show3D ? "opacity-100" : "opacity-0"}`} aria-hidden={!show3D}>
          <div className="rounded-full bg-gradient-to-br from-accent via-accent-2 to-violet p-[3px] shadow-[0_0_40px_var(--glow)]">
            <div className="relative h-20 w-20 overflow-hidden rounded-full bg-bg sm:h-24 sm:w-24"><Image src="/dp.png" alt="" fill sizes="96px" className="object-cover object-top" /></div>
          </div>
        </div>
        <p className={`pointer-events-none absolute inset-x-0 bottom-0 text-center font-mono text-[11px] text-muted transition-opacity duration-700 ${show3D ? "opacity-100" : "opacity-0"}`}>Select a technology to see where I used it</p>
      </div>

      <Chip className="max-sm:hidden left-0 top-[4%] sm:-left-6" depth={-16} href="/projects/hrc-tech">
        <p className="font-mono text-[10px] uppercase tracking-widest text-accent">HRC TECH</p>
        <p className="mt-1 font-display text-lg font-bold">{hrc.commits} commits</p>
        <p className="text-muted">in {days} days</p>
      </Chip>
      <Chip className="max-sm:hidden -bottom-6 right-0 sm:-right-2" depth={20} href="/coding">
        <p className="font-mono text-[10px] uppercase tracking-widest text-accent">LeetCode</p>
        <p className="mt-1 font-display text-lg font-bold">75+ solved</p>
      </Chip>
    </div>
  );
}
