/** URL du logiciel Performa360 — surchargée en production via NEXT_PUBLIC_APP_URL (voir .env.example). */
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000/login";

/** URL de l'Interactive Demo Engine de Performa360 (cahier des charges du 2026-09-25) — volontairement une variable séparée de APP_URL, qui contient déjà le suffixe /login. */
export const DEMO_URL = process.env.NEXT_PUBLIC_DEMO_URL || "http://localhost:3000/demo";
