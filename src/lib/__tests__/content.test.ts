import { describe, expect, it } from "vitest";
import { content } from "@/lib/content";
import { algo } from "@/lib/algo";
import { formulas, statusLabel } from "@/lib/formulas";
import { implementation } from "@/lib/algo-impl";
import { sessionCopy } from "@/lib/session";

/** Toute clef presente en francais doit exister en anglais, et l'inverse. */
function shapeOf(value: unknown): unknown {
  if (Array.isArray(value)) return value.length;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => [k, shapeOf(v)]),
    );
  }
  return typeof value;
}

describe("dictionnaires bilingues", () => {
  it.each([
    ["content", content],
    ["algo", algo],
    ["formulas", formulas],
    ["implementation", implementation],
    ["sessionCopy", sessionCopy],
  ])("%s a la meme forme en francais et en anglais", (_name, dict) => {
    const d = dict as Record<string, unknown>;
    expect(shapeOf(d.en)).toEqual(shapeOf(d.fr));
  });

  it("ne laisse aucune chaine vide", () => {
    const empties: string[] = [];
    const walk = (value: unknown, path: string) => {
      if (typeof value === "string") {
        if (!value.trim()) empties.push(path);
        return;
      }
      if (Array.isArray(value)) return value.forEach((v, i) => walk(v, `${path}[${i}]`));
      if (value && typeof value === "object") {
        Object.entries(value).forEach(([k, v]) => walk(v, `${path}.${k}`));
      }
    };
    walk(content, "content");
    walk(sessionCopy, "sessionCopy");
    expect(empties).toEqual([]);
  });
});

describe("planche de demonstration", () => {
  it("annonce un statut connu pour chaque planche", () => {
    for (const lang of ["fr", "en"] as const) {
      for (const plate of formulas[lang].plates) {
        expect(Object.keys(statusLabel[lang])).toContain(plate.status);
      }
    }
  });

  it("porte une reserve sur toute planche qui n'est pas exacte", () => {
    for (const lang of ["fr", "en"] as const) {
      for (const plate of formulas[lang].plates) {
        if (plate.status !== "exact") {
          expect(plate.caveat, `${lang} · planche ${plate.n}`).toBeTruthy();
        }
      }
    }
  });

  it("signale les planches qui ne tournent pas dans le code", () => {
    const inactives = formulas.fr.plates.filter((p) =>
      ["absent", "inerte"].includes(p.status),
    );
    // La correlation latence-difficulte et la famille des pieges.
    expect(inactives).toHaveLength(2);
  });

  it("annonce le nombre de signaux et de familles reellement documentes", () => {
    // Ce test existe parce que ces chiffres ont deja derive : la page
    // d'accueil annoncait un moteur plus riche que celui qui tourne.
    for (const lang of ["fr", "en"] as const) {
      const families = implementation[lang].families;
      const signals = families.reduce((n, f) => n + f.signals.length, 0);

      const claims = [
        ...content[lang].hero.meta,
        ...content[lang].hero.boot.map((b) => b.value),
      ].filter((v) => /signa/i.test(v));

      expect(claims.length).toBeGreaterThan(0);
      for (const claim of claims) {
        const [n, f] = (claim.match(/\d+/g) ?? []).map(Number);
        expect(n, `${lang} · "${claim}"`).toBe(signals);
        expect(f, `${lang} · "${claim}"`).toBe(families.length);
      }
    }
  });

  it("documente chaque famille avec son fichier source", () => {
    for (const lang of ["fr", "en"] as const) {
      for (const family of implementation[lang].families) {
        expect(family.file).toMatch(/^app\/Services\/|^deciban\/services\//);
        expect(family.signals.length).toBeGreaterThan(0);
      }
    }
  });
});
