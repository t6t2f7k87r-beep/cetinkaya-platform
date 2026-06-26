import Image from "next/image";
import { ShoppingCart } from "lucide-react";

import { Product } from "@/data/products";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-56 bg-slate-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition duration-500 hover:scale-110"
        />
      </div>

      <CardContent className="space-y-5 p-6">
        <div>
          <span className="text-sm text-yellow-600 font-semibold">
            {product.category}
          </span>

          <h3 className="mt-2 text-xl font-bold">
            {product.title}
          </h3>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">
              Başlangıç Fiyatı
            </p>

            <h2 className="text-3xl font-black">
              ₺{product.price.toLocaleString("tr-TR")}
            </h2>
          </div>

          <Button size="icon">
            <ShoppingCart size={18} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}