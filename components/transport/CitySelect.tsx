import { TransportCity } from "@/types/transport";

type Props = {
  label: string;
  placeholder: string;
  cities: TransportCity[];
  value: number;
  onChange: (cityId: number) => void;
};

export default function CitySelect({
  label,
  placeholder,
  cities,
  value,
  onChange,
}: Props) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-zinc-700">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none transition focus:border-red-700"
      >
        <option value={0}>{placeholder}</option>

        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name} · {city.region}
          </option>
        ))}
      </select>
    </div>
  );
}
