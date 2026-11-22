import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/backend/auth-service";

export async function GET(request: Request) {
  try {
    const user = await getSessionUser(request);
    if (!user) {
      return NextResponse.json({ user: null, authenticated: false });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.fullName,
        role: user.role,
        phone: user.phone,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ user: null, authenticated: false });
  }
}
