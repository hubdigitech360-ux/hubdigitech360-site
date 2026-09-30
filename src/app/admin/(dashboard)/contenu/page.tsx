import { getParametres } from "@/lib/repo-parametres";
import { ContenuForm } from "./ContenuForm";

const TOUTES_LES_CLES = [
  "contact_email",
  "contact_telephone",
  "contact_adresse",
  "accueil_titre",
  "accueil_soustitre",
  "services_a_titre",
  "services_a_texte",
  "services_a_texte_detail",
  "services_b_titre",
  "services_b_texte",
  "services_b_texte_detail",
  "services_c_titre",
  "services_c_texte",
  "services_c_texte_detail",
  "a_propos_texte_1",
  "a_propos_texte_2",
  "a_propos_texte_3",
  "vision_titre",
  "vision_intro",
  "vision_mission",
  "vision_stat_1",
  "vision_stat_2",
  "vision_diff_1_titre",
  "vision_diff_1_texte",
  "vision_diff_2_titre",
  "vision_diff_2_texte",
  "vision_diff_3_titre",
  "vision_diff_3_texte",
  "vision_horizon",
  "vision_photo_1_url",
  "vision_photo_2_url",
  "vision_photo_3_url",
  "vision_video_url",
];

export default function ContenuPage() {
  const valeurs = getParametres(TOUTES_LES_CLES);
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Textes du site</h1>
        <p className="mt-1 text-sm text-slate-500">Modifie directement les textes affichés sur les pages publiques.</p>
      </div>
      <ContenuForm valeurs={valeurs} />
    </div>
  );
}
