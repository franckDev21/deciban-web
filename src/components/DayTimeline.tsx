"use client";

import type { Dict } from "@/lib/content";

/* Huit instants fixes, choisis pour ressembler a un tirage aleatoire :
   irreguliers, avec des grappes et des trous, jamais equidistants. */
const PROBES = [
  { at: 6, ok: true },
  { at: 14, ok: true },
  { at: 21, ok: true },
  { at: 38, ok: true },
  { at: 47, ok: true },
  { at: 62, ok: false },
  { at: 79, ok: true },
  { at: 91, ok: true },
];

const HOURS = ["14 h", "16 h", "18 h", "20 h", "22 h"];

export default function DayTimeline({ t }: { t: Dict["how"] }) {
  return (
    <figure className="day">
      <div className="day-head">
        <span className="eyebrow">{t.dayWindow}</span>
        <div className="day-legend num">
          <span>
            <i className="day-dot ok" /> {t.dayLegendOk}
          </span>
          <span>
            <i className="day-dot ko" /> {t.dayLegendKo}
          </span>
        </div>
      </div>

      <div className="day-track">
        <div className="day-bar" />
        {PROBES.map((p) => (
          <span
            key={p.at}
            className={`day-probe ${p.ok ? "ok" : "ko"}`}
            style={{ left: `${p.at}%` }}
          >
            <i />
          </span>
        ))}
      </div>

      <div className="day-hours num">
        {HOURS.map((h, i) => (
          <span key={h} style={{ left: `${(i / (HOURS.length - 1)) * 100}%` }}>
            {h}
          </span>
        ))}
      </div>

      <figcaption className="day-read">{t.dayRead}</figcaption>
    </figure>
  );
}
