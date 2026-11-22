import { NextResponse } from "next/server";
import { userRepo } from "@/lib/backend/db";
import { requireAuth } from "@/lib/backend/auth-service";
import { profileUpdateSchema } from "@/lib/validations";

export async function GET(request: Request) {
  try {
    const user = await requireAuth(request);
    return NextResponse.json({
      success: true,
      profile: {
        id: user.id,
        email: user.email,
        name: user.fullName,
        phone: user.phone,
        avatarUrl: user.avatarUrl,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch profile" },
      { status: error.statusCode || 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const user = await requireAuth(request);
    const body = await request.json();
    const validated = profileUpdateSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const updated = await userRepo.update(user.id, {
      fullName: validated.data.fullName || user.fullName,
      phone: validated.data.phone !== undefined ? validated.data.phone : user.phone,
      avatarUrl: validated.data.avatarUrl !== undefined ? validated.data.avatarUrl : user.avatarUrl,
    });

    return NextResponse.json({
      success: true,
      profile: {
        id: updated!.id,
        email: updated!.email,
        name: updated!.fullName,
        phone: updated!.phone,
        avatarUrl: updated!.avatarUrl,
        role: updated!.role,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update profile" },
      { status: error.statusCode || 500 }
    );
  }
}
