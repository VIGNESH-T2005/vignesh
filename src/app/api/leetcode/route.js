import { SITE } from "@/data/site";
import { remember, recall } from "@/lib/cache";

export const dynamic = "force-dynamic";

const USER = SITE.socials.leetcode.user;
const OK = { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" };
const NO = { "Cache-Control": "no-store" };

const QUERY = `query u($username:String!){
  matchedUser(username:$username){
    profile{ranking}
    submitStatsGlobal{acSubmissionNum{difficulty count}}
    userCalendar{streak totalActiveDays submissionCalendar}
  }
  recentAcSubmissionList(username:$username, limit:8){title titleSlug timestamp}
}`;

async function official() {
  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json", Referer: "https://leetcode.com/", "User-Agent": "Mozilla/5.0 portfolio-site" },
    body: JSON.stringify({ query: QUERY, variables: { username: USER } }),
    signal: AbortSignal.timeout(7000),
  });
  if (!res.ok) throw new Error(`LeetCode ${res.status}`);
  const { data } = await res.json();
  const m = data?.matchedUser;
  if (!m) throw new Error("no user");
  const by = Object.fromEntries(m.submitStatsGlobal.acSubmissionNum.map((x) => [x.difficulty, x.count]));
  let calendar = {};
  try {
    for (const [ts, n] of Object.entries(JSON.parse(m.userCalendar?.submissionCalendar ?? "{}"))) calendar[new Date(Number(ts) * 1000).toISOString().slice(0, 10)] = n;
  } catch { calendar = {}; }
  return {
    source: "leetcode",
    total: by.All ?? 0, easy: by.Easy ?? 0, medium: by.Medium ?? 0, hard: by.Hard ?? 0,
    ranking: m.profile?.ranking ?? null,
    streak: m.userCalendar?.streak ?? null,
    activeDays: m.userCalendar?.totalActiveDays ?? null,
    calendar,
    recent: (data.recentAcSubmissionList ?? []).map((s) => ({ title: s.title, slug: s.titleSlug, at: Number(s.timestamp) * 1000 })),
  };
}

// Community API: counts only. Used when the official endpoint is unreachable.
async function community() {
  const res = await fetch(`https://alfa-leetcode-api.onrender.com/${USER}/solved`, { signal: AbortSignal.timeout(6000) });
  if (!res.ok) throw new Error(`alfa ${res.status}`);
  const s = await res.json();
  if (typeof s.solvedProblem !== "number") throw new Error("bad shape");
  return { source: "community-api", total: s.solvedProblem, easy: s.easySolved ?? 0, medium: s.mediumSolved ?? 0, hard: s.hardSolved ?? 0, ranking: null, streak: null, activeDays: null, calendar: {}, recent: [] };
}

export async function GET() {
  for (const fn of [official, community]) {
    try {
      const data = { available: true, stale: false, fetchedAt: new Date().toISOString(), ...(await fn()) };
      remember("leetcode", data);
      return Response.json(data, { headers: OK });
    } catch { /* try the next source */ }
  }
  const last = recall("leetcode");
  if (last) return Response.json({ ...last.value, stale: true }, { headers: NO });
  return Response.json({ available: false }, { headers: NO });
}
