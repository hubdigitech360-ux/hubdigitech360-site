/** Repère géométrique simple (deux carrés superposés = mise en réseau) plutôt qu'un dégradé générique — identité propre à l'agence, distincte de Performa360. */
export function Logo({ withTagline = true }: { withTagline?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
        <rect x="1" y="1" width="18" height="18" fill="var(--navy)" />
        <rect x="11" y="11" width="18" height="18" fill="var(--blue)" />
      </svg>
      <div>
        <div className="text-base font-bold leading-tight text-white">Hub Digitech360</div>
        {withTagline && <div className="mono text-[10px] uppercase tracking-wider text-slate-400">Studio d&apos;ingénierie — Douala</div>}
      </div>
    </div>
  );
}
