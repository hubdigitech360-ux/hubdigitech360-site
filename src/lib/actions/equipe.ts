"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { enregistrerFichier, supprimerFichierPublic, TAILLE_MAX_IMAGE } from "@/lib/uploads";
import { creerMembreEquipe, findMembreEquipeById, modifierMembreEquipe, supprimerMembreEquipe } from "@/lib/repo-equipe";
import type { ActionState } from "./auth";

async function extraireChamps(formData: FormData, anciennePhotoUrl: string | null) {
  const nom = String(formData.get("nom") ?? "").trim();
  const poste = String(formData.get("poste") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim() || null;
  const ordreAffichage = Number(formData.get("ordreAffichage") ?? 0) || 0;

  let photoUrl = anciennePhotoUrl;
  const fichierPhoto = formData.get("photo") as File | null;
  if (fichierPhoto && fichierPhoto.size > 0) {
    if (!fichierPhoto.type.startsWith("image/")) throw new Error("La photo doit être une image.");
    if (fichierPhoto.size > TAILLE_MAX_IMAGE) throw new Error("Photo trop volumineuse (8 Mo maximum).");
    await supprimerFichierPublic(anciennePhotoUrl);
    photoUrl = await enregistrerFichier(fichierPhoto, "images");
  } else if (formData.get("supprimerPhoto") === "1") {
    await supprimerFichierPublic(anciennePhotoUrl);
    photoUrl = null;
  }

  return { nom, poste, photoUrl, bio, ordreAffichage };
}

export async function creerMembreEquipeAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await getCurrentAdmin();
  if (!admin) return { error: "Session expirée — reconnectez-vous." };

  try {
    const champs = await extraireChamps(formData, null);
    if (!champs.nom) return { error: "Le nom est obligatoire." };
    if (!champs.poste) return { error: "Le poste est obligatoire." };

    creerMembreEquipe(champs);
    revalidatePath("/notre-vision");
    revalidatePath("/admin/equipe");
    redirect("/admin/equipe");
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erreur lors de la création." };
  }
}

export async function modifierMembreEquipeAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await getCurrentAdmin();
  if (!admin) return { error: "Session expirée — reconnectez-vous." };

  const id = String(formData.get("id") ?? "");
  const existant = findMembreEquipeById(id);
  if (!existant) return { error: "Membre introuvable." };

  try {
    const champs = await extraireChamps(formData, existant.photoUrl);
    if (!champs.nom) return { error: "Le nom est obligatoire." };
    if (!champs.poste) return { error: "Le poste est obligatoire." };

    modifierMembreEquipe(id, champs);
    revalidatePath("/notre-vision");
    revalidatePath("/admin/equipe");
    return { success: "Membre enregistré." };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erreur lors de l'enregistrement." };
  }
}

export async function supprimerMembreEquipeAction(id: string): Promise<void> {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  const membre = findMembreEquipeById(id);
  if (membre) {
    await supprimerFichierPublic(membre.photoUrl);
    supprimerMembreEquipe(id);
  }
  revalidatePath("/notre-vision");
  revalidatePath("/admin/equipe");
}
