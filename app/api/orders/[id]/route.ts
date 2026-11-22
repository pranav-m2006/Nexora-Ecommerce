import { NextResponse } from "next/server";
import { orderRepo } from "@/lib/backend/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const order = await orderRepo.getById(params.id);
    if (!order) {
      return NextResponse.json({ error: `Order ${params.id} not found` }, { status: 404 });
    }
    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch order" },
      { status: 500 }
    );
  }
}
