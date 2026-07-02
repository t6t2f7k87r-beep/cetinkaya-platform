"use client";

import { FileText, Home, Menu, MessageCircle, PackageSearch, Phone, Truck, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { AUTH_EVENT, endAdminSession, isAdminSessionActive, syncAdminSession } from "@/lib/auth";

const primaryLinks = [
  { title: "Anasayfa", href: "/", icon: Home },
  { title: "Ürünler", href: "/urunler", icon: PackageSearch },
  { title: "Teklif Al", href: "/teklif", icon: FileText },
  { title: "Nakliye", href: "/nakliye", icon: Truck },
];

const secondaryLinks = [
  { title: "Kategoriler", href: "/kategoriler" },
  { title: "İnşaat", href: "/insaat" },
  { title: "Projelerimiz", href: "/projelerimiz" },
  { title: "AI Asistan", href: "/ai" },
  { title: "E-Fatura", href: "/efatura" },
  { title: "Giriş", href: "/giris" },
  { title: "İletişim", href: "/iletisim" },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const Icon = isOpen ? X : Menu;

  useEffect(() => {
    const syncSession = () => setIsLoggedIn(isAdminSessionActive());

    syncSession();
    void syncAdminSession().then(setIsLoggedIn);
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
        className="interactive-lift flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 shadow-sm"
        aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
      >
        <Icon size={22} />
      </button>

      {isOpen ? (
        <div className="mobile-menu-panel absolute left-0 top-full max-h-[calc(100svh-68px)] w-full overflow-y-auto border-b border-slate-200 bg-white px-4 pb-[calc(20px+env(safe-area-inset-bottom))] pt-4 shadow-xl shadow-slate-950/10 sm:max-h-[calc(100svh-80px)] sm:px-6">
          <div className="rounded-2xl bg-slate-950 p-4 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-200">
              Çetinkayalar İnşaat
            </p>
            <p className="mt-2 text-lg font-black">
              Hızlı teklif, stok ve nakliye işlemleri
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <a
                href="tel:+904223365500"
                className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white/10 px-3 text-sm font-bold"
              >
                <Phone size={17} />
                Ara
              </a>
              <Link
                href="/ai"
                onClick={() => setIsOpen(false)}
                className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-red-700 px-3 text-sm font-bold"
              >
                <MessageCircle size={17} />
                Asistan
              </Link>
            </div>
          </div>

          <nav className="mt-4 grid grid-cols-2 gap-2">
            {primaryLinks.map((item) => {
              const LinkIcon = item.icon;

              return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex min-h-[72px] flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3 font-bold text-slate-800 transition hover:bg-red-50 hover:text-red-700"
              >
                <LinkIcon size={20} className="text-red-700" />
                {item.title}
              </Link>
              );
            })}
          </nav>

          <nav className="mt-4 grid gap-1 rounded-2xl border border-slate-200 p-2">
            {secondaryLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-bold text-slate-700 transition hover:bg-red-50 hover:text-red-700"
              >
                {item.title}
              </Link>
            ))}
            {isLoggedIn ? (
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-bold text-slate-700 transition hover:bg-red-50 hover:text-red-700"
              >
                Admin
              </Link>
            ) : null}
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
                href="/kayit-ol"
                onClick={() => setIsOpen(false)}
                className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-bold text-slate-700"
              >
                Kayıt Ol
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
