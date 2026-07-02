import { NextResponse } from "next/server";

import {
  ADMIN_AUTH_COOKIE,
  getAdminSessionToken,
  verifyAdminCredentials,
} from "@/lib/server-auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { email?: string; password?: string }
    | null;
  const email = body?.email ?? "";
  const password = body?.password ?? "";

  if (!(await verifyAdminCredentials(email, password))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: ADMIN_AUTH_COOKIE,
    value: await getAdminSessionToken(),
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return response;
}
