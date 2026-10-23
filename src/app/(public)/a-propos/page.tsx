import { getParametres } from "@/lib/repo-parametres";

export default async function AProposPage() {
  const p = getParametres(["a_propos_texte_1", "a_propos_texte_2", "a_propos_texte_3"]);

  return (
    <>
      <section
        className="relative overflow-hidden bg-cover bg-center py-20 text-white"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(10,20,40,0.92), rgba(10,20,40,0.80)), url('/images/hero-a-propos.jpg')",
        }}
      >
        <div className="relative mx-auto max-w-2xl px-4 sm:px-6">
          <p className="mono text-xs uppercase tracking-wider" style={{ color: "var(--blue)" }}>
            À propos
          </p>
          <h1 className="mt-2 text-3xl" style={{ color: "var(--on-navy)" }}>
            Hub Digitech360
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-5 text-sm leading-relaxed text-slate-600">
          <p>{p.a_propos_texte_1}</p>
          <p>{p.a_propos_texte_2}</p>
          <p>{p.a_propos_texte_3}</p>
        </div>
      </div>
    </>
  );
}
