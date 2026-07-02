"use client";

import { MessageCircle, Send, X } from "lucide-react";
import { useState } from "react";

type ChatMessage = {
  author: "support" | "user";
  text: string;
};

const quickReplies = [
  "Demir fiyatı almak istiyorum",
  "Nakliye hesabı lazım",
  "E-fatura kesilecek",
];

function buildSupportReply(message: string) {
  const text = message.toLocaleLowerCase("tr-TR");

  if (text.includes("fatura")) {
    return "E-fatura ekranından firma bilgisi, vergi no ve ürün kalemlerini girerek taslak faturanızı oluşturabilirsiniz.";
  }

  if (text.includes("nakliye")) {
    return "Nakliye sekmesinde çıkış, varış, araç ve tonaj seçerek yaklaşık teslimat maliyetini hesaplayabilirsiniz.";
  }

  if (text.includes("demir") || text.includes("fiyat")) {
    return "Demir ve diğer malzeme fiyatlarını Ürünler ve Canlı Piyasa bölümlerinden takip edebilirsiniz. Net teklif için miktar ve teslimat ilini yazmanız yeterli.";
  }

  return "Talebinizi aldık. Satış ekibimiz 0422 336 55 00 veya 0533 736 67 52 üzerinden hızlıca destek verebilir; burada da ürün, nakliye ve fatura sorularınızı yanıtlayabilirim.";
}

export default function LiveSupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      author: "support",
      text: "Merhaba, Çetinkayalar İnşaat canlı destek hattına hoş geldiniz. Ürün, nakliye, teklif ve e-fatura için yardımcı olabilirim.",
    },
  ]);

  function sendMessage(text: string) {
    const cleanText = text.trim();

    if (!cleanText) {
      return;
    }

    setMessages((current) => [
      ...current,
      { author: "user", text: cleanText },
      { author: "support", text: buildSupportReply(cleanText) },
    ]);
    setDraft("");
  }

  return (
    <div className="fixed bottom-5 right-5 z-[70]">
      {isOpen ? (
        <section className="mb-4 w-[min(360px,calc(100vw-40px))] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/20">
          <div className="flex items-center justify-between bg-slate-950 px-5 py-4 text-white">
            <div>
              <p className="font-black">Canlı Destek</p>
              <p className="text-xs text-slate-300">Malatya merkez satış ekibi</p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10"
              aria-label="Canlı desteği kapat"
            >
              <X size={18} />
            </button>
          </div>

          <div className="max-h-80 space-y-3 overflow-y-auto bg-slate-50 p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.author}-${index}`}
                className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                  message.author === "user"
                    ? "ml-10 bg-red-700 text-white"
                    : "mr-10 border border-slate-200 bg-white text-slate-700"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  type="button"
                  onClick={() => sendMessage(reply)}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-bold text-slate-600 transition hover:border-red-200 hover:text-red-700"
                >
                  {reply}
                </button>
              ))}
            </div>

            <form
              className="flex gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage(draft);
              }}
            >
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Mesajınızı yazın..."
                className="h-11 min-w-0 flex-1 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-red-700"
              />

              <button
                type="submit"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-700 text-white"
                aria-label="Mesaj gönder"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-700 text-white shadow-2xl shadow-red-900/30 transition hover:bg-red-800"
        aria-label="Canlı destek"
      >
        <MessageCircle size={25} />
      </button>
    </div>
  );
}
