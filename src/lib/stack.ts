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
          { name: "Python 3.12", role: "langage", why: "Choisi pour ses bibliothèques scientifiques, seul besoin qui départageait vraiment les langages." },
          { name: "FastAPI", role: "cadre web", why: "Documentation OpenAPI générée depuis les types, sans fichier à maintenir." },
          { name: "Pydantic v2", role: "validation", why: "Le piège à robots et les bornes de durée sont des règles déclarées, pas du code défensif." },
          { name: "SQLAlchemy 2", role: "persistance", why: "Un type maison garantit l’UTC dans les deux sens, ce que SQLite ne fait pas. Le schéma est créé au démarrage : une vraie chaîne de migrations reste à ajouter avant la production." },
          { name: "scipy et numpy", role: "statistiques", why: "Quantiles exacts de la loi Bêta et passe-bande à 8–12 Hz : les deux calculs du moteur qui ne tolèrent aucune approximation." },
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
    dockerLede: "Une commande, et l’environnement est identique pour tout le monde.",
    dockerBody: [
      "Docker n’apporte aucune performance ici. Il apporte de l’uniformité : sous Windows, sous Linux ou sous macOS, on obtient le même environnement sans installer Python, Node, ni la moindre bibliothèque scientifique.",
      "C’est ce qui permet à une première contribution de commencer par du code plutôt que par une heure de dépannage d’installation.",
      "Le compose lance aussi le répartiteur, le service qu’on oublie facilement et sans lequel aucun contrôle ne se déclenche.",
    ],
    dockerCmd: "docker compose up --build",

    whyTitle: "Où la précision numérique compte",
    whyBody: [
      "Deux endroits du moteur ne tolèrent pas l’approximation, et ce sont eux qui ont dicté le choix de la bibliothèque scientifique.",
      "L’intervalle de couverture repose sur une loi Bêta souvent très asymétrique. Sur deux ou trois contrôles, l’approximer par une gaussienne donne un intervalle faux, parfois hors de [0, 1]. Le code utilise donc la fonction quantile exacte de la Bêta.",
      "Le tremblement se mesure dans une bande précise, 8 à 12 Hz. Un filtre grossier y capterait aussi la gigue d’échantillonnage, et donnerait une valeur incomparable d’une machine à l’autre. Le code applique une densité spectrale de Welch sur un signal rééchantillonné, et renvoie un rapport de puissance, donc une grandeur sans unité.",
      "Ce sont ces deux besoins qui ont fixé la pile, pas une préférence de langage.",
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
          { name: "Python 3.12", role: "language", why: "Chosen for its scientific libraries, the only requirement that genuinely separated the options." },
          { name: "FastAPI", role: "web framework", why: "OpenAPI documentation generated from the types, with no file to maintain." },
          { name: "Pydantic v2", role: "validation", why: "The bot trap and the duration bounds are declared rules, not defensive code." },
          { name: "SQLAlchemy 2", role: "persistence", why: "A custom type guarantees UTC in both directions, which SQLite does not. The schema is created at startup: a real migration chain is still to be added before production." },
          { name: "scipy and numpy", role: "statistics", why: "Exact Beta quantiles and an 8–12 Hz band-pass: the two calculations in the engine that tolerate no approximation." },
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
    dockerLede: "One command, and the environment is identical for everyone.",
    dockerBody: [
      "Docker brings no performance here. It brings uniformity: on Windows, Linux or macOS you get the same environment without installing Python, Node, or any scientific library.",
      "That is what lets a first contribution start with code rather than an hour of installation troubleshooting.",
      "The compose file also starts the dispatcher, the service that is easy to forget and without which no check ever fires.",
    ],
    dockerCmd: "docker compose up --build",

    whyTitle: "Where numerical precision matters",
    whyBody: [
      "Two places in the engine tolerate no approximation, and they are what dictated the choice of scientific library.",
      "The coverage interval rests on a Beta distribution that is often strongly skewed. On two or three checks, approximating it with a Gaussian gives a wrong interval, sometimes outside [0, 1]. The code therefore uses the exact Beta quantile function.",
      "Tremor is measured in a precise band, 8 to 12 Hz. A crude filter would also pick up sampling jitter, and would yield a value that is not comparable across machines. The code applies a Welch spectral density to a resampled signal and returns a power ratio, that is, a dimensionless quantity.",
      "These two requirements set the stack, not a language preference.",
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
