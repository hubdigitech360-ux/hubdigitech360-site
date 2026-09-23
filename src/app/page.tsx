import Link from "next/link";
import { APP_URL } from "@/lib/config";

const PILIERS = [
  { icon: "◐", titre: "CRM & Ventes", description: "Contacts, factures de vente, paiements en ligne (CinetPay) — le suivi commercial au quotidien." },
  { icon: "🧑‍💼", titre: "RH & Paie", description: "Paie camerounaise conforme (CNPS, IRPP, CFC...), contrats, pointage, congés, recrutement." },
  { icon: "💰", titre: "Trésorerie & Comptabilité", description: "Caisse, comptes, pièces comptables, export SYSCOHADA — un seul circuit, de l'encaissement à la comptabilité." },
  { icon: "⚕", titre: "Santé", description: "Patients, rendez-vous, épisodes de soins, facturation médicale — pour cliniques et cabinets médicaux." },
  { icon: "🏗", titre: "Architecture & BTP", description: "Projets, chantiers, portail client — suivi de chantier avec photos, sans connexion requise pour le client." },
  { icon: "🔧", titre: "Métiers spécialisés", description: "Électronique (SAV, numéros de série), boutique/shopping, cabinets comptables/juridiques/RH — un module par métier." },
];

export default function AccueilPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-slate-950 to-slate-900 py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
            Le logiciel de gestion qui grandit avec votre structure
          </h1>
          <p className="mt-5 text-lg text-slate-300">
            <strong>Performa360 Suite</strong>, conçu par Hub Digitech360, réunit CRM, RH &amp; paie,
            trésorerie et les outils propres à votre métier — dans un seul logiciel, pensé pour les
            réalités camerounaises.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={APP_URL}
              className="rounded-lg bg-gradient-to-br from-sky-400 to-blue-700 px-6 py-3 text-sm font-semibold shadow-md shadow-blue-900/40 transition hover:opacity-90"
            >
              Se connecter à Performa360
            </a>
            <Link
              href="/contact"
              className="rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
            >
              Demander une démo
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-slate-900">Un module pour chaque pilier de votre activité</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-500">
          Chaque structure active uniquement les piliers dont elle a besoin — pas de fonctionnalités payées pour rien.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PILIERS.map((p) => (
            <div key={p.titre} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-2xl">{p.icon}</div>
              <h3 className="mt-3 font-semibold text-slate-900">{p.titre}</h3>
              <p className="mt-2 text-sm text-slate-500">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900">Envie de voir Performa360 en action ?</h2>
          <p className="mt-2 text-sm text-slate-500">Contactez-nous pour une démonstration adaptée à votre métier.</p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-lg bg-gradient-to-br from-sky-400 to-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-900/40 transition hover:opacity-90"
          >
            Nous contacter
          </Link>
        </div>
      </section>
    </>
  );
}
