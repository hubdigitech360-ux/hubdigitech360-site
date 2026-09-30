import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

/** Téléversement de fichiers (couvertures/vidéos de publications, photos de l'équipe, médias de la page Vision) — même dossier public/uploads pour tous, servi statiquement par Next. */
export const TAILLE_MAX_IMAGE = 8 * 1024 * 1024; // 8 Mo
export const TAILLE_MAX_VIDEO = 80 * 1024 * 1024; // 80 Mo
const DOSSIER_UPLOADS = path.join(process.cwd(), "public", "uploads");

export async function enregistrerFichier(fichier: File, sousDossier: "images" | "videos"): Promise<string> {
  const extension = fichier.name.includes(".") ? fichier.name.split(".").pop() : "bin";
  const nomFichier = `${randomUUID()}.${extension}`;
  const dossier = path.join(DOSSIER_UPLOADS, sousDossier);
  await mkdir(dossier, { recursive: true });
  const buffer = Buffer.from(await fichier.arrayBuffer());
  await writeFile(path.join(dossier, nomFichier), buffer);
  return `/uploads/${sousDossier}/${nomFichier}`;
}

export async function supprimerFichierPublic(url: string | null): Promise<void> {
  if (url?.startsWith("/uploads/")) {
    await unlink(path.join(process.cwd(), "public", url)).catch(() => {});
  }
}
