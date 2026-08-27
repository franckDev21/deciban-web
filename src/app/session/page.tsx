"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TopBar from "@/components/TopBar";
import { useLang } from "@/lib/useLang";
import { sessionCopy } from "@/lib/session";
import { subscribeToPush } from "@/lib/push";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";
const KEY = "deciban.session.token";

export default function StartSession() {
  const router = useRouter();
  const { t: nav, switchLang, lang } = useLang();
  const s = sessionCopy[lang];

  const [minutes, setMinutes] = useState(60);
  const [probes, setProbes] = useState(4);
  const [handle, setHandle] = useState("");
  const [starting, setStarting] = useState(false);
  const [previous, setPrevious] = useState<string | null>(null);

  useEffect(() => {
    try {
      setPrevious(window.localStorage.getItem(KEY));
    } catch {
      /* stockage indisponible */
    }
  }, []);

  async function start() {
    setStarting(true);
    if ("Notification" in window && Notification.permission === "default") {
      try {
        await Notification.requestPermission();
      } catch {
        /* refus, on continue sans push */
      }
    }
    try {
      const res = await fetch(`${API}/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ minutes, probes, handle: handle.trim() || null }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStarting(false);
        return;
      }
      window.localStorage.setItem(KEY, data.token);
      await subscribeToPush(data.token, data.vapid_public_key ?? null);
      router.push(`/session/${data.token}`);
    } catch {
      setStarting(false);
    }
  }

  return (
    <main>
      <TopBar t={nav.nav} onSwitchLang={switchLang} variant="page" />

      <header className="mx-auto max-w-[1140px] px-5 pb-8 pt-14 sm:px-7 sm:pt-16">
        <div className="flex flex-col gap-4">
          <span className="eyebrow" style={{ color: "var(--pos)" }}>{s.eyebrow}</span>
          <h1 className="text-[clamp(2.2rem,5.5vw,3.4rem)] font-bold tracking-[-0.035em]">{s.title}</h1>
          <p className="max-w-[62ch] text-[1.14rem]" style={{ color: "var(--ink-2)" }}>{s.lede}</p>
        </div>
      </header>

      <section className="mx-auto max-w-[1140px] px-5 pb-16 sm:px-7">
        {previous && (
          <div className="card mb-5 flex flex-wrap items-center gap-4 p-5" style={{ borderLeft: "3px solid var(--accent)" }}>
            <span className="eyebrow">{s.resume}</span>
            <Link href={`/session/${previous}`} className="btn btn-ghost">
              /session/{previous.slice(0, 8)}…
            </Link>
          </div>
        )}

        <div className="card flex max-w-[640px] flex-col gap-6 p-7 sm:p-9">
          <div className="flex flex-col gap-2">
            <h2 className="text-[1.3rem] font-semibold">{s.startTitle}</h2>
            <p style={{ color: "var(--ink-2)" }}>{s.startLede}</p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="handle" className="eyebrow">{s.handle}</label>
            <input
              id="handle"
              className="field"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder={s.handlePh}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="min" className="eyebrow">{s.minutes}</label>
              <select id="min" className="field" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))}>
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
              <select id="pr" className="field" value={probes} onChange={(e) => setProbes(Number(e.target.value))}>
                {[2, 3, 4, 6, 8, 10].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>

          <p className="num text-[0.76rem]" style={{ color: "var(--ink-3)" }}>{s.probesHint}</p>
          <p className="num text-[0.76rem]" style={{ color: "var(--signal)" }}>{s.notifWarn}</p>

          <button className="btn w-fit" onClick={start} disabled={starting}>
            {starting ? s.starting : s.start}
          </button>
        </div>
      </section>
    </main>
  );
}
