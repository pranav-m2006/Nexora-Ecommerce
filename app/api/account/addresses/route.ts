import { NextResponse } from "next/server";
import { addressRepo } from "@/lib/backend/db";
import { requireAuth } from "@/lib/backend/auth-service";
import { addressSchema } from "@/lib/validations";

export async function GET(request: Request) {
  try {
    const user = await requireAuth(request);
    const addresses = await addressRepo.getByUserId(user.id);
    return NextResponse.json({ success: true, addresses });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch addresses" },
      { status: error.statusCode || 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAuth(request);
    const body = await request.json();
    const validated = addressSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const addresses = await addressRepo.add(user.id, {
      ...validated.data,
      id: `addr-${Date.now()}`,
    });

    return NextResponse.json({ success: true, addresses }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to add address" },
      { status: error.statusCode || 500 }
    );
  }
}
