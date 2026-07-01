export default function VehicleSelect() {
  return (
    <div>

      <label className="mb-2 block text-sm font-bold text-zinc-700">
        Araç Tipi
      </label>

      <select className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4">

        <option>Kamyon</option>
        <option>Tır</option>
        <option>Kırkayak</option>

      </select>

    </div>
  );
}