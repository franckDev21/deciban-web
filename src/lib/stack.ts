import type { Lang } from "@/lib/content";

export type Piece = { name: string; role: string; why: string };
export type Endpoint = { method: string; path: string; role: string };

export const stack: Record<Lang, {
  eyebrow: string;
  title: string;
  lede: string;

  layersTitle: string;
  layers: { title: string; sub: string; pieces: Piece[] }[];

  apiTitle: string;
  apiLede: string;
  apiCols: [string, string];
  endpoints: Endpoint[];

  ciTitle: string;
  ciLede: string;
  ciSteps: { title: string; body: string }[];

  dockerTitle: string;
  dockerLede: string;
  dockerBody: string[];
  dockerCmd: string;

  whyTitle: string;
  whyBody: string[];

  startTitle: string;
  startLede: string;
  startCmds: { label: string; cmd: string }[];
}> = {
  fr: {
    eyebrow: "Sous le capot",
    title: "La pile technique",
    lede: "Tout est ouvert, tout est testé, et rien n’est choisi par habitude. Voici ce qui tourne et pourquoi.",

    layersTitle: "Les couches",
    layers: [
      {
        title: "Interface",
        sub: "ce que voient les gens",
        pieces: [
          { name: "Next.js 16", role: "rendu et routage", why: "React côté serveur, routes statiques, zéro configuration de bundler." },
          { name: "TypeScript", role: "typage", why: "Un dictionnaire bilingue mal formé casse la compilation au lieu de casser la page." },
          { name: "Tailwind CSS 4", role: "mise en page", why: "Les jetons de couleur vivent dans une seule feuille, donc une direction artistique se remplace sans toucher aux composants." },
          { name: "KaTeX", role: "formules", why: "Rendu mathématique local, sans dépendance à un service extérieur." },
          { name: "Vitest", role: "tests", why: "Vérifie notamment que toute planche non exacte porte bien sa réserve." },
        ],
      },
      {
        title: "API",
        sub: "le moteur de preuve",
        pieces: [
          { name: "Python 3.12", role: "langage", why: "Choisi pour scipy, pas pour la vitesse : PHP 8.4 est plus rapide sur ce type de charge." },
          { name: "FastAPI", role: "cadre web", why: "Documentation OpenAPI générée depuis les types, sans fichier à maintenir." },
          { name: "Pydantic v2", role: "validation", why: "Le piège à robots et les bornes de durée sont des règles déclarées, pas du code défensif." },
          { name: "SQLAlchemy 2", role: "persistance", why: "Un type maison garantit l’UTC dans les deux sens, ce que SQLite ne fait pas. Le schéma est créé au démarrage : une vraie chaîne de migrations reste à ajouter avant la production." },
          { name: "scipy et numpy", role: "statistiques", why: "Quantiles exacts de la loi Bêta, et vrai passe-bande à 8–12 Hz. C’est la seule vraie raison du passage à Python." },
          { name: "pytest", role: "tests", why: "62 tests, des seuils de score jusqu’à la non-divulgation des horaires." },
        ],
      },
      {
        title: "Exécution",
        sub: "ce qui fait tourner l’ensemble",
        pieces: [
          { name: "Uvicorn", role: "serveur ASGI", why: "Serveur de production, pas un serveur de développement déguisé." },
          { name: "Répartiteur", role: "déclenchement", why: "Processus séparé. Sans lui, aucun contrôle ne part jamais." },
          { name: "Web Push", role: "notification", why: "Le serveur pousse : le navigateur ne peut pas apprendre l’horaire puisqu’il ne le demande jamais." },
          { name: "Docker", role: "empaquetage", why: "Un contributeur sous Windows obtient le même environnement qu’un autre sous Linux." },
          { name: "GitHub Actions", role: "intégration", why: "Lint, types, tests et démarrage réel de la pile à chaque proposition." },
        ],
      },
    ],

    apiTitle: "Les points d’entrée",
    apiLede: "Documentation interactive complète sur /docs, générée depuis le code lui-même.",
    apiCols: ["Route", "Rôle"],
    endpoints: [
      { method: "POST", path: "/api/sessions", role: "Ouvre une fenêtre et tire les contrôles en secret" },
      { method: "GET", path: "/api/sessions/{token}", role: "État de la session, et contrôle en cours s’il y en a un" },
      { method: "POST", path: "/api/probes/{token}", role: "Reçoit la trace d’un contrôle, la mesure, rend la preuve" },
      { method: "POST", path: "/api/sessions/{token}/subscribe", role: "Enregistre l’abonnement Web Push du navigateur" },
      { method: "GET", path: "/api/attestations/{slug}", role: "Attestation publique, sans aucun secret de session" },
      { method: "GET", path: "/api/calibration", role: "État de validation des poids, publié pour être contesté" },
      { method: "GET", path: "/api/health", role: "Le répartiteur tourne-t-il vraiment" },
      { method: "GET", path: "/api/vapid", role: "Clé publique nécessaire à l’abonnement" },
      { method: "POST", path: "/api/applicants", role: "Inscription à l’équipe, avec piège à robots" },
    ],

    ciTitle: "Intégration continue",
    ciLede: "Rien n’est fusionné sans que la chaîne entière soit passée au vert.",
    ciSteps: [
      { title: "Style et types", body: "Ruff sur le code Python, ESLint sur le front, mypy en avertissement. Un code mal formé ne devient pas une discussion de revue." },
      { title: "Tests", body: "62 tests Python et 16 tests front. Ils couvrent les seuils du moteur, les plafonds de famille, l’absence de pénalité sur signal manquant et la non-divulgation des horaires." },
      { title: "Construction des images", body: "Les deux images Docker sont bâties avec le cache d’Actions, donc une proposition qui casse la construction se voit tout de suite." },
      { title: "Démarrage réel", body: "La pile est lancée pour de vrai et l’on attend que /api/health réponde. Une image qui compile mais ne démarre pas échoue ici." },
    ],

    dockerTitle: "Docker",
    dockerLede: "Ton intuition était juste, et pour la bonne raison.",
    dockerBody: [
      "Docker n’apporte aucune performance ici. Il apporte de l’uniformité, et c’est exactement ce dont un projet communautaire a besoin : quelqu’un sous Windows, quelqu’un sous Linux et quelqu’un sous macOS obtiennent le même environnement sans installer ni Python, ni Node, ni la moindre bibliothèque scientifique.",
      "Sans lui, la première contribution commence par une heure de dépannage d’installation, et beaucoup abandonnent là. C’est le vrai coût qu’il supprime.",
      "Le compose lance aussi le répartiteur, le service qu’on oublie toujours et sans lequel aucun contrôle ne se déclenche.",
    ],
    dockerCmd: "docker compose up --build",

    whyTitle: "Pourquoi Python plutôt que PHP",
    whyBody: [
      "Pas pour la vitesse. Sur ce type de charge, PHP 8.4 avec son compilateur à la volée est généralement devant CPython. Annoncer un gain de performance serait faux, et un développeur le relèverait le premier jour.",
      "La raison est mathématique. scipy fournit la fonction quantile exacte de la loi Bêta, ce qui supprime l’approximation normale qui était mauvaise sur deux ou trois contrôles. Et scipy.signal fournit un vrai passe-bande à 8–12 Hz, qui remplace une différence seconde ne mesurant pas la bonne chose et non comparable d’une machine à l’autre.",
      "Autrement dit, le passage à Python a transformé deux approximations de la planche de démonstration en mesures exactes. C’est un argument qu’un statisticien accepte ; « Python est plus rapide » ne l’aurait pas été.",
    ],

    startTitle: "Démarrer",
    startLede: "Trois terminaux, ou un seul avec Docker.",
    startCmds: [
      { label: "Tout, en une commande", cmd: "docker compose up --build" },
      { label: "API seule", cmd: "cd api-py && uvicorn deciban.main:app --reload --port 8000" },
      { label: "Répartiteur, sans lui rien ne part", cmd: "cd api-py && python -m deciban.dispatcher --watch" },
      { label: "Interface", cmd: "cd web && npm run dev" },
      { label: "Tests", cmd: "cd api-py && pytest  ·  cd web && npm run test" },
    ],
  },

  en: {
    eyebrow: "Under the hood",
    title: "The technical stack",
    lede: "Everything is open, everything is tested, and nothing was chosen out of habit. Here is what runs, and why.",

    layersTitle: "The layers",
    layers: [
      {
        title: "Interface",
        sub: "what people see",
        pieces: [
          { name: "Next.js 16", role: "rendering and routing", why: "Server-side React, static routes, no bundler configuration." },
          { name: "TypeScript", role: "typing", why: "A malformed bilingual dictionary breaks the build instead of breaking the page." },
          { name: "Tailwind CSS 4", role: "layout", why: "Colour tokens live in one stylesheet, so an art direction can be swapped without touching components." },
          { name: "KaTeX", role: "formulas", why: "Local mathematical rendering, with no dependency on an outside service." },
          { name: "Vitest", role: "tests", why: "Checks, among other things, that every non-exact plate carries its caveat." },
        ],
      },
      {
        title: "API",
        sub: "the evidence engine",
        pieces: [
          { name: "Python 3.12", role: "language", why: "Chosen for scipy, not for speed: PHP 8.4 is faster on this kind of workload." },
          { name: "FastAPI", role: "web framework", why: "OpenAPI documentation generated from the types, with no file to maintain." },
          { name: "Pydantic v2", role: "validation", why: "The bot trap and the duration bounds are declared rules, not defensive code." },
          { name: "SQLAlchemy 2", role: "persistence", why: "A custom type guarantees UTC in both directions, which SQLite does not. The schema is created at startup: a real migration chain is still to be added before production." },
          { name: "scipy and numpy", role: "statistics", why: "Exact Beta quantiles, and a genuine 8–12 Hz band-pass. This is the only real reason for moving to Python." },
          { name: "pytest", role: "tests", why: "62 tests, from score thresholds to the non-disclosure of check schedules." },
        ],
      },
      {
        title: "Runtime",
        sub: "what keeps it all running",
        pieces: [
          { name: "Uvicorn", role: "ASGI server", why: "A production server, not a development server in disguise." },
          { name: "Dispatcher", role: "firing checks", why: "A separate process. Without it, no check ever fires." },
          { name: "Web Push", role: "notification", why: "The server pushes: the browser cannot learn the schedule because it never asks." },
          { name: "Docker", role: "packaging", why: "A contributor on Windows gets the same environment as one on Linux." },
          { name: "GitHub Actions", role: "integration", why: "Lint, types, tests and a real stack boot on every proposal." },
        ],
      },
    ],

    apiTitle: "The endpoints",
    apiLede: "Full interactive documentation at /docs, generated from the code itself.",
    apiCols: ["Route", "Role"],
    endpoints: [
      { method: "POST", path: "/api/sessions", role: "Opens a window and draws the checks in secret" },
      { method: "GET", path: "/api/sessions/{token}", role: "Session state, and the check in progress if there is one" },
      { method: "POST", path: "/api/probes/{token}", role: "Receives a check trace, measures it, returns the evidence" },
      { method: "POST", path: "/api/sessions/{token}/subscribe", role: "Registers the browser's Web Push subscription" },
      { method: "GET", path: "/api/attestations/{slug}", role: "Public attestation, carrying no session secret" },
      { method: "GET", path: "/api/calibration", role: "Validation state of the weights, published to be challenged" },
      { method: "GET", path: "/api/health", role: "Is the dispatcher actually running" },
      { method: "GET", path: "/api/vapid", role: "Public key required to subscribe" },
      { method: "POST", path: "/api/applicants", role: "Sign-up to the team, with a bot trap" },
    ],

    ciTitle: "Continuous integration",
    ciLede: "Nothing is merged until the whole chain is green.",
    ciSteps: [
      { title: "Style and types", body: "Ruff on the Python code, ESLint on the front end, mypy as a warning. Badly formatted code does not become a review discussion." },
      { title: "Tests", body: "62 Python tests and 16 front-end tests. They cover engine thresholds, family ceilings, the absence of penalty on a missing signal, and non-disclosure of schedules." },
      { title: "Image builds", body: "Both Docker images are built with the Actions cache, so a proposal that breaks the build shows up immediately." },
      { title: "Real boot", body: "The stack is genuinely started and we wait for /api/health to answer. An image that compiles but does not run fails here." },
    ],

    dockerTitle: "Docker",
    dockerLede: "Your instinct was right, and for the right reason.",
    dockerBody: [
      "Docker brings no performance here. It brings uniformity, which is exactly what a community project needs: someone on Windows, someone on Linux and someone on macOS get the same environment without installing Python, Node, or any scientific library.",
      "Without it, a first contribution starts with an hour of installation troubleshooting, and many give up there. That is the real cost it removes.",
      "The compose file also starts the dispatcher, the service everyone forgets and without which no check ever fires.",
    ],
    dockerCmd: "docker compose up --build",

    whyTitle: "Why Python rather than PHP",
    whyBody: [
      "Not for speed. On this kind of workload PHP 8.4 with its just-in-time compiler is generally ahead of CPython. Claiming a performance gain would be false, and a developer would call it out on day one.",
      "The reason is mathematical. scipy provides the exact Beta quantile function, removing the normal approximation that was poor on two or three checks. And scipy.signal provides a genuine 8–12 Hz band-pass, replacing a second difference that measured the wrong thing and was not comparable across machines.",
      "In other words, moving to Python turned two approximations on the proof sheet into exact measurements. A statistician accepts that argument; “Python is faster” would not have survived.",
    ],

    startTitle: "Getting started",
    startLede: "Three terminals, or one with Docker.",
    startCmds: [
      { label: "Everything, one command", cmd: "docker compose up --build" },
      { label: "API alone", cmd: "cd api-py && uvicorn deciban.main:app --reload --port 8000" },
      { label: "Dispatcher, nothing fires without it", cmd: "cd api-py && python -m deciban.dispatcher --watch" },
      { label: "Interface", cmd: "cd web && npm run dev" },
      { label: "Tests", cmd: "cd api-py && pytest  ·  cd web && npm run test" },
    ],
  },
};
