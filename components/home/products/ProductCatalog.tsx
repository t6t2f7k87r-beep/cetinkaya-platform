"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { getManagedProducts, STORE_EVENT } from "@/lib/commerce-store";

import CategorySidebar from "./CategorySidebar";
import ProductGrid from "./ProductGrid";
import ProductPagination from "./ProductPagination";
import ProductToolbar from "./ProductToolbar";

export default function ProductCatalog() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("kategori") ?? "Tümü";
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [products, setProducts] = useState(() => getManagedProducts());

  useEffect(() => {
    const refreshProducts = () => setProducts(getManagedProducts());

    window.addEventListener(STORE_EVENT, refreshProducts);
    return () => window.removeEventListener(STORE_EVENT, refreshProducts);
  }, []);

  const categories = useMemo(() => {
    return ["Tümü", ...Array.from(new Set(products.map((product) => product.category)))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");

    return products.filter((product) => {
      const categoryMatch = category === "Tümü" || product.category === category;
      const queryMatch =
        normalizedQuery.length === 0 ||
        [
          product.name,
          product.brand,
          product.category,
          product.description,
          product.location,
          ...product.tags,
        ]
          .join(" ")
          .toLocaleLowerCase("tr-TR")
          .includes(normalizedQuery);

      return categoryMatch && queryMatch;
    });
  }, [category, products, query]);

  return (
    <div className="mt-14 grid gap-10 lg:grid-cols-[300px_1fr] xl:gap-12">
      <CategorySidebar
        activeCategory={category}
        categories={categories}
        onCategoryChange={setCategory}
        products={products}
      />

      <div>
        <ProductToolbar
          activeCategory={category}
          categories={categories}
          query={query}
          resultCount={filteredProducts.length}
          onCategoryChange={setCategory}
          onQueryChange={setQuery}
        />

        <div className="mt-10">
          <ProductGrid products={filteredProducts} />
        </div>

        <ProductPagination
          currentCount={filteredProducts.length}
          totalCount={products.length}
        />
      </div>
    </div>
  );
}
