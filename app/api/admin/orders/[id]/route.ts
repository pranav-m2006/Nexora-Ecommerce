import { NextResponse } from "next/server";
import { orderRepo } from "@/lib/backend/db";
import { requireAdmin } from "@/lib/backend/auth-service";
import { orderStatusUpdateSchema } from "@/lib/validations";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await requireAdmin(request);
    const body = await request.json();
    const validated = orderStatusUpdateSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { status, description, carrier, trackingNumber } = validated.data;
    const updated = await orderRepo.updateStatus(
      params.id,
      status,
      description,
      carrier,
      trackingNumber,
      admin.fullName
    );

    if (!updated) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Order ${params.id} updated to ${status}`,
      order: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update order" },
      { status: error.statusCode || 500 }
    );
  }
}
