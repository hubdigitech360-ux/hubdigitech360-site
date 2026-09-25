"use server";

import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth";
import { setParametre } from "@/lib/repo-parametres";
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
];

export async function modifierParametresAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await getCurrentAdmin();
  if (!admin) return { error: "Session expirée — reconnectez-vous." };

  for (const cle of CLES_MODIFIABLES) {
    const valeur = formData.get(cle);
    if (typeof valeur === "string") setParametre(cle, valeur.trim());
  }

  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/a-propos");
  revalidatePath("/contact");
  return { success: "Modifications enregistrées." };
}
