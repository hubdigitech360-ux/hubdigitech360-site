/** Coordonnées à confirmer/compléter par l'utilisateur — volontairement pas inventées. */
export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-10 text-sm text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          <div className="text-base font-bold text-white">HUB DIGITECH360</div>
          <p className="mt-1 max-w-xs text-xs text-slate-500">Éditeur de Performa360 Suite — logiciel de gestion multi-métiers pour les PME et structures camerounaises.</p>
        </div>
        <div className="flex flex-col gap-1 text-xs">
          <span className="font-semibold uppercase tracking-wide text-slate-500">Contact</span>
          <span>contact@hubdigitech360.cm <span className="text-slate-600">(à confirmer)</span></span>
          <span>+237 6XX XXX XXX <span className="text-slate-600">(à confirmer)</span></span>
          <span>Douala, Cameroun</span>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-6xl px-4 text-xs text-slate-600 sm:px-6">
        © {new Date().getFullYear()} Hub Digitech360. Tous droits réservés.
      </div>
    </footer>
  );
}
