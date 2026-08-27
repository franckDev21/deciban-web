import type { Lang } from "@/lib/content";

export type Plate = {
  n: string;
  title: string;
  tex: string;
  reads: string;
  margin: string;
};

export const formulas: Record<Lang, {
  eyebrow: string;
  title: string;
  lede: string;
  legendTitle: string;
  legend: [string, string][];
  plates: Plate[];
  closing: string;
}> = {
  fr: {
    eyebrow: "Planche de démonstration",
    title: "Le moteur, en dix lignes",
    lede: "Pour qui veut vérifier plutôt que croire. Chaque ligne est celle qui tourne dans le code, avec l’intention en marge.",
    legendTitle: "Notations",
    legend: [
      ["H, M", "les deux hypothèses : la trace vient d’un humain, ou d’une machine"],
      ["x_i", "l’observation faite par le signal i"],
      ["w_i", "la preuve apportée par ce signal, en decibans"],
      ["c_f", "le plafond de la famille f"],
      ["π", "la présomption de départ, proportion supposée de fraude"],
      ["a, m", "contrôles réussis et contrôles manqués"],
    ],
    plates: [
      {
        n: "I",
        title: "La preuve d’un signal",
        tex: String.raw`w_i \;=\; 10\,\log_{10}\!\frac{P\!\left(x_i \mid H\right)}{P\!\left(x_i \mid M\right)}`,
        reads: "Dix fois le logarithme décimal du rapport entre la fréquence de l’observation chez l’humain et sa fréquence chez la machine.",
        margin: "L’unité est le deciban. Turing l’a créée à Bletchley Park pour additionner des indices dont aucun ne suffit seul. Dix decibans valent un rapport de dix contre un.",
      },
      {
        n: "II",
        title: "L’accumulation",
        tex: String.raw`\operatorname{logit} P(H \mid x) \;=\; \operatorname{logit} \pi \;+\; \sum_{i} w_i`,
        reads: "Les preuves s’additionnent dans l’espace du logit, puis la présomption de départ s’applique une seule fois, à la fin.",
        margin: "C’est tout l’intérêt du logarithme : au lieu de multiplier des probabilités, opération opaque et numériquement instable, on additionne des quantités lisibles et attribuables ligne par ligne.",
      },
      {
        n: "III",
        title: "Le plafond de famille",
        tex: String.raw`W_f \;=\; \operatorname{clamp}\!\left(\sum_{i \in f} w_i,\; -c_f,\; +c_f\right)`,
        reads: "La somme d’une famille est écrêtée à son plafond, dans les deux sens.",
        margin: "Douze mesures d’un même geste ne sont pas douze preuves : c’est une observation vue sous douze angles. Les additionner sans plafond fabrique une certitude fausse. C’est l’erreur qui ruine la plupart des systèmes de notation.",
      },
      {
        n: "IV",
        title: "Le plafond vient du coût d’attaque",
        tex: String.raw`c_f \;=\; \min\!\left(D_f,\; A_f\right)`,
        reads: "Le plafond est le minimum entre le pouvoir de discrimination du signal et le coût de son contournement.",
        margin: "Un signal peut être excellent en laboratoire et sans valeur en production parce qu’il coûte dix euros à tromper. La signature motrice discrimine remarquablement, jusqu’à l’achat d’un simulateur de souris. La dette de sommeil discrimine plus grossièrement, mais la contourner détruit l’intérêt même de tricher.",
      },
      {
        n: "V",
        title: "La couverture, croyance a posteriori",
        tex: String.raw`c \;\sim\; \mathrm{Beta}\!\left(a+1,\; m+1\right) \qquad \mathbb{E}\left[c\right] \;=\; \frac{a+1}{a+m+2}`,
        reads: "La fraction d’heures réellement assistée suit une loi Bêta, avec l’estimateur de Laplace pour moyenne.",
        margin: "On tire les contrôles à des instants uniformes dans la fenêtre déclarée. Le taux de réussite estime la présence. L’intervalle affiché est la moyenne plus ou moins 1,645 écart-type, soit 90 %.",
      },
      {
        n: "VI",
        title: "La couverture, convertie en preuve",
        tex: String.raw`W_{\mathrm{cov}} \;=\; \frac{10}{\ln 10}\left[\,a \ln\frac{c_H}{c_F} \;+\; m \ln\frac{1-c_H}{1-c_F}\right] \cdot \min\!\left(1,\; \frac{n}{8}\right)`,
        reads: "Rapport de vraisemblance binomial entre deux hypothèses de présence, escompté par le volume de contrôles.",
        margin: "c_H = 0,95 est la présence normale. c_F = 0,60 est le compte qui réclame vingt heures par jour et ne peut en couvrir que six sur dix, un tiers de ses heures tombant pendant son sommeil. Le facteur final empêche deux contrôles réussis de valoir autant que dix.",
      },
      {
        n: "VII",
        title: "L’asymétrie des pièges",
        tex: String.raw`\begin{aligned} w_{\text{ne mord pas}} &= 10\log_{10}\frac{0{,}999}{0{,}95} \approx +0{,}2 \\[4pt] w_{\text{mord}} &= 10\log_{10}\frac{0{,}001}{0{,}05} \approx -17{,}0 \end{aligned}`,
        reads: "Réussir le piège n’apporte presque rien. Y échouer est accablant.",
        margin: "L’asymétrie n’est pas un choix moral, elle sort du calcul. Un bot prudent réussit le piège aussi bien qu’un humain : la réussite ne discrimine pas. L’échec, lui, est presque impossible pour un humain. Même logique côté matériel : réussir un contrôle biométrique rapporte, ne pas en avoir ne coûte rien.",
      },
      {
        n: "VIII",
        title: "Le tremblement neuromusculaire",
        tex: String.raw`E \;=\; \frac{1}{n-2}\sum_{i=2}^{n} \left\lVert\, p_i - 2p_{i-1} + p_{i-2} \,\right\rVert`,
        reads: "Énergie moyenne de la dérivée seconde discrète de la position du curseur.",
        margin: "Approximation de la bande 8 à 12 Hz du tremblement physiologique. Tout système neuromusculaire humain vibre dans cette bande ; une trajectoire calculée est trop lisse et donne une énergie proche de zéro.",
      },
      {
        n: "IX",
        title: "La latence suit-elle la difficulté",
        tex: String.raw`r \;=\; \frac{\sum \left(d_i - \bar{d}\right)\left(\ell_i - \bar{\ell}\right)}{\sqrt{\sum \left(d_i - \bar{d}\right)^2 \sum \left(\ell_i - \bar{\ell}\right)^2}}`,
        reads: "Corrélation de Pearson entre la difficulté annoncée et le temps de réponse observé.",
        margin: "Le signal cognitif central. Un humain met plus longtemps sur une tâche dure ; une machine répond avec une latence indifférente au contenu. Pour le tromper il faut modéliser une charge mentale, pas seulement ajouter du bruit.",
      },
      {
        n: "X",
        title: "La régularité mécanique",
        tex: String.raw`\mathrm{CV} \;=\; \frac{\sigma}{\mu} \qquad \text{humain} \gg 0 \quad\text{script} \to 0`,
        reads: "Coefficient de variation des durées de maintien des touches et des intervalles entre pauses.",
        margin: "Le discriminant le plus simple du catalogue, et l’un des plus efficaces. Un script produit un coefficient proche de zéro. Un humain fatigué, irrégulier, interrompu, produit une forte dispersion. C’est la régularité qui est suspecte, jamais le désordre.",
      },
    ],
    closing:
      "Ces dix lignes ne sont pas une intention : elles sont dans le code, aux fichiers cités plus haut. Les constantes qu’elles contiennent, elles, restent une calibration initiale plausible et non validée. C’est exactement ce qu’il faut venir contester.",
  },

  en: {
    eyebrow: "Proof sheet",
    title: "The engine, in ten lines",
    lede: "For those who would rather verify than trust. Every line is the one running in the code, with the intent set in the margin.",
    legendTitle: "Notation",
    legend: [
      ["H, M", "the two hypotheses: the trace comes from a human, or from a machine"],
      ["x_i", "the observation made by signal i"],
      ["w_i", "the evidence that signal contributes, in decibans"],
      ["c_f", "the ceiling of family f"],
      ["π", "the prior, assumed proportion of fraud"],
      ["a, m", "checks answered and checks missed"],
    ],
    plates: [
      {
        n: "I",
        title: "The evidence of one signal",
        tex: String.raw`w_i \;=\; 10\,\log_{10}\!\frac{P\!\left(x_i \mid H\right)}{P\!\left(x_i \mid M\right)}`,
        reads: "Ten times the base-ten logarithm of the ratio between how often the observation occurs in humans and how often it occurs in machines.",
        margin: "The unit is the deciban. Turing created it at Bletchley Park to add up clues where no single one suffices. Ten decibans is a ten-to-one ratio.",
      },
      {
        n: "II",
        title: "Accumulation",
        tex: String.raw`\operatorname{logit} P(H \mid x) \;=\; \operatorname{logit} \pi \;+\; \sum_{i} w_i`,
        reads: "Evidence adds up in logit space, then the prior is applied once, at the end.",
        margin: "This is the whole point of the logarithm: instead of multiplying probabilities, an opaque and numerically unstable operation, you add readable quantities that stay attributable line by line.",
      },
      {
        n: "III",
        title: "The family ceiling",
        tex: String.raw`W_f \;=\; \operatorname{clamp}\!\left(\sum_{i \in f} w_i,\; -c_f,\; +c_f\right)`,
        reads: "A family's sum is clipped at its ceiling, in both directions.",
        margin: "Twelve measurements of one gesture are not twelve pieces of evidence: they are one observation seen from twelve angles. Adding them without a ceiling manufactures false certainty. This is the mistake that ruins most scoring systems.",
      },
      {
        n: "IV",
        title: "The ceiling comes from attack cost",
        tex: String.raw`c_f \;=\; \min\!\left(D_f,\; A_f\right)`,
        reads: "The ceiling is the minimum of the signal's discriminative power and the cost of defeating it.",
        margin: "A signal can be excellent in the lab and worthless in production because it costs ten euros to fool. The motor signature discriminates remarkably well, right up until someone buys a mouse jiggler. Sleep debt discriminates more crudely, but defeating it destroys the very point of cheating.",
      },
      {
        n: "V",
        title: "Coverage, posterior belief",
        tex: String.raw`c \;\sim\; \mathrm{Beta}\!\left(a+1,\; m+1\right) \qquad \mathbb{E}\left[c\right] \;=\; \frac{a+1}{a+m+2}`,
        reads: "The fraction of hours genuinely attended follows a Beta distribution, with the Laplace estimator as its mean.",
        margin: "Checks are drawn at uniform moments inside the declared window. The success rate estimates presence. The displayed interval is the mean plus or minus 1.645 standard deviations, that is 90 %.",
      },
      {
        n: "VI",
        title: "Coverage, converted to evidence",
        tex: String.raw`W_{\mathrm{cov}} \;=\; \frac{10}{\ln 10}\left[\,a \ln\frac{c_H}{c_F} \;+\; m \ln\frac{1-c_H}{1-c_F}\right] \cdot \min\!\left(1,\; \frac{n}{8}\right)`,
        reads: "Binomial likelihood ratio between two presence hypotheses, discounted by the volume of checks.",
        margin: "c_H = 0.95 is normal presence. c_F = 0.60 is the account claiming twenty hours a day that can only cover six in ten, a third of its hours falling while it sleeps. The final factor stops two answered checks being worth as much as ten.",
      },
      {
        n: "VII",
        title: "The asymmetry of traps",
        tex: String.raw`\begin{aligned} w_{\text{not biting}} &= 10\log_{10}\frac{0.999}{0.95} \approx +0.2 \\[4pt] w_{\text{biting}} &= 10\log_{10}\frac{0.001}{0.05} \approx -17.0 \end{aligned}`,
        reads: "Passing the trap contributes almost nothing. Failing it is damning.",
        margin: "The asymmetry is not a moral choice, it falls out of the maths. A careful bot passes the trap as well as a human: passing does not discriminate. Failing, on the other hand, is nearly impossible for a human. Same logic for hardware: passing a biometric check earns points, having no reader costs nothing.",
      },
      {
        n: "VIII",
        title: "Neuromuscular tremor",
        tex: String.raw`E \;=\; \frac{1}{n-2}\sum_{i=2}^{n} \left\lVert\, p_i - 2p_{i-1} + p_{i-2} \,\right\rVert`,
        reads: "Mean energy of the discrete second derivative of cursor position.",
        margin: "An approximation of the 8 to 12 Hz physiological tremor band. Every human neuromuscular system vibrates in that band; a computed trajectory is too smooth and yields an energy close to zero.",
      },
      {
        n: "IX",
        title: "Does latency track difficulty",
        tex: String.raw`r \;=\; \frac{\sum \left(d_i - \bar{d}\right)\left(\ell_i - \bar{\ell}\right)}{\sqrt{\sum \left(d_i - \bar{d}\right)^2 \sum \left(\ell_i - \bar{\ell}\right)^2}}`,
        reads: "Pearson correlation between stated difficulty and observed response time.",
        margin: "The central cognitive signal. A human takes longer on a hard task; a machine answers with a latency indifferent to content. Fooling it requires modelling mental load, not merely adding noise.",
      },
      {
        n: "X",
        title: "Mechanical regularity",
        tex: String.raw`\mathrm{CV} \;=\; \frac{\sigma}{\mu} \qquad \text{human} \gg 0 \quad\text{script} \to 0`,
        reads: "Coefficient of variation of key hold durations and of gaps between breaks.",
        margin: "The simplest discriminant in the catalogue, and one of the most effective. A script produces a coefficient near zero. A tired, irregular, interrupted human produces wide dispersion. Regularity is what looks suspicious, never disorder.",
      },
    ],
    closing:
      "These ten lines are not an intention: they are in the code, in the files named above. The constants inside them, however, remain a plausible and unvalidated initial calibration. That is exactly what you should come and challenge.",
  },
};
