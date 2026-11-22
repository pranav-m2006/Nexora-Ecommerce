import { z } from "zod";

// ==========================================
// AUTHENTICATION SCHEMAS
// ==========================================
export const registerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters").max(100),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const profileUpdateSchema = z.object({
  fullName: z.string().min(2).max(100).optional(),
  phone: z.string().max(30).optional(),
  avatarUrl: z.string().url().optional(),
});

export const addressSchema = z.object({
  id: z.string().optional(),
  type: z.enum(["Home", "Work", "Other"]).default("Home"),
  isDefault: z.boolean().default(false),
  fullName: z.string().min(2, "Full name is required").max(100),
  street: z.string().min(3, "Street address is required").max(200),
  apartment: z.string().max(100).optional(),
  city: z.string().min(2, "City is required").max(100),
  state: z.string().min(2, "State is required").max(100),
  zipCode: z.string().min(3, "ZIP/Postal code is required").max(20),
  phone: z.string().min(5, "Contact phone is required").max(30),
});

// ==========================================
// PRODUCT & CATEGORY QUERY SCHEMAS
// ==========================================
export const productQuerySchema = z.object({
  category: z.string().optional(),
  categorySlug: z.string().optional(),
  subcategory: z.string().optional(),
  search: z.string().optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  brand: z.union([z.string(), z.array(z.string())]).optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  inStockOnly: z.enum(["true", "false"]).optional(),
  isFeatured: z.enum(["true", "false"]).optional(),
  isTrending: z.enum(["true", "false"]).optional(),
  isBestSeller: z.enum(["true", "false"]).optional(),
  isNewArrival: z.enum(["true", "false"]).optional(),
  sortBy: z.enum(["featured", "price-low", "price-high", "rating", "newest"]).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const productCreateSchema = z.object({
  slug: z.string().min(2).max(100),
  name: z.string().min(2).max(200),
  brand: z.string().min(1).max(100),
  categoryId: z.string().uuid().optional(),
  categorySlug: z.string(),
  category: z.string(),
  subcategory: z.string().default("General"),
  price: z.number().positive(),
  originalPrice: z.number().positive().optional(),
  discountPercent: z.number().min(0).max(100).default(0),
  stockCount: z.number().int().min(0).default(0),
  badge: z.string().optional(),
  isFeatured: z.boolean().default(false),
  isTrending: z.boolean().default(false),
  isBestSeller: z.boolean().default(false),
  isNewArrival: z.boolean().default(false),
  thumbnail: z.string().url(),
  images: z.array(z.string().url()).min(1),
  shortDescription: z.string().max(500),
  description: z.string(),
  specs: z.record(z.string(), z.string()),
  variants: z.array(z.object({
    id: z.string(),
    name: z.string(),
    options: z.array(z.string()),
  })).optional(),
  tags: z.array(z.string()).default([]),
});

export const productUpdateSchema = productCreateSchema.partial();

// ==========================================
// CART & WISHLIST SCHEMAS
// ==========================================
export const addToCartSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1").default(1),
  selectedVariant: z.record(z.string(), z.string()).optional(),
});

export const updateCartItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().int().min(0, "Quantity cannot be negative"),
});

export const wishlistToggleSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
});

// ==========================================
// CHECKOUT & ORDERS SCHEMAS
// ==========================================
export const checkoutCreateOrderSchema = z.object({
  shippingAddress: addressSchema,
  billingAddress: addressSchema.optional(),
  paymentMethod: z.enum(["razorpay", "upi", "cod", "card", "apple"]),
  customerNotes: z.string().max(500).optional(),
  couponCode: z.string().max(50).optional(),
  idempotencyKey: z.string().optional(),
});

export const orderStatusUpdateSchema = z.object({
  status: z.enum([
    "Order Placed",
    "Confirmed",
    "Processing",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
    "Returned"
  ]),
  description: z.string().max(500).optional(),
  carrier: z.string().max(100).optional(),
  trackingNumber: z.string().max(100).optional(),
});

// ==========================================
// RAZORPAY PAYMENT SCHEMAS
// ==========================================
export const razorpayCreateOrderSchema = z.object({
  orderId: z.string().min(1, "Order reference ID is required"),
  currency: z.string().length(3).default("INR"),
});

export const razorpayVerifySchema = z.object({
  orderId: z.string().min(1, "Internal Order ID is required"),
  razorpay_order_id: z.string().min(1, "Razorpay Order ID is required"),
  razorpay_payment_id: z.string().min(1, "Razorpay Payment ID is required"),
  razorpay_signature: z.string().min(1, "Razorpay signature is required"),
});

// ==========================================
// REVIEWS & RATINGS SCHEMAS
// ==========================================
export const reviewCreateSchema = z.object({
  productId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  title: z.string().min(2).max(150),
  comment: z.string().min(5).max(2000),
});

// ==========================================
// AI ASSISTANT SCHEMAS
// ==========================================
export const aiAssistantPromptSchema = z.object({
  prompt: z.string().min(1).max(1000),
  history: z.array(z.object({
    sender: z.enum(["user", "bot"]),
    text: z.string(),
  })).optional(),
  maxBudget: z.number().positive().optional(),
  category: z.string().optional(),
});
