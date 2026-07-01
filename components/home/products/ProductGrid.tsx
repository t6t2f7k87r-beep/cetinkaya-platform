 import ProductCard from "./ProductCard";
import { featuredProducts } from "@/data/products";

export default function ProductGrid() {
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
      {featuredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}