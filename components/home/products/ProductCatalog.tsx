"use client";

import { useMemo, useState } from "react";

import { products } from "@/data/products";

import CategorySidebar from "./CategorySidebar";
import ProductGrid from "./ProductGrid";
import ProductPagination from "./ProductPagination";
import ProductToolbar from "./ProductToolbar";

export default function ProductCatalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tümü");

  const categories = useMemo(() => {
    return ["Tümü", ...Array.from(new Set(products.map((product) => product.category)))];
  }, []);

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
  }, [category, query]);

  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-[280px_1fr]">
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

        <div className="mt-8">
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
