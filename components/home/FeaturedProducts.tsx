"use client";

import { useEffect, useState } from "react";

import { getManagedProducts, STORE_EVENT } from "@/lib/commerce-store";
import ProductCard from "./products/ProductCard";

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState(() =>
    getManagedProducts(),
  );

  useEffect(() => {
    const refreshProducts = () => setFeaturedProducts(getManagedProducts());

    window.addEventListener(STORE_EVENT, refreshProducts);
    return () => window.removeEventListener(STORE_EVENT, refreshProducts);
  }, []);

  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14">
          <span className="font-bold uppercase tracking-[0.3em] text-red-700">
            POPÜLER ÜRÜNLER
          </span>

          <h2 className="mt-4 text-5xl font-black text-slate-950">
            En Çok Tercih Edilenler
          </h2>

          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            En çok tercih edilen yapı malzemeleri.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
