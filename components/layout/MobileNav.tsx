"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { AUTH_EVENT, endAdminSession, isAdminSessionActive } from "@/lib/auth";

const links = [
  { title: "Anasayfa", href: "/" },
  { title: "Ürünler", href: "/urunler" },
  { title: "Kategoriler", href: "/kategoriler" },
  { title: "Nakliye", href: "/nakliye" },
  { title: "AI Asistan", href: "/ai" },
  { title: "E-Fatura", href: "/efatura" },
  { title: "Admin", href: "/admin" },
  { title: "İletişim", href: "/iletisim" },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const Icon = isOpen ? X : Menu;

  useEffect(() => {
    const syncSession = () => setIsLoggedIn(isAdminSessionActive());

    syncSession();
    window.addEventListener(AUTH_EVENT, syncSession);
    window.addEventListener("storage", syncSession);

    return () => {
      window.removeEventListener(AUTH_EVENT, syncSession);
      window.removeEventListener("storage", syncSession);
    };
  }, []);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="interactive-lift flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-800"
        aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
      >
        <Icon size={22} />
      </button>

      {isOpen ? (
        <div className="mobile-menu-panel absolute left-0 top-24 w-full border-b border-slate-200 bg-white px-4 py-5 shadow-xl shadow-slate-950/10 sm:px-6">
          <nav className="grid gap-2">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-4 py-3 font-bold text-slate-700 transition hover:bg-red-50 hover:text-red-700"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {isLoggedIn ? (
              <button
                type="button"
                onClick={() => {
                  endAdminSession();
                  setIsLoggedIn(false);
                  setIsOpen(false);
                }}
                className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-bold text-slate-700"
              >
                Çıkış
              </button>
            ) : (
              <Link
                href="/giris"
                onClick={() => setIsOpen(false)}
                className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-bold text-slate-700"
              >
                Giriş
              </Link>
            )}

            <Link
              href={isLoggedIn ? "/admin" : "/teklif"}
              onClick={() => setIsOpen(false)}
              className="rounded-xl bg-red-700 px-4 py-3 text-center text-sm font-bold text-white"
            >
              {isLoggedIn ? "Admin Paneli" : "Teklif Al"}
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
