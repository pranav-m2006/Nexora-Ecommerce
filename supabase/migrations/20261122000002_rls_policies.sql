-- ====================================================================
-- NEXORA MARKETPLACE — ROW LEVEL SECURITY (RLS) POLICIES
-- Strict customer isolation, public catalog read, and server-side admin rules
-- ====================================================================

-- Enable RLS on all 17 tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_tracking_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recently_viewed_products ENABLE ROW LEVEL SECURITY;

-- --------------------------------------------------------------------
-- HELPER FUNCTIONS FOR SECURITY EVALUATION
-- --------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- --------------------------------------------------------------------
-- 1. PROFILES POLICIES
-- --------------------------------------------------------------------
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- --------------------------------------------------------------------
-- 2. USER ROLES POLICIES (Only admins can view/manage roles)
-- --------------------------------------------------------------------
CREATE POLICY "Admins can view and manage user roles"
    ON public.user_roles FOR ALL
    USING (public.is_admin());

CREATE POLICY "Users can view their own role"
    ON public.user_roles FOR SELECT
    USING (auth.uid() = user_id);

-- --------------------------------------------------------------------
-- 3. CATEGORIES POLICIES (Public read, admin write)
-- --------------------------------------------------------------------
CREATE POLICY "Public can view categories"
    ON public.categories FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage categories"
    ON public.categories FOR ALL
    USING (public.is_admin());

-- --------------------------------------------------------------------
-- 4. PRODUCTS POLICIES (Public read, admin write)
-- --------------------------------------------------------------------
CREATE POLICY "Public can view active products"
    ON public.products FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage products"
    ON public.products FOR ALL
    USING (public.is_admin());

-- --------------------------------------------------------------------
-- 5. PRODUCT IMAGES POLICIES (Public read, admin write)
-- --------------------------------------------------------------------
CREATE POLICY "Public can view product images"
    ON public.product_images FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage product images"
    ON public.product_images FOR ALL
    USING (public.is_admin());

-- --------------------------------------------------------------------
-- 6. PRODUCT VARIANTS POLICIES (Public read, admin write)
-- --------------------------------------------------------------------
CREATE POLICY "Public can view product variants"
    ON public.product_variants FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage product variants"
    ON public.product_variants FOR ALL
    USING (public.is_admin());

-- --------------------------------------------------------------------
-- 7. CARTS POLICIES (Users manage their own cart only)
-- --------------------------------------------------------------------
CREATE POLICY "Users can view own cart"
    ON public.carts FOR SELECT
    USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can create own cart"
    ON public.carts FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cart"
    ON public.carts FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own cart"
    ON public.carts FOR DELETE
    USING (auth.uid() = user_id);

-- --------------------------------------------------------------------
-- 8. CART ITEMS POLICIES
-- --------------------------------------------------------------------
CREATE POLICY "Users can view own cart items"
    ON public.cart_items FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.carts
            WHERE carts.id = cart_items.cart_id AND carts.user_id = auth.uid()
        ) OR public.is_admin()
    );

CREATE POLICY "Users can insert own cart items"
    ON public.cart_items FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.carts
            WHERE carts.id = cart_items.cart_id AND carts.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update own cart items"
    ON public.cart_items FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.carts
            WHERE carts.id = cart_items.cart_id AND carts.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete own cart items"
    ON public.cart_items FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM public.carts
            WHERE carts.id = cart_items.cart_id AND carts.user_id = auth.uid()
        )
    );

-- --------------------------------------------------------------------
-- 9. WISHLISTS POLICIES
-- --------------------------------------------------------------------
CREATE POLICY "Users can view own wishlist"
    ON public.wishlists FOR SELECT
    USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can create own wishlist"
    ON public.wishlists FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- --------------------------------------------------------------------
