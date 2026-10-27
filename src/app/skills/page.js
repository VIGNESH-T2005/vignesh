import { PageHeader, Section } from "@/components/ui";
import SkillsExplorer from "@/components/SkillsExplorer";
import CountUp from "@/components/CountUp";
import { ALL_SKILLS, SKILL_GROUPS } from "@/data/skills";

export const metadata = { title: "Skills", description: "Technologies Vignesh T uses across full-stack projects, each linked to the projects where it was applied." };

export default function Skills() {
  const skills = ALL_SKILLS.map((s) => ({ name: s.name, note: s.note, group: s.group, tier: s.tier, projects: s.projects.map((p) => ({ slug: p.slug, title: p.title })) }));
  const n = (t) => skills.filter((s) => s.tier === t).length;
  return (
    <>
      <PageHeader eyebrow="Skills" title="Technical *expertise*" crumbs={[["/", "Home"], [null, "Skills"]]}>Languages, frameworks, databases and tools, each linked to the projects where I put it to work.</PageHeader>
      <Section className="pt-0">
        <dl className="mb-10 grid grid-cols-3 gap-6">
          {[["Core", n("Core")], ["Working", n("Working")], ["Learning", n("Learning")]].map(([k, v]) => (
            <div key={k} className="border-l border-line-2 pl-5"><dt className="eyebrow text-muted">{k}</dt><dd className="display gradient-text mt-2 text-[clamp(2.4rem,6vw,5rem)]"><CountUp value={v} /></dd></div>
          ))}
        </dl>
        <SkillsExplorer skills={skills} groups={SKILL_GROUPS.map((g) => g.title)} />
      </Section>
    </>
  );
}
