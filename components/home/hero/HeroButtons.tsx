import Link from "next/link";

export default function HeroButtons() {
  return (
    <div className="mt-8 flex flex-wrap gap-4 lg:mt-10">

      <Link
        href="/urunler"
        className="rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-500 px-6 py-4 text-base font-bold text-white shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl sm:px-8 sm:text-lg"
      >
        Ürünleri Keşfet
      </Link>

      <Link
        href="/teklif"
        className="rounded-2xl border-2 border-zinc-300 bg-white px-6 py-4 text-base font-bold text-zinc-800 transition duration-300 hover:border-yellow-500 hover:text-yellow-600 sm:px-8 sm:text-lg"
      >
        Fiyat Teklifi Al
      </Link>

    </div>
  );
}
