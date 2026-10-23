"use client";
import { useState } from "react";
import { SITE } from "@/data/site";
import { MailIcon, CheckIcon } from "./Icons";

// Click to copy the email address; falls back to opening the mail app.
export default function CopyEmail({ className = "", large = false }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { window.location.href = `mailto:${SITE.email}`; }
  }
  return (
    <button type="button" onClick={copy} aria-label={`Copy email address ${SITE.email}`}
      className={`group inline-flex items-center gap-3 rounded-full border border-line-2 bg-surface/70 transition hover:border-accent ${large ? "px-6 py-4 text-base sm:text-lg" : "px-4 py-2.5 text-sm"} ${className}`}>
      {copied ? <CheckIcon className="text-accent" /> : <MailIcon className="text-accent" />}
      <span className="font-mono">{SITE.email}</span>
      <span className="font-mono text-xs text-muted" aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
