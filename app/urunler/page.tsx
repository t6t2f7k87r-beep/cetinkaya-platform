import { Suspense } from "react";

import ProductCatalog from "@/components/home/products/ProductCatalog";
import Navbar from "@/components/layout/Navbar";

export default function ProductsPage() {
  return (
    <>
      <Navbar />

      <main className="bg-slate-50">
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <p className="font-bold uppercase tracking-[0.3em] text-red-700">
              Ürünler
            </p>

            <h1 className="mt-4 text-5xl font-black text-slate-950">
              Yapı Malzemeleri
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Demir, çimento, gaz beton ve diğer yapı malzemelerini tek yerden inceleyin.
            </p>
          </div>

          <Suspense fallback={<div className="mt-12 text-slate-600">Ürünler yükleniyor...</div>}>
            <ProductCatalog />
          </Suspense>
        </section>
      </main>
    </>
  );
}
