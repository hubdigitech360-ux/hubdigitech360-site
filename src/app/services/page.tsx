import Link from "next/link";

/** Contenu à valider avec l'utilisateur — offre de services indicative, pas une liste tarifaire engageante. */
const SERVICES = [
  {
    titre: "Déploiement de Performa360",
    description: "Mise en place de votre structure sur Performa360 Suite : configuration des modules selon votre métier, import de vos données existantes, création des comptes de votre équipe.",
  },
  {
    titre: "Accompagnement & formation",
    description: "Formation de vos équipes à l'utilisation du logiciel, support pendant la période de prise en main, assistance continue une fois en production.",
  },
  {
    titre: "Développement sur mesure",
    description: "Un besoin métier que Performa360 ne couvre pas encore ? Nous développons de nouveaux modules ou intégrations spécifiques à votre structure.",
  },
  {
    titre: "Intégrations & paiements en ligne",
    description: "Connexion à vos outils existants (email, paiement Mobile Money/carte via CinetPay) pour un logiciel qui s'insère dans votre fonctionnement, pas l'inverse.",
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Nos services</h1>
      <p className="mt-3 text-sm text-slate-500">
        Hub Digitech360 ne se limite pas à fournir un logiciel — nous accompagnons chaque structure de la mise en
        place jusqu&apos;à l&apos;usage quotidien.
      </p>

      <div className="mt-10 flex flex-col gap-6">
        {SERVICES.map((s) => (
          <div key={s.titre} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-slate-900">{s.titre}</h2>
            <p className="mt-2 text-sm text-slate-500">{s.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-sky-200 bg-sky-50 p-6 text-center">
        <p className="text-sm text-slate-700">Une question sur nos offres ou votre besoin spécifique ?</p>
        <Link href="/contact" className="mt-3 inline-block rounded-lg bg-gradient-to-br from-sky-400 to-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-900/40 transition hover:opacity-90">
          Contactez-nous
        </Link>
      </div>
    </div>
  );
}
