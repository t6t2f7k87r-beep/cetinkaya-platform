import { NextRequest, NextResponse } from "next/server";

import { ADMIN_AUTH_COOKIE, isValidAdminToken } from "@/lib/server-auth";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get(ADMIN_AUTH_COOKIE)?.value;

  if (await isValidAdminToken(token)) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/giris", request.url);
  loginUrl.searchParams.set("next", request.nextUrl.pathname);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
