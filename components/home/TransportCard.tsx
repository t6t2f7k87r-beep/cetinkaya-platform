 import { ArrowRight, Truck } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TransportCard() {
  return (
    <Card className="group overflow-hidden">

      <CardContent className="space-y-5 p-6">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-100">
          <Truck className="text-yellow-600" />
        </div>

        <div>

          <h3 className="text-xl font-bold">
            Nakliye Hesapla
          </h3>

          <p className="mt-2 text-sm leading-7 text-slate-500">
            Gideceği ili seç, tonajı belirle,
            anında fiyatını öğren.
          </p>

        </div>

        <Button
          className="w-full justify-between"
          variant="secondary"
        >
          Hesaplamaya Git

          <ArrowRight size={18} />
        </Button>

      </CardContent>

    </Card>
  );
}