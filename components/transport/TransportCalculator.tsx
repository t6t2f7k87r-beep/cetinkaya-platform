"use client";

import { useMemo, useState } from "react";

import { cities, vehicles } from "@/data/transport";
import { calculateTransportQuote } from "@/lib/transport";
import TransportForm from "./TransportForm";
import TransportResult from "./TransportResult";

export default function TransportCalculator() {
  const [fromCityId, setFromCityId] = useState(34);
  const [toCityId, setToCityId] = useState(6);
  const [vehicleId, setVehicleId] = useState(3);
  const [tonnage, setTonnage] = useState(24);

  const selectedVehicle =
    vehicles.find((vehicle) => vehicle.id === vehicleId) ?? vehicles[0];
  const fromCity = cities.find((city) => city.id === fromCityId);
  const toCity = cities.find((city) => city.id === toCityId);
  const normalizedTonnage = Number.isFinite(tonnage) ? Math.max(1, tonnage) : 1;

  const result = useMemo(() => {
    if (!fromCity || !toCity || fromCity.id === toCity.id) {
      return null;
    }

    return calculateTransportQuote(
      fromCity,
      toCity,
      selectedVehicle,
      normalizedTonnage,
    );
  }, [fromCity, normalizedTonnage, selectedVehicle, toCity]);

  const warning =
    fromCity && toCity && fromCity.id === toCity.id
      ? "Çıkış ve varış şehirleri aynı olamaz."
      : normalizedTonnage > selectedVehicle.capacity
        ? `${selectedVehicle.name} kapasitesi ${selectedVehicle.capacity} ton. Sistem otomatik ${Math.ceil(
            normalizedTonnage / selectedVehicle.capacity,
          )} sefer hesapladı.`
        : undefined;

  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14">
          <span className="font-bold uppercase tracking-[0.3em] text-red-700">
            NAKLİYE
          </span>

          <h2 className="mt-4 text-5xl font-black text-slate-950">
            Nakliye Hesaplama
          </h2>

          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Güzergâhınızı ve yük miktarınızı girerek yaklaşık taşıma maliyetini öğrenin.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <TransportForm
            cities={cities}
            vehicles={vehicles}
            fromCityId={fromCityId}
            toCityId={toCityId}
            vehicleId={vehicleId}
            tonnage={normalizedTonnage}
            selectedVehicle={selectedVehicle}
            onFromCityChange={setFromCityId}
            onToCityChange={setToCityId}
            onVehicleChange={setVehicleId}
            onTonnageChange={setTonnage}
          />

          <TransportResult result={result} warning={warning} />
        </div>
      </div>
    </section>
  );
}
