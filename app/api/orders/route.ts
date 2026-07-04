import { NextResponse } from "next/server";

import type { SaleRecord } from "@/lib/commerce-store";
import { addServerSale } from "@/lib/server-store";

export async function POST(request: Request) {
  const body = await request.json();
  const sale: SaleRecord = {
    id: `SATIS-${Date.now()}`,
    productId: Number(body.productId ?? 0),
    productName: String(body.productName ?? "Ürün"),
    quantity: Math.max(1, Number(body.quantity ?? 1)),
    unit: String(body.unit ?? "adet"),
    customerName: String(body.customerName ?? "Web müşterisi").trim() || "Web müşterisi",
    customerPhone: String(body.customerPhone ?? "-").trim() || "-",
    total: Math.max(0, Number(body.total ?? 0)),
    createdAt: new Date().toISOString(),
    shipmentId: `WEB-SEVK-${Date.now()}`,
    bundleIds: [],
  };

  await addServerSale(sale);
  return NextResponse.json({ ok: true, sale });
}
