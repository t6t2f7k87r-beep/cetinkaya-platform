export default function SteelPriceCard() {
  return (
    <div className="rounded-[32px] bg-gradient-to-r from-yellow-500 to-amber-500 p-8 text-white shadow-2xl">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-bold uppercase tracking-[0.25em]">
            Güncel Demir

          </p>

          <h2 className="mt-2 text-6xl font-black">
            ₺32.450
          </h2>

          <p className="mt-3 text-white/90">
            Ton Fiyatı
          </p>

        </div>

        <div className="rounded-full bg-white/20 px-4 py-2 text-sm font-bold">
          +%1.8
        </div>

      </div>

    </div>
  );
}