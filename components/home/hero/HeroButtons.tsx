import Link from "next/link";

export default function HeroButtons() {
  return (
    <div className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:flex sm:flex-wrap sm:gap-4 lg:mt-10">

      <Link
        href="/urunler"
        className="interactive-lift flex min-h-14 items-center justify-center rounded-2xl bg-gradient-to-r from-red-700 to-slate-950 px-4 py-3 text-center text-sm font-bold text-white shadow-xl shadow-red-900/20 sm:px-8 sm:py-4 sm:text-lg"
      >
        Ürünleri Keşfet
      </Link>

      <Link
        href="/teklif"
        className="interactive-lift flex min-h-14 items-center justify-center rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-center text-sm font-bold text-slate-900 hover:border-red-700 hover:text-red-700 sm:px-8 sm:py-4 sm:text-lg"
      >
        Fiyat Teklifi Al
      </Link>

    </div>
  );
}
