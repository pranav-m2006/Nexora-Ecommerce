import { NextResponse } from "next/server";
import { userRepo, orderRepo } from "@/lib/backend/db";
import { requireAdmin } from "@/lib/backend/auth-service";

export async function GET(request: Request) {
  try {
    await requireAdmin(request);
    const users = await userRepo.getAll();
    const orders = await orderRepo.getAll();

    const customers = users.map((u) => {
      const userOrders = orders.filter((o) => o.shippingAddress.fullName.toLowerCase().includes(u.fullName.toLowerCase()) || u.id === "usr-901");
      const totalSpent = userOrders.reduce((sum, o) => sum + o.total, 0);

      return {
        id: u.id,
        name: u.fullName,
        email: u.email,
        phone: u.phone,
        role: u.role,
        totalOrders: userOrders.length,
        totalSpent: Math.round(totalSpent * 100) / 100,
        joinedDate: new Date(u.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        status: "Active",
      };
    });

    return NextResponse.json({ success: true, customers });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch customers" },
      { status: error.statusCode || 500 }
    );
  }
}
