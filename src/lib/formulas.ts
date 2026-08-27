import type { Lang } from "@/lib/content";

export type PlateStatus = "exact" | "heuristique" | "approx" | "inerte" | "absent";

export type Plate = {
  n: string;
  title: string;
  tex: string;
  reads: string;
  margin: string;
  status: PlateStatus;
  /** Reserve honnete : ce qu'un statisticien objecterait, dit avant lui. */
  caveat?: string;
};

export const statusLabel: Record<Lang, Record<PlateStatus, string>> = {
  fr: {
    exact: "exact",
    heuristique: "heuristique assumee",
    approx: "approximation",
    inerte: "implemente mais inerte",
    absent: "specifie, pas implemente",
  },
  en: {
    exact: "exact",
    heuristique: "acknowledged heuristic",
    approx: "approximation",
    inerte: "implemented but inert",
    absent: "specified, not implemented",
  },
};

export const formulas: Record<Lang, {
  eyebrow: string;
  title: string;
  lede: string;
  legendTitle: string;
  legend: [string, string][];
  plates: Plate[];
  closing: string;
  caveatLabel: string;
  assumeTitle: string;
  assumeLede: string;
  assumptions: { title: string; body: string }[];
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
      ["π", "la présomption de départ : probabilité, AVANT toute observation, que la personne soit humaine. Si l’on raisonne en taux de fraude f, alors π = 1 − f"],
      ["a, m", "contrôles réussis et contrôles manqués"],
    ],
    plates: [
      {
        n: "I",
        title: "La preuve d’un signal",
        tex: String.raw`w_i \;=\; 10\,\log_{10}\!\frac{P\!\left(x_i \mid H\right)}{P\!\left(x_i \mid M\right)}`,
        reads: "Dix fois le logarithme décimal du rapport entre la fréquence de l’observation chez l’humain et sa fréquence chez la machine.",
        margin: "L’unité est le deciban. Turing l’a créée à Bletchley Park pour additionner des indices dont aucun ne suffit seul. Dix decibans valent un rapport de dix contre un.",
        status: "exact",
        caveat:
          "La définition est exacte, mais le code ne l’évalue pas : il n’estime aucune des deux probabilités et attribue à la place des poids fixes par seuils. Cette ligne dit donc ce que les constantes SIGNIFIENT, pas comment elles sont obtenues. Les calculer vraiment est le travail de la calibration.",
      },
      {
        n: "II",
        title: "L’accumulation",
        tex: String.raw`\underbrace{10\log_{10}\frac{P(H \mid x)}{P(M \mid x)}}_{\text{cote finale, en db}} \;=\; \underbrace{10\log_{10}\frac{\pi}{1-\pi}}_{\text{présomption, en db}} \;+\; \sum_{i} w_i`,
        reads: "Tout est exprimé en decibans, y compris la présomption de départ. Les preuves s’additionnent, puis on revient à une probabilité par la transformation inverse.",
        margin: "C’est tout l’intérêt du logarithme : au lieu de multiplier des probabilités, on additionne des quantités lisibles et attribuables ligne par ligne. Attention à ne pas écrire cette ligne avec un logit naturel d’un côté et des decibans de l’autre : les deux ne s’additionnent pas.",
        status: "exact",
        caveat:
          "Deux réserves. D’abord l’addition suppose les signaux CONDITIONNELLEMENT INDÉPENDANTS sachant la classe : ils ne le sont pas, et le plafond de la planche III ne fait que limiter les dégâts. Ensuite le code ne franchit jamais cette étape : il s’arrête à la somme des preuves et n’applique aucune présomption. Le verdict se lit donc en decibans, jamais en probabilité, ce qui est délibéré : sur preuve mince, la probabilité ne refléterait que π.",
      },
      {
        n: "III",
        title: "Le plafond de famille",
        tex: String.raw`W_f \;=\; \operatorname{clamp}\!\left(\sum_{i \in f} w_i,\; -c_f,\; +c_f\right)`,
        reads: "La somme d’une famille est écrêtée à son plafond, dans les deux sens.",
        margin: "Douze mesures d’un même geste ne sont pas douze preuves : c’est une observation vue sous douze angles. Les additionner sans plafond fabrique une certitude fausse.",
        status: "heuristique",
        caveat:
          "Ce n’est PAS une correction principielle de la corrélation. Le traitement rigoureux passerait par une vraisemblance multivariée ou une copule, estimées sur données. L’écrêtage est un garde-fou grossier, choisi parce qu’il échoue du bon côté : il sous-estime la preuve au lieu de la surestimer.",
      },
      {
        n: "IV",
        title: "Le plafond vient du coût d’attaque",
        tex: String.raw`c_f \;=\; \min\!\left(D_f,\; A_f\right) \qquad \begin{aligned} D_f &= \text{preuve max. que la famille peut émettre} \\ A_f &= \text{preuve qu’un adversaire peut fabriquer} \end{aligned}`,
        reads: "Les deux termes sont exprimés en decibans, sinon le minimum n’aurait aucun sens. D est mesurable sur données ; A ne l’est pas.",
        margin: "Un signal peut être excellent en laboratoire et sans valeur en production parce qu’il coûte dix euros à tromper. La signature motrice discrimine remarquablement, jusqu’à l’achat d’un simulateur de souris. La dette de sommeil discrimine plus grossièrement, mais la contourner détruit l’intérêt même de tricher.",
        status: "heuristique",
        caveat:
          "A_f est un jugement d’ingénieur, pas une mesure. Il faudrait le calibrer contre des attaques réelles menées par des gens qui essaient vraiment. C’est le rôle qu’on cherche à pourvoir en priorité.",
      },
      {
        n: "V",
        title: "La couverture, croyance a posteriori",
        tex: String.raw`c \;\sim\; \mathrm{Beta}\!\left(a+1,\; m+1\right) \qquad \mathbb{E}\left[c\right] \;=\; \frac{a+1}{a+m+2}`,
        reads: "La fraction d’heures réellement assistée suit une loi Bêta après un a priori uniforme, avec l’estimateur de Laplace pour moyenne. Cette ligne est exacte.",
        margin: "On tire les contrôles à des instants uniformes dans la fenêtre déclarée, et le taux de réussite estime la présence. L’espérance ci-contre est exacte.",
        status: "approx",
        caveat:
          "L’intervalle AFFICHÉ ne l’est pas. Le code calcule moyenne ± 1,645 σ, une approximation normale d’une loi fortement asymétrique. Sur deux ou trois contrôles elle est franchement mauvaise, et il faut écrêter à [0, 1] pour qu’elle reste dans les bornes, ce qui est l’aveu du problème. La forme correcte est le quantile de la Bêta : F⁻¹(0,05) et F⁻¹(0,95).",
      },
      {
        n: "VI",
        title: "La couverture, convertie en preuve",
        tex: String.raw`\begin{aligned} W^{\star}_{\mathrm{cov}} &= \frac{10}{\ln 10}\left[\,a \ln\frac{c_H}{c_F} \;+\; m \ln\frac{1-c_H}{1-c_F}\right] &&\text{\footnotesize exact} \\[8pt] W_{\mathrm{cov}} &= W^{\star}_{\mathrm{cov}} \cdot \min\!\left(1,\; \tfrac{n}{8}\right) &&\text{\footnotesize écrêtage ajouté} \end{aligned}`,
        reads: "La première ligne est le rapport de vraisemblance binomial exact : le coefficient du binôme se simplifie entre les deux hypothèses. La seconde ligne ajoute un facteur qui n’en fait pas partie.",
        margin: "c_H = 0,95 est la présence normale. c_F = 0,60 est le compte qui réclame vingt heures par jour et ne peut en couvrir que six sur dix, un tiers de ses heures tombant pendant son sommeil.",
        status: "heuristique",
        caveat:
          "Le facteur min(1, n/8) N’EST PAS bayésien. La vraisemblance croît déjà linéairement en n : le multiplier une seconde fois escompte deux fois. C’est un choix délibérément conservateur, pour qu’une seule réussite ne pèse pas comme dix, mais il faut l’appeler par son nom. Les deux valeurs c_H et c_F sont par ailleurs postulées, pas estimées.",
      },
      {
        n: "VII",
        title: "L’asymétrie des pièges",
        tex: String.raw`\begin{aligned} w_{\text{ne mord pas}} &= 10\log_{10}\frac{0{,}999}{0{,}95} \approx +0{,}2 \\[4pt] w_{\text{mord}} &= 10\log_{10}\frac{0{,}001}{0{,}05} \approx -17{,}0 \end{aligned}`,
        reads: "Réussir le piège n’apporte presque rien. Y échouer est accablant.",
        margin: "L’asymétrie n’est pas un choix moral, elle sort du calcul. Un bot prudent réussit le piège aussi bien qu’un humain : la réussite ne discrimine pas. L’échec, lui, est presque impossible pour un humain. Même logique côté matériel : réussir un contrôle biométrique rapporte, ne pas en avoir ne coûte rien.",
        status: "absent",
        caveat:
          "Aucune famille « pièges » n’existe dans le code aujourd’hui. Le calcul ci-contre est juste, mais il illustre un principe, il ne documente pas une mesure en service. Les quatre probabilités sont en outre postulées.",
      },
      {
        n: "VIII",
        title: "Le tremblement neuromusculaire",
        tex: String.raw`E \;=\; \frac{1}{n-2}\sum_{i=3}^{n} \left\lVert\, p_i - 2p_{i-1} + p_{i-2} \,\right\rVert`,
        reads: "Norme moyenne de la différence seconde discrète de la position du curseur, sur les n − 2 triplets disponibles.",
        margin: "Tout système neuromusculaire humain vibre autour de 8 à 12 Hz, et une trajectoire calculée est trop lisse : son énergie tombe près de zéro. C’est ce contraste que la mesure exploite.",
        status: "approx",
        caveat:
          "Une différence seconde est un filtre PASSE-HAUT grossier, pas un passe-bande à 8–12 Hz. Elle capte le tremblement, mais aussi la gigue d’échantillonnage et le bruit du capteur. Sa valeur dépend de la cadence des événements du navigateur, qui varie d’une machine à l’autre : E n’est donc pas comparable entre appareils. Isoler la vraie bande demanderait une transformée de Fourier ou un filtre dédié.",
      },
      {
        n: "IX",
        title: "La latence suit-elle la difficulté",
        tex: String.raw`r \;=\; \frac{\sum \left(d_i - \bar{d}\right)\left(\ell_i - \bar{\ell}\right)}{\sqrt{\sum \left(d_i - \bar{d}\right)^2 \sum \left(\ell_i - \bar{\ell}\right)^2}}`,
        reads: "Corrélation de Pearson entre la difficulté annoncée et le temps de réponse observé.",
        margin: "Le signal cognitif central. Un humain met plus longtemps sur une tâche dure ; une machine répond avec une latence indifférente au contenu. Pour le tromper il faut modéliser une charge mentale, pas seulement ajouter du bruit.",
        status: "inerte",
        caveat:
          "Le code est écrit et correct, mais tous les contrôles envoient aujourd’hui la même difficulté. La variance de d est donc nulle, r est indéfini, et le signal renvoie systématiquement « données insuffisantes ». Il ne servira à rien tant que le défi ne proposera pas plusieurs niveaux de difficulté.",
      },
      {
        n: "X",
        title: "La régularité mécanique",
        tex: String.raw`\mathrm{CV} \;=\; \frac{\sigma}{\mu} \qquad \text{humain} \gg 0 \quad\text{script} \to 0`,
        reads: "Coefficient de variation des durées de maintien des touches et des intervalles entre pauses.",
        margin: "Le discriminant le plus simple du catalogue, et l’un des plus efficaces. Un script produit un coefficient proche de zéro. Un humain fatigué, irrégulier, interrompu, produit une forte dispersion. C’est la régularité qui est suspecte, jamais le désordre.",
        status: "exact",
        caveat:
          "La définition est exacte, mais les seuils qui la transforment en decibans sont posés à la main. Rien ne dit que 0,25 soit la bonne frontière : c’est une des valeurs qu’une calibration doit remplacer.",
      },
    ],
    caveatLabel: "Réserve",
    assumeTitle: "Hypothèses et faiblesses connues",
    assumeLede:
      "Aucun de ces points n’est caché dans une note de bas de page. Ils sont ici parce qu’un statisticien les trouverait de toute façon, et qu’il vaut mieux qu’il les lise de notre main.",
    assumptions: [
      {
        title: "L’indépendance conditionnelle est fausse",
        body: "Additionner des rapports de vraisemblance suppose les signaux indépendants sachant la classe. Le tremblement, la sinuosité et les corrections de cap mesurent tous le même geste : ils sont fortement corrélés. Le plafond de famille limite les dégâts sans les corriger. Le traitement rigoureux passerait par une vraisemblance multivariée estimée sur données réelles.",
      },
      {
        title: "Toutes les probabilités sont postulées",
        body: "P(x | H) et P(x | M) ne sont mesurées nulle part. Les seuils qui les remplacent sont des jugements. Tant qu’aucune donnée étiquetée n’existe, les decibans affichés sont une échelle cohérente, pas une quantité vérifiée. C’est pourquoi la page de calibration refuse d’annoncer un taux de performance.",
      },
      {
        title: "Deux familles ne mesurent rien aujourd’hui",
        body: "La corrélation latence-difficulté est inerte tant que le défi n’a qu’un seul niveau. La famille des pièges n’existe pas du tout dans le code. Elles figurent ici parce qu’elles font partie du raisonnement, pas parce qu’elles tournent.",
      },
      {
        title: "L’énergie du tremblement n’est pas comparable entre machines",
        body: "Elle dépend de la cadence des événements de pointeur, qui varie selon le navigateur, le système et le matériel. Un seuil unique appliqué à tous les appareils est donc bancal. Une normalisation par la fréquence d’échantillonnage est nécessaire.",
      },
      {
        title: "Un score n’est pas une preuve judiciaire",
        body: "Même parfaitement calibré, ce moteur produit un rapport de vraisemblance, pas une certitude. Il est conçu pour qu’une personne s’en serve afin de se défendre, jamais pour qu’une institution s’en serve afin de condamner.",
      },
    ],
    closing:
      "Huit de ces dix lignes tournent dans le code, aux fichiers cités plus haut ; les deux autres portent leur réserve. Les constantes, elles, restent une calibration initiale plausible et non validée. Si vous trouvez une erreur que nous n’avons pas signalée nous-mêmes, elle nous intéresse plus que n’importe quel compliment.",
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
      ["π", "the prior: probability, BEFORE any observation, that the person is human. If you think in terms of a fraud rate f, then π = 1 − f"],
      ["a, m", "checks answered and checks missed"],
    ],
    plates: [
      {
        n: "I",
        title: "The evidence of one signal",
        tex: String.raw`w_i \;=\; 10\,\log_{10}\!\frac{P\!\left(x_i \mid H\right)}{P\!\left(x_i \mid M\right)}`,
        reads: "Ten times the base-ten logarithm of the ratio between how often the observation occurs in humans and how often it occurs in machines.",
        margin: "The unit is the deciban. Turing created it at Bletchley Park to add up clues where no single one suffices. Ten decibans is a ten-to-one ratio.",
        status: "exact",
        caveat:
          "The definition is exact, but the code does not evaluate it: it estimates neither probability and instead assigns fixed weights by threshold. This line therefore states what the constants MEAN, not how they are obtained. Actually computing them is the work of calibration.",
      },
      {
        n: "II",
        title: "Accumulation",
        tex: String.raw`\underbrace{10\log_{10}\frac{P(H \mid x)}{P(M \mid x)}}_{\text{final odds, in db}} \;=\; \underbrace{10\log_{10}\frac{\pi}{1-\pi}}_{\text{prior, in db}} \;+\; \sum_{i} w_i`,
        reads: "Everything is expressed in decibans, the prior included. Evidence adds up, then the inverse transform returns a probability.",
        margin: "This is the whole point of the logarithm: instead of multiplying probabilities, you add readable quantities that stay attributable line by line. Take care never to write this line with a natural logit on one side and decibans on the other: the two do not add.",
        status: "exact",
        caveat:
          "Two caveats. First, the summation assumes the signals are CONDITIONALLY INDEPENDENT given the class: they are not, and the ceiling of plate III merely limits the damage. Second, the code never takes this step: it stops at the sum of evidence and applies no prior. The verdict is therefore read in decibans, never as a probability, which is deliberate: on thin evidence the probability would only reflect π.",
      },
      {
        n: "III",
        title: "The family ceiling",
        tex: String.raw`W_f \;=\; \operatorname{clamp}\!\left(\sum_{i \in f} w_i,\; -c_f,\; +c_f\right)`,
        reads: "A family's sum is clipped at its ceiling, in both directions.",
        margin: "Twelve measurements of one gesture are not twelve pieces of evidence: they are one observation seen from twelve angles. Adding them without a ceiling manufactures false certainty.",
        status: "heuristique",
        caveat:
          "This is NOT a principled correction for correlation. The rigorous treatment would use a multivariate likelihood or a copula, estimated from data. Clipping is a crude guard rail, chosen because it fails on the right side: it understates evidence rather than overstating it.",
      },
      {
        n: "IV",
        title: "The ceiling comes from attack cost",
        tex: String.raw`c_f \;=\; \min\!\left(D_f,\; A_f\right) \qquad \begin{aligned} D_f &= \text{max. evidence the family can emit} \\ A_f &= \text{evidence an adversary can manufacture} \end{aligned}`,
        reads: "Both terms are expressed in decibans, otherwise the minimum would be meaningless. D can be measured from data; A cannot.",
        margin: "A signal can be excellent in the lab and worthless in production because it costs ten euros to fool. The motor signature discriminates remarkably well, right up until someone buys a mouse jiggler. Sleep debt discriminates more crudely, but defeating it destroys the very point of cheating.",
        status: "heuristique",
        caveat:
          "A_f is an engineering judgement, not a measurement. It should be calibrated against real attacks mounted by people genuinely trying. That is the role we are most keen to fill.",
      },
      {
        n: "V",
        title: "Coverage, posterior belief",
        tex: String.raw`c \;\sim\; \mathrm{Beta}\!\left(a+1,\; m+1\right) \qquad \mathbb{E}\left[c\right] \;=\; \frac{a+1}{a+m+2}`,
        reads: "The fraction of hours genuinely attended follows a Beta distribution after a uniform prior, with the Laplace estimator as its mean. This line is exact.",
        margin: "Checks are drawn at uniform moments inside the declared window, and the success rate estimates presence. The expectation opposite is exact.",
        status: "approx",
        caveat:
          "The DISPLAYED interval is not. The code computes mean ± 1.645 σ, a normal approximation to a strongly skewed distribution. On two or three checks it is frankly poor, and it has to be clipped to [0, 1] to stay in range, which is the admission of the problem. The correct form is the Beta quantile: F⁻¹(0.05) and F⁻¹(0.95).",
      },
      {
        n: "VI",
        title: "Coverage, converted to evidence",
        tex: String.raw`\begin{aligned} W^{\star}_{\mathrm{cov}} &= \frac{10}{\ln 10}\left[\,a \ln\frac{c_H}{c_F} \;+\; m \ln\frac{1-c_H}{1-c_F}\right] &&\text{\footnotesize exact} \\[8pt] W_{\mathrm{cov}} &= W^{\star}_{\mathrm{cov}} \cdot \min\!\left(1,\; \tfrac{n}{8}\right) &&\text{\footnotesize added shrinkage} \end{aligned}`,
        reads: "The first line is the exact binomial likelihood ratio: the binomial coefficient cancels between the two hypotheses. The second line adds a factor that is no part of it.",
        margin: "c_H = 0.95 is normal presence. c_F = 0.60 is the account claiming twenty hours a day that can only cover six in ten, a third of its hours falling while it sleeps.",
        status: "heuristique",
        caveat:
          "The min(1, n/8) factor is NOT Bayesian. The likelihood already grows linearly in n: multiplying a second time discounts twice. It is a deliberately conservative choice, so that a single success does not weigh like ten, but it must be called by its name. Both c_H and c_F are moreover postulated, not estimated.",
      },
      {
        n: "VII",
        title: "The asymmetry of traps",
        tex: String.raw`\begin{aligned} w_{\text{not biting}} &= 10\log_{10}\frac{0.999}{0.95} \approx +0.2 \\[4pt] w_{\text{biting}} &= 10\log_{10}\frac{0.001}{0.05} \approx -17.0 \end{aligned}`,
        reads: "Passing the trap contributes almost nothing. Failing it is damning.",
        margin: "The asymmetry is not a moral choice, it falls out of the maths. A careful bot passes the trap as well as a human: passing does not discriminate. Failing, on the other hand, is nearly impossible for a human. Same logic for hardware: passing a biometric check earns points, having no reader costs nothing.",
        status: "absent",
        caveat:
          "No “traps” family exists in the code today. The calculation opposite is sound, but it illustrates a principle; it does not document a measurement in service. All four probabilities are moreover postulated.",
      },
      {
        n: "VIII",
        title: "Neuromuscular tremor",
        tex: String.raw`E \;=\; \frac{1}{n-2}\sum_{i=3}^{n} \left\lVert\, p_i - 2p_{i-1} + p_{i-2} \,\right\rVert`,
        reads: "Mean norm of the discrete second difference of cursor position, over the n − 2 available triples.",
        margin: "Every human neuromuscular system vibrates around 8 to 12 Hz, and a computed trajectory is too smooth: its energy falls close to zero. That contrast is what the measurement exploits.",
        status: "approx",
        caveat:
          "A second difference is a crude HIGH-PASS filter, not a band-pass at 8–12 Hz. It picks up tremor, but also sampling jitter and sensor noise. Its value depends on the browser event rate, which varies from machine to machine: E is therefore not comparable across devices. Isolating the true band would require a Fourier transform or a dedicated filter.",
      },
      {
        n: "IX",
        title: "Does latency track difficulty",
        tex: String.raw`r \;=\; \frac{\sum \left(d_i - \bar{d}\right)\left(\ell_i - \bar{\ell}\right)}{\sqrt{\sum \left(d_i - \bar{d}\right)^2 \sum \left(\ell_i - \bar{\ell}\right)^2}}`,
        reads: "Pearson correlation between stated difficulty and observed response time.",
        margin: "The central cognitive signal. A human takes longer on a hard task; a machine answers with a latency indifferent to content. Fooling it requires modelling mental load, not merely adding noise.",
        status: "inerte",
        caveat:
          "The code is written and correct, but every check currently sends the same difficulty. The variance of d is therefore zero, r is undefined, and the signal always returns “insufficient data”. It will do nothing until the challenge offers several difficulty levels.",
      },
      {
        n: "X",
        title: "Mechanical regularity",
        tex: String.raw`\mathrm{CV} \;=\; \frac{\sigma}{\mu} \qquad \text{human} \gg 0 \quad\text{script} \to 0`,
        reads: "Coefficient of variation of key hold durations and of gaps between breaks.",
        margin: "The simplest discriminant in the catalogue, and one of the most effective. A script produces a coefficient near zero. A tired, irregular, interrupted human produces wide dispersion. Regularity is what looks suspicious, never disorder.",
        status: "exact",
        caveat:
          "The definition is exact, but the thresholds that turn it into decibans are set by hand. Nothing says 0.25 is the right boundary: it is one of the values a calibration must replace.",
      },
    ],
    caveatLabel: "Caveat",
    assumeTitle: "Assumptions and known weaknesses",
    assumeLede:
      "None of these are buried in a footnote. They are here because a statistician would find them anyway, and it is better that they read them in our own hand.",
    assumptions: [
      {
        title: "Conditional independence is false",
        body: "Adding likelihood ratios assumes the signals are independent given the class. Tremor, sinuosity and course corrections all measure the same gesture: they are heavily correlated. The family ceiling limits the damage without correcting it. The rigorous treatment would use a multivariate likelihood estimated from real data.",
      },
      {
        title: "Every probability is postulated",
        body: "P(x | H) and P(x | M) are measured nowhere. The thresholds that stand in for them are judgements. Until labelled data exists, the decibans on display are a coherent scale, not a verified quantity. That is why the calibration page refuses to announce a performance figure.",
      },
      {
        title: "Two families measure nothing today",
        body: "The latency-difficulty correlation is inert while the challenge offers a single level. The traps family does not exist in the code at all. They appear here because they are part of the reasoning, not because they run.",
      },
      {
        title: "Tremor energy is not comparable across machines",
        body: "It depends on the pointer event rate, which varies with browser, operating system and hardware. A single threshold applied to every device is therefore shaky. Normalisation by sampling frequency is needed.",
      },
      {
        title: "A score is not legal proof",
        body: "Even perfectly calibrated, this engine yields a likelihood ratio, not a certainty. It is built so a person can use it to defend themselves, never so an institution can use it to convict.",
      },
    ],
    closing:
      "Eight of these ten lines run in the code, in the files named above; the other two carry their caveat. The constants remain a plausible and unvalidated initial calibration. If you find an error we have not flagged ourselves, it interests us more than any compliment.",
  },
};
