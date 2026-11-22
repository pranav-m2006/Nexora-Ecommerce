import { NextResponse } from "next/server";
import { orderService } from "@/lib/backend/order-service";
import { getSessionUser } from "@/lib/backend/auth-service";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getSessionUser(request);
    const userId = user ? user.id : "usr-901";

    const body = await request.json().catch(() => ({}));
    const updated = await orderService.cancelOrder(params.id, userId, body.reason);

    return NextResponse.json({
      success: true,
      message: `Order ${params.id} has been cancelled successfully.`,
      order: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to cancel order" },
      { status: 400 }
    );
  }
}
