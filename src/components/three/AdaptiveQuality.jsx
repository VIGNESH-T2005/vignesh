"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

// Measures real frame rate while the scene is visible. Below ~45 fps it steps the render
// resolution down; if the device stays under ~18 fps it gives up so the 2D version takes over.
// `window.__FORCE_3D__` disables the give-up (debugging in software-rendered browsers).
export default function AdaptiveQuality({ min = 1, max = 1.5, onDpr, onFail }) {
  const s = useRef({ t: 0, n: 0, windows: 0, bad: 0, dpr: max });
  useFrame((_, dt) => {
    const a = s.current;
    if (dt > 0.5) return; // ignore stalls such as tab switches
    a.t += dt; a.n += 1;
    if (a.t < 1.5) return;
    const fps = a.n / a.t;
    a.t = 0; a.n = 0; a.windows += 1;
    if (a.windows <= 2) return; // warm-up: shader compilation, texture upload
    if (fps < 45 && a.dpr > min) { a.dpr = Math.max(min, +(a.dpr - 0.25).toFixed(2)); onDpr(a.dpr); }
    if (typeof window !== "undefined" && window.__FORCE_3D__) return;
    a.bad = fps < 18 ? a.bad + 1 : 0;
    if (a.bad >= 3) onFail?.();
  });
  return null;
}
