import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { ProductPrice } from "@/data/prices";

interface Props {
  item: ProductPrice;
}

export default function PriceItem({ item }: Props) {
  const positive = item.change >= 0;
  const category =
    item.name.includes("Demir")
      ? "Demir"
      : item.name.includes("Çimento")
        ? "Çimento"
        : item.name.includes("Gaz")
          ? "Gaz Beton"
          : "Tuğla";

  return (
    <Link href={`/urunler?kategori=${encodeURIComponent(category)}`}>
    <Card className="border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/10">
      <CardContent className="space-y-5 p-6">

        <div className="flex items-center justify-between">

          <div>

            <h3 className="font-bold text-slate-950">
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

          <h2 className="text-4xl font-black text-slate-950">
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
    </Link>
  );
}
