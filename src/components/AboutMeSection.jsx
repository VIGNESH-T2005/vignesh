import { ABOUT, TIMELINE } from "@/data/site";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const TYPE_LABEL = {
  education: "Education",
  experience: "Experience",
  certification: "Certification",
  achievement: "Achievement",
  learning: "Learning",
};

export default function AboutMeSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
      <SectionHeading eyebrow="About" title={<span id="about-title">Building things end to end</span>} />
      <div className="grid gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="space-y-4 leading-relaxed text-muted">
            {ABOUT.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <h3 className="mt-8 text-lg font-semibold">What I enjoy working on</h3>
          <ul className="mt-3 space-y-2 text-muted">
            {ABOUT.interests.map((i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                {i}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <h3 className="mb-5 text-lg font-semibold">Education & learning journey</h3>
          <ol className="relative space-y-6 border-l border-line pl-6">
            {TIMELINE.map((t) => (
              <li key={t.title} className="relative">
                <span className="absolute -left-[1.9rem] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-bg" aria-hidden="true" />
                <p className="font-mono text-xs text-accent">
                  {t.period} · {TYPE_LABEL[t.type]}
                </p>
                <p className="mt-1 font-semibold">{t.title}</p>
                <p className="text-sm text-muted">{t.place}</p>
                {t.detail ? <p className="mt-1 text-sm text-muted">{t.detail}</p> : null}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
