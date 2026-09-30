"use client";

import { useActionState } from "react";
import { modifierParametresAction } from "@/lib/actions/parametres";
import type { ActionState } from "@/lib/actions/auth";

const initialState: ActionState = {};

function Champ({
  cle,
  label,
  valeur,
  zone,
}: {
  cle: string;
  label: string;
  valeur: string;
  zone?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-slate-600">{label}</label>
      {zone ? (
        <textarea name={cle} defaultValue={valeur} rows={3} className="border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500" />
      ) : (
        <input name={cle} defaultValue={valeur} className="border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500" />
      )}
    </div>
  );
}

function Section({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div className="border border-slate-200 bg-white p-5">
      <h2 className="mb-4 text-sm font-semibold text-slate-700">{titre}</h2>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

export function ContenuForm({ valeurs }: { valeurs: Record<string, string> }) {
  const [state, formAction, pending] = useActionState(modifierParametresAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <Section titre="Coordonnées de contact">
        <Champ cle="contact_email" label="Email" valeur={valeurs.contact_email} />
        <Champ cle="contact_telephone" label="Téléphone" valeur={valeurs.contact_telephone} />
        <Champ cle="contact_adresse" label="Adresse" valeur={valeurs.contact_adresse} />
      </Section>

      <Section titre="Page d'accueil">
        <Champ cle="accueil_titre" label="Titre principal" valeur={valeurs.accueil_titre} zone />
        <Champ cle="accueil_soustitre" label="Sous-titre" valeur={valeurs.accueil_soustitre} zone />
      </Section>

      <Section titre="Services — A. Ingénierie logicielle">
        <Champ cle="services_a_titre" label="Titre" valeur={valeurs.services_a_titre} />
        <Champ cle="services_a_texte" label="Texte court (accueil)" valeur={valeurs.services_a_texte} zone />
        <Champ cle="services_a_texte_detail" label="Texte détaillé (page Services)" valeur={valeurs.services_a_texte_detail} zone />
      </Section>

      <Section titre="Services — B. Communication & marque">
        <Champ cle="services_b_titre" label="Titre" valeur={valeurs.services_b_titre} />
        <Champ cle="services_b_texte" label="Texte court (accueil)" valeur={valeurs.services_b_texte} zone />
        <Champ cle="services_b_texte_detail" label="Texte détaillé (page Services)" valeur={valeurs.services_b_texte_detail} zone />
      </Section>

      <Section titre="Services — C. Conseil & accompagnement">
        <Champ cle="services_c_titre" label="Titre" valeur={valeurs.services_c_titre} />
        <Champ cle="services_c_texte" label="Texte court (accueil)" valeur={valeurs.services_c_texte} zone />
        <Champ cle="services_c_texte_detail" label="Texte détaillé (page Services)" valeur={valeurs.services_c_texte_detail} zone />
      </Section>

      <Section titre="Page À propos">
        <Champ cle="a_propos_texte_1" label="Paragraphe 1" valeur={valeurs.a_propos_texte_1} zone />
        <Champ cle="a_propos_texte_2" label="Paragraphe 2" valeur={valeurs.a_propos_texte_2} zone />
        <Champ cle="a_propos_texte_3" label="Paragraphe 3" valeur={valeurs.a_propos_texte_3} zone />
      </Section>

      <Section titre="Page Notre Vision — textes">
        <Champ cle="vision_titre" label="Titre principal" valeur={valeurs.vision_titre} zone />
        <Champ cle="vision_intro" label="Paragraphe d'introduction" valeur={valeurs.vision_intro} zone />
        <Champ cle="vision_mission" label="Notre mission" valeur={valeurs.vision_mission} zone />
        <Champ cle="vision_stat_1" label="Chiffre-clé 1 (avec source)" valeur={valeurs.vision_stat_1} zone />
        <Champ cle="vision_stat_2" label="Chiffre-clé 2 (avec source)" valeur={valeurs.vision_stat_2} zone />
        <Champ cle="vision_diff_1_titre" label="Différenciateur 1 — titre" valeur={valeurs.vision_diff_1_titre} />
        <Champ cle="vision_diff_1_texte" label="Différenciateur 1 — texte" valeur={valeurs.vision_diff_1_texte} zone />
        <Champ cle="vision_diff_2_titre" label="Différenciateur 2 — titre" valeur={valeurs.vision_diff_2_titre} />
        <Champ cle="vision_diff_2_texte" label="Différenciateur 2 — texte" valeur={valeurs.vision_diff_2_texte} zone />
        <Champ cle="vision_diff_3_titre" label="Différenciateur 3 — titre" valeur={valeurs.vision_diff_3_titre} />
        <Champ cle="vision_diff_3_texte" label="Différenciateur 3 — texte" valeur={valeurs.vision_diff_3_texte} zone />
        <Champ cle="vision_horizon" label="Phrase de clôture (horizon 2030)" valeur={valeurs.vision_horizon} zone />
      </Section>

      <Section titre="Page Notre Vision — photos & vidéo">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {["vision_photo_1_url", "vision_photo_2_url", "vision_photo_3_url"].map((cle, i) => (
            <div key={cle} className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-600">Photo {i + 1}</label>
              {valeurs[cle] && <img src={valeurs[cle]} alt="" className="mb-1 h-24 w-full object-cover" />}
              <input type="file" name={cle} accept="image/*" className="text-xs" />
              {valeurs[cle] && (
                <label className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500">
                  <input type="checkbox" name={`${cle}_supprimer`} value="1" /> Retirer
                </label>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-600">Vidéo (lien YouTube/Vimeo, ou fichier)</label>
          {valeurs.vision_video_url && <p className="mb-1 truncate text-[11px] text-slate-400">Actuelle : {valeurs.vision_video_url}</p>}
          <input
            type="text"
            name="vision_video_url_externe"
            placeholder="https://youtube.com/watch?v=..."
            className="mb-1 border border-slate-300 px-3 py-1.5 text-xs outline-none focus:border-slate-500"
          />
          <input type="file" name="vision_video_url" accept="video/*" className="text-xs" />
          {valeurs.vision_video_url && (
            <label className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500">
              <input type="checkbox" name="vision_video_url_supprimer" value="1" /> Retirer la vidéo actuelle
            </label>
          )}
        </div>
      </Section>

      {state.error && <div className="bg-red-50 px-3 py-2 text-xs text-red-700">{state.error}</div>}
      {state.success && <div className="bg-emerald-50 px-3 py-2 text-xs text-emerald-700">{state.success}</div>}

      <button
        type="submit"
        disabled={pending}
        className="btn-primary self-start px-6 py-2.5 text-sm disabled:opacity-60"
      >
        {pending ? "Enregistrement…" : "Enregistrer les modifications"}
      </button>
    </form>
  );
}
