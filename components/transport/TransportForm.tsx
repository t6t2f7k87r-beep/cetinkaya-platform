"use client";

import { Button } from "@/components/ui/button";

export default function TransportForm() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl">

      <h3 className="text-2xl font-bold">
        Nakliye Bilgileri
      </h3>

      <div className="mt-8 space-y-5">

        <select className="w-full rounded-xl border p-4">
          <option>Çıkış İli</option>
        </select>

        <select className="w-full rounded-xl border p-4">
          <option>Varış İli</option>
        </select>

        <select className="w-full rounded-xl border p-4">
          <option>Araç Tipi</option>
        </select>

        <input
          type="number"
          placeholder="Tonaj"
          className="w-full rounded-xl border p-4"
        />

        <Button className="w-full">
          Hesapla
        </Button>

      </div>

    </div>
  );
}