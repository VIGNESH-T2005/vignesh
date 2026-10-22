"use client";
import { useCallback, useMemo, useState } from "react";
import { PROJECTS } from "@/data/site";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export default function ProjectSection() {
  const categories = useMemo(() => ["All", ...new Set(PROJECTS.map((p) => p.category))], []);
  const [filter, setFilter] = useState("All");
  const [openProject, setOpenProject] = useState(null);
  const close = useCallback(() => setOpenProject(null), []);

  const visible = PROJECTS.filter((p) => filter === "All" || p.category === filter);

  return (
    <section id="projects" aria-labelledby="projects-title" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
      <SectionHeading eyebrow="Projects" title={<span id="projects-title">Things I&apos;ve built</span>}>
        Real, deployed projects. Each one links to its source code and, where hosted, a live demo.
      </SectionHeading>

      <div role="group" aria-label="Filter projects by category" className="mb-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
            className={`rounded-full border px-4 py-1.5 text-sm transition ${filter === c ? "border-accent bg-accent text-accent-ink" : "border-line bg-surface text-muted hover:border-accent hover:text-fg"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {visible.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.05} className={i === 0 && filter === "All" ? "md:col-span-2" : ""}>
            <ProjectCard project={p} onOpen={setOpenProject} featured={i === 0 && filter === "All"} />
          </Reveal>
        ))}
      </div>

      {openProject ? <ProjectModal project={openProject} onClose={close} /> : null}
    </section>
  );
}
