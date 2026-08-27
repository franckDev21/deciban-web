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

  const selectLang = (next: Lang) => {
    setLang(next);
    try {
      window.localStorage.setItem(LANG_KEY, next);
    } catch {
      /* stockage indisponible */
    }
  };

  const switchLang = () => selectLang(lang === "fr" ? "en" : "fr");

  return { lang, t: content[lang], selectLang, switchLang };
}
