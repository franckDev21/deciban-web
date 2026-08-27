"use client";

import { useEffect, useRef, useState } from "react";
import type { SessionDict } from "@/lib/session";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

/** Un ecran tactile ne produit pas de signal moteur comparable a une souris. */
/** On compare le sens, pas la typographie : accents et casse ne bloquent pas. */
const normalise = (v: string) =>
  v
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

const isTouch = () =>
  typeof window !== "undefined" &&
  (window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0);

type Ev = { t: number; type: "move" | "down" | "up"; code?: string; x?: number; y?: number };

export default function ProbeChallenge({
  t,
  probeToken,
  expiresIn,
  onDone,
  onDismiss,
}: {
  t: SessionDict;
  probeToken: string;
  expiresIn: number;
  onDone: (payload: unknown) => void;
  onDismiss: () => void;
}) {
  const [left, setLeft] = useState(expiresIn);
  const [typed, setTyped] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pasted, setPasted] = useState(false);
  const backspaces = useRef(0);
  const shownAt = useRef<number>(Date.now());

  const events = useRef<Ev[]>([]);
  const t0 = useRef<number>(performance.now());
  const firstAction = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pts = useRef<{ x: number; y: number }[]>([]);

  /* ── Capture ── */
  useEffect(() => {
    const stamp = () => performance.now() - t0.current;
    const mark = () => {
      if (firstAction.current === null) firstAction.current = stamp();
    };

    const onMove = (e: PointerEvent) => {
      const c = canvasRef.current;
      if (!c) return;
      const r = c.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) return;
      mark();
      events.current.push({ t: stamp(), type: "move", x, y });
      pts.current.push({ x, y });
      if (pts.current.length > 200) pts.current.shift();
      if (events.current.length > 3500) events.current.shift();
    };
    const onDown = (e: KeyboardEvent) => {
      mark();
      if (e.key === "Backspace") backspaces.current++;
      events.current.push({ t: stamp(), type: "down", code: e.code });
    };
    const onUp = (e: KeyboardEvent) => {
      events.current.push({ t: stamp(), type: "up", code: e.code });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("keydown", onDown, true);
    window.addEventListener("keyup", onUp, true);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("keydown", onDown, true);
      window.removeEventListener("keyup", onUp, true);
    };
  }, []);

  /* ── Trace visible ── */
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    const draw = () => {
      const r = c.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (c.width !== r.width * dpr) {
        c.width = r.width * dpr;
        c.height = r.height * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, r.width, r.height);
      const css = getComputedStyle(document.documentElement);
      const accent = css.getPropertyValue("--accent").trim();
      const seal = css.getPropertyValue("--seal").trim();
      const p = pts.current;
      for (let i = 1; i < p.length; i++) {
        const age = i / p.length;
        ctx.strokeStyle = age > 0.85 ? seal : accent;
        ctx.globalAlpha = age * 0.85;
        ctx.lineWidth = 0.6 + age * 1.8;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(p[i - 1].x, p[i - 1].y);
        ctx.lineTo(p[i].x, p[i].y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ── Compte a rebours ── */
  useEffect(() => {
    const id = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  /* ── Une sortie, toujours ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onDismiss]);

  /* Un controle expire ne doit pas rester bloque a l'ecran. */
  useEffect(() => {
    if (left > 0) return;
    const id = setTimeout(onDismiss, 6000);
    return () => clearTimeout(id);
  }, [left, onDismiss]);

  async function send() {
    setSending(true);
    setError(null);
    try {
      const res = await fetch(`${API}/probes/${probeToken}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          events: events.current.slice(-3500),
          pasted,
          reaction_ms: firstAction.current,
          input_mode: isTouch() ? "touch" : "pointer",
          typed_chars: typed.length,
          expected_chars: t.probePhrase.length,
          backspaces: backspaces.current,
          reading_ms: Date.now() - shownAt.current,
          reading_words: t.probeLede.split(/\s+/).length,
          difficulty: 1,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? "Erreur");
        setSending(false);
        return;
      }
      onDone(data);
    } catch {
      setError("Serveur injoignable");
      setSending(false);
    }
  }

  const expired = left === 0;
  const matches = normalise(typed) === normalise(t.probePhrase);
  const ready = matches && events.current.length > 20 && !expired;

  return (
    <div className="probe-overlay" onClick={(e) => { if (e.target === e.currentTarget) onDismiss(); }}>
      <div className="probe-panel card">
        <div className="probe-head">
          <span className="eyebrow" style={{ color: expired ? "var(--neg)" : "var(--seal)" }}>
            {expired ? t.probeExpired : t.probeTitle}
          </span>
          <div className="flex items-center gap-4">
            <span
              className="num probe-clock"
              style={{ color: left <= 20 ? "var(--neg)" : "var(--accent)" }}
            >
              {left} {t.probeLeft}
            </span>
            <button className="probe-close" onClick={onDismiss} aria-label={t.probeClose}>
              ×
            </button>
          </div>
        </div>

        <p style={{ color: "var(--ink-2)" }}>{t.probeLede}</p>

        <div className="probe-canvas" style={{ touchAction: "none" }}>
          <canvas ref={canvasRef} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="probe-input" className="eyebrow">
            {t.probeType}
          </label>
          <p className="num probe-phrase">{t.probePhrase}</p>
          <input
            id="probe-input"
            className="field"
            value={typed}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            disabled={expired}
            onPaste={() => setPasted(true)}
            onChange={(e) => setTyped(e.target.value)}
            placeholder="…"
          />
          {typed.length > 0 && (
            <span
              className="num text-[0.74rem]"
              style={{ color: matches ? "var(--pos)" : "var(--ink-3)" }}
            >
              {matches ? t.probeMatch : t.probeNoMatch}
            </span>
          )}
        </div>

        {error && (
          <span className="num text-[0.78rem]" style={{ color: "var(--neg)" }}>
            {error}
          </span>
        )}

        {expired ? (
          <div className="flex flex-col gap-3">
            <p className="num text-[0.82rem]" style={{ color: "var(--neg)" }}>
              {t.probeExpiredBody}
            </p>
            <button className="btn" onClick={onDismiss}>
              {t.probeClose}
            </button>
          </div>
        ) : (
          <button className="btn" onClick={send} disabled={!ready || sending}>
            {sending ? "…" : t.probeSend}
          </button>
        )}
      </div>
    </div>
  );
}
