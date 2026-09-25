import { notFound } from "next/navigation";
import Link from "next/link";
import { findPublicationBySlug } from "@/lib/repo-publications";
import { rendreMarkdownLite } from "@/lib/markdown-lite";
import { urlEmbedYoutubeOuVimeo } from "@/lib/video-embed";

export default async function PublicationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const publication = findPublicationBySlug(slug);
  if (!publication) notFound();

  const embed = publication.videoUrl ? urlEmbedYoutubeOuVimeo(publication.videoUrl) : null;

  return (
    <article className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
      <Link href="/actualites" className="mono text-xs uppercase tracking-wider" style={{ color: "var(--blue)" }}>
        ← Actualités
      </Link>
      <div className="mono mt-4 text-xs text-slate-400">
        {publication.publieLe &&
          new Date(publication.publieLe).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
      </div>
      <h1 className="mt-1 text-3xl text-slate-900">{publication.titre}</h1>

      {publication.imageUrl && <img src={publication.imageUrl} alt={publication.titre} className="mt-8 w-full object-cover" />}

      {publication.videoUrl &&
        (embed ? (
          <div className="mt-8 aspect-video w-full">
            <iframe src={embed} className="h-full w-full" allowFullScreen title={publication.titre} />
          </div>
        ) : (
          <video controls className="mt-8 w-full" src={publication.videoUrl} />
        ))}

      {/* Rendu markdown-lite : le contenu est échappé puis transformé de façon contrôlée (voir markdown-lite.ts) — pas de HTML brut interprété. */}
      <div
        className="prose mt-8 text-sm leading-relaxed text-slate-600"
        dangerouslySetInnerHTML={{ __html: rendreMarkdownLite(publication.contenu) }}
      />
    </article>
  );
}
