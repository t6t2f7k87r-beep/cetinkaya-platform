import CitySelect from "./CitySelect";
import VehicleSelect from "./VehicleSelect";
import TonnageInput from "./TonnageInput";
import { TransportCity, VehicleType } from "@/types/transport";

type Props = {
  cities: TransportCity[];
  vehicles: VehicleType[];
  fromCityId: number;
  toCityId: number;
  vehicleId: number;
  tonnage: number;
  selectedVehicle: VehicleType;
  onFromCityChange: (cityId: number) => void;
  onToCityChange: (cityId: number) => void;
  onVehicleChange: (vehicleId: number) => void;
  onTonnageChange: (tonnage: number) => void;
};

export default function TransportForm({
  cities,
  vehicles,
  fromCityId,
  toCityId,
  vehicleId,
  tonnage,
  selectedVehicle,
  onFromCityChange,
  onToCityChange,
  onVehicleChange,
  onTonnageChange,
}: Props) {
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
          cities={cities}
          value={fromCityId}
          onChange={onFromCityChange}
        />

        <CitySelect
          label="Nereye"
          placeholder="Şehir seçiniz"
          cities={cities}
          value={toCityId}
          onChange={onToCityChange}
        />

        <VehicleSelect
          vehicles={vehicles}
          value={vehicleId}
          onChange={onVehicleChange}
        />

        <TonnageInput
          value={tonnage}
          max={selectedVehicle.capacity}
          onChange={onTonnageChange}
        />

        <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-semibold leading-6 text-red-900">
          Hesaplama; rota mesafesi, araç sınıfı, kapasite ve sefer sayısına göre anlık güncellenir.
        </div>

      </div>
    </div>
  );
}
