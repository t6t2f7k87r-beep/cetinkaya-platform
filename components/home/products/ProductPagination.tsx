export default function ProductPagination() {
  return (
    <nav
      aria-label="Ürün sayfaları"
      className="mt-12 flex items-center justify-center gap-2"
    >
      <button className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 font-semibold text-zinc-500">
        Önceki
      </button>

      <button className="h-12 w-12 rounded-2xl bg-yellow-500 font-bold text-white">
        1
      </button>

      <button className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 font-semibold text-zinc-900">
        Sonraki
      </button>
    </nav>
  );
}
