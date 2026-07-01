import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import Navbar from "@/components/layout/Navbar";

const contactItems = [
  {
    icon: Phone,
    title: "Telefon",
    value: "0533 736 67 52",
    href: "tel:+905337366752",
  },
  {
    icon: Mail,
    title: "E-posta",
    value: "cetinkaya.n@outlook.com",
    href: "mailto:cetinkaya.n@outlook.com",
  },
  {
    icon: MapPin,
    title: "Merkez",
    value: "Malatya / Türkiye",
    href: "https://maps.google.com/?q=Malatya",
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
              Malatya merkezli firmamız 10 seneyi aşkın süredir inşaat
              malzemesi satışında hizmet verir. Önceliğimiz her zaman müşteri
              memnuniyeti, doğru ürün ve hızlı geri dönüş.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="tel:+905337366752"
                className="rounded-2xl bg-red-700 px-5 py-3 font-bold text-white shadow-lg shadow-red-900/15 transition hover:bg-red-800"
              >
                Hemen Ara
              </a>

              <a
                href="https://wa.me/905337366752?text=Merhaba,%20inşaat%20malzemesi%20teklifi%20almak%20istiyorum."
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 font-bold text-slate-700 transition hover:border-red-200 hover:text-red-700"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {contactItems.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.title}
                  href={item.href}
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
                </a>
              );
            })}
          </div>

          <form
            action="mailto:cetinkaya.n@outlook.com"
            method="post"
            encType="text/plain"
            className="mt-10 grid gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-2 lg:p-8"
          >
            <label className="block">
              <span className="text-sm font-bold text-slate-600">Ad Soyad</span>
              <input
                name="ad-soyad"
                required
                className="mt-2 h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none transition focus:border-red-700"
              />
            </label>

            <label className="block">
              <span className="text-sm font-bold text-slate-600">Telefon</span>
              <input
                name="telefon"
                required
                className="mt-2 h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none transition focus:border-red-700"
              />
            </label>

            <label className="block lg:col-span-2">
              <span className="text-sm font-bold text-slate-600">Talep</span>
              <textarea
                name="talep"
                rows={5}
                placeholder="İhtiyaç duyduğunuz malzeme, miktar ve teslimat ilini yazın."
                className="mt-2 w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-red-700"
              />
            </label>

            <button className="h-14 rounded-2xl bg-slate-950 px-6 font-bold text-white transition hover:bg-red-700 lg:w-max">
              Talebi Gönder
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
