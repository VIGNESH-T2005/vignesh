import { Suspense } from "react";
import { PageHeader, Section } from "@/components/ui";
import CommandCenter from "@/components/CommandCenter";

export const metadata = { title: "Search", description: "Search every project, repository, skill, note and page on this portfolio." };

export default function Command() {
  return (
    <>
      <PageHeader index="14" eyebrow="Search" title="Find *anything*" crumbs={[["/", "Home"], [null, "Search"]]}>Projects, repositories, skills, notes and pages in one search box. Press Ctrl/Cmd + K from anywhere.</PageHeader>
      <Section className="pt-0"><Suspense fallback={<p className="text-muted">Loading…</p>}><CommandCenter /></Suspense></Section>
    </>
  );
}
