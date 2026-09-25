"use server";

import { redirect } from "next/navigation";
import { createSession, destroySession, findAdminByEmail, verifierMotDePasse } from "@/lib/auth";

export type ActionState = { error?: string; success?: string };

export async function loginAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const motDePasse = String(formData.get("motDePasse") ?? "");

  const admin = findAdminByEmail(email);
  if (!admin || !(await verifierMotDePasse(motDePasse, admin.motDePasseHash))) {
    return { error: "Email ou mot de passe incorrect." };
  }

  await createSession(admin.id);
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}
