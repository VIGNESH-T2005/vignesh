"use client";
import { useEffect, useRef, useState } from "react";
import { CHAT_SUGGESTIONS, SITE } from "@/data/site";
import { ChatIcon, CloseIcon, SendIcon } from "./Icons";

const MAX_CHARS = 500;
const GREETING = `Hi! I'm an AI assistant for ${SITE.name}'s portfolio. Ask me about his skills, projects or education.`;

// Floating chat widget. The API key stays on the server (/api/chat).
export default function AiChatbotSection() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]); // {role: "user"|"assistant", content, error?}
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ block: "end" }); }, [messages, loading, open]);
  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);
  useEffect(() => () => abortRef.current?.abort(), []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text) {
    const question = text.trim();
    if (!question || loading) return;
    const history = messages.filter((m) => !m.error).map(({ role, content }) => ({ role, content }));
    setMessages((m) => [...m, { role: "user", content: question }]);
    setInput("");
    setLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;
    const timeout = setTimeout(() => controller.abort(), 25_000);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, history }),
        signal: controller.signal,
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.reply) throw new Error(data?.error || "Something went wrong. Please try again.");
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch (err) {
      const msg = err.name === "AbortError" ? "That took too long. Please try again." : err.message || "Network error. Please try again.";
      setMessages((m) => [...m, { role: "assistant", content: msg, error: true }]);
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="chat-panel"
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        data-chat className="fixed bottom-5 right-5 z-40 flex h-14 items-center gap-2 rounded-full bg-accent px-5 font-semibold text-accent-ink shadow-[0_8px_40px_var(--glow)] transition hover:bg-white"
      >
        {open ? <CloseIcon /> : <ChatIcon />}
        <span className="hidden sm:inline">{open ? "Close" : "Ask AI"}</span>
      </button>

      {open ? (
        <div
          id="chat-panel"
          role="dialog"
          aria-label="AI assistant"
          data-chat className="glass fixed inset-x-3 bottom-24 z-40 flex h-[min(32rem,calc(100vh-8rem))] flex-col overflow-hidden rounded-3xl shadow-2xl sm:inset-x-auto sm:right-5 sm:w-96"
        >
          <div className="border-b border-line px-4 py-3">
            <p className="display text-lg">Ask about Vignesh</p>
            <p className="text-xs text-muted">AI answers about his skills, projects and background.</p>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4" role="log" aria-live="polite">
            <p className="max-w-[85%] rounded-2xl rounded-bl-sm bg-white/5 px-3 py-2 text-sm">{GREETING}</p>
            {messages.length === 0 ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {CHAT_SUGGESTIONS.map((s) => (
                  <button key={s} type="button" onClick={() => send(s)} className="rounded-full border border-line px-3 py-1.5 text-xs text-muted transition hover:border-accent hover:text-fg">
                    {s}
                  </button>
                ))}
              </div>
            ) : null}
            {messages.map((m, i) => (
              <p
                key={i}
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${
                  m.role === "user"
                    ? "ml-auto rounded-br-sm bg-accent text-accent-ink"
                    : m.error
                    ? "rounded-bl-sm border border-red-400/40 bg-red-500/10 text-red-500"
                    : "rounded-bl-sm bg-white/5"
                }`}
              >
                {m.content}
              </p>
            ))}
            {loading ? <p className="text-sm text-muted" role="status">Thinking…</p> : null}
            <div ref={endRef} />
          </div>

          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2 border-t border-line p-3">
            <label htmlFor="chat-input" className="sr-only">Ask a question</label>
            <input
              id="chat-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={MAX_CHARS}
              placeholder="Ask about skills, projects…"
              autoComplete="off"
              className="min-w-0 flex-1 rounded-full border border-line-2 bg-bg/60 px-4 py-2.5 text-sm placeholder:text-muted focus:border-accent focus:outline-none"
            />
            <button type="submit" disabled={loading || !input.trim()} aria-label="Send message" className="grid h-10 w-10 place-items-center rounded-full bg-accent text-accent-ink transition disabled:opacity-40">
              <SendIcon width={18} height={18} />
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}
