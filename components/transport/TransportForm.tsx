 import CitySelect from "./CitySelect";
import VehicleSelect from "./VehicleSelect";
import TonnageInput from "./TonnageInput";

export default function TransportForm() {
  return (
    <div className="rounded-[32px] bg-white p-8 shadow-xl">

      <h3 className="text-3xl font-black text-slate-950">
        Nakliye Bilgileri
      </h3>

      <p className="mt-2 text-slate-500">
        Bilgileri girin, yaklaşık taşıma maliyetini hesaplayın.
      </p>

      <div className="mt-8 space-y-5">

        <CitySelect
          label="Nereden"
          placeholder="Şehir seçiniz"
        />

        <CitySelect
          label="Nereye"
          placeholder="Şehir seçiniz"
        />

        <VehicleSelect />

        <TonnageInput />

        <button
          className="w-full rounded-2xl bg-gradient-to-r from-red-700 to-slate-950 py-4 text-lg font-bold text-white transition hover:shadow-xl"
        >
          Hesapla
        </button>

      </div>

    </div>
  );
}
