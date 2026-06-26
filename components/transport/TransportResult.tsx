import {
  Clock3,
  MapPinned,
  Truck,
  Wallet,
} from "lucide-react";

export default function TransportResult() {
  return (
    <div className="rounded-3xl bg-slate-900 p-8 text-white">

      <h3 className="text-2xl font-bold">
        Tahmini Sonuç
      </h3>

      <div className="mt-8 space-y-6">

        <div className="flex items-center gap-4">
          <Truck />

          <div>
            <p className="text-sm text-slate-400">
              Araç
            </p>

            <h4>Tır</h4>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <MapPinned />

          <div>
            <p className="text-sm text-slate-400">
              Mesafe
            </p>

            <h4>742 KM</h4>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Clock3 />

          <div>
            <p className="text-sm text-slate-400">
              Teslim Süresi
            </p>

            <h4>1 Gün</h4>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Wallet />

          <div>
            <p className="text-sm text-slate-400">
              Tahmini Ücret
            </p>

            <h2 className="text-4xl font-black text-yellow-400">
              ₺18.450
            </h2>
          </div>
        </div>

      </div>

    </div>
  );
}