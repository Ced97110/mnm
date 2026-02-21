import { NextRequest, NextResponse } from "next/server";

/**
 * Verify the admin secret from request headers.
 * Returns null if authorized, or a 401 NextResponse if not.
 */
export function verifyAdminSecret(request: NextRequest): NextResponse | null {
  const secret = request.headers.get("x-admin-secret");
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminSecret) {
    console.warn("ADMIN_SECRET not set — admin routes are unprotected");
    return null; // Allow access if no secret configured (dev convenience)
  }

  if (!secret || secret !== adminSecret) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  return null; // Authorized
}
