import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { db } from "./db";

const SESSION_COOKIE = "hub_admin_session";

/** Même règle que performa360-mvp/src/lib/auth.ts : jamais de secret par défaut réutilisable en production. */
if (!process.env.AUTH_SECRET && process.env.NODE_ENV === "production") {
  throw new Error(
    "AUTH_SECRET manquant en production — définissez cette variable d'environnement avant de démarrer (voir .env.example)."
  );
}
const secretKey = new TextEncoder().encode(
  process.env.AUTH_SECRET || "dev-secret-local-uniquement-jamais-en-production"
);

export type Admin = { id: string; email: string; nom: string | null };

export async function hashMotDePasse(motDePasse: string) {
  return bcrypt.hash(motDePasse, 10);
}

export async function verifierMotDePasse(motDePasse: string, hash: string) {
  return bcrypt.compare(motDePasse, hash);
}

export async function createSession(adminId: string) {
  const token = await new SignJWT({ adminId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(secretKey);

  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function getCurrentAdmin(): Promise<Admin | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey);
    const adminId = (payload as { adminId?: string }).adminId;
    if (!adminId) return null;
    const admin = db.prepare("SELECT id, email, nom FROM admins WHERE id = ?").get(adminId) as
      | Admin
      | undefined;
    return admin ?? null;
  } catch {
    return null;
  }
}

export function findAdminByEmail(email: string): (Admin & { motDePasseHash: string }) | null {
  return (
    (db.prepare("SELECT id, email, nom, motDePasseHash FROM admins WHERE email = ?").get(email) as
      | (Admin & { motDePasseHash: string })
      | undefined) ?? null
  );
}
