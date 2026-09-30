import Link from "next/link";
import { listMembresEquipe } from "@/lib/repo-equipe";
import { SupprimerMembreButton } from "./SupprimerMembreButton";

/** Présentation de l'équipe, affichée sur la page publique "Notre Vision" (demande explicite, 2026-09-30). */
export default function AdminEquipePage() {
  const membres = listMembresEquipe();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Équipe</h1>
          <p className="mt-1 text-sm text-slate-500">Affichée sur la page publique « Notre Vision ».</p>
        </div>
        <Link href="/admin/equipe/nouveau" className="btn-primary px-4 py-2 text-sm">
          + Nouveau membre
        </Link>
      </div>

      <div className="flex flex-col divide-y divide-slate-200 border border-slate-200 bg-white">
        {membres.length === 0 && (
          <p className="p-6 text-center text-sm text-slate-400">Aucun membre pour l&apos;instant.</p>
        )}
        {membres.map((m) => (
          <div key={m.id} className="flex items-center justify-between gap-4 p-4">
            <div className="flex min-w-0 items-center gap-3">
              {m.photoUrl ? (
                <img src={m.photoUrl} alt="" className="h-10 w-10 flex-shrink-0 rounded-full object-cover" />
              ) : (
                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-slate-100" />
              )}
              <div className="min-w-0">
                <Link href={`/admin/equipe/${m.id}`} className="truncate text-sm font-semibold text-slate-900 hover:underline">
                  {m.nom}
                </Link>
                <div className="mono truncate text-xs text-slate-400">{m.poste}</div>
              </div>
            </div>
            <div className="flex flex-shrink-0 items-center gap-3">
              <Link href={`/admin/equipe/${m.id}`} className="text-xs font-semibold" style={{ color: "var(--blue)" }}>
                Modifier
              </Link>
              <SupprimerMembreButton id={m.id} nom={m.nom} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
