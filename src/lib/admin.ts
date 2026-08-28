import { API } from "@/lib/api";

const TOKEN_KEY = "deciban.admin.token";

export type Applicant = {
  id: number;
  name: string;
  email: string;
  promethee_handle: string | null;
  github_handle: string | null;
  roles: string[];
  availability: string;
  motivation: string | null;
  status: string;
  created_at: string | null;
};

export type Roster = {
  total: number;
  by_role: Record<string, number>;
  applicants: Applicant[];
};

export function getToken(): string | null {
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string): void {
  try {
    window.localStorage.setItem(TOKEN_KEY, token);
  } catch {
    /* stockage indisponible */
  }
}

export function clearToken(): void {
  try {
    window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* stockage indisponible */
  }
}

export async function login(email: string, password: string): Promise<string> {
  const res = await fetch(`${API}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (res.status === 401) throw new Error("Identifiants incorrects.");
  if (res.status === 503)
    throw new Error("Aucun compte d'administration n'est configuré sur le serveur.");
  if (!res.ok) throw new Error("Le serveur n'a pas répondu correctement.");

  return (await res.json()).token as string;
}

export async function fetchRoster(token: string): Promise<Roster> {
  const res = await fetch(`${API}/admin/applicants`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });

  // 401 signifie session expirée : le jeton vit douze heures.
  if (res.status === 401) throw new Error("SESSION_EXPIREE");
  if (!res.ok) throw new Error("Le serveur n'a pas répondu correctement.");

  return res.json();
}

export const ROLE_LABELS: Record<string, string> = {
  design: "Design",
  frontend: "Frontend",
  backend: "Backend",
  data: "Statistiques",
  securite: "Sécurité",
  test: "Tests / red team",
  redaction: "Rédaction",
  autre: "Autre",
};

export const AVAILABILITY_LABELS: Record<string, string> = {
  "moins-2h": "moins de 2 h",
  "2-5h": "2 à 5 h",
  "5-10h": "5 à 10 h",
  "plus-10h": "plus de 10 h",
};
