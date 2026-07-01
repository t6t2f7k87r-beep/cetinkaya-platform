 import ProductCard from "./products/ProductCard";
import { featuredProducts } from "@/data/products";

export default function FeaturedProducts() {
  return (
    <section className="bg-zinc-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14">
          <span className="font-bold uppercase tracking-[0.3em] text-yellow-500">
            POPÜLER ÜRÜNLER
          </span>

          <h2 className="mt-4 text-5xl font-black text-zinc-900">
            En Çok Tercih Edilenler
          </h2>

          <p className="mt-4 max-w-2xl text-lg text-zinc-500">
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