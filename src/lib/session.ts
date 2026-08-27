import type { Lang } from "@/lib/content";

export type SessionDict = {
  nav: string;
  eyebrow: string;
  title: string;
  lede: string;

  startTitle: string;
  startLede: string;
  handle: string;
  handlePh: string;
  minutes: string;
  probes: string;
  probesHint: string;
  start: string;
  starting: string;
  notifWarn: string;

  liveTitle: string;
  window: string;
  elapsed: string;
  checks: string;
  next: string;
  nextValue: string;
  link: string;
  evidence: string;
  verdict: string;
  linkState: string;
  linkOk: string;
  linkOff: string;
  stop: string;
  copy: string;
  copied: string;

  alertTitle: string;
  alertBody: string;
  probeTitle: string;
  probeLede: string;
  probeType: string;
  probePhrase: string;
  probeSend: string;
  probeLeft: string;
  probeDone: string;
  probeExpired: string;
  probeExpiredBody: string;
  probeClose: string;
  probeMatch: string;
  probeNoMatch: string;
  notifBlockedTitle: string;
  notifBlockedBody: string;

  keyLabel: string;
  keyTitle: string;
  keyBody: string;
  pushTitle: string;
  pushOn: string;
  pushOff: string;
  pushAsk: string;
  pushDenied: string;
  pushWarnTab: string;
  sysTitle: string;
  sysDispatcherOn: string;
  sysDispatcherOff: string;
  sysHint: string;
  resume: string;
  emptyTitle: string;
  emptyBody: string;

  attTitle: string;
  attFor: string;
  attWindow: string;
  attCoverage: string;
  attChecks: string;
  attEvidence: string;
  attVerdict: string;
  attNote: string;
  attMissing: string;
};

