export type Lang = "fr" | "en";

export type Chapter = {
  kicker: string;
  title: string;
  body: string[];
  pull?: string;
};

export type Dict = {
  nav: {
    why: string;
    langLabel: string;
    langShort: string;
    how: string;
    home: string;
    algo: string;
    session: string;
  };
  how: {
    dayTitle: string;
    dayLede: string;
    dayWindow: string;
    dayLegendOk: string;
    dayLegendKo: string;
    dayRead: string;
    tldrLabel: string;
    tldr: string;
    eyebrow: string;
    title: string;
    lede: string;
    linkTitle: string;
    linkPunch: string;
    linkBody: string[];
    stepsTitle: string;
    stepsLede: string;
    steps: { title: string; body: string }[];
    callLabel: string;
    callTitle: string;
    callLede: string;
    callSeq: { tag: string; title: string; body: string }[];
    callSecLabel: string;
    callSecTitle: string;
    callSecBody: string;
    callStatusLabel: string;
    callStatus: { k: string; v: string; tone?: string }[];
    callStatusNote: string;
    proofLabel: string;
    proofTitle: string;
    proofBody: string;
    proofCard: {
      seal: string;
      name: string;
      periodLabel: string;
      period: string;
      coverageLabel: string;
      coverage: string;
      scoreLabel: string;
      score: string;
      verdictLabel: string;
      verdict: string;
      probesLabel: string;
      probes: string;
      urlLabel: string;
    };
    phasesTitle: string;
    phases: { tag: string; title: string; body: string }[];
    limitLabel: string;
    limitTitle: string;
    limitBody: string[];
    statusEyebrow: string;
    statusTitle: string;
    statusLede: string;
    statusCols: { title: string; items: string[] }[];
    inviteLabel: string;
    inviteTitle: string;
    inviteBody: string;
    inviteCta: string;
  };
  hero: {
    badge: string;
    command: string;
    boot: { tag: string; label: string; value: string; tone: string }[];
    lede: string;
    ctaJoin: string;
    ctaSpec: string;
    ctaTry: string;
    meta: string[];
  };
  sensor: {
    live: string;
    head: string;
    hint: string;
    sinuosity: string;
    corrections: string;
    tremor: string;
    samples: string;
    waiting: string;
    human: string;
    poor: string;
  };
  problem: {
    eyebrow: string;
    title: string;
    cards: { tag: string; title: string; body: string }[];
  };
  principle: {
    eyebrow: string;
    title: string;
    lede: string;
    metaphorLabel: string;
    metaphor: string;
    stepLabel: string;
    steps: { title: string; body: string }[];
    calloutLabel: string;
    calloutTitle: string;
    calloutBody: string;
  };
  needs: {
    eyebrow: string;
    title: string;
    lede: string;
    items: { title: string; body: string }[];
    noteLabel: string;
    noteBody: string;
  };
  join: { eyebrow: string; title: string; lede: string };
  footer: string;
  story: {
    skip: string;
    back: string;
    next: string;
    last: string;
    chapters: Chapter[];
  };
  form: {
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    handle: string;
    handlePlaceholder: string;
    github: string;
    githubPlaceholder: string;
    optional: string;
    rolesLegend: string;
    availabilityLegend: string;
    motivation: string;
    motivationPlaceholder: string;
    submit: string;
    submitting: string;
    privacy: string;
    networkError: string;
    successLabel: string;
    successTitle: string;
    successBodyA: string;
    successBodyB: string;
    successNote: string;
    roles: [string, string][];
    availability: [string, string][];
  };
};

