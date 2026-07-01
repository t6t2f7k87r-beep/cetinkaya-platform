export default function TonnageInput() {
  return (
    <div>

      <label className="mb-2 block text-sm font-bold text-zinc-700">
        Tonaj
      </label>

      <input
        type="number"
        placeholder="24"
        className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4"
      />

    </div>
  );
}