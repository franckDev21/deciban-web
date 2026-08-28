"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AVAILABILITY_LABELS,
  ROLE_LABELS,
  type Roster,
  clearToken,
  fetchRoster,
  getToken,
} from "@/lib/admin";

export default function Inscrits() {
  const router = useRouter();
  const [roster, setRoster] = useState<Roster | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [reload, setReload] = useState(0);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/admin");
      return;
    }

    // Garde d'annulation : sans elle, une reponse arrivant apres le
    // demontage du composant poserait un etat sur un arbre disparu.
    let cancelled = false;

    (async () => {
      try {
        const data = await fetchRoster(token);
        if (!cancelled) setRoster(data);
      } catch (err) {
        if (cancelled) return;
        // Le jeton vit douze heures : au-dela, retour a la connexion.
        if (err instanceof Error && err.message === "SESSION_EXPIREE") {
          clearToken();
          router.replace("/admin");
          return;
        }
        setError(err instanceof Error ? err.message : "Chargement impossible.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router, reload]);

  function logout() {
    clearToken();
    router.replace("/admin");
  }

  if (error) {
    return (
      <main className="mx-auto max-w-[900px] px-5 py-16">
        <p className="num" style={{ color: "var(--neg)" }}>{error}</p>
      </main>
    );
  }

  if (!roster) {
    return (
      <main className="mx-auto max-w-[900px] px-5 py-16">
        <p className="num" style={{ color: "var(--ink-3)" }}>…</p>
      </main>
    );
  }

  const emails = roster.applicants.map((a) => a.email).join(", ");

  return (
    <main className="mx-auto max-w-[980px] px-5 py-14 sm:px-7">
      <header className="mb-9 flex flex-wrap items-end justify-between gap-5">
        <div className="flex flex-col gap-3">
          <span className="eyebrow">Espace privé</span>
          <h1 className="text-[clamp(1.9rem,4.4vw,2.6rem)] font-bold tracking-[-0.03em]">
            {roster.total} inscrit{roster.total > 1 ? "s" : ""}
          </h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            className="btn btn-ghost"
            onClick={() => navigator.clipboard?.writeText(emails)}
          >
            Copier les adresses
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => {
              setRoster(null);
              setReload((n) => n + 1);
            }}
          >
            Rafraîchir
          </button>
          <button className="btn btn-ghost" onClick={logout}>
            Déconnexion
          </button>
        </div>
      </header>

      {Object.keys(roster.by_role).length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {Object.entries(roster.by_role).map(([role, n]) => (
            <span
              key={role}
              className="num rounded-sm border px-3 py-1.5 text-[0.75rem]"
              style={{ borderColor: "var(--rule-strong)", color: "var(--ink-2)" }}
            >
              {ROLE_LABELS[role] ?? role} · {n}
            </span>
          ))}
        </div>
      )}

      {roster.total === 0 ? (
        <p style={{ color: "var(--ink-2)" }}>
          Personne pour l’instant. Les inscriptions arriveront ici.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {roster.applicants.map((a) => (
            <article key={a.id} className="card flex flex-col gap-3 p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="text-[1.1rem] font-semibold">{a.name}</h2>
                <span className="num text-[0.72rem]" style={{ color: "var(--ink-3)" }}>
                  {a.created_at
                    ? new Date(a.created_at).toLocaleString("fr-FR", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </span>
              </div>

              <a
                href={`mailto:${a.email}`}
                className="num text-[0.9rem]"
                style={{ color: "var(--accent)" }}
              >
                {a.email}
              </a>

              <div className="flex flex-wrap gap-2">
                {a.roles.map((r) => (
                  <span
                    key={r}
                    className="num rounded-sm border px-2 py-1 text-[0.68rem]"
                    style={{ borderColor: "var(--seal)", color: "var(--seal)" }}
                  >
                    {ROLE_LABELS[r] ?? r}
                  </span>
                ))}
                <span
                  className="num rounded-sm border px-2 py-1 text-[0.68rem]"
                  style={{ borderColor: "var(--rule-strong)", color: "var(--ink-3)" }}
                >
                  {AVAILABILITY_LABELS[a.availability] ?? a.availability} / semaine
                </span>
              </div>

              {(a.github_handle || a.promethee_handle) && (
                <p className="num text-[0.76rem]" style={{ color: "var(--ink-3)" }}>
                  {a.github_handle && (
                    <a
                      href={`https://github.com/${a.github_handle}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "var(--ink-2)" }}
                    >
                      github.com/{a.github_handle}
                    </a>
                  )}
                  {a.github_handle && a.promethee_handle && " · "}
                  {a.promethee_handle && `Prométhée ${a.promethee_handle}`}
                </p>
              )}

              {a.motivation && (
                <p
                  className="text-[0.95rem]"
                  style={{
                    color: "var(--ink-2)",
                    borderLeft: "2px solid var(--rule-strong)",
                    paddingLeft: "12px",
                  }}
                >
                  {a.motivation}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
