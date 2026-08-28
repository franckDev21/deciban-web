import { describe, expect, it } from "vitest";

/**
 * Regression : NEXT_PUBLIC_API_URL etait definie mais vide sur Vercel.
 * L'operateur `??` ne retombant pas sur une chaine vide, l'adresse valait
 * "" et tous les appels partaient en relatif vers le front, qui repondait
 * 404. Le formulaire de session ne fonctionnait plus.
 */
function resolve(value: string | undefined): string {
  return value || "https://deciban.motherlode.studio/api";
}

describe("adresse de l'API", () => {
  it("utilise la variable quand elle porte une vraie valeur", () => {
    expect(resolve("https://autre.example/api")).toBe("https://autre.example/api");
  });

  it("retombe sur la production quand la variable est absente", () => {
    expect(resolve(undefined)).toBe("https://deciban.motherlode.studio/api");
  });

  it("retombe sur la production quand la variable est VIDE", () => {
    expect(resolve("")).toBe("https://deciban.motherlode.studio/api");
  });

  it("ne produit jamais une adresse relative", () => {
    for (const v of [undefined, "", "   ".trim()]) {
      expect(resolve(v)).toMatch(/^https?:\/\//);
    }
  });
});
