import { getParametres } from "@/lib/repo-parametres";

export default async function AProposPage() {
  const p = getParametres(["a_propos_texte_1", "a_propos_texte_2", "a_propos_texte_3"]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
      <p className="mono text-xs uppercase tracking-wider" style={{ color: "var(--blue)" }}>
        À propos
      </p>
      <h1 className="mt-2 text-3xl text-slate-900">Hub Digitech360</h1>

      <div className="mt-8 flex flex-col gap-5 text-sm leading-relaxed text-slate-600">
        <p>{p.a_propos_texte_1}</p>
        <p>{p.a_propos_texte_2}</p>
        <p>{p.a_propos_texte_3}</p>
      </div>
    </div>
  );
}
