"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, RoundedBox, useTexture } from "@react-three/drei";
import { AdditiveBlending, CanvasTexture, MathUtils, SRGBColorSpace } from "three";
import AdaptiveQuality from "./AdaptiveQuality";

const { damp, lerp } = MathUtils;

function makeSheen() {
  const c = document.createElement("canvas");
  c.width = 128; c.height = 8;
  const g = c.getContext("2d");
  const grad = g.createLinearGradient(0, 0, 128, 0);
  grad.addColorStop(0, "rgba(255,255,255,0)");
  grad.addColorStop(0.5, "rgba(255,255,255,0.9)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 8);
  return new CanvasTexture(c);
}

function Holo({ src, tags, onReady }) {
  const tex = useTexture(src, (t) => { t.colorSpace = SRGBColorSpace; t.anisotropy = 8; });
  const viewport = useThree((s) => s.viewport);
  const dom = useThree((s) => s.gl.domElement);
  const group = useRef(null), sheen = useRef(null), light = useRef(null);
  const over = useRef(false);
  const sheenTex = useMemo(() => makeSheen(), []);

  // Fit the screen to the canvas whatever its shape.
  const aspect = tex.image.width / tex.image.height;
  const W = Math.min(viewport.width * 0.84, viewport.height * 0.76 * aspect);
  const H = W / aspect;

  useEffect(() => { onReady?.(); }, [onReady]);
  useEffect(() => {
    const enter = () => { over.current = true; };
    const leave = () => { over.current = false; };
    dom.addEventListener("pointerenter", enter);
    dom.addEventListener("pointerleave", leave);
    return () => { dom.removeEventListener("pointerenter", enter); dom.removeEventListener("pointerleave", leave); };
  }, [dom]);

  useFrame((s, dt) => {
    const g = group.current; if (!g) return;
    const t = s.clock.elapsedTime, px = over.current ? s.pointer.x : 0, py = over.current ? s.pointer.y : 0, idle = over.current ? 0 : 1;
    g.rotation.y = damp(g.rotation.y, px * 0.32 + Math.sin(t * 0.4) * 0.07 * idle, 3.5, dt);
    g.rotation.x = damp(g.rotation.x, -py * 0.2 + Math.sin(t * 0.5) * 0.03 * idle, 3.5, dt);
    g.position.y = Math.sin(t * 0.7) * 0.04;
    if (sheen.current) sheen.current.position.x = lerp(-W * 0.75, W * 0.75, (t % 6) / 6);
    if (light.current) light.current.position.set(px * 3, py * 2, 2.6);
  });

  const chips = tags.filter((t) => t.length <= 14).slice(0, 3);
  const pos = [[-W * 0.3, H * 0.5 + 0.3, 0.9], [-W * 0.36, -H * 0.5 - 0.16, 1.25], [W * 0.14, H * 0.5 + 0.36, 0.6]];
  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight ref={light} intensity={26} color="#ff7a3d" distance={14} />
      <pointLight position={[-4, 2, 3]} intensity={18} color="#159a9c" />
      <group ref={group}>
        <RoundedBox args={[W + 0.34, H + 0.34, 0.08]} radius={0.12} smoothness={3} position={[0, 0, -0.14]}><meshBasicMaterial color="#ff7a3d" transparent opacity={0.14} depthWrite={false} /></RoundedBox>
        <RoundedBox args={[W + 0.16, H + 0.16, 0.16]} radius={0.07} smoothness={3}><meshStandardMaterial color="#0a1316" metalness={0.75} roughness={0.32} /></RoundedBox>
        <mesh position={[0, 0, 0.085]}><planeGeometry args={[W, H]} /><meshBasicMaterial map={tex} toneMapped={false} /></mesh>
        <mesh ref={sheen} position={[0, 0, 0.095]} rotation={[0, 0, -0.45]}><planeGeometry args={[W * 0.35, H * 1.8]} /><meshBasicMaterial map={sheenTex} transparent opacity={0.1} depthWrite={false} blending={AdditiveBlending} /></mesh>
        {chips.map((t, i) => (
          <Html key={t} center position={pos[i]} zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
            <span className="whitespace-nowrap rounded-full border border-line-2 bg-bg/85 px-3 py-1.5 font-mono text-[11px] text-fg/90 shadow-xl">{t}</span>
          </Html>
        ))}
      </group>
    </>
  );
}

export default function HoloScene({ src, tags, active, onReady, onFail }) {
  const [dpr, setDpr] = useState(1.5);
  return (
    <Canvas dpr={dpr} camera={{ position: [0, 0, 6.4], fov: 30 }} frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => { gl.setClearColor(0x000000, 0); gl.domElement.addEventListener("webglcontextlost", (e) => { e.preventDefault(); onFail?.(); }); }}>
      <AdaptiveQuality min={1} max={1.75} onDpr={setDpr} onFail={onFail} />
      <Holo src={src} tags={tags} onReady={onReady} />
    </Canvas>
  );
}
