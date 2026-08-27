"use client";

import { useEffect, useState } from "react";
import { content, type Lang } from "@/lib/content";

const LANG_KEY = "deciban.lang";

export function useLang() {
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(LANG_KEY);
      if (saved === "en" || saved === "fr") setLang(saved);
    } catch {
      /* stockage indisponible */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const switchLang = () => {
    const next: Lang = lang === "fr" ? "en" : "fr";
    setLang(next);
    try {
      window.localStorage.setItem(LANG_KEY, next);
    } catch {
      /* stockage indisponible */
    }
  };

  return { lang, t: content[lang], switchLang };
}
