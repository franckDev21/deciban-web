import type { Lang } from "@/lib/content";

export type Block = { title: string; body: string[]; formula?: string };

export type AlgoDict = {
  eyebrow: string;
  title: string;
  lede: string;
  tabSimple: string;
  tabDeep: string;
  noteSimple: string;
  noteDeep: string;

  simple: Block[];
  deep: Block[];

  famTitle: string;
  famLede: string;
  famCols: [string, string, string];
  fams: { name: string; cap: string; why: string }[];

  openTitle: string;
  openLede: string;
  open: { q: string; now: string; debate: string }[];
  ctaLabel: string;
  ctaTitle: string;
  ctaBody: string;
  ctaBtn: string;
};

export const algo: Record<Lang, AlgoDict> = {
  fr: {
    eyebrow: "Le moteur",
    title: "Comment l’algorithme décide",
    lede: "Deux niveaux de lecture. Le premier ne demande aucune mathématique. Le second donne les formules, pour que tu puisses contester les chiffres plutôt que de les croire.",
    tabSimple: "En clair",
    tabDeep: "En profondeur",
    noteSimple: "Sans mathématiques · 4 minutes",
    noteDeep: "Formules et calibration · 10 minutes",

    simple: [
      {
        title: "Ce n’est pas une note, c’est une quantité de preuve",
        body: [
          "Le système ne cherche pas à savoir si tu es bon. Il compte des indices, et il annonce combien il en a réunis. Positif, les indices penchent vers un humain. Négatif, vers une machine.",
          "Zéro ne veut pas dire « moitié-moitié ». Zéro veut dire : je n’ai encore rien vu.",
        ],
      },
      {
        title: "L’échelle multiplie, elle n’additionne pas",
        body: [
          "Dix points de plus, ce n’est pas « un peu plus probable ». C’est dix fois plus probable. Vingt points, cent fois. Trente points, mille fois.",
          "C’est pour cette raison qu’un score de 60 est énorme, et qu’on ne l’atteint jamais en un seul jour.",
        ],
      },
      {
        title: "Chaque indice répond à une question, et une seule",
        body: [
          "Jamais « est-ce un humain ? », qui est une question sans réponse. Mais : cette observation est-elle plus fréquente chez un humain, ou chez une machine ?",
          "Exemple concret. Onze pour cent de tes frappes se chevauchent, tu appuies sur la touche suivante avant d’avoir relâché la précédente. C’est courant chez un humain rapide, et un script naïf ne le produit jamais. L’indice vaut donc trois points en ta faveur.",
        ],
      },
      {
        title: "On ne compte pas dix fois le même témoin",
        body: [
          "C’est l’erreur qui ruine la plupart des systèmes de notation. Douze mesures de ton clavier, ce ne sont pas douze preuves : c’est une seule observation regardée sous douze angles.",
          "Les additionner fabriquerait une certitude fausse. Chaque famille d’indices a donc un plafond qu’elle ne peut jamais dépasser, quel que soit le nombre de mesures qu’elle contient.",
        ],
      },
      {
        title: "Ne rien avoir ne coûte rien",
        body: [
          "Pas de lecteur d’empreinte, pas de webcam, un vieux PC, la saisie vocale, un clavier adapté : la contribution est nulle, jamais négative.",
          "Sans cette règle, le système punirait le handicap et le matériel bon marché. Ce serait injuste, et accessoirement illégal.",
        ],
      },
      {
        title: "Le droit de dire « je ne sais pas »",
        body: [
          "En dessous d’un certain volume d’indices, la réponse est « données insuffisantes », et ce n’est pas une accusation. C’est le système qui reconnaît qu’il n’a pas assez regardé.",
          "Un moteur capable de s’abstenir vaut infiniment mieux qu’un moteur qui tranche toujours.",
        ],
      },
    ],

    deep: [
      {
        title: "Chaque signal produit un rapport de vraisemblance",
        body: [
          "L’unité est le deciban, inventée par Alan Turing à Bletchley Park pour accumuler des indices dont aucun ne suffit seul.",
        ],
        formula:
          "preuve = 10 × log₁₀ ( P(observation | humain) ÷ P(observation | machine) )",
      },
      {
        title: "Les preuves s’additionnent, la présomption s’applique à la fin",
        body: [
          "C’est tout l’intérêt du logarithme : au lieu de multiplier des probabilités, opération opaque et numériquement instable, on additionne des quantités lisibles et attribuables ligne par ligne.",
        ],
        formula:
          "logit(final) = logit(présomption de départ) + Σ preuve_i",
      },
      {
        title: "Plafonnement par famille, contre la corrélation",
        body: [
          "Les signaux d’une même famille sont massivement corrélés. Les traiter comme indépendants multiplie artificiellement la confiance. On les regroupe donc, et le total de la famille est écrêté.",
        ],
        formula:
          "famille « signature motrice » : brut −21 db  →  retenu −8 db   (plafond)",
      },
      {
        title: "Le poids est borné par le coût de contournement",
        body: [
          "Le point le plus important, et le moins appliqué ailleurs. Un signal peut être excellent en laboratoire et sans valeur en production parce qu’il coûte dix euros à tromper.",
          "La signature motrice discrimine remarquablement, jusqu’à l’achat d’un simulateur de souris USB. La dette de sommeil discrimine plus grossièrement, mais la contourner détruit l’intérêt même de tricher. La seconde vaut donc plus cher.",
        ],
        formula:
          "poids retenu = min ( pouvoir de discrimination , coût de contournement )",
      },
      {
        title: "L’asymétrie sort du calcul, pas de la morale",
        body: [
          "Le piège à agents est une instruction invisible glissée dans le code de la page, que seul un programme qui lit le source peut voir. Un humain ne la rencontre jamais.",
          "Réussir ne prouve rien, puisqu’un bot prudent réussit aussi. Échouer est presque impossible pour un humain. La même logique gouverne le matériel : réussir un contrôle biométrique rapporte six points, ne pas en avoir en coûte zéro.",
        ],
        formula:
          "Ne pas mordre : 10 × log₁₀ ( 0,999 ÷ 0,95 )  =  +0,2 db   → négligeable\nMordre      : 10 × log₁₀ ( 0,001 ÷ 0,05 )  =  −17,0 db  → accablant",
      },
      {
        title: "La couverture s’estime par échantillonnage",
        body: [
          "Le signal le plus puissant du catalogue, et le seul qui résiste à un adversaire acceptant de s’asseoir devant l’écran. On tire k contrôles à des instants uniformes dans les heures déclarées, et le taux de réussite estime la fraction réellement assistée.",
          "La conversion en preuve compare deux hypothèses : une présence normale contre un compte qui réclame vingt heures par jour et ne peut en couvrir qu’environ soixante pour cent, un tiers de ses heures tombant pendant son sommeil.",
        ],
        formula:
          "couverture ~ Bêta( succès + 1 , échecs + 1 )\n\n11 succès / 11  →  c ≈ 0,92   intervalle 90 % : [0,78 – 0,99]\n 4 succès / 11  →  c ≈ 0,38   intervalle 90 % : [0,18 – 0,61]\n\n10 × log₁₀ ( P(11/11 | c=0,95) ÷ P(11/11 | c=0,60) )  =  +13 db",
      },
      {
        title: "Le verdict se lit sur la preuve, jamais sur la probabilité",
        body: [
          "La probabilité affichée dépend de la présomption de départ, c’est-à-dire de la proportion supposée de fraudeurs. Quand la preuve est mince, elle ne reflète que cette hypothèse et ne dit rien de la personne.",
          "Pour la même raison l’affichage est borné à 99,99 % et 0,01 %. Au-delà, ce n’est plus la preuve qui domine le calcul mais l’erreur du modèle. Un système qui annonce 99,9999 % ment sur sa propre précision.",
        ],
      },
      {
        title: "La calibration est la seule chose qui compte vraiment",
        body: [
          "Les poids listés ici sont une estimation initiale plausible, pas une mesure. En production chacun se ré-estime sur données étiquetées, par régression isotonique ou méthode de Platt.",
          "Et les contrôles produisent leurs propres étiquettes : chaque sondage réussi ou manqué est une donnée d’entraînement. Le système se calibre en tournant.",
          "La métrique à publier n’est pas une exactitude globale, qui ne veut rien dire sur une population déséquilibrée. C’est le taux de faux positifs à taux de détection fixé, accompagné de sa courbe de calibration.",
        ],
      },
    ],

    famTitle: "Les huit familles et leurs plafonds",
    famLede:
      "L’ordre n’est pas alphabétique : il suit le coût de contournement. Ce qui est cher à tromper pèse plus lourd.",
    famCols: ["Famille", "Plafond", "Pourquoi ce plafond"],
    fams: [
      { name: "Couverture attestée", cap: "±15", why: "Le seul signal qu’un adversaire éveillé ne peut pas contourner sans renoncer aux heures qu’il réclame." },
      { name: "Rythme de vie", cap: "±12", why: "La dette de sommeil se rembourse toujours. Tenir trois jours est humain, tenir trois semaines ne l’est pas." },
      { name: "Provenance du travail", cap: "±10", why: "Mesure la paternité plutôt que la présence. Difficile à simuler sans produire réellement le travail." },
      { name: "Cognition", cap: "±8", why: "Exige de modéliser une charge mentale, pas seulement d’ajouter du bruit." },
      { name: "Signature motrice", cap: "±8", why: "Excellente en laboratoire, mais un simulateur matériel coûte une dizaine d’euros." },
      { name: "Ancrage matériel", cap: "+6 / −2", why: "Asymétrique : la présence prouve, l’absence n’accuse jamais." },
      { name: "Graphe social", cap: "±6", why: "Détecte les fermes de comptes, presque muet sur un compte isolé." },
      { name: "Pièges actifs", cap: "0 / −15", why: "Asymétrique : les réussir ne prouve rien, y échouer est accablant." },
    ],

    openTitle: "Ce qui est encore discutable",
    openLede:
      "Aucun de ces chiffres n’est gravé. Si tu penses qu’un choix est mauvais, c’est ici qu’il faut taper.",
    open: [
      {
        q: "La présomption de départ",
        now: "8 % de fraude supposée",
        debate: "Elle est inventée. Elle devrait venir d’une mesure sur la population réelle, et elle change toutes les probabilités affichées.",
      },
      {
        q: "La fenêtre de la dette de sommeil",
        now: "21 jours glissants",
        debate: "Trop court punit les périodes intenses, trop long laisse passer les fermes. Le bon chiffre est empirique, pas théorique.",
      },
      {
        q: "Le nombre de contrôles",
        now: "6 à 10 par fenêtre",
        debate: "Plus de contrôles resserre l’estimation mais rend l’outil pénible. Où est le point d’équilibre acceptable ?",
      },
      {
        q: "Le seuil de « vérifié »",
        now: "+25 db",
        debate: "Environ 300 contre 1. Faut-il être plus exigeant, sachant qu’un score haut sert à se défendre publiquement ?",
      },
      {
        q: "Le plafond des pièges",
        now: "−15 db en une fois",
        debate: "Un seul faux positif sur un piège suffirait à faire basculer quelqu’un. Est-ce trop brutal ?",
      },
    ],

    ctaLabel: "Le moteur est ouvert",
    ctaTitle: "Une objection vaut mieux qu’un compliment",
    ctaBody:
      "Si un poids te paraît faux, si une règle te semble injuste, ou si tu vois une attaque à laquelle personne n’a pensé, c’est maintenant qu’il faut le dire. Une objection soulevée aujourd’hui coûte une conversation. La même après la version 1 coûte une réécriture.",
    ctaBtn: "Rejoindre l’équipe",
  },

  en: {
    eyebrow: "The engine",
    title: "How the algorithm decides",
    lede: "Two reading levels. The first needs no mathematics. The second gives you the formulas, so you can argue with the numbers instead of trusting them.",
    tabSimple: "In plain terms",
    tabDeep: "In depth",
    noteSimple: "No mathematics · 4 minutes",
    noteDeep: "Formulas and calibration · 10 minutes",

    simple: [
      {
        title: "It is not a grade, it is a quantity of evidence",
        body: [
          "The system is not trying to work out whether you are good. It counts clues and reports how many it has gathered. Positive, the clues lean human. Negative, they lean machine.",
          "Zero does not mean fifty-fifty. Zero means: I have not seen anything yet.",
        ],
      },
      {
        title: "The scale multiplies, it does not add",
        body: [
          "Ten more points is not “somewhat more likely”. It is ten times more likely. Twenty points, a hundred times. Thirty points, a thousand times.",
          "That is why a score of 60 is enormous, and why nobody ever reaches it in a single day.",
        ],
      },
      {
        title: "Each clue answers one question, and only one",
        body: [
          "Never “is this a human?”, which is a question with no answer. Instead: is this observation more common in a human, or in a machine?",
          "A concrete example. Eleven percent of your keystrokes overlap, meaning you press the next key before releasing the previous one. That is common in a fast human, and a naive script never produces it. So the clue is worth three points in your favour.",
        ],
      },
      {
        title: "You do not count the same witness ten times",
        body: [
          "This is the mistake that ruins most scoring systems. Twelve measurements of your keyboard are not twelve pieces of evidence: they are one observation seen from twelve angles.",
          "Adding them up would manufacture false certainty. So every family of clues has a ceiling it can never exceed, however many measurements it contains.",
        ],
      },
      {
        title: "Having nothing costs nothing",
        body: [
          "No fingerprint reader, no webcam, an old machine, voice input, an adapted keyboard: the contribution is zero, never negative.",
          "Without that rule the system would punish disability and cheap hardware. That would be unfair, and incidentally illegal.",
        ],
      },
      {
        title: "The right to say “I do not know”",
        body: [
          "Below a certain volume of clues the answer is “insufficient data”, and that is not an accusation. It is the system admitting it has not looked hard enough yet.",
          "An engine that can abstain is worth vastly more than one that always rules.",
        ],
      },
    ],

    deep: [
      {
        title: "Each signal produces a likelihood ratio",
        body: [
          "The unit is the deciban, invented by Alan Turing at Bletchley Park to accumulate clues where no single one is ever sufficient.",
        ],
        formula:
          "evidence = 10 × log₁₀ ( P(observation | human) ÷ P(observation | machine) )",
      },
      {
        title: "Evidence adds up, the prior applies at the end",
        body: [
          "This is the whole point of the logarithm: instead of multiplying probabilities, an opaque and numerically unstable operation, you add readable quantities that stay attributable line by line.",
        ],
        formula: "logit(final) = logit(prior) + Σ evidence_i",
      },
      {
        title: "Family ceilings, against correlation",
        body: [
          "Signals within one family are heavily correlated. Treating them as independent inflates confidence artificially. So they are grouped, and the family total is clipped.",
        ],
        formula:
          "family “motor signature”: raw −21 db  →  kept −8 db   (ceiling)",
      },
      {
        title: "Weight is bounded by the cost of defeating it",
        body: [
          "The most important point, and the least applied elsewhere. A signal can be excellent in the lab and worthless in production because it costs ten euros to fool.",
          "The motor signature discriminates remarkably well, right up until someone buys a USB mouse jiggler. Sleep debt discriminates more crudely, but defeating it destroys the very point of cheating. So the second is worth more.",
        ],
        formula:
          "kept weight = min ( discriminative power , cost of defeating it )",
      },
      {
        title: "The asymmetry falls out of the maths, not out of morals",
        body: [
          "The agent trap is an invisible instruction placed in the page source that only a program reading the code can see. A human never encounters it.",
          "Passing proves nothing, since a careful bot passes too. Failing is almost impossible for a human. The same logic governs hardware: passing a biometric check earns six points, having no reader costs zero.",
        ],
        formula:
          "Not biting : 10 × log₁₀ ( 0.999 ÷ 0.95 )  =  +0.2 db   → negligible\nBiting     : 10 × log₁₀ ( 0.001 ÷ 0.05 )  =  −17.0 db  → damning",
      },
      {
        title: "Coverage is estimated by sampling",
        body: [
          "The most powerful signal in the catalogue, and the only one that resists an adversary willing to sit at the screen. You draw k checks at uniform moments inside the declared hours, and the success rate estimates the fraction genuinely attended.",
          "Converting it into evidence compares two hypotheses: normal presence against an account claiming twenty hours a day that can only cover about sixty percent, a third of its hours falling while it sleeps.",
        ],
        formula:
          "coverage ~ Beta( successes + 1 , failures + 1 )\n\n11 of 11  →  c ≈ 0.92   90 % interval: [0.78 – 0.99]\n 4 of 11  →  c ≈ 0.38   90 % interval: [0.18 – 0.61]\n\n10 × log₁₀ ( P(11/11 | c=0.95) ÷ P(11/11 | c=0.60) )  =  +13 db",
      },
      {
        title: "The verdict reads off the evidence, never the probability",
        body: [
          "The displayed probability depends on the prior, that is, on the assumed proportion of cheaters. When evidence is thin it merely reflects that assumption and says nothing about the person.",
          "For the same reason the display is clamped to 99.99 % and 0.01 %. Beyond that it is no longer evidence dominating the calculation but model error. A system announcing 99.9999 % is lying about its own precision.",
        ],
      },
      {
        title: "Calibration is the only thing that really matters",
        body: [
          "The weights listed here are a plausible initial estimate, not a measurement. In production each one is re-estimated against labelled data, by isotonic regression or Platt scaling.",
          "And the checks produce their own labels: every probe answered or missed is a training example. The system calibrates itself by running.",
          "The metric worth publishing is not overall accuracy, which means nothing on an imbalanced population. It is the false positive rate at a fixed detection rate, together with its calibration curve.",
        ],
      },
    ],

    famTitle: "The eight families and their ceilings",
    famLede:
      "The order is not alphabetical: it follows the cost of defeating each one. What is expensive to fool weighs more.",
    famCols: ["Family", "Ceiling", "Why that ceiling"],
    fams: [
      { name: "Attested coverage", cap: "±15", why: "The only signal an awake adversary cannot defeat without giving up the hours they claim." },
      { name: "Life rhythm", cap: "±12", why: "Sleep debt always gets repaid. Three days is human, three weeks is not." },
      { name: "Work provenance", cap: "±10", why: "Measures authorship rather than presence. Hard to fake without actually producing the work." },
      { name: "Cognition", cap: "±8", why: "Requires modelling mental load, not merely adding noise." },
      { name: "Motor signature", cap: "±8", why: "Excellent in the lab, but a hardware jiggler costs about ten euros." },
      { name: "Hardware anchor", cap: "+6 / −2", why: "Asymmetric: presence proves, absence never accuses." },
      { name: "Social graph", cap: "±6", why: "Catches account farms, nearly silent on an isolated account." },
      { name: "Active traps", cap: "0 / −15", why: "Asymmetric: passing proves nothing, failing is damning." },
    ],

    openTitle: "What is still up for debate",
    openLede:
      "None of these numbers are carved in stone. If you think a choice is wrong, this is where to aim.",
    open: [
      {
        q: "The prior",
        now: "8 % assumed fraud",
        debate: "It is invented. It should come from a measurement on the real population, and it moves every probability on the page.",
      },
      {
        q: "The sleep-debt window",
        now: "21 rolling days",
        debate: "Too short punishes intense stretches, too long lets farms through. The right number is empirical, not theoretical.",
      },
      {
        q: "The number of checks",
        now: "6 to 10 per window",
        debate: "More checks tighten the estimate but make the tool tiresome. Where is the acceptable balance?",
      },
      {
        q: "The “verified” threshold",
        now: "+25 db",
        debate: "About 300 to 1. Should it be stricter, given that a high score is used to defend yourself publicly?",
      },
      {
        q: "The trap ceiling",
        now: "−15 db at once",
        debate: "A single false positive on a trap would be enough to tip someone over. Is that too brutal?",
      },
    ],

    ctaLabel: "The engine is open",
    ctaTitle: "An objection beats a compliment",
    ctaBody:
      "If a weight looks wrong to you, if a rule seems unfair, or if you see an attack nobody has thought of, now is the moment to say so. An objection raised today costs a conversation. The same one after version 1 costs a rewrite.",
    ctaBtn: "Join the team",
  },
};
