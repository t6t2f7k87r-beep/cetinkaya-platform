import ProductSearch from "./ProductSearch";
import ProductFilter from "./ProductFilter";

type Props = {
  activeCategory: string;
  categories: string[];
  query: string;
  resultCount: number;
  onCategoryChange: (category: string) => void;
  onQueryChange: (query: string) => void;
};

export default function ProductToolbar({
  activeCategory,
  categories,
  query,
  resultCount,
  onCategoryChange,
  onQueryChange,
}: Props) {
  return (
    <div className="space-y-6">

      <ProductSearch
        value={query}
        onChange={onQueryChange}
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <ProductFilter
          activeCategory={activeCategory}
          categories={categories}
          onCategoryChange={onCategoryChange}
        />

        <p className="text-sm font-semibold text-slate-500">
          {resultCount} ürün listeleniyor
        </p>
      </div>

    </div>
  );
}
