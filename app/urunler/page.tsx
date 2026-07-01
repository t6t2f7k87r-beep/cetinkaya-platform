import CategorySidebar from "@/components/home/products/CategorySidebar";
import ProductGrid from "@/components/home/products/ProductGrid";
import ProductPagination from "@/components/home/products/ProductPagination";
import ProductToolbar from "@/components/home/products/ProductToolbar";
import Navbar from "@/components/layout/Navbar";

export default function ProductsPage() {
  return (
    <>
      <Navbar />

      <main className="bg-zinc-50">
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <p className="font-bold uppercase tracking-[0.3em] text-yellow-500">
              Ürünler
            </p>

            <h1 className="mt-4 text-5xl font-black text-zinc-900">
              Yapı Malzemeleri
            </h1>

            <p className="mt-5 text-lg leading-8 text-zinc-500">
              Demir, çimento, gaz beton ve diğer yapı malzemelerini tek yerden inceleyin.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[280px_1fr]">
            <CategorySidebar />

            <div>
              <ProductToolbar />
              <div className="mt-8">
                <ProductGrid />
              </div>
              <ProductPagination />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
