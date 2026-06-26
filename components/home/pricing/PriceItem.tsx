import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { ProductPrice } from "@/data/prices";

interface Props {
  item: ProductPrice;
}

export default function PriceItem({ item }: Props) {
  const positive = item.change >= 0;

  return (
    <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="space-y-5 p-6">

        <div className="flex items-center justify-between">

          <div>

            <h3 className="font-bold">
              {item.name}
            </h3>

            <p className="text-sm text-slate-500">
              {item.unit}
            </p>

          </div>

          <div
            className={`rounded-xl p-2 ${
              positive
                ? "bg-green-100"
                : "bg-red-100"
            }`}
          >
            {positive ? (
              <ArrowUpRight className="text-green-600" />
            ) : (
              <ArrowDownRight className="text-red-600" />
            )}
          </div>

        </div>

        <div>

          <h2 className="text-4xl font-black">
            ₺{item.price.toLocaleString("tr-TR")}
          </h2>

          <p
            className={`mt-2 font-semibold ${
              positive
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            %{item.change}
          </p>

        </div>

        <p className="text-sm text-slate-400">
          Son Güncelleme {item.updatedAt}
        </p>

      </CardContent>
    </Card>
  );
}