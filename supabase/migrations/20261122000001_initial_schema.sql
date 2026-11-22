
-- ====================================================================
-- NEXORA MARKETPLACE — COMPREHENSIVE DATABASE SCHEMA (v1.0)
-- 17 Tables with UUID Primary Keys, Foreign Keys, Indexes & Constraints
-- ====================================================================

-- Enable necessary PostgreSQL extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- --------------------------------------------------------------------
-- 1. PROFILES (Extends Supabase auth.users)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- --------------------------------------------------------------------
-- 2. USER ROLES (Strict role-based access control: customer, admin)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'staff')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    UNIQUE(user_id, role)
);

CREATE INDEX IF NOT EXISTS idx_user_roles_user ON public.user_roles(user_id);

-- --------------------------------------------------------------------
-- 3. CATEGORIES (Departments)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT NOT NULL,
    item_count INT NOT NULL DEFAULT 0,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);

-- --------------------------------------------------------------------
-- 4. PRODUCTS (Core catalog)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    brand TEXT NOT NULL,
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
    subcategory TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    original_price NUMERIC(10, 2) CHECK (original_price IS NULL OR original_price >= price),
    discount_percent INT NOT NULL DEFAULT 0 CHECK (discount_percent >= 0 AND discount_percent <= 100),
    rating NUMERIC(3, 2) NOT NULL DEFAULT 5.00 CHECK (rating >= 0 AND rating <= 5.00),
    review_count INT NOT NULL DEFAULT 0 CHECK (review_count >= 0),
    in_stock BOOLEAN NOT NULL DEFAULT true,
    stock_count INT NOT NULL DEFAULT 10 CHECK (stock_count >= 0),
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_trending BOOLEAN NOT NULL DEFAULT false,
    is_best_seller BOOLEAN NOT NULL DEFAULT false,
    is_new_arrival BOOLEAN NOT NULL DEFAULT false,
    badge TEXT,
    thumbnail TEXT NOT NULL,
    short_description TEXT NOT NULL,
    description TEXT NOT NULL,
    specs JSONB NOT NULL DEFAULT '{}'::jsonb,
    tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_flags ON public.products(is_trending, is_best_seller, is_new_arrival, is_featured);
CREATE INDEX IF NOT EXISTS idx_products_price ON public.products(price);

-- --------------------------------------------------------------------
-- 5. PRODUCT IMAGES (Editorial Galleries)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_primary BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_product_images_product ON public.product_images(product_id);

-- --------------------------------------------------------------------
-- 6. PRODUCT VARIANTS (Storage, Size, Color, Finishes)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    sku TEXT UNIQUE,
    price_modifier NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    stock_count INT NOT NULL DEFAULT 10 CHECK (stock_count >= 0),
    attributes JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_product_variants_product ON public.product_variants(product_id);

-- --------------------------------------------------------------------
-- 7. CARTS (One active cart per authenticated customer)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.carts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_carts_user ON public.carts(user_id);

-- --------------------------------------------------------------------
-- 8. CART ITEMS
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cart_id UUID NOT NULL REFERENCES public.carts(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
    selected_variant JSONB NOT NULL DEFAULT '{}'::jsonb,
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    UNIQUE(cart_id, product_id, variant_id)
);

CREATE INDEX IF NOT EXISTS idx_cart_items_cart ON public.cart_items(cart_id);

-- --------------------------------------------------------------------
-- 9. WISHLISTS
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.wishlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_wishlists_user ON public.wishlists(user_id);

-- --------------------------------------------------------------------
-- 10. WISHLIST ITEMS
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.wishlist_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wishlist_id UUID NOT NULL REFERENCES public.wishlists(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    UNIQUE(wishlist_id, product_id)
);

CREATE INDEX IF NOT EXISTS idx_wishlist_items_wishlist ON public.wishlist_items(wishlist_id);

-- --------------------------------------------------------------------
-- 11. ADDRESSES (Customer shipping destinations)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL DEFAULT 'Home' CHECK (type IN ('Home', 'Work', 'Other')),
    is_default BOOLEAN NOT NULL DEFAULT false,
    full_name TEXT NOT NULL,
    street TEXT NOT NULL,
    apartment TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip_code TEXT NOT NULL,
    phone TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_addresses_user ON public.addresses(user_id);

-- --------------------------------------------------------------------
-- 12. ORDERS
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT NOT NULL UNIQUE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    status TEXT NOT NULL DEFAULT 'PLACED' CHECK (
        status IN ('PLACED', 'CONFIRMED', 'PROCESSING', 'PACKED', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED', 'RETURNED')
    ),
    subtotal NUMERIC(10, 2) NOT NULL CHECK (subtotal >= 0),
    discount NUMERIC(10, 2) NOT NULL DEFAULT 0.00 CHECK (discount >= 0),
    delivery_charge NUMERIC(10, 2) NOT NULL DEFAULT 0.00 CHECK (delivery_charge >= 0),
    total_amount NUMERIC(10, 2) NOT NULL CHECK (total_amount >= 0),
    payment_status TEXT NOT NULL DEFAULT 'PENDING' CHECK (payment_status IN ('PENDING', 'PAID', 'FAILED', 'REFUNDED')),
    payment_method TEXT NOT NULL DEFAULT 'RAZORPAY' CHECK (payment_method IN ('RAZORPAY', 'COD', 'UPI', 'CARD', 'APPLE_PAY')),
    shipping_address JSONB NOT NULL,
    estimated_delivery_date TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);

-- --------------------------------------------------------------------
-- 13. ORDER ITEMS
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
    variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    product_brand TEXT NOT NULL,
    product_thumbnail TEXT NOT NULL,
    unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
    quantity INT NOT NULL CHECK (quantity > 0),
    total_price NUMERIC(10, 2) NOT NULL CHECK (total_price >= 0),
    selected_variant JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);

-- --------------------------------------------------------------------
-- 14. PAYMENTS (Razorpay & transactional payment records)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    razorpay_order_id TEXT,
    razorpay_payment_id TEXT UNIQUE,
    razorpay_signature TEXT,
    amount NUMERIC(10, 2) NOT NULL CHECK (amount >= 0),
    currency TEXT NOT NULL DEFAULT 'INR',
    status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'SUCCESS', 'FAILED')),
    method TEXT,
    error_code TEXT,
    error_description TEXT,
    raw_response JSONB DEFAULT '{}'::jsonb,
    idempotency_key TEXT UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_payments_order ON public.payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_razorpay_order ON public.payments(razorpay_order_id);

-- --------------------------------------------------------------------
-- 15. ORDER TRACKING EVENTS (Real-time timeline progression)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.order_tracking_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    status TEXT NOT NULL CHECK (
        status IN ('PLACED', 'CONFIRMED', 'PROCESSING', 'PACKED', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED', 'RETURNED')
    ),
    description TEXT NOT NULL,
    location TEXT,
    updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_tracking_order ON public.order_tracking_events(order_id);

-- --------------------------------------------------------------------
-- 16. REVIEWS (Verified purchases only)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    comment TEXT NOT NULL,
    is_verified_purchase BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    UNIQUE(product_id, user_id, order_id)
);

CREATE INDEX IF NOT EXISTS idx_reviews_product ON public.reviews(product_id);

-- --------------------------------------------------------------------
-- 17. RECENTLY VIEWED PRODUCTS
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.recently_viewed_products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    viewed_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    UNIQUE(user_id, product_id)
);

CREATE INDEX IF NOT EXISTS idx_recently_viewed_user ON public.recently_viewed_products(user_id);
