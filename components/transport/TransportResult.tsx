import { TransportResult as Result } from "@/types/transport";

type Props = {
  result: Result | null;
  warning?: string;
  customerName: string;
  customerPhone: string;
  note: string;
  savedMessage?: string;
  onCustomerNameChange: (value: string) => void;
  onCustomerPhoneChange: (value: string) => void;
  onNoteChange: (value: string) => void;
  onSave: () => void;
};

export default function TransportResult({
  result,
  warning,
  customerName,
  customerPhone,
  note,
  savedMessage,
  onCustomerNameChange,
  onCustomerPhoneChange,
  onNoteChange,
  onSave,
}: Props) {
  return (
    <div className="rounded-[32px] bg-slate-950 p-8 text-white shadow-2xl">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-black">
          Tahmini Sonuç
        </h3>

        <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm font-bold text-green-400">
          Güncel
        </span>
      </div>

      {warning ? (
        <div className="mt-8 rounded-2xl border border-red-400/30 bg-red-500/10 p-5 text-red-100">
          {warning}
        </div>
      ) : null}

      {result ? (
        <div className="mt-10 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-sm text-slate-400">
              Güzergâh
            </p>

            <p className="mt-1 text-xl font-black">
              {result.fromName} → {result.toName}
            </p>
          </div>

        <div className="flex items-center justify-between border-b border-slate-700 pb-4">
          <span className="text-slate-400">
            Mesafe
          </span>

          <span className="text-xl font-bold">
            {result.distance.toLocaleString("tr-TR")} km
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-slate-700 pb-4">
          <span className="text-slate-400">
            Yaklaşık Süre
          </span>

          <span className="text-xl font-bold">
            {result.duration}
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-slate-700 pb-4">
          <span className="text-slate-400">
            Araç
          </span>

          <span className="text-xl font-bold">
            {result.vehicleName}
          </span>
        </div>

          <div className="flex items-center justify-between border-b border-slate-700 pb-4">
            <span className="text-slate-400">
              Yük / Sefer
            </span>

            <span className="text-xl font-bold">
              {result.tonnage} ton · {result.trips} sefer
            </span>
          </div>

        <div className="pt-6">
          <p className="text-slate-400">
            Tahmini Nakliye Bedeli
          </p>

          <h2 className="mt-3 text-5xl font-black text-red-400 sm:text-6xl">
            ₺{result.price.toLocaleString("tr-TR")}
          </h2>
        </div>

          <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <input
              value={customerName}
              onChange={(event) => onCustomerNameChange(event.target.value)}
              placeholder="Müşteri / firma adı"
              className="h-12 rounded-xl border border-white/10 bg-white px-4 font-semibold text-slate-950 outline-none"
            />

            <input
              value={customerPhone}
              onChange={(event) => onCustomerPhoneChange(event.target.value)}
              placeholder="Telefon"
              className="h-12 rounded-xl border border-white/10 bg-white px-4 font-semibold text-slate-950 outline-none"
            />

            <textarea
              value={note}
              onChange={(event) => onNoteChange(event.target.value)}
              placeholder="Yük detayı, teslimat notu veya şantiye adresi"
              rows={3}
              className="rounded-xl border border-white/10 bg-white px-4 py-3 font-semibold text-slate-950 outline-none"
            />

            <button
              type="button"
              onClick={onSave}
              className="h-12 rounded-xl bg-red-700 font-black text-white transition hover:bg-red-800"
            >
              Nakliye Teklifini Kaydet
            </button>

            {savedMessage ? (
              <p className="rounded-xl bg-green-500/15 px-4 py-3 text-sm font-bold text-green-200">
                {savedMessage}
              </p>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-slate-300">
          Şehirleri ve yük bilgisini seçtiğinizde yaklaşık mesafe, süre ve bedel burada hesaplanır.
        </div>
      )}

    </div>
  );
}
