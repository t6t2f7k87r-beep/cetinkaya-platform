import { Product } from "@/types/product";
import { ArrowRight, Package } from "lucide-react";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-950/10">

      <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-slate-100 to-red-50">
        <Package size={72} className="text-slate-400" />
      </div>

      <div className="p-6">

        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-700">
          {product.category}
        </span>

        <h3 className="mt-4 text-2xl font-bold text-slate-950">
          {product.name}
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          {product.brand}
        </p>

        <div className="mt-8 flex items-end justify-between">

          <div>
            <p className="text-sm text-slate-500">
              Başlangıç
            </p>

            <p className="text-3xl font-black text-red-700">
              ₺{product.price.toLocaleString("tr-TR")}
            </p>

            <p className="text-sm text-slate-500">
              / {product.unit}
            </p>
          </div>

          <button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white transition group-hover:scale-110 group-hover:bg-red-700">
            <ArrowRight size={20} />
          </button>

        </div>

      </div>

    </article>
  );
}
