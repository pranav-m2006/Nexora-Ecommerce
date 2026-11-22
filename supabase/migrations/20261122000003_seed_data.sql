-- ====================================================================
-- NEXORA MARKETPLACE — COMPREHENSIVE SEED DATA (v1.0)
-- Strict Valid UUIDs (Hexadecimal 0-9, a-f), All 6 Categories & Products
-- ====================================================================

-- 1. SEED CATEGORIES
INSERT INTO public.categories (id, name, slug, description, image_url, item_count, subcategories, is_featured, display_order)
VALUES 
    (
        'c1000000-0000-0000-0000-000000000001', 
        'Electronics', 
        'electronics', 
        'Next-generation smartphones, spatial audio earbuds, GaN power banks, and personal computing slates.', 
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80', 
        184, 
        ARRAY['Mobiles & Phones', 'AirPods & Audio', 'Power Banks & Fast Charging', 'Laptops & Slates', 'Smart Home & Display']::TEXT[],
        true, 
        1
    ),
    (
        'c1000000-0000-0000-0000-000000000002', 
        'Fashion', 
        'fashion', 
        'Architectural trench coats, technical dresses, merino wool tailoring, and luxury minimalist footwear.', 
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80', 
        260, 
        ARRAY['Dresses & Skirts', 'Outerwear & Coats', 'Tailored Suits & Blazers', 'Knitwear & Sweaters', 'Minimal Footwear', 'Essentials & Hoodies']::TEXT[],
        true, 
        2
    ),
    (
        'c1000000-0000-0000-0000-000000000003', 
        'Home & Living', 
        'home-and-living', 
        'Solid oak ergonomic seating, motorized standing desks, Japanese culinary knives, and ambient ultrasonic diffusers.', 
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80', 
        215, 
        ARRAY['Furniture & Seating', 'Ergonomic Desks', 'Ceramics & Kitchenware', 'Air Purifiers & Diffusers', 'Architectural Lighting', 'Luxury Bedding']::TEXT[],
        true, 
        3
    ),
    (
        'c1000000-0000-0000-0000-000000000004', 
        'Beauty & Wellness', 
        'beauty', 
        'Bio-active cellular serums, artisanal botanical fragrances, facial sculpting micro-current devices, and beard elixirs.', 
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80', 
        128, 
        ARRAY['Cellular Skincare', 'Facial Sculpting Tech', 'Artisanal Fragrance', 'Grooming & Beard', 'Cleansers & Masks']::TEXT[],
        true, 
        4
    ),
    (
        'c1000000-0000-0000-0000-000000000005', 
        'Sports & Performance', 
        'sports', 
        'Carbon propulsion trail runners, magnetic quick-change dumbbells, percussion massage guns, and hydration gear.', 
        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80', 
        140, 
        ARRAY['Trail & Running Shoes', 'Smart Gym & Dumbbells', 'Recovery Percussion', 'Hydration Gear', 'Performance Apparel']::TEXT[],
        true, 
        5
    ),
    (
        'c1000000-0000-0000-0000-000000000006', 
        'Accessories', 
        'accessories', 
        'Titanium chronographs, RFID carbon wallets, Italian leather weekenders, mechanical keyboards, and blue-light eyewear.', 
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80', 
        195, 
        ARRAY['Timepieces & Watches', 'Cardholders & EDC', 'Leather Travel Bags', 'Eyewear', 'Mechanical Keyboards', 'Tech Cases']::TEXT[],
        true, 
        6
    )
ON CONFLICT (slug) DO UPDATE SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    image_url = EXCLUDED.image_url,
    item_count = EXCLUDED.item_count,
    subcategories = EXCLUDED.subcategories,
    is_featured = EXCLUDED.is_featured,
    display_order = EXCLUDED.display_order;

