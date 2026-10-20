"use client";
import { motion, useReducedMotion } from "framer-motion";

// Subtle fade/slide on every route change (disabled for reduced-motion users).
export default function Template({ children }) {
  const reduce = useReducedMotion();
  if (reduce) return children;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}
