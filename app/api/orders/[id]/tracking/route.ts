import { NextResponse } from "next/server";
import { orderRepo } from "@/lib/backend/db";
import { requireAdmin } from "@/lib/backend/auth-service";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const order = await orderRepo.getById(params.id);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const events = await orderRepo.getTrackingEvents(params.id);
    return NextResponse.json({
      success: true,
      orderId: order.id,
      status: order.status,
      carrier: order.carrier,
      trackingNumber: order.trackingNumber,
      estimatedDelivery: order.estimatedDelivery,
      timeline: order.timeline,
      events,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch tracking details" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const adminUser = await requireAdmin(request);
    const body = await request.json();

    if (!body.status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 });
    }

    const updatedOrder = await orderRepo.updateStatus(
      params.id,
      body.status as any,
      body.description,
      body.carrier,
      body.trackingNumber,
      adminUser.fullName
    );

    if (!updatedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Order ${params.id} updated to ${body.status}`,
      order: updatedOrder,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update tracking event" },
      { status: error.statusCode || 500 }
    );
  }
}
