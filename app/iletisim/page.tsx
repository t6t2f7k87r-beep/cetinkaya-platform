import { Mail, MapPin, Phone } from "lucide-react";

import Navbar from "@/components/layout/Navbar";

const contactItems = [
  {
    icon: Phone,
    title: "Telefon",
    value: "+90 212 000 00 00",
  },
  {
    icon: Mail,
    title: "E-posta",
    value: "teklif@cetinkayayapi.com",
  },
  {
    icon: MapPin,
    title: "Merkez",
    value: "İstanbul / Türkiye",
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="bg-slate-50">
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="font-bold uppercase tracking-[0.3em] text-red-700">
              İletişim
            </p>

            <h1 className="mt-4 text-5xl font-black text-slate-950">
              Projeniz için hızlı teklif ve danışmanlık alın.
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Ürün, nakliye, ödeme ve tedarik sorularınız için Çetinkaya Yapı
              ekibiyle iletişime geçin.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {contactItems.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-700">
                    <Icon size={24} />
                  </div>

                  <h2 className="mt-6 text-xl font-black text-slate-950">
                    {item.title}
                  </h2>

                  <p className="mt-2 text-slate-600">
                    {item.value}
                  </p>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
