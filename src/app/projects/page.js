import { PageHeader, Section } from "@/components/ui";
import ProjectExplorer from "@/components/ProjectExplorer";
import { projectSummaries } from "@/lib/summaries";
import { CATEGORIES } from "@/data/projects";

export const metadata = { title: "Projects", description: "All projects by Vignesh T with search, category filters and sorting: HRC TECH, Shop-Zone, Power BI dashboards, Java practice and more." };

export default function Projects() {
  return (
    <>
      <PageHeader eyebrow="Projects" title="Everything I've built" crumbs={[["/", "Home"], [null, "Projects"]]}>Each entry maps to a real GitHub repository and is classified honestly: full-stack apps, frontend apps, Java practice, data analytics and learning repositories.</PageHeader>
      <Section><ProjectExplorer projects={projectSummaries()} categories={CATEGORIES} /></Section>
    </>
  );
}
