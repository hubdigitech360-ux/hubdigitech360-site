import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export default async function AdminLoginPage() {
  const admin = await getCurrentAdmin();
  if (admin) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center px-4" style={{ background: "var(--bg)" }}>
      <div className="w-full max-w-sm border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <img src="/images/logo-hubdigitech360.png" alt="Hub Digitech360" className="h-9 w-9" />
          <div>
            <div className="text-sm font-bold text-slate-900">Hub Digitech360</div>
            <div className="mono text-[10px] uppercase tracking-wider text-slate-400">Administration du site</div>
          </div>
        </div>
        <h1 className="mb-1 text-lg font-semibold text-slate-900">Connexion</h1>
        <p className="mb-6 text-sm text-slate-500">Réservé aux administrateurs du site.</p>
        <LoginForm />
      </div>
    </main>
  );
}
