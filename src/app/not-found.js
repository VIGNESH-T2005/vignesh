import { ButtonLink } from "@/components/ui";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="relative mx-auto max-w-7xl overflow-hidden px-5 py-24 text-center sm:px-8">
      <p aria-hidden="true" className="display outline-text big-outline select-none leading-none">404</p>
      <h1 className="display -mt-6 text-[clamp(2rem,5vw,4rem)] sm:-mt-12">This page <span className="gradient-text">wandered off.</span></h1>
      <p className="mx-auto mt-4 max-w-md text-muted">The link may be outdated. Try the search or head back to the work.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3"><ButtonLink href="/">Home</ButtonLink><ButtonLink href="/projects" variant="ghost">Projects</ButtonLink><ButtonLink href="/command" variant="ghost">Search</ButtonLink></div>
    </section>
  );
}
