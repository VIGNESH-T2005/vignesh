"use client";
export default function PrintButton() {
  return <button type="button" onClick={() => window.print()} className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:border-accent hover:text-accent">Print or save as PDF</button>;
}
