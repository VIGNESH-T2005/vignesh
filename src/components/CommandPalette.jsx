"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchIndex, QUICK_ITEMS } from "@/lib/search";
import { SearchIcon } from "./Icons";

// Keyboard-first palette: Ctrl/Cmd+K or "/" opens it, arrows move, Enter opens, Esc closes.
export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef(null);
  const returnRef = useRef(null);

  const results = useMemo(() => (query.trim() ? searchIndex(query, 12) : QUICK_ITEMS), [query]);

  useEffect(() => {
    const openIt = () => { returnRef.current = document.activeElement; setQuery(""); setCursor(0); setOpen(true); };
    const onKey = (e) => {
      const typing = /input|textarea|select/i.test(e.target?.tagName ?? "") || e.target?.isContentEditable;
      if ((e.key === "k" || e.key === "K") && (e.ctrlKey || e.metaKey)) { e.preventDefault(); openIt(); }
      else if (e.key === "/" && !typing) { e.preventDefault(); openIt(); }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", openIt);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("open-palette", openIt); };
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    document.body.classList.add("no-scroll");
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  function close() { setOpen(false); returnRef.current?.focus?.(); }

  function go(item) {
    if (!item) return;
    setOpen(false);
    if (item.download || item.href.startsWith("mailto:")) { const a = document.createElement("a"); a.href = item.href; if (item.download) a.download = ""; a.click(); }
    else if (item.external) window.open(item.href, "_blank", "noopener,noreferrer");
    else router.push(item.href);
  }

  function onKeyDown(e) {
    if (e.key === "Escape") { e.preventDefault(); close(); }
    else if (e.key === "ArrowDown") { e.preventDefault(); setCursor((c) => Math.min(c + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setCursor((c) => Math.max(c - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); go(results[cursor]); }
    else if (e.key === "Tab") e.preventDefault(); // keep focus on the input
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/70 p-4 pt-[12vh] backdrop-blur-sm" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div role="dialog" aria-modal="true" aria-label="Command palette" className="glass w-full max-w-xl overflow-hidden rounded-3xl shadow-[0_40px_120px_-20px_rgba(0,0,0,.9)]" onKeyDown={onKeyDown}>
        <div className="flex items-center gap-3 border-b border-line px-4">
          <SearchIcon className="text-muted" />
          <input ref={inputRef} value={query} onChange={(e) => { setQuery(e.target.value); setCursor(0); }} role="combobox" aria-expanded="true" aria-controls="palette-list"
            aria-activedescendant={results[cursor] ? `pal-${cursor}` : undefined} aria-label="Search pages, projects, repositories, skills and notes"
            placeholder="Search projects, skills, repositories, notes…" className="h-14 w-full bg-transparent text-sm placeholder:text-muted focus:outline-none" />
          <kbd className="rounded border border-line px-1.5 font-mono text-[10px] text-muted">Esc</kbd>
        </div>
        <ul id="palette-list" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 ? <li className="px-3 py-6 text-center text-sm text-muted">No results for “{query}”.</li> : null}
          {results.map((r, i) => (
            <li key={`${r.type}-${r.href}-${r.title}`} id={`pal-${i}`} role="option" aria-selected={i === cursor}>
              <button type="button" tabIndex={-1} onMouseEnter={() => setCursor(i)} onClick={() => go(r)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left ${i === cursor ? "bg-accent/10" : ""}`}>
                <span className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-wider text-accent">{r.type}</span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{r.title}</span>
                  <span className="block truncate text-xs text-muted">{r.desc}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="border-t border-line px-4 py-2 text-xs text-muted">↑↓ move · Enter open · Esc close · / to search anywhere</p>
      </div>
    </div>
  );
}
