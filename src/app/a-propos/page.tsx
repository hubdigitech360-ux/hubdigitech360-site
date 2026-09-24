/** Contenu volontairement générique — à enrichir avec de vraies informations (année de création, équipe, parcours) fournies par l'utilisateur plutôt qu'inventées. */
export default function AProposPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
      <p className="mono text-xs uppercase tracking-wider" style={{ color: "var(--blue)" }}>
        À propos
      </p>
      <h1 className="mt-2 text-3xl text-slate-900">Hub Digitech360</h1>

      <div className="mt-8 flex flex-col gap-5 text-sm leading-relaxed text-slate-600">
        <p>
          Hub Digitech360 est un studio d&apos;ingénierie logicielle basé à Douala. Nous concevons des systèmes
          pensés pour les réalités des structures camerounaises — PME, cliniques, cabinets, structures
          associatives — plutôt que des adaptations de produits conçus ailleurs.
        </p>
        <p>
          <strong>Performa360</strong>, notre réalisation phare, en est la preuve : une plateforme SaaS
          multi-métiers où chaque structure n&apos;active que les modules dont elle a besoin, avec une paie
          conforme à la réglementation camerounaise et des paiements en ligne adaptés au marché local.
        </p>
        <p>
          Au-delà du logiciel, nous accompagnons chaque structure — de la configuration initiale à la
          formation des équipes, jusqu&apos;au support une fois en production.
        </p>
      </div>
    </div>
  );
}
