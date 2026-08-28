/**
 * Adresse de l'API.
 *
 * `||` et non `??` : une variable definie mais VIDE doit retomber sur la
 * valeur par defaut. Avec `??`, une chaine vide passe au travers, la
 * constante vaut "" et chaque appel part en relatif vers le front, qui
 * repond 404. Pour une adresse, vide est aussi invalide qu'absent.
 */
export const API =
  process.env.NEXT_PUBLIC_API_URL || "https://deciban.motherlode.studio/api";
