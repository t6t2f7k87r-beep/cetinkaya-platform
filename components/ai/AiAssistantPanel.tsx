"use client";

import { useEffect, useState } from "react";
import { BrainCircuit, Send, Sparkles } from "lucide-react";

import { AiAnswer, buildLocalAiAnswer } from "@/lib/ai";

const suggestions = [
  "Malatya'dan Ankara'ya 12 ton 12 mm demir nakliye planı çıkar",
  "120 m² kaba inşaat için tuğla, çimento ve kireç öner",
  "10'luk tuğla ile bims maliyetini karşılaştır",
];

export default function AiAssistantPanel() {
  const [prompt, setPrompt] = useState("");
  const [submittedPrompt, setSubmittedPrompt] = useState(suggestions[0]);
  const [answer, setAnswer] = useState<AiAnswer>(() =>
    buildLocalAiAnswer(suggestions[0]),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("local");

  useEffect(() => {
    let isMounted = true;

    async function askAssistant() {
      setIsLoading(true);

      try {
        const response = await fetch("/api/ai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: submittedPrompt }),
        });

        if (!response.ok) {
          throw new Error("AI isteği tamamlanamadı.");
        }

        const data = (await response.json()) as {
          answer: AiAnswer;
          mode: string;
        };

        if (isMounted) {
          setAnswer(data.answer);
          setMode(data.mode);
        }
      } catch {
        if (isMounted) {
          setAnswer(buildLocalAiAnswer(submittedPrompt));
          setMode("local");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    askAssistant();

    return () => {
      isMounted = false;
    };
  }, [submittedPrompt]);

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
          akıllı öneriler üretir. Ürün kataloğu ve nakliye verisini okuyarak
          cevap verir; API anahtarı varsa canlı modele bağlanır.
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
          {isLoading ? "Düşünüyor" : mode === "openai" ? "Canlı AI" : "Akıllı Öneri"}
        </div>

        <h2 className="mt-6 text-2xl font-black">
          {submittedPrompt}
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          {isLoading ? "Talebinizi ürün, stok ve nakliye verileriyle eşleştiriyorum..." : answer.summary}
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
                    {product.brand} · {product.deliveryTime} · Stok:{" "}
                    {product.stockQuantity.toLocaleString("tr-TR")} {product.unit}
                  </p>
                </div>

                <p className="font-black text-red-300">
                  ₺{product.price.toLocaleString("tr-TR")}
                </p>
              </div>
            </div>
          ))}
        </div>

        {answer.transportEstimate ? (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm font-bold uppercase text-slate-400">
              Nakliye Tahmini
            </p>

            <h3 className="mt-2 text-xl font-black">
              {answer.transportEstimate.route}
            </h3>

            <div className="mt-4 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
              <span>{answer.transportEstimate.vehicle}</span>
              <span>{answer.transportEstimate.tonnage} ton</span>
              <span>{answer.transportEstimate.distance} km</span>
              <span>{answer.transportEstimate.duration}</span>
              <span>{answer.transportEstimate.trips} sefer</span>
              <strong className="text-red-300">
                ₺{answer.transportEstimate.price.toLocaleString("tr-TR")}
              </strong>
            </div>
          </div>
        ) : null}

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

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-sm font-bold uppercase text-slate-400">
            Yapılacaklar
          </p>

          <div className="mt-3 space-y-2">
            {answer.actionItems.map((item) => (
              <p key={item} className="text-sm leading-6 text-slate-300">
                • {item}
              </p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
