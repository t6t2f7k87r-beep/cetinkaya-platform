"use client";

import { Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TransportCard() {
  const router = useRouter();
  const [from, setFrom] = useState("Malatya");
  const [to, setTo] = useState("Ankara");

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5">

      <h3 className="flex items-center gap-3 text-2xl font-black text-slate-950">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-50 text-red-700">
          <Truck size={22} />
        </span>
        Nakliye Hesapla
      </h3>

      <form
        className="mt-5 space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          const params = new URLSearchParams({
            nereden: from,
            nereye: to,
            tonaj: "24",
          });

          router.push(`/nakliye?${params.toString()}`);
        }}
      >

        <input
          value={from}
          onChange={(event) => setFrom(event.target.value)}
          placeholder="Nereden"
          className="h-11 w-full rounded-2xl border border-slate-200 px-5 text-base outline-none transition focus:border-red-700"
        />

        <input
          value={to}
          onChange={(event) => setTo(event.target.value)}
          placeholder="Nereye"
          className="h-11 w-full rounded-2xl border border-slate-200 px-5 text-base outline-none transition focus:border-red-700"
        />

        <button
          type="submit"
          className="h-11 w-full rounded-2xl bg-red-700 font-bold text-white transition hover:bg-red-800"
        >
          Hesapla
        </button>

      </form>

    </div>
  );
}
