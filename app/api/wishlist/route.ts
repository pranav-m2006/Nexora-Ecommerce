import { NextResponse } from "next/server";
import { wishlistRepo, productRepo } from "@/lib/backend/db";
import { getSessionUser } from "@/lib/backend/auth-service";
import { wishlistToggleSchema } from "@/lib/validations";

export async function GET(request: Request) {
  try {
    const user = await getSessionUser(request);
    const userId = user ? user.id : "usr-guest";

    const itemIds = await wishlistRepo.getByUserId(userId);
    const products = [];
    for (const id of itemIds) {
      const p = await productRepo.getById(id);
      if (p) products.push(p);
    }

    return NextResponse.json({
      success: true,
      itemIds,
      products,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch wishlist" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getSessionUser(request);
    const userId = user ? user.id : "usr-guest";

    const body = await request.json();
    const validated = wishlistToggleSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { isInWishlist, items } = await wishlistRepo.toggle(userId, validated.data.productId);

    return NextResponse.json({
      success: true,
      isInWishlist,
      itemIds: items,
      message: isInWishlist ? "Saved to wishlist" : "Removed from wishlist",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update wishlist" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getSessionUser(request);
    const userId = user ? user.id : "usr-guest";

    const url = new URL(request.url);
    const productId = url.searchParams.get("productId");
    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const remaining = await wishlistRepo.remove(userId, productId);
    return NextResponse.json({
      success: true,
      itemIds: remaining,
      message: "Removed from wishlist",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to remove from wishlist" },
      { status: 500 }
    );
  }
}
