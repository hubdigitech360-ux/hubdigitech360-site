"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { enregistrerFichier, supprimerFichierPublic, TAILLE_MAX_IMAGE, TAILLE_MAX_VIDEO } from "@/lib/uploads";
import {
  creerPublication,
  findPublicationById,
  modifierPublication,
  supprimerPublication,
  type StatutPublication,
} from "@/lib/repo-publications";
import type { ActionState } from "./auth";

async function extraireChamps(formData: FormData, ancienneImageUrl: string | null, ancienneVideoUrl: string | null) {
  const titre = String(formData.get("titre") ?? "").trim();
  const extrait = String(formData.get("extrait") ?? "").trim() || null;
  const contenu = String(formData.get("contenu") ?? "").trim();
  const statut = (formData.get("statut") === "publie" ? "publie" : "brouillon") as StatutPublication;

  let imageUrl = ancienneImageUrl;
  const fichierImage = formData.get("image") as File | null;
  if (fichierImage && fichierImage.size > 0) {
    if (!fichierImage.type.startsWith("image/")) throw new Error("Le fichier de couverture doit être une image.");
    if (fichierImage.size > TAILLE_MAX_IMAGE) throw new Error("Image trop volumineuse (8 Mo maximum).");
    await supprimerFichierPublic(ancienneImageUrl);
    imageUrl = await enregistrerFichier(fichierImage, "images");
  }

  let videoUrl = ancienneVideoUrl;
  const videoUrlSaisie = String(formData.get("videoUrlExterne") ?? "").trim();
  const fichierVideo = formData.get("video") as File | null;
  if (fichierVideo && fichierVideo.size > 0) {
    if (!fichierVideo.type.startsWith("video/")) throw new Error("Le fichier doit être une vidéo.");
    if (fichierVideo.size > TAILLE_MAX_VIDEO) throw new Error("Vidéo trop volumineuse (80 Mo maximum).");
    await supprimerFichierPublic(ancienneVideoUrl);
    videoUrl = await enregistrerFichier(fichierVideo, "videos");
  } else if (videoUrlSaisie) {
    videoUrl = videoUrlSaisie;
  } else if (formData.get("supprimerVideo") === "1") {
    await supprimerFichierPublic(ancienneVideoUrl);
    videoUrl = null;
  }

  return { titre, extrait, contenu, statut, imageUrl, videoUrl };
}

export async function creerPublicationAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await getCurrentAdmin();
  if (!admin) return { error: "Session expirée — reconnectez-vous." };

  try {
    const champs = await extraireChamps(formData, null, null);
    if (!champs.titre) return { error: "Le titre est obligatoire." };
    if (!champs.contenu) return { error: "Le contenu est obligatoire." };

    const publication = creerPublication(champs);
    revalidatePath("/actualites");
    revalidatePath("/admin/publications");
    redirect(`/admin/publications/${publication.id}`);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erreur lors de la création." };
  }
}

export async function modifierPublicationAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await getCurrentAdmin();
  if (!admin) return { error: "Session expirée — reconnectez-vous." };

  const id = String(formData.get("id") ?? "");
  const existante = findPublicationById(id);
  if (!existante) return { error: "Publication introuvable." };

  try {
    const champs = await extraireChamps(formData, existante.imageUrl, existante.videoUrl);
    if (!champs.titre) return { error: "Le titre est obligatoire." };
    if (!champs.contenu) return { error: "Le contenu est obligatoire." };

    modifierPublication(id, champs);
    revalidatePath("/actualites");
    revalidatePath(`/actualites/${existante.slug}`);
    revalidatePath("/admin/publications");
    return { success: "Publication enregistrée." };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erreur lors de l'enregistrement." };
  }
}

export async function supprimerPublicationAction(id: string): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  const publication = findPublicationById(id);
  if (publication) {
    await supprimerFichierPublic(publication.imageUrl);
    await supprimerFichierPublic(publication.videoUrl);
    supprimerPublication(id);
  }
  revalidatePath("/actualites");
  revalidatePath("/admin/publications");
}
