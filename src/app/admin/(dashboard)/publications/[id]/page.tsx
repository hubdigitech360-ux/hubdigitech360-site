import { notFound } from "next/navigation";
import { findPublicationById } from "@/lib/repo-publications";
import { modifierPublicationAction } from "@/lib/actions/publications";
import { PublicationForm } from "../PublicationForm";

export default async function ModifierPublicationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const publication = findPublicationById(id);
  if (!publication) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-slate-900">Modifier la publication</h1>
      <PublicationForm action={modifierPublicationAction} publication={publication} />
    </div>
  );
}
