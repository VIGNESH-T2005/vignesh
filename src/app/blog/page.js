import Link from "next/link";
import { PageHeader, Section, Tag } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { ArrowUpRightIcon } from "@/components/Icons";
import { POSTS, readingMinutes } from "@/data/blog";
import { fmtDate } from "@/lib/cache";

export const metadata = { title: "Engineering notes", description: "Short engineering write-ups from Vignesh T's projects: content protection, Stripe webhooks and building a Node API." };

export default function Blog() {
  return (
    <>
      <PageHeader index="11" eyebrow="Engineering notes" title="How the *hard parts* work" crumbs={[["/", "Home"], [null, "Engineering notes"]]}>Short write-ups on the engineering behind my projects: securing paid content, handling payments safely and building APIs.</PageHeader>
      <Section className="pt-0">
        <ul className="border-t border-line">
          {POSTS.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 0.07} className="border-b border-line">
              <article className="group relative grid items-start gap-4 py-10 transition-all hover:pl-4 md:grid-cols-[5rem_1.7fr_1fr]">
                <span className="display outline-text text-5xl">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="display text-[clamp(1.7rem,3.4vw,2.6rem)] transition-colors group-hover:text-accent"><Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0 after:content-['']">{p.title}</Link></h2>
                  <p className="mt-3 max-w-xl text-muted">{p.summary}</p>
                </div>
                <div className="flex flex-col gap-3 md:items-end">
                  <p className="font-mono text-xs text-muted">{fmtDate(p.date)} · {readingMinutes(p)} min read</p>
                  <ul className="flex flex-wrap gap-1.5 md:justify-end">{p.tags.map((t) => <li key={t}><Tag>{t}</Tag></li>)}</ul>
                  <ArrowUpRightIcon className="hidden text-muted transition group-hover:text-accent md:block" />
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Section>
    </>
  );
}
