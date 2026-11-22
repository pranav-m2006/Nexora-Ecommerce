import { NextResponse } from "next/server";
import { productRepo } from "@/lib/backend/db";
import { productQuerySchema, productCreateSchema } from "@/lib/validations";
import { requireAdmin } from "@/lib/backend/auth-service";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const paramsObj: Record<string, any> = {};
    url.searchParams.forEach((val, key) => {
      paramsObj[key] = val;
    });

    const parsedQuery = productQuerySchema.safeParse(paramsObj);
    if (!parsedQuery.success) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: parsedQuery.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const {
      category,
      categorySlug,
      subcategory,
      search,
      minPrice,
      maxPrice,
      brand,
      minRating,
      inStockOnly,
      isFeatured,
      isTrending,
      isBestSeller,
      isNewArrival,
      sortBy,
      page,
      limit,
    } = parsedQuery.data;

    const brands = brand ? (Array.isArray(brand) ? brand : [brand]) : undefined;

    const result = await productRepo.getAll({
      category,
      categorySlug,
      subcategory,
      search,
      minPrice,
      maxPrice,
      brands,
      minRating,
      inStockOnly: inStockOnly === "true",
      isFeatured: isFeatured === "true",
      isTrending: isTrending === "true",
      isBestSeller: isBestSeller === "true",
      isNewArrival: isNewArrival === "true",
      sortBy,
      page,
      limit,
    });

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin(request);
    const body = await request.json();
    const validated = productCreateSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const newProd = await productRepo.create({
      id: `nx-prod-${Date.now()}`,
      ...validated.data,
      rating: 5.0,
      reviewCount: 0,
      inStock: validated.data.stockCount > 0,
      originalPrice: validated.data.originalPrice || validated.data.price,
    });

    return NextResponse.json({ success: true, product: newProd }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create product" },
      { status: error.statusCode || 500 }
    );
  }
}
