import { getParametres } from "@/lib/repo-parametres";

/**
 * Pas de formulaire d'envoi ici volontairement : un formulaire qui ne
 * déclenche réellement rien (aucun service d'email configuré pour CE
 * projet séparé) serait trompeur. Un simple lien mailto/tél fonctionne
 * immédiatement et honnêtement.
 */
export default async function ContactPage() {
  const p = getParametres(["contact_email", "contact_telephone", "contact_adresse"]);

  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
      <p className="mono text-xs uppercase tracking-wider" style={{ color: "var(--blue)" }}>
        Contact
      </p>
      <h1 className="mt-2 text-3xl text-slate-900">Parlons de votre projet</h1>
      <p className="mt-4 text-sm text-slate-500">
        Une question, une démonstration de Performa360 à organiser, un besoin spécifique ? Écrivez-nous directement.
      </p>

      <div className="mt-10 flex flex-col items-center gap-4">
        <a
          href={`mailto:${p.contact_email}`}
          className="px-6 py-3 text-sm font-semibold text-white"
          style={{ background: "var(--blue)" }}
        >
          {p.contact_email}
        </a>

        <div className="mono mt-4 text-sm text-slate-600">
          <div>{p.contact_telephone}</div>
          <div className="mt-1">{p.contact_adresse}</div>
        </div>
      </div>
    </div>
  );
}
