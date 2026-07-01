export default function HeroLeft() {
  return (
    <div className="max-w-2xl">

      <div className="inline-flex rounded-full bg-yellow-100 px-4 py-2 text-sm font-bold text-yellow-700">
        🇹🇷 Türkiye&apos;nin En Büyük Dijital Yapı Platformu
      </div>

      <h1 className="mt-8 text-7xl font-black leading-[0.95] tracking-tight text-zinc-900">

        İnşaatın

        <br />

        <span className="text-yellow-500">
          Dijital Merkezi
        </span>

      </h1>

      <p className="mt-8 max-w-xl text-xl leading-9 text-zinc-600">
        Demir, çimento, gaz beton, tuğla, seramik, yalıtım ve
        binlerce yapı malzemesini tek platformdan inceleyin.
        Türkiye&apos;nin her yerine fiyat alın, karşılaştırın ve
        güvenle sipariş verin.
      </p>

      <div className="mt-10 flex gap-4">

        <button className="rounded-2xl bg-yellow-500 px-8 py-4 text-lg font-bold text-white transition hover:scale-105 hover:bg-yellow-600">
          Ürünleri İncele
        </button>

        <button className="rounded-2xl border-2 border-zinc-300 px-8 py-4 text-lg font-bold transition hover:border-yellow-500 hover:text-yellow-600">
          Fiyat Teklifi Al
        </button>

      </div>

      <div className="mt-16 grid grid-cols-3 gap-10">

        <div>

          <h2 className="text-5xl font-black text-zinc-900">
            10.000+
          </h2>

          <p className="mt-2 text-zinc-500">
            Ürün
          </p>

        </div>

        <div>

          <h2 className="text-5xl font-black text-zinc-900">
            500+
          </h2>

          <p className="mt-2 text-zinc-500">
            Tedarikçi
          </p>

        </div>

        <div>

          <h2 className="text-5xl font-black text-zinc-900">
            81
          </h2>

          <p className="mt-2 text-zinc-500">
            İle Teslimat
          </p>

        </div>

      </div>

    </div>
  );
}
