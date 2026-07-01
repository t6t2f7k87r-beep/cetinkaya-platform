export default function ProductPagination() {
  return (
    <nav
      aria-label="Ürün sayfaları"
      className="mt-12 flex items-center justify-center gap-2"
    >
      <button className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-500">
        Önceki
      </button>

      <button className="h-12 w-12 rounded-2xl bg-red-700 font-bold text-white">
        1
      </button>

      <button className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-950">
        Sonraki
      </button>
    </nav>
  );
}
