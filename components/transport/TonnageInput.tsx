type Props = {
  value: number;
  max: number;
  onChange: (tonnage: number) => void;
};

export default function TonnageInput({ value, max, onChange }: Props) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label className="block text-sm font-bold text-zinc-700">
          Tonaj
        </label>

        <span className="text-xs font-bold text-slate-500">
          Kapasite: {max} ton
        </span>
      </div>

      <input
        type="number"
        min={1}
        step={0.5}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 outline-none transition focus:border-red-700"
      />
    </div>
  );
}