export const content: Record<Lang, Dict> = {
  fr: {
    nav: {
      why: "Pourquoi ce projet",
      langLabel: "English",
      langShort: "EN",
      how: "Comment ça marche",
      home: "Accueil",
      algo: "L’algorithme",
      session: "Tester l’outil",
    },

    how: {
      tldrLabel: "En une phrase",
      tldr: "Tu déclares les heures que tu travailles. Pendant ces heures, l’outil t’interrompt quelques fois au hasard, 90 secondes à chaque fois. À la fin, tu as une preuve partageable que tu étais bien là.",
      dayTitle: "Une journée, vue par l’outil",
      dayLede: "Voici tout le fonctionnement en une image. Le reste de la page ne fait que le détailler.",
      dayWindow: "fenêtre déclarée",
      dayLegendOk: "contrôle réussi",
      dayLegendKo: "contrôle manqué",
      dayRead: "Huit contrôles tombés à des instants imprévisibles. Sept réponses, un manqué vers 19 h. Couverture estimée : 87 %.",
      eyebrow: "Mode d’emploi",
      title: "Comment ça marche",
      lede: "Ce que l’outil fait, comment on s’en sert, et où en est le chantier aujourd’hui.",

      linkTitle: "Le lien avec Prométhée",
      linkPunch:
        "Il n’y en a pas. Deciban n’a pas besoin de Prométhée pour fonctionner, et c’est exactement pour ça que ça peut exister.",
      linkBody: [
        "Deciban ne lit rien dans Prométhée, ne se branche sur rien, ne demande aucune permission. Il ne mesure pas ce que tu fais dans une application donnée : il mesure une tranche de temps, et répond à une seule question. Est-ce qu’un humain était présent pendant ces heures-là ?",
        "Les deux outils ne se parlent jamais. Ils parlent de la même période. Le lien entre les deux, c’est toi.",
        "Une vraie intégration technique demanderait leur accord, du temps d’ingénierie de leur côté, et qu’ils acceptent d’être associés à un outil qui audite leur classement. Le projet serait mort avant de naître, bloqué par des gens qui n’ont aucune raison de se presser. Sans intégration, on livre demain.",
      ],

      stepsTitle: "S’en servir, concrètement",
      stepsLede:
        "Cinq étapes. Rien à installer, rien qui tourne en fond sur ta machine.",
      steps: [
        {
          title: "Tu travailles normalement",
          body: "Tu lances ta session comme d’habitude, dans l’outil que tu utilises déjà. Deciban ne change rien à ta façon de travailler.",
        },
        {
          title: "Tu déclares ta fenêtre",
          body: "Tu ouvres Deciban dans un onglet et tu indiques la période que tu veux faire attester. Par exemple : aujourd’hui, de 14 h à 22 h.",
        },
        {
          title: "Le contrôle frappe à ta porte",
          body: "Six à dix fois pendant cette fenêtre, à des instants que personne ne peut prévoir, l’onglet t’appelle. Tu as 90 secondes pour répondre. Tu bouges la souris, tu tapes quelques mots, et c’est fini.",
        },
        {
          title: "Le score se construit",
          body: "Chaque contrôle réussi ajoute de la preuve. Chaque contrôle manqué en retire. Les autres signaux, ton rythme, ta façon de taper, ta dette de sommeil, s’accumulent en parallèle.",
        },
        {
          title: "Tu obtiens une attestation",
          body: "Une page publique à une URL que tu contrôles. Quand on t’accuse, tu postes le lien. N’importe qui peut la vérifier sans avoir besoin de te croire.",
        },
      ],

      callLabel: "Le mécanisme",
      callTitle: "Comment il t’appelle",
      callLede:
        "C’est la question la plus concrète, et elle mérite une réponse précise. L’onglet ne te regarde pas travailler : une page web ne voit rien de ce qui se passe en dehors d’elle, c’est une limite du navigateur et non un choix. Il t’interrompt.",
      callSeq: [
        {
          tag: "Une fois",
          title: "Tu autorises les notifications",
          body: "Au démarrage de ta première session, le navigateur demande l’autorisation. Un clic, une seule fois. Ton navigateur s’abonne alors au service de notifications, exactement comme le fait Slack ou une messagerie.",
        },
        {
          tag: "Au départ",
          title: "Le serveur tire les instants en secret",
          body: "Tu déclares ta fenêtre, par exemple 14 h à 22 h. Le serveur tire huit moments au hasard à l’intérieur, les enregistre, et ne les envoie jamais. Ni à toi, ni à ton navigateur.",
        },
        {
          tag: "Le moment venu",
          title: "Le serveur pousse, ton écran s’allume",
          body: "Une notification native apparaît, même si tu es dans ton éditeur en plein écran sur un autre bureau. Un son court, le titre de l’onglet se met à clignoter. Un clic te ramène sur la page.",
        },
        {
          tag: "90 secondes",
          title: "Tu réponds, il mesure",
          body: "Tu bouges la souris, tu tapes quelques mots. Pendant ces quatre-vingt-dix secondes, le système mesure tout ce qu’il peut : ton geste, ton rythme de frappe, ton temps de réaction. Puis il te rend la main.",
        },
        {
          tag: "Après",
          title: "Le score se met à jour",
          body: "Le contrôle réussi ajoute de la preuve, le contrôle manqué en retire. Tu vois immédiatement ton score bouger, avec la ligne exacte qui l’a fait bouger.",
        },
      ],
      callSecLabel: "Le point qui fait tenir tout le reste",
      callSecTitle: "Ton navigateur ne connaît jamais l’horaire",
      callSecBody:
        "Si le client savait quand tombe le prochain contrôle, il suffirait d’ouvrir la console pour le lire et programmer sa présence. Le système ne vaudrait plus rien. L’horaire vit donc uniquement sur le serveur, et n’est jamais transmis. C’est le serveur qui pousse, ton navigateur ne demande rien. Il ne peut pas apprendre le futur puisqu’il ne pose aucune question.",
      callStatusLabel: "Pendant ta session",
      callStatus: [
        { k: "Fenêtre déclarée", v: "14:00 → 22:00" },
        { k: "Écoulé", v: "03:41:12" },
        { k: "Contrôles", v: "4 réussis / 4", tone: "--pos" },
        { k: "Prochain contrôle", v: "inconnu, par conception", tone: "--accent" },
        { k: "Liaison", v: "abonnée · poussée active", tone: "--pos" },
      ],
      callStatusNote:
        "Cette bande reste visible pendant toute ta session. « Prochain contrôle : inconnu » n’est pas une information manquante, c’est la garantie affichée comme telle. Et l’état de la liaison te prouve en permanence que le dispositif est vivant.",

      proofLabel: "Le résultat",
      proofTitle: "À quoi ressemble une attestation",
      proofBody:
        "Elle ne dit pas « cette personne est humaine ». Elle dit ce qui a été observé, sur quelle période, et combien de preuve cela représente. Chaque ligne du dossier reste consultable derrière.",
      proofCard: {
        seal: "Attestation vérifiable",
        name: "Franck Heaven",
        periodLabel: "Période attestée",
        period: "20 au 27 août 2026",
        coverageLabel: "Couverture",
        coverage: "87 % des 6 h 12 déclarées",
        scoreLabel: "Preuve accumulée",
        score: "+41 db",
        verdictLabel: "Verdict",
        verdict: "Vérifié",
        probesLabel: "Contrôles",
        probes: "11 sur 11, dont 3 nocturnes",
        urlLabel: "deciban.org/a/8f3c21",
      },

      phasesTitle: "Et si Prométhée veut s’y associer un jour",
      phases: [
        {
          tag: "Aujourd’hui",
          title: "Rien à demander",
          body: "Tu déclares ta fenêtre, tu obtiens ton attestation, tu partages le lien. Aucune dépendance à qui que ce soit.",
        },
        {
          tag: "Étape 2",
          title: "Un simple champ de profil",
          body: "S’ils le veulent, ils ajoutent un champ « lien Deciban » sur les profils. Une ligne de code chez eux, aucune logique métier, aucun risque. On ne le demandera qu’avec des utilisateurs en main.",
        },
        {
          tag: "Étape 3",
          title: "Une vraie intégration",
          body: "Les sessions exposées par OAuth, et Deciban compare directement sa couverture aux heures enregistrées. Mieux, mais ça ne se négocie qu’avec des chiffres d’usage.",
        },
      ],

      limitLabel: "La limite, dite ici plutôt qu’ailleurs",
      limitTitle: "Ce que l’attestation ne couvre pas",
      limitBody: [
        "Aujourd’hui, Deciban atteste les heures que tu déclares dans Deciban, pas celles enregistrées ailleurs. Quelqu’un pourrait donc déclarer une fenêtre ici et une autre là-bas.",
        "Ça ne casse rien, pour une raison simple : la triche qu’on vise, c’est accumuler des heures en dormant. Si la fenêtre déclarée à Deciban est plus courte, l’attestation couvre moins d’heures et vaut moins. Si elle est identique, il faut être là. Il n’existe aucun moyen de gagner en mentant sur la fenêtre, au mieux on obtient une attestation plus faible.",
      ],

      statusEyebrow: "L’état du chantier",
      statusTitle: "Où on en est vraiment",
      statusLede:
        "L’outil se construit en ce moment, ouvertement. Plutôt qu’un vague « en travaux », voici exactement ce qui tient debout et ce qui ne tient pas encore.",
      statusCols: [
        {
          title: "Ça marche aujourd’hui",
          items: [
            "Le capteur de geste dans le navigateur, démontré sur la page d’accueil",
            "La spécification complète du moteur, 30 signaux en 8 familles",
            "L’API et le formulaire d’inscription",
            "La simulation détaillée sur cinq profils",
          ],
        },
        {
          title: "Spécifié, pas encore construit",
          items: [
            "Les contrôles tirés au hasard dans la fenêtre déclarée",
            "Les notifications poussées et le tirage des contrôles",
            "L’attestation publique et son lien vérifiable",
            "La calibration des poids sur données réelles",
            "Une version utilisable sur téléphone",
          ],
        },
        {
          title: "Encore ouvert au débat",
          items: [
            "Le poids exact de chaque signal",
            "Ce qui doit compter comme « être présent »",
            "La durée de conservation des mesures",
            "La forme que prend le recours humain",
          ],
        },
      ],

      inviteLabel: "Le chantier est ouvert",
      inviteTitle: "Les colonnes deux et trois t’attendent",
      inviteBody:
        "Rien de tout cela n’est verrouillé, et les décisions ne sont pas prises. Si tu penses qu’un signal est mal pesé, qu’une règle est injuste, ou que tu as une meilleure idée pour un morceau entier, c’est exactement le moment de le dire. Les objections d’aujourd’hui coûtent une conversation, celles d’après la version 1 coûtent une réécriture.",
      inviteCta: "Rejoindre l’équipe",
    },

    hero: {
      badge: "Projet communautaire ouvert",
      command: "deciban --init",
      boot: [
        { tag: "ok", label: "capteur moteur", value: "chargé", tone: "--pos" },
        { tag: "ok", label: "moteur de preuve", value: "30 signaux, 8 familles", tone: "--pos" },
        { tag: "ok", label: "code source", value: "ouvert", tone: "--pos" },
        { tag: "..", label: "calibration", value: "en attente de données réelles", tone: "--accent" },
        { tag: "??", label: "équipe", value: "il manque des gens", tone: "--seal" },
      ],
      lede: "Un outil libre qui donne aux vrais travailleurs un moyen de prouver qu’ils sont humains. Il ne dénonce personne. Il accumule des preuves, les pèse, et annonce combien il en a.",
      ctaJoin: "Rejoindre l’équipe",
      ctaTry: "Tester l’outil maintenant",
      ctaSpec: "Comment ça marche",
      meta: ["30 signaux, 8 familles", "Code ouvert", "Aucune installation"],
    },

    sensor: {
      live: "mesure en cours",
      head: "Capteur en direct",
      hint: "bouge ta souris ici",
      sinuosity: "sinuosité",
      corrections: "corrections",
      tremor: "tremblement",
      samples: "échantillons",
      waiting: "en attente de mouvement",
      human: "tu es probablement humain",
      poor: "signal encore trop pauvre",
    },

    problem: {
      eyebrow: "Le problème",
      title: "Deux personnes se ressemblent à l’écran",
      cards: [
        {
          tag: "Accusée à tort",
          title: "Celle qui travaille énormément",
          body: "Ses chiffres sortent de la moyenne, alors on la soupçonne. Elle n’a aucun moyen de se défendre, parce qu’aucun outil ne sait faire la différence.",
        },
        {
          tag: "Jamais inquiétée",
          title: "Celle qui laisse un programme travailler",
          body: "Elle dort pendant que son compte accumule des heures. Rien ne la distingue de la première, et c’est exactement ce trou que ce projet vient combler.",
        },
      ],
    },

    principle: {
      eyebrow: "Le principe",
      title: "Le contrôleur passe quand il veut",
      lede: "On ne surveille personne en continu. On frappe à la porte à des moments imprévisibles.",
      metaphorLabel: "L’idée en une image",
      metaphor:
        "Le contrôleur dans le train ne vérifie pas tous les voyageurs en permanence. Il passe à des moments qu’on ne peut pas prévoir. Si tu n’es jamais là quand il passe, ce n’est pas ton billet, le problème.",
      stepLabel: "ÉTAPE",
      steps: [
        {
          title: "Un contrôle de 90 secondes",
          body: "Une page web, aucune installation. Tu réponds, tu bouges la souris, tu tapes quelques mots. Le système mesure tout au passage.",
        },
        {
          title: "Tiré au hasard dans tes heures",
          body: "Six à dix fois, à des instants que personne ne peut anticiper, à l’intérieur des heures que tu déclares avoir travaillées.",
        },
        {
          title: "Un score que tu portes",
          body: "Positif, les indices penchent vers un humain. Négatif, vers une machine. Chaque point est justifié par une observation citable.",
        },
      ],
      calloutLabel: "La propriété qui rend la triche perdante",
      calloutTitle:
        "Plus tu réclames d’heures, plus tu dois être présent pour les couvrir.",
      calloutBody:
        "Quelqu’un qui déclare vingt heures par jour s’expose forcément à des contrôles à trois heures du matin. S’il y était vraiment, il répond, et il y gagne. S’il dormait pendant que son programme tournait, il ne répond pas. Le système ne demande jamais de dormir, il demande d’être là.",
    },

    needs: {
      eyebrow: "Ce que je cherche",
      title: "Des gens pour construire ça ensemble",
      lede: "Le moteur est spécifié, l’API tourne, la page existe. Tout le reste est à faire, et rien n’est verrouillé.",
      items: [
        {
          title: "Designers",
          body: "Je ne suis pas designer. Cette page est ce que j’ai réussi à faire tout seul. Si tu sais rendre une interface claire et belle, tu as un terrain vierge.",
        },
        {
          title: "Frontend",
          body: "Le capteur tourne dans le navigateur : mesure du geste, de la frappe, du rythme. Beaucoup de travail fin sur les événements et le canvas.",
        },
        {
          title: "Backend et data",
          body: "Laravel pour l’API, et surtout la partie statistique : calibration des poids, estimation de la couverture, courbes de fiabilité.",
        },
        {
          title: "Red team",
          body: "Le rôle le plus utile. Essaie de tromper le système, documente comment tu y arrives, et on corrige. Sans attaquants, aucune défense ne vaut rien.",
        },
      ],
      noteLabel: "Ce que le projet ne sera jamais",
      noteBody:
        "Un outil qui publie le score des autres. Ton score est visible par toi, opposable par toi. C’est un bouclier qu’on porte, pas une arme qu’on prête. Ne rien avoir ne coûte rien : pas de lecteur d’empreinte, pas de webcam, saisie vocale ou clavier adapté, la contribution est nulle, jamais négative. Et travailler bizarrement est humain : nuits blanches et semaines en dents de scie rapportent des points, c’est la régularité mécanique qui est suspecte.",
    },

    join: {
      eyebrow: "Inscription",
      title: "Rejoindre l’équipe",
      lede: "Dis-moi qui tu es et sur quoi tu veux travailler. Je reviens vers toi avec l’accès au dépôt.",
    },

    footer:
      "Deciban est un projet communautaire né dans Prométhée, développé ouvertement. Les poids du moteur sont une calibration initiale plausible, non validée sur données réelles : aucun chiffre de performance n’est revendiqué à ce stade.",

    story: {
      skip: "Passer",
      back: "Retour",
      next: "Suite",
      last: "Rejoindre l’équipe",
      chapters: [
        {
          kicker: "Chapitre 1",
          title: "On m’a traité de bot",
          body: [
            "Mes chiffres sortaient de la moyenne. Pour certains, c’était forcément de la triche.",
            "Je n’avais rien à répondre. Aucun moyen de prouver que derrière le clavier il y avait quelqu’un.",
          ],
          pull: "J’ai juste beaucoup travaillé. Et travailler beaucoup, ça ne se prouve pas.",
        },
        {
          kicker: "Chapitre 2",
          title: "Le vrai problème n’était pas eux",
          body: [
            "J’y ai repensé longtemps, et j’ai fini par comprendre que ceux qui accusaient n’étaient pas le problème.",
            "Le problème, c’est qu’aucun outil au monde ne sait faire la différence entre quelqu’un qui travaille énormément et quelqu’un qui laisse un programme travailler à sa place.",
            "Les deux se ressemblent à l’écran. Alors celui qui bosse se fait soupçonner, et celui qui triche passe tranquille.",
          ],
        },
        {
          kicker: "Chapitre 3",
          title: "Une unité inventée pendant la guerre",
          body: [
            "À Bletchley Park, Alan Turing avait besoin de mesurer la force d’un indice quand aucun indice ne suffit tout seul.",
            "Il a créé une unité pour ça. Il l’a appelée le deciban.",
          ],
          pull: "On va se servir de l’unité de Turing pour répondre à la question de Turing, mais dans l’autre sens.",
        },
        {
          kicker: "Chapitre 4",
          title: "Le contrôleur passe quand il veut",
          body: [
            "Le contrôleur dans le train ne vérifie pas tous les voyageurs en permanence. Il passe à des moments qu’on ne peut pas prévoir.",
            "Tu déclares huit heures de travail ? Le système frappe à ta porte quelques fois, à des instants imprévisibles. 90 secondes à chaque fois.",
            "Rien à installer. Rien qui tourne en fond. On frappe à une porte, on ne pose pas de caméra.",
          ],
          pull: "Si tu n’es jamais là quand il passe, ce n’est pas ton billet le problème.",
        },
        {
          kicker: "Chapitre 5",
          title: "Ce que je ne construirai jamais",
          body: [
            "Ton score t’appartient. Le projet ne publiera jamais celui de quelqu’un d’autre, et ne fera jamais de classement de suspects.",
            "Ne rien avoir ne coûte rien : vieux PC, pas de webcam, saisie vocale, ça compte zéro, jamais négatif.",
            "Travailler bizarrement est humain. Nuits blanches, horaires décalés, semaines en dents de scie : tout ça rapporte des points. C’est la régularité mécanique qui est louche.",
          ],
          pull: "C’est un bouclier qu’on porte, pas une arme qu’on prête.",
        },
        {
          kicker: "Dernier chapitre",
          title: "Je ne peux pas le faire seul",
          body: [
            "Je ne suis pas designer, et ça se voit. Les poids du moteur ne sont pas encore validés, et je le dis avant qu’on me le reproche.",
            "C’est open source, et rien n’est verrouillé. Ce n’est pas mon projet avec des aides, c’est un projet commun.",
            "Il y a de la place pour les designers, le frontend, la statistique, et surtout pour ceux qui voudront essayer de casser le système afin qu’on le renforce.",
          ],
        },
      ],
    },

    form: {
      name: "Nom ou pseudo",
      namePlaceholder: "Franck Heaven",
      email: "Email",
      emailPlaceholder: "toi@exemple.com",
      handle: "Pseudo Prométhée",
      handlePlaceholder: "@toi",
      github: "GitHub",
      githubPlaceholder: "ton-identifiant",
      optional: "(optionnel)",
      rolesLegend: "Sur quoi tu veux travailler",
      availabilityLegend: "Temps par semaine",
      motivation: "Un mot",
      motivationPlaceholder:
        "Ce qui t’intéresse là-dedans, ce que tu sais faire, ce que tu veux apprendre.",
      submit: "Rejoindre l’équipe",
      submitting: "Envoi en cours",
      privacy: "Aucune donnée revendue. Ton email sert à te répondre, rien d’autre.",
      networkError: "Impossible de joindre le serveur. Réessaie.",
      successLabel: "Candidature enregistrée",
      successTitle: "Tu es dans l’équipe.",
      successBodyA: "Tu es la",
      successBodyB:
        "personne inscrite. Je reviens vers toi par mail avec l’accès au dépôt et le point de départ sur lequel tu peux commencer.",
      successNote: "En attendant, le code est déjà lisible publiquement.",
      roles: [
        ["design", "Design d’interface"],
        ["frontend", "Frontend"],
        ["backend", "Backend / API"],
        ["data", "Statistiques / data"],
        ["securite", "Sécurité"],
        ["test", "Tests / red team"],
        ["redaction", "Rédaction / doc"],
        ["autre", "Autre chose"],
      ] as [string, string][],
      availability: [
        ["moins-2h", "moins de 2 h"],
        ["2-5h", "2 à 5 h"],
        ["5-10h", "5 à 10 h"],
        ["plus-10h", "plus de 10 h"],
      ] as [string, string][],
    },
  },

  en: {
    nav: {
      why: "Why this project",
      langLabel: "Français",
      langShort: "FR",
      how: "How it works",
      home: "Home",
      algo: "The algorithm",
      session: "Try the tool",
    },

    how: {
      tldrLabel: "In one sentence",
      tldr: "You declare the hours you are working. During those hours the tool interrupts you a few times at random, ninety seconds each time. At the end you have shareable proof that you were actually there.",
      dayTitle: "One day, as the tool sees it",
      dayLede: "Here is the whole mechanism in one picture. The rest of this page only fills in the detail.",
      dayWindow: "declared window",
      dayLegendOk: "check answered",
      dayLegendKo: "check missed",
      dayRead: "Eight checks landing at unpredictable moments. Seven answered, one missed around 7 pm. Estimated coverage: 87 %.",
      eyebrow: "User guide",
      title: "How it works",
      lede: "What the tool does, how you use it, and where the build actually stands today.",

      linkTitle: "The link with Prométhée",
      linkPunch:
        "There isn’t one. Deciban does not need Prométhée to work, and that is precisely why it can exist.",
      linkBody: [
        "Deciban reads nothing from Prométhée, plugs into nothing, asks permission from nobody. It does not measure what you do inside any given app: it measures a stretch of time, and answers one question. Was a human present during those hours?",
        "The two tools never talk to each other. They talk about the same period. The link between them is you.",
        "A real technical integration would need their agreement, engineering time on their side, and their willingness to be associated with a tool that audits their leaderboard. The project would die before it existed, blocked by people with no reason to hurry. With no integration, we ship tomorrow.",
      ],

      stepsTitle: "Using it, concretely",
      stepsLede:
        "Five steps. Nothing to install, nothing running in the background on your machine.",
      steps: [
        {
          title: "You work as usual",
          body: "You start your session the way you always do, in whatever tool you already use. Deciban changes nothing about how you work.",
        },
        {
          title: "You declare your window",
          body: "You open Deciban in a tab and state the period you want attested. Today, for instance, from 2 pm to 10 pm.",
        },
        {
          title: "The check knocks on your door",
          body: "Six to ten times during that window, at moments nobody can predict, the tab calls you. You have 90 seconds to answer. You move the mouse, type a few words, and it is done.",
        },
        {
          title: "The score builds up",
          body: "Every check you answer adds evidence. Every check you miss removes some. The other signals, your rhythm, your typing, your sleep debt, accumulate alongside.",
        },
        {
          title: "You get an attestation",
          body: "A public page at a URL you control. When someone accuses you, you post the link. Anyone can verify it without having to take your word for it.",
        },
      ],

      callLabel: "The mechanism",
      callTitle: "How it calls you",
      callLede:
        "This is the most concrete question, and it deserves a precise answer. The tab does not watch you work: a web page sees nothing that happens outside itself, which is a browser limitation rather than a choice. It interrupts you.",
      callSeq: [
        {
          tag: "Once",
          title: "You allow notifications",
          body: "When you start your first session, the browser asks for permission. One click, one time. Your browser then subscribes to the push service, exactly the way Slack or a mail client does.",
        },
        {
          tag: "At the start",
          title: "The server draws the moments in secret",
          body: "You declare your window, say 2 pm to 10 pm. The server draws eight random moments inside it, stores them, and never sends them. Not to you, not to your browser.",
        },
        {
          tag: "When it fires",
          title: "The server pushes, your screen lights up",
          body: "A native notification appears, even if you are in your editor full screen on another desktop. A short sound, and the tab title starts blinking. One click brings you back to the page.",
        },
        {
          tag: "90 seconds",
          title: "You answer, it measures",
          body: "You move the mouse, you type a few words. During those ninety seconds the system measures everything it can: your gesture, your typing rhythm, your reaction time. Then it hands control back to you.",
        },
        {
          tag: "Afterwards",
          title: "The score updates",
          body: "A check you answer adds evidence, a check you miss removes some. You immediately see your score move, alongside the exact line that moved it.",
        },
      ],
      callSecLabel: "The point everything else rests on",
      callSecTitle: "Your browser never knows the schedule",
      callSecBody:
        "If the client knew when the next check was due, opening the console would be enough to read it and schedule your presence around it. The system would be worthless. So the schedule lives on the server alone and is never transmitted. The server pushes; your browser asks for nothing. It cannot learn the future because it never poses the question.",
      callStatusLabel: "During your session",
      callStatus: [
        { k: "Declared window", v: "14:00 → 22:00" },
        { k: "Elapsed", v: "03:41:12" },
        { k: "Checks", v: "4 answered / 4", tone: "--pos" },
        { k: "Next check", v: "unknown, by design", tone: "--accent" },
        { k: "Connection", v: "subscribed · push active", tone: "--pos" },
      ],
      callStatusNote:
        "This strip stays visible for the whole session. “Next check: unknown” is not missing information, it is the guarantee shown as such. And the connection state proves continuously that the mechanism is alive.",

      proofLabel: "The output",
      proofTitle: "What an attestation looks like",
      proofBody:
        "It does not say “this person is human”. It states what was observed, over which period, and how much evidence that adds up to. Every line of the underlying file stays open to inspection.",
      proofCard: {
        seal: "Verifiable attestation",
        name: "Franck Heaven",
        periodLabel: "Period attested",
        period: "20 to 27 August 2026",
        coverageLabel: "Coverage",
        coverage: "87 % of the 6 h 12 declared",
        scoreLabel: "Evidence gathered",
        score: "+41 db",
        verdictLabel: "Verdict",
        verdict: "Verified",
        probesLabel: "Checks",
        probes: "11 of 11, 3 of them overnight",
        urlLabel: "deciban.org/a/8f3c21",
      },

      phasesTitle: "And if Prométhée ever wants in",
      phases: [
        {
          tag: "Today",
          title: "Nothing to ask for",
          body: "You declare your window, you get your attestation, you share the link. No dependency on anyone.",
        },
        {
          tag: "Step 2",
          title: "One profile field",
          body: "If they want to, they add a “Deciban link” field on profiles. One line of code on their side, no business logic, no risk. We only ask once we have users.",
        },
        {
          tag: "Step 3",
          title: "A real integration",
          body: "Sessions exposed over OAuth, with Deciban comparing its coverage directly against recorded hours. Better, but that only gets negotiated with usage figures in hand.",
        },
      ],

      limitLabel: "The limitation, stated here rather than elsewhere",
      limitTitle: "What the attestation does not cover",
      limitBody: [
        "Today, Deciban attests the hours you declare inside Deciban, not the ones recorded anywhere else. So someone could declare one window here and a different one over there.",
        "This breaks nothing, for a simple reason: the cheating we target is piling up hours while asleep. If the window declared to Deciban is shorter, the attestation covers fewer hours and is worth less. If it is identical, you have to be there. There is no way to win by lying about the window, at best you end up with a weaker attestation.",
      ],

      statusEyebrow: "Build status",
      statusTitle: "Where this actually stands",
      statusLede:
        "The tool is being built right now, in the open. Rather than a vague “under construction”, here is exactly what stands up and what does not yet.",
      statusCols: [
        {
          title: "Working today",
          items: [
            "The gesture sensor in the browser, demonstrated on the home page",
            "The full engine specification, 30 signals across 8 families",
            "The API and the sign-up form",
            "The detailed simulation across five profiles",
          ],
        },
        {
          title: "Specified, not yet built",
          items: [
            "Checks drawn at random inside the declared window",
            "Push notifications and the random draw of checks",
            "The public attestation and its verifiable link",
            "Calibrating the weights against real data",
            "A version usable on a phone",
          ],
        },
        {
          title: "Still open for debate",
          items: [
            "The exact weight of each signal",
            "What should count as “being present”",
            "How long measurements are kept",
            "What the human appeal process looks like",
          ],
        },
      ],

      inviteLabel: "The build is open",
      inviteTitle: "Columns two and three are waiting for you",
      inviteBody:
        "None of this is locked down, and the decisions are not made. If you think a signal is weighted wrong, that a rule is unfair, or that you have a better idea for an entire piece of it, now is exactly the moment to say so. Objections raised today cost a conversation. Objections raised after version 1 cost a rewrite.",
      inviteCta: "Join the team",
    },

    hero: {
      badge: "Open community project",
      command: "deciban --init",
      boot: [
        { tag: "ok", label: "motion sensor", value: "loaded", tone: "--pos" },
        { tag: "ok", label: "evidence engine", value: "30 signals, 8 families", tone: "--pos" },
        { tag: "ok", label: "source code", value: "open", tone: "--pos" },
        { tag: "..", label: "calibration", value: "awaiting real data", tone: "--accent" },
        { tag: "??", label: "team", value: "people missing", tone: "--seal" },
      ],
      lede: "A free tool that gives people who really do the work a way to prove they are human. It reports on nobody. It gathers evidence, weighs it, and tells you how much it has.",
      ctaJoin: "Join the team",
      ctaTry: "Try the tool now",
      ctaSpec: "How it works",
      meta: ["30 signals, 8 families", "Open source", "Nothing to install"],
    },

    sensor: {
      live: "measuring",
      head: "Live sensor",
      hint: "move your mouse here",
      sinuosity: "sinuosity",
      corrections: "corrections",
      tremor: "tremor",
      samples: "samples",
      waiting: "waiting for movement",
      human: "you are probably human",
      poor: "signal still too thin",
    },

    problem: {
      eyebrow: "The problem",
      title: "Two people look identical on screen",
      cards: [
        {
          tag: "Wrongly accused",
          title: "The one who works enormous hours",
          body: "Their numbers sit far above average, so people get suspicious. They have no way to defend themselves, because no tool can tell the difference.",
        },
        {
          tag: "Never questioned",
          title: "The one letting a script do the work",
          body: "They sleep while their account piles up hours. Nothing separates them from the first person, and that gap is exactly what this project fills.",
        },
      ],
    },

    principle: {
      eyebrow: "How it works",
      title: "The inspector comes through whenever they like",
      lede: "Nobody is watched continuously. We knock on the door at moments no one can predict.",
      metaphorLabel: "The idea in one image",
      metaphor:
        "A ticket inspector on a train does not check every passenger all the time. They come through at moments you cannot anticipate. If you are never there when they pass, your ticket is not the problem.",
      stepLabel: "STEP",
      steps: [
        {
          title: "A 90 second check",
          body: "A web page, nothing to install. You answer, you move the mouse, you type a few words. The system measures everything as you go.",
        },
        {
          title: "Drawn at random inside your hours",
          body: "Six to ten times, at moments nobody can anticipate, inside the hours you claim to have worked.",
        },
        {
          title: "A score that belongs to you",
          body: "Positive, the evidence leans human. Negative, it leans machine. Every point is backed by an observation you can point to.",
        },
      ],
      calloutLabel: "The property that makes cheating a losing game",
      calloutTitle:
        "The more hours you claim, the more you have to actually be there to cover them.",
      calloutBody:
        "Someone claiming twenty hours a day will inevitably get checks at three in the morning. If they were genuinely there, they answer, and they gain from it. If they were asleep while a script ran, they do not answer. The system never asks you to lose sleep. It asks you to be present.",
    },

    needs: {
      eyebrow: "What I am looking for",
      title: "People to build this together",
      lede: "The engine is specified, the API runs, the page exists. Everything else is open, and nothing is locked down.",
      items: [
        {
          title: "Designers",
          body: "I am not a designer. This page is the best I could manage alone. If you know how to make an interface clear and beautiful, the ground is wide open.",
        },
        {
          title: "Frontend",
          body: "The sensor runs in the browser: gesture, keystroke and rhythm measurement. Plenty of careful work on events and canvas.",
        },
        {
          title: "Backend and data",
          body: "Laravel for the API, and above all the statistics: calibrating the weights, estimating coverage, building reliability curves.",
        },
        {
          title: "Red team",
          body: "The most useful role of all. Try to fool the system, write up how you managed it, and we fix it. Without attackers, no defence is worth anything.",
        },
      ],
      noteLabel: "What this project will never be",
      noteBody:
        "A tool that publishes other people’s scores. Your score is visible to you and yours to invoke. It is a shield you carry, not a weapon you lend. Having nothing costs nothing: no fingerprint reader, no webcam, voice input or an adapted keyboard all contribute zero, never a penalty. And working strange hours is human: all-nighters and jagged weeks earn points. Mechanical regularity is the suspicious thing.",
    },

    join: {
      eyebrow: "Sign up",
      title: "Join the team",
      lede: "Tell me who you are and what you want to work on. I will get back to you with access to the repository.",
    },

    footer:
      "Deciban is a community project born inside Prométhée and built in the open. The engine weights are a plausible initial calibration, not validated against real data: no performance figure is claimed at this stage.",

    story: {
      skip: "Skip",
      back: "Back",
      next: "Next",
      last: "Join the team",
      chapters: [
        {
          kicker: "Chapter 1",
          title: "They called me a bot",
          body: [
            "My numbers sat far above average. For some people that meant I had to be cheating.",
            "I had nothing to answer with. No way to show there was a person behind the keyboard.",
          ],
          pull: "I had simply worked a lot. And working a lot is not something you can prove.",
        },
        {
          kicker: "Chapter 2",
          title: "The real problem was not them",
          body: [
            "I thought about it for a long time, and eventually understood that the people accusing me were not the problem.",
            "The problem is that no tool anywhere can tell the difference between someone who works enormous hours and someone letting a script work for them.",
            "The two look identical on screen. So the person doing the work gets suspected, and the person cheating goes unnoticed.",
          ],
        },
        {
          kicker: "Chapter 3",
          title: "A unit invented during the war",
          body: [
            "At Bletchley Park, Alan Turing needed a way to measure the strength of a clue when no single clue is ever enough on its own.",
            "He created a unit for it. He called it the deciban.",
          ],
          pull: "We are going to use Turing’s unit to answer Turing’s question, only backwards.",
        },
        {
          kicker: "Chapter 4",
          title: "The inspector comes through whenever they like",
          body: [
            "A ticket inspector on a train does not check every passenger all the time. They come through at moments you cannot anticipate.",
            "You claim eight hours of work? The system knocks on your door a few times, at unpredictable moments. Ninety seconds each time.",
            "Nothing to install. Nothing running in the background. We knock on a door, we do not mount a camera.",
          ],
          pull: "If you are never there when they pass, your ticket is not the problem.",
        },
        {
          kicker: "Chapter 5",
          title: "What I will never build",
          body: [
            "Your score belongs to you. This project will never publish anyone else’s, and will never produce a leaderboard of suspects.",
            "Having nothing costs nothing: an old machine, no webcam, voice input, all of it counts zero and never against you.",
            "Working strange hours is human. All-nighters, odd schedules, jagged weeks: all of it earns points. Mechanical regularity is the thing that looks wrong.",
          ],
          pull: "It is a shield you carry, not a weapon you lend.",
        },
        {
          kicker: "Last chapter",
          title: "I cannot do this alone",
          body: [
            "I am not a designer, and it shows. The engine weights are not validated yet, and I would rather say so before anyone throws it at me.",
            "It is open source, and nothing is locked down. This is not my project with helpers, it is a shared one.",
            "There is room for designers, frontend, statistics, and above all for the people who will try to break the system so we can make it stronger.",
          ],
        },
      ],
    },

    form: {
      name: "Name or handle",
      namePlaceholder: "Franck Heaven",
      email: "Email",
      emailPlaceholder: "you@example.com",
      handle: "Prométhée handle",
      handlePlaceholder: "@you",
      github: "GitHub",
      githubPlaceholder: "your-username",
      optional: "(optional)",
      rolesLegend: "What you want to work on",
      availabilityLegend: "Hours per week",
      motivation: "A few words",
      motivationPlaceholder:
        "What draws you to this, what you know how to do, what you want to learn.",
      submit: "Join the team",
      submitting: "Sending",
      privacy: "No data is ever sold. Your email is only used to reply to you.",
      networkError: "Could not reach the server. Please try again.",
      successLabel: "Application received",
      successTitle: "You are on the team.",
      successBodyA: "You are person number",
      successBodyB:
        "to sign up. I will email you with access to the repository and a first place to start.",
      successNote: "In the meantime, the code is already public.",
      roles: [
        ["design", "Interface design"],
        ["frontend", "Frontend"],
        ["backend", "Backend / API"],
        ["data", "Statistics / data"],
        ["securite", "Security"],
        ["test", "Testing / red team"],
        ["redaction", "Writing / docs"],
        ["autre", "Something else"],
      ] as [string, string][],
      availability: [
        ["moins-2h", "under 2 h"],
        ["2-5h", "2 to 5 h"],
        ["5-10h", "5 to 10 h"],
        ["plus-10h", "over 10 h"],
      ] as [string, string][],
    },
  },
};
