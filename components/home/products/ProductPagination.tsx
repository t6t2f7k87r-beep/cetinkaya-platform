type Props = {
  currentCount: number;
  totalCount: number;
};

export default function ProductPagination({
  currentCount,
  totalCount,
}: Props) {
  return (
    <nav
      aria-label="Ürün sayfaları"
      className="mt-12 flex flex-col items-center justify-center gap-3 text-center sm:flex-row"
    >
      <p className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600">
        {totalCount} ürün içinde {currentCount} ürün gösteriliyor
      </p>
    </nav>
  );
}
