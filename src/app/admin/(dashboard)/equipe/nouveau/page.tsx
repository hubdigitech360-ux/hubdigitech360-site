import { creerMembreEquipeAction } from "@/lib/actions/equipe";
import { MembreForm } from "../MembreForm";

export default function NouveauMembrePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-slate-900">Nouveau membre de l&apos;équipe</h1>
      <MembreForm action={creerMembreEquipeAction} />
    </div>
  );
}
