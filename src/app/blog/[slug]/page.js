import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS, getPost, readingMinutes } from "@/data/blog";
import { getProject } from "@/data/projects";
import { PageHeader, Section, Tag } from "@/components/ui";
import { fmtDate } from "@/lib/cache";

export const dynamicParams = false;
export const generateStaticParams = () => POSTS.map((p) => ({ slug: p.slug }));
export async function generateMetadata({ params }) {
  const { slug } = await params; const p = getPost(slug);
  return p ? { title: p.title, description: p.summary, alternates: { canonical: `/blog/${p.slug}` }, openGraph: { type: "article", publishedTime: p.date } } : {};
}

export default async function Post({ params }) {
  const { slug } = await params; const p = getPost(slug);
  if (!p) notFound();
  const proj = getProject(p.project);
  return (
    <>
      <PageHeader eyebrow={`${fmtDate(p.date)} · ${readingMinutes(p)} min read`} title={p.title} crumbs={[["/", "Home"], ["/blog", "Engineering notes"], [null, "Note"]]}>{p.summary}</PageHeader>
      <article className="mx-auto max-w-3xl px-4 pb-10 sm:px-6">
        {p.body.map((b, i) =>
          b.t === "h" ? <h2 key={i} className="mb-3 mt-10 text-2xl font-bold">{b.v}</h2>
          : b.t === "code" ? <pre key={i} className="my-5 overflow-x-auto rounded-xl border border-line bg-surface p-4 font-mono text-sm leading-relaxed"><code>{b.v}</code></pre>
          : b.t === "ul" ? <ul key={i} className="my-4 list-disc space-y-1.5 pl-6 text-muted">{b.v.map((x) => <li key={x}>{x}</li>)}</ul>
          : <p key={i} className="my-4 text-lg leading-relaxed text-muted">{b.v}</p>)}
        <ul className="mt-8 flex flex-wrap gap-1.5">{p.tags.map((t) => <li key={t}><Tag>{t}</Tag></li>)}</ul>
        {proj ? <p className="mt-8 rounded-2xl border border-line bg-surface p-5 text-sm text-muted">Read the full case study: <Link href={`/projects/${proj.slug}`} className="font-semibold text-accent hover:underline">{proj.title}</Link></p> : null}
      </article>
      <Section><Link href="/blog" className="text-accent hover:underline">All engineering notes</Link></Section>
    </>
  );
}
