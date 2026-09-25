"use client";

import { useActionState, useRef } from "react";
import type { ActionState } from "@/lib/actions/auth";
import type { Publication } from "@/lib/repo-publications";

const EMOJIS = ["🚀", "✅", "💡", "📢", "🎉", "🔧", "📈", "🤝", "🇨🇲", "⭐", "🖥️", "📱"];

const initialState: ActionState = {};

export function PublicationForm({
  action,
  publication,
}: {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  publication?: Publication;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const contenuRef = useRef<HTMLTextAreaElement>(null);

  function insererEmoji(emoji: string) {
    const el = contenuRef.current;
    if (!el) return;
    const debut = el.selectionStart ?? el.value.length;
    const fin = el.selectionEnd ?? el.value.length;
    el.value = el.value.slice(0, debut) + emoji + el.value.slice(fin);
    el.focus();
    el.selectionStart = el.selectionEnd = debut + emoji.length;
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {publication && <input type="hidden" name="id" value={publication.id} />}

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-600">Titre</label>
        <input
          name="titre"
          required
          defaultValue={publication?.titre}
          className="border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          placeholder="Ex. : Lancement du module Trésorerie"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-600">Extrait (résumé court, affiché dans la liste)</label>
        <input
          name="extrait"
          defaultValue={publication?.extrait ?? ""}
          className="border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          placeholder="Une phrase qui résume l'article"
        />
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-slate-600">Contenu</label>
          <div className="flex flex-wrap gap-1">
            {EMOJIS.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => insererEmoji(e)}
                className="rounded px-1.5 py-0.5 text-base hover:bg-slate-100"
                title="Insérer"
              >
                {e}
              </button>
            ))}
          </div>
        </div>
        <textarea
          ref={contenuRef}
          name="contenu"
          required
          rows={12}
          defaultValue={publication?.contenu}
          className="border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          placeholder={"Votre texte ici. Mise en forme possible :\n**gras**, *italique*, [lien](https://...)\nLaissez une ligne vide entre les paragraphes."}
        />
        <p className="text-[11px] text-slate-400">
          Mise en forme : <code>**gras**</code>, <code>*italique*</code>, <code>[texte](https://lien)</code>. Une ligne vide sépare les paragraphes.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-600">Image de couverture</label>
          {publication?.imageUrl && (
            <img src={publication.imageUrl} alt="" className="mb-1 h-24 w-full object-cover" />
          )}
          <input type="file" name="image" accept="image/*" className="text-xs" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-600">Vidéo (lien YouTube/Vimeo, ou fichier)</label>
          {publication?.videoUrl && (
            <p className="mb-1 truncate text-[11px] text-slate-400">Actuelle : {publication.videoUrl}</p>
          )}
          <input
            type="text"
            name="videoUrlExterne"
            placeholder="https://youtube.com/watch?v=..."
            className="mb-1 border border-slate-300 px-3 py-1.5 text-xs outline-none focus:border-slate-500"
          />
          <input type="file" name="video" accept="video/*" className="text-xs" />
          {publication?.videoUrl && (
            <label className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500">
              <input type="checkbox" name="supprimerVideo" value="1" /> Retirer la vidéo actuelle
            </label>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="radio"
            name="statut"
            value="brouillon"
            defaultChecked={!publication || publication.statut === "brouillon"}
          />
          Brouillon (non visible publiquement)
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="radio" name="statut" value="publie" defaultChecked={publication?.statut === "publie"} />
          Publié
        </label>
      </div>

      {state.error && <div className="bg-red-50 px-3 py-2 text-xs text-red-700">{state.error}</div>}
      {state.success && <div className="bg-emerald-50 px-3 py-2 text-xs text-emerald-700">{state.success}</div>}

      <button
        type="submit"
        disabled={pending}
        className="self-start px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        style={{ background: "var(--blue)" }}
      >
        {pending ? "Enregistrement…" : "Enregistrer"}
      </button>
    </form>
  );
}
