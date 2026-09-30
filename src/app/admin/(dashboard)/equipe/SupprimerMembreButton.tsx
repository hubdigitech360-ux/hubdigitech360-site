"use client";

import { useTransition } from "react";
import { supprimerMembreEquipeAction } from "@/lib/actions/equipe";

export function SupprimerMembreButton({ id, nom }: { id: string; nom: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (confirm(`Supprimer définitivement « ${nom} » de l'équipe ?`)) {
          startTransition(() => supprimerMembreEquipeAction(id));
        }
      }}
      className="text-xs font-semibold text-red-600 hover:underline disabled:opacity-50"
    >
      Supprimer
    </button>
  );
}
