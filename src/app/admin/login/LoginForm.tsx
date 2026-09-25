"use client";

import { useActionState } from "react";
import { loginAction, type ActionState } from "@/lib/actions/auth";

const initialState: ActionState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-600">Email</label>
        <input
          name="email"
          type="email"
          required
          autoFocus
          className="rounded-none border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          placeholder="vous@hubdigitech360.cm"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-600">Mot de passe</label>
        <input
          name="motDePasse"
          type="password"
          required
          className="rounded-none border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
        />
      </div>

      {state.error && <div className="bg-red-50 px-3 py-2 text-xs text-red-700">{state.error}</div>}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 py-2 text-sm font-semibold text-white disabled:opacity-60"
        style={{ background: "var(--blue)" }}
      >
        {pending ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
