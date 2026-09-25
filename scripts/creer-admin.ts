// Crée (ou met à jour le mot de passe d'un) compte administrateur du site —
// exécuter avec `npm run creer-admin -- email@exemple.com "MotDePasse123!" "Nom"`.
// Import par chemin relatif (pas d'alias "@/…") pour tourner en `node` autonome.
import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { db } from "../src/lib/db.ts";

const [email, motDePasse, nom] = process.argv.slice(2);

if (!email || !motDePasse) {
  console.error('Usage : npm run creer-admin -- email@exemple.com "MotDePasse123!" "Nom (optionnel)"');
  process.exit(1);
}

const hash = await bcrypt.hash(motDePasse, 10);
const existant = db.prepare("SELECT id FROM admins WHERE email = ?").get(email) as { id: string } | undefined;

if (existant) {
  db.prepare("UPDATE admins SET motDePasseHash = ?, nom = ? WHERE id = ?").run(hash, nom ?? null, existant.id);
  console.log(`Mot de passe mis à jour pour ${email}.`);
} else {
  db.prepare("INSERT INTO admins (id, email, motDePasseHash, nom) VALUES (?, ?, ?, ?)").run(
    randomUUID(),
    email,
    hash,
    nom ?? null
  );
  console.log(`Compte administrateur créé : ${email}`);
}
