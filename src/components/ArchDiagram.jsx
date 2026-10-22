// Renders a layered architecture diagram from data (no diagram library).
const COL_W = 200, GAP_X = 64, NODE_H = 60, GAP_Y = 16, PAD = 16, TOP = 34;

function wrap(text, max = 30) {
  if (text.length <= max) return [text];
  const cut = text.lastIndexOf(" ", max);
  return [text.slice(0, cut > 0 ? cut : max), text.slice(cut > 0 ? cut + 1 : max)];
}

export default function ArchDiagram({ arch, title }) {
  const { layers, links, caption } = arch;
  const maxN = Math.max(...layers.map((l) => l.nodes.length));
  const H = TOP + maxN * NODE_H + (maxN - 1) * GAP_Y + PAD;
  const W = PAD * 2 + layers.length * COL_W + (layers.length - 1) * GAP_X;
  const pos = {};
  layers.forEach((l, i) => {
    const layerH = l.nodes.length * NODE_H + (l.nodes.length - 1) * GAP_Y;
    const off = TOP + (maxN * NODE_H + (maxN - 1) * GAP_Y - layerH) / 2;
    l.nodes.forEach((n, j) => { pos[n.id] = { x: PAD + i * (COL_W + GAP_X), y: off + j * (NODE_H + GAP_Y), n }; });
  });

  return (
    <figure className="rounded-2xl border border-line bg-surface p-4">
      <div className="overflow-x-auto">
        <svg role="img" aria-label={`${title} architecture diagram. ${caption}`} viewBox={`0 0 ${W} ${H}`} style={{ minWidth: Math.min(W, 760), width: "100%" }}>
          <defs>
            <marker id="arr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 8 4 0 8z" fill="var(--accent)" /></marker>
          </defs>
          {layers.map((l, i) => (
            <text key={l.label} x={PAD + i * (COL_W + GAP_X)} y={20} fontSize="11" fill="var(--accent)" fontFamily="var(--font-mono)" letterSpacing="1.2">{l.label.toUpperCase()}</text>
          ))}
          {links.map(([a, b]) => {
            const s = pos[a], t = pos[b];
            if (!s || !t) return null;
            const x1 = s.x + COL_W, y1 = s.y + NODE_H / 2, x2 = t.x, y2 = t.y + NODE_H / 2, dx = Math.max(24, (x2 - x1) / 2);
            return <path key={a + b} d={`M${x1} ${y1} C${x1 + dx} ${y1} ${x2 - dx} ${y2} ${x2 - 2} ${y2}`} fill="none" stroke="var(--accent)" strokeOpacity="0.55" strokeWidth="1.5" markerEnd="url(#arr)" />;
          })}
          {Object.values(pos).map(({ x, y, n }) => {
            const sub = wrap(n.sub);
            return (
              <g key={n.id}>
                <rect x={x} y={y} width={COL_W} height={NODE_H} rx="10" fill="var(--surface-2)" stroke="var(--line)" />
                <text x={x + 12} y={y + 23} fontSize="13" fontWeight="600" fill="var(--fg)">{n.title}</text>
                {sub.map((line, k) => <text key={k} x={x + 12} y={y + 38 + k * 13} fontSize="10.5" fill="var(--muted)">{line}</text>)}
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>
    </figure>
  );
}
