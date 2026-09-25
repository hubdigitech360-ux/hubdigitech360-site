import Link from "next/link";
import { listPublications } from "@/lib/repo-publications";

export default function AdminDashboardPage() {
  const publications = listPublications();
  const publiees = publications.filter((p) => p.statut === "publie").length;
  const brouillons = publications.length - publiees;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Tableau de bord</h1>
        <p className="mt-1 text-sm text-slate-500">Gérez les publications et les textes du site, sans passer par un développeur.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="border border-slate-200 bg-white p-5">
          <div className="text-2xl font-bold text-slate-900">{publications.length}</div>
          <div className="mono mt-1 text-[11px] uppercase text-slate-400">Publications au total</div>
        </div>
        <div className="border border-slate-200 bg-white p-5">
          <div className="text-2xl font-bold" style={{ color: "var(--blue)" }}>{publiees}</div>
          <div className="mono mt-1 text-[11px] uppercase text-slate-400">Publiées</div>
        </div>
        <div className="border border-slate-200 bg-white p-5">
          <div className="text-2xl font-bold text-slate-400">{brouillons}</div>
          <div className="mono mt-1 text-[11px] uppercase text-slate-400">Brouillons</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/admin/publications/nouveau" className="btn-primary px-5 py-2.5 text-sm">
          + Nouvelle publication
        </Link>
        <Link href="/admin/contenu" className="border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700">
          Modifier les textes du site
        </Link>
      </div>
    </div>
  );
}
