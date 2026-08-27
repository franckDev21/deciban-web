"use client";

import Link from "next/link";
import { forwardRef } from "react";
import type { Dict } from "@/lib/content";

type Props = {
  t: Dict["nav"];
  onSwitchLang: () => void;
  onOpenStory?: () => void;
  nudge?: boolean;
  variant?: "home" | "page";
};

const TopBar = forwardRef<HTMLButtonElement, Props>(function TopBar(
  { t, onSwitchLang, onOpenStory, nudge, variant = "home" },
  whyRef,
) {
  return (
    <div
      className="sticky top-0 z-30 border-b"
      style={{ background: "var(--ground)", borderColor: "var(--rule)" }}
    >
      <div className="mx-auto flex max-w-[1140px] items-center justify-between gap-3 px-5 py-3 sm:px-7">
        <div className="flex items-center gap-2 sm:gap-3">
          {variant === "home" ? (
            <button
              ref={whyRef}
              onClick={onOpenStory}
              className={`why-link num ${nudge ? "why-nudge" : ""}`}
            >
              <span className="why-dot" aria-hidden="true" />
              {t.why}
            </button>
          ) : (
            <Link href="/" className="nav-link num no-underline">
              ← {t.home}
            </Link>
          )}

          {variant === "home" && (
            <Link
              href="/comment-ca-marche"
              className="nav-link num no-underline"
            >
              {t.how}
            </Link>
          )}
        </div>

        <button
          onClick={onSwitchLang}
          className="lang-switch num"
          aria-label={t.langLabel}
        >
          {t.langShort}
        </button>
      </div>
    </div>
  );
});

export default TopBar;
