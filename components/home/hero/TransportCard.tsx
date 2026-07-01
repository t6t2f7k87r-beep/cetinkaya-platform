import { Truck } from "lucide-react";

export default function TransportCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5">

      <h3 className="flex items-center gap-3 text-2xl font-black text-slate-950">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-50 text-red-700">
          <Truck size={22} />
        </span>
        Nakliye Hesapla
      </h3>

      <div className="mt-5 space-y-3">

        <input
          placeholder="Nereden"
          className="h-11 w-full rounded-2xl border border-slate-200 px-5 text-base outline-none transition focus:border-red-700"
        />

        <input
          placeholder="Nereye"
          className="h-11 w-full rounded-2xl border border-slate-200 px-5 text-base outline-none transition focus:border-red-700"
        />

        <button className="h-11 w-full rounded-2xl bg-red-700 font-bold text-white transition hover:bg-red-800">
          Hesapla
        </button>

      </div>

    </div>
  );
}
