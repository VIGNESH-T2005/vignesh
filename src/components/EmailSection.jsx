"use client";
import { useState } from "react";
import { SITE } from "@/data/site";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { GithubIcon, LinkedinIcon, CodeIcon, MailIcon, DownloadIcon } from "./Icons";

// Public Formspree form ID (safe to expose). Override with NEXT_PUBLIC_FORMSPREE_ID.
const FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "xvzpylkw";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
  if (v.message.length > 2000) e.message = "Message must be under 2000 characters.";
  return e;
}

const fieldClass = (err) =>
  `mt-1.5 w-full rounded-xl border bg-bg px-4 py-3 text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/40 ${err ? "border-red-400" : "border-line focus:border-accent"}`;

export default function EmailSection() {
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "", _gotcha: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    if (values._gotcha) return setStatus("success"); // bot: pretend success

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORM_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim() || "Portfolio contact",
          message: values.message.trim(),
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      setStatus("success");
      setValues({ name: "", email: "", subject: "", message: "", _gotcha: "" });
    } catch {
      setStatus("error");
    }
  }

  const links = [
    { label: "Email", href: `mailto:${SITE.email}`, Icon: MailIcon, text: SITE.email },
    { label: "GitHub", href: SITE.socials.github.href, Icon: GithubIcon, text: SITE.socials.github.user },
    { label: "LinkedIn", href: SITE.socials.linkedin.href, Icon: LinkedinIcon, text: "vignesh-t-web-dev" },
    { label: "LeetCode", href: SITE.socials.leetcode.href, Icon: CodeIcon, text: SITE.socials.leetcode.user },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
      <SectionHeading eyebrow="Contact" title={<span id="contact-title">Let&apos;s work together</span>}>
        I&apos;m looking for a full-stack developer role. Send a message and I&apos;ll reply as soon as I can.
      </SectionHeading>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <ul className="space-y-3">
            {links.map(({ label, href, Icon, text }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex items-center gap-4 rounded-xl border border-line bg-surface p-4 transition hover:border-accent"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-surface-2 text-accent"><Icon /></span>
                  <span>
                    <span className="block text-xs text-muted">{label}</span>
                    <span className="break-all text-sm font-medium">{text}</span>
                  </span>
                </a>
              </li>
            ))}
            <li>
              <a href={SITE.resume} download="Vignesh-T-Resume.pdf" className="flex items-center gap-4 rounded-xl border border-line bg-surface p-4 transition hover:border-accent">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-surface-2 text-accent"><DownloadIcon /></span>
                <span>
                  <span className="block text-xs text-muted">Resume</span>
                  <span className="text-sm font-medium">Download PDF</span>
                </span>
              </a>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-line bg-surface p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="c-name" className="text-sm font-medium">Name</label>
                <input id="c-name" name="name" autoComplete="name" value={values.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "c-name-err" : undefined} className={fieldClass(errors.name)} placeholder="Your name" />
                {errors.name ? <p id="c-name-err" className="mt-1 text-xs text-red-500">{errors.name}</p> : null}
              </div>
              <div>
                <label htmlFor="c-email" className="text-sm font-medium">Email</label>
                <input id="c-email" name="email" type="email" autoComplete="email" value={values.email} onChange={set("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "c-email-err" : undefined} className={fieldClass(errors.email)} placeholder="you@company.com" />
                {errors.email ? <p id="c-email-err" className="mt-1 text-xs text-red-500">{errors.email}</p> : null}
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="c-subject" className="text-sm font-medium">Subject <span className="font-normal text-muted">(optional)</span></label>
              <input id="c-subject" name="subject" value={values.subject} onChange={set("subject")} className={fieldClass()} placeholder="Opportunity, question, hello…" />
            </div>

            <div className="mt-4">
              <label htmlFor="c-message" className="text-sm font-medium">Message</label>
              <textarea id="c-message" name="message" rows={5} maxLength={2000} value={values.message} onChange={set("message")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "c-message-err" : undefined} className={`${fieldClass(errors.message)} resize-y`} placeholder="Tell me about the role or project…" />
              {errors.message ? <p id="c-message-err" className="mt-1 text-xs text-red-500">{errors.message}</p> : null}
            </div>

            {/* Honeypot: hidden from people, tempting to bots */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label>Leave empty<input tabIndex={-1} autoComplete="off" name="_gotcha" value={values._gotcha} onChange={set("_gotcha")} /></label>
            </div>

            <button type="submit" disabled={status === "sending"} className="mt-5 w-full rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3 font-semibold text-accent-ink transition hover:brightness-110 disabled:opacity-60">
              {status === "sending" ? "Sending…" : "Send message"}
            </button>

            <div aria-live="polite" className="mt-4 min-h-6 text-sm">
              {status === "success" ? <p className="text-emerald-500">Thanks! Your message was sent. I&apos;ll get back to you soon.</p> : null}
              {status === "error" ? (
                <p className="text-red-500">
                  Couldn&apos;t send your message. Please try again or email me at{" "}
                  <a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a>.
                </p>
              ) : null}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
