"use client";

import { useEffect, useRef, useState } from "react";
import type { Dict } from "@/lib/content";

const MAX = 160;

type Readout = { sin: number; cor: number; tre: number; n: number };

/**
 * Le moment signature de la direction : la barre mesure le lecteur
 * pendant qu'il lit la page. Le produit se demontre au lieu de se decrire.
 */
export default function StatusBar({ t }: { t: Dict["sensor"] }) {
  const pts = useRef<{ x: number; y: number }[]>([]);
  const [r, setR] = useState<Readout>({ sin: 0, cor: 0, tre: 0, n: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pts.current.push({ x: e.clientX, y: e.clientY });
      if (pts.current.length > MAX) pts.current.shift();
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      if (now - last > 130) {
        last = now;
        const p = pts.current;
        if (p.length >= 12) {
          let path = 0;
          for (let i = 1; i < p.length; i++) {
            path += Math.hypot(p[i].x - p[i - 1].x, p[i].y - p[i - 1].y);
          }
          const direct = Math.hypot(
            p[p.length - 1].x - p[0].x,
            p[p.length - 1].y - p[0].y,
          );

          let cor = 0;
          for (let i = 2; i < p.length; i++) {
            const a1 = Math.atan2(p[i - 1].y - p[i - 2].y, p[i - 1].x - p[i - 2].x);
            const a2 = Math.atan2(p[i].y - p[i - 1].y, p[i].x - p[i - 1].x);
            let d = Math.abs(a2 - a1);
            if (d > Math.PI) d = 2 * Math.PI - d;
            if (d > 0.9) cor++;
          }

          let jerk = 0;
          let n = 0;
          for (let i = 2; i < p.length; i++) {
            const ax = p[i].x - 2 * p[i - 1].x + p[i - 2].x;
            const ay = p[i].y - 2 * p[i - 1].y + p[i - 2].y;
            jerk += Math.hypot(ax, ay);
            n++;
          }

          setR({
            sin: direct > 8 ? path / direct : 0,
            cor,
            tre: n ? jerk / n : 0,
            n: p.length,
          });
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const human = r.n >= 40 && r.sin > 1.04 && r.cor >= 3 && r.tre > 0.35;
  const verdict = r.n < 40 ? t.waiting : human ? t.human : t.poor;

  return (
    <div className="statusbar">
      <div className="sb-in">
        <span className="sb-live">
          <span className="why-dot" aria-hidden="true" />
          {t.live}
        </span>
        <span>
          <span className="sb-k">{t.sinuosity}</span>{" "}
          <span className="sb-v">{r.sin.toFixed(3)}</span>
        </span>
        <span>
          <span className="sb-k">{t.corrections}</span>{" "}
          <span className="sb-v">{r.cor}</span>
        </span>
        <span>
          <span className="sb-k">{t.tremor}</span>{" "}
          <span className="sb-v">{r.tre.toFixed(2)}</span>
        </span>
        <span>
          <span className="sb-k">{t.samples}</span>{" "}
          <span className="sb-v">
            {r.n}/{MAX}
          </span>
        </span>
        <span
          className="sb-verdict"
          style={{ color: human ? "var(--pos)" : "var(--accent)" }}
        >
          {verdict}
        </span>
      </div>
    </div>
  );
}
