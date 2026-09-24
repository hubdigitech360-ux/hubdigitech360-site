/**
 * Pas de formulaire d'envoi ici volontairement : un formulaire qui ne
 * déclenche réellement rien (aucun service d'email configuré pour CE
 * projet séparé) serait trompeur. Un simple lien mailto/tél fonctionne
 * immédiatement et honnêtement.
 */
export default function ContactPage() {
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
          href="mailto:contact@hubdigitech360.cm"
          className="px-6 py-3 text-sm font-semibold text-white"
          style={{ background: "var(--blue)" }}
        >
          contact@hubdigitech360.cm
        </a>
        <p className="text-xs text-slate-400">(adresse à confirmer avant mise en ligne)</p>

        <div className="mono mt-4 text-sm text-slate-600">
          <div>+237 6XX XXX XXX <span className="text-slate-400">(à confirmer)</span></div>
          <div className="mt-1">Douala, Cameroun</div>
        </div>
      </div>
    </div>
  );
}
