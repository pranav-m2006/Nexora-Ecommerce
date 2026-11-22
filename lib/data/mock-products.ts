import { Product } from "../types";

export const mockProducts: Product[] = [
  // ==========================================
  // 1. ELECTRONICS: MOBILES & SMARTPHONES
  // ==========================================
  {
    id: "nx-prod-mob-1",
    slug: "nexora-phone-1-titanium-flagship",
    name: "Nexora Phone 1 Minimalist Titanium Flagship",
    brand: "Nexora Mobile",
    category: "Electronics",
    categorySlug: "electronics",
    subcategory: "Mobiles & Phones",
    price: 899.00,
    originalPrice: 999.00,
    discountPercent: 10,
    rating: 4.9,
    reviewCount: 412,
    inStock: true,
    stockCount: 35,
    isFeatured: true,
    isTrending: true,
    badge: "Flagship 2026",
    thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80"
    ],
    shortDescription: "Grade 5 titanium unibody, 6.7\" 120Hz LTPO ProMotion display, clean distraction-free OS, and 50MP Sony LYTIA sensor.",
    description: "Built without unnecessary bloatware or invasive notifications. The Nexora Phone 1 pairs raw aerospace-grade titanium with an energy-efficient sapphire screen and daylight-calibrated optical sensors for natural, un-manipulated photography.",
    specs: {
      "Chassis Material": "Grade 5 Brushed Titanium with matte ceramic rear",
      "Display": "6.7\" LTPO OLED (1-120Hz dynamic refresh, 2600 nits peak)",
      "Processor": "Next-Gen 3nm Neural SoC",
      "Camera System": "50MP Primary (1\" sensor) + 50MP Ultra-Wide Macro",
      "Battery & Charging": "5,200 mAh, 65W wired GaN + 25W MagSafe wireless",
      "Operating System": "Nexora ZenOS (Zero ad tracking, 5-year guarantees)"
    },
    variants: [
      { id: "storage", name: "Storage", options: ["256GB Unified", "512GB High-Speed", "1TB Pro"] },
      { id: "color", name: "Color", options: ["Raw Titanium", "Obsidian Matte", "Ivory Frost"] }
    ],
    tags: ["mobile", "phone", "smartphone", "titanium", "flagship", "electronics"]
  },
  {
    id: "nx-prod-mob-2",
    slug: "lumina-fold-ultra-dual-screen",
    name: "Lumina Fold Ultra Dual-Screen Slate",
    brand: "Lumina Tech",
    category: "Electronics",
    categorySlug: "electronics",
    subcategory: "Mobiles & Phones",
    price: 1399.00,
    originalPrice: 1549.00,
    discountPercent: 9,
    rating: 4.8,
    reviewCount: 94,
    inStock: true,
    stockCount: 14,
    isNewArrival: true,
    badge: "Foldable Tech",
    thumbnail: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80"
    ],
    shortDescription: "Ultra-thin zero-crease titanium hinge folding from a compact 6.2\" outer cover into an 8.0\" cinema workstation.",
    description: "Engineered for architects, developers, and writers. Split-screen multi-tasking without thermal throttling, featuring an integrated stylus dock and water-resistant carbon seals.",
    specs: {
      "Fold Display": "8.0\" Flexible AMOLED with Ultra-Thin Glass (UTG)",
      "Cover Display": "6.2\" Gorilla Glass Armor (20:9 ratio)",
      "Hinge Mechanism": "Zero-gap dual-pivot carbon-titanium teardrop hinge",
      "RAM & Storage": "16GB LPDDR5X + 512GB UFS 4.0",
      "Weight": "239 grams"
    },
    variants: [
      { id: "color", name: "Color", options: ["Space Slate", "Desert Sand"] }
    ],
    tags: ["mobile", "foldable", "phone", "tablet", "dual-screen", "electronics"]
  },

  // ==========================================
  // 2. ELECTRONICS: AIRPODS & WIRELESS AUDIO
  // ==========================================
  {
    id: "nx-prod-aud-1",
    slug: "nexora-airpulse-pro-earbuds",
    name: "Nexora AirPulse Pro Spatial Wireless Earbuds",
    brand: "Nexora Audio",
    category: "Electronics",
    categorySlug: "electronics",
    subcategory: "AirPods & Audio",
    price: 199.00,
    originalPrice: 249.00,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 520,
    inStock: true,
    stockCount: 88,
    isFeatured: true,
    isBestSeller: true,
    badge: "Top Rated Audio",
    thumbnail: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&auto=format&fit=crop&q=80"
    ],
    shortDescription: "Dual micro-planar magnetic drivers, custom 45dB hybrid ANC, wireless charging case with metal finish, and 36hr battery.",
    description: "The ultimate pocketable listening device. Custom acoustic vents equalize ear-canal pressure during extended sessions, while head-tracking spatial audio reproduces lifelike three-dimensional soundstages.",
    specs: {
      "Driver Type": "10mm dynamic woofer + 6mm planar tweeter array",
      "Noise Cancellation": "Adaptive 45dB Smart ANC with Wind Reduction",
      "Battery Playtime": "8 hours per bud (36 hours with case)",
      "Water Resistance": "IPX5 Sweat & Rain Resistant",
      "Case Charging": "Qi Wireless + USB-C Rapid Fast Charge"
    },
    variants: [
      { id: "color", name: "Edition", options: ["Arctic White", "Matte Carbon", "Electric Lime Accent"] }
    ],
    tags: ["airpods", "earbuds", "audio", "anc", "wireless", "headphones", "bluetooth"]
  },
  {
    id: "nx-prod-1",
    slug: "nexora-studio-pro-headphones",
    name: "Nexora Studio Pro Acoustic Headphones",
    brand: "Nexora Audio",
    category: "Electronics",
    categorySlug: "electronics",
    subcategory: "AirPods & Audio",
    price: 349.00,
    originalPrice: 420.00,
    discountPercent: 17,
    rating: 4.9,
    reviewCount: 328,
    inStock: true,
    stockCount: 42,
    isFeatured: true,
    isTrending: true,
    badge: "Staff Pick",
    thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80"
    ],
    shortDescription: "Custom planar magnetic drivers, adaptive ANC, and 48-hour continuous lossless playback.",
    description: "Designed in collaboration with acoustic sound designers, the Nexora Studio Pro delivers studio-grade spatial precision in an ultra-lightweight magnesium alloy chassis.",
    specs: {
      "Acoustic Architecture": "Closed-back planar magnetic",
      "Active Noise Cancellation": "Hybrid 6-mic feedforward & feedback",
      "Battery Life": "48 hours (ANC enabled)",
      "Connectivity": "Bluetooth 5.4, aptX Lossless, 3.5mm analog, USB-C DAC"
    },
    variants: [
      { id: "color", name: "Color", options: ["Matte Charcoal", "Warm Ivory", "Olive Drab"] }
    ],
    tags: ["headphones", "anc", "lossless", "audio", "studio"]
  },
  {
    id: "nx-prod-4",
    slug: "orbit-smart-ambient-speaker",
    name: "Orbit Sculptural Ambient Smart Speaker",
    brand: "Nexora Audio",
    category: "Electronics",
    categorySlug: "electronics",
    subcategory: "AirPods & Audio",
    price: 289.00,
    originalPrice: 320.00,
    discountPercent: 10,
    rating: 4.7,
    reviewCount: 84,
    inStock: true,
    stockCount: 28,
    isTrending: true,
    thumbnail: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80"
    ],
    shortDescription: "360-degree acoustic dispersion with solid walnut base and integrated dimmable warm halo light.",
    description: "Orbit blends interior artistry with studio sound. Room-sensing acoustics dynamically calibrate audio reflections based on surrounding walls.",
    specs: {
      "Acoustic Drivers": "1x 4.5\" Neodymium Subwoofer + 3x 1.25\" Silk Dome Tweeters",
      "Output": "95W Peak Class-D amplification",
      "Lighting": "2200K - 3000K warm circadian ambient light ring"
    },
    tags: ["speaker", "smart-home", "minimal", "audio", "interior"]
  },

  // ==========================================
  // 3. ELECTRONICS: POWER BANKS & CHARGERS
  // ==========================================
  {
    id: "nx-prod-pwr-1",
    slug: "magpower-carbon-wireless-power-bank",
    name: "MagPower Carbon 10,000mAh Magnetic Power Bank",
    brand: "Volt Minimal",
    category: "Electronics",
    categorySlug: "electronics",
    subcategory: "Power Banks & Fast Charging",
    price: 79.00,
    originalPrice: 95.00,
    discountPercent: 16,
    rating: 4.9,
    reviewCount: 280,
    inStock: true,
    stockCount: 64,
    isFeatured: true,
    isBestSeller: true,
    badge: "Must-Have EDC",
    thumbnail: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80"
    ],
    shortDescription: "Real carbon-fiber faceplate, ultra-strong N52 neodymium magnets, 15W Qi2 wireless, and 30W bi-directional USB-C PD.",
    description: "Snaps directly to the back of your phone with zero bulk. High-density silicon-anode cells pack 10,000mAh into a slim 12mm profile that passes TSA carry-on regulations effortlessly.",
    specs: {
      "Capacity": "10,000 mAh / 38.5 Wh Airline Safe",
      "Wireless Output": "15W Fast Magnetic Wireless (Qi2 Certified)",
      "USB-C Wired Output": "30W Power Delivery 3.0",
      "Chassis": "Real 3K Carbon Fiber + Anodized Aluminum alloy",
      "Dimensions": "104 x 68 x 12.8 mm",
      "Weight": "182 grams"
    },
    variants: [
      { id: "color", name: "Finish", options: ["Matte Weave Carbon", "Forged Carbon Marble"] }
    ],
    tags: ["power-bank", "charger", "magsafe", "battery", "fast-charging", "electronics"]
  },
  {
    id: "nx-prod-pwr-2",
    slug: "nexora-volt-140w-gan-power-station",
    name: "Nexora Volt 140W GaN 25,000mAh Power Station",
    brand: "Volt Minimal",
    category: "Electronics",
    categorySlug: "electronics",
    subcategory: "Power Banks & Fast Charging",
    price: 139.00,
    originalPrice: 169.00,
    discountPercent: 17,
    rating: 4.8,
    reviewCount: 165,
    inStock: true,
    stockCount: 30,
    isNewArrival: true,
    thumbnail: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80"
    ],
    shortDescription: "Charges 3 devices at full 140W speed with real-time OLED voltage telemetry display and smart thermals.",
    description: "Enough power to recharge a 16-inch MacBook Pro from 0 to 50% in 28 minutes while keeping your phone and earbuds topped off simultaneously.",
    specs: {
      "Total Output": "140W USB-PD 3.1",
      "Port Config": "2x USB-C (140W max) + 1x USB-A (22.5W)",
      "Screen": "Full-color OLED real-time wattage monitor",
      "Cell Type": "Automotive-grade 21700 lithium cells",
      "Recharge Time": "Fully recharged in under 55 minutes"
    },
    tags: ["power-bank", "gan", "charger", "laptop-charger", "140w", "electronics"]
  },

  // ==========================================
  // 4. HOME & LIVING: HOUSE ITEMS, DESKS, KNIVES, DIFFUSERS
  // ==========================================
  {
    id: "nx-prod-8",
    slug: "aeris-sculptural-lounge-chair",
    name: "Aeris Solid Oak Sculptural Lounge Chair",
    brand: "Nordic Elements",
    category: "Home & Living",
    categorySlug: "home-and-living",
    subcategory: "Furniture & Seating",
    price: 890.00,
    originalPrice: 1100.00,
    discountPercent: 19,
    rating: 4.9,
    reviewCount: 46,
    inStock: true,
    stockCount: 8,
    isFeatured: true,
    badge: "Design Award 2026",
    thumbnail: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80"
    ],
    shortDescription: "Steam-bent European white oak frame with hand-loomed bouclé wool upholstery.",
    description: "The Aeris chair reconciles organic curvature with architectural stability. Deep ergonomic pitch cradles the body during hours of reading.",
    specs: {
      "Dimensions": "H: 74cm x W: 82cm x D: 79cm (Seat H: 41cm)",
      "Timber": "Sustainably harvested FSC-certified white oak",
      "Upholstery": "High-durability 42,000 Martindale textured bouclé"
    },
    variants: [
      { id: "wood", name: "Wood Finish", options: ["Smoked Oak", "Natural White Oak"] }
    ],
    tags: ["furniture", "chair", "lounge", "oak", "interior", "home"]
  },
  {
    id: "nx-prod-hom-1",
    slug: "apex-motorized-ergonomic-standing-desk",
    name: "Apex Solid Walnut Motorized Standing Desk",
    brand: "Nordic Elements",
    category: "Home & Living",
    categorySlug: "home-and-living",
    subcategory: "Ergonomic Desks",
    price: 749.00,
    originalPrice: 890.00,
    discountPercent: 15,
    rating: 4.9,
    reviewCount: 118,
    inStock: true,
    stockCount: 12,
    isFeatured: true,
    badge: "Workplace Essential",
    thumbnail: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop&q=80"
    ],
    shortDescription: "Single-slab American black walnut desktop with whisper-quiet dual German linear motors and 4-memory OLED keypad.",
    description: "Transform your home workspace with continuous ergonomic height adjustments from 62cm to 128cm. Integrated magnetic cable channel routes all clutter invisibly.",
    specs: {
      "Desktop Material": "Solid American Walnut with natural beeswax seal",
      "Dimensions": "150cm length x 75cm depth x 3.2cm thickness",
      "Motor Performance": "Dual German motors, 38mm/s speed, <42dB sound",
      "Load Capacity": "140 kg (308 lbs)"
    },
    variants: [
      { id: "size", name: "Desktop Size", options: ["140cm x 70cm", "160cm x 80cm"] }
    ],
    tags: ["desk", "standing-desk", "walnut", "office", "ergonomic", "home"]
  },
  {
    id: "nx-prod-hom-2",
    slug: "aura-pure-ultrasonic-hepa-air-purifier",
    name: "Aura Pure Cylindrical HEPA Air Purifier",
    brand: "Lumina Tech",
    category: "Home & Living",
    categorySlug: "home-and-living",
    subcategory: "Air Purifiers & Diffusers",
    price: 220.00,
    originalPrice: 260.00,
    discountPercent: 15,
    rating: 4.8,
    reviewCount: 75,
    inStock: true,
    stockCount: 26,
    isTrending: true,
    thumbnail: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&auto=format&fit=crop&q=80"
    ],
    shortDescription: "Anodized aluminum cylinder with medical-grade H13 True HEPA filter, carbon VOC layer, and near-silent 19dB night mode.",
    description: "Removes 99.97% of airborne particulate matter, allergens, and wildfire smoke down to 0.1 microns while doubling as a minimalist decorative sculpture.",
    specs: {
      "Filtration": "3-Stage: Pre-mesh + Medical H13 HEPA + Activated Coconut Carbon",
      "Coverage Area": "Up to 650 sq ft (full air exchange every 12 mins)",
      "Noise Level": "19dB Whisper-Quiet Sleep Mode",
      "Smart Control": "Air quality laser sensor with auto-speed scaling"
    },
    tags: ["air-purifier", "home", "clean-air", "minimalist", "appliances"]
  },
  {
    id: "nx-prod-hom-3",
    slug: "damascus-steel-chef-knife-trio",
    name: "Omakase 67-Layer Damascus Steel 3-Piece Knife Set",
    brand: "Nordic Elements",
    category: "Home & Living",
    categorySlug: "home-and-living",
    subcategory: "Ceramics & Kitchenware",
    price: 245.00,
    originalPrice: 295.00,
    discountPercent: 16,
    rating: 4.9,
    reviewCount: 92,
    inStock: true,
    stockCount: 22,
    badge: "Master Chef Pick",
    thumbnail: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&auto=format&fit=crop&q=80"
    ],
    shortDescription: "Forged Japanese VG-10 steel core wrapped in 67 Damascus layers with octagonal stabilized burl wood handles.",
    description: "Razor-honed to a 15-degree edge on Japanese whetstones. The set includes an 8\" Chef Knife, a 6\" Utility Santoku, and a 3.5\" Paring Knife in a solid ash presentation box.",
    specs: {
      "Steel Core": "Japanese VG-10 High Carbon Stainless (HRC 61±1)",
      "Handle": "Stabilized dyed burl wood with brass spacer",
      "Included": "8\" Gyuto Chef, 6\" Santoku Prep, 3.5\" Precision Paring"
    },
    tags: ["knives", "kitchen", "cooking", "damascus", "culinary", "home"]
  },
  {
    id: "nx-prod-hom-4",
    slug: "french-linen-organic-duvet-set",
    name: "Raw French Washed Organic Linen Bedding Set",
    brand: "Atelier Forma",
    category: "Home & Living",
    categorySlug: "home-and-living",
    subcategory: "Luxury Bedding",
    price: 185.00,
    originalPrice: 225.00,
    discountPercent: 17,
    rating: 4.9,
    reviewCount: 140,
    inStock: true,
    stockCount: 30,
    thumbnail: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=80"
    ],
    shortDescription: "175 GSM Normandy stone-washed flax linen, naturally hypoallergenic, breathable, and soft with every wash.",
    description: "Experience effortless luxury sleep. Keeps you cool in summer and warm in winter through naturally thermo-regulating hollow flax fibers.",
    specs: {
      "Origin": "100% French Flax grown in Normandy, France",
      "Set Includes": "1x Duvet Cover with coconut shell buttons + 2x Pillowcases",
      "Care": "Machine washable, tumble dry low, no ironing required"
    },
    variants: [
      { id: "size", name: "Bed Size", options: ["Queen", "King", "Cal King"] },
      { id: "color", name: "Color", options: ["Natural Oatmeal", "Chalk White", "Slate Grey"] }
    ],
    tags: ["linen", "bedding", "duvet", "sheets", "home", "bedroom"]
  },

  // ==========================================
  // 5. FASHION: DRESSES, COATS, MERINO, KNITWEAR
  // ==========================================
  {
    id: "nx-prod-fas-1",
    slug: "architectural-belted-trench-coat",
    name: "Atelier Forma Storm-Bonded Trench Coat",
    brand: "Atelier Forma",
    category: "Fashion",
    categorySlug: "fashion",
    subcategory: "Outerwear & Coats",
    price: 360.00,
    originalPrice: 440.00,
    discountPercent: 18,
    rating: 4.9,
    reviewCount: 88,
    inStock: true,
    stockCount: 16,
    isFeatured: true,
    isTrending: true,
    badge: "Runway Capsule",
    thumbnail: "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80"
    ],
    shortDescription: "Double-breasted storm-resistant cotton gabardine with structured raglan sleeves and natural horn buttons.",
    description: "An iconic silhouette re-imagined with modern proportions and windproof micro-taped internal seams. Wear open for an effortless drape or belted for architectural structure.",
    specs: {
      "Material": "100% Cotton Bonded Gabardine (Water-repellent)",
      "Lining": "Cupro satin breathable interior lining",
      "Hardware": "Genuine water buffalo horn buttons & storm buckle",
      "Fit": "Relaxed tailored cut"
    },
    variants: [
      { id: "size", name: "Size", options: ["XS", "S", "M", "L", "XL"] },
      { id: "color", name: "Color", options: ["Pale Sand", "Deep Obsidian", "Olive Drab"] }
    ],
    tags: ["trench-coat", "coat", "dress", "fashion", "outerwear", "luxury"]
  },
  {
    id: "nx-prod-fas-2",
    slug: "technical-pleated-cargo-midi-dress",
    name: "Technical Pleated Cargo Midi Dress",
    brand: "Atelier Forma",
    category: "Fashion",
    categorySlug: "fashion",
    subcategory: "Dresses & Skirts",
    price: 215.00,
    originalPrice: 260.00,
    discountPercent: 17,
    rating: 4.8,
    reviewCount: 64,
    inStock: true,
    stockCount: 20,
    isNewArrival: true,
    badge: "New Silhouette",
    thumbnail: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&auto=format&fit=crop&q=80"
    ],
    shortDescription: "Lightweight Japanese memory tech-poplin with accordion pleated skirt and integrated cinch belt.",
    description: "Fuses functional utility with high-fashion restraint. Resists creasing and sheds light precipitation effortlessly, transitionable from gallery exhibitions to evening dinners.",
    specs: {
      "Fabric": "Japanese Tech-Poplin (65% Recycled Poly, 35% Organic Cotton)",
      "Features": "Concealed deep side pockets, magnetic collar catch",
      "Length": "Midi calf length"
    },
    variants: [
      { id: "size", name: "Size", options: ["XS", "S", "M", "L"] },
      { id: "color", name: "Color", options: ["Matte Black", "Bone White", "Sage Moss"] }
    ],
    tags: ["dress", "midi-dress", "fashion", "womenswear", "technical", "apparel"]
  },
  {
    id: "nx-prod-fas-3",
    slug: "silk-cashmere-crewneck-knit",
    name: "Silk-Cashmere Seamless Crewneck Sweater",
    brand: "Atelier Forma",
    category: "Fashion",
    categorySlug: "fashion",
    subcategory: "Knitwear & Sweaters",
    price: 195.00,
    originalPrice: 240.00,
    discountPercent: 18,
    rating: 4.9,
    reviewCount: 110,
    inStock: true,
    stockCount: 28,
    isBestSeller: true,
    thumbnail: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80"
    ],
    shortDescription: "70% Grade-A Mongolian cashmere blended with 30% Mulberry silk for featherlight thermal warmth.",
    description: "Knitted on 3D WHOLEGARMENT machines in Biella, Italy, without a single seam. Provides cloud-like next-to-skin softness with zero itching or pilling.",
    specs: {
      "Blend": "70% Grade-A Cashmere, 30% Mulberry Silk (16-gauge)",
      "Origin": "Knit in Piedmont, Italy",
      "Care": "Hand wash cold or eco-dry clean"
    },
    variants: [
      { id: "size", name: "Size", options: ["S", "M", "L", "XL"] },
      { id: "color", name: "Color", options: ["Ecru Chalk", "Charcoal Heather", "Navy Midnight"] }
    ],
    tags: ["sweater", "cashmere", "knitwear", "fashion", "menswear", "unisex"]
  },
  {
    id: "nx-prod-5",
    slug: "merino-wool-architectural-overshirt",
    name: "Merino Wool Modular Field Overshirt",
    brand: "Atelier Forma",
    category: "Fashion",
    categorySlug: "fashion",
    subcategory: "Outerwear & Coats",
    price: 240.00,
    originalPrice: 290.00,
    discountPercent: 17,
    rating: 4.9,
    reviewCount: 112,
    inStock: true,
    stockCount: 22,
    isFeatured: true,
    isTrending: true,
    badge: "Trending",
    thumbnail: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80"
    ],
    shortDescription: "380 GSM Australian merino twill with taped storm seams, magnetic cargo pockets, and relaxed drape.",
    description: "An intentional layer designed to bridge the boundary between heavy outerwear and structured tailoring.",
    specs: {
      "Fabrication": "100% Superfine Australian Merino Wool (380 GSM)",
      "Hardware": "Matte black Cobrax snaps & YKK Excella zippers"
    },
    variants: [
      { id: "size", name: "Size", options: ["S", "M", "L", "XL"] },
      { id: "color", name: "Color", options: ["Raw Slate", "Bone White", "Deep Obsidian"] }
    ],
    tags: ["outerwear", "wool", "streetwear", "minimalist", "jacket"]
  },
  {
    id: "nx-prod-7",
    slug: "mono-leather-minimal-sneakers",
    name: "Mono One Low-Top Nappa Sneaker",
    brand: "Studio Velo",
    category: "Fashion",
    categorySlug: "fashion",
    subcategory: "Minimal Footwear",
    price: 210.00,
    originalPrice: 250.00,
    discountPercent: 16,
    rating: 4.7,
    reviewCount: 204,
    inStock: true,
    stockCount: 18,
    isTrending: true,
    thumbnail: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80"
    ],
    shortDescription: "Buttery Italian nappa leather with Margom rubber cupsole and anatomical arch support.",
    description: "A stripped-back court silhouette that pairs effortlessly with tailored trousers or denim.",
    specs: {
      "Upper": "Full-grain Italian calf Nappa",
      "Sole": "Custom Margom natural rubber outsole"
    },
    variants: [
      { id: "size", name: "EU Size", options: ["40", "41", "42", "43", "44", "45"] }
    ],
    tags: ["shoes", "sneakers", "leather", "luxury", "footwear"]
  },

  // ==========================================
  // 6. ACCESSORIES: WATCHES, BAGS, KEYBOARDS, WALLETS
  // ==========================================
  {
    id: "nx-prod-3",
    slug: "vanguard-titanium-chronograph",
    name: "Vanguard Titanium Automatic Chronograph",
    brand: "Vanguard Horology",
    category: "Accessories",
    categorySlug: "accessories",
    subcategory: "Timepieces & Watches",
    price: 680.00,
    originalPrice: 850.00,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 96,
    inStock: true,
    stockCount: 12,
    isFeatured: true,
    isBestSeller: true,
    badge: "Limited Edition",
    thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"
    ],
    shortDescription: "Grade 5 brushed titanium case, sapphire crystal exhibition back, and 68-hour power reserve.",
    description: "A testament to mechanical minimalism. Vanguard combines contemporary architectural geometry with Swiss self-winding calibres.",
    specs: {
      "Movement": "Custom Calibre VX-90 Auto-Chrono",
      "Case Diameter": "40.5mm",
      "Water Resistance": "100m / 10 ATM"
    },
    variants: [
      { id: "strap", name: "Strap Material", options: ["Brushed Titanium Link", "Horween Calfskin Black"] }
    ],
    tags: ["watch", "horology", "titanium", "chronograph", "luxury"]
  },
  {
    id: "nx-prod-acc-1",
    slug: "nexora-vault-carbon-cardholder",
    name: "Nexora Vault Carbon Fiber RFID Cardholder",
    brand: "Vanguard Horology",
    category: "Accessories",
    categorySlug: "accessories",
    subcategory: "Cardholders & EDC",
    price: 65.00,
    originalPrice: 80.00,
    discountPercent: 18,
    rating: 4.9,
    reviewCount: 380,
    inStock: true,
    stockCount: 95,
    isBestSeller: true,
    badge: "Essential EDC",
    thumbnail: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80"
    ],
    shortDescription: "Precision CNC carbon fiber chassis holding 1-12 cards with RFID blocking shield and titanium money clip.",
    description: "Replaces bulky traditional leather wallets with an aerospace-grade card ejection chassis that fits imperceptibly into front pockets.",
    specs: {
      "Material": "3K Twill Weave Aerospace Carbon Fiber",
      "Capacity": "Up to 12 cards + cash clip",
      "RFID Protection": "13.56 MHz anti-theft cryptographic shielding",
      "Weight": "48 grams"
    },
    tags: ["wallet", "cardholder", "edc", "carbon-fiber", "accessories"]
  },
  {
    id: "nx-prod-acc-2",
    slug: "verona-leather-weekend-duffle",
    name: "Verona Full-Grain Leather Weekend Duffle",
    brand: "Studio Velo",
    category: "Accessories",
    categorySlug: "accessories",
    subcategory: "Leather Travel Bags",
    price: 340.00,
    originalPrice: 420.00,
    discountPercent: 19,
    rating: 4.9,
    reviewCount: 72,
    inStock: true,
    stockCount: 15,
    isFeatured: true,
    badge: "Handcrafted in Florence",
    thumbnail: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&auto=format&fit=crop&q=80"
    ],
    shortDescription: "Vegetable-tanned Tuscan vachetta leather with solid brass hardware and separate waterproof shoe vault.",
    description: "Develops a deep, warm honey patina with years of international flights and weekend escapes. Meets all airline overhead bin carry-on requirements.",
    specs: {
      "Dimensions": "52cm length x 28cm width x 30cm height (45L)",
      "Leather": "Certified Tuscan vegetable-tanned full-grain cowhide",
      "Lining": "Heavyweight British 12oz waxed canvas"
    },
    variants: [
      { id: "color", name: "Leather Shade", options: ["Cognac Amber", "Espresso Dark Brown", "Jet Black"] }
    ],
    tags: ["bag", "duffle", "leather", "travel", "accessories"]
  },
  {
    id: "nx-prod-acc-3",
    slug: "kinesis-75-mechanical-keyboard",
    name: "Kinesis Machined Aluminum 75% Mechanical Keyboard",
    brand: "Lumina Tech",
    category: "Accessories",
    categorySlug: "accessories",
    subcategory: "Mechanical Keyboards",
    price: 210.00,
    originalPrice: 245.00,
    discountPercent: 14,
    rating: 4.8,
    reviewCount: 114,
    inStock: true,
    stockCount: 20,
    isTrending: true,
    thumbnail: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80"
    ],
    shortDescription: "Solid CNC aluminum unibody, hot-swappable pre-lubed tactile switches, gasket mount acoustic dampening.",
    description: "Delivers a deep, satisfying acoustic thock on every keystroke. Connects to 3 devices simultaneously via low-latency 2.4GHz dongle or Bluetooth 5.2.",
    specs: {
      "Case": "6063 Anodized CNC Aluminum (1.7kg heavy desktop stability)",
      "Switches": "Custom Gateron Oil King Lubed Linear / Tactile",
      "Keycaps": "Double-shot PBT Cherry profile (fade resistant)"
    },
    variants: [
      { id: "switch", name: "Switch Type", options: ["Velvet Linear", "Tactile Studio Marble"] }
    ],
    tags: ["keyboard", "mechanical", "aluminum", "edc", "accessories"]
  },
  {
    id: "nx-prod-15",
    slug: "stratos-waterproof-commuter-backpack",
    name: "Stratos 28L Waterproof Tech Pack",
    brand: "Studio Velo",
    category: "Accessories",
    categorySlug: "accessories",
    subcategory: "Leather Travel Bags",
    price: 185.00,
    originalPrice: 220.00,
    discountPercent: 16,
    rating: 4.9,
    reviewCount: 310,
    inStock: true,
    stockCount: 50,
    isFeatured: true,
    thumbnail: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80"
    ],
    shortDescription: "X-Pac laminated sailcloth, magnetic Fidlock buckle closures, and suspended 16\" laptop compartment.",
    description: "The ultimate weatherproof carry for urban commutes and intercontinental travel.",
    specs: {
      "Capacity": "28 Liters (expandable to 32L)",
      "Material": "VX21 Dimension-Polyant X-Pac laminate"
    },
    tags: ["backpack", "bag", "travel", "waterproof", "accessories"]
  },

  // ==========================================
  // 7. BEAUTY & WELLNESS: SKINCARE, SCULPTING, PERFUME
  // ==========================================
  {
    id: "nx-prod-11",
    slug: "botanical-cellular-recovery-nectar",
    name: "Bio-Cellular Midnight Repair Elixir",
    brand: "Aura Botanica",
    category: "Beauty & Wellness",
    categorySlug: "beauty",
    subcategory: "Cellular Skincare",
    price: 98.00,
    originalPrice: 120.00,
    discountPercent: 18,
    rating: 4.9,
    reviewCount: 247,
    inStock: true,
    stockCount: 65,
    isFeatured: true,
    isBestSeller: true,
    badge: "Clean Certified",
    thumbnail: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80"
    ],
    shortDescription: "Concentrated micro-algae peptides, cold-pressed sea buckthorn, and cold-extracted squalane.",
    description: "Clinically proven to reinforce the lipid barrier and accelerate overnight epidermal cell renewal.",
    specs: {
      "Volume": "30ml / 1.0 fl oz",
      "Formulation": "100% cold-pressed vegan actives"
    },
    tags: ["skincare", "serum", "clean-beauty", "elixir", "organic"]
  },
  {
    id: "nx-prod-bea-1",
    slug: "sonic-micro-current-facial-sculptor",
    name: "Sonic Deep Pore Micro-Current Sculpting Wand",
    brand: "Aura Botanica",
    category: "Beauty & Wellness",
    categorySlug: "beauty",
    subcategory: "Facial Sculpting Tech",
    price: 145.00,
    originalPrice: 180.00,
    discountPercent: 19,
    rating: 4.8,
    reviewCount: 132,
    inStock: true,
    stockCount: 38,
    isTrending: true,
    thumbnail: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80"
    ],
    shortDescription: "Medical-grade titanium contact spheres utilizing targeted 330µA micro-currents to tone facial contour muscles.",
    description: "A 5-minute daily non-invasive ritual that stimulates collagen synthesis, lifts cheekbones, and depuffs morning under-eyes with gentle sonic vibrations.",
    specs: {
      "Modes": "Lifting Microcurrent, Thermal Detox (42°C), Red Light Therapy (630nm)",
      "Battery": "Rechargeable via magnetic dock (30 uses per charge)",
      "Waterproofing": "IPX7 waterproof for use in bath"
    },
    tags: ["skincare", "device", "facial-sculpting", "beauty", "wellness"]
  },
  {
    id: "nx-prod-12",
    slug: "hinoki-vetiver-eau-de-parfum",
    name: "Hinoki & Vetiver Artisanal Extrait",
    brand: "Aura Botanica",
    category: "Beauty & Wellness",
    categorySlug: "beauty",
    subcategory: "Artisanal Fragrance",
    price: 165.00,
    originalPrice: 190.00,
    discountPercent: 13,
    rating: 4.8,
    reviewCount: 94,
    inStock: true,
    stockCount: 20,
    isNewArrival: true,
    thumbnail: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&auto=format&fit=crop&q=80"
    ],
    shortDescription: "Japanese cedar, smoked vetiver root, bergamot rind, and dried black amber resin.",
    description: "An evocative olfactory journey through misty mountain shrines.",
    specs: {
      "Concentration": "26% Pure Extrait de Parfum",
      "Volume": "50ml / 1.7 fl oz"
    },
    tags: ["perfume", "fragrance", "hinoki", "unisex", "scent"]
  },

  // ==========================================
  // 8. SPORTS & PERFORMANCE: DUMBBELLS, SHOES, HYDRATION
  // ==========================================
  {
    id: "nx-prod-13",
    slug: "kinetic-carbon-trail-running-shoes",
    name: "Kinetic Vector Carbon Trail Racer",
    brand: "Kinetics Lab",
    category: "Sports & Performance",
    categorySlug: "sports",
    subcategory: "Trail & Running Shoes",
    price: 260.00,
    originalPrice: 295.00,
    discountPercent: 12,
    rating: 4.9,
    reviewCount: 168,
    inStock: true,
    stockCount: 24,
    isFeatured: true,
    isTrending: true,
    badge: "Fastest Trail 2026",
    thumbnail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80"
    ],
    shortDescription: "Full-length curved carbon fiber propulsion plate sandwiched in dual-density PEBA supercritical foam.",
    description: "Engineered for technical alpine trails and ultra-marathons.",
    specs: {
      "Stack Height": "34mm heel / 28mm forefoot (6mm drop)",
      "Plate": "3D contoured full-length carbon composite"
    },
    variants: [
      { id: "size", name: "US Size", options: ["8", "9", "10", "11", "12"] }
    ],
    tags: ["running", "shoes", "trail", "carbon", "fitness"]
  },
  {
    id: "nx-prod-spo-1",
    slug: "apex-magnetic-adjustable-dumbbells",
    name: "Apex 50lb Magnetic Quick-Select Dumbbell Pair",
    brand: "Kinetics Lab",
    category: "Sports & Performance",
    categorySlug: "sports",
    subcategory: "Smart Gym & Dumbbells",
    price: 380.00,
    originalPrice: 450.00,
    discountPercent: 15,
    rating: 4.9,
    reviewCount: 195,
    inStock: true,
    stockCount: 18,
    isFeatured: true,
    badge: "Home Gym Essential",
    thumbnail: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80"
    ],
    shortDescription: "Instant 1-second twist selector replacing 16 pairs of weights from 5 to 50 lbs with laser-etched knurling.",
    description: "Reclaim your home floor space with an engineered cast steel interlocking mechanism that locks each plate solidly with zero rattling during explosive lifts.",
    specs: {
      "Weight Increments": "5, 10, 15, 20, 25, 30, 35, 40, 45, 50 lbs per dumbbell",
      "Grip": "28mm aircraft knurled stainless steel handle",
      "Included": "2x 50lb Dumbbells + 2x Floor Storage Docks"
    },
    tags: ["dumbbells", "fitness", "gym", "weights", "workout", "sports"]
  },
  {
    id: "nx-prod-14",
    slug: "therma-pulse-percussion-massager",
    name: "ThermaPulse Pro Deep Tissue Device",
    brand: "Kinetics Lab",
    category: "Sports & Performance",
    categorySlug: "sports",
    subcategory: "Recovery Percussion",
    price: 219.00,
    originalPrice: 279.00,
    discountPercent: 22,
    rating: 4.8,
    reviewCount: 185,
    inStock: true,
    stockCount: 40,
    isBestSeller: true,
    thumbnail: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80"
    ],
    shortDescription: "16mm amplitude percussive stroke with rapid heated thermal tip and whisper-quiet brushless motor.",
    description: "Accelerate muscle recovery and flush lactic acid in minutes.",
    specs: {
      "Stall Force": "60 lbs resistance without bogging",
      "Amplitude": "16mm professional depth"
    },
    tags: ["recovery", "massage", "fitness", "therapy", "workout"]
  },
  {
    id: "nx-prod-bea-3",
    slug: "bio-active-cellular-copper-peptide-elixir",
    name: "Bio-Active Cellular Copper Peptide Elixir (GHK-Cu)",
    brand: "Aura Botanica",
    category: "Beauty & Wellness",
    categorySlug: "beauty",
    subcategory: "Cellular Skincare",
    price: 110.00,
    originalPrice: 135.00,
    discountPercent: 18,
    rating: 4.9,
    reviewCount: 210,
    inStock: true,
    stockCount: 45,
    isFeatured: true,
    badge: "Clinical Grade",
    thumbnail: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80"
    ],
    shortDescription: "3% pure GHK-Cu copper tripeptides in a hyaluronic acid base for deep cellular barrier repair and collagen replenishment.",
    description: "Formulated without synthetic fragrance or endocrine disruptors. Penetrates deep dermal layers to firm sagging contours and reduce fine lines.",
    specs: {
      "Active Concentration": "3% GHK-Cu Copper Peptide + 2% Niacinamide",
      "Volume": "30ml / 1.0 fl oz Miron violet glass dropper",
      "Certification": "Leaping Bunny Certified Cruelty-Free"
    },
    tags: ["skincare", "serum", "peptide", "anti-aging", "beauty"]
  },
  {
    id: "nx-prod-spo-2",
    slug: "aero-titanium-insulated-hydration-flask",
    name: "Aero 950ml Double-Wall Titanium Hydration Flask",
    brand: "Kinetics Lab",
    category: "Sports & Performance",
    categorySlug: "sports",
    subcategory: "Hydration Gear",
    price: 95.00,
    originalPrice: 120.00,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 310,
    inStock: true,
    stockCount: 52,
    isBestSeller: true,
    badge: "Pure Titanium",
    thumbnail: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80"
    ],
    shortDescription: "Grade 1 pure titanium body keeping liquids cold for 36 hours with zero metallic taste and featherlight 190g weight.",
    description: "Titanium does not impart flavor or leach microplastics. Double-walled vacuum insulation prevents external condensation in extreme desert or mountain environments.",
    specs: {
      "Capacity": "950 ml / 32 fl oz",
      "Material": "Pure Grade 1 Medical Titanium (BPA Free)",
      "Thermal Retention": "36 hours iced / 18 hours boiling"
    },
    tags: ["flask", "bottle", "hydration", "titanium", "sports", "fitness"]
  }
];

export const reviewsData = [
  {
    id: "rev-1",
    userName: "Elena Rostova",
    rating: 5,
    date: "November 14, 2026",
    verified: true,
    title: "Unmatched build quality and sound separation",
    comment: "I produce podcasts and sound design tracks daily. The level of spatial fidelity and noise isolation is easily the best I've experienced under $600. The battery also actually lasts through days of heavy use.",
    helpfulCount: 42
  },
  {
    id: "rev-2",
    userName: "David M. Chen",
    rating: 5,
    date: "November 08, 2026",
    verified: true,
    title: "Minimalist aesthetic done right",
    comment: "The materials are stunning. No cheap glossy plastic, just clean matte textures and satisfying tactile switches. It feels like a piece of architectural gear.",
    helpfulCount: 19
  },
  {
    id: "rev-3",
    userName: "Sarah Jenkins",
    rating: 4,
    date: "October 29, 2026",
    verified: true,
    title: "Excellent comfort, very good companion app",
    comment: "Wore them on a 14-hour trans-Pacific flight. Zero ear fatigue or hotspotting on the top band. The ANC blocked out cabin hum effortlessly.",
    helpfulCount: 11
  }
];
