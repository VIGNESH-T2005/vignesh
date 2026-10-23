import { PageHeader, Section } from "@/components/ui";
import ProjectExplorer from "@/components/ProjectExplorer";
import { projectSummaries } from "@/lib/summaries";
import { CATEGORIES } from "@/data/projects";

export const metadata = { title: "Projects", description: "All projects by Vignesh T with search, category filters and sorting: HRC TECH, Shop-Zone, Power BI dashboards, Java practice and more." };

export default function Projects() {
  return (
    <>
      <PageHeader index="02" eyebrow="Projects" title="Everything I've *shipped*" crumbs={[["/", "Home"], [null, "Projects"]]}>Full-stack platforms, frontend apps, Java training projects, analytics dashboards and the practice repositories behind them.</PageHeader>
      <Section className="pt-0"><ProjectExplorer projects={projectSummaries()} categories={CATEGORIES} /></Section>
    </>
  );
}
