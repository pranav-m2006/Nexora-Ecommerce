import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/backend/auth-service";

export async function POST() {
  try {
    await clearSessionCookie();
    return NextResponse.json({
      success: true,
      message: "Session signed out successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Logout failed" },
      { status: 500 }
    );
  }
}
