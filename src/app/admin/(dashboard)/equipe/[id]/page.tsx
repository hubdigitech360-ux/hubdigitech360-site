import { notFound } from "next/navigation";
import { findMembreEquipeById } from "@/lib/repo-equipe";
import { modifierMembreEquipeAction } from "@/lib/actions/equipe";
import { MembreForm } from "../MembreForm";

export default async function ModifierMembrePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const membre = findMembreEquipeById(id);
  if (!membre) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-slate-900">Modifier le membre</h1>
      <MembreForm action={modifierMembreEquipeAction} membre={membre} />
    </div>
  );
}