-- 2. SEED FLAGSHIP PRODUCTS (Valid Hexadecimal UUIDs: a1000000-0000-0000-0000-...)
INSERT INTO public.products (
    id, name, slug, brand, category_id, subcategory, price, original_price, discount_percent, rating, review_count, in_stock, stock_count, is_featured, is_trending, is_best_seller, is_new_arrival, badge, thumbnail, images, short_description, description, specs, tags
)
VALUES
(
    'a1000000-0000-0000-0000-000000000001',
    'Nexora Phone 1 Minimalist Titanium Flagship',
    'nexora-phone-1-titanium-flagship',
    'Nexora Mobile',
    'c1000000-0000-0000-0000-000000000001',
    'Mobiles & Phones',
    899.00,
    999.00,
    10,
    4.95,
    412,
    true,
    35,
    true,
    true,
    true,
    false,
    'Flagship 2026',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
    ARRAY[
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80'
    ]::TEXT[],
    'Grade 5 titanium unibody, 6.7" 120Hz LTPO ProMotion display, clean distraction-free OS, and 50MP Sony LYTIA sensor.',
    'Built without unnecessary bloatware or invasive notifications. The Nexora Phone 1 pairs raw aerospace-grade titanium with an energy-efficient sapphire screen and daylight-calibrated optical sensors for natural photography.',
    '{"Chassis Material": "Grade 5 Brushed Titanium with matte ceramic rear", "Display": "6.7\" LTPO OLED (1-120Hz dynamic refresh, 2600 nits peak)", "Processor": "Next-Gen 3nm Neural SoC", "Camera System": "50MP Primary (1\" sensor) + 50MP Ultra-Wide Macro", "Battery & Charging": "5,200 mAh, 65W wired GaN + 25W MagSafe wireless", "Operating System": "Nexora ZenOS (Zero ad tracking, 5-year guarantees)"}'::jsonb,
    ARRAY['mobile', 'phone', 'smartphone', 'titanium', 'flagship', 'electronics']
),
(
    'a1000000-0000-0000-0000-000000000002',
    'Nexora AirPulse Pro Spatial Wireless Earbuds',
    'nexora-airpulse-pro-earbuds',
    'Nexora Audio',
    'c1000000-0000-0000-0000-000000000001',
    'AirPods & Audio',
    199.00,
    249.00,
    20,
    4.90,
    520,
    true,
    60,
    true,
    true,
    true,
    false,
    'Spatial Planar Audio',
    'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
    ARRAY[
        'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop&q=80'
    ]::TEXT[],
    'True wireless planar magnetic earphones with adaptive real-time ANC, spatial head-tracking, and wireless charging.',
    'Featuring custom 11mm beryllium-coated dynamic drivers paired with balanced armature tweeters. Provides ultra-low latency spatial sound with transparency mode that feels completely natural.',
    '{"Driver": "11mm Beryllium Dynamic + Balanced Armature", "ANC": "Hybrid Active Noise Cancellation -45dB", "Battery Life": "8h per charge (36h with case)", "Connectivity": "Bluetooth 5.4 LE Audio & LC3", "Water Resistance": "IPX5 Sweat & Water Resistant"}'::jsonb,
    ARRAY['airpods', 'audio', 'earbuds', 'wireless', 'anc', 'electronics']
),
(
    'a1000000-0000-0000-0000-000000000003',
    'MagFlux Carbon 65W Magnetic Fast-Charging Power Bank',
    'magflux-carbon-magnetic-fast-charging-power-bank',
    'VoltCraft EDC',
    'c1000000-0000-0000-0000-000000000001',
    'Power Banks & Fast Charging',
    79.00,
    95.00,
    16,
    4.88,
    280,
    true,
    64,
    true,
    true,
    true,
    false,
    'Must-Have EDC',
    'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80',
    ARRAY[
        'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1609592424364-706593d8b5eb?w=800&auto=format&fit=crop&q=80'
    ]::TEXT[],
    'Real carbon-fiber faceplate, ultra-strong N52 neodymium magnets, 15W Qi2 wireless, and 30W bi-directional USB-C PD.',
    'Snaps directly to the back of your phone with zero bulk. High-density silicon-anode cells pack 10,000mAh into a slim 12mm profile that passes airline carry-on regulations effortlessly.',
    '{"Capacity": "10,000 mAh / 38.5 Wh Airline Safe", "Wireless Output": "15W Fast Magnetic Wireless (Qi2 Certified)", "USB-C Wired Output": "30W Power Delivery 3.0", "Chassis": "Real 3K Carbon Fiber + Anodized Aluminum alloy", "Dimensions": "104 x 68 x 12.8 mm", "Weight": "182 grams"}'::jsonb,
    ARRAY['powerbank', 'charger', 'magsafe', 'portable battery', 'electronics']
),
(
    'a1000000-0000-0000-0000-000000000004',
    'Nexora Studio Pro Acoustic Headphones',
    'nexora-studio-pro-headphones',
    'Aevum Sound Labs',
    'c1000000-0000-0000-0000-000000000001',
    'Over-Ear Audio',
    349.00,
    420.00,
    17,
    4.92,
    128,
    true,
    18,
    true,
    true,
    true,
    false,
    'Studio Master',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80',
    ARRAY[
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80'
    ]::TEXT[],
    'Open-back planar magnetic headphones with hand-machined aluminum earcups and lambskin memory cushions.',
    'The Nexora Studio Pro represents our relentless dedication to acoustic transparency. Designed with 50mm planar drivers calibrated in Copenhagen, these open-back headphones reproduce sub-bass frequencies and microscopic transients with zero distortion.',
    '{"Driver Type": "50mm Planar Magnetic", "Frequency Response": "10Hz - 48,000Hz", "Impedance": "32 Ohms", "Weight": "295g", "Connection": "Detachable 3.5mm Silver-Plated OFC"}'::jsonb,
    ARRAY['audio', 'headphones', 'studio', 'planar', 'electronics']
),
(
    'a1000000-0000-0000-0000-000000000005',
    'Merino Wool Architectural Overshirt',
    'merino-wool-architectural-overshirt',
    'Kanso Atelier',
    'c1000000-0000-0000-0000-000000000002',
    'Outerwear & Coats',
    220.00,
    260.00,
    15,
    4.85,
    84,
    true,
    30,
    true,
    false,
    true,
    true,
    'Winter Essential',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1000&auto=format&fit=crop&q=80',
    ARRAY[
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1000&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80'
    ]::TEXT[],
    'Heavyweight 380 GSM Australian merino wool with matte horn buttons and dropped shoulder silhouette.',
    'A modern interpretation of utilitarian workwear crafted from premium Australian merino wool. Offers thermal regulation and natural odor resistance, making it the ideal transitional layering piece for urban commutes.',
    '{"Material": "100% Australian Merino Wool (380 GSM)", "Buttons": "Natural Matte Bio-Horn", "Fit": "Relaxed Architectural Drop-Shoulder", "Care": "Dry Clean or Gentle Cold Wool Handwash"}'::jsonb,
    ARRAY['fashion', 'wool', 'overshirt', 'winter', 'outerwear']
),
(
    'a1000000-0000-0000-0000-000000000006',
    'Nordic Solid White Oak Dining Table',
    'nordic-solid-white-oak-dining-table',
    'Lund & Co.',
    'c1000000-0000-0000-0000-000000000003',
    'Furniture & Seating',
    1250.00,
    1450.00,
    13,
    4.96,
    46,
    true,
    6,
    true,
    false,
    false,
    true,
    'Master Woodcraft',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&auto=format&fit=crop&q=80',
    ARRAY[
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80'
    ]::TEXT[],
    'FSC-certified European white oak with organic matte soap-finish and traditional mortise-and-tenon joints.',
    'Sculpted by second-generation joiners in Smaland, Sweden. Each tabletop features continuous grain boards hand-selected for natural character. Protected with non-toxic Scandinavian hardwax oil.',
    '{"Timber": "Sustainably Harvested FSC White Oak", "Seating Capacity": "6 to 8 Persons Comfortably", "Finish": "Organic Natural Hardwax Oil", "Dimensions": "220cm L x 90cm W x 74cm H"}'::jsonb,
    ARRAY['home', 'furniture', 'oak', 'dining', 'scandinavian']
)
ON CONFLICT (slug) DO UPDATE SET
    price = EXCLUDED.price,
    stock_count = EXCLUDED.stock_count,
    thumbnail = EXCLUDED.thumbnail,
    images = EXCLUDED.images,
    subcategory = EXCLUDED.subcategory,
    specs = EXCLUDED.specs;

