"use client";

import { LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Navbar from "@/components/layout/Navbar";
import {
  ADMIN_EMAIL,
  isAdminSessionActive,
  startAdminSession,
  verifyAdminCredentials,
} from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isAdminSessionActive()) {
      router.replace("/admin");
    }
  }, [router]);

  return (
    <>
      <Navbar />
      <main className="bg-slate-50">
        <section className="mx-auto grid min-h-[calc(100svh-96px)] max-w-6xl items-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
          <div className="reveal-scale mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5 sm:p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-700 text-white">
              <LockKeyhole size={28} />
            </div>

            <h1 className="mt-6 text-3xl font-black text-slate-950">
              Satış Programı Girişi
            </h1>

            <p className="mt-3 leading-7 text-slate-600">
              Teklifleri, ürünleri ve müşteri taleplerini yönetmek için
              personel veya bayi hesabınızla giriş yapın.
            </p>

            <form
              className="mt-8 space-y-4"
              onSubmit={async (event) => {
                event.preventDefault();
                setIsSubmitting(true);
                setMessage("");

                const isValid = await verifyAdminCredentials(email, password);

                if (isValid) {
                  startAdminSession();
                  setMessage("Giriş başarılı. Admin paneline yönlendiriliyorsunuz.");
                  router.push("/admin");
                  setIsSubmitting(false);
                  return;
                }

                setMessage("E-posta veya şifre hatalı. Lütfen tekrar deneyin.");
                setIsSubmitting(false);
              }}
            >
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="E-posta"
                type="email"
                autoComplete="email"
                className="h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none transition focus:border-red-700"
              />

              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Şifre"
                type="password"
                autoComplete="current-password"
                className="h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none transition focus:border-red-700"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="h-14 w-full rounded-2xl bg-gradient-to-r from-red-700 to-slate-950 font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Kontrol ediliyor" : "Giriş Yap"}
              </button>

              {message ? (
                <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {message}
                </p>
              ) : null}

              <p className="text-center text-xs font-semibold text-slate-400">
                Yetkili admin: {ADMIN_EMAIL}
              </p>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
