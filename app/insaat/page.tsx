import { Building2, CheckCircle2, Hammer, Truck } from "lucide-react";
import Link from "next/link";

import Navbar from "@/components/layout/Navbar";

const services = [
  {
    icon: Building2,
    title: "Proje malzeme tedariği",
    description:
      "Demir, çimento, gaz beton, tuğla, kireç ve temel yapı kalemlerini proje ihtiyacına göre planlarız.",
  },
  {
    icon: Truck,
    title: "Sevk ve nakliye planı",
    description:
      "Şantiye konumu, tonaj ve araç tipine göre teslimat akışını daha düzenli hale getiririz.",
  },
  {
    icon: Hammer,
    title: "Saha odaklı çözüm",
    description:
      "Malzeme seçimi, teslimat planı ve teklif sürecinde hızlı dönüşle proje ekiplerini destekleriz.",
  },
];

export default function ConstructionPage() {
  return (
    <>
      <Navbar />
      <main className="bg-slate-50">
        <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-20">
          <div className="reveal-up">
            <p className="font-bold uppercase tracking-[0.3em] text-red-700">
              İnşaat
            </p>

            <h1 className="mt-5 text-4xl font-black leading-tight text-slate-950 sm:text-6xl">
              İnşaat projeleri için güçlü malzeme ve lojistik desteği.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Malatya merkezli ekibimizle 10 seneyi aşkın tecrübemizi,
              dijital satış programımız ve hızlı sevk kabiliyetimizle
              birleştiriyoruz.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/teklif"
                className="interactive-lift rounded-2xl bg-red-700 px-6 py-4 text-center font-bold text-white"
              >
                Proje Teklifi Al
              </Link>

              <Link
                href="/projelerimiz"
                className="interactive-lift rounded-2xl border border-slate-200 bg-white px-6 py-4 text-center font-bold text-slate-800"
              >
                Projelerimiz
              </Link>
            </div>
          </div>

          <div className="grid gap-5">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  data-reveal="scale"
                  className="premium-card premium-surface rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-700">
                    <Icon size={24} />
                  </div>

                  <h2 className="mt-5 text-2xl font-black text-slate-950">
                    {service.title}
                  </h2>

                  <p className="mt-3 leading-7 text-slate-600">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="bg-white py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div data-reveal="up" className="premium-card rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/10 lg:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="font-bold uppercase tracking-[0.25em] text-red-300">
                    Çalışma Prensibimiz
                  </p>
                  <h2 className="mt-3 text-3xl font-black">
                    Doğru ürün, hızlı teklif, kontrollü sevk.
                  </h2>
                </div>

                <div className="grid gap-3 text-sm font-bold text-slate-200 sm:grid-cols-3">
                  {["Şeffaf fiyat", "Teslimat planı", "Müşteri memnuniyeti"].map(
                    (item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="text-red-300" size={18} />
                        {item}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
