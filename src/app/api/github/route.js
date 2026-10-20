import { SITE } from "@/data/site";
import { remember, recall } from "@/lib/cache";

export const dynamic = "force-dynamic"; // never prerendered; cached by the CDN via headers below

const USER = SITE.socials.github.user;
const OK = { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" };
const NO = { "Cache-Control": "no-store" };

async function gh(path) {
  const headers = { Accept: "application/vnd.github+json", "User-Agent": "portfolio-site" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`; // optional
  const res = await fetch(`https://api.github.com${path}`, { headers, signal: AbortSignal.timeout(7000) });
  if (!res.ok) throw new Error(`GitHub ${res.status}`);
  return res.json();
}

function describe(e) {
  const repo = e.repo?.name?.replace(`${USER}/`, "") ?? "";
  switch (e.type) {
    case "PushEvent": { const n = e.payload?.size ?? e.payload?.commits?.length ?? 1; return `Pushed ${n} commit${n === 1 ? "" : "s"} to ${repo}`; }
    case "CreateEvent": return `Created ${e.payload?.ref_type ?? "repository"} ${e.payload?.ref ?? repo}`;
    case "PullRequestEvent": return `${e.payload?.action ?? "Updated"} a pull request in ${repo}`;
    case "IssuesEvent": return `${e.payload?.action ?? "Updated"} an issue in ${repo}`;
    case "WatchEvent": return `Starred ${repo}`;
    case "ForkEvent": return `Forked ${repo}`;
    default: return `${e.type.replace("Event", "")} in ${repo}`;
  }
}

export async function GET() {
  try {
    const [user, repos, events] = await Promise.all([
      gh(`/users/${USER}`),
      gh(`/users/${USER}/repos?per_page=100&type=owner&sort=pushed`),
      gh(`/users/${USER}/events/public?per_page=30`).catch(() => []),
    ]);
    const own = repos.filter((r) => !r.fork);
    const langs = {};
    own.forEach((r) => r.language && (langs[r.language] = (langs[r.language] || 0) + 1));
    const data = {
      available: true,
      stale: false,
      fetchedAt: new Date().toISOString(),
      user: { publicRepos: user.public_repos, followers: user.followers, following: user.following, createdAt: user.created_at },
      totals: { stars: own.reduce((s, r) => s + r.stargazers_count, 0), forks: own.reduce((s, r) => s + r.forks_count, 0) },
      languages: Object.entries(langs).sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count })),
      repos: own.map((r) => ({ name: r.name, stars: r.stargazers_count, forks: r.forks_count, language: r.language, pushedAt: r.pushed_at, size: r.size })),
      events: events.slice(0, 8).map((e) => ({ id: e.id, text: describe(e), at: e.created_at })),
    };
    remember("github", data);
    return Response.json(data, { headers: OK });
  } catch {
    const last = recall("github");
    if (last) return Response.json({ ...last.value, stale: true }, { headers: NO });
    return Response.json({ available: false }, { headers: NO });
  }
}
