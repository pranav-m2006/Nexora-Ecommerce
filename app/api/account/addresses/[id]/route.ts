import { NextResponse } from "next/server";
import { addressRepo } from "@/lib/backend/db";
import { requireAuth } from "@/lib/backend/auth-service";
import { addressSchema } from "@/lib/validations";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(request);
    const body = await request.json();
    const validated = addressSchema.partial().safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const addresses = await addressRepo.update(user.id, params.id, validated.data);
    return NextResponse.json({ success: true, addresses });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update address" },
      { status: error.statusCode || 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(request);
    const addresses = await addressRepo.delete(user.id, params.id);
    return NextResponse.json({ success: true, addresses });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete address" },
      { status: error.statusCode || 500 }
    );
  }
}
