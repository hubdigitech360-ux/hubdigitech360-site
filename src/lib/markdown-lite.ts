/**
 * Rendu "markdown-lite" volontairement restreint pour le contenu des
 * publications : le texte est TOUJOURS échappé en premier (aucun HTML brut
 * saisi par l'admin n'est jamais interprété), puis seules ces syntaxes
 * précises sont reconnues — pas de risque d'injection HTML/script, même si
 * le compte admin était un jour compromis.
 *
 * Supporté : **gras**, *italique*, [texte](url), ![alt](url), paragraphes
 * (ligne vide), retours à la ligne simples. Les émojis sont du texte Unicode
 * normal, aucun traitement n'est nécessaire.
 */

function echapperHtml(texte: string): string {
  return texte
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** N'autorise que des URLs http(s) ou des chemins relatifs commençant par "/" — jamais javascript:, data:, etc. */
function urlSure(url: string): string {
  if (/^(https?:\/\/|\/)/i.test(url)) return url;
  return "#";
}

export function rendreMarkdownLite(source: string): string {
  const paragraphes = source.trim().split(/\n\s*\n/);

  return paragraphes
    .map((paragraphe) => {
      let html = echapperHtml(paragraphe);

      // Images ![alt](url) — avant les liens pour éviter la confusion avec ![...]
      html = html.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_m, alt: string, url: string) => {
        return `<img src="${urlSure(url)}" alt="${alt}" class="my-4 w-full rounded" />`;
      });

      // Liens [texte](url)
      html = html.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, texte: string, url: string) => {
        return `<a href="${urlSure(url)}" target="_blank" rel="noopener noreferrer" style="color: var(--blue)">${texte}</a>`;
      });

      // Gras puis italique
      html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
      html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");

      // Retours à la ligne simples à l'intérieur d'un paragraphe
      html = html.replace(/\n/g, "<br />");

      return `<p>${html}</p>`;
    })
    .join("\n");
}
