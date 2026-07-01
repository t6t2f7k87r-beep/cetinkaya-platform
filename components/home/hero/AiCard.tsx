 export default function AiCard() {
  return (
    <div className="rounded-[32px] bg-zinc-900 p-8 text-white shadow-2xl">

      <div className="inline-flex rounded-full bg-yellow-500 px-4 py-2 text-xs font-bold uppercase tracking-wide text-black">
        AI
      </div>

      <h3 className="mt-5 text-3xl font-black">
        Yapı Asistanı
      </h3>

      <p className="mt-5 leading-8 text-zinc-300">
        Yapay zeka ile malzeme önerileri alın, yaklaşık maliyet hesaplayın,
        ürünleri karşılaştırın ve en uygun tedarikçiyi bulun.
      </p>

      <button className="mt-8 rounded-2xl bg-yellow-500 px-6 py-3 font-bold text-black transition hover:bg-yellow-400">
        AI&apos;ı Başlat
      </button>

    </div>
  );
}
