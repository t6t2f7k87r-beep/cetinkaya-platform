import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_AUTH_COOKIE, isValidAdminToken } from "@/lib/server-auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_AUTH_COOKIE)?.value;

  return NextResponse.json({
    active: await isValidAdminToken(token),
  });
}