export const sessionCopy: Record<Lang, SessionDict> = {
  fr: {
    nav: "Tester l’outil",
    eyebrow: "Version 1 · testable",
    title: "Déclare une session",
    lede: "Tu indiques les heures que tu vas travailler. Pendant cette fenêtre, l’outil t’interrompt quelques fois à des instants que personne ne peut prévoir. À la fin, tu obtiens un lien d’attestation partageable.",

    startTitle: "Ouvrir une fenêtre",
    startLede: "Laisse cet onglet ouvert pendant toute la durée. C’est lui qui te préviendra.",
    handle: "Ton nom ou pseudo",
    handlePh: "Franck Heaven",
    minutes: "Durée de la fenêtre",
    probes: "Nombre de contrôles",
    probesHint: "Tirés au hasard dans la fenêtre. Tu ne sauras jamais quand.",
    start: "Démarrer la session",
    starting: "Ouverture",
    notifWarn: "Autorise les notifications quand le navigateur le demande, sinon tu risques de rater les contrôles.",

    liveTitle: "Session active",
    window: "Fenêtre déclarée",
    elapsed: "Écoulé",
    checks: "Contrôles",
    next: "Prochain contrôle",
    nextValue: "inconnu, par conception",
    link: "Lien d’attestation",
    evidence: "Preuve accumulée",
    verdict: "Verdict",
    linkState: "Liaison",
    linkOk: "connectée",
    linkOff: "interrompue",
    stop: "Terminer la session",
    copy: "Copier le lien",
    copied: "Copié",

    alertTitle: "Deciban · contrôle en cours",
    alertBody: "{s} secondes pour répondre",
    probeTitle: "Contrôle en cours",
    probeLede: "Bouge la souris dans le cadre, puis recopie la phrase. Le système mesure ton geste et ton rythme de frappe.",
    probeType: "Recopie cette phrase",
    probePhrase: "je suis bien la",
    probeSend: "Envoyer",
    probeLeft: "secondes restantes",
    probeDone: "Contrôle validé",
    probeExpired: "Fenêtre expirée",
    probeExpiredBody: "Ce contrôle est compté comme manqué. Ta couverture baisse, mais les suivants restent à jouer.",
    probeClose: "Fermer",
    probeMatch: "phrase correcte",
    probeNoMatch: "recopie la phrase exactement, les accents et la casse sont ignorés",
    notifBlockedTitle: "Tu entends le son mais tu ne vois rien ?",
    notifBlockedBody: "Le son est joué par la page, la bulle vient du système. Si tu n’as que le son, c’est que les notifications sont bloquées : soit dans le navigateur pour ce site, soit dans les réglages de ton ordinateur (mode Concentration ou Ne pas déranger sur macOS).",

    keyLabel: "Garde ce lien",
    keyTitle: "C’est ta seule clé",
    keyBody: "Mets cette adresse en favori ou envoie-la-toi. Si tu la perds, la session continue côté serveur mais tu ne pourras plus y répondre.",
    pushTitle: "Notifications",
    pushOn: "actives · tu peux fermer l’onglet",
    pushOff: "inactives · garde cet onglet ouvert",
    pushAsk: "Activer les notifications",
    pushDenied: "Refusées dans les réglages du navigateur. Autorise-les pour ce site, puis recharge la page.",
    pushWarnTab: "Sans notifications, tu ne seras prévenu que si cet onglet reste ouvert, même en arrière-plan.",
    sysTitle: "État du système",
    sysDispatcherOn: "répartiteur actif",
    sysDispatcherOff: "répartiteur arrêté · aucun contrôle ne se déclenchera",
    sysHint: "php artisan deciban:dispatch --watch",
    resume: "Reprendre ma session",
    emptyTitle: "Aucune session en cours",
    emptyBody: "Ouvre une fenêtre pour commencer à accumuler de la preuve.",

    attTitle: "Attestation",
    attFor: "Délivrée à",
    attWindow: "Période attestée",
    attCoverage: "Couverture",
    attChecks: "Contrôles",
    attEvidence: "Preuve accumulée",
    attVerdict: "Verdict",
    attNote: "Cette attestation porte sur une fenêtre déclarée par la personne elle-même. Elle atteste une présence humaine mesurée, pas la nature du travail accompli. Les poids du moteur sont une calibration initiale non validée.",
    attMissing: "Cette attestation n’existe pas.",
  },

  en: {
    nav: "Try the tool",
    eyebrow: "Version 1 · testable",
    title: "Declare a session",
    lede: "You state the hours you are about to work. During that window the tool interrupts you a few times, at moments nobody can predict. At the end you get a shareable attestation link.",

    startTitle: "Open a window",
    startLede: "Leave this tab open for the whole duration. It is what will alert you.",
    handle: "Your name or handle",
    handlePh: "Franck Heaven",
    minutes: "Window length",
    probes: "Number of checks",
    probesHint: "Drawn at random inside the window. You will never know when.",
    start: "Start the session",
    starting: "Opening",
    notifWarn: "Allow notifications when the browser asks, otherwise you risk missing the checks.",

    liveTitle: "Session active",
    window: "Declared window",
    elapsed: "Elapsed",
    checks: "Checks",
    next: "Next check",
    nextValue: "unknown, by design",
    link: "Attestation link",
    evidence: "Evidence gathered",
    verdict: "Verdict",
    linkState: "Connection",
    linkOk: "connected",
    linkOff: "interrupted",
    stop: "End the session",
    copy: "Copy link",
    copied: "Copied",

    alertTitle: "Deciban · check in progress",
    alertBody: "{s} seconds to answer",
    probeTitle: "Check in progress",
    probeLede: "Move the mouse inside the frame, then retype the sentence. The system measures your gesture and your typing rhythm.",
    probeType: "Retype this sentence",
    probePhrase: "i am really here",
    probeSend: "Send",
    probeLeft: "seconds left",
    probeDone: "Check accepted",
    probeExpired: "Window expired",
    probeExpiredBody: "This check counts as missed. Your coverage drops, but the remaining checks are still to play.",
    probeClose: "Close",
    probeMatch: "sentence matches",
    probeNoMatch: "retype the sentence exactly; accents and case are ignored",
    notifBlockedTitle: "Hearing the sound but seeing nothing?",
    notifBlockedBody: "The sound comes from the page, the banner comes from your system. If you only get the sound, notifications are blocked: either in the browser for this site, or in your computer settings (Focus or Do Not Disturb on macOS).",

    keyLabel: "Keep this link",
    keyTitle: "It is your only key",
    keyBody: "Bookmark this address or send it to yourself. If you lose it the session keeps running on the server, but you will no longer be able to answer.",
    pushTitle: "Notifications",
    pushOn: "active · you can close the tab",
    pushOff: "inactive · keep this tab open",
    pushAsk: "Enable notifications",
    pushDenied: "Blocked in your browser settings. Allow them for this site, then reload the page.",
    pushWarnTab: "Without notifications you will only be alerted while this tab stays open, even in the background.",
    sysTitle: "System status",
    sysDispatcherOn: "dispatcher running",
    sysDispatcherOff: "dispatcher stopped · no check will fire",
    sysHint: "php artisan deciban:dispatch --watch",
    resume: "Resume my session",
    emptyTitle: "No session running",
    emptyBody: "Open a window to start gathering evidence.",

    attTitle: "Attestation",
    attFor: "Issued to",
    attWindow: "Period attested",
    attCoverage: "Coverage",
    attChecks: "Checks",
    attEvidence: "Evidence gathered",
    attVerdict: "Verdict",
    attNote: "This attestation covers a window declared by the person themselves. It attests measured human presence, not the nature of the work done. The engine weights are an unvalidated initial calibration.",
    attMissing: "This attestation does not exist.",
  },
};
