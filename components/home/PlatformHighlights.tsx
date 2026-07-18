import { BarChart3, BrainCircuit, ShieldCheck, Truck } from "lucide-react";

const highlights = [
  {
    icon: BarChart3,
    title: "Canlı fiyat merkezi",
    href: "/#canli-piyasa",
    description:
      "Demir, çimento, gaz beton ve temel yapı malzemelerinde güncel fiyat takibi.",
  },
  {
    icon: Truck,
    title: "Akıllı nakliye hesabı",
    href: "/nakliye",
    description:
      "Şehir, tonaj ve araç tipine göre hızlı teslimat ve yaklaşık maliyet planı.",
  },
  {
    icon: BrainCircuit,
    title: "AI yapı asistanı",
    href: "/ai",
    description:
      "Malzeme seçimi, yaklaşık metraj ve teklif hazırlığında akıllı yönlendirme.",
  },
  {
    icon: ShieldCheck,
    title: "Müşteri memnuniyeti",
    href: "/iletisim",
    description:
      "10 seneyi aşkın hizmet tecrübesiyle hızlı dönüş, doğru ürün ve güvenilir teslimat.",
  },
];

export default function PlatformHighlights() {
  return (
    <section id="hakkimizda" className="bg-slate-950 py-20 text-white lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="font-bold uppercase tracking-[0.25em] text-red-300">
              Hakkımızda
            </p>

            <h2 className="mt-4 text-4xl font-black leading-tight lg:text-5xl">
              Malatya'dan bölgeye uzanan güvenilir yapı tedarik gücü.
            </h2>
          </div>

          <p className="text-lg leading-8 text-slate-300">
            Malatya merkezli Çetinkayalar İnşaat malzemeleri satış programı, şantiye ihtiyaçlarını hızlandırmak için
            ürün kataloğu, canlı fiyat, lojistik ve yapay zeka destekli teklif
            akışını tek yerde toplar.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/10">
            <p className="font-bold uppercase tracking-[0.25em] text-red-300">
              Vizyonumuz
            </p>

            <h3 className="mt-4 text-2xl font-black">
              Yapı malzemesi satışında hızlı, şeffaf ve dijital bir standart oluşturmak.
            </h3>

            <p className="mt-4 leading-7 text-slate-300">
              Amacımız; ürün, nakliye, teklif ve sevk süreçlerini tek
              merkezden yöneterek müşterilerimize daha doğru fiyat, daha hızlı
              dönüş ve daha güvenilir teslimat sunmak.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/10">
            <p className="font-bold uppercase tracking-[0.25em] text-red-300">
              Yaklaşımımız
            </p>

            <h3 className="mt-4 text-2xl font-black">
              Önceliğimiz müşteri memnuniyeti, doğru ürün ve söz verilen teslimat.
            </h3>

            <p className="mt-4 leading-7 text-slate-300">
              10 seneyi aşkın saha tecrübemizi dijital araçlarla güçlendiriyor;
              demirden çimentoya, gaz betondan nakliyeye kadar her talebi daha
              düzenli ve takip edilebilir hale getiriyoruz.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.title}
                href={item.href}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-red-300/40 hover:bg-white/[0.07]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-700 text-white">
                  <Icon size={24} />
                </div>

                <h3 className="mt-6 text-xl font-black">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-300">
                  {item.description}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
