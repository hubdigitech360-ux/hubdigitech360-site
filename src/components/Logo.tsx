export function Logo({ withTagline = true }: { withTagline?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <img src="/images/logo-hubdigitech360.png" alt="Hub Digitech360" width={30} height={30} className="h-[30px] w-[30px] flex-shrink-0" />
      <div>
        <div className="text-base font-bold leading-tight text-white">Hub Digitech360</div>
        {withTagline && <div className="mono text-[10px] uppercase tracking-wider text-slate-400">Agence Tech &amp; Communication — Douala</div>}
      </div>
    </div>
  );
}
