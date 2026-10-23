import { ButtonLink } from "@/components/ui";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="relative mx-auto max-w-7xl overflow-hidden px-5 py-24 text-center sm:px-8">
      <p aria-hidden="true" className="display outline-text select-none text-[clamp(8rem,34vw,26rem)] leading-none">404</p>
      <h1 className="display -mt-6 text-[clamp(2rem,5vw,4rem)] sm:-mt-12">This page <em className="serif-i gradient-text pr-2 font-normal">wandered off.</em></h1>
      <p className="mx-auto mt-4 max-w-md text-muted">The link may be outdated. Try the search or head back to the work.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3"><ButtonLink href="/">Home</ButtonLink><ButtonLink href="/projects" variant="ghost">Projects</ButtonLink><ButtonLink href="/command" variant="ghost">Search</ButtonLink></div>
    </section>
  );
}
