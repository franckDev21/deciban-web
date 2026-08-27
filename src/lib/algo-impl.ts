import type { Lang } from "@/lib/content";
import type { Family } from "@/lib/algo";

/**
 * Reference de l'algorithme REELLEMENT implemente.
 * Chaque seuil ci-dessous existe dans le fichier cite : si le code change,
 * cette page doit changer avec lui.
 */
export const implementation: Record<Lang, {
  title: string;
  lede: string;
  cols: [string, string, string, string];
  cap: string;
  file: string;
  families: Family[];
  verdictTitle: string;
  verdictLede: string;
  verdictRows: [string, string, string][];
}> = {
  fr: {
    title: "L’algorithme réellement implémenté",
    lede: "Ce qui suit n’est pas une intention, c’est le contenu du code. Chaque seuil cité existe dans le fichier indiqué. Si vous trouvez une valeur mal choisie, vous savez exactement où taper.",
    cols: ["Signal", "Ce qui est mesuré", "Règle appliquée", "Preuve"],
    cap: "Plafond",
    file: "Fichier",

    families: [
      {
        key: "coverage",
        name: "Couverture attestée",
        cap: "±15 db",
        file: "deciban/services/coverage.py",
        intent:
          "Le seul signal qu’un adversaire éveillé ne peut pas contourner sans renoncer aux heures qu’il réclame. On tire k contrôles à des instants uniformes dans la fenêtre déclarée, et le taux de réussite estime la fraction réellement assistée.",
        signals: [
          {
            name: "Estimation de la couverture",
            measured: "réussites et échecs sur les contrôles déclenchés",
            rule: "loi Bêta(réussites + 1, échecs + 1) ; intervalle à 90 % par les quantiles EXACTS de la Bêta",
            db: "moyenne et intervalle affichés",
          },
          {
            name: "Rapport de vraisemblance",
            measured: "comparaison de deux hypothèses de présence",
            rule: "présence normale c = 0,95 contre compte qui sur-déclare c = 0,60 ; log-vraisemblance binomiale convertie en decibans",
            db: "10 × (ℓ₀,₉₅ − ℓ₀,₆₀) ÷ ln 10",
          },
          {
            name: "Escompte par volume",
            measured: "nombre de contrôles déclenchés",
            rule: "facteur min(1 ; déclenchés ÷ 8) : deux contrôles réussis ne peuvent pas valoir autant que dix",
            db: "multiplicateur 0 → 1",
          },
        ],
      },
      {
        key: "rhythm",
        name: "Rythme de vie",
        cap: "±12 db",
        file: "deciban/services/rhythm.py",
        intent:
          "Se calcule sur l’historique des sessions, fenêtre glissante de 21 jours. Le signal central n’est pas le sommeil mais la DETTE de sommeil : un humain tient trois jours sans dormir, personne ne tient trois semaines.",
        signals: [
          {
            name: "Dette de sommeil",
            measured: "plus longue pause entre deux sessions, et proportion de pauses ≥ 4 h",
            rule: "≥ 4 h et repos sur au moins la moitié des jours → +5 ; ≥ 4 h seulement → +3 ; aucune pause ≥ 4 h sur 3 jours ou plus → −9. Le tout escompté par min(1 ; jours ÷ 7)",
            db: "+5 / +3 / −9",
          },
          {
            name: "Rebond après excès",
            measured: "pic d’activité quotidienne, puis chute qui suit",
            rule: "pic ≥ 4 h suivi d’un jour à moins de la moitié du pic → preuve POSITIVE : une machine n’a pas de dette à rembourser",
            db: "+6 / 0",
          },
          {
            name: "Distribution des pauses",
            measured: "coefficient de variation des intervalles entre sessions",
            rule: "≥ 0,60 → +3 ; ≥ 0,25 → +1 ; en dessous → −4, car des pauses trop régulières sont mécaniques",
            db: "+3 / +1 / −4",
          },
          {
            name: "Variance inter-jours",
            measured: "coefficient de variation des minutes travaillées par jour",
            rule: "≥ 0,30 → +2 ; ≥ 0,10 → 0 ; en dessous → −4. Les bons et les mauvais jours existent",
            db: "+2 / 0 / −4",
          },
        ],
      },
      {
        key: "provenance",
        name: "Provenance du travail",
        cap: "±10 db",
        file: "deciban/services/provenance.py",
        intent:
          "Mesure la paternité plutôt que la présence : distingue « j’étais là » de « c’est bien moi qui ai produit ça ».",
        signals: [
          {
            name: "Ratio frappé sur collé",
            measured: "part des contrôles où le texte a été frappé et non collé",
            rule: "≥ 0,90 → +4 ; ≥ 0,60 → +1 ; ≥ 0,30 → −2 ; en dessous → −5",
            db: "+4 → −5",
          },
          {
            name: "Révisions d’édition",
            measured: "part des contrôles comportant au moins un retour arrière",
            rule: "≥ 0,30 → +3 ; > 0 → +1 ; aucune révision sur 3 contrôles ou plus → −4",
            db: "+3 / +1 / −4",
          },
          {
            name: "Réponse sous contrainte",
            measured: "part des réponses dont la latence tient entre 150 ms et 30 s",
            rule: "≥ 0,70 → +5 ; ≥ 0,40 → +2 ; en dessous → 0",
            db: "+5 / +2 / 0",
          },
        ],
      },
      {
        key: "cognition",
        name: "Cognition",
        cap: "±8 db",
        file: "deciban/services/cognition.py",
        intent:
          "Mesure le rythme de la pensée plutôt que celui du corps. Le signal central exige de modéliser une charge mentale, pas seulement d’ajouter du bruit.",
        signals: [
          {
            name: "Latence liée à la difficulté",
            measured: "corrélation de Pearson entre difficulté annoncée et temps de réponse",
            rule: "r ≥ 0,45 → +5 ; ≥ 0,20 → +2 ; ≥ −0,10 → −3 ; en dessous → −6. Minimum trois essais",
            db: "+5 → −6",
          },
          {
            name: "Vitesse de lecture",
            measured: "mots de la consigne divisés par le temps avant première action",
            rule: "150 à 400 mots/min → +2 ; 400 à 700 → 0 ; au-delà de 700 → −4, personne ne lit si vite",
            db: "+2 / 0 / −4",
          },
          {
            name: "Adjacence des fautes",
            measured: "part des écarts tombant sur des touches voisines",
            rule: "≥ 0,50 → +3 ; zéro faute sur plus de 60 caractères → −3 ; sinon 0",
            db: "+3 / 0 / −3",
          },
          {
            name: "Retours arrière",
            measured: "nombre de corrections pendant la frappe",
            rule: "au moins une correction → +2 ; sinon 0",
            db: "+2 / 0",
          },
        ],
      },
      {
        key: "motor",
        name: "Signature motrice",
        cap: "±8 db",
        file: "deciban/services/motor.py",
        intent:
          "Excellente en laboratoire, mais un simulateur de souris USB coûte une dizaine d’euros : c’est le coût de contournement qui fixe le plafond, pas le pouvoir de discrimination. Sur écran tactile la famille devient non applicable et contribue zéro.",
        signals: [
          {
            name: "Micro-tremblement",
            measured: "part de la puissance spectrale tombant dans la bande 8–12 Hz, par densité de Welch sur signal rééchantillonné",
            rule: "≥ 14 % → +5 ; ≥ 9 % → +3 ; ≥ 5 % → 0 ; en dessous → −6. Seuils mesurés : plancher humain 8,1 %, plafond non-humain 8,3 %",
            db: "+5 → −6",
          },
          {
            name: "Corrections de cap",
            measured: "changements de direction de plus de 0,9 radian entre segments successifs",
            rule: "≥ 8 → +3 ; ≥ 3 → +2 ; ≥ 1 → 0 ; aucune → −4 (loi de Fitts)",
            db: "+3 → −4",
          },
          {
            name: "Sinuosité du tracé",
            measured: "distance parcourue divisée par la distance à vol d’oiseau",
            rule: "≥ 1,15 → +2 ; ≥ 1,04 → +1 ; en dessous → −3. Ignoré si le déplacement est inférieur à 8 px",
            db: "+2 / +1 / −3",
          },
          {
            name: "Chevauchement de touches",
            measured: "part des appuis survenant alors qu’une autre touche est encore enfoncée",
            rule: "≥ 5 % → +3 ; > 0 → +1 ; jamais → −3. Minimum six appuis",
            db: "+3 / +1 / −3",
          },
          {
            name: "Durée de maintien",
            measured: "coefficient de variation des durées d’appui, par touche appariée",
            rule: "≥ 0,25 → +2 ; ≥ 0,12 → 0 ; en dessous → −5. Minimum six appariements",
            db: "+2 / 0 / −5",
          },
          {
            name: "Temps de réaction",
            measured: "délai entre l’affichage du contrôle et la première action",
            rule: "moins de 120 ms → −4, plus rapide qu’une perception humaine ; jusqu’à 4 s → +2 ; au-delà → 0",
            db: "+2 / 0 / −4",
          },
          {
            name: "Contenu collé",
            measured: "événement de collage dans le champ de réponse",
            rule: "collage détecté → −4",
            db: "−4",
          },
        ],
      },
    ],

    verdictTitle: "Du total au verdict",
    verdictLede:
      "Les cinq familles s’additionnent après plafonnement. Le verdict se lit sur la preuve accumulée, jamais sur la probabilité : quand la preuve est mince, la probabilité ne reflète que la présomption de départ et ne dit rien de la personne.",
    verdictRows: [
      ["≥ +25 db", "Vérifié", "environ 300 contre 1 en faveur"],
      ["+10 à +25", "Crédible", "faisceau cohérent"],
      ["−10 à +10", "Indéterminé", "preuve insuffisante, ce n’est pas une accusation"],
      ["−25 à −10", "À examiner", "indices concordants"],
      ["≤ −25 db", "Signalé", "environ 300 contre 1 à charge"],
    ],
  },

  en: {
    title: "The algorithm as actually implemented",
    lede: "What follows is not an intention, it is the content of the code. Every threshold quoted exists in the file named beside it. If you find a value badly chosen, you know exactly where to aim.",
    cols: ["Signal", "What is measured", "Rule applied", "Evidence"],
    cap: "Ceiling",
    file: "File",

    families: [
      {
        key: "coverage",
        name: "Attested coverage",
        cap: "±15 db",
        file: "deciban/services/coverage.py",
        intent:
          "The only signal an awake adversary cannot defeat without giving up the hours they claim. k checks are drawn at uniform moments inside the declared window, and the success rate estimates the fraction genuinely attended.",
        signals: [
          {
            name: "Coverage estimate",
            measured: "successes and failures across fired checks",
            rule: "Beta(successes + 1, failures + 1); 90 % interval from the EXACT Beta quantiles",
            db: "mean and interval displayed",
          },
          {
            name: "Likelihood ratio",
            measured: "comparison of two presence hypotheses",
            rule: "normal presence c = 0.95 against an over-claiming account c = 0.60; binomial log-likelihood converted to decibans",
            db: "10 × (ℓ₀.₉₅ − ℓ₀.₆₀) ÷ ln 10",
          },
          {
            name: "Volume discount",
            measured: "number of checks fired",
            rule: "factor min(1, fired ÷ 8): two answered checks cannot be worth as much as ten",
            db: "multiplier 0 → 1",
          },
        ],
      },
      {
        key: "rhythm",
        name: "Life rhythm",
        cap: "±12 db",
        file: "deciban/services/rhythm.py",
        intent:
          "Computed over session history on a rolling 21-day window. The central signal is not sleep but sleep DEBT: a human can go three days without sleeping, nobody lasts three weeks.",
        signals: [
          {
            name: "Sleep debt",
            measured: "longest gap between sessions, and share of gaps ≥ 4 h",
            rule: "≥ 4 h with rest on at least half the days → +5; ≥ 4 h only → +3; no gap ≥ 4 h over 3 days or more → −9. All discounted by min(1, days ÷ 7)",
            db: "+5 / +3 / −9",
          },
          {
            name: "Rebound after excess",
            measured: "daily activity peak, and the drop that follows",
            rule: "peak ≥ 4 h followed by a day under half the peak → POSITIVE evidence: a machine has no debt to repay",
            db: "+6 / 0",
          },
          {
            name: "Break distribution",
            measured: "coefficient of variation of gaps between sessions",
            rule: "≥ 0.60 → +3; ≥ 0.25 → +1; below → −4, because breaks that regular are mechanical",
            db: "+3 / +1 / −4",
          },
          {
            name: "Day-to-day variance",
            measured: "coefficient of variation of minutes worked per day",
            rule: "≥ 0.30 → +2; ≥ 0.10 → 0; below → −4. Good days and bad days exist",
            db: "+2 / 0 / −4",
          },
        ],
      },
      {
        key: "provenance",
        name: "Work provenance",
        cap: "±10 db",
        file: "deciban/services/provenance.py",
        intent:
          "Measures authorship rather than presence: separates “I was there” from “I am the one who produced this”.",
        signals: [
          {
            name: "Typed to pasted ratio",
            measured: "share of checks where the text was typed rather than pasted",
            rule: "≥ 0.90 → +4; ≥ 0.60 → +1; ≥ 0.30 → −2; below → −5",
            db: "+4 → −5",
          },
          {
            name: "Editing revisions",
            measured: "share of checks containing at least one backspace",
            rule: "≥ 0.30 → +3; > 0 → +1; no revision across 3 checks or more → −4",
            db: "+3 / +1 / −4",
          },
          {
            name: "Response under constraint",
            measured: "share of answers whose latency falls between 150 ms and 30 s",
            rule: "≥ 0.70 → +5; ≥ 0.40 → +2; below → 0",
            db: "+5 / +2 / 0",
          },
        ],
      },
      {
        key: "cognition",
        name: "Cognition",
        cap: "±8 db",
        file: "deciban/services/cognition.py",
        intent:
          "Measures the rhythm of thought rather than of the body. The central signal requires modelling mental load, not merely adding noise.",
        signals: [
          {
            name: "Latency against difficulty",
            measured: "Pearson correlation between stated difficulty and response time",
            rule: "r ≥ 0.45 → +5; ≥ 0.20 → +2; ≥ −0.10 → −3; below → −6. Minimum three trials",
            db: "+5 → −6",
          },
          {
            name: "Reading speed",
            measured: "words of the prompt divided by time before first action",
            rule: "150 to 400 wpm → +2; 400 to 700 → 0; above 700 → −4, nobody reads that fast",
            db: "+2 / 0 / −4",
          },
          {
            name: "Error adjacency",
            measured: "share of deviations landing on neighbouring keys",
            rule: "≥ 0.50 → +3; zero errors across more than 60 characters → −3; otherwise 0",
            db: "+3 / 0 / −3",
          },
          {
            name: "Backspaces",
            measured: "number of corrections while typing",
            rule: "at least one correction → +2; otherwise 0",
            db: "+2 / 0",
          },
        ],
      },
      {
        key: "motor",
        name: "Motor signature",
        cap: "±8 db",
        file: "deciban/services/motor.py",
        intent:
          "Excellent in the lab, but a USB mouse jiggler costs about ten euros: the ceiling is set by the cost of defeating it, not by its discriminative power. On a touch screen the family becomes not applicable and contributes zero.",
        signals: [
          {
            name: "Micro-tremor",
            measured: "share of spectral power falling in the 8–12 Hz band, via Welch density on a resampled signal",
            rule: "≥ 14 % → +5; ≥ 9 % → +3; ≥ 5 % → 0; below → −6. Measured thresholds: human floor 8.1 %, non-human ceiling 8.3 %",
            db: "+5 → −6",
          },
          {
            name: "Course corrections",
            measured: "direction changes above 0.9 radian between successive segments",
            rule: "≥ 8 → +3; ≥ 3 → +2; ≥ 1 → 0; none → −4 (Fitts’s law)",
            db: "+3 → −4",
          },
          {
            name: "Path sinuosity",
            measured: "distance travelled divided by straight-line distance",
            rule: "≥ 1.15 → +2; ≥ 1.04 → +1; below → −3. Ignored under 8 px of travel",
            db: "+2 / +1 / −3",
          },
          {
            name: "Key overlap",
            measured: "share of presses occurring while another key is still held",
            rule: "≥ 5 % → +3; > 0 → +1; never → −3. Minimum six presses",
            db: "+3 / +1 / −3",
          },
          {
            name: "Hold duration",
            measured: "coefficient of variation of press durations, per matched key",
            rule: "≥ 0.25 → +2; ≥ 0.12 → 0; below → −5. Minimum six matches",
            db: "+2 / 0 / −5",
          },
          {
            name: "Reaction time",
            measured: "delay between the check appearing and the first action",
            rule: "under 120 ms → −4, faster than human perception; up to 4 s → +2; beyond → 0",
            db: "+2 / 0 / −4",
          },
          {
            name: "Pasted content",
            measured: "paste event in the answer field",
            rule: "paste detected → −4",
            db: "−4",
          },
        ],
      },
    ],

    verdictTitle: "From total to verdict",
    verdictLede:
      "The five families are summed after capping. The verdict reads off accumulated evidence, never off the probability: when evidence is thin the probability merely reflects the prior and says nothing about the person.",
    verdictRows: [
      ["≥ +25 db", "Verified", "roughly 300 to 1 in favour"],
      ["+10 to +25", "Credible", "coherent body of evidence"],
      ["−10 to +10", "Undetermined", "insufficient evidence, not an accusation"],
      ["−25 to −10", "Under review", "converging indications"],
      ["≤ −25 db", "Flagged", "roughly 300 to 1 against"],
    ],
  },
};
