import { Suspense } from "react";
import { PageHeader, Section } from "@/components/ui";
import CommandCenter from "@/components/CommandCenter";

export const metadata = { title: "Command center", description: "Search every project, repository, skill, note and page on this portfolio." };

export default function Command() {
  return (
    <>
      <PageHeader eyebrow="Command center" title="Search everything" crumbs={[["/", "Home"], [null, "Command center"]]}>One search box for every project, repository, skill, engineering note and page.</PageHeader>
      <Section><Suspense fallback={<p className="text-muted">Loading…</p>}><CommandCenter /></Suspense></Section>
    </>
  );
}
