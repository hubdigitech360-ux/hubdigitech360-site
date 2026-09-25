import { db } from "./db";

/** Textes/coordonnées modifiables depuis l'admin — chaque clé a une valeur par défaut (le texte actuel du site), utilisée tant que rien n'a été personnalisé. */
export const PARAMETRES_DEFAUT: Record<string, string> = {
  contact_email: "hubdigitech360@gmail.com",
  contact_telephone: "+237 697 234 123",
  contact_adresse: "Douala, Cameroun",

  accueil_titre: "Nous construisons les systèmes qui font tourner votre entreprise.",
  accueil_soustitre:
    "Hub Digitech360 conçoit des logiciels sur-mesure et des plateformes SaaS pour les PME et institutions camerounaises — du cahier des charges au déploiement.",

  services_a_titre: "Ingénierie logicielle",
  services_a_texte:
    "SaaS propriétaire, logiciels métier sur-mesure, sites & applications, automatisation — du cahier des charges au déploiement.",
  services_a_texte_detail:
    "Notre cœur de métier. Nous concevons des plateformes SaaS propriétaires — comme Performa360 — et des logiciels sur-mesure (CRM, ERP, systèmes de gestion métier) pour des secteurs exigeants. Aussi : sites web, applications, automatisation et intégration d'IA, et le support technique une fois en production.",
  services_b_titre: "Communication & marque",
  services_b_texte:
    "Identité visuelle, présence digitale, marketing — pour accompagner le lancement et la croissance de nos clients.",
  services_b_texte_detail:
    "Identité de marque (logo, charte graphique), pilotage de la communication digitale et marketing — pour donner à nos clients une présence en ligne à la hauteur de leur logiciel.",
  services_c_titre: "Conseil & accompagnement",
  services_c_texte:
    "Diagnostic, feuille de route de digitalisation, formation des équipes à l'adoption des outils déployés.",
  services_c_texte_detail:
    "Diagnostic et feuille de route de transformation digitale, formation des équipes à l'adoption des outils déployés — nous restons après la livraison.",

  a_propos_texte_1:
    "Hub Digitech360 est une agence Tech, Marketing, Communication & Transformation digitale basée à Douala. Nous concevons des systèmes pensés pour les réalités des structures camerounaises — PME, cliniques, cabinets, structures associatives — plutôt que des adaptations de produits conçus ailleurs.",
  a_propos_texte_2:
    "Performa360, notre réalisation phare, en est la preuve : une plateforme SaaS multi-métiers où chaque structure n'active que les modules dont elle a besoin, avec une paie conforme à la réglementation camerounaise et des paiements en ligne adaptés au marché local.",
  a_propos_texte_3:
    "Au-delà du logiciel, nous accompagnons chaque structure — de la configuration initiale à la formation des équipes, jusqu'au support une fois en production.",
};

export function getParametre(cle: string): string {
  const row = db.prepare("SELECT valeur FROM parametres_site WHERE cle = ?").get(cle) as
    | { valeur: string | null }
    | undefined;
  return row?.valeur ?? PARAMETRES_DEFAUT[cle] ?? "";
}

export function getParametres(cles: string[]): Record<string, string> {
  const resultat: Record<string, string> = {};
  for (const cle of cles) resultat[cle] = getParametre(cle);
  return resultat;
}

export function setParametre(cle: string, valeur: string): void {
  db.prepare(
    `INSERT INTO parametres_site (cle, valeur, updatedAt) VALUES (?, ?, datetime('now'))
     ON CONFLICT (cle) DO UPDATE SET valeur = excluded.valeur, updatedAt = excluded.updatedAt`
  ).run(cle, valeur);
}
