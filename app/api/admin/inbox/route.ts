import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_AUTH_COOKIE, isValidAdminToken } from "@/lib/server-auth";
import { listAdminInbox } from "@/lib/server-store";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_AUTH_COOKIE)?.value;

  if (!(await isValidAdminToken(token))) {
    return NextResponse.json({ message: "Yetkisiz erişim." }, { status: 401 });
  }

  return NextResponse.json(listAdminInbox());
}