-- 10. WISHLIST ITEMS POLICIES
-- --------------------------------------------------------------------
CREATE POLICY "Users can view own wishlist items"
    ON public.wishlist_items FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.wishlists
            WHERE wishlists.id = wishlist_items.wishlist_id AND wishlists.user_id = auth.uid()
        ) OR public.is_admin()
    );

CREATE POLICY "Users can insert own wishlist items"
    ON public.wishlist_items FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.wishlists
            WHERE wishlists.id = wishlist_items.wishlist_id AND wishlists.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete own wishlist items"
    ON public.wishlist_items FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM public.wishlists
            WHERE wishlists.id = wishlist_items.wishlist_id AND wishlists.user_id = auth.uid()
        )
    );

-- --------------------------------------------------------------------
-- 11. ADDRESSES POLICIES
-- --------------------------------------------------------------------
CREATE POLICY "Users can view own addresses"
    ON public.addresses FOR SELECT
    USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can create own addresses"
    ON public.addresses FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own addresses"
    ON public.addresses FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own addresses"
    ON public.addresses FOR DELETE
    USING (auth.uid() = user_id);

-- --------------------------------------------------------------------
-- 12. ORDERS POLICIES
-- --------------------------------------------------------------------
CREATE POLICY "Users can view own orders"
    ON public.orders FOR SELECT
    USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can insert own orders"
    ON public.orders FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all orders"
    ON public.orders FOR ALL
    USING (public.is_admin());

-- --------------------------------------------------------------------
-- 13. ORDER ITEMS POLICIES
-- --------------------------------------------------------------------
CREATE POLICY "Users can view own order items"
    ON public.order_items FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.orders
            WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
        ) OR public.is_admin()
    );

CREATE POLICY "System can insert order items"
    ON public.order_items FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.orders
            WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
        ) OR public.is_admin()
    );

-- --------------------------------------------------------------------
-- 14. PAYMENTS POLICIES (Sensitive transactions: restricted access)
-- --------------------------------------------------------------------
CREATE POLICY "Users can view own payments"
    ON public.payments FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.orders
            WHERE orders.id = payments.order_id AND orders.user_id = auth.uid()
        ) OR public.is_admin()
    );

CREATE POLICY "Admins can manage payments"
    ON public.payments FOR ALL
    USING (public.is_admin());

-- --------------------------------------------------------------------
-- 15. ORDER TRACKING EVENTS POLICIES (Public customer view, admin edit)
-- --------------------------------------------------------------------
CREATE POLICY "Users can view tracking events for their orders"
    ON public.order_tracking_events FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.orders
            WHERE orders.id = order_tracking_events.order_id AND orders.user_id = auth.uid()
        ) OR public.is_admin()
    );

CREATE POLICY "Admins can manage order tracking events"
    ON public.order_tracking_events FOR ALL
    USING (public.is_admin());

-- --------------------------------------------------------------------
-- 16. REVIEWS POLICIES (Public read, verified purchase write)
-- --------------------------------------------------------------------
CREATE POLICY "Public can view verified reviews"
    ON public.reviews FOR SELECT
    USING (true);

CREATE POLICY "Users can create reviews for their purchased products"
    ON public.reviews FOR INSERT
    WITH CHECK (
        auth.uid() = user_id AND
        EXISTS (
            SELECT 1 FROM public.orders
            JOIN public.order_items ON order_items.order_id = orders.id
            WHERE orders.user_id = auth.uid() 
              AND order_items.product_id = reviews.product_id
              AND orders.status = 'DELIVERED'
        )
    );

CREATE POLICY "Users can update own reviews"
    ON public.reviews FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can moderate reviews"
    ON public.reviews FOR DELETE
    USING (public.is_admin());

-- --------------------------------------------------------------------
-- 17. RECENTLY VIEWED PRODUCTS POLICIES
-- --------------------------------------------------------------------
CREATE POLICY "Users can view and manage their recently viewed items"
    ON public.recently_viewed_products FOR ALL
    USING (auth.uid() = user_id);
