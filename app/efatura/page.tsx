"use client";

import { FileText, Plus, ReceiptText } from "lucide-react";
import { useMemo, useState } from "react";

import Navbar from "@/components/layout/Navbar";
import { getIntegrationSettings, getManagedProducts } from "@/lib/commerce-store";

type InvoiceLine = {
  productId: number;
  quantity: number;
};

function invoiceNumber() {
  const date = new Date();
  const year = date.getFullYear();
  const serial = `${date.getMonth() + 1}${date.getDate()}${date.getHours()}${date.getMinutes()}`;

  return `CTK${year}${serial}`;
}

export default function EInvoicePage() {
  const [products] = useState(() => getManagedProducts());
  const [integrationSettings] = useState(() => getIntegrationSettings());
  const [documentType, setDocumentType] = useState<"efatura" | "earsiv">("efatura");
  const [companyName, setCompanyName] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [taxOffice, setTaxOffice] = useState("");
  const [lines, setLines] = useState<InvoiceLine[]>([
    { productId: products[0].id, quantity: 1 },
  ]);
  const [status, setStatus] = useState("");

  const totals = useMemo(() => {
    const subtotal = lines.reduce((sum, line) => {
      const product = products.find((item) => item.id === line.productId) ?? products[0];
      const quantity = Number.isFinite(line.quantity) ? Math.max(1, line.quantity) : 1;

      return sum + product.price * quantity;
    }, 0);
    const vat = Math.round(subtotal * 0.2);

    return {
      subtotal,
      vat,
      total: subtotal + vat,
    };
  }, [lines]);

  return (
    <>
      <Navbar />

      <main className="bg-slate-50">
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-10 max-w-3xl" data-reveal="up">
            <p className="font-bold uppercase tracking-[0.3em] text-red-700">
              E-Fatura / E-Arşiv
            </p>

            <h1 className="mt-4 text-5xl font-black text-slate-950">
              E-fatura ve e-arşiv taslağı oluştur
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Satış kalemlerini, müşteri vergi bilgisini ve KDV toplamını tek
              ekranda hazırlayın. Admin panelindeki özel entegratör bilgileri
              tamamlandığında aynı akış canlı gönderime hazır olur.
            </p>

            <div className="mt-5 inline-flex rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
              {[
                { value: "efatura", label: "E-Fatura" },
                { value: "earsiv", label: "E-Arşiv" },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setDocumentType(item.value as "efatura" | "earsiv")}
                  className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                    documentType === item.value
                      ? "bg-red-700 text-white"
                      : "text-slate-600 hover:text-red-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
            <section data-reveal="left" className="premium-surface rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-700 text-white">
                <FileText size={28} />
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-3">
                <label className="block md:col-span-3">
                  <span className="text-sm font-bold text-slate-600">
                    Firma Ünvanı
                  </span>
                  <input
                    value={companyName}
                    onChange={(event) => setCompanyName(event.target.value)}
                    className="mt-2 h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none transition focus:border-red-700"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-bold text-slate-600">
                    Vergi No / TCKN
                  </span>
                  <input
                    value={taxNumber}
                    onChange={(event) => setTaxNumber(event.target.value)}
                    className="mt-2 h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none transition focus:border-red-700"
                  />
                </label>

                <label className="block md:col-span-2">
                  <span className="text-sm font-bold text-slate-600">
                    Vergi Dairesi
                  </span>
                  <input
                    value={taxOffice}
                    onChange={(event) => setTaxOffice(event.target.value)}
                    className="mt-2 h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none transition focus:border-red-700"
                  />
                </label>
              </div>

              <div className="mt-8 space-y-4">
                {lines.map((line, index) => (
                  <div
                    key={index}
                    className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_150px]"
                  >
                    <label className="block">
                      <span className="text-sm font-bold text-slate-600">
                        Ürün / Hizmet
                      </span>
                      <select
                        value={line.productId}
                        onChange={(event) => {
                          const value = Number(event.target.value);
                          setLines((current) =>
                            current.map((item, lineIndex) =>
                              lineIndex === index ? { ...item, productId: value } : item,
                            ),
                          );
                        }}
                        className="mt-2 h-14 w-full rounded-2xl border border-slate-200 bg-white px-5 font-semibold outline-none transition focus:border-red-700"
                      >
                        {products.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name} - ₺{product.price.toLocaleString("tr-TR")}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="block">
                      <span className="text-sm font-bold text-slate-600">
                        Miktar
                      </span>
                      <input
                        value={line.quantity}
                        min={1}
                        type="number"
                        onChange={(event) => {
                          const value = Number(event.target.value);
                          setLines((current) =>
                            current.map((item, lineIndex) =>
                              lineIndex === index ? { ...item, quantity: value } : item,
                            ),
                          );
                        }}
                        className="mt-2 h-14 w-full rounded-2xl border border-slate-200 px-5 font-semibold outline-none transition focus:border-red-700"
                      />
                    </label>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setLines((current) => [...current, { productId: products[0].id, quantity: 1 }])}
                className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 font-bold text-slate-700 transition hover:border-red-200 hover:text-red-700"
              >
                <Plus size={18} />
                Kalem Ekle
              </button>
            </section>

            <aside data-reveal="right" className="premium-card premium-surface rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5 lg:p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-700">
                <ReceiptText size={28} />
              </div>

              <h2 className="mt-6 text-2xl font-black text-slate-950">
                Fatura Özeti
              </h2>

              <div className="mt-6 space-y-4 text-slate-600">
                <div className="flex justify-between">
                  <span>Fatura No</span>
                  <strong className="text-slate-950">{invoiceNumber()}</strong>
                </div>

                <div className="flex justify-between">
                  <span>Belge Tipi</span>
                  <strong className="text-slate-950">
                    {documentType === "efatura" ? "E-Fatura" : "E-Arşiv"}
                  </strong>
                </div>

                <div className="flex justify-between">
                  <span>Ara Toplam</span>
                  <strong className="text-slate-950">
                    ₺{totals.subtotal.toLocaleString("tr-TR")}
                  </strong>
                </div>

                <div className="flex justify-between">
                  <span>KDV %20</span>
                  <strong className="text-slate-950">
                    ₺{totals.vat.toLocaleString("tr-TR")}
                  </strong>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <p className="text-sm font-bold uppercase text-slate-500">
                    Genel Toplam
                  </p>
                  <p className="mt-2 text-4xl font-black text-red-700">
                    ₺{totals.total.toLocaleString("tr-TR")}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setStatus(
                    companyName && taxNumber
                      ? `${documentType === "efatura" ? "E-fatura" : "E-arşiv"} taslağı oluşturuldu. ${
                          integrationSettings.status === "hazir"
                            ? "Entegrasyon hazır; canlı gönderim için özel entegratör onayı beklenir."
                            : "Admin panelinden entegratör API bilgileri tamamlanınca gönderim yapılabilir."
                        }`
                      : "Fatura taslağı hazır; gönderim için firma ünvanı ve vergi no ekleyin.",
                  );
                }}
                className="mt-8 h-14 w-full rounded-2xl bg-gradient-to-r from-red-700 to-slate-950 font-bold text-white shadow-xl shadow-red-900/20"
              >
                {documentType === "efatura" ? "E-Fatura" : "E-Arşiv"} Taslağı Oluştur
              </button>

              {status ? (
                <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {status}
                </p>
              ) : null}
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
