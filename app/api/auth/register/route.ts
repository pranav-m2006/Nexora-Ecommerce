import { NextResponse } from "next/server";
import { registerSchema } from "@/lib/validations";
import { userRepo } from "@/lib/backend/db";
import { hashPassword, setSessionCookie } from "@/lib/backend/auth-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = registerSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email, fullName, password, phone } = validated.data;

    // Check if user already exists
    const existing = await userRepo.getByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email address already exists." },
        { status: 409 }
      );
    }

    const newUser = await userRepo.create({
      id: `usr-${Date.now()}`,
      email,
      fullName,
      phone: phone || "",
      role: "customer", // Enforce customer role on registration
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString(),
    });

    const token = await setSessionCookie(newUser);

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.fullName,
        role: newUser.role,
        phone: newUser.phone,
      },
      token,
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to register account" },
      { status: 500 }
    );
  }
}
