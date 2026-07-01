import { Truck } from "lucide-react";

export default function TransportCard() {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-xl">

      <h3 className="flex items-center gap-3 text-2xl font-black text-zinc-900">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-700">
          <Truck size={22} />
        </span>
        Nakliye Hesapla
      </h3>

      <div className="mt-5 space-y-3">

        <input
          placeholder="Nereden"
          className="h-11 w-full rounded-2xl border border-zinc-200 px-5 text-base outline-none transition focus:border-yellow-500"
        />

        <input
          placeholder="Nereye"
          className="h-11 w-full rounded-2xl border border-zinc-200 px-5 text-base outline-none transition focus:border-yellow-500"
        />

        <button className="h-11 w-full rounded-2xl bg-yellow-500 font-bold text-white transition hover:bg-yellow-600">
          Hesapla
        </button>

      </div>

    </div>
  );
}
