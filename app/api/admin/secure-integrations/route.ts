import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_AUTH_COOKIE, isValidAdminToken } from "@/lib/server-auth";

const requiredKeys = [
  "EINVOICE_PORTAL_URL",
  "EINVOICE_USERNAME",
  "EINVOICE_PASSWORD",
] as const;

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_AUTH_COOKIE)?.value;

  if (!(await isValidAdminToken(token))) {
    return NextResponse.json({ message: "Yetkisiz erişim." }, { status: 401 });
  }

  const missingKeys = requiredKeys.filter((key) => !process.env[key]?.trim());

  return NextResponse.json({
    provider: process.env.EINVOICE_PROVIDER?.trim() || "İzibiz",
    version: process.env.EINVOICE_VERSION?.trim() || "e-Fatura / e-Arşiv v2.1",
    portalUrl: process.env.EINVOICE_PORTAL_URL?.trim() || "",
    username: process.env.EINVOICE_USERNAME?.trim() || "",
    password: process.env.EINVOICE_PASSWORD?.trim() || "",
    configured: missingKeys.length === 0,
    missingKeys,
  });
}
