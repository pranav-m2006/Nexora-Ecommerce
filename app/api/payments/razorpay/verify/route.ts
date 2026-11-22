import { NextResponse } from "next/server";
import { razorpayVerifySchema } from "@/lib/validations";
import { razorpayService } from "@/lib/backend/razorpay-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = razorpayVerifySchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const result = await razorpayService.handlePaymentSuccess(validated.data);

    return NextResponse.json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Signature verification failed" },
      { status: 400 }
    );
  }
}
