"use client";

import { Building2, CheckCircle2, UserPlus } from "lucide-react";
import { useState } from "react";

import Navbar from "@/components/layout/Navbar";
import { recordCustomerRegistration } from "@/lib/commerce-store";

export default function RegisterPage() {
  const [companyName, setCompanyName] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Malatya");
  const [taxNumber, setTaxNumber] = useState("");
  const [need, setNeed] = useState("");
  const [status, setStatus] = useState("");

  return (
    <>
      <Navbar />
      <main className="bg-slate-50">
        <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:py-20">
          <div className="reveal-up">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-700 text-white">
              <UserPlus size={28} />
            </div>

            <p className="mt-8 font-bold uppercase tracking-[0.3em] text-red-700">
              Kayıt Ol
            </p>

            <h1 className="mt-4 text-4xl font-black leading-tight text-slate-950 sm:text-6xl">
              Çetinkayalar yapı platformuna firma kaydınızı oluşturun.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Teklif, nakliye, e-fatura/e-arşiv ve stok takibi süreçlerini daha
              düzenli yürütmek için bilgilerinizi bırakın. Ekibimiz talebinizi
              admin panelinden takip edip size dönüş yapar.
            </p>

            <div className="mt-8 grid gap-3 text-sm font-bold text-slate-700">
              {["Hızlı teklif akışı", "Kayıtlı müşteri takibi", "E-fatura hazırlığı"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="text-red-700" size={18} />
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>

          <form
            className="reveal-scale rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5 sm:p-8"
            onSubmit={async (event) => {
              event.preventDefault();
              const payload = {
                companyName,
                fullName,
                phone,
                email,
                city,
                taxNumber,
                need,
              };

              recordCustomerRegistration(payload);
              await fetch("/api/registrations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              });

              setCompanyName("");
              setFullName("");
              setPhone("");
              setEmail("");
              setCity("Malatya");
              setTaxNumber("");
              setNeed("");
              setStatus("Kayıt talebiniz alındı. Ekibimiz en kısa sürede dönüş yapacak.");
            }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-700">
                <Building2 size={24} />
              </div>
              <h2 className="text-2xl font-black text-slate-950">
                Firma Bilgileri
              </h2>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <label className="block md:col-span-2">
                <span className="text-sm font-bold text-slate-600">Firma Ünvanı</span>
                <input
                  value={companyName}
                  required
                  onChange={(event) => setCompanyName(event.target.value)}
                  className="mt-2 h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none transition focus:border-red-700"
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-600">Yetkili Ad Soyad</span>
                <input
                  value={fullName}
                  required
                  onChange={(event) => setFullName(event.target.value)}
                  className="mt-2 h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none transition focus:border-red-700"
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-600">Telefon</span>
                <input
                  value={phone}
                  required
                  onChange={(event) => setPhone(event.target.value)}
                  className="mt-2 h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none transition focus:border-red-700"
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-600">E-posta</span>
                <input
                  value={email}
                  type="email"
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-2 h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none transition focus:border-red-700"
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-600">Şehir</span>
                <input
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  className="mt-2 h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none transition focus:border-red-700"
                />
              </label>

              <label className="block md:col-span-2">
                <span className="text-sm font-bold text-slate-600">Vergi No / TCKN</span>
                <input
                  value={taxNumber}
                  onChange={(event) => setTaxNumber(event.target.value)}
                  className="mt-2 h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none transition focus:border-red-700"
                />
              </label>

              <label className="block md:col-span-2">
                <span className="text-sm font-bold text-slate-600">İhtiyaç / Not</span>
                <textarea
                  value={need}
                  rows={4}
                  onChange={(event) => setNeed(event.target.value)}
                  placeholder="Örn: 12 mm demir, çimento, gaz beton ve Malatya içi sevk planı."
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-red-700"
                />
              </label>
            </div>

            <button className="mt-6 h-14 w-full rounded-2xl bg-gradient-to-r from-red-700 to-slate-950 font-bold text-white shadow-xl shadow-red-900/20">
              Kayıt Talebi Oluştur
            </button>

            {status ? (
              <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {status}
              </p>
            ) : null}
          </form>
        </section>
      </main>
    </>
  );
}
