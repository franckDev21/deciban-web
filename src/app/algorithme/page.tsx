"use client";

import Link from "next/link";
import { useState } from "react";
import TopBar from "@/components/TopBar";
import { useLang } from "@/lib/useLang";
import { algo, type Block } from "@/lib/algo";
import { implementation } from "@/lib/algo-impl";
import ProofSheet from "@/components/ProofSheet";
import { formulas, statusLabel } from "@/lib/formulas";
import "katex/dist/katex.min.css";

export default function Algorithme() {
  const { lang, t, selectLang } = useLang();
  const a = algo[lang];
  const impl = implementation[lang];
  const f = formulas[lang];
  const [deep, setDeep] = useState(false);

  const blocks: Block[] = deep ? a.deep : a.simple;

  return (
    <main>
      <TopBar t={t.nav} lang={lang} onSelectLang={selectLang} variant="page" />

      <header className="mx-auto max-w-[1140px] px-5 pb-10 pt-14 sm:px-7 sm:pt-16">
        <div className="flex flex-col gap-4">
          <span className="eyebrow">{a.eyebrow}</span>
          <h1 className="text-[clamp(2.2rem,5.5vw,3.4rem)] font-bold tracking-[-0.035em]">
            {a.title}
          </h1>
          <p
            className="max-w-[62ch] text-[1.16rem]"
            style={{ color: "var(--ink-2)" }}
          >
            {a.lede}
          </p>
        </div>
      </header>

      {/* Bascule des deux niveaux */}
      <div
        className="sticky top-0 z-20 border-y"
        style={{ background: "var(--ground)", borderColor: "var(--rule)" }}
      >
        <div className="mx-auto flex max-w-[1140px] flex-wrap items-center gap-4 px-5 py-3 sm:px-7">
          <div
            className="inline-flex overflow-hidden rounded-sm border"
            style={{ borderColor: "var(--rule-strong)" }}
          >
            <button
              onClick={() => setDeep(false)}
              aria-pressed={!deep}
              className="lvl-btn num"
            >
              {a.tabSimple}
            </button>
            <button
              onClick={() => setDeep(true)}
              aria-pressed={deep}
              className="lvl-btn num"
              style={{ borderLeft: "1px solid var(--rule-strong)" }}
            >
              {a.tabDeep}
            </button>
          </div>
          <span className="num text-[0.72rem]" style={{ color: "var(--ink-3)" }}>
            {deep ? a.noteDeep : a.noteSimple}
          </span>
        </div>
      </div>

      {/* Les blocs */}
      <section className="mx-auto max-w-[1140px] px-5 py-14 sm:px-7 sm:py-16">
        <ol className="timeline">
          {blocks.map((b, i) => (
            <li key={b.title} className="tl-row">
              <span className="tl-num num">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex flex-col gap-3">
                <h2 className="text-[1.18rem] font-semibold">{b.title}</h2>
                {b.body.map((p, j) => (
                  <p key={j} style={{ color: "var(--ink-2)" }}>
                    {p}
                  </p>
                ))}
                {b.formula && <pre className="formula">{b.formula}</pre>}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Planche de demonstration : les formules, pour qui veut verifier */}
      {deep && (
        <ProofSheet
          eyebrow={f.eyebrow}
          title={f.title}
          lede={f.lede}
          legendTitle={f.legendTitle}
          legend={f.legend}
          plates={f.plates}
          closing={f.closing}
          statusLabels={statusLabel[lang]}
          caveatLabel={f.caveatLabel}
          assumeTitle={f.assumeTitle}
          assumeLede={f.assumeLede}
          assumptions={f.assumptions}
        />
      )}

      {/* L'algorithme reellement implemente */}
      {deep && (
        <section
          className="mx-auto max-w-[1140px] border-t px-5 py-14 sm:px-7 sm:py-16"
          style={{ borderColor: "var(--rule)" }}
        >
          <div className="mb-9 flex flex-col gap-3">
            <span className="eyebrow" style={{ color: "var(--pos)" }}>
              {impl.cap} · {impl.file}
            </span>
            <h2 className="text-[clamp(1.5rem,3.2vw,2.05rem)] font-semibold">
              {impl.title}
            </h2>
            <p className="max-w-[66ch] text-[1.08rem]" style={{ color: "var(--ink-2)" }}>
              {impl.lede}
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {impl.families.map((f) => (
              <div key={f.key} className="flex flex-col gap-4">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <h3 className="text-[1.2rem] font-semibold">{f.name}</h3>
                  <span
                    className="num rounded-sm border px-2 py-0.5 text-[0.72rem]"
                    style={{ color: "var(--accent)", borderColor: "currentColor" }}
                  >
                    {f.cap}
                  </span>
                  <code className="num text-[0.72rem]" style={{ color: "var(--ink-3)" }}>
                    {f.file}
                  </code>
                </div>

                <p className="max-w-[70ch] text-[0.98rem]" style={{ color: "var(--ink-2)" }}>
                  {f.intent}
                </p>

                <div className="cat-scroll">
                  <table className="cat">
                    <thead>
                      <tr>
                        <th>{impl.cols[0]}</th>
                        <th>{impl.cols[1]}</th>
                        <th>{impl.cols[2]}</th>
                        <th className="r">{impl.cols[3]}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {f.signals.map((sig) => (
                        <tr key={sig.name}>
                          <td className="fam">{sig.name}</td>
                          <td style={{ color: "var(--ink-2)" }}>{sig.measured}</td>
                          <td style={{ color: "var(--ink-2)" }}>{sig.rule}</td>
                          <td className="r" style={{ color: "var(--accent)" }}>{sig.db}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3">
            <h3 className="text-[1.2rem] font-semibold">{impl.verdictTitle}</h3>
            <p className="max-w-[66ch]" style={{ color: "var(--ink-2)" }}>
              {impl.verdictLede}
            </p>
            <div className="cat-scroll mt-2">
              <table className="cat">
                <tbody>
                  {impl.verdictRows.map(([range, label, note]) => (
                    <tr key={range}>
                      <td className="r" style={{ color: "var(--accent)", width: "130px" }}>{range}</td>
                      <td className="fam">{label}</td>
                      <td style={{ color: "var(--ink-2)" }}>{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Les familles */}
      <section
        className="mx-auto max-w-[1140px] border-t px-5 py-14 sm:px-7 sm:py-16"
        style={{ borderColor: "var(--rule)" }}
      >
        <div className="mb-8 flex flex-col gap-3">
          <h2 className="text-[clamp(1.5rem,3.2vw,2.05rem)] font-semibold">
            {a.famTitle}
          </h2>
          <p className="max-w-[64ch]" style={{ color: "var(--ink-2)" }}>
            {a.famLede}
          </p>
        </div>

        <div className="cat-scroll">
          <table className="cat">
            <thead>
              <tr>
                <th>{a.famCols[0]}</th>
                <th className="r">{a.famCols[1]}</th>
                <th>{a.famCols[2]}</th>
              </tr>
            </thead>
            <tbody>
              {a.fams.map((f) => (
                <tr key={f.name}>
                  <td className="fam">{f.name}</td>
                  <td className="r" style={{ color: "var(--accent)" }}>
                    {f.cap}
                  </td>
                  <td style={{ color: "var(--ink-2)" }}>{f.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Ce qui est discutable */}
      <section
        className="mx-auto max-w-[1140px] border-t px-5 py-14 sm:px-7 sm:py-16"
        style={{ borderColor: "var(--rule)" }}
      >
        <div className="mb-8 flex flex-col gap-3">
          <span className="eyebrow" style={{ color: "var(--signal)" }}>
            {a.openTitle}
          </span>
          <p className="max-w-[64ch] text-[1.1rem]">{a.openLede}</p>
        </div>

        <div className="grid gap-3">
          {a.open.map((o) => (
            <div
              key={o.q}
              className="card grid gap-3 p-6 md:grid-cols-[minmax(180px,1fr)_minmax(140px,auto)_2fr] md:items-start md:gap-6"
            >
              <h3 className="text-[1.02rem] font-semibold">{o.q}</h3>
              <span
                className="num w-fit rounded-sm border px-2 py-1 text-[0.72rem]"
                style={{ color: "var(--accent)", borderColor: "currentColor" }}
              >
                {o.now}
              </span>
              <p className="text-[0.96rem]" style={{ color: "var(--ink-2)" }}>
                {o.debate}
              </p>
            </div>
          ))}
        </div>

        <div
          className="card mt-7 flex flex-col items-start gap-4 p-7 sm:p-9"
          style={{ borderLeft: "4px solid var(--seal)" }}
        >
          <span className="eyebrow" style={{ color: "var(--seal)" }}>
            {a.ctaLabel}
          </span>
          <h3 className="text-[1.35rem] font-semibold">{a.ctaTitle}</h3>
          <p className="max-w-[64ch]" style={{ color: "var(--ink-2)" }}>
            {a.ctaBody}
          </p>
          <Link href="/#rejoindre" className="btn mt-1 no-underline">
            {a.ctaBtn}
          </Link>
        </div>
      </section>

      <footer
        className="mx-auto max-w-[1140px] border-t px-5 py-14 sm:px-7"
        style={{ borderColor: "var(--rule)", color: "var(--ink-3)" }}
      >
        <p className="max-w-[68ch] text-[0.92rem]">{t.footer}</p>
      </footer>
    </main>
  );
}