-- 3. SEED PRODUCT VARIANTS (Valid Hexadecimal UUIDs: b1000000-0000-0000-0000-...)
INSERT INTO public.product_variants (id, product_id, name, sku, price_modifier, stock_count, attributes)
VALUES
    ('b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', '256GB Unified - Raw Natural Titanium', 'NX-PH1-256-NAT', 0.00, 15, '{"Storage": "256GB Unified", "Color": "Raw Natural Titanium"}'::jsonb),
    ('b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000001', '512GB Unified - Stealth Black Titanium', 'NX-PH1-512-BLK', 100.00, 13, '{"Storage": "512GB Unified", "Color": "Stealth Black Titanium"}'::jsonb),
    ('b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000002', 'Horizon AirPods Pro - Matte Bone White', 'NX-AP-WHT', 0.00, 25, '{"Color": "Matte Bone White"}'::jsonb),
    ('b1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000002', 'Horizon AirPods Pro - Deep Charcoal', 'NX-AP-CHR', 0.00, 17, '{"Color": "Deep Charcoal"}'::jsonb),
    ('b1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000005', 'Medium (M) - Heather Charcoal', 'NX-WOOL-M-CHR', 0.00, 15, '{"Size": "Medium (M)", "Color": "Heather Charcoal"}'::jsonb),
    ('b1000000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000005', 'Large (L) - Heather Charcoal', 'NX-WOOL-L-CHR', 0.00, 15, '{"Size": "Large (L)", "Color": "Heather Charcoal"}'::jsonb)
ON CONFLICT (sku) DO NOTHING;

-- 4. SEED PRODUCT IMAGES (Editorial Gallery)
INSERT INTO public.product_images (product_id, image_url, display_order, is_primary)
VALUES
    ('a1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80', 0, true),
    ('a1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80', 1, false),
    ('a1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80', 2, false),
    ('a1000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80', 0, true),
    ('a1000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop&q=80', 1, false),
    ('a1000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80', 0, true),
    ('a1000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80', 0, true),
    ('a1000000-0000-0000-0000-000000000005', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1000&auto=format&fit=crop&q=80', 0, true),
    ('a1000000-0000-0000-0000-000000000006', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&auto=format&fit=crop&q=80', 0, true)
ON CONFLICT DO NOTHING;
