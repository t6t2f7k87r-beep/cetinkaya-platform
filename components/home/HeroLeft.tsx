import Link from "next/link";

export default function HeroLeft() {
  return (
    <div className="max-w-2xl">

      <div className="inline-flex rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-700">
        Çetinkaya İnşaat Malzemeleri Satış Programı
      </div>

      <h1 className="mt-8 text-7xl font-black leading-[0.95] tracking-tight text-slate-950">

        Malzeme Satış

        <br />

        <span className="text-red-700">
          Programı
        </span>

      </h1>

      <p className="mt-8 max-w-xl text-xl leading-9 text-zinc-600">
        Demir, çimento, gaz beton, tuğla, seramik, yalıtım ve
        binlerce yapı malzemesini satış kataloğundan inceleyin.
        Türkiye&apos;nin her yerine fiyat alın, karşılaştırın ve
        güvenle sipariş verin.
      </p>

      <div className="mt-10 flex gap-4">

        <Link
          href="/urunler"
          className="rounded-2xl bg-red-700 px-8 py-4 text-lg font-bold text-white transition hover:scale-105 hover:bg-red-800"
        >
          Ürünleri İncele
        </Link>

        <Link
          href="/teklif"
          className="rounded-2xl border-2 border-slate-300 px-8 py-4 text-lg font-bold transition hover:border-red-700 hover:text-red-700"
        >
          Fiyat Teklifi Al
        </Link>

      </div>

      <div className="mt-16 grid grid-cols-3 gap-10">

        <div>

          <h2 className="text-5xl font-black text-slate-950">
            10.000+
          </h2>

          <p className="mt-2 text-slate-500">
            Ürün
          </p>

        </div>

        <div>

          <h2 className="text-5xl font-black text-slate-950">
            500+
          </h2>

          <p className="mt-2 text-slate-500">
            Tedarikçi
          </p>

        </div>

        <div>

          <h2 className="text-5xl font-black text-slate-950">
            81
          </h2>

          <p className="mt-2 text-slate-500">
            İle Teslimat
          </p>

        </div>

      </div>

    </div>
  );
}
