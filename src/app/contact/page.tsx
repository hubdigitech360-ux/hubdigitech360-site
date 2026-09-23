/**
 * Pas de formulaire d'envoi ici volontairement : un formulaire qui ne
 * déclenche réellement rien (aucun service d'email configuré pour CE
 * projet séparé) serait trompeur. En attendant un choix d'implémentation
 * (ex. réutiliser le même mécanisme Gmail SMTP que Performa360, ou un
 * service tiers), un simple lien mailto/tél fonctionne immédiatement et
 * honnêtement.
 */
export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Contactez-nous</h1>
      <p className="mt-3 text-sm text-slate-500">
        Une question, une démonstration à organiser, un besoin spécifique ? Écrivez-nous directement.
      </p>

      <div className="mt-10 flex flex-col items-center gap-4">
        <a
          href="mailto:contact@hubdigitech360.cm"
          className="rounded-lg bg-gradient-to-br from-sky-400 to-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-900/40 transition hover:opacity-90"
        >
          contact@hubdigitech360.cm
        </a>
        <p className="text-xs text-slate-400">(adresse à confirmer avant mise en ligne)</p>

        <div className="mt-4 text-sm text-slate-600">
          <div>+237 6XX XXX XXX <span className="text-xs text-slate-400">(à confirmer)</span></div>
          <div className="mt-1">Douala, Cameroun</div>
        </div>
      </div>
    </div>
  );
}
