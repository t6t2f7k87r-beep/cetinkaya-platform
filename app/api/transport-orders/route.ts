import { NextResponse } from "next/server";

import { TransportOrder } from "@/lib/commerce-store";
import { addServerTransportOrder } from "@/lib/server-store";

export async function POST(request: Request) {
  const body = await request.json();
  const order: TransportOrder = {
    ...body.result,
    id: `NAK-${Date.now()}`,
    customerName: String(body.customerName ?? "Nakliye müşterisi").trim() || "Nakliye müşterisi",
    customerPhone: String(body.customerPhone ?? "-").trim() || "-",
    note: String(body.note ?? "").trim(),
    createdAt: new Date().toISOString(),
    status: "teklif",
  };

  addServerTransportOrder(order);
  return NextResponse.json({ ok: true, order });
}
