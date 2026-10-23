"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import Frame from "./Frame";
import { useWebGLCapable } from "./three/capability";
import SceneBoundary from "./three/SceneBoundary";

const HoloScene = dynamic(() => import("./three/HoloScene"), { ssr: false });

// Interactive 3D screenshot for projects that have one. Shows the regular framed image
// until the scene is ready (and permanently when WebGL is unavailable or motion is reduced).
export default function ProjectHolo({ p, sizes, contain = false, href }) {
  const capable = useWebGLCapable();
  const router = useRouter();
  const wrapRef = useRef(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const enabled = capable && !!p.image && !failed;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !enabled) return;
    const io = new IntersectionObserver(([e]) => { setVisible(e.isIntersecting); if (e.isIntersecting) setNear(true); }, { rootMargin: "300px" });
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);

  const src = p.image ? `/_next/image?url=${encodeURIComponent(p.image)}&w=1920&q=75` : null;
  const tags = (p.stack ?? []).slice(0, 6);
  const show3D = enabled && near && ready;

  return (
    <div ref={wrapRef} className="relative">
      <div className={`transition-opacity duration-700 ${show3D ? "opacity-0" : ""}`} aria-hidden={show3D || undefined}><Frame p={p} sizes={sizes} contain={contain} /></div>
      {enabled && near ? (
        <div className={`absolute -inset-x-6 -inset-y-10 z-[1] transition-opacity duration-1000 ${show3D ? "opacity-100" : "pointer-events-none opacity-0"} ${href ? "cursor-pointer" : ""}`}
          onClick={href ? () => router.push(href) : undefined} role="img" aria-label={p.imageAlt ?? p.title}>
          <SceneBoundary onFail={() => setFailed(true)}>
            <Suspense fallback={null}>
              <HoloScene src={src} tags={tags} active={visible} onReady={() => setReady(true)} onFail={() => setFailed(true)} />
            </Suspense>
          </SceneBoundary>
        </div>
      ) : null}
    </div>
  );
}
