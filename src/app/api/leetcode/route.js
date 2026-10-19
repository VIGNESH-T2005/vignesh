import { NextResponse } from "next/server";
import { SITE } from "@/data/site";

export const revalidate = 3600;

const USER = SITE.socials.leetcode.user;
const BASE = "https://alfa-leetcode-api.onrender.com"; // community API, may be slow or down

async function getJson(path) {
  const res = await fetch(`${BASE}/${USER}${path}`, {
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(6000),
  });
  if (!res.ok) throw new Error(`LeetCode API ${res.status}`);
  return res.json();
}

// Never returns invented numbers: if the upstream API fails, `available` is false.
export async function GET() {
  try {
    const [solved, profile] = await Promise.allSettled([getJson("/solved"), getJson("")]);
    if (solved.status !== "fulfilled" || typeof solved.value?.solvedProblem !== "number") {
      return NextResponse.json({ available: false });
    }
    const s = solved.value;
    return NextResponse.json({
      available: true,
      total: s.solvedProblem,
      easy: s.easySolved ?? 0,
      medium: s.mediumSolved ?? 0,
      hard: s.hardSolved ?? 0,
      ranking: profile.status === "fulfilled" && typeof profile.value?.ranking === "number" ? profile.value.ranking : null,
    });
  } catch {
    return NextResponse.json({ available: false });
  }
}
