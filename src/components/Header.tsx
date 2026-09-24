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
    <header className="border-b border-white/10" style={{ background: "var(--navy)" }}>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="order-3 flex w-full flex-wrap items-center gap-5 text-sm font-medium text-slate-300 sm:order-none sm:w-auto sm:gap-7">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          href={APP_URL}
          className="rounded-none px-4 py-2 text-sm font-semibold text-white transition hover:opacity-80"
          style={{ background: "var(--blue)" }}
        >
          Se connecter →
        </a>
      </div>
    </header>
  );
}
