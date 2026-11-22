import crypto from "crypto";
import { Order, OrderItem, Address, OrderStatus } from "../types";
import { orderRepo, productRepo, cartRepo, paymentRepo, DbPayment } from "./db";
import { cartService } from "./cart-service";

export const orderService = {
  generateOrderNumber(): string {
    const randomHex = crypto.randomBytes(3).toString("hex").toUpperCase();
    return `NX-${randomHex}`;
  },

  async createPendingOrder(params: {
    userId: string;
    shippingAddress: Address;
    paymentMethod: string;
    couponCode?: string;
  }): Promise<{ order: Order; payment: DbPayment }> {
    const { userId, shippingAddress, paymentMethod } = params;

    // 1. Fetch and recalculate server-side cart
    const calculation = await cartService.calculateServerCart(userId);
    if (calculation.items.length === 0) {
      throw new Error("Cannot checkout with an empty shopping bag.");
    }

    if (!calculation.inStock) {
      throw new Error(calculation.validationErrors.join(" "));
    }

    // 2. Safely deduct inventory atomically
    for (const item of calculation.items) {
      const ok = await productRepo.deductStock(item.product.id, item.quantity);
      if (!ok) {
        throw new Error(`Insufficient inventory for item "${item.product.name}".`);
      }
    }

    // 3. Format trusted server Order Items
    const orderItems: OrderItem[] = calculation.items.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      brand: item.product.brand,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.thumbnail,
      variant: item.selectedVariant,
    }));

    const orderId = this.generateOrderNumber();
    const trackingNumber = `TRK-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
    const carrier = "Nexora Express Priority";

    // Estimated delivery 4 business days out
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);
    const estimatedDelivery = deliveryDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const newOrder: Order = {
      id: orderId,
      date: new Date().toISOString(),
      status: "Order Placed",
      items: orderItems,
      shippingAddress,
      paymentMethod,
      subtotal: calculation.subtotal,
      shipping: calculation.shipping,
      discount: calculation.discount,
      total: calculation.total,
      estimatedDelivery,
      trackingNumber,
      carrier,
      timeline: [
        {
          step: "1",
          label: "Order Placed",
          date: "Just now",
          description: "Order placed securely and queued for warehouse fulfillment.",
          completed: true,
          current: true,
        },
        {
          step: "2",
          label: "Confirmed",
          date: "Pending",
          description: "Awaiting payment verification & merchant confirmation.",
          completed: false,
          current: false,
        },
        {
          step: "3",
          label: "Processing",
          date: "Pending",
          description: "Allocated to regional fulfillment center.",
          completed: false,
          current: false,
        },
        {
          step: "4",
          label: "Packed",
          date: "Pending",
          description: "Quality inspected and sealed in tamper-evident packaging.",
          completed: false,
          current: false,
        },
        {
          step: "5",
          label: "Shipped",
          date: "Pending",
          description: "Handed over to priority logistics carrier.",
          completed: false,
          current: false,
        },
        {
          step: "6",
          label: "Out for Delivery",
          date: "Pending",
          description: "Courier out for final mile transit.",
          completed: false,
          current: false,
        },
        {
          step: "7",
          label: "Delivered",
          date: "Pending",
          description: "Secure delivery completed.",
          completed: false,
          current: false,
        },
      ],
    };

    const savedOrder = await orderRepo.create(newOrder);

    // 4. Initialize Payment Record
    const initialPaymentStatus = paymentMethod === "cod" ? "pending" : "pending";
    const paymentRecord = await paymentRepo.create({
      id: `pay-${savedOrder.id}`,
      orderId: savedOrder.id,
      userId,
      paymentMethod,
      provider: paymentMethod === "razorpay" || paymentMethod === "upi" ? "Razorpay" : "CashOnDelivery",
      amount: savedOrder.total,
      currency: "INR",
      status: initialPaymentStatus,
      createdAt: new Date().toISOString(),
    });

    // 5. Clear customer cart upon order creation
    await cartRepo.clear(userId);

    return { order: savedOrder, payment: paymentRecord };
  },

  async cancelOrder(orderId: string, userId: string, reason?: string): Promise<Order> {
    const order = await orderRepo.getById(orderId);
    if (!order) {
      throw new Error(`Order ${orderId} not found.`);
    }

    if (order.status !== "Order Placed" && order.status !== "Confirmed") {
      throw new Error(`Order ${orderId} cannot be cancelled as it is already ${order.status}.`);
    }

    // Restore inventory
    for (const item of order.items) {
      const prod = await productRepo.getById(item.productId);
      if (prod) {
        prod.stockCount += item.quantity;
        prod.inStock = true;
        await productRepo.update(prod.id, { stockCount: prod.stockCount, inStock: true });
      }
    }

    const updated = await orderRepo.updateStatus(
      orderId,
      "Cancelled",
      reason || "Order cancelled by customer request.",
      undefined,
      undefined,
      `Customer (${userId})`
    );

    return updated!;
  },
};
