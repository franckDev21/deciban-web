"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import TopBar from "@/components/TopBar";
import ProbeChallenge from "@/components/ProbeChallenge";
import { useLang } from "@/lib/useLang";
import { sessionCopy } from "@/lib/session";
import { subscribeToPush } from "@/lib/push";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";
const KEY = "deciban.session.token";
const POLL_MS = 15000;

type Report = {
  slug: string;
  handle: string | null;
  window: { starts_at: string; ends_at: string; declared_minutes: number; elapsed_seconds: number; over: boolean };
  probes: { total: number; fired: number; answered: number; missed: number };
  families: { key: string; label: string; db: number; raw: number; capped: boolean; detail: string }[];
  total_db: number;
  verdict: { key: string; label: string };
};
type Due = { token: string; expires_in: number } | null;

export default function SessionPage() {
  const { t: nav, switchLang, lang } = useLang();
  const s = sessionCopy[lang];

  const [token, setToken] = useState<string | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [due, setDue] = useState<Due>(null);
  const [online, setOnline] = useState(true);
  const [starting, setStarting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [minutes, setMinutes] = useState(60);
  const [probes, setProbes] = useState(4);
  const [pushOn, setPushOn] = useState(false);

  const titleFlash = useRef<ReturnType<typeof setInterval> | null>(null);
  const notified = useRef<string | null>(null);

  /* ── Reprise de session ── */
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY);
      if (saved) setToken(saved);
    } catch {
      /* stockage indisponible */
    }
  }, []);

  /* ── Interrogation : « maintenant, oui ou non » ── */
  const poll = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API}/sessions/${token}`, {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        setOnline(false);
        return;
      }
      const data = await res.json();
      setOnline(true);
      setReport(data.session);
      setDue(data.due);
    } catch {
      setOnline(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    poll();
    const id = setInterval(poll, POLL_MS);
    return () => clearInterval(id);
  }, [token, poll]);

  /* ── L'appel : notification, son, titre qui clignote ── */
  useEffect(() => {
    if (!due) {
      if (titleFlash.current) {
        clearInterval(titleFlash.current);
        titleFlash.current = null;
        document.title = "Deciban";
      }
      notified.current = null;
      return;
    }
    if (notified.current === due.token) return;
    notified.current = due.token;

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Deciban · contrôle en cours", {
        body: `${due.expires_in} secondes pour répondre`,
        tag: "deciban-probe",
        requireInteraction: true,
      });
    }

    // Bip court, synthetise : aucun fichier a charger.
    try {
      const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
      /* audio bloque par le navigateur */
    }

    titleFlash.current = setInterval(() => {
      document.title = document.title.startsWith("●")
        ? "Deciban"
        : "● CONTRÔLE · Deciban";
    }, 800);
  }, [due]);

  async function start() {
    setStarting(true);
    if ("Notification" in window && Notification.permission === "default") {
      try {
        await Notification.requestPermission();
      } catch {
        /* refus, on continue */
      }
    }
    try {
      const res = await fetch(`${API}/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ minutes, probes }),
      });
      const data = await res.json();
      if (res.ok) {
        window.localStorage.setItem(KEY, data.token);
        setToken(data.token);
        // L'abonnement echoue silencieusement : l'onglet ouvert reste
        // un canal d'appel valable, le push n'est qu'un renfort.
        setPushOn(await subscribeToPush(data.token, data.vapid_public_key ?? null));
      }
    } catch {
      setOnline(false);
    } finally {
      setStarting(false);
    }
  }

  function stop() {
    window.localStorage.removeItem(KEY);
    setToken(null);
    setReport(null);
    setDue(null);
  }

  const attestUrl = report ? `${window.location.origin}/a/${report.slug}` : "";

  return (
    <main>
      <TopBar t={nav.nav} onSwitchLang={switchLang} variant="page" />

      <header className="mx-auto max-w-[1140px] px-5 pb-8 pt-14 sm:px-7 sm:pt-16">
        <div className="flex flex-col gap-4">
          <span className="eyebrow" style={{ color: "var(--pos)" }}>
            {s.eyebrow}
          </span>
          <h1 className="text-[clamp(2.2rem,5.5vw,3.4rem)] font-bold tracking-[-0.035em]">
            {s.title}
          </h1>
          <p className="max-w-[62ch] text-[1.14rem]" style={{ color: "var(--ink-2)" }}>
            {s.lede}
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-[1140px] px-5 pb-16 sm:px-7">
        {!token ? (
          <div className="card flex max-w-[640px] flex-col gap-6 p-7 sm:p-9">
            <div className="flex flex-col gap-2">
              <h2 className="text-[1.3rem] font-semibold">{s.startTitle}</h2>
              <p style={{ color: "var(--ink-2)" }}>{s.startLede}</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="min" className="eyebrow">{s.minutes}</label>
                <select
                  id="min"
                  className="field"
                  value={minutes}
                  onChange={(e) => setMinutes(Number(e.target.value))}
                >
                  <option value={15}>15 min</option>
                  <option value={30}>30 min</option>
                  <option value={60}>1 h</option>
                  <option value={120}>2 h</option>
                  <option value={240}>4 h</option>
                  <option value={480}>8 h</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="pr" className="eyebrow">{s.probes}</label>
                <select
                  id="pr"
                  className="field"
                  value={probes}
                  onChange={(e) => setProbes(Number(e.target.value))}
                >
                  {[2, 3, 4, 6, 8, 10].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>

            <p className="num text-[0.76rem]" style={{ color: "var(--ink-3)" }}>
              {s.probesHint}
            </p>
            <p className="num text-[0.76rem]" style={{ color: "var(--signal)" }}>
              {s.notifWarn}
            </p>

            <button className="btn w-fit" onClick={start} disabled={starting}>
              {starting ? s.starting : s.start}
            </button>
          </div>
        ) : report ? (
          <div className="flex flex-col gap-5">
            <div className="attest">
              <div className="attest-head">
                <span className="num attest-seal">
                  <span className="why-dot" aria-hidden="true" />
                  {s.liveTitle}
                </span>
                <span className="num attest-url" style={{ color: online ? "var(--pos)" : "var(--neg)" }}>
                  {s.linkState} · {online ? s.linkOk : s.linkOff}
                  {pushOn && " · push"}
                </span>
              </div>

              <div className="flex flex-col">
                <Row k={s.window} v={`${fmt(report.window.starts_at)} → ${fmt(report.window.ends_at)}`} first />
                <Row k={s.elapsed} v={hms(report.window.elapsed_seconds)} />
                <Row
                  k={s.checks}
                  v={`${report.probes.answered} / ${report.probes.fired} · ${report.probes.total} prévus`}
                  tone={report.probes.missed > 0 ? "--neg" : "--pos"}
                />
                <Row k={s.next} v={s.nextValue} tone="--accent" />
                <Row k={s.evidence} v={`${report.total_db > 0 ? "+" : ""}${report.total_db} db`} tone={report.total_db >= 0 ? "--pos" : "--neg"} big />
                <Row k={s.verdict} v={report.verdict.label} tone={report.total_db >= 10 ? "--pos" : "--accent"} big />
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {report.families.map((f) => (
                <div key={f.key} className="card flex flex-col gap-2 p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-[1rem] font-semibold">{f.label}</h3>
                    <span
                      className="num text-[1.05rem]"
                      style={{ color: f.db >= 0 ? "var(--pos)" : "var(--neg)" }}
                    >
                      {f.db > 0 ? "+" : ""}{f.db} db
                    </span>
                  </div>
                  <p className="num text-[0.76rem]" style={{ color: "var(--ink-3)" }}>
                    {f.detail}
                    {f.capped && ` · brut ${f.raw > 0 ? "+" : ""}${f.raw}, plafonné`}
                  </p>
                </div>
              ))}
            </div>

            <div className="card flex flex-wrap items-center gap-4 p-5">
              <span className="eyebrow">{s.link}</span>
              <Link href={`/a/${report.slug}`} className="num text-[0.85rem]" style={{ color: "var(--accent)" }}>
                /a/{report.slug}
              </Link>
              <button
                className="btn btn-ghost"
                onClick={() => {
                  navigator.clipboard?.writeText(attestUrl);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1800);
                }}
              >
                {copied ? s.copied : s.copy}
              </button>
              <button className="btn btn-ghost" onClick={stop} style={{ marginLeft: "auto" }}>
                {s.stop}
              </button>
            </div>
          </div>
        ) : (
          <p className="num" style={{ color: "var(--ink-3)" }}>…</p>
        )}
      </section>

      {due && (
        <ProbeChallenge
          t={s}
          probeToken={due.token}
          expiresIn={due.expires_in}
          onDone={() => {
            setDue(null);
            poll();
          }}
        />
      )}
    </main>
  );
}

function Row({ k, v, tone, big, first }: { k: string; v: string; tone?: string; big?: boolean; first?: boolean }) {
  return (
    <div
      className="flex flex-wrap items-baseline justify-between gap-3 px-[22px] py-[12px]"
      style={{ borderTop: first ? "none" : "1px solid var(--rule)" }}
    >
      <span className="num text-[0.7rem] uppercase tracking-[0.11em]" style={{ color: "var(--ink-3)" }}>
        {k}
      </span>
      <span
        className="num"
        style={{
          color: tone ? `var(${tone})` : "var(--ink)",
          fontSize: big ? "1.2rem" : "0.92rem",
          fontWeight: big ? 600 : 400,
        }}
      >
        {v}
      </span>
    </div>
  );
}

const fmt = (iso: string) =>
  new Date(iso).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });

function hms(sec: number) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}
