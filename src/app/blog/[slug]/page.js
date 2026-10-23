import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS, getPost, readingMinutes } from "@/data/blog";
import { getProject } from "@/data/projects";
import { Tag, rich } from "@/components/ui";
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
  const idx = POSTS.findIndex((x) => x.slug === slug);
  const next = POSTS[(idx + 1) % POSTS.length];
  const leadIndex = p.body.findIndex((b) => b.t === "p");
  return (
    <>
      <header className="mx-auto max-w-4xl px-5 pb-10 pt-14 sm:px-8 sm:pt-20">
        <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs text-muted"><ol className="flex flex-wrap gap-2"><li><Link href="/" className="u-link hover:text-fg">Home</Link></li><li aria-hidden="true">/</li><li><Link href="/blog" className="u-link hover:text-fg">Engineering notes</Link></li><li aria-hidden="true">/</li><li aria-current="page" className="text-fg">Note</li></ol></nav>
        <p className="eyebrow">{fmtDate(p.date)} · {readingMinutes(p)} min read</p>
        <h1 className="display mt-4 text-[clamp(2.4rem,6.5vw,5rem)]">{p.title}</h1>
        <p className="serif-i mt-6 text-3xl leading-snug text-fg/90">{rich(p.summary)}</p>
        <ul className="mt-6 flex flex-wrap gap-1.5">{p.tags.map((t) => <li key={t}><Tag>{t}</Tag></li>)}</ul>
      </header>
      <article className="mx-auto max-w-3xl px-5 pb-10 sm:px-8">
        {p.body.map((b, i) => {
          if (b.t === "h") return <h2 key={i} className="display mb-3 mt-14 text-3xl">{b.v}</h2>;
          if (b.t === "code") return <pre key={i} className="my-6 overflow-x-auto rounded-2xl border border-line-2 bg-surface p-5 font-mono text-[13px] leading-relaxed text-accent-2"><code>{b.v}</code></pre>;
          if (b.t === "ul") return <ul key={i} className="my-5 space-y-2 text-lg text-muted">{b.v.map((x) => <li key={x} className="flex gap-3"><span className="mt-3 h-px w-5 shrink-0 bg-accent" aria-hidden="true" />{x}</li>)}</ul>;
          const lead = i === leadIndex;
          return <p key={i} className={`my-5 leading-relaxed ${lead ? "text-xl text-fg/90" : "text-lg text-muted"}`}>{b.v}</p>;
        })}
        {proj ? <p className="glass mt-12 rounded-3xl p-6 text-muted">Read the full case study: <Link href={`/projects/${proj.slug}`} className="u-link font-semibold text-accent">{proj.title}</Link></p> : null}
      </article>
      <Link href={`/blog/${next.slug}`} className="group mx-auto mt-16 block max-w-4xl border-t border-line px-5 py-14 sm:px-8">
        <p className="eyebrow text-muted">Next note</p>
        <p className="display mt-3 text-[clamp(1.8rem,4.5vw,3.4rem)] transition-colors group-hover:text-accent">{next.title}</p>
      </Link>
    </>
  );
}
