"use client";

import { useTransition } from "react";
import { supprimerPublicationAction } from "@/lib/actions/publications";

export function SupprimerButton({ id, titre }: { id: string; titre: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (confirm(`Supprimer définitivement « ${titre} » ?`)) {
          startTransition(() => supprimerPublicationAction(id));
        }
      }}
      className="text-xs font-semibold text-red-600 hover:underline disabled:opacity-50"
    >
      Supprimer
    </button>
  );
}
