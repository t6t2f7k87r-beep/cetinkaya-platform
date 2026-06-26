 export default function TransportCard() {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl">

      <div className="mb-6 flex items-center justify-between">

        <h3 className="text-2xl font-bold">
          Nakliye Hesapla
        </h3>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
          AKTİF
        </span>

      </div>

      <div className="space-y-4">

        <input
          placeholder="Nereden"
          className="w-full rounded-xl border border-zinc-200 px-5 py-4 outline-none transition focus:border-yellow-500"
        />

        <input
          placeholder="Nereye"
          className="w-full rounded-xl border border-zinc-200 px-5 py-4 outline-none transition focus:border-yellow-500"
        />

        <button className="w-full rounded-xl bg-yellow-500 py-4 text-lg font-bold text-white transition hover:bg-yellow-600">
          Hesapla
        </button>

      </div>

    </div>
  );
}