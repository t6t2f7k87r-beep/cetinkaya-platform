"use client";

import { useMemo, useState } from "react";
import { CreditCard, FileCheck2, ShieldCheck } from "lucide-react";

import { products } from "@/data/products";
import { createPaymentIntent } from "@/services/payment";
import { PaymentProvider } from "@/types/payment";

const providers: { label: string; value: PaymentProvider }[] = [
  { label: "iyzico", value: "iyzico" },
  { label: "PayTR", value: "paytr" },
  { label: "Stripe", value: "stripe" },
];

export default function CheckoutPanel() {
  const [provider, setProvider] = useState<PaymentProvider>("iyzico");
  const [quantity, setQuantity] = useState(5);
  const selectedProduct = products[0];

  const subtotal = selectedProduct.price * quantity;
  const serviceFee = Math.round(subtotal * 0.015);
  const total = subtotal + serviceFee;

  const intent = useMemo(
    () => createPaymentIntent({ amount: total, provider }),
    [provider, total]
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-700 text-white">
          <FileCheck2 size={28} />
        </div>

        <h1 className="mt-6 text-4xl font-black text-slate-950">
          Teklif ve Ödeme Altyapısı
        </h1>

        <p className="mt-4 leading-8 text-slate-600">
          Bu ekran, teklif oluşturma ve ödeme sağlayıcısına hazır ödeme niyeti
          üretme akışının ilk sürümüdür. Gerçek ödeme için sağlayıcı mağaza/API
          bilgileri eklenecek.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-bold text-slate-600">
              Ürün
            </span>
            <div className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 font-semibold text-slate-950">
              {selectedProduct.name}
            </div>
          </label>

          <label className="block">
            <span className="text-sm font-bold text-slate-600">
              Miktar ({selectedProduct.unit})
            </span>
            <input
              min={1}
              type="number"
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
              className="mt-2 h-14 w-full rounded-2xl border border-slate-200 px-5 font-semibold outline-none transition focus:border-red-700"
            />
          </label>
        </div>

        <div className="mt-8">
          <p className="text-sm font-bold text-slate-600">
            Ödeme sağlayıcısı
          </p>

          <div className="mt-3 flex flex-wrap gap-3">
            {providers.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setProvider(item.value)}
                className={`rounded-2xl px-5 py-3 font-bold transition ${
                  item.value === provider
                    ? "bg-red-700 text-white"
                    : "border border-slate-200 text-slate-700 hover:border-red-200 hover:text-red-700"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-slate-950 p-6 text-white">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-red-300" />
            <h2 className="text-xl font-black">
              Güvenli ödeme niyeti hazır
            </h2>
          </div>

          <p className="mt-4 leading-7 text-slate-300">
            {intent.message}
          </p>

          <p className="mt-4 break-all rounded-2xl bg-white/[0.06] p-4 text-sm text-slate-300">
            {intent.id}
          </p>
        </div>
      </section>

      <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5 lg:p-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-700">
          <CreditCard size={28} />
        </div>

        <h2 className="mt-6 text-2xl font-black text-slate-950">
          Teklif Özeti
        </h2>

        <div className="mt-6 space-y-4">
          <div className="flex justify-between text-slate-600">
            <span>Birim fiyat</span>
            <strong className="text-slate-950">
              ₺{selectedProduct.price.toLocaleString("tr-TR")}
            </strong>
          </div>

          <div className="flex justify-between text-slate-600">
            <span>Miktar</span>
            <strong className="text-slate-950">
              {quantity} {selectedProduct.unit}
            </strong>
          </div>

          <div className="flex justify-between text-slate-600">
            <span>Hizmet bedeli</span>
            <strong className="text-slate-950">
              ₺{serviceFee.toLocaleString("tr-TR")}
            </strong>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <p className="text-sm font-bold uppercase text-slate-500">
              Toplam
            </p>

            <p className="mt-2 text-4xl font-black text-red-700">
              ₺{total.toLocaleString("tr-TR")}
            </p>
          </div>
        </div>

        <button className="mt-8 h-14 w-full rounded-2xl bg-gradient-to-r from-red-700 to-slate-950 font-bold text-white shadow-xl shadow-red-900/20">
          Teklifi Kaydet
        </button>
      </aside>
    </div>
  );
}
