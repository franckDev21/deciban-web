"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getToken, login, setToken } from "@/lib/admin";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (getToken()) router.replace("/admin/inscrits");
  }, [router]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      setToken(await login(email.trim(), password));
      router.push("/admin/inscrits");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connexion impossible.");
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-[440px] flex-col justify-center px-5 py-16">
      <div className="mb-8 flex flex-col gap-3">
        <span className="eyebrow">Espace privé</span>
        <h1 className="text-[2rem] font-bold tracking-[-0.03em]">Connexion</h1>
        <p style={{ color: "var(--ink-2)" }}>
          Réservé au responsable du projet. Les adresses des personnes inscrites
          ne sont jamais accessibles sans authentification.
        </p>
      </div>

      <form onSubmit={submit} className="card flex flex-col gap-5 p-7">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="eyebrow">Adresse</label>
          <input
            id="email"
            type="email"
            required
            autoComplete="username"
            className="field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="eyebrow">Mot de passe</label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            className="field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <p className="num text-[0.8rem]" style={{ color: "var(--neg)" }}>
            {error}
          </p>
        )}

        <button type="submit" className="btn w-fit" disabled={busy}>
          {busy ? "Connexion…" : "Se connecter"}
        </button>
      </form>
    </main>
  );
}
