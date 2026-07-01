"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
  const Icon = isOpen ? X : Menu;

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-800"
        aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
      >
        <Icon size={22} />
      </button>

      {isOpen ? (
        <div className="absolute left-0 top-24 w-full border-b border-slate-200 bg-white px-4 py-5 shadow-xl shadow-slate-950/10 sm:px-6">
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
            <Link
              href="/giris"
              onClick={() => setIsOpen(false)}
              className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-bold text-slate-700"
            >
              Giriş
            </Link>

            <Link
              href="/teklif"
              onClick={() => setIsOpen(false)}
              className="rounded-xl bg-red-700 px-4 py-3 text-center text-sm font-bold text-white"
            >
              Teklif Al
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
