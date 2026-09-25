# Hub Digitech360 — Site vitrine

Site public de l'agence Hub Digitech360, éditeur de [Performa360 Suite](https://github.com/hubdigitech360-ux/performa360-mvp) — projet séparé volontairement (voir la conversation qui a mené à ce choix), pour ne jamais risquer de casser le logiciel en modifiant le site vitrine.

## Démarrer

```bash
npm install
npm run dev -- -p 3001   # le site vitrine, sur le port 3001
```

Copiez `.env.example` en `.env` et renseignez au minimum `AUTH_SECRET` (nécessaire pour l'espace admin — `openssl rand -hex 32` pour en générer un, ou toute chaîne longue en local).

### ⚠️ Faire tourner le site vitrine EN MÊME TEMPS que performa360-mvp, sans conflit de port

Les deux projets ont par défaut le même port (3000). Pour tester le bouton "Se connecter à Performa360" (qui pointe vers `NEXT_PUBLIC_APP_URL`) sans tomber sur un 404, il faut les lancer sur des **ports différents, dans deux fenêtres de terminal séparées** :

| Projet | Commande | Port |
|---|---|---|
| `hubdigitech360-site` (ce dépôt) | `npm run dev -- -p 3001` | 3001 |
| `performa360-mvp` | `npm run dev` | 3000 |

Et dans le `.env` du site vitrine, garder :
```
NEXT_PUBLIC_APP_URL=http://localhost:3000/login
```
(l'URL de connexion de performa360-mvp — à adapter si vous changez son port ou une fois en production).

⚠️ **`.env` et la base de données (`dev.db`) sont volontairement ignorés par git** (voir `.gitignore`) — chaque machine (poste local, serveur, session cloud) doit créer les siens et n'a donc **aucun compte administrateur par défaut**. Après avoir créé `.env`, créez votre propre compte (voir "Espace administrateur" ci-dessous) avant de tenter de vous connecter à `/admin/login`.

## Pages publiques

- `/` — Accueil (piliers du logiciel, CTA connexion/démo)
- `/services` — Offre de services
- `/actualites` — Publications (articles créés depuis l'admin)
- `/a-propos` — Présentation de l'agence
- `/contact` — Coordonnées

## Espace administrateur (`/admin`)

Un compte administrateur permet de créer des publications (actualités) et de modifier les textes/coordonnées du site, sans intervention développeur — voir la conversation du 2026-09-25 pour le contexte de cette demande.

**Créer un compte administrateur** (le premier, ou pour changer un mot de passe existant — la commande met à jour le mot de passe si l'email existe déjà) :
```bash
npm run creer-admin -- email@exemple.com "MotDePasse123!" "Nom (optionnel)"
```
Connexion ensuite sur `/admin/login` avec cet email/mot de passe.

**Ce qui est gérable depuis `/admin` :**
- **Publications** (`/admin/publications`) — créer/modifier/supprimer un article : titre, extrait, contenu (mise en forme légère : `**gras**`, `*italique*`, `[texte](url)`, émojis via les boutons dédiés), image de couverture (upload), vidéo (lien YouTube/Vimeo ou fichier). Statut brouillon/publié — seuls les articles publiés apparaissent sur `/actualites`.
- **Textes du site** (`/admin/contenu`) — coordonnées de contact, titre/sous-titre de l'accueil, titres et descriptions des 3 piliers de services (version courte pour l'accueil, version détaillée pour `/services`), les 3 paragraphes de `/a-propos`.

**Architecture** (pour un futur développeur) :
- Base SQLite locale (`node:sqlite`, même choix que performa360-mvp) — tables `admins`, `publications`, `parametres_site` (voir `src/lib/db.ts`).
- Session admin signée par JWT (`jose`), même schéma que `performa360-mvp/src/lib/auth.ts` — cookie `hub_admin_session`.
- Rendu du contenu des publications via un "markdown-lite" volontairement restreint et fait main (`src/lib/markdown-lite.ts`) : le texte est toujours échappé avant toute transformation, donc aucune injection HTML possible même si le compte admin était compromis — pas de dépendance markdown externe.
- Fichiers téléversés (images/vidéos de publications) dans `public/uploads/` (ignoré par git, comme `dev.db`).
- Pages publiques regroupées sous `src/app/(public)/` (en-tête/pied de page communs), `/admin/*` en dehors de ce groupe (interface admin dédiée, sans le menu marketing).

## Statut de déploiement

**Le site n'est pas encore en ligne** (pas d'hébergement configuré à ce jour) — il existe uniquement en local (`npm run dev`) et sur GitHub (`hubdigitech360-ux/hubdigitech360-site`, branche `master`). Le choix de l'hébergeur (VPS Hostinger/LWS ou autre) a été reporté volontairement — voir la conversation du 2026-09-25.

## À faire avant mise en ligne réelle

- Choisir et configurer un hébergeur (voir "Statut de déploiement" ci-dessus).
- Définir `NEXT_PUBLIC_APP_URL` vers la vraie URL publique de Performa360 une fois déployé.
- Définir un vrai `AUTH_SECRET` en production (le serveur refuse de démarrer sans, voir `src/lib/auth.ts`).
- Sur un hébergeur à disque persistant, définir `DB_PATH` (voir `.env.example`) pour que `dev.db` et `public/uploads/` survivent aux redéploiements.
- Décider si un vrai formulaire de contact doit être ajouté (nécessite un service d'envoi d'email — pas encore configuré pour ce projet, volontairement pas simulé).
