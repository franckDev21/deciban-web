"use client";

import Link from "next/link";
import { useLang } from "@/lib/useLang";

const COPY = {
  fr: {
    tag: "● proposition de direction n°1 · phosphore",
    body: "Une piste parmi d’autres. Rien n’est tranché, et la tienne est la bienvenue.",
    back: "voir le site actuel",
  },
  en: {
    tag: "● art direction proposal no.1 · phosphore",
    body: "One path among others. Nothing is settled, and yours is welcome.",
    back: "see the current site",
  },
};

export default function DaBanner() {
  const { lang } = useLang();
  const c = COPY[lang];

  return (
    <div className="da-banner">
      <div className="da-banner-in">
        <span
          className="num"
          style={{
            color: "var(--seal)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {c.tag}
        </span>
        <span style={{ color: "var(--ink-2)" }}>{c.body}</span>
        <Link href="/" className="nav-link" style={{ marginLeft: "auto" }}>
          {c.back}
        </Link>
      </div>
    </div>
  );
}
