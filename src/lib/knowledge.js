import { SITE, ABOUT } from "@/data/site";
import { PROJECTS, projectStats } from "@/data/projects";
import { ALL_SKILLS } from "@/data/skills";
import { EXPERIENCE, EDUCATION, CERTIFICATIONS, ACHIEVEMENTS } from "@/data/journey";
import { ALL_REPOS, TOTALS } from "@/data/repos";

// Plain-text knowledge base for the AI assistant, generated from the same data as the pages.
export function buildKnowledgeBase() {
  const skills = ALL_SKILLS.map((s) => `${s.name} (${s.tier}; used in ${s.projects.map((p) => p.title).join(", ")})`).join("\n");
  const projects = PROJECTS.map((p) => {
    const st = projectStats(p);
    return `${p.title} [${p.category}, ${p.status}]: ${p.summary}\nStack: ${p.stack.join(", ")}\nFeatures: ${p.features.join("; ")}\nLimitations: ${(p.limitations ?? []).join(" ") || "none noted"}\nCommits: ${st.commits}; GitHub: ${p.repos.map((r) => `https://github.com/VIGNESH-T2005/${r.name}`).join(", ")}${p.live ? `; Live: ${p.live}` : ""}`;
  }).join("\n\n");
  const repos = ALL_REPOS.map((r) => `${r.name}: ${r.category}, ${r.status}. ${r.summary}`).join("\n");
  return `NAME: ${SITE.name}
ROLE: ${SITE.role}; ${SITE.availability}
SUMMARY: ${SITE.intro}
ABOUT: ${ABOUT.paragraphs.join(" ")}
GITHUB TOTALS: ${TOTALS.repos} public repositories, ${TOTALS.commits} commits since ${TOTALS.since}

SKILLS (Core = used in a deployed project or many repositories; Working = used in a project; Learning = practice only)
${skills}

PROJECTS
${projects}

ALL REPOSITORIES
${repos}

EXPERIENCE
${EXPERIENCE.map((e) => `${e.period}: ${e.role}, ${e.org}. ${e.summary}`).join("\n")}

EDUCATION
${EDUCATION.map((e) => `${e.period}: ${e.title}, ${e.place} (${e.detail})`).join("\n")}
CERTIFICATIONS: ${CERTIFICATIONS.map((c) => `${c.title} (${c.issuer}, ${c.year})`).join("; ")}
ACHIEVEMENTS: ${ACHIEVEMENTS.map((a) => `${a.title} (${a.org})`).join("; ")}

CONTACT: ${SITE.email}; GitHub ${SITE.socials.github.href}; LinkedIn ${SITE.socials.linkedin.href}; LeetCode ${SITE.socials.leetcode.href}
RESUME: ${SITE.url}${SITE.resume}
SITE PAGES: /projects, /skills, /experience, /education, /achievements, /coding, /github, /blog, /recruiter, /contact`;
}
