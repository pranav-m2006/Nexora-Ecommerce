import { NextResponse } from "next/server";
import { adminRepo } from "@/lib/backend/db";
import { requireAdmin } from "@/lib/backend/auth-service";

export async function GET(request: Request) {
  try {
    await requireAdmin(request);
    const analytics = await adminRepo.getAnalytics();
    return NextResponse.json({ success: true, analytics });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch analytics" },
      { status: error.statusCode || 500 }
    );
  }
}
