"use client";

import Link from "next/link";
import { forwardRef } from "react";
import LangSwitch from "@/components/LangSwitch";
import type { Dict, Lang } from "@/lib/content";

type Props = {
  t: Dict["nav"];
  lang: Lang;
  onSelectLang: (next: Lang) => void;
  onOpenStory?: () => void;
  nudge?: boolean;
  variant?: "home" | "page";
};

const TopBar = forwardRef<HTMLButtonElement, Props>(function TopBar(
  { t, lang, onSelectLang, onOpenStory, nudge, variant = "home" },
  whyRef,
) {
  return (
    <div
      className="sticky top-0 z-30 border-b"
      style={{ background: "var(--ground)", borderColor: "var(--rule)" }}
    >
      <nav className="mx-auto flex max-w-[1140px] flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3 sm:px-7">
        {variant === "home" ? (
          <button ref={whyRef} onClick={onOpenStory} className={`why-link ${nudge ? "why-nudge" : ""}`}>
            <span className="why-dot" aria-hidden="true" />
            {t.why}
          </button>
        ) : (
          <Link href="/" className="nav-link no-underline">
            {t.home}
          </Link>
        )}

        <Link href="/comment-ca-marche" className="nav-link no-underline">
          {t.how}
        </Link>
        <Link href="/algorithme" className="nav-link no-underline">
          {t.algo}
        </Link>
        <Link href="/stack" className="nav-link no-underline">
          {t.stack}
        </Link>
        <Link href="/session" className="nav-link nav-link-go no-underline">
          {t.session}
        </Link>

        <LangSwitch lang={lang} onSelect={onSelectLang} label={t.langLabel} />
      </nav>
    </div>
  );
});

export default TopBar;
