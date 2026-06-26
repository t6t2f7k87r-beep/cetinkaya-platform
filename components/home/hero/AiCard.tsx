 export default function AiCard() {
  return (
    <div className="rounded-3xl bg-zinc-900 p-8 text-white shadow-2xl">

      <div className="inline-flex rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-black">
        AI ASİSTAN
      </div>

      <h3 className="mt-6 text-3xl font-black">
        Yapay Zeka Yapı Danışmanı
      </h3>

      <p className="mt-5 leading-8 text-zinc-300">
        Yapı malzemelerini karşılaştırın, yaklaşık maliyet hesaplayın,
        ürün önerileri alın ve en uygun tedarikçiyi saniyeler içinde bulun.
      </p>

      <button className="mt-8 rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black transition hover:bg-yellow-400">
        AI Asistanı Aç
      </button>

    </div>
  );
}