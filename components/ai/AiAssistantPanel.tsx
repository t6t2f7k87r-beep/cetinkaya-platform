"use client";

import { useMemo, useState } from "react";
import { BrainCircuit, Send, Sparkles } from "lucide-react";

import { products } from "@/data/products";

const suggestions = [
  "120 m² kaba inşaat için demir ve çimento öner",
  "Gaz beton ile tuğla maliyetini karşılaştır",
  "İstanbul'dan Ankara'ya 12 ton demir nakliye planı çıkar",
];

function buildAnswer(prompt: string) {
  const normalized = prompt.toLocaleLowerCase("tr-TR");
  const matchedProducts = products.filter((product) =>
    [product.name, product.category, product.description, ...product.tags]
      .join(" ")
      .toLocaleLowerCase("tr-TR")
      .includes(normalized.split(" ")[0] ?? "")
  );

  const recommended = matchedProducts.length > 0 ? matchedProducts : products.slice(0, 3);
  const total = recommended.reduce((sum, product) => sum + product.price, 0);

  return {
    summary:
      "Bu talep için önce stokta olan ana malzemeleri ayırıp, ardından nakliye ve teklif akışını birlikte planlamak en doğru yol olur.",
    products: recommended.slice(0, 3),
    estimatedTotal: total,
    nextStep:
      "Net metraj, teslimat ili ve istenen teslim tarihini eklersen daha kesin teklif senaryosu oluşturabilirim.",
  };
}

export default function AiAssistantPanel() {
  const [prompt, setPrompt] = useState("");
  const [submittedPrompt, setSubmittedPrompt] = useState(suggestions[0]);

  const answer = useMemo(() => buildAnswer(submittedPrompt), [submittedPrompt]);

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-700 text-white">
          <BrainCircuit size={28} />
        </div>

        <h1 className="mt-6 text-4xl font-black text-slate-950">
          AI Yapı Asistanı
        </h1>

        <p className="mt-4 leading-8 text-slate-600">
          Malzeme seçimi, yaklaşık maliyet, nakliye ve teklif hazırlığı için
          akıllı öneriler üretir. Bu sürüm yerel kurallarla çalışır; OpenAI API
          anahtarı eklenince gerçek sohbet motoruna bağlanabilir.
        </p>

        <div className="mt-8 space-y-3">
          {suggestions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setPrompt(item);
                setSubmittedPrompt(item);
              }}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-left font-semibold text-slate-700 transition hover:border-red-200 hover:text-red-700"
            >
              {item}
            </button>
          ))}
        </div>

        <form
          className="mt-8 flex gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            if (prompt.trim().length > 0) {
              setSubmittedPrompt(prompt);
            }
          }}
        >
          <input
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="İhtiyacınızı yazın..."
            className="h-14 min-w-0 flex-1 rounded-2xl border border-slate-200 px-5 outline-none transition focus:border-red-700"
          />

          <button
            type="submit"
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-700 text-white transition hover:bg-red-800"
            aria-label="Gönder"
          >
            <Send size={20} />
          </button>
        </form>
      </section>

      <section className="rounded-3xl bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/20 lg:p-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase text-red-700">
          <Sparkles size={14} />
          Öneri Çıktısı
        </div>

        <h2 className="mt-6 text-2xl font-black">
          {submittedPrompt}
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          {answer.summary}
        </p>

        <div className="mt-6 space-y-3">
          {answer.products.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold">
                    {product.name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    {product.brand} · {product.deliveryTime}
                  </p>
                </div>

                <p className="font-black text-red-300">
                  ₺{product.price.toLocaleString("tr-TR")}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl bg-white p-5 text-slate-950">
          <p className="text-sm font-bold uppercase text-slate-500">
            Yaklaşık sepet göstergesi
          </p>

          <p className="mt-2 text-3xl font-black">
            ₺{answer.estimatedTotal.toLocaleString("tr-TR")}
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            {answer.nextStep}
          </p>
        </div>
      </section>
    </div>
  );
}
