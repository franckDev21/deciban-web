# Deciban · Interface

Interface bilingue du moteur de preuve d'humanité.

Next.js 16 · TypeScript · Tailwind CSS 4 · KaTeX · Vitest

---

## Démarrer

### Avec Docker, recommandé

Depuis la racine du dépôt, la pile complète en une commande :

```bash
docker compose up --build
```

### En local

L'API doit tourner à côté, sinon la page de session restera muette.

```bash
cd web
npm install
cp .env.example .env.local
npm run dev
```

<http://localhost:3000>

---

## Variables d'environnement

| Variable | Défaut | Rôle |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://127.0.0.1:8000/api` | Adresse de l'API. En production, l'URL publique du serveur. |

Le préfixe `NEXT_PUBLIC_` signifie que la valeur est **incluse dans le bundle envoyé au navigateur**. N'y mettez jamais de secret.

---

## Pages

| Route | Contenu |
|---|---|
| `/` | Accueil : capteur de geste en direct, récit du projet, formulaire d'inscription |
| `/comment-ca-marche` | Le mécanisme, la frise d'une journée, la relation avec Prométhée |
| `/algorithme` | Deux niveaux de lecture, la planche de démonstration, les réserves |
| `/stack` | Pile technique, points d'entrée, intégration continue |
| `/session` | Ouvrir une fenêtre de travail |
| `/session/[token]` | Tableau de bord d'une session en cours |
| `/a/[slug]` | Attestation publique |
| `/proposition-da-1` | Proposition de direction artistique, isolée sous `.da-phosphore` |

---

## Organisation

```
src/
├── app/                  pages, une par route
├── components/
│   ├── LiveSignature     capteur de geste du hero
│   ├── ProbeChallenge    le défi de 90 secondes
│   ├── SessionDashboard  suivi d'une session en cours
│   ├── StoryModal        récit en six chapitres
│   ├── ProofSheet        planche de formules, rendue par KaTeX
│   ├── LangSwitch        sélecteur de langue au globe
│   └── Guilloche         guillochis dessiné en canvas
└── lib/
    ├── content.ts        contenu de l'accueil, français et anglais
    ├── algo.ts           page algorithme, deux niveaux
    ├── algo-impl.ts      référence de l'algorithme implémenté
    ├── formulas.ts       les dix planches et leurs réserves
    ├── stack.ts          page technique
    ├── session.ts        textes de session et de défi
    ├── alert.ts          bulle système, son, titre et favicon
    └── push.ts           abonnement Web Push
```

### Le contenu est bilingue par construction

Chaque dictionnaire de `src/lib` expose une clé `fr` et une clé `en` de **forme strictement identique**. Un test échoue si l'une diverge de l'autre, ou si une chaîne est laissée vide.

Pour ajouter du texte, modifiez toujours les deux langues.

---

## Ajouter une langue

1. Étendre le type `Lang` dans `src/lib/content.ts`
2. Ajouter la clé dans **tous** les dictionnaires de `src/lib`
3. Ajouter l'entrée dans `LANGUAGES` de `src/components/LangSwitch.tsx`
4. `npm run test` vérifiera que rien ne manque

---

## Deux directions artistiques cohabitent

L'accueil et les pages internes utilisent la direction d'origine : imprimerie de sécurité, guillochis, thème clair et sombre.

La route `/proposition-da-1` porte une proposition alternative, **entièrement scopée sous la classe `.da-phosphore`**. Elle n'affecte aucune autre page. Une autre proposition peut vivre à côté sous `.da-<nom>` sans rien casser, ce qui permet de comparer plusieurs directions sans arbitrer trop tôt.

---

## Tests

```bash
npm run test            # 17 tests
npm run test:coverage
npm run lint
npm run build
```

La suite vérifie notamment :

- que les dictionnaires français et anglais ont la même forme
- qu'aucune chaîne n'est vide
- que **toute planche de formule non exacte porte une réserve écrite**
- que les chiffres annoncés sur l'accueil correspondent à ceux que la page algorithme documente : ils avaient déjà dérivé une fois
- que la bulle système part avec `requireInteraction`, et que l'onglet prend le relais quand elle est refusée

---

## Notifications

Trois canaux, parce qu'aucun ne suffit seul :

| Canal | Portée | Limite |
|---|---|---|
| Bulle du système | visible hors du navigateur | demande une autorisation |
| Son | traverse tout | ne dit pas d'où il vient |
| Titre et favicon de l'onglet | visible dans la barre d'onglets | seulement si le navigateur est à l'écran |

Si vous entendez le son sans voir de bulle, l'autorisation est refusée : dans le navigateur pour ce site, ou dans les réglages du système. Sur macOS, vérifiez aussi le mode Concentration.

---

## Déploiement

Prévu sur Vercel. Une seule variable à définir : `NEXT_PUBLIC_API_URL`, pointant vers l'API en production.

Le dépôt étant un monorepo, configurez **Root Directory** à `web` dans les réglages du projet Vercel.

---

## Contribuer

Voir [CONTRIBUTING.md](../CONTRIBUTING.md) à la racine du dépôt.
