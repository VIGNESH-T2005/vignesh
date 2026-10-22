"use client";
import { motion, useReducedMotion } from "framer-motion";

// Scroll-triggered entrance. `from`: "up" | "left" | "right" | "scale".
export default function Reveal({ children, delay = 0, className = "", as = "div", from = "up" }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.div;
  if (reduce) return <Tag className={className}>{children}</Tag>;
  const initial = { opacity: 0, ...(from === "up" ? { y: 28 } : from === "left" ? { x: -36 } : from === "right" ? { x: 36 } : { scale: 0.94 }) };
  return (
    <Tag className={className} initial={initial} whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }} viewport={{ once: true, margin: "-70px" }} transition={{ duration: 0.65, delay, ease: [0.2, 0.7, 0.2, 1] }}>
      {children}
    </Tag>
  );
}

// A hairline that draws itself in as it scrolls into view.
export function Rule({ className = "" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div aria-hidden="true" className={`h-px origin-left bg-gradient-to-r from-accent/70 via-line-2 to-transparent ${className}`}
      initial={reduce ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }} />
  );
}
