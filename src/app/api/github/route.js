import { NextResponse } from "next/server";
import { SITE } from "@/data/site";

export const revalidate = 3600;

const USER = SITE.socials.github.user;

async function gh(path) {
  const headers = { Accept: "application/vnd.github+json", "User-Agent": "portfolio" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`; // optional, raises rate limit
  const res = await fetch(`https://api.github.com${path}`, { headers, next: { revalidate: 3600 }, signal: AbortSignal.timeout(6000) });
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  return res.json();
}

// Never returns invented numbers: any upstream failure yields { available: false }.
export async function GET() {
  try {
    const [user, repos] = await Promise.all([gh(`/users/${USER}`), gh(`/users/${USER}/repos?per_page=100&type=owner`)]);
    const own = repos.filter((r) => !r.fork);
    const languages = {};
    own.forEach((r) => r.language && (languages[r.language] = (languages[r.language] || 0) + 1));
    const topLanguages = Object.entries(languages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    return NextResponse.json({
      available: true,
      publicRepos: user.public_repos,
      followers: user.followers,
      stars: own.reduce((sum, r) => sum + (r.stargazers_count || 0), 0),
      topLanguages,
    });
  } catch {
    return NextResponse.json({ available: false });
  }
}
