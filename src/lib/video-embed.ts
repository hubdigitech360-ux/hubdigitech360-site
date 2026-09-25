/** Convertit un lien YouTube/Vimeo classique en URL "embed" pour un <iframe> — ou null si le format n'est pas reconnu (fichier téléversé, servi directement en <video>). */
export function urlEmbedYoutubeOuVimeo(url: string): string | null {
  const youtube = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/);
  if (youtube) return `https://www.youtube.com/embed/${youtube[1]}`;

  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  return null;
}
