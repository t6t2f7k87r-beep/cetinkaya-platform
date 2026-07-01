type Props = {
  label: string;
  placeholder: string;
};

export default function CitySelect({
  label,
  placeholder,
}: Props) {
  return (
    <div>

      <label className="mb-2 block text-sm font-bold text-zinc-700">
        {label}
      </label>

      <select className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 outline-none focus:border-yellow-500">

        <option>{placeholder}</option>

        <option>Malatya</option>
        <option>İstanbul</option>
        <option>Ankara</option>
        <option>İzmir</option>
        <option>Gaziantep</option>
        <option>Adana</option>

      </select>

    </div>
  );
}