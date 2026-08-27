"use client";

import { useCallback, useEffect, useRef } from "react";
import type { Dict } from "@/lib/content";

export default function StoryModal({
  t,
  open,
  step,
  setStep,
  onClose,
}: {
  t: Dict["story"];
  open: boolean;
  step: number;
  setStep: (fn: (s: number) => number) => void;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const CHAPTERS = t.chapters;

  const close = useCallback(() => onClose(), [onClose]);

  const next = useCallback(() => {
    setStep((s) => {
      if (s < CHAPTERS.length - 1) return s + 1;
      close();
      return s;
    });
  }, [close, setStep, CHAPTERS.length]);

  const prev = useCallback(() => setStep((s) => Math.max(0, s - 1)), [setStep]);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight" || e.key === "Enter") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, next, prev]);

  if (!open) return null;

  const c = CHAPTERS[step];
  const isLast = step === CHAPTERS.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      style={{ background: "rgba(4, 8, 14, 0.72)", backdropFilter: "blur(6px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t.chapters[0].title}
        tabIndex={-1}
        className="story-panel w-full max-w-[620px] outline-none"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--rule-strong)",
          borderRadius: "3px",
          boxShadow: "0 40px 80px -40px rgba(0,0,0,0.8)",
        }}
      >
        {/* Progression */}
        <div
          className="flex items-center gap-3 border-b px-6 py-4"
          style={{ borderColor: "var(--rule)" }}
        >
          <div className="flex flex-1 gap-1.5">
            {CHAPTERS.map((_, i) => (
              <span
                key={i}
                className="h-[3px] flex-1 rounded-full transition-colors duration-300"
                style={{
                  background:
                    i <= step ? "var(--seal)" : "var(--rule-strong)",
                }}
              />
            ))}
          </div>
          <button
            onClick={close}
            className="num shrink-0 text-[0.66rem] uppercase tracking-[0.12em]"
            style={{ color: "var(--ink-3)", background: "none", border: 0, cursor: "pointer" }}
          >
            {t.skip}
          </button>
        </div>

        {/* Contenu */}
        <div key={step} className="story-body flex flex-col gap-5 px-6 py-8 sm:px-9 sm:py-10">
          <span className="eyebrow" style={{ color: "var(--seal)" }}>
            {c.kicker}
          </span>
          <h2 className="text-[clamp(1.5rem,4vw,2rem)] font-semibold">
            {c.title}
          </h2>

          {c.body.map((p, i) => (
            <p key={i} className="text-[1.04rem]" style={{ color: "var(--ink-2)" }}>
              {p}
            </p>
          ))}

          {"pull" in c && c.pull && (
            <p
              className="mt-1 pl-5 text-[1.2rem] leading-[1.5]"
              style={{ borderLeft: "3px solid var(--seal)", color: "var(--ink)" }}
            >
              {c.pull}
            </p>
          )}
        </div>

        {/* Navigation */}
        <div
          className="flex items-center justify-between gap-4 border-t px-6 py-4"
          style={{ borderColor: "var(--rule)" }}
        >
          <button
            onClick={prev}
            disabled={step === 0}
            className="num text-[0.7rem] uppercase tracking-[0.12em] disabled:opacity-0"
            style={{ color: "var(--ink-3)", background: "none", border: 0, cursor: "pointer" }}
          >
            {t.back}
          </button>

          <span className="num text-[0.68rem]" style={{ color: "var(--ink-3)" }}>
            {step + 1} / {CHAPTERS.length}
          </span>

          <button onClick={next} className="btn">
            {isLast ? t.last : t.next}
          </button>
        </div>
      </div>

      <style>{`
        .story-panel { animation: storyIn .38s cubic-bezier(.22,.72,.3,1) both; }
        .story-body  { animation: chapterIn .34s cubic-bezier(.22,.72,.3,1) both; }
        @keyframes storyIn {
          from { opacity: 0; transform: translateY(16px) scale(.985); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes chapterIn {
          from { opacity: 0; transform: translateY(9px); }
          to   { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .story-panel, .story-body { animation: none; }
        }
      `}</style>
    </div>
  );
}
