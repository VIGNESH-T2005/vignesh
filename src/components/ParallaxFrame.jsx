"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Gentle scroll-linked rise and scale for a hero visual.
export default function ParallaxFrame({ children }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.97]);
  return (
    <div ref={ref} className="relative">
      <div aria-hidden="true" className="absolute inset-x-[10%] -inset-y-6 rounded-full bg-gradient-to-r from-teal/25 via-accent/10 to-accent-2/20 blur-3xl" />
      <motion.div style={reduce ? undefined : { y, scale }} className="relative">{children}</motion.div>
    </div>
  );
}
