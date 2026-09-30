"use server";

import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth";
import { getParametre, setParametre } from "@/lib/repo-parametres";
import { enregistrerFichier, supprimerFichierPublic, TAILLE_MAX_IMAGE, TAILLE_MAX_VIDEO } from "@/lib/uploads";
import type { ActionState } from "./auth";

const CLES_MODIFIABLES = [
  "contact_email",
  "contact_telephone",
  "contact_adresse",
  "accueil_titre",
  "accueil_soustitre",
  "services_a_titre",
  "services_a_texte",
  "services_a_texte_detail",
  "services_b_titre",
  "services_b_texte",
  "services_b_texte_detail",
  "services_c_titre",
  "services_c_texte",
  "services_c_texte_detail",
  "a_propos_texte_1",
  "a_propos_texte_2",
  "a_propos_texte_3",
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
];

/** Les 3 emplacements photo de la page "Notre Vision" — chacun un fichier téléversé, indépendant des autres. */
const CLES_PHOTOS_VISION = ["vision_photo_1_url", "vision_photo_2_url", "vision_photo_3_url"];

export async function modifierParametresAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await getCurrentAdmin();
  if (!admin) return { error: "Session expirée — reconnectez-vous." };

  try {
    for (const cle of CLES_MODIFIABLES) {
      const valeur = formData.get(cle);
      if (typeof valeur === "string") setParametre(cle, valeur.trim());
    }

    for (const cle of CLES_PHOTOS_VISION) {
      const ancienneUrl = getParametre(cle);
      const fichier = formData.get(cle) as File | null;
      if (fichier && fichier.size > 0) {
        if (!fichier.type.startsWith("image/")) throw new Error("Les photos de la page Vision doivent être des images.");
        if (fichier.size > TAILLE_MAX_IMAGE) throw new Error("Photo trop volumineuse (8 Mo maximum).");
        await supprimerFichierPublic(ancienneUrl);
        setParametre(cle, await enregistrerFichier(fichier, "images"));
      } else if (formData.get(`${cle}_supprimer`) === "1") {
        await supprimerFichierPublic(ancienneUrl);
        setParametre(cle, "");
      }
    }

    const ancienneVideoUrl = getParametre("vision_video_url");
    const videoUrlSaisie = String(formData.get("vision_video_url_externe") ?? "").trim();
    const fichierVideo = formData.get("vision_video_url") as File | null;
    if (fichierVideo && fichierVideo.size > 0) {
      if (!fichierVideo.type.startsWith("video/")) throw new Error("Le fichier vidéo de la page Vision n'est pas une vidéo.");
      if (fichierVideo.size > TAILLE_MAX_VIDEO) throw new Error("Vidéo trop volumineuse (80 Mo maximum).");
      await supprimerFichierPublic(ancienneVideoUrl);
      setParametre("vision_video_url", await enregistrerFichier(fichierVideo, "videos"));
    } else if (videoUrlSaisie) {
      await supprimerFichierPublic(ancienneVideoUrl);
      setParametre("vision_video_url", videoUrlSaisie);
    } else if (formData.get("vision_video_url_supprimer") === "1") {
      await supprimerFichierPublic(ancienneVideoUrl);
      setParametre("vision_video_url", "");
    }

    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath("/a-propos");
    revalidatePath("/contact");
    revalidatePath("/notre-vision");
    return { success: "Modifications enregistrées." };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erreur lors de l'enregistrement." };
  }
}
