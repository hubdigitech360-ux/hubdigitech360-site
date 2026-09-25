import Link from "next/link";
import { APP_URL } from "@/lib/config";
import { getParametres } from "@/lib/repo-parametres";

const MODULES_PERFORMA360 = [
  "CRM & ventes",
  "RH & paie camerounaise",
  "Trésorerie & comptabilité",
  "Santé",
  "Architecture & BTP",
  "Électronique",
];

export default async function AccueilPage() {
  const p = getParametres([
    "accueil_titre",
    "accueil_soustitre",
    "services_a_titre",
    "services_a_texte",
    "services_b_titre",
    "services_b_texte",
    "services_c_titre",
    "services_c_texte",
  ]);

  const CAPACITES = [
    { lettre: "A", titre: p.services_a_titre, description: p.services_a_texte },
    { lettre: "B", titre: p.services_b_titre, description: p.services_b_texte },
    { lettre: "C", titre: p.services_c_titre, description: p.services_c_texte },
  ];

  return (
    <>
      <section style={{ background: "var(--navy)" }} className="py-24 text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mono text-xs uppercase tracking-wider" style={{ color: "var(--blue)" }}>
            Studio d&apos;ingénierie logicielle — Douala, Cameroun
          </p>
          <h1 className="mt-5 text-4xl leading-tight sm:text-5xl">{p.accueil_titre}</h1>
          <p className="mt-6 max-w-xl text-slate-400">{p.accueil_soustitre}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#performa360" className="px-6 py-3 text-sm font-semibold text-white" style={{ background: "var(--blue)" }}>
              Voir Performa360 →
            </a>
            <Link href="/contact" className="border border-white/20 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/40">
              Discuter d&apos;un projet
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <p className="mono text-xs uppercase tracking-wider" style={{ color: "var(--blue)" }}>
          Ce que nous faisons
        </p>
        <h2 className="mt-2 text-2xl text-slate-900">Une double expertise — ingénierie et communication.</h2>
        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {CAPACITES.map((c) => (
            <div key={c.lettre}>
              <span className="mono text-sm" style={{ color: "var(--blue)" }}>{c.lettre}</span>
              <h3 className="mt-2 text-lg text-slate-900">{c.titre}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{c.description}</p>
            </div>
          ))}
        </div>
        <Link href="/services" className="mt-8 inline-block text-sm font-semibold" style={{ color: "var(--blue)" }}>
          Voir le détail des services →
        </Link>
      </section>

      <section id="performa360" className="border-y border-slate-200 bg-white py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mono text-xs uppercase tracking-wider" style={{ color: "var(--blue)" }}>
              Notre réalisation phare
            </p>
            <h2 className="mt-2 text-2xl text-slate-900 sm:text-3xl">
              Performa360 — un vrai logiciel de gestion multi-métiers, en production.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-slate-500">
              Pas une maquette : une plateforme SaaS multi-structures avec gestion des rôles en cascade, paie
              conforme à la réglementation camerounaise (CNPS, IRPP, CFC), et des modules qui s&apos;activent
              selon le métier réel de chaque structure cliente.
            </p>
            <ul className="mt-6 flex flex-col gap-2">
              {MODULES_PERFORMA360.map((m) => (
                <li key={m} className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="h-1.5 w-1.5 flex-none" style={{ background: "var(--blue)" }} />
                  {m}
                </li>
              ))}
            </ul>
            <a
              href={APP_URL}
              className="mt-8 inline-block px-5 py-2.5 text-sm font-semibold text-white"
              style={{ background: "var(--blue)" }}
            >
              Se connecter à Performa360
            </a>
          </div>
          <div className="border border-slate-800 p-5" style={{ background: "var(--navy)" }}>
            <div className="mono flex items-center justify-between text-[11px] text-slate-500">
              <span>PERFORMA360 — APERÇU</span>
              <span className="flex gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
              </span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-px" style={{ background: "var(--navy-2)" }}>
              {[
                ["CA du mois", "+18%"],
                ["Structures actives", "12"],
                ["Modules déployés", "9"],
              ].map(([label, value]) => (
                <div key={label} className="p-3" style={{ background: "var(--navy)" }}>
                  <div className="text-lg font-bold text-white">{value}</div>
                  <div className="mono text-[10px] uppercase text-slate-500">{label}</div>
                </div>
              ))}
            </div>
            <div className="mono mt-4 text-[11px] text-slate-500">CRM · RH & Paie · Trésorerie · Santé · Architecture</div>
          </div>
        </div>
      </section>

      <section className="py-20 text-center">
        <h2 className="text-2xl text-slate-900">Envie d&apos;en discuter ?</h2>
        <p className="mt-2 text-sm text-slate-500">Parlons de votre besoin — logiciel, communication ou transformation digitale.</p>
        <Link href="/contact" className="mt-6 inline-block px-6 py-3 text-sm font-semibold text-white" style={{ background: "var(--blue)" }}>
          Nous contacter
        </Link>
      </section>
    </>
  );
}
