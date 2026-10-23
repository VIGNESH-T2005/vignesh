import Link from "next/link";
import { PageHeader, Section, Tag } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { LEARNING } from "@/data/journey";
import { gh } from "@/data/repos";
import { fmtDate } from "@/lib/cache";

export const metadata = { title: "Learning timeline", description: "How Vignesh T's skills developed from HTML/CSS/JS apps to a .NET full-stack platform, repository by repository." };

export default function Learning() {
  return (
    <>
      <PageHeader index="08" eyebrow="Learning" title="The route from *basics* to full-stack" crumbs={[["/", "Home"], [null, "Learning timeline"]]}>Twelve steps from my first HTML, CSS and JavaScript apps to a payment-enabled platform, each tied to the repository where I practised it.</PageHeader>
      <Section className="pt-0">
        <ol className="relative">
          <span aria-hidden="true" className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-accent via-line-2 to-transparent md:left-1/2" />
          {LEARNING.map((l, i) => {
            const right = i % 2 === 1;
            return (
              <Reveal as="li" key={l.title} from={right ? "right" : "left"} className="relative mb-10 pl-12 md:mb-0 md:grid md:grid-cols-2 md:gap-16 md:pl-0">
                <span aria-hidden="true" className="absolute left-[10px] top-6 z-10 h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg shadow-[0_0_14px_var(--accent)] md:left-1/2 md:-translate-x-1/2" />
                <div className={`md:py-6 ${right ? "md:col-start-2" : "md:text-right"}`}>
                  <div data-spot className="spot rounded-3xl border border-line bg-surface/70 p-6 text-left">
                    <div className={`flex flex-wrap items-center gap-3 ${right ? "" : "md:justify-end"}`}><span className="font-mono text-xs text-accent">{fmtDate(l.date)}</span><Tag>{l.topic}</Tag></div>
                    <h2 className="display mt-3 text-2xl">{l.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{l.detail}</p>
                    <a href={gh(l.repo)} target="_blank" rel="noopener noreferrer" className="u-link mt-3 inline-block font-mono text-xs text-accent">{l.repo}<span className="sr-only"> (opens in a new tab)</span></a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
        <p className="mt-12 text-sm text-muted">Explore the <Link href="/github" className="u-link text-accent">full repository list</Link> or the <Link href="/projects" className="u-link text-accent">project case studies</Link>.</p>
      </Section>
    </>
  );
}
