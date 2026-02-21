import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSecret } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const unauthorized = verifyAdminSecret(request);
  if (unauthorized) return unauthorized;

  return NextResponse.json({ success: true });
}
