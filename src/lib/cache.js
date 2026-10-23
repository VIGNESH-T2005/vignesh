// Tiny "last good value" cache so API routes can serve stale data when an upstream service fails.
const store = new Map();
export const remember = (key, value) => store.set(key, { value, at: Date.now() });
export const recall = (key) => store.get(key) ?? null;
export const fmtDate = (iso) => (iso ? new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }) : "");
export const fmtMonth = (iso) => (iso ? new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" }) : "");
