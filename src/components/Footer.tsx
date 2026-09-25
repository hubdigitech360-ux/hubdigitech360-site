import { getParametres } from "@/lib/repo-parametres";

export async function Footer() {
  const p = getParametres(["contact_email", "contact_telephone", "contact_adresse"]);

  return (
    <footer className="border-t border-white/10 py-10" style={{ background: "var(--navy)" }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          <div className="font-bold text-white">Hub Digitech360</div>
          <p className="mono mt-1 max-w-xs text-xs text-slate-500">Agence Tech, Marketing, Communication &amp; Transformation digitale — Douala, Cameroun.</p>
        </div>
        <div className="mono flex flex-col gap-1 text-xs text-slate-400">
          <span>{p.contact_email}</span>
          <span>{p.contact_telephone}</span>
          <span>{p.contact_adresse}</span>
        </div>
      </div>
      <div className="mono mx-auto mt-8 max-w-6xl px-4 text-xs text-slate-600 sm:px-6">
        © {new Date().getFullYear()} Hub Digitech360.
      </div>
    </footer>
  );
}
