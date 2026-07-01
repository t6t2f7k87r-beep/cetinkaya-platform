import { VehicleType } from "@/types/transport";

type Props = {
  vehicles: VehicleType[];
  value: number;
  onChange: (vehicleId: number) => void;
};

export default function VehicleSelect({ vehicles, value, onChange }: Props) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-zinc-700">
        Araç Tipi
      </label>

      <select
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 outline-none transition focus:border-red-700"
      >
        {vehicles.map((vehicle) => (
          <option key={vehicle.id} value={vehicle.id}>
            {vehicle.name} · {vehicle.capacity} ton
          </option>
        ))}
      </select>
    </div>
  );
}
