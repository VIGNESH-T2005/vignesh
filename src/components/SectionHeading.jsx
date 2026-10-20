export default function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h2>
      {children ? <p className="mt-3 text-muted">{children}</p> : null}
    </div>
  );
}
