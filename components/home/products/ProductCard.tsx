import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { Product } from "@/types/product";
import { addToCart } from "@/lib/cart";
import { ArrowRight, MapPin, ShoppingCart, Truck } from "lucide-react";

type Props = {
  product: Product;
  index?: number;
};

export default function ProductCard({ product, index = 0 }: Props) {
  return (
    <article
      data-reveal="scale"
      className="group premium-card premium-surface interactive-lift overflow-hidden rounded-3xl border border-slate-200 bg-white hover:border-red-100 hover:shadow-2xl hover:shadow-slate-950/10"
      style={{ "--reveal-delay": `${Math.min(index, 8) * 70}ms` } as CSSProperties}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-105"
        />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-black uppercase tracking-wide text-red-700 shadow-sm">
            {product.category}
          </span>

          <span className="rounded-full bg-slate-950/90 px-3 py-1 text-xs font-bold text-white shadow-sm">
            Teklif Al
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-slate-950">
          {product.name}
        </h3>

        <p className="mt-2 text-sm font-semibold text-slate-500">
          {product.brand}
        </p>

        <div className="mt-4 grid gap-2 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-red-700" />
            {product.location}
          </div>

          <div className="flex items-center gap-2">
            <Truck size={16} className="text-red-700" />
            {product.deliveryTime}
          </div>
        </div>

        <div className="mt-8 flex items-end justify-between gap-4">
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

          <Link
            href={`/teklif?productId=${product.id}`}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white transition duration-300 group-hover:scale-110 group-hover:bg-red-700"
            aria-label={`${product.name} için teklif al`}
          >
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white text-sm font-bold text-slate-800 transition hover:border-red-200 hover:text-red-700"
          >
            <ShoppingCart size={17} />
            Sepete Ekle
          </button>

          <Link
            href={`/sepet`}
            className="flex h-12 items-center justify-center rounded-2xl bg-red-700 text-sm font-bold text-white transition hover:bg-red-800"
          >
            Sepete Git
          </Link>
        </div>
      </div>
    </article>
  );
}
