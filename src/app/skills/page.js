import { PageHeader, Section, StatTile } from "@/components/ui";
import SkillsExplorer from "@/components/SkillsExplorer";
import { ALL_SKILLS, SKILL_GROUPS } from "@/data/skills";

export const metadata = { title: "Skills", description: "Evidence-based skills of Vignesh T, each linked to the projects where it was actually used." };

export default function Skills() {
  const skills = ALL_SKILLS.map((s) => ({ name: s.name, note: s.note, group: s.group, tier: s.tier, projects: s.projects.map((p) => ({ slug: p.slug, title: p.title })) }));
  const n = (t) => skills.filter((s) => s.tier === t).length;
  return (
    <>
      <PageHeader eyebrow="Skills" title="Skills backed by real projects" crumbs={[["/", "Home"], [null, "Skills"]]}>No percentage bars. Every skill lists the projects where I used it, and its tier is computed from that evidence.</PageHeader>
      <Section>
        <div className="mb-8 grid grid-cols-3 gap-4"><StatTile label="Core" value={n("Core")} /><StatTile label="Working" value={n("Working")} /><StatTile label="Practice" value={n("Practice")} /></div>
        <SkillsExplorer skills={skills} groups={SKILL_GROUPS.map((g) => g.title)} />
      </Section>
    </>
  );
}
