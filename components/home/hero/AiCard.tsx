import { Sparkles } from "lucide-react";

export default function AiCard() {
  return (
    <div className="rounded-3xl bg-zinc-900 p-6 text-white shadow-2xl">

      <div className="inline-flex items-center gap-2 rounded-full bg-yellow-500 px-4 py-2 text-xs font-bold uppercase text-black">
        <Sparkles size={14} />
        AI
      </div>

      <h3 className="mt-5 text-2xl font-black sm:text-3xl">
        Yapı Asistanı
      </h3>

      <p className="mt-4 text-sm leading-7 text-zinc-300">
        Yapay zeka ile malzeme önerileri alın, yaklaşık maliyet hesaplayın,
        ürünleri karşılaştırın ve en uygun tedarikçiyi bulun.
      </p>

      <button className="mt-5 rounded-2xl bg-yellow-500 px-6 py-3 font-bold text-black transition hover:bg-yellow-400">
        AI&apos;ı Başlat
      </button>

    </div>
  );
}
