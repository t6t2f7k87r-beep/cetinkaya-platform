import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function AiCard() {
  return (
    <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/25">

      <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase text-red-700">
        <Sparkles size={14} />
        AI
      </div>

      <h3 className="mt-5 text-2xl font-black sm:text-3xl">
        Yapı Asistanı
      </h3>

      <p className="mt-4 text-sm leading-7 text-slate-300">
        Yapay zeka ile malzeme önerileri alın, yaklaşık maliyet hesaplayın,
        ürünleri karşılaştırın ve en uygun tedarikçiyi bulun.
      </p>

      <Link
        href="/ai"
        className="mt-5 inline-flex rounded-2xl bg-red-700 px-6 py-3 font-bold text-white transition hover:bg-red-600"
      >
        AI&apos;ı Başlat
      </Link>

    </div>
  );
}
