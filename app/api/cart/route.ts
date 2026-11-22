import { NextResponse } from "next/server";
import { cartRepo } from "@/lib/backend/db";
import { cartService } from "@/lib/backend/cart-service";
import { getSessionUser } from "@/lib/backend/auth-service";
import { addToCartSchema, updateCartItemSchema } from "@/lib/validations";

export async function GET(request: Request) {
  try {
    const user = await getSessionUser(request);
    const userId = user ? user.id : "usr-guest";

    const calculation = await cartService.calculateServerCart(userId);
    return NextResponse.json({
      success: true,
      cart: calculation,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

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
    await cartRepo.addItem(userId, productId, quantity, selectedVariant as Record<string, string> | undefined);

    const calculation = await cartService.calculateServerCart(userId);
    return NextResponse.json({
      success: true,
      message: "Item added to bag",
      cart: calculation,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to add to cart" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await getSessionUser(request);
    const userId = user ? user.id : "usr-guest";

    const body = await request.json();
    const validated = updateCartItemSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { productId, quantity } = validated.data;
    await cartRepo.updateItemQuantity(userId, productId, quantity);

    const calculation = await cartService.calculateServerCart(userId);
    return NextResponse.json({
      success: true,
      cart: calculation,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update item quantity" },
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

    if (productId) {
      await cartRepo.removeItem(userId, productId);
    } else {
      await cartRepo.clear(userId);
    }

    const calculation = await cartService.calculateServerCart(userId);
    return NextResponse.json({
      success: true,
      message: productId ? "Item removed" : "Bag cleared",
      cart: calculation,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to remove item" },
      { status: 500 }
    );
  }
}
