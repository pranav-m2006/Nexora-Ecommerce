import { NextResponse } from "next/server";
import { orderRepo } from "@/lib/backend/db";
import { requireAdmin } from "@/lib/backend/auth-service";

export async function GET(request: Request) {
  try {
    await requireAdmin(request);
    const url = new URL(request.url);
    const status = url.searchParams.get("status");
    const search = url.searchParams.get("search");

    let orders = await orderRepo.getAll();

    if (status && status !== "All") {
      orders = orders.filter((o) => o.status.toLowerCase() === status.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      orders = orders.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.shippingAddress.fullName.toLowerCase().includes(q) ||
          o.items.some((i) => i.name.toLowerCase().includes(q))
      );
    }

    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch admin orders" },
      { status: error.statusCode || 500 }
    );
  }
}
