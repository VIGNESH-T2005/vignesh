import Link from "next/link";
import { PageHeader, Section, Tag } from "@/components/ui";
import { POSTS, readingMinutes } from "@/data/blog";
import { fmtDate } from "@/lib/cache";

export const metadata = { title: "Engineering notes", description: "Short engineering write-ups on how Vignesh T's projects work: content protection, Stripe webhooks, a Node API and portfolio architecture." };

export default function Blog() {
  return (
    <>
      <PageHeader eyebrow="Engineering notes" title="How my projects work" crumbs={[["/", "Home"], [null, "Engineering notes"]]}>Each note explains code that exists in one of my repositories. No theory pieces, no borrowed claims.</PageHeader>
      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {POSTS.map((p) => (
            <article key={p.slug} className="relative rounded-2xl border border-line bg-surface p-6 transition hover:border-accent">
              <p className="font-mono text-xs text-accent">{fmtDate(p.date)} · {readingMinutes(p)} min read</p>
              <h2 className="mt-2 text-xl font-bold"><Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0 after:content-['']">{p.title}</Link></h2>
              <p className="mt-2 text-sm text-muted">{p.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">{p.tags.map((t) => <li key={t}><Tag>{t}</Tag></li>)}</ul>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
