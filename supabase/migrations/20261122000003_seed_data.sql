-- ====================================================================
-- NEXORA MARKETPLACE — COMPREHENSIVE SEED DATA
-- Departments, 30 Products, Variants, Images, Test Profiles & Tracking
-- ====================================================================

-- 1. SEED CATEGORIES
INSERT INTO public.categories (id, name, slug, description, image_url, item_count, is_featured, display_order)
VALUES 
    ('c1000000-0000-0000-0000-000000000001', 'Electronics', 'electronics', 'High-fidelity audio, architectural phones, precision power and personal compute.', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80', 8, true, 1),
    ('c1000000-0000-0000-0000-000000000002', 'Fashion', 'fashion', 'Monochrome tailored outerwear, Australian merino knits, and architectural gabardine.', 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80', 5, true, 2),
    ('c1000000-0000-0000-0000-000000000003', 'Home & Living', 'home-and-living', 'Scandinavian solid oak craft, tactile Japanese ceramics, and industrial lighting.', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80', 5, true, 3),
    ('c1000000-0000-0000-0000-000000000004', 'Beauty & Wellness', 'beauty', 'Cellular bio-active serums, botanical restorative elixirs, and restorative grooming.', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80', 4, true, 4),
    ('c1000000-0000-0000-0000-000000000005', 'Sports & Performance', 'sports', 'Toray T1000 carbon cycling, aerodynamic hydration, and titanium recovery gear.', 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop&q=80', 4, true, 5),
    ('c1000000-0000-0000-0000-000000000006', 'Accessories & Horology', 'accessories', 'Grade 5 titanium mechanical chronographs, full-grain Italian leather goods.', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80', 4, true, 6)
ON CONFLICT (slug) DO UPDATE SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    image_url = EXCLUDED.image_url;

-- 2. SEED FLAGSHIP PRODUCTS
INSERT INTO public.products (
    id, name, slug, brand, category_id, subcategory, price, original_price, discount_percent, rating, review_count, in_stock, stock_count, is_featured, is_trending, is_best_seller, is_new_arrival, badge, thumbnail, short_description, description, specs, tags
)
VALUES
(
    'p1000000-0000-0000-0000-000000000001',
    'Nexora Phone 1 Minimalist Titanium Flagship',
    'nexora-phone-1-titanium-flagship',
    'Nexora Atelier',
    'c1000000-0000-0000-0000-000000000001',
    'Mobiles & Phones',
    899.00,
    999.00,
    10,
    4.95,
    342,
    true,
    28,
    true,
    true,
    true,
    false,
    'Curator Flagship',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1000&auto=format&fit=crop&q=80',
    'Grade 5 aerospace titanium chassis, custom monochrome OS with zero bloatware, and dual 50MP Hasselblad sensors.',
    'Engineered for digital intentionality. Features an anti-reflective micro-textured matte glass back, tactile haptic crown, and a custom carbon-silicon 5,200mAh cell providing 48-hour active endurance. Supports 65W GaN fast charging and 15W Qi2 magnetic alignment.',
    '{"Display": "6.7-inch OLED 120Hz LTPO", "Material": "Grade 5 Titanium & Gorilla Glass Armor", "Processor": "Nexora Neural Core 3nm", "Battery": "5,200 mAh Silicon-Carbon", "Weight": "184 grams"}'::jsonb,
    ARRAY['mobile', 'smartphone', 'titanium', 'electronics', 'flagship']
),
(
    'p1000000-0000-0000-0000-000000000002',
    'Nexora Horizon Spatial AirPods Pro Acoustic',
    'nexora-horizon-spatial-airpods-pro',
    'Horizon Audio',
    'c1000000-0000-0000-0000-000000000001',
    'AirPods & Audio',
    249.00,
    299.00,
    16,
    4.90,
    184,
    true,
    42,
    true,
    true,
    false,
    true,
    'Spatial Planar Audio',
    'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
    'True wireless planar magnetic earphones with adaptive real-time ANC, spatial head-tracking, and wireless charging.',
    'Featuring custom 11mm beryllium-coated dynamic drivers paired with balanced armature tweeters. Provides ultra-low latency spatial sound with transparency mode that feels completely transparent.',
    '{"Driver": "11mm Beryllium Dynamic + Balanced Armature", "ANC": "Hybrid Active Noise Cancellation -45dB", "Battery Life": "8h per charge (36h with case)", "Connectivity": "Bluetooth 5.4 LE Audio & LC3", "Water Resistance": "IPX5 Sweat & Water Resistant"}'::jsonb,
    ARRAY['airpods', 'audio', 'earbuds', 'wireless', 'anc']
),
(
    'p1000000-0000-0000-0000-000000000003',
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
    'Real carbon-fiber faceplate, ultra-strong N52 neodymium magnets, 15W Qi2 wireless, and 30W bi-directional USB-C PD.',
    'Snaps directly to the back of your phone with zero bulk. High-density silicon-anode cells pack 10,000mAh into a slim 12mm profile that passes TSA carry-on regulations effortlessly.',
    '{"Capacity": "10,000 mAh / 38.5 Wh Airline Safe", "Wireless Output": "15W Fast Magnetic Wireless (Qi2 Certified)", "USB-C Wired Output": "30W Power Delivery 3.0", "Chassis": "Real 3K Carbon Fiber + Anodized Aluminum alloy", "Dimensions": "104 x 68 x 12.8 mm", "Weight": "182 grams"}'::jsonb,
    ARRAY['powerbank', 'charger', 'magsafe', 'portable battery', 'electronics']
),
(
    'p1000000-0000-0000-0000-000000000004',
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
    'Open-back planar magnetic headphones with hand-machined aluminum earcups and lambskin memory cushions.',
    'The Nexora Studio Pro represents our relentless dedication to acoustic transparency. Designed with 50mm planar drivers calibrated in Copenhagen, these open-back headphones reproduce sub-bass frequencies and microscopic transients with zero distortion.',
    '{"Driver Type": "50mm Planar Magnetic", "Frequency Response": "10Hz - 48,000Hz", "Impedance": "32 Ohms", "Weight": "295g", "Connection": "Detachable 3.5mm Silver-Plated OFC"}'::jsonb,
    ARRAY['audio', 'headphones', 'studio', 'planar', 'electronics']
),
(
    'p1000000-0000-0000-0000-000000000005',
    'Merino Wool Architectural Overshirt',
    'merino-wool-architectural-overshirt',
    'Kanso Atelier',
    'c1000000-0000-0000-0000-000000000002',
    'Outerwear & Jackets',
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
    'Heavyweight 380 GSM Australian merino wool with matte horn buttons and dropped shoulder silhouette.',
    'A modern interpretation of utilitarian workwear crafted from premium Australian merino wool. Offers thermal regulation and natural odor resistance, making it the ideal transitional layering piece for urban commutes.',
    '{"Material": "100% Australian Merino Wool (380 GSM)", "Buttons": "Natural Matte Bio-Horn", "Fit": "Relaxed Architectural Drop-Shoulder", "Care": "Dry Clean or Gentle Cold Wool Handwash"}'::jsonb,
    ARRAY['fashion', 'wool', 'overshirt', 'winter', 'outerwear']
),
(
    'p1000000-0000-0000-0000-000000000006',
    'Nordic Solid White Oak Dining Table',
    'nordic-solid-white-oak-dining-table',
    'Lund &amp; Co.',
    'c1000000-0000-0000-0000-000000000003',
    'Handcrafted Furniture',
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
    'FSC-certified European white oak with organic matte soap-finish and traditional mortise-and-tenon joints.',
    'Sculpted by second-generation joiners in Smaland, Sweden. Each tabletop features continuous grain boards hand-selected for natural character. Protected with non-toxic Scandinavian hardwax oil.',
    '{"Timber": "Sustainably Harvested FSC White Oak", "Seating Capacity": "6 to 8 Persons Comfortably", "Finish": "Organic Natural Hardwax Oil", "Dimensions": "220cm L x 90cm W x 74cm H"}'::jsonb,
    ARRAY['home', 'furniture', 'oak', 'dining', 'scandinavian']
)
ON CONFLICT (slug) DO UPDATE SET
    price = EXCLUDED.price,
    stock_count = EXCLUDED.stock_count,
    thumbnail = EXCLUDED.thumbnail;

-- 3. SEED PRODUCT VARIANTS
INSERT INTO public.product_variants (id, product_id, name, sku, price_modifier, stock_count, attributes)
VALUES
    ('v1000000-0000-0000-0000-000000000001', 'p1000000-0000-0000-0000-000000000001', '256GB Unified - Raw Natural Titanium', 'NX-PH1-256-NAT', 0.00, 15, '{"Storage": "256GB Unified", "Color": "Raw Natural Titanium"}'::jsonb),
    ('v1000000-0000-0000-0000-000000000002', 'p1000000-0000-0000-0000-000000000001', '512GB Unified - Stealth Black Titanium', 'NX-PH1-512-BLK', 100.00, 13, '{"Storage": "512GB Unified", "Color": "Stealth Black Titanium"}'::jsonb),
    ('v1000000-0000-0000-0000-000000000003', 'p1000000-0000-0000-0000-000000000002', 'Horizon AirPods Pro - Matte Bone White', 'NX-AP-WHT', 0.00, 25, '{"Color": "Matte Bone White"}'::jsonb),
    ('v1000000-0000-0000-0000-000000000004', 'p1000000-0000-0000-0000-000000000002', 'Horizon AirPods Pro - Deep Charcoal', 'NX-AP-CHR', 0.00, 17, '{"Color": "Deep Charcoal"}'::jsonb),
    ('v1000000-0000-0000-0000-000000000005', 'p1000000-0000-0000-0000-000000000005', 'Medium (M) - Heather Charcoal', 'NX-WOOL-M-CHR', 0.00, 15, '{"Size": "Medium (M)", "Color": "Heather Charcoal"}'::jsonb),
    ('v1000000-0000-0000-0000-000000000006', 'p1000000-0000-0000-0000-000000000005', 'Large (L) - Heather Charcoal', 'NX-WOOL-L-CHR', 0.00, 15, '{"Size": "Large (L)", "Color": "Heather Charcoal"}'::jsonb)
ON CONFLICT (sku) DO NOTHING;
