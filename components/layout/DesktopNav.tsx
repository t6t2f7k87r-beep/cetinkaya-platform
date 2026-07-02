"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { AUTH_EVENT, isAdminSessionActive } from "@/lib/auth";

const links = [
  {
    title: "Anasayfa",
    href: "/",
  },
  {
    title: "Ürünler",
    href: "/urunler",
  },
  {
    title: "Kategoriler",
    href: "/kategoriler",
  },
  {
    title: "İnşaat",
    href: "/insaat",
  },
  {
    title: "Projelerimiz",
    href: "/projelerimiz",
  },
  {
    title: "Nakliye",
    href: "/nakliye",
  },
  {
    title: "AI Asistan",
    href: "/ai",
  },
  {
    title: "E-Fatura",
    href: "/efatura",
  },
  {
    title: "İletişim",
    href: "/iletisim",
  },
];

export default function DesktopNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const visibleLinks = isLoggedIn
    ? [...links, { title: "Admin", href: "/admin" }]
    : links;

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
    <nav className="hidden max-w-[560px] flex-wrap items-center justify-center gap-x-5 gap-y-3 lg:flex xl:max-w-none xl:gap-x-7">
      {visibleLinks.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group relative rounded-full px-1 py-1 text-[14px] font-semibold text-slate-700 transition-all duration-300 hover:text-red-700 xl:text-[15px]"
        >
          {item.title}

          <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-red-700 transition-all duration-300 group-hover:w-full" />
        </Link>
      ))}
    </nav>
  );
}
