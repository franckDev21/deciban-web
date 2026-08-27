"use client";

import { use, useEffect, useState } from "react";
import TopBar from "@/components/TopBar";
import { useLang } from "@/lib/useLang";
import { sessionCopy } from "@/lib/session";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

type Report = {
  slug: string;
  handle: string | null;
  window: { starts_at: string; ends_at: string; declared_minutes: number };
  probes: { total: number; fired: number; answered: number; missed: number };
  families: { key: string; label: string; db: number; detail: string }[];
  total_db: number;
  verdict: { key: string; label: string };
};

export default function Attestation({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { t: nav, switchLang, lang } = useLang();
  const s = sessionCopy[lang];

  const [report, setReport] = useState<Report | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    fetch(`${API}/attestations/${slug}`, { headers: { Accept: "application/json" } })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setReport)
      .catch(() => setMissing(true));
  }, [slug]);

  const good = (report?.total_db ?? 0) >= 10;

  return (
    <main>
      <TopBar t={nav.nav} onSwitchLang={switchLang} variant="page" />

      <section className="mx-auto max-w-[1140px] px-5 py-14 sm:px-7 sm:py-16">
        {missing ? (
          <p className="num" style={{ color: "var(--neg)" }}>{s.attMissing}</p>
        ) : !report ? (
          <p className="num" style={{ color: "var(--ink-3)" }}>…</p>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="attest">
              <div className="attest-head">
                <span className="num attest-seal">
                  <span className="why-dot" aria-hidden="true" />
                  {s.attTitle}
                </span>
                <span className="num attest-url">/a/{report.slug}</span>
              </div>

              <div className="attest-name">{report.handle ?? "—"}</div>

              <div className="attest-grid">
                <F k={s.attWindow} v={`${fmtDate(report.window.starts_at)} · ${fmtTime(report.window.starts_at)} → ${fmtTime(report.window.ends_at)}`} />
                <F k={s.attChecks} v={`${report.probes.answered} / ${report.probes.fired}`} />
                <F
                  k={s.attEvidence}
                  v={`${report.total_db > 0 ? "+" : ""}${report.total_db} db`}
                  tone={good ? "--pos" : "--accent"}
                  big
                />
                <F k={s.attVerdict} v={report.verdict.label} tone={good ? "--pos" : "--accent"} big />
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {report.families.map((f) => (
                <div key={f.key} className="card flex flex-col gap-2 p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="text-[1rem] font-semibold">{f.label}</h2>
                    <span
                      className="num text-[1.05rem]"
                      style={{ color: f.db >= 0 ? "var(--pos)" : "var(--neg)" }}
                    >
                      {f.db > 0 ? "+" : ""}{f.db} db
                    </span>
                  </div>
                  <p className="num text-[0.76rem]" style={{ color: "var(--ink-3)" }}>
                    {f.detail}
                  </p>
                </div>
              ))}
            </div>

            <p className="max-w-[68ch] text-[0.92rem]" style={{ color: "var(--ink-3)" }}>
              {s.attNote}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

function F({ k, v, tone, big }: { k: string; v: string; tone?: string; big?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="num text-[0.6rem] uppercase tracking-[0.13em]" style={{ color: "var(--ink-3)" }}>
        {k}
      </span>
      <span
        className="num"
        style={{
          color: tone ? `var(${tone})` : "var(--ink)",
          fontSize: big ? "1.25rem" : "0.95rem",
          fontWeight: big ? 600 : 400,
        }}
      >
        {v}
      </span>
    </div>
  );
}

const fmtDate = (iso: string) => new Date(iso).toLocaleDateString();
const fmtTime = (iso: string) =>
  new Date(iso).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
