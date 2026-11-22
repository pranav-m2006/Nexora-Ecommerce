import crypto from "crypto";
import Razorpay from "razorpay";
import { orderRepo, paymentRepo, DbPayment } from "./db";

// Server-side environment secrets
const KEY_ID = process.env.RAZORPAY_KEY_ID || "rzp_test_nexora_mock_id";
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "nexora_mock_secret_test_key_123";
const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || "nexora_webhook_secret_key_123";

let razorpayClient: Razorpay | null = null;

try {
  if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    razorpayClient = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
} catch (err) {
  console.warn("Razorpay client initialization warning:", err);
}

export const razorpayService = {
  getKeyId(): string {
    return KEY_ID;
  },

  async createRazorpayOrder(internalOrderId: string, amount: number, currency = "INR") {
    // Amount in paisa for Razorpay
    const amountInPaisa = Math.round(amount * 100);

    // If live client is configured, call real Razorpay Test API
    if (razorpayClient && process.env.RAZORPAY_KEY_SECRET) {
      try {
        const rzpOrder = await razorpayClient.orders.create({
          amount: amountInPaisa,
          currency,
          receipt: internalOrderId,
          notes: {
            orderId: internalOrderId,
            source: "Nexora Marketplace",
          },
        });

        // Update payment record with razorpay_order_id
        const existingPayment = await paymentRepo.getById(`pay-${internalOrderId}`);
        if (existingPayment) {
          await paymentRepo.update(existingPayment.id, {
            razorpayOrderId: rzpOrder.id,
            status: "pending",
          });
        }

        return {
          id: rzpOrder.id,
          amount: rzpOrder.amount,
          currency: rzpOrder.currency,
          keyId: KEY_ID,
        };
      } catch (err) {
        console.warn("Live Razorpay order creation failed, using resilient test mode:", err);
      }
    }

    // High-fidelity fallback / test mode Razorpay order ID
    const mockRzpOrderId = `order_${crypto.randomBytes(8).toString("hex")}`;
    const existingPayment = await paymentRepo.getById(`pay-${internalOrderId}`);
    if (existingPayment) {
      await paymentRepo.update(existingPayment.id, {
        razorpayOrderId: mockRzpOrderId,
        status: "pending",
      });
    }

    return {
      id: mockRzpOrderId,
      amount: amountInPaisa,
      currency,
      keyId: KEY_ID,
    };
  },

  verifyPaymentSignature(params: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }): boolean {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = params;

    // HMAC SHA-256 verification
    const expectedSignature = crypto
      .createHmac("sha256", KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    return expectedSignature === razorpay_signature;
  },

  verifyWebhookSignature(rawBody: string, signature: string): boolean {
    const expectedSignature = crypto
      .createHmac("sha256", WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");

    return expectedSignature === signature;
  },

  async handlePaymentSuccess(params: {
    orderId: string;
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }): Promise<{ success: boolean; message: string }> {
    const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = params;

    const isValid = this.verifyPaymentSignature({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    if (!isValid) {
      // Record failed payment attempt
      const payment = await paymentRepo.getById(`pay-${orderId}`);
      if (payment) {
        await paymentRepo.update(payment.id, { status: "failed" });
      }
      throw new Error("Invalid Razorpay payment signature. Transaction tampering detected.");
    }

    // Update payment record to captured
    const payment = await paymentRepo.getById(`pay-${orderId}`);
    if (payment) {
      await paymentRepo.update(payment.id, {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: "captured",
      });
    }

    // Update order status to 'Confirmed'
    await orderRepo.updateStatus(
      orderId,
      "Confirmed",
      "Payment authorized and confirmed via Razorpay Secure Gateway.",
      undefined,
      undefined,
      "Razorpay Gateway"
    );

    return { success: true, message: "Payment verified and order confirmed successfully." };
  },
};
