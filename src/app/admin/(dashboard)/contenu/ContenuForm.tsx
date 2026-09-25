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

      {state.error && <div className="bg-red-50 px-3 py-2 text-xs text-red-700">{state.error}</div>}
      {state.success && <div className="bg-emerald-50 px-3 py-2 text-xs text-emerald-700">{state.success}</div>}

      <button
        type="submit"
        disabled={pending}
        className="self-start px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        style={{ background: "var(--blue)" }}
      >
        {pending ? "Enregistrement…" : "Enregistrer les modifications"}
      </button>
    </form>
  );
}
