import ProductSearch from "./ProductSearch";
import ProductFilter from "./ProductFilter";

export default function ProductToolbar() {
  return (
    <div className="space-y-6">

      <ProductSearch />

      <ProductFilter />

    </div>
  );
}