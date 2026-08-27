/**
 * Signalement d'un controle en cours.
 *
 * Trois canaux, parce qu'aucun ne suffit seul :
 *   - la bulle du systeme, seule visible hors du navigateur, mais soumise
 *     a une autorisation que beaucoup refusent ou oublient
 *   - le son, qui traverse tout mais ne dit pas d'ou il vient
 *   - le titre et la pastille de l'onglet, visibles dans la barre meme
 *     quand la page est en arriere-plan
 */

const ICON = (color: string, glyph: string) =>
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="12" fill="${color}"/>
      <text x="32" y="45" font-family="monospace" font-size="38"
            font-weight="700" fill="#08090d" text-anchor="middle">${glyph}</text>
    </svg>`,
  );

const IDLE = ICON("#8fb8ec", "d");
const ALERT = ICON("#f27db0", "!");

let flash: ReturnType<typeof setInterval> | null = null;
let originalTitle = "Deciban";

function favicon(): HTMLLinkElement {
  let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  return link;
}

function beep(): void {
  try {
    const Ctx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.45);
  } catch {
    // L'audio peut etre bloque tant que la page n'a pas ete touchee.
  }
}

export function raiseAlert(seconds: number, title: string, body: string): void {
  originalTitle = document.title.replace(/^● [^·]+· /, "");

  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, {
      body: body.replace("{s}", String(seconds)),
      tag: "deciban-probe",
      requireInteraction: true,
      icon: ALERT,
    });
  }

  beep();

  const link = favicon();
  if (flash) clearInterval(flash);
  flash = setInterval(() => {
    const on = document.title.startsWith("●");
    document.title = on ? originalTitle : `● ${title}`;
    link.href = on ? IDLE : ALERT;
  }, 800);
}

export function clearAlert(): void {
  if (flash) {
    clearInterval(flash);
    flash = null;
  }
  document.title = originalTitle;
  favicon().href = IDLE;
}
