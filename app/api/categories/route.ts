import { NextResponse } from "next/server";
import { categoryRepo } from "@/lib/backend/db";
import { requireAdmin } from "@/lib/backend/auth-service";

export async function GET() {
  try {
    const categories = await categoryRepo.getAll();
    return NextResponse.json({ success: true, categories });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin(request);
    const body = await request.json();

    if (!body.name || !body.slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
    }

    const newCategory = await categoryRepo.create({
      id: `cat-${Date.now()}`,
      slug: body.slug,
      name: body.name,
      description: body.description || "",
      image: body.image || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80",
      itemCount: 0,
      subcategories: body.subcategories || [],
    });

    return NextResponse.json({ success: true, category: newCategory }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create category" },
      { status: error.statusCode || 500 }
    );
  }
}
