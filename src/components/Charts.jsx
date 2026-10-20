// Dependency-free charts: commit heatmap and horizontal bar lists.
const DAY = 86400000;
const LEVELS = ["var(--surface-2)", "rgba(96,165,250,.28)", "rgba(96,165,250,.5)", "rgba(96,165,250,.75)", "var(--accent)"];
const lvl = (n) => (n === 0 ? 0 : n <= 2 ? 1 : n <= 5 ? 2 : n <= 9 ? 3 : 4);

export function Heatmap({ daily, label = "commits", from, to }) {
  const keys = Object.keys(daily).sort();
  if (!keys.length) return null;
  const start = new Date((from ?? keys[0]) + "T00:00:00Z");
  start.setUTCDate(start.getUTCDate() - start.getUTCDay()); // back to Sunday
  const end = new Date((to ?? keys[keys.length - 1]) + "T00:00:00Z");
  const weeks = Math.ceil((end - start) / DAY / 7) + 1;
  const cells = [];
  const months = [];
  let total = 0, active = 0, max = 0;
  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < 7; d++) {
      const date = new Date(start.getTime() + (w * 7 + d) * DAY);
      if (date > end) continue;
      const iso = date.toISOString().slice(0, 10);
      const n = daily[iso] ?? 0;
      total += n; if (n) active++; max = Math.max(max, n);
      cells.push({ w, d, iso, n });
      if (d === 0 && date.getUTCDate() <= 7) months.push({ w, m: date.toLocaleString("en-GB", { month: "short", timeZone: "UTC" }) });
    }
  }
  const S = 12, G = 3, left = 28;
  return (
    <figure>
      <div className="overflow-x-auto pb-2">
        <svg role="img" aria-label={`Activity heatmap: ${total} ${label} on ${active} days, busiest day ${max}`} width={left + weeks * (S + G)} height={7 * (S + G) + 22}>
          {months.map((m) => <text key={m.w + m.m} x={left + m.w * (S + G)} y={10} fontSize="10" fill="var(--muted)">{m.m}</text>)}
          {["Mon", "Wed", "Fri"].map((t, i) => <text key={t} x={0} y={22 + (i * 2 + 1) * (S + G) + 9} fontSize="9" fill="var(--muted)">{t}</text>)}
          {cells.map((c) => (
            <rect key={c.iso} x={left + c.w * (S + G)} y={18 + c.d * (S + G)} width={S} height={S} rx="2" fill={LEVELS[lvl(c.n)]} stroke="var(--line)" strokeOpacity=".4">
              <title>{`${c.iso}: ${c.n} ${label}`}</title>
            </rect>
          ))}
        </svg>
      </div>
      <figcaption className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
        <span>{total} {label} on {active} active days</span>
        <span className="flex items-center gap-1">Less {LEVELS.map((c) => <span key={c} className="inline-block h-3 w-3 rounded-sm border border-line" style={{ background: c }} />)} More</span>
      </figcaption>
    </figure>
  );
}

export function BarList({ items, unit = "", max }) {
  const top = max ?? Math.max(...items.map((i) => i.value), 1);
  return (
    <ul className="space-y-3">
      {items.map((i) => (
        <li key={i.label}>
          <div className="flex justify-between text-sm"><span>{i.label}</span><span className="font-mono text-muted">{i.value.toLocaleString("en-IN")}{unit}</span></div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-surface-2" role="presentation">
            <div className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2" style={{ width: `${Math.max(3, (i.value / top) * 100)}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}
