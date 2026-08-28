"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { content, type Lang } from "@/lib/content";

const LANG_KEY = "deciban.lang";

/**
 * La langue vit dans localStorage, un magasin exterieur a React.
 * useSyncExternalStore est la primitive prevue pour cela : elle evite le
 * rendu en cascade d'un useEffect qui appellerait setState au montage, et
 * fournit un instantane distinct pour le rendu serveur.
 */
const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getSnapshot(): Lang {
  try {
    const saved = window.localStorage.getItem(LANG_KEY);
    return saved === "en" ? "en" : "fr";
  } catch {
    return "fr";
  }
}

/** Le serveur ne connait pas le choix de la personne : il rend le francais. */
function getServerSnapshot(): Lang {
  return "fr";
}

export function useLang() {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const selectLang = useCallback((next: Lang) => {
    try {
      window.localStorage.setItem(LANG_KEY, next);
    } catch {
      /* stockage indisponible */
    }
    listeners.forEach((l) => l());
  }, []);

  return { lang, t: content[lang], selectLang };
}
