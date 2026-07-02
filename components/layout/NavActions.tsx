"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { AUTH_EVENT, endAdminSession, isAdminSessionActive } from "@/lib/auth";

export default function NavActions() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    <div className="hidden lg:flex items-center gap-4">
      {isLoggedIn ? (
        <>
          <Link
            href="/admin"
            className="text-sm font-semibold text-slate-700 transition hover:text-red-700"
          >
            Admin Paneli
          </Link>

          <button
            type="button"
            onClick={() => {
              endAdminSession();
              setIsLoggedIn(false);
            }}
            className="text-sm font-semibold text-slate-500 transition hover:text-red-700"
          >
            Çıkış
          </button>
        </>
      ) : (
        <Link
          href="/giris"
          className="text-sm font-semibold text-slate-700 transition hover:text-red-700"
        >
          Giriş Yap
        </Link>
      )}

      <Link
        href="/teklif"
        className="rounded-xl bg-red-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-900/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-800 hover:shadow-xl"
      >
        Teklif Al
      </Link>
    </div>
  );
}
