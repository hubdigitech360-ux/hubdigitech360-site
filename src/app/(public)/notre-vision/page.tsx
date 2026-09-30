import Link from "next/link";
import { getParametres } from "@/lib/repo-parametres";
import { listMembresEquipe } from "@/lib/repo-equipe";
import { urlEmbedYoutubeOuVimeo } from "@/lib/video-embed";

/**
 * Page "Notre Vision" (demande explicite, 2026-09-30) — seule page du site
 * en bleu clair plutôt qu'en bleu marine, avec un titrage biseauté
 * (`.titre-biseaute`, voir globals.css). Textes/médias entièrement pilotés
 * par `parametres_site` (admin/contenu), équipe par `membres_equipe`
 * (admin/equipe) — même architecture éditoriale que le reste du site.
 */
export default async function NotreVisionPage() {
  const p = getParametres([
    "vision_titre",
    "vision_intro",
    "vision_mission",
    "vision_stat_1",
    "vision_stat_2",
    "vision_diff_1_titre",
    "vision_diff_1_texte",
    "vision_diff_2_titre",
    "vision_diff_2_texte",
    "vision_diff_3_titre",
    "vision_diff_3_texte",
    "vision_horizon",
    "vision_photo_1_url",
    "vision_photo_2_url",
    "vision_photo_3_url",
    "vision_video_url",
  ]);

  const differenciateurs = [
    { numero: "01", titre: p.vision_diff_1_titre, texte: p.vision_diff_1_texte },
    { numero: "02", titre: p.vision_diff_2_titre, texte: p.vision_diff_2_texte },
    { numero: "03", titre: p.vision_diff_3_titre, texte: p.vision_diff_3_texte },
  ];
  const photos = [p.vision_photo_1_url, p.vision_photo_2_url, p.vision_photo_3_url].filter(Boolean);
  const embed = p.vision_video_url ? urlEmbedYoutubeOuVimeo(p.vision_video_url) : null;
  const equipe = listMembresEquipe();

  return (
    <div style={{ background: "linear-gradient(180deg, #ffffff 0%, var(--blue-soft) 100%)" }}>
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <p className="mono text-xs uppercase tracking-wider" style={{ color: "var(--blue)" }}>
          Notre Vision
        </p>
        <h1 className="titre-biseaute mt-2 text-3xl leading-tight sm:text-4xl">{p.vision_titre}</h1>

        <div className="mt-8 flex flex-col gap-5 text-sm leading-relaxed text-slate-600">
          <p>{p.vision_intro}</p>
          <p className="font-medium text-slate-800">{p.vision_mission}</p>
        </div>

        {/* Photos — jusqu'à 3, chacune facultative (admin/contenu). */}
        {photos.length > 0 && (
          <div className={`mt-10 grid gap-3 ${photos.length === 1 ? "grid-cols-1" : photos.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
            {photos.map((url, i) => (
              <img key={i} src={url} alt="" className="h-48 w-full rounded-2xl object-cover shadow-sm sm:h-56" />
            ))}
          </div>
        )}

        {/* Vidéo — lien YouTube/Vimeo intégré, ou fichier téléversé. */}
        {p.vision_video_url &&
          (embed ? (
            <div className="mt-8 aspect-video w-full overflow-hidden rounded-2xl shadow-sm">
              <iframe src={embed} className="h-full w-full" allowFullScreen title="Notre Vision" />
            </div>
          ) : (
            <video controls className="mt-8 w-full rounded-2xl shadow-sm" src={p.vision_video_url} />
          ))}

        <p className="mono mt-16 text-xs uppercase tracking-wider" style={{ color: "var(--blue)" }}>
          Le marché, en chiffres
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[p.vision_stat_1, p.vision_stat_2].map((stat, i) => (
            <div key={i} className="rounded-2xl p-6 shadow-sm" style={{ background: "var(--blue-soft)" }}>
              <p className="text-sm leading-relaxed text-slate-700">{stat}</p>
            </div>
          ))}
        </div>

        <p className="mono mt-16 text-xs uppercase tracking-wider" style={{ color: "var(--blue)" }}>
          Ce qui nous différencie
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {differenciateurs.map((d) => (
            <div
              key={d.numero}
              className="rounded-2xl border p-6 transition duration-200 hover:-translate-y-1 hover:shadow-xl"
              style={{ borderColor: "var(--blue-soft)", background: "#ffffff" }}
            >
              <span className="mono text-sm" style={{ color: "var(--blue)" }}>{d.numero}</span>
              <h2 className="titre-biseaute mt-2 text-lg">{d.titre}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">{d.texte}</p>
            </div>
          ))}
        </div>

        {/* Équipe — présentation de l'équipe Hub Digitech360 (admin/equipe). */}
        <p className="mono mt-16 text-xs uppercase tracking-wider" style={{ color: "var(--blue)" }}>
          Notre équipe
        </p>
        {equipe.length > 0 ? (
          <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-3">
            {equipe.map((m) => (
              <div key={m.id} className="flex flex-col items-center text-center">
                {m.photoUrl ? (
                  <img src={m.photoUrl} alt={m.nom} className="h-24 w-24 rounded-full object-cover shadow-sm" />
                ) : (
                  <div
                    className="flex h-24 w-24 items-center justify-center rounded-full text-lg font-semibold text-white"
                    style={{ background: "var(--blue)" }}
                  >
                    {m.nom.charAt(0)}
                  </div>
                )}
                <p className="mt-3 text-sm font-semibold text-slate-900">{m.nom}</p>
                <p className="mono text-xs text-slate-500">{m.poste}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-400">Présentation de l&apos;équipe à venir.</p>
        )}

        <div
          className="mt-16 rounded-2xl p-8 text-center"
          style={{ background: "linear-gradient(135deg, var(--blue-soft) 0%, #ffffff 100%)" }}
        >
          <p className="titre-biseaute text-xl">{p.vision_horizon}</p>
          <Link href="/contact" className="btn-primary mt-6 inline-block px-5 py-2.5 text-sm">
            Parlons de votre PME
          </Link>
        </div>
      </div>
    </div>
  );
}
