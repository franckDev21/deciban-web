"use client";

import Link from "next/link";
import TopBar from "@/components/TopBar";
import DayTimeline from "@/components/DayTimeline";
import { useLang } from "@/lib/useLang";

export default function HowItWorks() {
  const { t, switchLang } = useLang();
  const h = t.how;

  return (
    <main>
      <TopBar t={t.nav} onSwitchLang={switchLang} variant="page" />

      {/* ── Titre ────────────────────────────────────────── */}
      <header className="mx-auto max-w-[1140px] px-5 pb-12 pt-14 sm:px-7 sm:pb-14 sm:pt-16">
        <div className="flex flex-col gap-4">
          <span className="eyebrow">{h.eyebrow}</span>
          <h1 className="text-[clamp(2.2rem,5.5vw,3.4rem)] font-bold tracking-[-0.035em]">
            {h.title}
          </h1>
          <p
            className="max-w-[60ch] text-[1.18rem]"
            style={{ color: "var(--ink-2)" }}
          >
            {h.lede}
          </p>
        </div>
      </header>

      {/* ── Le resume et la frise, avant toute prose ─────── */}
      <section className="mx-auto max-w-[1140px] px-5 pb-4 sm:px-7">
        <div className="tldr">
          <span className="eyebrow" style={{ color: "var(--accent)" }}>
            {h.tldrLabel}
          </span>
          <p>{h.tldr}</p>
        </div>
      </section>

      <section
        className="mx-auto max-w-[1140px] border-t px-5 py-14 sm:px-7 sm:py-16"
        style={{ borderColor: "var(--rule)" }}
      >
        <div className="mb-8 flex flex-col gap-3">
          <h2 className="text-[clamp(1.5rem,3.2vw,2.05rem)] font-semibold">
            {h.dayTitle}
          </h2>
          <p className="max-w-[62ch] text-[1.1rem]" style={{ color: "var(--ink-2)" }}>
            {h.dayLede}
          </p>
        </div>
        <DayTimeline t={h} />
      </section>

      {/* ── Le lien avec Prométhée ───────────────────────── */}
      <Section title={h.linkTitle}>
        <div
          className="card flex flex-col gap-4 p-7 sm:p-9"
          style={{ borderLeft: "4px solid var(--seal)" }}
        >
          <p className="max-w-[56ch] text-[1.3rem] leading-[1.5]">
            {h.linkPunch}
          </p>
        </div>
        <div className="mt-6 flex max-w-[66ch] flex-col gap-4">
          {h.linkBody.map((p, i) => (
            <p key={i} style={{ color: "var(--ink-2)" }}>
              {p}
            </p>
          ))}
        </div>
      </Section>

      {/* ── Les cinq étapes ──────────────────────────────── */}
      <Section title={h.stepsTitle} lede={h.stepsLede}>
        <ol className="timeline">
          {h.steps.map((s, i) => (
            <li key={s.title} className="tl-row">
              <span className="tl-num num">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[1.05rem] font-semibold">{s.title}</h3>
                <p className="text-[0.99rem]" style={{ color: "var(--ink-2)" }}>
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── Comment il appelle ───────────────────────────── */}
      <Section eyebrow={h.callLabel} title={h.callTitle} lede={h.callLede}>
        <ol className="timeline">
          {h.callSeq.map((c, i) => (
            <li key={c.title} className="tl-row">
              <span className="tl-num num">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex flex-col gap-2">
                <span
                  className="num w-fit rounded-sm border px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.12em]"
                  style={{ color: "var(--seal)", borderColor: "currentColor" }}
                >
                  {c.tag}
                </span>
                <h3 className="text-[1.02rem] font-bold">{c.title}</h3>
                <p className="text-[0.97rem]" style={{ color: "var(--ink-2)" }}>
                  {c.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div
          className="card mt-7 flex flex-col gap-3 p-7"
          style={{ borderLeft: "3px solid var(--accent)" }}
        >
          <span className="eyebrow" style={{ color: "var(--accent)" }}>
            {h.callSecLabel}
          </span>
          <h3 className="text-[1.18rem] font-bold">{h.callSecTitle}</h3>
          <p className="max-w-[66ch]" style={{ color: "var(--ink-2)" }}>
            {h.callSecBody}
          </p>
        </div>

        {/* Bande d'etat de session */}
        <div className="attest mt-7">
          <div className="attest-head">
            <span className="num attest-seal">
              <span className="why-dot" aria-hidden="true" />
              {h.callStatusLabel}
            </span>
            <span className="num attest-url">deciban --status</span>
          </div>
          <div className="flex flex-col">
            {h.callStatus.map((row, i) => (
              <div
                key={row.k}
                className="flex flex-wrap items-baseline justify-between gap-3 px-[22px] py-[11px]"
                style={{
                  borderTop: i === 0 ? "none" : "1px solid var(--rule)",
                }}
              >
                <span
                  className="num text-[0.7rem] uppercase tracking-[0.11em]"
                  style={{ color: "var(--ink-3)" }}
                >
                  {row.k}
                </span>
                <span
                  className="num text-[0.92rem]"
                  style={{ color: row.tone ? `var(${row.tone})` : "var(--ink)" }}
                >
                  {row.v}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p
          className="mt-4 max-w-[66ch] text-[0.95rem]"
          style={{ color: "var(--ink-2)" }}
        >
          {h.callStatusNote}
        </p>
      </Section>

      {/* ── L'attestation ────────────────────────────────── */}
      <Section eyebrow={h.proofLabel} title={h.proofTitle} lede={h.proofBody}>
        <div className="attest">
          <div className="attest-head">
            <span className="num attest-seal">
              <span className="why-dot" aria-hidden="true" />
              {h.proofCard.seal}
            </span>
            <span className="num attest-url">{h.proofCard.urlLabel}</span>
          </div>

          <div className="attest-name">{h.proofCard.name}</div>

          <div className="attest-grid">
            <Field k={h.proofCard.periodLabel} v={h.proofCard.period} />
            <Field k={h.proofCard.coverageLabel} v={h.proofCard.coverage} />
            <Field k={h.proofCard.probesLabel} v={h.proofCard.probes} />
            <Field
              k={h.proofCard.scoreLabel}
              v={h.proofCard.score}
              tone="pos"
              big
            />
            <Field
              k={h.proofCard.verdictLabel}
              v={h.proofCard.verdict}
              tone="pos"
              big
            />
          </div>
        </div>
      </Section>

      {/* ── Les trois phases ─────────────────────────────── */}
      <Section title={h.phasesTitle}>
        <div className="grid gap-4 md:grid-cols-3">
          {h.phases.map((p, i) => (
            <div
              key={p.title}
              className="card flex flex-col gap-3 p-6"
              style={{
                borderTop: `3px solid ${i === 0 ? "var(--seal)" : "var(--accent)"}`,
              }}
            >
              <span
                className="num w-fit rounded-sm border px-2 py-1 text-[0.62rem] uppercase tracking-[0.12em]"
                style={{
                  color: i === 0 ? "var(--seal)" : "var(--ink-3)",
                  borderColor: "currentColor",
                }}
              >
                {p.tag}
              </span>
              <h3 className="text-[1.05rem] font-semibold">{p.title}</h3>
              <p className="text-[0.97rem]" style={{ color: "var(--ink-2)" }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── La limite ────────────────────────────────────── */}
      <Section eyebrow={h.limitLabel} title={h.limitTitle}>
        <div
          className="card flex max-w-[70ch] flex-col gap-4 p-7"
          style={{ borderLeft: "3px solid var(--signal)" }}
        >
          {h.limitBody.map((p, i) => (
            <p key={i} style={{ color: "var(--ink-2)" }}>
              {p}
            </p>
          ))}
        </div>
      </Section>

      {/* ── État du chantier ─────────────────────────────── */}
      <Section
        eyebrow={h.statusEyebrow}
        title={h.statusTitle}
        lede={h.statusLede}
      >
        <div className="grid gap-4 md:grid-cols-3">
          {h.statusCols.map((col, i) => {
            const tone =
              i === 0 ? "var(--pos)" : i === 1 ? "var(--accent)" : "var(--signal)";
            return (
              <div
                key={col.title}
                className="card flex flex-col gap-4 p-6"
                style={{ borderTop: `3px solid ${tone}` }}
              >
                <h3 className="text-[1rem] font-semibold" style={{ color: tone }}>
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {col.items.map((it) => (
                    <li
                      key={it}
                      className="status-item text-[0.95rem]"
                      style={{ color: "var(--ink-2)" }}
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div
          className="card mt-6 flex flex-col items-start gap-4 p-7 sm:p-9"
          style={{ borderLeft: "4px solid var(--seal)" }}
        >
          <span className="eyebrow" style={{ color: "var(--seal)" }}>
            {h.inviteLabel}
          </span>
          <h3 className="text-[1.35rem] font-semibold">{h.inviteTitle}</h3>
          <p className="max-w-[64ch]" style={{ color: "var(--ink-2)" }}>
            {h.inviteBody}
          </p>
          <Link href="/#rejoindre" className="btn mt-1 no-underline">
            {h.inviteCta}
          </Link>
        </div>
      </Section>

      <footer
        className="mx-auto max-w-[1140px] border-t px-5 py-14 sm:px-7"
        style={{ borderColor: "var(--rule)", color: "var(--ink-3)" }}
      >
        <p className="max-w-[68ch] text-[0.92rem]">{t.footer}</p>
      </footer>
    </main>
  );
}

function Section({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="mx-auto max-w-[1140px] border-t px-5 py-14 sm:px-7 sm:py-18"
      style={{ borderColor: "var(--rule)" }}
    >
      <div className="mb-8 flex flex-col gap-3">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2 className="text-[clamp(1.5rem,3.2vw,2.05rem)] font-semibold">
          {title}
        </h2>
        {lede && (
          <p
            className="max-w-[64ch] text-[1.1rem]"
            style={{ color: "var(--ink-2)" }}
          >
            {lede}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

function Field({
  k,
  v,
  tone,
  big,
}: {
  k: string;
  v: string;
  tone?: "pos";
  big?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span
        className="num text-[0.6rem] uppercase tracking-[0.13em]"
        style={{ color: "var(--ink-3)" }}
      >
        {k}
      </span>
      <span
        className="num"
        style={{
          color: tone === "pos" ? "var(--pos)" : "var(--ink)",
          fontSize: big ? "1.25rem" : "0.95rem",
          fontWeight: big ? 600 : 400,
        }}
      >
        {v}
      </span>
    </div>
  );
}
