import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { clearAlert, raiseAlert } from "@/lib/alert";

type Captured = { title: string } & NotificationOptions;

function stubNotification(permission: NotificationPermission): Captured[] {
  const seen: Captured[] = [];
  class Fake {
    static permission = permission;
    static requestPermission = () => Promise.resolve(permission);
    constructor(title: string, options?: NotificationOptions) {
      seen.push({ title, ...options });
    }
  }
  vi.stubGlobal("Notification", Fake);
  return seen;
}

describe("signalement d'un controle", () => {
  beforeEach(() => {
    // Vider head en premier : cela emporte l'element <title>, donc le
    // titre doit etre repose ensuite.
    document.head.innerHTML = "";
    document.title = "Deciban";
    vi.useFakeTimers();
  });

  afterEach(() => {
    clearAlert();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("declenche une bulle systeme quand la permission est accordee", () => {
    const seen = stubNotification("granted");
    raiseAlert(90, "Deciban · contrôle en cours", "{s} secondes pour répondre");

    expect(seen).toHaveLength(1);
    expect(seen[0].title).toBe("Deciban · contrôle en cours");
    expect(seen[0].body).toBe("90 secondes pour répondre");
  });

  it("garde la bulle affichee jusqu'au clic, comme une messagerie", () => {
    const seen = stubNotification("granted");
    raiseAlert(90, "titre", "{s} s");
    expect(seen[0].requireInteraction).toBe(true);
    expect(seen[0].tag).toBe("deciban-probe");
  });

  it("ne declenche aucune bulle si la permission est refusee", () => {
    const seen = stubNotification("denied");
    raiseAlert(90, "titre", "{s} s");
    expect(seen).toHaveLength(0);
  });

  it("signale quand meme dans l'onglet si la bulle est bloquee", () => {
    stubNotification("denied");
    raiseAlert(90, "contrôle en cours", "{s} s");
    vi.advanceTimersByTime(800);

    expect(document.title).toContain("●");
    const icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    expect(icon?.href).toContain("f27db0");
  });

  it("restaure le titre et la pastille a la fermeture", () => {
    stubNotification("granted");
    raiseAlert(90, "contrôle en cours", "{s} s");
    vi.advanceTimersByTime(800);
    clearAlert();

    expect(document.title).toBe("Deciban");
    const icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    expect(icon?.href).not.toContain("f27db0");
  });

  it("n'empile jamais deux clignotements", () => {
    stubNotification("granted");
    raiseAlert(90, "un", "{s} s");
    raiseAlert(60, "deux", "{s} s");
    clearAlert();

    const before = document.title;
    vi.advanceTimersByTime(3200);
    expect(document.title).toBe(before);
  });
});
