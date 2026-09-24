import Link from "next/link";

const CATEGORIES = [
  {
    lettre: "A",
    titre: "Ingénierie logicielle",
    description:
      "Notre cœur de métier. Nous concevons des plateformes SaaS propriétaires — comme Performa360 — et des logiciels sur-mesure (CRM, ERP, systèmes de gestion métier) pour des secteurs exigeants. Aussi : sites web, applications, automatisation et intégration d'IA, et le support technique une fois en production.",
  },
  {
    lettre: "B",
    titre: "Communication & marque",
    description:
      "Identité de marque (logo, charte graphique), pilotage de la communication digitale et marketing — pour donner à nos clients une présence en ligne à la hauteur de leur logiciel.",
  },
  {
    lettre: "C",
    titre: "Conseil & accompagnement",
    description:
      "Diagnostic et feuille de route de transformation digitale, formation des équipes à l'adoption des outils déployés — nous restons après la livraison.",
  },
];

export default function ServicesPage() {
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
