"use client";

import { useEffect, useRef, useState } from "react";
import type { Dict } from "@/lib/content";

type Sample = { x: number; y: number; t: number };

const MAX_SAMPLES = 160;

type Readout = {
  sinuosity: number;
  corrections: number;
  tremor: number;
  samples: number;
};

const EMPTY: Readout = { sinuosity: 0, corrections: 0, tremor: 0, samples: 0 };

function analyse(s: Sample[]): Readout {
  if (s.length < 12) return { ...EMPTY, samples: s.length };

  let path = 0;
  for (let i = 1; i < s.length; i++) {
    path += Math.hypot(s[i].x - s[i - 1].x, s[i].y - s[i - 1].y);
  }
  const direct = Math.hypot(
    s[s.length - 1].x - s[0].x,
    s[s.length - 1].y - s[0].y,
  );
  const sinuosity = direct > 8 ? path / direct : 0;

  // Corrections : changements de direction marques entre segments successifs.
  let corrections = 0;
  for (let i = 2; i < s.length; i++) {
    const a1 = Math.atan2(s[i - 1].y - s[i - 2].y, s[i - 1].x - s[i - 2].x);
    const a2 = Math.atan2(s[i].y - s[i - 1].y, s[i].x - s[i - 1].x);
    let d = Math.abs(a2 - a1);
    if (d > Math.PI) d = 2 * Math.PI - d;
    if (d > 0.9) corrections++;
  }

  // Micro-tremblement : energie de la derivee seconde de la position,
  // approximation simplifiee de la bande 8-12 Hz du tremblement physiologique.
  let jerk = 0;
  let n = 0;
  for (let i = 2; i < s.length; i++) {
    const ax = s[i].x - 2 * s[i - 1].x + s[i - 2].x;
    const ay = s[i].y - 2 * s[i - 1].y + s[i - 2].y;
    jerk += Math.hypot(ax, ay);
    n++;
  }

  return {
    sinuosity,
    corrections,
    tremor: n ? jerk / n : 0,
    samples: s.length,
  };
}

function verdict(r: Readout, t: Dict["sensor"]): { text: string; tone: "void" | "pos" } {
  if (r.samples < 40) return { text: t.waiting, tone: "void" };
  const humanLike =
    r.sinuosity > 1.04 && r.corrections >= 3 && r.tremor > 0.35;
  return humanLike
    ? { text: t.human, tone: "pos" }
    : { text: t.poor, tone: "void" };
}

export default function LiveSignature({ t }: { t: Dict["sensor"] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const samples = useRef<Sample[]>([]);
  const [readout, setReadout] = useState<Readout>(EMPTY);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let lastPublish = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      samples.current.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        t: performance.now(),
      });
      if (samples.current.length > MAX_SAMPLES) samples.current.shift();
    };

    const render = (now: number) => {
      const rect = canvas.getBoundingClientRect();
      const css = getComputedStyle(document.documentElement);
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Grille de fond.
      ctx.strokeStyle = css.getPropertyValue("--rule").trim();
      ctx.lineWidth = 0.5;
      for (let x = 0; x < rect.width; x += 26) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, rect.height);
        ctx.stroke();
      }
      for (let y = 0; y < rect.height; y += 26) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(rect.width, y);
        ctx.stroke();
      }

      const s = samples.current;
      const accent = css.getPropertyValue("--accent").trim();
      const seal = css.getPropertyValue("--seal").trim();

      for (let i = 1; i < s.length; i++) {
        const age = i / s.length;
        ctx.strokeStyle = age > 0.82 ? seal : accent;
        ctx.globalAlpha = age * 0.9;
        ctx.lineWidth = 0.7 + age * 1.9;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(s[i - 1].x, s[i - 1].y);
        ctx.lineTo(s[i].x, s[i].y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      if (s.length) {
        const last = s[s.length - 1];
        ctx.fillStyle = seal;
        ctx.beginPath();
        ctx.arc(last.x, last.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      if (now - lastPublish > 120) {
        lastPublish = now;
        setReadout(analyse(s));
      }
      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const v = verdict(readout, t);
  const rows: [string, string][] = [
    [t.sinuosity, readout.sinuosity ? readout.sinuosity.toFixed(3) : "0.000"],
    [t.corrections, String(readout.corrections)],
    [t.tremor, readout.tremor.toFixed(2)],
    [t.samples, `${readout.samples} / ${MAX_SAMPLES}`],
  ];

  return (
    <div className="card overflow-hidden" style={{ boxShadow: "var(--shadow)" }}>
      <div
        className="flex items-center justify-between gap-4 border-b px-4 py-3"
        style={{ borderColor: "var(--rule)", background: "var(--surface-2)" }}
      >
        <span className="eyebrow">{t.head}</span>
        <span className="num text-[0.7rem]" style={{ color: "var(--ink-3)" }}>
          {t.hint}
        </span>
      </div>

      <div className="relative h-[210px] w-full">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      </div>

      <div
        className="grid grid-cols-2 gap-x-5 gap-y-2 border-t px-4 py-4 sm:grid-cols-4"
        style={{ borderColor: "var(--rule)" }}
      >
        {rows.map(([k, val]) => (
          <div key={k} className="flex flex-col gap-1">
            <span
              className="num text-[0.6rem] uppercase tracking-[0.12em]"
              style={{ color: "var(--ink-3)" }}
            >
              {k}
            </span>
            <span className="num text-[0.98rem]">{val}</span>
          </div>
        ))}
      </div>

      <div
        className="num border-t px-4 py-3 text-[0.72rem]"
        style={{
          borderColor: "var(--rule)",
          color: v.tone === "pos" ? "var(--pos)" : "var(--ink-3)",
        }}
      >
        {v.text}
      </div>
    </div>
  );
}
