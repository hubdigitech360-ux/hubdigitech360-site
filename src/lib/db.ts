import { DatabaseSync } from "node:sqlite";
import path from "node:path";

/**
 * Couche de données du site vitrine — SQLite via `node:sqlite` (même choix
 * que performa360-mvp : aucune dépendance binaire externe). Un schéma
 * volontairement minimal : ce site n'est pas le logiciel, juste de quoi
 * gérer les publications et quelques textes/coordonnées sans développeur.
 *
 * `DB_PATH` (optionnel) — même rôle que dans performa360-mvp : pointer vers
 * un disque persistant sur un hébergeur réel, sinon `dev.db` local par défaut.
 */

const globalForDb = globalThis as unknown as { __hubDb?: DatabaseSync };

function init(): DatabaseSync {
  const dbPath = process.env.DB_PATH || path.join(process.cwd(), "dev.db");
  const db = new DatabaseSync(dbPath);
  db.exec("PRAGMA journal_mode = WAL;");

  db.exec(`
    CREATE TABLE IF NOT EXISTS admins (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      motDePasseHash TEXT NOT NULL,
      nom TEXT,
      createdAt TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS publications (
      id TEXT PRIMARY KEY,
      titre TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      extrait TEXT,
      contenu TEXT NOT NULL,
      imageUrl TEXT,
      videoUrl TEXT,
      statut TEXT NOT NULL DEFAULT 'brouillon',
      publieLe TEXT,
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS parametres_site (
      cle TEXT PRIMARY KEY,
      valeur TEXT,
      updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
    );

    -- Page "Notre Vision" — présentation de l'équipe (demande explicite,
    -- 2026-09-30). Liste distincte des publications : pas de statut
    -- brouillon/publié, un membre ajouté est immédiatement visible.
    -- "bio" (demande explicite, 2026-09-30) : présentation longue affichée
    -- sous la photo/poste d'un membre — facultative, un membre sans bio
    -- reste affiché de façon compacte (voir notre-vision/page.tsx).
    CREATE TABLE IF NOT EXISTS membres_equipe (
      id TEXT PRIMARY KEY,
      nom TEXT NOT NULL,
      poste TEXT NOT NULL,
      photoUrl TEXT,
      bio TEXT,
      ordreAffichage INTEGER NOT NULL DEFAULT 0,
      createdAt TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // "bio" ajoutée après la création initiale de membres_equipe — ALTER TABLE
  // nécessaire pour une base déjà existante (CREATE TABLE IF NOT EXISTS ne
  // modifie pas une table déjà là), ignoré si la colonne existe déjà.
  try {
    db.exec("ALTER TABLE membres_equipe ADD COLUMN bio TEXT");
  } catch {
    // Colonne déjà présente (base créée après cet ajout) — rien à faire.
  }

  return db;
}

export const db = globalForDb.__hubDb ?? (globalForDb.__hubDb = init());

/**
 * `node:sqlite` renvoie des lignes en objets à prototype nul (`[Object:
 * null prototype]`) — React rejette ce genre d'objet quand un Server
 * Component le passe en prop à un composant "use client" ("Only plain
 * objects... Classes or null prototypes are not supported"), ce qui cassait
 * l'édition (membre d'équipe, publication) dès qu'un formulaire client
 * recevait la ligne chargée depuis la base. La copie par spread produit un
 * objet ordinaire (prototype Object standard) qui traverse cette frontière
 * sans problème.
 */
export function ligne<T extends object>(row: T | undefined): T | null {
  return row ? { ...row } : null;
}

export function lignes<T extends object>(rows: T[]): T[] {
  return rows.map((row) => ({ ...row }));
}
