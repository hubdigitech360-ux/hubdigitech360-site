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
  `);

  return db;
}

export const db = globalForDb.__hubDb ?? (globalForDb.__hubDb = init());
