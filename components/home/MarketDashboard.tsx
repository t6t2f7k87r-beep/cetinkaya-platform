"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { marketStats, marketTrend } from "@/data/market";

export default function MarketDashboard() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
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
            kararlarını daha net planlayın.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm sm:p-6">
            <div className="h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={marketTrend}>
                  <defs>
                    <linearGradient id="demirGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#b91c1c" stopOpacity={0.28} />
                      <stop offset="95%" stopColor="#b91c1c" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" />
                  <XAxis dataKey="day" stroke="#64748b" />
                  <YAxis stroke="#64748b" width={70} />
                  <Tooltip
                    contentStyle={{
                      border: "1px solid #e2e8f0",
                      borderRadius: "16px",
                      boxShadow: "0 16px 40px rgba(15, 23, 42, 0.12)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="demir"
                    name="Demir"
                    stroke="#b91c1c"
                    strokeWidth={3}
                    fill="url(#demirGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid gap-4">
            {marketStats.map((item) => (
              <article
                key={item.label}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
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
