import { randomUUID } from "node:crypto";
import { db } from "./db";

export type StatutPublication = "brouillon" | "publie";

export type Publication = {
  id: string;
  titre: string;
  slug: string;
  extrait: string | null;
  contenu: string;
  imageUrl: string | null;
  videoUrl: string | null;
  statut: StatutPublication;
  publieLe: string | null;
  createdAt: string;
  updatedAt: string;
};

function slugify(titre: string): string {
  return titre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

/** Garantit un slug unique en ajoutant un suffixe numérique si besoin (nouvel article ou renommage). */
function slugUnique(base: string, idAExclure?: string): string {
  let slug = base || "publication";
  let n = 2;
  while (true) {
    const existe = db
      .prepare("SELECT id FROM publications WHERE slug = ? AND id != ?")
      .get(slug, idAExclure ?? "") as { id: string } | undefined;
    if (!existe) return slug;
    slug = `${base}-${n}`;
    n += 1;
  }
}

export function listPublications(): Publication[] {
  return db.prepare("SELECT * FROM publications ORDER BY createdAt DESC").all() as Publication[];
}

export function listPublicationsPubliees(): Publication[] {
  return db
    .prepare("SELECT * FROM publications WHERE statut = 'publie' ORDER BY publieLe DESC")
    .all() as Publication[];
}

export function findPublicationById(id: string): Publication | null {
  return (db.prepare("SELECT * FROM publications WHERE id = ?").get(id) as Publication | undefined) ?? null;
}

export function findPublicationBySlug(slug: string): Publication | null {
  return (
    (db.prepare("SELECT * FROM publications WHERE slug = ? AND statut = 'publie'").get(slug) as
      | Publication
      | undefined) ?? null
  );
}

export function creerPublication(input: {
  titre: string;
  extrait: string | null;
  contenu: string;
  imageUrl: string | null;
  videoUrl: string | null;
  statut: StatutPublication;
}): Publication {
  const id = randomUUID();
  const slug = slugUnique(slugify(input.titre));
  const publieLe = input.statut === "publie" ? new Date().toISOString() : null;

  db.prepare(
    `INSERT INTO publications (id, titre, slug, extrait, contenu, imageUrl, videoUrl, statut, publieLe)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(id, input.titre, slug, input.extrait, input.contenu, input.imageUrl, input.videoUrl, input.statut, publieLe);

  return findPublicationById(id)!;
}

export function modifierPublication(
  id: string,
  input: {
    titre: string;
    extrait: string | null;
    contenu: string;
    imageUrl: string | null;
    videoUrl: string | null;
    statut: StatutPublication;
  }
): Publication | null {
  const existante = findPublicationById(id);
  if (!existante) return null;

  const slug = slugUnique(slugify(input.titre), id);
  const publieLe = input.statut === "publie" ? (existante.publieLe ?? new Date().toISOString()) : null;

  db.prepare(
    `UPDATE publications
     SET titre = ?, slug = ?, extrait = ?, contenu = ?, imageUrl = ?, videoUrl = ?, statut = ?, publieLe = ?, updatedAt = datetime('now')
     WHERE id = ?`
  ).run(input.titre, slug, input.extrait, input.contenu, input.imageUrl, input.videoUrl, input.statut, publieLe, id);

  return findPublicationById(id);
}

export function supprimerPublication(id: string): void {
  db.prepare("DELETE FROM publications WHERE id = ?").run(id);
}
