import { NextResponse } from "next/server";
import { razorpayCreateOrderSchema } from "@/lib/validations";
import { orderRepo } from "@/lib/backend/db";
import { razorpayService } from "@/lib/backend/razorpay-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = razorpayCreateOrderSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { orderId, currency } = validated.data;
    const order = await orderRepo.getById(orderId);
    if (!order) {
      return NextResponse.json({ error: `Order ${orderId} not found` }, { status: 404 });
    }

    // Amount comes from validated order in database (never trust client amounts)
    const razorpayOrder = await razorpayService.createRazorpayOrder(
      order.id,
      order.total,
      currency
    );

    return NextResponse.json({
      success: true,
      razorpayOrder,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}
