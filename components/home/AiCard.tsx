 import { Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export default function AiCard() {
  return (
    <Card className="bg-slate-900 text-white">

      <CardContent className="space-y-5 p-6">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400">

          <Sparkles className="text-slate-900" />

        </div>

        <div>

          <h3 className="text-xl font-bold">
            AI Yapı Asistanı
          </h3>

          <p className="mt-2 text-sm leading-7 text-slate-300">
            "120 m² villa için
            kaç ton demir gerekir?"
          </p>

        </div>

      </CardContent>

    </Card>
  );
}