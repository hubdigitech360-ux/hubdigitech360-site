/** Contenu volontairement générique — à enrichir avec de vraies informations (année de création, équipe, parcours) fournies par l'utilisateur plutôt qu'inventées. */
export default function AProposPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">À propos de Hub Digitech360</h1>

      <div className="mt-8 flex flex-col gap-5 text-sm leading-relaxed text-slate-600">
        <p>
          Hub Digitech360 conçoit et exploite <strong>Performa360 Suite</strong>, un logiciel de gestion pensé pour
          les réalités des structures camerounaises — PME, cliniques, cabinets, structures associatives — plutôt
          qu&apos;une adaptation d&apos;un produit conçu ailleurs.
        </p>
        <p>
          Notre approche : un seul logiciel, des modules qui s&apos;activent selon le métier réel de chaque
          structure — pas une suite unique imposée à tous. La paie suit la réglementation camerounaise (CNPS,
          IRPP, CFC...), les paiements en ligne passent par les moyens utilisés localement, et chaque module est
          construit en partant d&apos;un besoin métier concret.
        </p>
        <p>
          Nous accompagnons chaque structure au-delà de la simple mise à disposition du logiciel — de la
          configuration initiale à la formation des équipes, jusqu&apos;au support continu une fois en
          production.
        </p>
      </div>
    </div>
  );
}
