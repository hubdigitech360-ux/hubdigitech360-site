import Link from "next/link";
import { listPublications } from "@/lib/repo-publications";
import { SupprimerButton } from "./SupprimerButton";

export default function AdminPublicationsPage() {
  const publications = listPublications();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Publications</h1>
        <Link href="/admin/publications/nouveau" className="btn-primary px-4 py-2 text-sm">
          + Nouvelle
        </Link>
      </div>

      <div className="flex flex-col divide-y divide-slate-200 border border-slate-200 bg-white">
        {publications.length === 0 && (
          <p className="p-6 text-center text-sm text-slate-400">Aucune publication pour l&apos;instant.</p>
        )}
        {publications.map((p) => (
          <div key={p.id} className="flex items-center justify-between gap-4 p-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Link href={`/admin/publications/${p.id}`} className="truncate text-sm font-semibold text-slate-900 hover:underline">
                  {p.titre}
                </Link>
                {p.statut === "publie" ? (
                  <span className="mono flex-shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] uppercase text-emerald-700">Publié</span>
                ) : (
                  <span className="mono flex-shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] uppercase text-slate-500">Brouillon</span>
                )}
              </div>
              <div className="mono mt-1 text-xs text-slate-400">
                {new Date(p.updatedAt).toLocaleString("fr-FR")}
              </div>
            </div>
            <div className="flex flex-shrink-0 items-center gap-3">
              <Link href={`/admin/publications/${p.id}`} className="text-xs font-semibold" style={{ color: "var(--blue)" }}>
                Modifier
              </Link>
              <SupprimerButton id={p.id} titre={p.titre} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
