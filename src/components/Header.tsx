import Link from "next/link";
import { Logo } from "./Logo";
import { APP_URL } from "@/lib/config";

const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="bg-slate-950">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="order-3 flex w-full flex-wrap items-center gap-4 text-sm font-medium text-slate-300 sm:order-none sm:w-auto sm:gap-6">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          href={APP_URL}
          className="rounded-lg bg-gradient-to-br from-sky-400 to-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-900/40 transition hover:opacity-90"
        >
          Se connecter
        </a>
      </div>
    </header>
  );
}
