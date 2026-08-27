"use client";

import { useEffect, useRef, useState } from "react";

const NAME = "deciban";
const SESSION_KEY = "deciban.booted";

type Line = { tag: string; label: string; value: string; tone: string };

export default function BootHero({
  lines,
  command,
}: {
  lines: Line[];
  command: string;
}) {
  // -1 : rien. 0..NAME.length : caracteres tapes. >length : sequence de boot.
  const [typed, setTyped] = useState(0);
  const [bootShown, setBootShown] = useState(0);
  const [done, setDone] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let alreadyBooted = false;
    try {
      alreadyBooted = !!window.sessionStorage.getItem(SESSION_KEY);
    } catch {
      /* stockage indisponible */
    }

    // On ne rejoue jamais l'animation dans la meme session : au bout de la
    // troisieme visite, attendre que le titre se tape devient penible.
    if (reduce || alreadyBooted) {
      setTyped(NAME.length);
      setBootShown(lines.length);
      setDone(true);
      return;
    }

    const push = (fn: () => void, ms: number) => {
      timers.current.push(setTimeout(fn, ms));
    };

    let t = 380;
    for (let i = 1; i <= NAME.length; i++) {
      push(() => setTyped(i), t);
      t += 78 + (i % 3) * 26; // cadence irreguliere, comme une vraie frappe
    }
    t += 260;
    for (let i = 1; i <= lines.length; i++) {
      push(() => setBootShown(i), t);
      t += 150;
    }
    push(() => {
      setDone(true);
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* stockage indisponible */
      }
    }, t + 120);

    const list = timers.current;
    return () => list.forEach(clearTimeout);
  }, [lines.length]);

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <div className="num text-[0.78rem]" style={{ color: "var(--ink-3)" }}>
          <span style={{ color: "var(--accent)" }}>~</span> {command}
        </div>

        <h1
          className="text-[clamp(3rem,10vw,5.6rem)] font-bold tracking-[-0.055em]"
          aria-label={NAME}
        >
          <span aria-hidden="true">{NAME.slice(0, typed)}</span>
          {!done && <span className="caret" aria-hidden="true" />}
        </h1>
      </div>

      <div
        className="flex flex-col gap-1.5"
        style={{ minHeight: `${lines.length * 26}px` }}
      >
        {lines.slice(0, bootShown).map((l) => (
          <div key={l.label} className="boot-line boot-fade num flex-wrap">
            <span className="boot-tag" style={{ color: `var(${l.tone})` }}>
              [{l.tag}]
            </span>
            <span
              className="text-[0.78rem]"
              style={{ color: "var(--ink-2)", minWidth: "18ch" }}
            >
              {l.label}
            </span>
            <span className="text-[0.78rem]" style={{ color: "var(--ink-3)" }}>
              {l.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
