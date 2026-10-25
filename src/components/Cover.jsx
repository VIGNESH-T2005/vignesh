"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useWebGLCapable } from "./three/capability";
import SceneBoundary from "./three/SceneBoundary";

// The 3D scene is a separate chunk, loaded only on capable devices once the browser is idle.
const HeroScene = dynamic(() => import("./three/HeroScene"), { ssr: false });

// Profile cover: an interactive map of the technologies I use. Static chips stand in until the
// 3D scene is ready, and permanently when WebGL is unavailable, motion is reduced or the device is slow.
export default function Cover({ graph }) {
  const capable = useWebGLCapable();
  const wrapRef = useRef(null);
  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [visible, setVisible] = useState(true);
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
    <div ref={wrapRef} className="relative h-[270px] overflow-hidden rounded-[28px] border border-line sm:h-[320px]">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60rem_22rem_at_15%_0%,rgba(255,122,61,0.22),transparent_60%),radial-gradient(50rem_20rem_at_95%_100%,rgba(45,212,191,0.20),transparent_60%),linear-gradient(180deg,#0a1215,#071013)]" />
      <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-60" />

      <div className={`absolute inset-0 grid place-items-center px-6 transition-opacity duration-700 ${show3D ? "pointer-events-none opacity-0" : ""}`} inert={show3D} aria-hidden={show3D}>
        <ul className="flex max-w-2xl flex-wrap justify-center gap-2" aria-label="Technologies">
          {graph.map((n) => (
            <li key={n.id}>
              <Link href={n.href} aria-label={`${n.label}: ${n.tier}, used in ${n.used.join(", ")}`} className="inline-flex items-center gap-2 rounded-full border border-line-2 bg-bg/60 px-3.5 py-1.5 font-mono text-xs transition hover:border-accent hover:text-accent">
                <span className="h-2 w-2 rounded-full" style={{ background: n.color }} aria-hidden="true" />{n.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {mount && !failed ? (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${show3D ? "opacity-100" : "opacity-0"}`}>
          <SceneBoundary onFail={() => setFailed(true)}>
            <HeroScene nodes={graph} active={visible} onReady={() => setReady(true)} onFail={() => setFailed(true)} />
          </SceneBoundary>
        </div>
      ) : null}

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg/80 to-transparent" />
      <p className={`pointer-events-none absolute bottom-3 left-5 hidden font-mono text-[11px] text-muted transition-opacity duration-700 sm:block ${show3D ? "opacity-100" : "opacity-0"}`}>Select a technology to see where I used it</p>
    </div>
  );
}
