import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { logoutAction } from "@/lib/actions/auth";

const NAV = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/publications", label: "Publications" },
  { href: "/admin/contenu", label: "Textes du site" },
];

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg)" }}>
      <aside className="flex w-56 flex-shrink-0 flex-col gap-1 border-r border-slate-200 bg-white p-4">
        <div className="mb-4 flex items-center gap-2 px-1">
          <img src="/images/logo-hubdigitech360.png" alt="" className="h-7 w-7" />
          <span className="text-sm font-bold text-slate-900">Admin</span>
        </div>
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100"
          >
            {item.label}
          </Link>
        ))}
        <Link href="/" target="_blank" className="mt-4 rounded px-3 py-2 text-xs text-slate-400 hover:bg-slate-100">
          ↗ Voir le site public
        </Link>
        <form action={logoutAction} className="mt-auto">
          <button type="submit" className="w-full rounded px-3 py-2 text-left text-sm text-slate-500 hover:bg-slate-100">
            Se déconnecter
          </button>
        </form>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-3xl">{children}</div>
      </main>
    </div>
  );
}
