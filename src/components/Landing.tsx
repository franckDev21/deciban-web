"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Guilloche from "@/components/Guilloche";
import LiveSignature from "@/components/LiveSignature";
import JoinForm from "@/components/JoinForm";
import StoryModal from "@/components/StoryModal";
import TopBar from "@/components/TopBar";
import StatusBar from "@/components/StatusBar";
import BootHero from "@/components/BootHero";
import { content, type Lang } from "@/lib/content";

const LANG_KEY = "deciban.lang";
const STORY_KEY = "deciban.story.seen";

export default function Landing({ variant = "origin" }: { variant?: "origin" | "phosphore" }) {
  const [lang, setLang] = useState<Lang>("fr");
  const [storyOpen, setStoryOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [nudge, setNudge] = useState(false);
  const whyRef = useRef<HTMLButtonElement>(null);

  const t = content[lang];
  const phos = variant === "phosphore";

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(LANG_KEY);
      if (saved === "en" || saved === "fr") setLang(saved);
    } catch {
      /* stockage indisponible */
    }

    let seen = false;
    try {
      seen = !!window.localStorage.getItem(STORY_KEY);
    } catch {
      /* stockage indisponible */
    }

    if (!seen) {
      const timer = setTimeout(() => setStoryOpen(true), 900);
      return () => clearTimeout(timer);
    }

    // Deja vu : on attire l'oeil sur le lien qui rouvre l'histoire.
    whyRef.current?.focus({ preventScroll: true });
    setNudge(true);
    const stop = setTimeout(() => setNudge(false), 4200);
    return () => clearTimeout(stop);
  }, []);

  const selectLang = (next: Lang) => {
    setLang(next);
    try {
      window.localStorage.setItem(LANG_KEY, next);
    } catch {
      /* stockage indisponible */
    }
  };

  const openStory = () => {
    setStep(0);
    setStoryOpen(true);
  };

  const closeStory = useCallback(() => {
    setStoryOpen(false);
    try {
      window.localStorage.setItem(STORY_KEY, "1");
    } catch {
      /* stockage indisponible */
    }
    // Le focus revient sur le declencheur, c'est la regle.
    whyRef.current?.focus({ preventScroll: true });
    setNudge(true);
    setTimeout(() => setNudge(false), 4200);
  }, []);

  return (
    <main>
      <StoryModal
        t={t.story}
        open={storyOpen}
        step={step}
        setStep={setStep}
        onClose={closeStory}
      />

      <TopBar
        ref={whyRef}
        t={t.nav}
        lang={lang}
        onSelectLang={selectLang}
        onOpenStory={openStory}
        nudge={nudge}
        variant="home"
      />

      {/* ── Hero ─────────────────────────────────────────── */}
      <header className="relative overflow-hidden">
        <Guilloche />
        <div className="relative mx-auto max-w-[1140px] px-5 pb-16 pt-14 sm:px-7 sm:pb-20 sm:pt-16">
          <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="flex flex-col gap-6">
              <span
                className="num inline-flex w-fit items-center gap-2 rounded-sm border px-3 py-1.5 text-[0.66rem] uppercase tracking-[0.15em]"
                style={{ color: "var(--seal)", borderColor: "currentColor" }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "currentColor" }} />
                {t.hero.badge}
              </span>

              {phos ? (
                <BootHero lines={[...t.hero.boot]} command={t.hero.command} />
              ) : (
                <h1 className="text-[clamp(2.6rem,7vw,4.3rem)] font-bold tracking-[-0.04em]">
                  Deciban
                </h1>
              )}

              <p className="max-w-[54ch] text-[1.18rem]" style={{ color: "var(--ink-2)" }}>
                {t.hero.lede}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a href="/session" className="btn no-underline">
                  {t.hero.ctaTry}
                </a>
                <a href="/comment-ca-marche" className="btn btn-ghost no-underline">
                  {t.hero.ctaSpec}
                </a>
                <a href="#rejoindre" className="btn btn-ghost no-underline">
                  {t.hero.ctaJoin}
                </a>
              </div>

              <div
                className="num flex flex-wrap gap-x-7 gap-y-2 pt-3 text-[0.72rem]"
                style={{ color: "var(--ink-3)" }}
              >
                {t.hero.meta.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>

            {/* Portrait grave, pose dans le guillochis comme sur un billet. */}
            <figure className="portrait">
              <div className="portrait-plate">
                <img src="/images/alan-turing.jpeg" alt={t.hero.portraitAlt} />
              </div>
              <figcaption className="portrait-cap">
                <span className="portrait-name">{t.hero.portraitName}</span>
                <span className="num portrait-years">{t.hero.portraitYears}</span>
                <p className="portrait-line">{t.hero.portraitLine}</p>
              </figcaption>
            </figure>
          </div>

          <div className="mt-12">
            <LiveSignature t={t.sensor} />
          </div>
        </div>
      </header>

      {/* ── Le probleme ──────────────────────────────────── */}
      <Section phos={phos} eyebrow={t.problem.eyebrow} title={t.problem.title}>
        <div className="grid gap-4 md:grid-cols-2">
          {t.problem.cards.map((c) => (
            <div key={c.title} className="card flex flex-col gap-3 p-7">
              <span
                className="num w-fit rounded-sm border px-2 py-1 text-[0.63rem] uppercase tracking-[0.12em]"
                style={{ color: "var(--neg)", borderColor: "currentColor" }}
              >
                {c.tag}
              </span>
              <h3 className="text-[1.16rem] font-semibold">{c.title}</h3>
              <p style={{ color: "var(--ink-2)" }}>{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Le principe ──────────────────────────────────── */}
      <Section
        phos={phos}
        eyebrow={t.principle.eyebrow}
        title={t.principle.title}
        lede={t.principle.lede}
      >
        <div
          className="card flex flex-col gap-4 p-7 sm:p-9"
          style={{ borderLeft: "4px solid var(--seal)" }}
        >
          <span className="eyebrow" style={{ color: "var(--seal)" }}>
            {t.principle.metaphorLabel}
          </span>
          <p className="max-w-[56ch] text-[1.3rem] leading-[1.5]">
            {t.principle.metaphor}
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {t.principle.steps.map((s, i) => (
            <div key={s.title} className="card flex flex-col gap-3 p-6">
              <span
                className="num border-b pb-2 text-[0.68rem] tracking-[0.14em]"
                style={{ color: "var(--accent)", borderColor: "var(--rule)" }}
              >
                {t.principle.stepLabel} 0{i + 1}
              </span>
              <h3 className="text-[1.05rem] font-semibold">{s.title}</h3>
              <p className="text-[0.98rem]" style={{ color: "var(--ink-2)" }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <div
          className="card mt-6 flex flex-col gap-3 p-7"
          style={{ borderLeft: "3px solid var(--signal)" }}
        >
          <span className="eyebrow" style={{ color: "var(--signal)" }}>
            {t.principle.calloutLabel}
          </span>
          <p className="text-[1.14rem]">{t.principle.calloutTitle}</p>
          <p style={{ color: "var(--ink-2)" }}>{t.principle.calloutBody}</p>
        </div>
      </Section>

      {/* ── Ce que je cherche ────────────────────────────── */}
      <Section
        phos={phos}
        eyebrow={t.needs.eyebrow}
        title={t.needs.title}
        lede={t.needs.lede}
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {t.needs.items.map((n, i) => (
            <div
              key={n.title}
              className="card flex flex-col gap-3 p-6"
              style={{
                borderTop: `3px solid ${i === 0 ? "var(--seal)" : "var(--accent)"}`,
              }}
            >
              <h3 className="text-[1.05rem] font-semibold">{n.title}</h3>
              <p className="text-[0.97rem]" style={{ color: "var(--ink-2)" }}>
                {n.body}
              </p>
            </div>
          ))}
        </div>

        <div
          className="card mt-6 flex flex-col gap-3 p-7"
          style={{ borderLeft: "3px solid var(--accent)" }}
        >
          <span className="eyebrow">{t.needs.noteLabel}</span>
          <p style={{ color: "var(--ink-2)" }}>{t.needs.noteBody}</p>
        </div>
      </Section>

      {/* ── Formulaire ───────────────────────────────────── */}
      <Section
        phos={phos}
        id="rejoindre"
        eyebrow={t.join.eyebrow}
        title={t.join.title}
        lede={t.join.lede}
      >
        <JoinForm t={t.form} />
      </Section>

      <footer
        className="mx-auto max-w-[1140px] border-t px-5 py-14 sm:px-7"
        style={{ borderColor: "var(--rule)", color: "var(--ink-3)" }}
      >
        <p className="max-w-[68ch] text-[0.92rem]">{t.footer}</p>
      </footer>
      {phos && <StatusBar t={t.sensor} />}
    </main>
  );
}

function Section({
  id,
  eyebrow,
  title,
  lede,
  phos,
  children,
}: {
  id?: string;
  phos?: boolean;
  eyebrow: string;
  title: string;
  lede?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="mx-auto max-w-[1140px] scroll-mt-16 border-t px-5 py-16 sm:px-7 sm:py-20"
      style={{ borderColor: "var(--rule)" }}
    >
      <div className="mb-9 flex flex-col gap-3">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className={`${phos ? "prompt " : ""}text-[clamp(1.55rem,3.4vw,2.2rem)] font-semibold`}>
          {title}
        </h2>
        {lede && (
          <p
            className="max-w-[62ch] text-[1.12rem]"
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
