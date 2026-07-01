"use client";

import { useEffect, useMemo, useState } from "react";
import { CreditCard, FileCheck2, ShieldCheck } from "lucide-react";

import {
  getManagedProducts,
  recordSale,
  STORE_EVENT,
} from "@/lib/commerce-store";
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
  const [products, setProducts] = useState(() => getManagedProducts());
  const [productId, setProductId] = useState(products[0].id);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [status, setStatus] = useState("");
  const selectedProduct =
    products.find((product) => product.id === productId) ?? products[0];

  useEffect(() => {
    const refreshProducts = () => setProducts(getManagedProducts());

    window.addEventListener(STORE_EVENT, refreshProducts);
    return () => window.removeEventListener(STORE_EVENT, refreshProducts);
  }, []);

  const safeQuantity = Number.isFinite(quantity) ? Math.max(1, quantity) : 1;
  const subtotal = selectedProduct.price * safeQuantity;
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
          Teklif Oluştur
        </h1>

        <p className="mt-4 leading-8 text-slate-600">
          Ürün, miktar ve müşteri bilgilerini seçerek satış teklifini hazırlayın.
          Ödeme sağlayıcısı seçildiğinde sisteme hazır bir ödeme referansı üretilir.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-bold text-slate-600">
              Ürün
            </span>
            <select
              value={productId}
              onChange={(event) => setProductId(Number(event.target.value))}
              className="mt-2 h-14 w-full rounded-2xl border border-slate-200 bg-white px-5 font-semibold text-slate-950 outline-none transition focus:border-red-700"
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} - {product.brand}
                </option>
              ))}
            </select>
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

          <label className="block">
            <span className="text-sm font-bold text-slate-600">
              Müşteri / Firma
            </span>
            <input
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              placeholder="Firma veya müşteri adı"
              className="mt-2 h-14 w-full rounded-2xl border border-slate-200 px-5 font-semibold outline-none transition focus:border-red-700"
            />
          </label>

          <label className="block">
            <span className="text-sm font-bold text-slate-600">
              Telefon
            </span>
            <input
              value={customerPhone}
              onChange={(event) => setCustomerPhone(event.target.value)}
              placeholder="05xx xxx xx xx"
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
              {safeQuantity} {selectedProduct.unit}
            </strong>
          </div>

          <div className="flex justify-between text-slate-600">
            <span>Teslimat</span>
            <strong className="text-right text-slate-950">
              {selectedProduct.deliveryTime}
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

        <button
          type="button"
          onClick={() => {
            const sale = recordSale({
              productId: selectedProduct.id,
              quantity: safeQuantity,
              customerName,
              customerPhone,
              total,
            });

            setProducts(getManagedProducts());
            setStatus(
              `${sale.id} kaydedildi. ${sale.shipmentId} sevk kaydı açıldı${
                sale.bundleIds.length > 0
                  ? `, ${sale.bundleIds.length} demir bağı stoktan düşüldü.`
                  : "."
              }`,
            );
          }}
          className="mt-8 h-14 w-full rounded-2xl bg-gradient-to-r from-red-700 to-slate-950 font-bold text-white shadow-xl shadow-red-900/20"
        >
          Satışı Onayla ve Sevke Düş
        </button>

        {status ? (
          <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {status}
          </p>
        ) : null}
      </aside>
    </div>
  );
}
