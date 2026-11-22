import { NextResponse } from "next/server";
import { categoryRepo } from "@/lib/backend/db";
import { requireAdmin } from "@/lib/backend/auth-service";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const category = await categoryRepo.getBySlug(params.slug);
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, category });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch category" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await requireAdmin(request);
    const category = await categoryRepo.getBySlug(params.slug);
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    const body = await request.json();
    const updated = await categoryRepo.update(category.id, body);
    return NextResponse.json({ success: true, category: updated });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update category" },
      { status: error.statusCode || 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await requireAdmin(request);
    const category = await categoryRepo.getBySlug(params.slug);
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    await categoryRepo.delete(category.id);
    return NextResponse.json({ success: true, message: "Category deleted" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete category" },
      { status: error.statusCode || 500 }
    );
  }
}
