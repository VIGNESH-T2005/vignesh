"use client";
import { useState } from "react";
import { SKILL_GROUPS } from "@/data/site";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function SkillsSection() {
  const [selected, setSelected] = useState(null); // `${groupId}:${name}`

  return (
    <section id="skills" aria-labelledby="skills-title" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
      <SectionHeading eyebrow="Skills" title={<span id="skills-title">Technologies I can explain and defend</span>}>
        Only tools I have used in real projects. Select a card to see where I used it.
      </SectionHeading>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {SKILL_GROUPS.map((group, gi) => (
          <Reveal key={group.id} delay={gi * 0.05} className="rounded-2xl border border-line bg-surface p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">{group.title}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => {
                const key = `${group.id}:${item.name}`;
                const isOpen = selected === key;
                return (
                  <li key={key}>
                    <button
                      type="button"
                      aria-pressed={isOpen}
                      onClick={() => setSelected(isOpen ? null : key)}
                      className={`rounded-full border px-3 py-1.5 text-sm transition ${
                        isOpen ? "border-accent bg-accent text-accent-ink" : "border-line bg-surface-2 text-fg hover:border-accent"
                      }`}
                    >
                      {item.name}
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 min-h-12 text-sm leading-relaxed text-muted" aria-live="polite">
              {group.items.find((i) => `${group.id}:${i.name}` === selected)?.note ?? "Select a technology for details."}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
