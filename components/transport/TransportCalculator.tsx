"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { cities } from "@/data/transport";
import {
  getManagedVehicles,
  recordTransportOrder,
  STORE_EVENT,
} from "@/lib/commerce-store";
import { calculateTransportQuote } from "@/lib/transport";
import TransportForm from "./TransportForm";
import TransportResult from "./TransportResult";

export default function TransportCalculator() {
  const searchParams = useSearchParams();
  const initialFromCity =
    cities.find(
      (city) =>
        city.name.toLocaleLowerCase("tr-TR") ===
          (searchParams.get("nereden") ?? "").toLocaleLowerCase("tr-TR") ||
        ((searchParams.get("nereden") ?? "").toLocaleLowerCase("tr-TR") ===
          "malatya" &&
          city.name === "Malatya Merkez"),
    )?.id ?? 4400;
  const initialToCity =
    cities.find(
      (city) =>
        city.name.toLocaleLowerCase("tr-TR") ===
        (searchParams.get("nereye") ?? "").toLocaleLowerCase("tr-TR"),
    )?.id ?? 6;
  const initialTonnage = Number(searchParams.get("tonaj")) || 24;
  const [fromCityId, setFromCityId] = useState(initialFromCity);
  const [toCityId, setToCityId] = useState(initialToCity);
  const [vehicleId, setVehicleId] = useState(3);
  const [tonnage, setTonnage] = useState(initialTonnage);
  const [vehicles, setVehicles] = useState(() => getManagedVehicles());
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [note, setNote] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const refreshVehicles = () => setVehicles(getManagedVehicles());

    window.addEventListener(STORE_EVENT, refreshVehicles);
    return () => window.removeEventListener(STORE_EVENT, refreshVehicles);
  }, []);

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
        <div className="mb-14" data-reveal="up">
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

        <div className="grid gap-10 lg:grid-cols-2" data-reveal="scale">
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

          <TransportResult
            result={result}
            warning={warning}
            customerName={customerName}
            customerPhone={customerPhone}
            note={note}
            savedMessage={savedMessage}
            onCustomerNameChange={setCustomerName}
            onCustomerPhoneChange={setCustomerPhone}
            onNoteChange={setNote}
            onSave={() => {
              if (!result) {
                return;
              }

              const order = recordTransportOrder({
                result,
                customerName,
                customerPhone,
                note,
              });

              setSavedMessage(`${order.id} kaydedildi. Admin panelinde nakliye kayıtlarına eklendi.`);
            }}
          />
        </div>
      </div>
    </section>
  );
}
