import { NextResponse } from "next/server";
import { orderRepo } from "@/lib/backend/db";
import { getSessionUser } from "@/lib/backend/auth-service";

export async function GET(request: Request) {
  try {
    const user = await getSessionUser(request);
    const userId = user ? user.id : "usr-901";

    const orders = await orderRepo.getByUserId(userId);
    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
