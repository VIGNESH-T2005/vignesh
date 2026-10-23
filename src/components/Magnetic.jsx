"use client";
import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

// Pulls its child gently toward the cursor (mouse only). Plain wrapper for touch and reduced motion.
export default function Magnetic({ children, strength = 0.3, className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 230, damping: 17, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 230, damping: 17, mass: 0.4 });
  if (reduce) return <span className={`inline-flex ${className}`}>{children}</span>;
  const move = (e) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const leave = () => { x.set(0); y.set(0); };
  return <motion.span ref={ref} onPointerMove={move} onPointerLeave={leave} style={{ x: sx, y: sy }} className={`inline-flex ${className}`}>{children}</motion.span>;
}
