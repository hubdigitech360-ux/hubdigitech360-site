import { creerPublicationAction } from "@/lib/actions/publications";
import { PublicationForm } from "../PublicationForm";

export default function NouvellePublicationPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-slate-900">Nouvelle publication</h1>
      <PublicationForm action={creerPublicationAction} />
    </div>
  );
}
