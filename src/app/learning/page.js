import Link from "next/link";
import { PageHeader, Section } from "@/components/ui";
import Timeline from "@/components/Timeline";
import { LEARNING } from "@/data/journey";
import { gh } from "@/data/repos";

export const metadata = { title: "Learning timeline", description: "How Vignesh T's skills developed from HTML/CSS/JS apps to a .NET full-stack platform, repository by repository." };

export default function Learning() {
  return (
    <>
      <PageHeader eyebrow="Learning" title="How my skills grew, repo by repo" crumbs={[["/", "Home"], [null, "Learning timeline"]]}>Each step links to the repository where I practised it. Dates are first-commit dates.</PageHeader>
      <Section>
        <Timeline items={LEARNING.map((l) => ({ date: l.date, tag: l.topic, title: l.title, detail: l.detail, children: <a href={gh(l.repo)} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-mono text-xs text-accent hover:underline">{l.repo}<span className="sr-only"> (opens in a new tab)</span></a> }))} />
        <p className="mt-10 text-sm text-muted">Want the full picture? See the <Link href="/github" className="text-accent hover:underline">repository explorer</Link> or the <Link href="/projects" className="text-accent hover:underline">project case studies</Link>.</p>
      </Section>
    </>
  );
}
