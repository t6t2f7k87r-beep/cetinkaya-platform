import Link from "next/link";

export default function HeroButtons() {
  return (
    <div className="mt-8 flex flex-wrap gap-4 lg:mt-10">

      <Link
        href="/urunler"
        className="rounded-2xl bg-gradient-to-r from-red-700 to-slate-950 px-6 py-4 text-base font-bold text-white shadow-xl shadow-red-900/20 transition duration-300 hover:-translate-y-1 hover:shadow-2xl sm:px-8 sm:text-lg"
      >
        Ürünleri Keşfet
      </Link>

      <Link
        href="/teklif"
        className="rounded-2xl border-2 border-slate-200 bg-white px-6 py-4 text-base font-bold text-slate-900 transition duration-300 hover:border-red-700 hover:text-red-700 sm:px-8 sm:text-lg"
      >
        Fiyat Teklifi Al
      </Link>

    </div>
  );
}
