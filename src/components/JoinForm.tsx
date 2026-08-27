"use client";

import { useState } from "react";
import type { Dict } from "@/lib/content";

const API =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8009/api";


type Errors = Record<string, string[]>;

export default function JoinForm({ t }: { t: Dict["form"] }) {
  const ROLES = t.roles;
  const AVAILABILITY = t.availability;
  const [roles, setRoles] = useState<string[]>([]);
  const [availability, setAvailability] = useState("2-5h");
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<number | null>(null);

  const toggleRole = (id: string) =>
    setRoles((r) => (r.includes(id) ? r.filter((x) => x !== id) : [...r, id]));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setErrors({});

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      promethee_handle: String(fd.get("promethee_handle") ?? "").trim() || null,
      github_handle: String(fd.get("github_handle") ?? "").trim() || null,
      motivation: String(fd.get("motivation") ?? "").trim() || null,
      website: String(fd.get("website") ?? ""),
      roles,
      availability,
      source: "landing",
    };

    try {
      const res = await fetch(`${API}/applicants`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors(data.errors ?? { global: [data.message ?? "Erreur inconnue."] });
      } else {
        setDone(data.position ?? 0);
      }
    } catch {
      setErrors({ global: ["Impossible de joindre le serveur. Reessaie."] });
    } finally {
      setSending(false);
    }
  }

  const err = (k: string) => errors[k]?.[0];

  if (done !== null) {
    return (
      <div
        className="card flex flex-col gap-4 p-8"
        style={{ borderTop: "3px solid var(--pos)" }}
      >
        <span className="eyebrow" style={{ color: "var(--pos)" }}>
          {t.successLabel}
        </span>
        <h3 className="text-2xl font-semibold">{t.successTitle}</h3>
        <p style={{ color: "var(--ink-2)" }}>
          {t.successBodyA} <span className="num">{done}</span> {t.successBodyB}
        </p>
        <p className="num text-[0.78rem]" style={{ color: "var(--ink-3)" }}>
          {t.successNote}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card flex flex-col gap-7 p-7 sm:p-9">
      {/* Piege a robots : invisible pour un humain, rempli par les scripts. */}
      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="eyebrow">
            {t.name}
          </label>
          <input id="name" name="name" required className="field" placeholder={t.namePlaceholder} />
          {err("name") && <Err msg={err("name")!} />}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="eyebrow">
            {t.email}
          </label>
          <input id="email" name="email" type="email" required className="field" placeholder={t.emailPlaceholder} />
          {err("email") && <Err msg={err("email")!} />}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="promethee_handle" className="eyebrow">
            {t.handle} <span style={{ textTransform: "none" }}>{t.optional}</span>
          </label>
          <input id="promethee_handle" name="promethee_handle" className="field" placeholder={t.handlePlaceholder} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="github_handle" className="eyebrow">
            {t.github} <span style={{ textTransform: "none" }}>{t.optional}</span>
          </label>
          <input id="github_handle" name="github_handle" className="field" placeholder={t.githubPlaceholder} />
          {err("github_handle") && <Err msg={err("github_handle")!} />}
        </div>
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className="eyebrow mb-1">{t.rolesLegend}</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {ROLES.map(([id, label]) => (
            <button
              key={id}
              type="button"
              className="pill"
              aria-pressed={roles.includes(id)}
              onClick={() => toggleRole(id)}
            >
              {label}
            </button>
          ))}
        </div>
        {err("roles") && <Err msg={err("roles")!} />}
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className="eyebrow mb-1">{t.availabilityLegend}</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {AVAILABILITY.map(([id, label]) => (
            <button
              key={id}
              type="button"
              className="pill"
              aria-pressed={availability === id}
              onClick={() => setAvailability(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor="motivation" className="eyebrow">
          Un mot <span style={{ textTransform: "none" }}>(optionnel)</span>
        </label>
        <textarea
          id="motivation"
          name="motivation"
          rows={4}
          className="field resize-y"
          placeholder={t.motivationPlaceholder}
        />
      </div>

      {errors.global && <Err msg={errors.global[0]} />}

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn" disabled={sending}>
          {sending ? t.submitting : t.submit}
        </button>
        <span className="num text-[0.72rem]" style={{ color: "var(--ink-3)" }}>
          {t.privacy}
        </span>
      </div>
    </form>
  );
}

function Err({ msg }: { msg: string }) {
  return (
    <span className="num text-[0.74rem]" style={{ color: "var(--neg)" }}>
      {msg}
    </span>
  );
}
