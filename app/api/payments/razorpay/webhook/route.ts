import { NextResponse } from "next/server";
import { razorpayService } from "@/lib/backend/razorpay-service";
import { paymentRepo, orderRepo } from "@/lib/backend/db";

export async function POST(request: Request) {
  try {
    const signature = request.headers.get("x-razorpay-signature");
    if (!signature) {
      return NextResponse.json({ error: "Missing webhook signature" }, { status: 400 });
    }

    const rawBody = await request.text();
    const isValid = razorpayService.verifyWebhookSignature(rawBody, signature);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
    }

    const event = JSON.parse(rawBody);
    const eventType = event.event;

    if (eventType === "payment.captured") {
      const paymentEntity = event.payload?.payment?.entity;
      const razorpayOrderId = paymentEntity?.order_id;
      const razorpayPaymentId = paymentEntity?.id;

      if (razorpayOrderId) {
        const paymentRecord = await paymentRepo.getByRazorpayOrderId(razorpayOrderId);
        if (paymentRecord && paymentRecord.status !== "captured") {
          await paymentRepo.update(paymentRecord.id, {
            razorpayPaymentId,
            status: "captured",
          });

          await orderRepo.updateStatus(
            paymentRecord.orderId,
            "Confirmed",
            "Payment verified via Razorpay Webhook notification.",
            undefined,
            undefined,
            "Razorpay Webhook"
          );
        }
      }
    } else if (eventType === "payment.failed") {
      const paymentEntity = event.payload?.payment?.entity;
      const razorpayOrderId = paymentEntity?.order_id;

      if (razorpayOrderId) {
        const paymentRecord = await paymentRepo.getByRazorpayOrderId(razorpayOrderId);
        if (paymentRecord) {
          await paymentRepo.update(paymentRecord.id, {
            status: "failed",
          });
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Webhook processing error" },
      { status: 500 }
    );
  }
}
