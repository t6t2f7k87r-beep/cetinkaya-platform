import { TrendingUp } from "lucide-react";
import Link from "next/link";

export default function SteelPriceCard() {
  return (
    <Link
      href="/urunler?kategori=Demir"
      className="block rounded-3xl bg-gradient-to-r from-red-700 to-slate-950 p-6 text-white shadow-2xl shadow-slate-950/20 transition hover:-translate-y-1"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15">
            <TrendingUp size={22} />
          </div>

          <p className="text-xs font-bold uppercase text-white/90 sm:text-sm">
            Güncel Demir
          </p>

          <h2 className="mt-2 text-5xl font-black leading-none">
            ₺32.450
          </h2>

          <p className="mt-2 text-white/90">
            Ton Fiyatı
          </p>

        </div>

        <div className="shrink-0 rounded-full bg-white/15 px-4 py-2 text-sm font-bold">
          +%1.8
        </div>
      </div>
    </Link>
  );
}
