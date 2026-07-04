import { NextResponse } from "next/server";

import { addServerRegistration } from "@/lib/server-store";

export async function POST(request: Request) {
  const body = await request.json();
  const registration = await addServerRegistration({
    companyName: String(body.companyName ?? "").trim(),
    fullName: String(body.fullName ?? "").trim(),
    phone: String(body.phone ?? "").trim(),
    email: String(body.email ?? "").trim(),
    city: String(body.city ?? "").trim() || "Malatya",
    taxNumber: String(body.taxNumber ?? "").trim(),
    need: String(body.need ?? "").trim(),
  });

  return NextResponse.json({ ok: true, registration });
}
