import { NextResponse } from "next/server";
import { productRepo, db } from "@/lib/backend/db";
import { reviewCreateSchema } from "@/lib/validations";
import { requireAuth } from "@/lib/backend/auth-service";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const product = await productRepo.getBySlug(params.slug);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const reviews = db.reviews.get(product.id) || [];
    return NextResponse.json({ success: true, reviews });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const user = await requireAuth(request);
    const product = await productRepo.getBySlug(params.slug);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const body = await request.json();
    const validated = reviewCreateSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const newReview = {
      id: `rev-${Date.now()}`,
      userName: user.fullName,
      userAvatar: user.avatarUrl,
      rating: validated.data.rating,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      verified: true,
      title: validated.data.title,
      comment: validated.data.comment,
      helpfulCount: 0,
    };

    const currentList = db.reviews.get(product.id) || [];
    currentList.unshift(newReview);
    db.reviews.set(product.id, currentList);

    // Update product rating & count
    product.reviewCount += 1;
    product.rating = Math.round(((product.rating * (product.reviewCount - 1) + validated.data.rating) / product.reviewCount) * 10) / 10;
    await productRepo.update(product.id, { reviewCount: product.reviewCount, rating: product.rating });

    return NextResponse.json({ success: true, review: newReview }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to post review" },
      { status: error.statusCode || 500 }
    );
  }
}
