import { NextResponse } from "next/server";
import { wishlistRepo, cartRepo } from "@/lib/backend/db";
import { getSessionUser } from "@/lib/backend/auth-service";
import { addToCartSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const user = await getSessionUser(request);
    const userId = user ? user.id : "usr-guest";

    const body = await request.json();
    const validated = addToCartSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { productId, quantity, selectedVariant } = validated.data;

    // 1. Add to cart
    await cartRepo.addItem(userId, productId, quantity, selectedVariant as Record<string, string> | undefined);

    // 2. Remove from wishlist
    const remainingWishlist = await wishlistRepo.remove(userId, productId);

    return NextResponse.json({
      success: true,
      message: "Item moved from wishlist to shopping bag",
      remainingWishlist,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to move item to bag" },
      { status: 500 }
    );
  }
}
