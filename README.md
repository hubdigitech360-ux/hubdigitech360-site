# Hub Digitech360 — Site vitrine

Site public de l'agence Hub Digitech360, éditeur de [Performa360 Suite](https://github.com/hubdigitech360-ux/performa360-mvp) — projet séparé volontairement (voir la conversation qui a mené à ce choix), pour ne jamais risquer de casser le logiciel en modifiant le site vitrine.

## Démarrer

```bash
npm install
npm run dev   # http://localhost:3000
```

## Pages

- `/` — Accueil (piliers du logiciel, CTA connexion/démo)
- `/services` — Offre de services (contenu indicatif, à valider)
- `/a-propos` — Présentation de l'agence (contenu volontairement générique, à enrichir avec de vraies informations)
- `/contact` — Coordonnées (email/téléphone marqués « à confirmer »)

## À faire avant mise en ligne réelle

- Confirmer/remplacer l'email et le téléphone de contact (actuellement des valeurs indicatives dans `Footer.tsx` et `contact/page.tsx`).
- Définir `NEXT_PUBLIC_APP_URL` vers la vraie URL publique de Performa360 une fois déployé (voir `.env.example`).
- Décider si un vrai formulaire de contact doit être ajouté (nécessite un service d'envoi d'email — pas encore configuré pour ce projet, volontairement pas simulé).
- Ajouter un vrai logo (fichier image) si disponible, à la place de l'icône de repli actuelle.
