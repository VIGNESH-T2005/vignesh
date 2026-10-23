"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import AdaptiveQuality from "./AdaptiveQuality";
import { AdditiveBlending, BufferGeometry, CubicBezierCurve3, MathUtils, Vector3 } from "three";
import { GRAPH_EDGES } from "@/data/graph";
import { isSmallScreen } from "./capability";

const { damp } = MathUtils;

// Deterministic pseudo-random so the particle field is identical on every load.
function rng(seed) { let a = seed; return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

function Dust({ count }) {
  const ref = useRef(null);
  const positions = useMemo(() => {
    const r = rng(42), arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) { arr[i * 3] = (r() - 0.5) * 14; arr[i * 3 + 1] = (r() - 0.5) * 9; arr[i * 3 + 2] = (r() - 0.5) * 8 - 1; }
    return arr;
  }, [count]);
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.015; });
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial size={0.035} color="#ffe2c2" transparent opacity={0.55} depthWrite={false} sizeAttenuation blending={AdditiveBlending} />
    </points>
  );
}

function Shell() {
  const ref = useRef(null);
  useFrame((_, dt) => { if (ref.current) { ref.current.rotation.y += dt * 0.03; ref.current.rotation.x += dt * 0.012; } });
  return (
    <mesh ref={ref} position={[0, 0, -1.5]}>
      <icosahedronGeometry args={[4.8, 1]} />
      <meshBasicMaterial wireframe color="#5a4638" transparent opacity={0.16} depthWrite={false} />
    </mesh>
  );
}

function Edge({ curve, lit, dim, speed, offset }) {
  const pts = useMemo(() => curve.getPoints(28), [curve]);
  const geometry = useMemo(() => new BufferGeometry().setFromPoints(pts), [pts]);
  const packet = useRef(null);
  useFrame((s) => { if (packet.current) packet.current.position.copy(curve.getPoint((s.clock.elapsedTime * speed + offset) % 1)); });
  return (
    <>
      {lit ? (
        <Line points={pts} color="#ff7a45" lineWidth={1.8} transparent opacity={0.95} />
      ) : (
        <line geometry={geometry}><lineBasicMaterial color="#b39f8a" transparent opacity={dim ? 0.1 : 0.3} /></line>
      )}
      <mesh ref={packet}>
        <sphereGeometry args={[lit ? 0.07 : 0.05, 10, 10]} />
        <meshBasicMaterial color={lit ? "#ffffff" : "#ff7a45"} transparent opacity={dim ? 0.25 : 1} depthWrite={false} blending={AdditiveBlending} />
      </mesh>
    </>
  );
}

