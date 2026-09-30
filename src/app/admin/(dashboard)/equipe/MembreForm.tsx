"use client";

import { useActionState } from "react";
import type { ActionState } from "@/lib/actions/auth";
import type { MembreEquipe } from "@/lib/repo-equipe";

const initialState: ActionState = {};

export function MembreForm({
  action,
  membre,
}: {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  membre?: MembreEquipe;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {membre && <input type="hidden" name="id" value={membre.id} />}

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-600">Nom</label>
        <input
          name="nom"
          required
          defaultValue={membre?.nom}
          className="border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          placeholder="Ex. : Carince Fonke"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-600">Poste</label>
        <input
          name="poste"
          required
          defaultValue={membre?.poste}
          className="border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          placeholder="Ex. : Fondateur & Directeur Général"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-600">Ordre d&apos;affichage (les plus petits nombres en premier)</label>
        <input
          type="number"
          name="ordreAffichage"
          defaultValue={membre?.ordreAffichage ?? 0}
          className="w-32 border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-600">Photo</label>
        {membre?.photoUrl && <img src={membre.photoUrl} alt="" className="mb-1 h-24 w-24 rounded-full object-cover" />}
        <input type="file" name="photo" accept="image/*" className="text-xs" />
        {membre?.photoUrl && (
          <label className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500">
            <input type="checkbox" name="supprimerPhoto" value="1" /> Retirer la photo actuelle
          </label>
        )}
      </div>

      {state.error && <div className="bg-red-50 px-3 py-2 text-xs text-red-700">{state.error}</div>}
      {state.success && <div className="bg-emerald-50 px-3 py-2 text-xs text-emerald-700">{state.success}</div>}

      <button
        type="submit"
        disabled={pending}
        className="btn-primary self-start px-6 py-2.5 text-sm disabled:opacity-60"
      >
        {pending ? "Enregistrement…" : "Enregistrer"}
      </button>
    </form>
  );
}
