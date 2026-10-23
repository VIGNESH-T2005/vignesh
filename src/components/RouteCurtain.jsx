"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { INDEX } from "@/data/site";

const ITEMS = INDEX.flatMap((g) => g.items);
const labelFor = (path) => {
  const hit = ITEMS.filter((i) => (i.href === "/" ? path === "/" : path === i.href || path.startsWith(i.href + "/"))).sort((a, b) => b.href.length - a.href.length)[0];
  return hit?.label ?? "";
};

// A quick wipe on client-side navigation. Never shown on the first load.
export default function RouteCurtain() {
  const path = usePathname();
  const reduce = useReducedMotion();
  const [prev, setPrev] = useState(path);
  const [tick, setTick] = useState(0);
  if (prev !== path) { setPrev(path); setTick((t) => t + 1); }
  if (reduce || tick === 0) return null;
  return (
    <motion.div key={tick} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[80] grid origin-top place-items-center bg-bg"
      initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0.12 }}>
      <motion.p className="display text-[clamp(2rem,7vw,5rem)]" initial={{ opacity: 1, y: 0 }} animate={{ opacity: 0, y: -24 }} transition={{ duration: 0.4, delay: 0.1 }}>{labelFor(path)}</motion.p>
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-accent via-accent-2 to-violet" />
    </motion.div>
  );
}
