"use client";
import { useState } from "react";
import { SITE } from "@/data/site";

const FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || SITE.formspreeId;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TOPICS = ["Job or internship opportunity", "Project collaboration", "Question about my work", "Something else"];
const EMPTY = { name: "", email: "", topic: TOPICS[0], message: "", _gotcha: "" };

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
  return e;
}
const field = (err) => `mt-2 w-full rounded-2xl border bg-bg/60 px-4 py-3.5 text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/30 ${err ? "border-red-400" : "border-line-2 focus:border-accent"}`;

export default function ContactForm() {
  const [v, setV] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const set = (k) => (e) => { setV((x) => ({ ...x, [k]: e.target.value })); if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined })); };

  async function onSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;
    const found = validate(v);
    setErrors(found);
    if (Object.keys(found).length) return;
    if (v._gotcha) return setStatus("success");
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORM_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: v.name.trim(), email: v.email.trim(), subject: `Portfolio: ${v.topic}`, message: v.message.trim() }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      setV(EMPTY);
    } catch { setStatus("error"); }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="glass relative rounded-[2rem] p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="eyebrow text-muted">Name</label>
          <input id="c-name" autoComplete="name" value={v.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "c-name-err" : undefined} className={field(errors.name)} placeholder="Your name" />
          {errors.name ? <p id="c-name-err" className="mt-1 text-xs text-red-400">{errors.name}</p> : null}
        </div>
        <div>
          <label htmlFor="c-email" className="eyebrow text-muted">Email</label>
          <input id="c-email" type="email" autoComplete="email" value={v.email} onChange={set("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "c-email-err" : undefined} className={field(errors.email)} placeholder="you@company.com" />
          {errors.email ? <p id="c-email-err" className="mt-1 text-xs text-red-400">{errors.email}</p> : null}
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="c-topic" className="eyebrow text-muted">Topic</label>
        <select id="c-topic" value={v.topic} onChange={set("topic")} className={field()}>{TOPICS.map((t) => <option key={t}>{t}</option>)}</select>
      </div>
      <div className="mt-4">
        <label htmlFor="c-message" className="eyebrow text-muted">Message</label>
        <textarea id="c-message" rows={6} maxLength={2000} value={v.message} onChange={set("message")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "c-message-err" : undefined} className={`${field(errors.message)} resize-y`} placeholder="Tell me about the role or project…" />
        {errors.message ? <p id="c-message-err" className="mt-1 text-xs text-red-400">{errors.message}</p> : null}
      </div>
      <div className="absolute -left-[9999px]" aria-hidden="true"><label>Leave empty<input tabIndex={-1} autoComplete="off" value={v._gotcha} onChange={set("_gotcha")} /></label></div>
      <button type="submit" disabled={status === "sending"} className="mt-6 w-full rounded-full bg-accent px-6 py-4 font-semibold text-accent-ink transition hover:bg-white hover:shadow-[0_0_40px_var(--glow)] disabled:opacity-60">{status === "sending" ? "Sending…" : "Send message"}</button>
      <div aria-live="polite" className="mt-4 min-h-6 text-sm">
        {status === "success" ? <p className="text-accent">Thanks! Your message was sent. I&apos;ll reply as soon as I can.</p> : null}
        {status === "error" ? <p className="text-red-400">Couldn&apos;t send your message. Please try again or email <a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a>.</p> : null}
      </div>
    </form>
  );
}
