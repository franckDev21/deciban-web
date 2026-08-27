"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/content";

const LANGUAGES: { code: Lang; label: string; short: string }[] = [
  { code: "fr", label: "Français", short: "FR" },
  { code: "en", label: "English", short: "EN" },
];

function Globe() {
  return (
    <svg
      className="globe"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
      <path d="M3.4 9h17.2M3.4 15h17.2" />
    </svg>
  );
}

export default function LangSwitch({
  lang,
  onSelect,
  label,
}: {
  lang: Lang;
  onSelect: (next: Lang) => void;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointer = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <div className="lang-box" ref={box}>
      <button
        type="button"
        className="lang-switch"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <Globe />
        <span className="lang-code">{current.short}</span>
      </button>

      {open && (
        <div className="lang-menu" role="menu">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              role="menuitemradio"
              aria-checked={l.code === lang}
              className="lang-item"
              onClick={() => {
                if (l.code !== lang) onSelect(l.code);
                setOpen(false);
              }}
            >
              <span className="lang-item-code">{l.short}</span>
              <span className="lang-item-label">{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
