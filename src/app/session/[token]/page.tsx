"use client";

import { use } from "react";
import TopBar from "@/components/TopBar";
import SessionDashboard from "@/components/SessionDashboard";
import { useLang } from "@/lib/useLang";
import { sessionCopy } from "@/lib/session";

export default function SessionByToken({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = use(params);
  const { t: nav, switchLang, lang } = useLang();
  const s = sessionCopy[lang];

  return (
    <main>
      <TopBar t={nav.nav} onSwitchLang={switchLang} variant="page" />
      <section className="mx-auto max-w-[1140px] px-5 py-12 sm:px-7 sm:py-14">
        <div className="mb-8 flex flex-col gap-3">
          <span className="eyebrow" style={{ color: "var(--pos)" }}>{s.eyebrow}</span>
          <h1 className="text-[clamp(1.9rem,4.6vw,2.8rem)] font-bold tracking-[-0.035em]">
            {s.liveTitle}
          </h1>
        </div>
        <SessionDashboard token={token} lang={lang} />
      </section>
    </main>
  );
}
