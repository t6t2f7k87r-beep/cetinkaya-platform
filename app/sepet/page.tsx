"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import {
  CART_EVENT,
  CartItem,
  getCartItems,
  getCartTotal,
  removeCartItem,
  updateCartItem,
} from "@/lib/cart";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const total = useMemo(() => getCartTotal(items), [items]);

  useEffect(() => {
    const refreshCart = () => setItems(getCartItems());

    refreshCart();
    window.addEventListener(CART_EVENT, refreshCart);
    window.addEventListener("storage", refreshCart);

    return () => {
      window.removeEventListener(CART_EVENT, refreshCart);
      window.removeEventListener("storage", refreshCart);
    };
  }, []);

  return (
    <>
      <Navbar />

      <main className="bg-slate-50">
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-bold uppercase tracking-[0.25em] text-red-700">
                Sepet
              </p>
              <h1 className="mt-3 text-4xl font-black text-slate-950">
                Ürün sepetiniz
              </h1>
              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                Ürünleri burada düzenleyip tek adımda teklif ve ödeme ekranına aktarın.
              </p>
            </div>

            <Link
              href="/urunler"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 font-bold text-slate-700"
            >
              Ürün ekle
            </Link>
          </div>

          {items.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-700">
                <ShoppingCart size={28} />
              </div>
              <h2 className="mt-5 text-2xl font-black text-slate-950">
                Sepetiniz boş
              </h2>
              <p className="mt-3 text-slate-600">
                Ürünlerden sepete ekleyerek teklifinizi oluşturabilirsiniz.
              </p>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
              <section className="space-y-4">
                {items.map((item) => (
                  <article
                    key={item.productId}
                    className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[112px_1fr_auto]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 sm:aspect-square">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>

                    <div className="min-w-0">
                      <h2 className="text-xl font-black text-slate-950">{item.name}</h2>
                      <p className="mt-2 text-sm font-semibold text-slate-500">
                        ₺{item.price.toLocaleString("tr-TR")} / {item.unit}
                      </p>

                      <div className="mt-4 flex w-fit items-center rounded-2xl border border-slate-200 bg-slate-50 p-1">
                        <button
                          type="button"
                          onClick={() => setItems(updateCartItem(item.productId, item.quantity - 1))}
                          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-700"
                          aria-label="Miktarı azalt"
                        >
                          <Minus size={16} />
                        </button>
                        <input
                          value={item.quantity}
                          type="number"
                          min={1}
                          onChange={(event) =>
                            setItems(updateCartItem(item.productId, Number(event.target.value)))
                          }
                          className="h-10 w-20 bg-transparent text-center font-black outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setItems(updateCartItem(item.productId, item.quantity + 1))}
                          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-700"
                          aria-label="Miktarı artır"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                      <strong className="text-xl text-red-700">
                        ₺{(item.price * item.quantity).toLocaleString("tr-TR")}
                      </strong>
                      <button
                        type="button"
                        onClick={() => setItems(removeCartItem(item.productId))}
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:text-red-700"
                        aria-label="Ürünü kaldır"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </article>
                ))}
              </section>

              <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5">
                <h2 className="text-2xl font-black text-slate-950">
                  Sepet özeti
                </h2>
                <div className="mt-5 flex justify-between border-b border-slate-200 pb-4">
                  <span className="font-semibold text-slate-600">Ara toplam</span>
                  <strong className="text-slate-950">
                    ₺{total.toLocaleString("tr-TR")}
                  </strong>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-500">
                  Net ödeme, nakliye ve e-fatura bilgileri teklif ekranında tamamlanır.
                </p>
                <Link
                  href="/teklif?source=cart"
                  className="mt-6 flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-700 to-slate-950 font-bold text-white"
                >
                  Teklife Aktar
                  <ArrowRight size={18} />
                </Link>
              </aside>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
