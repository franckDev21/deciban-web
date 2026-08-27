"use client";

import { useEffect, useRef } from "react";
import katex from "katex";
import type { Plate, PlateStatus } from "@/lib/formulas";

function Formula({ tex }: { tex: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    katex.render(tex, ref.current, {
      displayMode: true,
      throwOnError: false,
      output: "html",
    });
  }, [tex]);

  return <div ref={ref} className="plate-tex" aria-label={tex} />;
}

const TONE: Record<PlateStatus, string> = {
  exact: "var(--pos)",
  heuristique: "var(--signal)",
  approx: "var(--signal)",
  inerte: "var(--ink-3)",
  absent: "var(--neg)",
};

export default function ProofSheet({
  eyebrow,
  title,
  lede,
  legendTitle,
  legend,
  plates,
  closing,
  statusLabels,
  caveatLabel,
  assumeTitle,
  assumeLede,
  assumptions,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  legendTitle: string;
  legend: [string, string][];
  plates: Plate[];
  closing: string;
  statusLabels: Record<PlateStatus, string>;
  caveatLabel: string;
  assumeTitle: string;
  assumeLede: string;
  assumptions: { title: string; body: string }[];
}) {
  return (
    <section className="sheet">
      <div className="sheet-inner">
        <header className="sheet-head">
          <span className="eyebrow sheet-eyebrow">{eyebrow}</span>
          <h2 className="sheet-title">{title}</h2>
          <p className="sheet-lede">{lede}</p>
        </header>

        <div className="sheet-legend">
          <span className="eyebrow sheet-eyebrow">{legendTitle}</span>
          <dl>
            {legend.map(([sym, meaning]) => (
              <div key={sym}>
                <dt>{sym}</dt>
                <dd>{meaning}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ol className="plates">
          {plates.map((p) => (
            <li key={p.n} className="plate">
              <div className="plate-body">
                <div className="plate-head">
                  <span className="plate-n">{p.n}</span>
                  <h3 className="plate-title">{p.title}</h3>
                  <span className="plate-status" style={{ color: TONE[p.status] }}>
                    {statusLabels[p.status]}
                  </span>
                </div>
                <Formula tex={p.tex} />
                <p className="plate-reads">{p.reads}</p>
              </div>
              <aside className="plate-margin">
                {p.margin}
                {p.caveat && (
                  <span className="plate-caveat">
                    <strong style={{ color: TONE[p.status] }}>{caveatLabel}. </strong>
                    {p.caveat}
                  </span>
                )}
              </aside>
            </li>
          ))}
        </ol>

        <div className="sheet-assume">
          <h3 className="sheet-assume-title">{assumeTitle}</h3>
          <p className="sheet-assume-lede">{assumeLede}</p>
          <ol className="sheet-assume-list">
            {assumptions.map((a) => (
              <li key={a.title}>
                <h4>{a.title}</h4>
                <p>{a.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <p className="sheet-closing">{closing}</p>
      </div>
    </section>
  );
}
