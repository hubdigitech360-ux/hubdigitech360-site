import { randomUUID } from "node:crypto";
import { db } from "./db";

/** Présentation de l'équipe sur la page "Notre Vision" (demande explicite, 2026-09-30). */
export type MembreEquipe = {
  id: string;
  nom: string;
  poste: string;
  photoUrl: string | null;
  bio: string | null;
  ordreAffichage: number;
  createdAt: string;
};

export function listMembresEquipe(): MembreEquipe[] {
  return db.prepare("SELECT * FROM membres_equipe ORDER BY ordreAffichage ASC, createdAt ASC").all() as MembreEquipe[];
}

export function findMembreEquipeById(id: string): MembreEquipe | null {
  return (db.prepare("SELECT * FROM membres_equipe WHERE id = ?").get(id) as MembreEquipe | undefined) ?? null;
}

export function creerMembreEquipe(input: { nom: string; poste: string; photoUrl: string | null; bio: string | null; ordreAffichage: number }): MembreEquipe {
  const id = randomUUID();
  db.prepare(
    `INSERT INTO membres_equipe (id, nom, poste, photoUrl, bio, ordreAffichage) VALUES (?, ?, ?, ?, ?, ?)`
  ).run(id, input.nom, input.poste, input.photoUrl, input.bio, input.ordreAffichage);
  return findMembreEquipeById(id)!;
}

export function modifierMembreEquipe(
  id: string,
  input: { nom: string; poste: string; photoUrl: string | null; bio: string | null; ordreAffichage: number }
): MembreEquipe | null {
  if (!findMembreEquipeById(id)) return null;
  db.prepare(
    `UPDATE membres_equipe SET nom = ?, poste = ?, photoUrl = ?, bio = ?, ordreAffichage = ? WHERE id = ?`
  ).run(input.nom, input.poste, input.photoUrl, input.bio, input.ordreAffichage, id);
  return findMembreEquipeById(id);
}

export function supprimerMembreEquipe(id: string): void {
  db.prepare("DELETE FROM membres_equipe WHERE id = ?").run(id);
}
