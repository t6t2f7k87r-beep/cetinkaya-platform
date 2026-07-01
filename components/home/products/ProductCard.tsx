 import { Product } from "@/types/product";
import { ArrowRight, Package } from "lucide-react";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200">
        <Package size={72} className="text-zinc-400" />
      </div>

      <div className="p-6">

        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-yellow-700">
          {product.category}
        </span>

        <h3 className="mt-4 text-2xl font-bold text-zinc-900">
          {product.name}
        </h3>

        <p className="mt-2 text-sm text-zinc-500">
          {product.brand}
        </p>

        <div className="mt-8 flex items-end justify-between">

          <div>
            <p className="text-sm text-zinc-500">
              Başlangıç
            </p>

            <p className="text-3xl font-black text-yellow-600">
              ₺{product.price.toLocaleString("tr-TR")}
            </p>

            <p className="text-sm text-zinc-500">
              / {product.unit}
            </p>
          </div>

          <button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-500 text-white transition group-hover:scale-110 group-hover:bg-yellow-600">
            <ArrowRight size={20} />
          </button>

        </div>

      </div>

    </article>
  );
}