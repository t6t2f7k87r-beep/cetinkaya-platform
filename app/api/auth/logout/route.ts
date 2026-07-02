import { NextResponse } from "next/server";

import { ADMIN_AUTH_COOKIE } from "@/lib/server-auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: ADMIN_AUTH_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
