/** Même identité visuelle que Performa360 Suite (gradient sky-400 → blue-700, icône par défaut) pour une cohérence de marque entre le site vitrine et le logiciel. */
export function Logo({ withTagline = true }: { withTagline?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-blue-700 shadow-md shadow-blue-900/40">
        <div className="h-3.5 w-3.5 rounded border-2 border-white bg-slate-900" />
      </div>
      <div>
        <div className="text-base font-bold leading-tight text-white">HUB DIGITECH360</div>
        {withTagline && <div className="text-[10px] tracking-wide text-slate-400">ÉDITEUR DE PERFORMA360 SUITE</div>}
      </div>
    </div>
  );
}
