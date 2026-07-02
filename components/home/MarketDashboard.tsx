"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { getManagedProducts, STORE_EVENT } from "@/lib/commerce-store";

const lineColors = ["#b91c1c", "#0f172a", "#2563eb", "#dc2626", "#64748b"];

function formatPrice(value: number) {
  return `₺${value.toLocaleString("tr-TR")}`;
}

export default function MarketDashboard() {
  const [trackedProducts, setTrackedProducts] = useState(() => getManagedProducts());
  const [activeSlug, setActiveSlug] = useState(trackedProducts[0].slug);
  const [tick, setTick] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTick((value) => value + 1);
      setLastUpdated(new Date());
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const refreshProducts = () => {
      const nextProducts = getManagedProducts();
      setTrackedProducts(nextProducts);
      setActiveSlug((current) => nextProducts.some((product) => product.slug === current)
        ? current
        : nextProducts[0].slug);
    };

    window.addEventListener(STORE_EVENT, refreshProducts);
    return () => window.removeEventListener(STORE_EVENT, refreshProducts);
  }, []);

  const liveProducts = useMemo(
    () =>
      trackedProducts.map((product, productIndex) => {
        const wave = Math.sin((tick + productIndex + 1) * 0.75);
        const movement = Math.round(product.price * wave * 0.003);
        const livePrice = Math.max(1, product.price + movement);

        return {
          ...product,
          price: livePrice,
          priceHistory: [
            ...product.priceHistory.slice(0, -1),
            {
              label: "Canlı",
              price: livePrice,
            },
          ],
        };
      }),
    [tick, trackedProducts],
  );

  const liveActiveProduct =
    liveProducts.find((product) => product.slug === activeSlug) ?? liveProducts[0];

  const chartData = useMemo(
    () =>
      liveActiveProduct.priceHistory.map((point, index) => {
        const row: Record<string, string | number> = {
          day: point.label,
        };

        liveProducts.forEach((product) => {
          row[product.slug] = product.priceHistory[index]?.price ?? product.price;
        });

        return row;
      }),
    [liveActiveProduct, liveProducts],
  );

  const firstPrice = liveActiveProduct.priceHistory[0]?.price ?? liveActiveProduct.price;
  const lastPrice =
    liveActiveProduct.priceHistory.at(-1)?.price ?? liveActiveProduct.price;
  const changeRate = ((lastPrice - firstPrice) / firstPrice) * 100;
  const minPrice = Math.min(...liveActiveProduct.priceHistory.map((item) => item.price));
  const maxPrice = Math.max(...liveActiveProduct.priceHistory.map((item) => item.price));

  return (
    <section id="canli-piyasa" className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between" data-reveal="up">
          <div>
            <p className="font-bold uppercase tracking-[0.25em] text-red-700">
              Canlı Piyasa
            </p>

            <h2 className="mt-4 text-4xl font-black text-slate-950 lg:text-5xl">
              Yapı malzemesi fiyat hareketleri
            </h2>
          </div>

          <p className="max-w-xl text-lg leading-8 text-slate-600">
            Günlük fiyat eğilimlerini izleyin, teklif zamanlamasını ve satın alma
            kararlarını daha net planlayın. Son güncelleme:{" "}
            <strong className="text-slate-950">
              {lastUpdated.toLocaleTimeString("tr-TR", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </strong>
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div data-reveal="left" className="premium-surface rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm sm:p-6">
            <div className="mb-6 flex flex-wrap gap-2">
              {liveProducts.map((product) => (
                <button
                  key={product.slug}
                  type="button"
                  onClick={() => setActiveSlug(product.slug)}
                  className={`rounded-full px-4 py-2 text-sm font-black transition ${
                    product.slug === activeSlug
                      ? "bg-red-700 text-white shadow-lg shadow-red-700/20"
                      : "bg-white text-slate-600 hover:text-red-700"
                  }`}
                >
                  {product.category}
                </button>
              ))}
            </div>

            <div className="h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" />
                  <XAxis dataKey="day" stroke="#64748b" />
                  <YAxis
                    stroke="#64748b"
                    width={78}
                    tickFormatter={(value) => `₺${Number(value).toLocaleString("tr-TR")}`}
                  />
                  <Tooltip
                    formatter={(value, name) => [
                      formatPrice(Number(value)),
                      liveProducts.find((product) => product.slug === name)?.category ??
                        name,
                    ]}
                    contentStyle={{
                      border: "1px solid #e2e8f0",
                      borderRadius: "16px",
                      boxShadow: "0 16px 40px rgba(15, 23, 42, 0.12)",
                    }}
                  />
                  {liveProducts.map((product, index) => (
                    <Line
                      key={product.slug}
                      type="monotone"
                      dataKey={product.slug}
                      name={product.category}
                      stroke={lineColors[index % lineColors.length]}
                      strokeWidth={product.slug === activeSlug ? 4 : 2}
                      dot={product.slug === activeSlug}
                      opacity={product.slug === activeSlug ? 1 : 0.35}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid gap-4">
            {[
              {
                label: liveActiveProduct.category,
                value: formatPrice(lastPrice),
                unit: liveActiveProduct.unit,
                change: `${changeRate >= 0 ? "+" : ""}%${changeRate.toFixed(1)}`,
              },
              {
                label: "Haftalık Dip",
                value: formatPrice(minPrice),
                unit: liveActiveProduct.unit,
                change: liveActiveProduct.location,
              },
              {
                label: "Haftalık Tepe",
                value: formatPrice(maxPrice),
                unit: liveActiveProduct.unit,
                change: liveActiveProduct.deliveryTime,
              },
            ].map((item) => (
              <article
                key={item.label}
                data-reveal="right"
                className="premium-card premium-surface rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-500">
                      {item.label}
                    </p>

                    <h3 className="mt-2 text-3xl font-black text-slate-950">
                      {item.value}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      / {item.unit}
                    </p>
                  </div>

                  <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-bold text-red-700">
                    {item.change}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
