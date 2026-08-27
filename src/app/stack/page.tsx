"use client";

import TopBar from "@/components/TopBar";
import { useLang } from "@/lib/useLang";
import { stack } from "@/lib/stack";

const METHOD_TONE: Record<string, string> = {
  GET: "var(--pos)",
  POST: "var(--accent)",
};

export default function StackPage() {
  const { t: nav, switchLang, lang } = useLang();
  const s = stack[lang];

  return (
    <main>
      <TopBar t={nav.nav} onSwitchLang={switchLang} variant="page" />

      <header className="mx-auto max-w-[1140px] px-5 pb-10 pt-14 sm:px-7 sm:pt-16">
        <div className="flex flex-col gap-4">
          <span className="eyebrow">{s.eyebrow}</span>
          <h1 className="text-[clamp(2.2rem,5.5vw,3.4rem)] font-bold tracking-[-0.035em]">
            {s.title}
          </h1>
          <p className="max-w-[62ch] text-[1.16rem]" style={{ color: "var(--ink-2)" }}>
            {s.lede}
          </p>
        </div>
      </header>

      {/* Les couches */}
      <Section title={s.layersTitle}>
        <div className="flex flex-col gap-8">
          {s.layers.map((layer) => (
            <div key={layer.title} className="flex flex-col gap-4">
              <div className="flex flex-wrap items-baseline gap-3">
                <h3 className="text-[1.2rem] font-semibold">{layer.title}</h3>
                <span className="num text-[0.75rem]" style={{ color: "var(--ink-3)" }}>
                  {layer.sub}
                </span>
              </div>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {layer.pieces.map((p) => (
                  <div key={p.name} className="card flex flex-col gap-2 p-5">
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <h4 className="text-[1rem] font-semibold">{p.name}</h4>
                      <span className="num text-[0.7rem]" style={{ color: "var(--accent)" }}>
                        {p.role}
                      </span>
                    </div>
                    <p className="text-[0.9rem]" style={{ color: "var(--ink-2)" }}>
                      {p.why}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Pourquoi Python */}
      <Section title={s.whyTitle}>
        <div className="card flex max-w-[74ch] flex-col gap-4 p-7" style={{ borderLeft: "3px solid var(--signal)" }}>
          {s.whyBody.map((p, i) => (
            <p key={i} style={{ color: i === 0 ? "var(--ink)" : "var(--ink-2)" }}>
              {p}
            </p>
          ))}
        </div>
      </Section>

      {/* API */}
      <Section title={s.apiTitle} lede={s.apiLede}>
        <div className="cat-scroll">
          <table className="cat">
            <thead>
              <tr>
                <th>{s.apiCols[0]}</th>
                <th>{s.apiCols[1]}</th>
              </tr>
            </thead>
            <tbody>
              {s.endpoints.map((e) => (
                <tr key={e.method + e.path}>
                  <td>
                    <span
                      className="num mr-3 text-[0.7rem]"
                      style={{ color: METHOD_TONE[e.method] ?? "var(--ink-3)" }}
                    >
                      {e.method}
                    </span>
                    <code className="num text-[0.85rem]">{e.path}</code>
                  </td>
                  <td style={{ color: "var(--ink-2)" }}>{e.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Intégration continue */}
      <Section title={s.ciTitle} lede={s.ciLede}>
        <ol className="timeline">
          {s.ciSteps.map((step, i) => (
            <li key={step.title} className="tl-row">
              <span className="tl-num num">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[1.05rem] font-semibold">{step.title}</h3>
                <p className="text-[0.98rem]" style={{ color: "var(--ink-2)" }}>
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Docker */}
      <Section title={s.dockerTitle} lede={s.dockerLede}>
        <div className="card flex max-w-[74ch] flex-col gap-4 p-7" style={{ borderLeft: "3px solid var(--seal)" }}>
          {s.dockerBody.map((p, i) => (
            <p key={i} style={{ color: "var(--ink-2)" }}>
              {p}
            </p>
          ))}
          <code className="num session-url mt-1 w-fit">{s.dockerCmd}</code>
        </div>
      </Section>

      {/* Démarrer */}
      <Section title={s.startTitle} lede={s.startLede}>
        <div className="flex flex-col gap-3">
          {s.startCmds.map((c) => (
            <div key={c.label} className="card flex flex-wrap items-center gap-x-5 gap-y-2 p-4">
              <span className="eyebrow" style={{ minWidth: "22ch" }}>
                {c.label}
              </span>
              <code className="num session-url">{c.cmd}</code>
            </div>
          ))}
        </div>
      </Section>

      <footer
        className="mx-auto max-w-[1140px] border-t px-5 py-14 sm:px-7"
        style={{ borderColor: "var(--rule)", color: "var(--ink-3)" }}
      >
        <p className="max-w-[68ch] text-[0.92rem]">{nav.footer}</p>
      </footer>
    </main>
  );
}

function Section({
  title,
  lede,
  children,
}: {
  title: string;
  lede?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="mx-auto max-w-[1140px] border-t px-5 py-14 sm:px-7 sm:py-16"
      style={{ borderColor: "var(--rule)" }}
    >
      <div className="mb-8 flex flex-col gap-3">
        <h2 className="text-[clamp(1.5rem,3.2vw,2.05rem)] font-semibold">{title}</h2>
        {lede && (
          <p className="max-w-[64ch] text-[1.08rem]" style={{ color: "var(--ink-2)" }}>
            {lede}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}
