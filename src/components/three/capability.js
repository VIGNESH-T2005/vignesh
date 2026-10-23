"use client";
import { useSyncExternalStore } from "react";

// True only when WebGL works, the visitor hasn't asked for reduced motion and isn't on data-saver.
// Server snapshot is false, so 3D never renders until the client has confirmed support.
let cached = null;
function detect() {
  if (cached !== null) return cached;
  if (typeof window === "undefined") return false;
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return (cached = false);
    if (navigator.connection?.saveData) return (cached = false);
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2") || c.getContext("webgl");
    cached = !!gl;
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    cached = false;
  }
  return cached;
}
const subscribe = () => () => {};
export const useWebGLCapable = () => useSyncExternalStore(subscribe, detect, () => false);
export const isSmallScreen = () => typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches;
