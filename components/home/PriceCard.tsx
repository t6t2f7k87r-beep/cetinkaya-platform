  import { TrendingUp } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export default function PriceCard() {
  return (
    <Card className="overflow-hidden border-0 bg-gradient-to-r from-red-700 to-slate-950">

      <CardContent className="flex items-center justify-between p-8">

        <div>

          <p className="text-sm font-semibold uppercase tracking-widest text-red-100">
            Güncel Demir Fiyatı
          </p>

          <h2 className="mt-3 text-5xl font-black text-white">
            ₺32.450
          </h2>

          <p className="mt-4 text-red-100">
            Son Güncelleme • Bugün 09:30
          </p>

        </div>

        <div className="rounded-3xl bg-white/20 p-5 backdrop-blur">

          <TrendingUp
            size={42}
            className="text-white"
          />

        </div>

      </CardContent>

    </Card>
  );
}
