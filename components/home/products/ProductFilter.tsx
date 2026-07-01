export default function ProductFilter() {
  return (
    <div className="flex flex-wrap gap-3">

      <button className="rounded-full bg-yellow-500 px-5 py-2 font-semibold text-white">
        Tümü
      </button>

      <button className="rounded-full border px-5 py-2">
        Demir
      </button>

      <button className="rounded-full border px-5 py-2">
        Çimento
      </button>

      <button className="rounded-full border px-5 py-2">
        Gaz Beton
      </button>

      <button className="rounded-full border px-5 py-2">
        Tuğla
      </button>

    </div>
  );
}