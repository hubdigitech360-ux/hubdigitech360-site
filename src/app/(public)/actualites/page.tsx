import Link from "next/link";
import { listPublicationsPubliees } from "@/lib/repo-publications";

export default function ActualitesPage() {
  const publications = listPublicationsPubliees();

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <p className="mono text-xs uppercase tracking-wider" style={{ color: "var(--blue)" }}>
        Actualités
      </p>
      <h1 className="mt-2 text-3xl text-slate-900">Ce qui se passe chez Hub Digitech360</h1>

      <div className="mt-12 flex flex-col gap-10">
        {publications.length === 0 && <p className="text-sm text-slate-400">Aucune publication pour l&apos;instant.</p>}
        {publications.map((p) => (
          <Link key={p.id} href={`/actualites/${p.slug}`} className="group border-t border-slate-200 pt-8 first:border-t-0 first:pt-0">
            {p.imageUrl && <img src={p.imageUrl} alt={p.titre} className="mb-4 h-48 w-full object-cover" />}
            <div className="mono text-xs text-slate-400">
              {p.publieLe && new Date(p.publieLe).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
            </div>
            <h2 className="mt-1 text-xl text-slate-900 group-hover:underline">{p.titre}</h2>
            {p.extrait && <p className="mt-2 text-sm text-slate-500">{p.extrait}</p>}
          </Link>
        ))}
      </div>
    </div>
  );
}
