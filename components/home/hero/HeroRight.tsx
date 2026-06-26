 import TransportCard from "../TransportCard";
import AiCard from "../AiCard";

export default function HeroRight() {
  return (
    <div className="relative hidden lg:flex items-center justify-end">

      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-yellow-300/20 blur-[120px]" />

      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-amber-400/20 blur-[140px]" />

      <div className="relative w-full max-w-[620px] space-y-6">

        <div className="rounded-[32px] bg-gradient-to-r from-yellow-500 to-amber-500 p-8 text-white shadow-2xl transition duration-300 hover:-translate-y-1">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/90">
            Güncel Demir Fiyatı
          </p>

          <h2 className="mt-2 text-6xl font-black">
            ₺32.450
          </h2>

          <p className="mt-2 text-base text-white/90">
            Son Güncelleme • Bugün 09:30
          </p>

        </div>

        <TransportCard />

        <AiCard />

      </div>

    </div>
  );
}