function NodeDot({ n, hovered, dimmed, onHover, onGo }) {
  const ref = useRef(null);
  const phase = useMemo(() => n.pos[0] * 1.7 + n.pos[1], [n.pos]);
  useFrame((s, dt) => {
    if (!ref.current) return;
    ref.current.scale.setScalar(damp(ref.current.scale.x, hovered ? 1.5 : 1, 8, dt));
    ref.current.position.y = n.pos[1] + Math.sin(s.clock.elapsedTime * 0.8 + phase) * 0.04;
  });
  return (
    <group ref={ref} position={n.pos}>
      <mesh onPointerOver={(e) => { e.stopPropagation(); onHover(n.id); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { onHover(null); document.body.style.cursor = ""; }} onClick={(e) => { e.stopPropagation(); onGo(n.href); }}>
        <icosahedronGeometry args={[0.2, 1]} />
        <meshStandardMaterial color={n.color} emissive={n.color} emissiveIntensity={hovered ? 1.8 : dimmed ? 0.15 : 0.75} roughness={0.35} metalness={0.15} flatShading transparent opacity={dimmed ? 0.45 : 1} />
      </mesh>
      <mesh scale={2.1}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color={n.color} transparent opacity={hovered ? 0.2 : 0.07} depthWrite={false} blending={AdditiveBlending} />
      </mesh>
      <Html center position={[0, -0.46, 0]} zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
        <a href={n.href} onClick={(e) => { e.preventDefault(); onGo(n.href); }} onMouseEnter={() => onHover(n.id)} onMouseLeave={() => onHover(null)} onFocus={() => onHover(n.id)} onBlur={() => onHover(null)}
          aria-label={`${n.label}: ${n.tier}, used in ${n.used.join(", ")}`}
          className={`block whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[11px] transition-colors ${hovered ? "border-accent bg-bg text-accent" : "border-line-2 bg-bg/80 text-fg/85"} ${dimmed ? "opacity-40" : ""}`}
          style={{ pointerEvents: "auto" }}>
          {n.label}
          {hovered ? <span className="mt-0.5 block text-[10px] text-muted">{n.tier} · {n.used[0]}{n.used.length > 1 ? ` +${n.used.length - 1}` : ""}</span> : null}
        </a>
      </Html>
    </group>
  );
}

function Graph({ nodes, progress, small }) {
  const router = useRouter();
  const group = useRef(null);
  const [hover, setHoverState] = useState(null);
  const hoverRef = useRef(null);
  const setHover = useCallback((id) => { hoverRef.current = id; setHoverState(id); }, []);
  const target = useRef({ x: 0, y: 0 });
  const byId = useMemo(() => Object.fromEntries(nodes.map((n) => [n.id, n])), [nodes]);

  useEffect(() => {
    const onMove = (e) => { target.current.x = (e.clientX / window.innerWidth) * 2 - 1; target.current.y = (e.clientY / window.innerHeight) * 2 - 1; };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const edges = useMemo(() => GRAPH_EDGES.filter(([a, b]) => byId[a] && byId[b]).map(([a, b], i) => {
    const p0 = new Vector3(...byId[a].pos), p1 = new Vector3(...byId[b].pos);
    const mid = p0.clone().lerp(p1, 0.5);
    const c1 = mid.clone().add(new Vector3(0, 0.0, 0.5 + (i % 3) * 0.15)).lerp(p0, 0.35);
    const c2 = mid.clone().add(new Vector3(0, 0.0, 0.5 + (i % 3) * 0.15)).lerp(p1, 0.35);
    return { a, b, curve: new CubicBezierCurve3(p0, c1, c2, p1), speed: 0.12 + (i % 4) * 0.03, offset: (i * 0.173) % 1 };
  }), [byId]);

  useFrame((s, dt) => {
    const g = group.current; if (!g) return;
    const p = progress?.get?.() ?? 0, t = s.clock.elapsedTime;
    // Hold still while a node is hovered so it never slides out from under the cursor.
    if (hoverRef.current === null) {
      g.rotation.y = damp(g.rotation.y, target.current.x * 0.26 + Math.sin(t * 0.25) * 0.06, 2.5, dt);
      g.rotation.x = damp(g.rotation.x, target.current.y * 0.14, 2.5, dt);
    }
    g.position.y = damp(g.position.y, p * 1.4, 4, dt);
    g.scale.setScalar(damp(g.scale.x, 1 - p * 0.25, 4, dt));
    s.camera.position.z = damp(s.camera.position.z, 9.6 + p * 2.2, 3, dt);
  });

  const connected = hover ? new Set(edges.filter((e) => e.a === hover || e.b === hover).flatMap((e) => [e.a, e.b])) : null;
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 6]} intensity={55} color="#ff7a45" />
      <pointLight position={[-5, -2, 5]} intensity={40} color="#2dd4bf" />
      <Shell />
      <Dust count={small ? 160 : 380} />
      <group ref={group}>
        {edges.map((e) => <Edge key={e.a + e.b} curve={e.curve} lit={hover && (e.a === hover || e.b === hover)} dim={!!hover && !(e.a === hover || e.b === hover)} speed={e.speed} offset={e.offset} />)}
        {nodes.map((n) => <NodeDot key={n.id} n={n} hovered={hover === n.id} dimmed={!!connected && !connected.has(n.id)} onHover={setHover} onGo={(h) => router.push(h)} />)}
      </group>
    </>
  );
}

export default function HeroScene({ nodes, progress, active, onReady, onFail }) {
  const small = isSmallScreen();
  const [dpr, setDpr] = useState(small ? 1.1 : 1.5);
  return (
    <Canvas dpr={dpr} camera={{ position: [0, 0, 9.6], fov: 38 }} frameloop={active ? "always" : "never"}
      gl={{ antialias: !small, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.domElement.addEventListener("webglcontextlost", (e) => { e.preventDefault(); onFail?.(); });
        onReady?.();
      }}>
      <AdaptiveQuality min={1} max={small ? 1.25 : 1.5} onDpr={setDpr} onFail={onFail} />
      <Graph nodes={nodes} progress={progress} small={small} />
    </Canvas>
  );
}
