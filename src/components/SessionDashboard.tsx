"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import ProbeChallenge from "@/components/ProbeChallenge";
import { sessionCopy } from "@/lib/session";
import { subscribeToPush } from "@/lib/push";
import { clearAlert, raiseAlert } from "@/lib/alert";
import type { Lang } from "@/lib/content";

import { API } from "@/lib/api";
const KEY = "deciban.session.token";
const POLL_MS = 15000;

/** Lue a l'initialisation : un setState synchrone au montage declenche
 *  un rendu en cascade que le rendu serveur ne peut pas anticiper. */
function readPermission(): NotificationPermission {
  if (typeof window === "undefined" || !("Notification" in window)) return "default";
  return Notification.permission;
}

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
type Health = { dispatcher: { alive: boolean }; push_configured: boolean } | null;

export default function SessionDashboard({ token, lang }: { token: string; lang: Lang }) {
  const s = sessionCopy[lang];

  const [report, setReport] = useState<Report | null>(null);
  const [due, setDue] = useState<Due>(null);
  const [health, setHealth] = useState<Health>(null);
  const [online, setOnline] = useState(true);
  const [missing, setMissing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [perm, setPerm] = useState<NotificationPermission>(readPermission);
  const [pushOn, setPushOn] = useState(false);

  const notified = useRef<string | null>(null);
  // Un controle ecarte a la main ne doit pas revenir au sondage suivant :
  // il sera compte comme manque par le serveur, et c'est le choix de la
  // personne. Le harceler serait pire que le manque lui-meme.
  const dismissed = useRef<Set<string>>(new Set());

  useEffect(() => {
    window.localStorage.setItem(KEY, token);
  }, [token]);

  const poll = useCallback(async () => {
    try {
      const res = await fetch(`${API}/sessions/${token}`, { headers: { Accept: "application/json" } });
      if (res.status === 404) {
        setMissing(true);
        return;
      }
      if (!res.ok) {
        setOnline(false);
        return;
      }
      const data = await res.json();
      setOnline(true);
      setReport(data.session);
      setDue(data.due && dismissed.current.has(data.due.token) ? null : data.due);
    } catch {
      setOnline(false);
    }
  }, [token]);

  useEffect(() => {
    // poll est asynchrone : son premier setState survient apres l'await
    // du fetch, donc jamais pendant le rendu. La regle ne distingue pas
    // les fonctions async, d'ou la desactivation ciblee.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    poll();
    const id = setInterval(poll, POLL_MS);
    return () => clearInterval(id);
  }, [poll]);

  useEffect(() => {
    const check = () =>
      fetch(`${API}/health`, { headers: { Accept: "application/json" } })
        .then((r) => (r.ok ? r.json() : null))
        .then(setHealth)
        .catch(() => setHealth(null));
    check();
    const id = setInterval(check, 45000);
    return () => clearInterval(id);
  }, []);

  /* Abonnement au push dès que la permission est accordée. */
  useEffect(() => {
    if (perm !== "granted") return;
    let cancelled = false;

    (async () => {
      try {
        const { public_key: key } = await fetch(`${API}/vapid`).then((r) => r.json());
        const ok = await subscribeToPush(token, key);
        if (!cancelled) setPushOn(ok);
      } catch {
        if (!cancelled) setPushOn(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [perm, token]);

  /* L'appel : bulle systeme, son, titre et pastille de l'onglet. */
  useEffect(() => {
    if (!due) {
      clearAlert();
      notified.current = null;
      return;
    }
    if (notified.current === due.token) return;
    notified.current = due.token;

    raiseAlert(due.expires_in, s.alertTitle, s.alertBody);
  }, [due, s.alertTitle, s.alertBody]);

  useEffect(() => clearAlert, []);

  async function askPermission() {
    if (!("Notification" in window)) return;
    const result = await Notification.requestPermission();
    setPerm(result);
  }

  if (missing) {
    return (
      <p className="num" style={{ color: "var(--neg)" }}>
        {s.attMissing}
      </p>
    );
  }
  if (!report) {
    return (
      <p className="num" style={{ color: "var(--ink-3)" }}>
        …
      </p>
    );
  }

  const url = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="flex flex-col gap-5">
      {/* La clé */}
      <div className="card flex flex-col gap-3 p-6" style={{ borderLeft: "4px solid var(--seal)" }}>
        <span className="eyebrow" style={{ color: "var(--seal)" }}>{s.keyLabel}</span>
        <h2 className="text-[1.15rem] font-semibold">{s.keyTitle}</h2>
        <p style={{ color: "var(--ink-2)" }}>{s.keyBody}</p>
        <div className="flex flex-wrap items-center gap-3">
          <code className="num session-url">{url}</code>
          <button
            className="btn btn-ghost"
            onClick={() => {
              navigator.clipboard?.writeText(url);
              setCopied(true);
              setTimeout(() => setCopied(false), 1800);
            }}
          >
            {copied ? s.copied : s.copy}
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div
        className="card flex flex-wrap items-center gap-4 p-5"
        style={{ borderLeft: `3px solid ${pushOn ? "var(--pos)" : "var(--signal)"}` }}
      >
        <span className="eyebrow">{s.pushTitle}</span>
        <span className="num text-[0.82rem]" style={{ color: pushOn ? "var(--pos)" : "var(--signal)" }}>
          {pushOn ? s.pushOn : s.pushOff}
        </span>
        {perm === "default" && (
          <button className="btn" onClick={askPermission}>{s.pushAsk}</button>
        )}
        {perm === "denied" && (
          <span className="num text-[0.78rem]" style={{ color: "var(--neg)" }}>{s.pushDenied}</span>
        )}
        {!pushOn && perm !== "denied" && (
          <span className="num text-[0.78rem]" style={{ color: "var(--ink-3)" }}>{s.pushWarnTab}</span>
        )}
      </div>

      {perm !== "granted" && (
        <div className="card flex flex-col gap-2 p-5" style={{ borderLeft: "3px solid var(--neg)" }}>
          <span className="eyebrow" style={{ color: "var(--neg)" }}>{s.notifBlockedTitle}</span>
          <p className="text-[0.95rem]" style={{ color: "var(--ink-2)" }}>{s.notifBlockedBody}</p>
        </div>
      )}

      {/* État du système */}
      {health && (
        <div
          className="card flex flex-wrap items-center gap-4 p-5"
          style={{ borderLeft: `3px solid ${health.dispatcher.alive ? "var(--pos)" : "var(--neg)"}` }}
        >
          <span className="eyebrow">{s.sysTitle}</span>
          <span
            className="num text-[0.82rem]"
            style={{ color: health.dispatcher.alive ? "var(--pos)" : "var(--neg)" }}
          >
            {health.dispatcher.alive ? s.sysDispatcherOn : s.sysDispatcherOff}
          </span>
          {!health.dispatcher.alive && (
            <code className="num session-url">{s.sysHint}</code>
          )}
        </div>
      )}

      {/* La session */}
      <div className="attest">
        <div className="attest-head">
          <span className="num attest-seal">
            <span className="why-dot" aria-hidden="true" />
            {s.liveTitle}
          </span>
          <span className="num attest-url" style={{ color: online ? "var(--pos)" : "var(--neg)" }}>
            {s.linkState} · {online ? s.linkOk : s.linkOff}
          </span>
        </div>
        <div className="flex flex-col">
          <Row k={s.window} v={`${fmt(report.window.starts_at)} → ${fmt(report.window.ends_at)}`} first />
          <Row k={s.elapsed} v={hms(report.window.elapsed_seconds)} />
          <Row
            k={s.checks}
            v={`${report.probes.answered} / ${report.probes.fired} · ${report.probes.total}`}
            tone={report.probes.missed > 0 ? "--neg" : "--pos"}
          />
          <Row k={s.next} v={s.nextValue} tone="--accent" />
          <Row
            k={s.evidence}
            v={`${report.total_db > 0 ? "+" : ""}${report.total_db} db`}
            tone={report.total_db >= 0 ? "--pos" : "--neg"}
            big
          />
          <Row k={s.verdict} v={report.verdict.label} tone={report.total_db >= 10 ? "--pos" : "--accent"} big />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {report.families.map((f) => (
          <div key={f.key} className="card flex flex-col gap-2 p-5">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-[1rem] font-semibold">{f.label}</h3>
              <span className="num text-[1.05rem]" style={{ color: f.db >= 0 ? "var(--pos)" : "var(--neg)" }}>
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
        <Link
          href="/session"
          className="btn btn-ghost"
          style={{ marginLeft: "auto" }}
          onClick={() => window.localStorage.removeItem(KEY)}
        >
          {s.stop}
        </Link>
      </div>

      {due && (
        <ProbeChallenge
          t={s}
          probeToken={due.token}
          expiresIn={due.expires_in}
          onDone={() => {
            setDue(null);
            poll();
          }}
          onDismiss={() => {
            dismissed.current.add(due.token);
            setDue(null);
          }}
        />
      )}
    </div>
  );
}

function Row({ k, v, tone, big, first }: { k: string; v: string; tone?: string; big?: boolean; first?: boolean }) {
  return (
    <div
      className="flex flex-wrap items-baseline justify-between gap-3 px-[22px] py-[12px]"
      style={{ borderTop: first ? "none" : "1px solid var(--rule)" }}
    >
      <span className="num text-[0.7rem] uppercase tracking-[0.11em]" style={{ color: "var(--ink-3)" }}>{k}</span>
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

const fmt = (iso: string) => new Date(iso).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });

function hms(sec: number) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}
