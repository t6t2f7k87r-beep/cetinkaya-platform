 export default function TransportCard() {
  return (
    <div className="rounded-[32px] border border-zinc-200 bg-white p-8 shadow-xl">

      <h3 className="text-2xl font-black">
        🚛 Nakliye Hesapla
      </h3>

      <div className="mt-6 space-y-4">

        <input
          placeholder="Nereden"
          className="w-full rounded-2xl border border-zinc-200 px-5 py-4 outline-none focus:border-yellow-500"
        />

        <input
          placeholder="Nereye"
          className="w-full rounded-2xl border border-zinc-200 px-5 py-4 outline-none focus:border-yellow-500"
        />

        <button className="w-full rounded-2xl bg-yellow-500 py-4 font-bold text-white transition hover:bg-yellow-600">
          Hesapla
        </button>

      </div>

    </div>
  );
}