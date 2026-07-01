export default function ProductFilter() {
  return (
    <div className="flex flex-wrap gap-3">

      <button className="rounded-full bg-red-700 px-5 py-2 font-semibold text-white">
        Tümü
      </button>

      <button className="rounded-full border border-slate-200 px-5 py-2 text-slate-700 transition hover:border-red-200 hover:text-red-700">
        Demir
      </button>

      <button className="rounded-full border border-slate-200 px-5 py-2 text-slate-700 transition hover:border-red-200 hover:text-red-700">
        Çimento
      </button>

      <button className="rounded-full border border-slate-200 px-5 py-2 text-slate-700 transition hover:border-red-200 hover:text-red-700">
        Gaz Beton
      </button>

      <button className="rounded-full border border-slate-200 px-5 py-2 text-slate-700 transition hover:border-red-200 hover:text-red-700">
        Tuğla
      </button>

    </div>
  );
}
