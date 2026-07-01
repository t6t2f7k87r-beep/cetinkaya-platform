import { Product } from "@/types/product";

type Props = {
  activeCategory: string;
  categories: string[];
  products: Product[];
  onCategoryChange: (category: string) => void;
};

function getCategoryCount(products: Product[], category: string) {
  if (category === "Tümü") {
    return products.length;
  }

  return products.filter((product) => product.category === category).length;
}

export default function CategorySidebar({
  activeCategory,
  categories,
  products,
  onCategoryChange,
}: Props) {
  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-black text-slate-950">
        Kategoriler
      </h2>

      <div className="mt-5 space-y-2">
        {categories.map((category) => {
          const active = category === activeCategory;

          return (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left font-semibold transition ${
              active
                ? "bg-red-700 text-white"
                : "border border-slate-200 text-slate-700 hover:border-red-200 hover:text-red-700"
            }`}
          >
            <span>{category === "Tümü" ? "Tüm Ürünler" : category}</span>
            <span>{getCategoryCount(products, category)}</span>
          </button>
          );
        })}
      </div>
    </aside>
  );
}
