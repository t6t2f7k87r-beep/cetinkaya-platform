import { featuredProducts } from "@/data/products";

const categories = Array.from(
  featuredProducts.reduce<Map<string, number>>((items, product) => {
    items.set(product.category, (items.get(product.category) ?? 0) + 1);
    return items;
  }, new Map())
);

export default function CategorySidebar() {
  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-black text-slate-950">
        Kategoriler
      </h2>

      <div className="mt-5 space-y-2">
        <button className="flex w-full items-center justify-between rounded-2xl bg-red-700 px-4 py-3 text-left font-bold text-white">
          <span>Tüm Ürünler</span>
          <span>{featuredProducts.length}</span>
        </button>

        {categories.map(([category, count]) => (
          <button
            key={category}
            className="flex w-full items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-left font-semibold text-slate-700 transition hover:border-red-200 hover:text-red-700"
          >
            <span>{category}</span>
            <span>{count}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
