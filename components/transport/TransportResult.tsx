 export default function TransportResult() {
  return (
    <div className="rounded-[32px] bg-zinc-900 p-8 text-white shadow-2xl">

      <div className="flex items-center justify-between">

        <h3 className="text-3xl font-black">
          Tahmini Sonuç
        </h3>

        <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm font-bold text-green-400">
          Güncel
        </span>

      </div>

      <div className="mt-10 space-y-6">

        <div className="flex items-center justify-between border-b border-zinc-700 pb-4">

          <span className="text-zinc-400">
            Mesafe
          </span>

          <span className="text-xl font-bold">
            1.050 km
          </span>

        </div>

        <div className="flex items-center justify-between border-b border-zinc-700 pb-4">

          <span className="text-zinc-400">
            Yaklaşık Süre
          </span>

          <span className="text-xl font-bold">
            14 Saat
          </span>

        </div>

        <div className="flex items-center justify-between border-b border-zinc-700 pb-4">

          <span className="text-zinc-400">
            Araç
          </span>

          <span className="text-xl font-bold">
            Tır
          </span>

        </div>

        <div className="pt-6">

          <p className="text-zinc-400">
            Tahmini Nakliye Bedeli
          </p>

          <h2 className="mt-3 text-6xl font-black text-yellow-400">
            ₺18.750
          </h2>

        </div>

      </div>

    </div>
  );
}