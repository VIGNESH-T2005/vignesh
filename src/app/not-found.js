import Link from "next/link";
import { PageHeader, ButtonLink } from "@/components/ui";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <PageHeader eyebrow="404" title="That page doesn't exist">Try the search, or head back to the projects.</PageHeader>
      <div className="mx-auto flex max-w-6xl flex-wrap gap-3 px-4 sm:px-6"><ButtonLink href="/">Home</ButtonLink><ButtonLink href="/projects" variant="ghost">Projects</ButtonLink><ButtonLink href="/command" variant="ghost">Search</ButtonLink></div>
      <p className="sr-only"><Link href="/">Home</Link></p>
    </>
  );
}
