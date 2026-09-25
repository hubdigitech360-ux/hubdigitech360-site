import Link from "next/link";
import { getParametres } from "@/lib/repo-parametres";

export default async function ServicesPage() {
  const p = getParametres([
    "services_a_titre",
    "services_a_texte_detail",
    "services_b_titre",
    "services_b_texte_detail",
    "services_c_titre",
    "services_c_texte_detail",
  ]);

  const CATEGORIES = [
    { lettre: "A", titre: p.services_a_titre, description: p.services_a_texte_detail },
    { lettre: "B", titre: p.services_b_titre, description: p.services_b_texte_detail },
    { lettre: "C", titre: p.services_c_titre, description: p.services_c_texte_detail },
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
      <p className="mono text-xs uppercase tracking-wider" style={{ color: "var(--blue)" }}>
        Ce que nous faisons
      </p>
      <h1 className="mt-2 text-3xl text-slate-900">Nos services</h1>
      <p className="mt-4 text-sm text-slate-500">
        Une double expertise — ingénierie logicielle et communication digitale — avec le même souci du détail
        que nous mettons dans Performa360.
      </p>

      <div className="mt-14 flex flex-col gap-12">
        {CATEGORIES.map((c) => (
          <div key={c.lettre} className="border-t border-slate-200 pt-8">
            <div className="flex items-baseline gap-3">
              <span className="mono text-sm" style={{ color: "var(--blue)" }}>{c.lettre}</span>
              <h2 className="text-lg text-slate-900">{c.titre}</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">{c.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 border-t border-slate-200 pt-10 text-center">
        <p className="text-sm text-slate-500">Une question sur nos offres ou votre besoin spécifique ?</p>
        <Link href="/contact" className="mt-4 inline-block px-5 py-2.5 text-sm font-semibold text-white" style={{ background: "var(--blue)" }}>
          Contactez-nous
        </Link>
      </div>
    </div>
  );
}
