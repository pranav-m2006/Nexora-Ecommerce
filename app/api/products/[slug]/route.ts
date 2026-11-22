import { NextResponse } from "next/server";
import { productRepo } from "@/lib/backend/db";
import { productUpdateSchema } from "@/lib/validations";
import { requireAdmin } from "@/lib/backend/auth-service";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const product = await productRepo.getBySlug(params.slug);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to retrieve product" },
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
    const product = await productRepo.getBySlug(params.slug);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const body = await request.json();
    const validated = productUpdateSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const updated = await productRepo.update(product.id, validated.data);
    return NextResponse.json({ success: true, product: updated });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update product" },
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
    const product = await productRepo.getBySlug(params.slug);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    await productRepo.delete(product.id);
    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete product" },
      { status: error.statusCode || 500 }
    );
  }
}
