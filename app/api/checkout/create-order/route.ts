import { NextResponse } from "next/server";
import { orderService } from "@/lib/backend/order-service";
import { getSessionUser } from "@/lib/backend/auth-service";
import { checkoutCreateOrderSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const user = await getSessionUser(request);
    const userId = user ? user.id : "usr-901"; // Fallback to demo user if not logged in

    const body = await request.json();
    const validated = checkoutCreateOrderSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { shippingAddress, paymentMethod, couponCode } = validated.data;
    const fullShippingAddress = {
      ...shippingAddress,
      id: shippingAddress.id || `addr-${Date.now()}`,
    };

    const result = await orderService.createPendingOrder({
      userId,
      shippingAddress: fullShippingAddress,
      paymentMethod,
      couponCode,
    });

    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
      order: result.order,
      payment: result.payment,
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create order" },
      { status: 400 }
    );
  }
}
