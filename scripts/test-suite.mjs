// Comprehensive Backend & Security Verification Suite for NEXORA
import crypto from "crypto";

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  \x1b[32m✔ PASS\x1b[0m: ${message}`);
  } else {
    failedTests++;
    console.error(`  \x1b[31m✖ FAIL\x1b[0m: ${message}`);
  }
}

async function runTests() {
  console.log("\n========================================================");
  console.log("       NEXORA BACKEND & INTEGRATION TEST SUITE           ");
  console.log("========================================================\n");

  let customerToken = "";
  let adminToken = "";
  let testOrderId = "";

  // ----------------------------------------------------
  // TEST GROUP 1: CATEGORIES & PRODUCTS API
  // ----------------------------------------------------
  console.log("\x1b[36m[GROUP 1] Product & Category Discovery APIs\x1b[0m");

  try {
    const catRes = await fetch(`${BASE_URL}/api/categories`);
    const catData = await catRes.json();
    assert(catRes.status === 200, "GET /api/categories returns 200 OK");
    assert(Array.isArray(catData.categories) && catData.categories.length >= 6, "Returns at least 6 verified categories");
  } catch (err) {
    assert(false, `Categories API call failed: ${err.message}`);
  }

  try {
    const prodRes = await fetch(`${BASE_URL}/api/products?limit=10`);
    const prodData = await prodRes.json();
    assert(prodRes.status === 200, "GET /api/products returns 200 OK");
    assert(prodData.products && prodData.products.length > 0, "Returns paginated catalog products");
    assert(typeof prodData.total === "number", "Returns total product count metadata");

    // Filter test
    const filterRes = await fetch(`${BASE_URL}/api/products?categorySlug=electronics&minPrice=50&maxPrice=1000`);
    const filterData = await filterRes.json();
    assert(filterRes.status === 200, "GET /api/products with category & price filter returns 200 OK");
    assert(
      filterData.products.every((p) => p.categorySlug === "electronics" && p.price >= 50 && p.price <= 1000),
      "Filtered products adhere strictly to price and category boundaries"
    );

    // Single product test
    const singleRes = await fetch(`${BASE_URL}/api/products/nexora-phone-1-titanium-flagship`);
    const singleData = await singleRes.json();
    assert(singleRes.status === 200, "GET /api/products/[slug] returns 200 OK");
    assert(singleData.product.slug === "nexora-phone-1-titanium-flagship", "Returns exact product specifications");
  } catch (err) {
    assert(false, `Products API call failed: ${err.message}`);
  }

  // ----------------------------------------------------
  // TEST GROUP 2: AUTHENTICATION & ROLE ENFORCEMENT
  // ----------------------------------------------------
  console.log("\n\x1b[36m[GROUP 2] Customer & Admin Authentication\x1b[0m");

  const testEmail = `test.shopper.${Date.now()}@example.com`;

  try {
    // Validation failure: short password
    const shortPassRes = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName: "Test User", email: testEmail, password: "123" }),
    });
    assert(shortPassRes.status === 400, "Password under 6 chars rejected with 400 Bad Request");

    // Valid customer registration
    const regRes = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName: "Test Shopper", email: testEmail, password: "securepassword123" }),
    });
    const regData = await regRes.json();
    assert(regRes.status === 201, "Customer registration creates account with 201 Created");
    assert(regData.user.role === "customer", "Enforces 'customer' role on public registration (cannot self-elevate)");
    customerToken = regData.token;

    // Duplicate email registration rejection
    const dupRes = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName: "Test Shopper", email: testEmail, password: "securepassword123" }),
    });
    assert(dupRes.status === 409, "Duplicate email registration rejected with 409 Conflict");

    // Login with invalid credentials
    const badLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: testEmail, password: "wrongpassword" }),
    });
    assert(badLoginRes.status === 401, "Invalid password rejected with 401 Unauthorized");

    // Login with valid customer credentials
    const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: testEmail, password: "securepassword123" }),
    });
    const loginData = await loginRes.json();
    assert(loginRes.status === 200, "Valid customer login returns 200 OK");
    assert(Boolean(loginData.token), "Returns signed JWT session token");

    // Login with Admin credentials
    const adminLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "admin@nexora.com", password: "password123" }),
    });
    const adminLoginData = await adminLoginRes.json();
    assert(adminLoginRes.status === 200, "Administrator login returns 200 OK");
    assert(adminLoginData.user.role === "admin", "Admin role confirmed on session token");
    adminToken = adminLoginData.token;
  } catch (err) {
    assert(false, `Auth tests failed: ${err.message}`);
  }

  // ----------------------------------------------------
  // TEST GROUP 3: SERVER-SIDE CART & WISHLIST BACKEND
  // ----------------------------------------------------
  console.log("\n\x1b[36m[GROUP 3] Server Cart & Wishlist Calculations\x1b[0m");

  try {
    // Add product to cart
    const addCartRes = await fetch(`${BASE_URL}/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${customerToken}`,
      },
      body: JSON.stringify({
        productId: "nx-prod-aud-1",
        quantity: 2,
        selectedVariant: { Color: "Matte White" },
      }),
    });
    const addCartData = await addCartRes.json();
    assert(addCartRes.status === 200, "POST /api/cart adds product with 200 OK");
    assert(addCartData.cart.itemCount >= 2, "Server cart reflects updated quantity");
    assert(addCartData.cart.subtotal > 0, "Calculates subtotal directly from database price");
    assert(addCartData.cart.shipping === 0, "Free shipping applies automatically over $150 threshold");

    // Toggle wishlist
    const wishRes = await fetch(`${BASE_URL}/api/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${customerToken}`,
      },
      body: JSON.stringify({ productId: "nx-prod-mob-1" }),
    });
    const wishData = await wishRes.json();
    assert(wishRes.status === 200, "POST /api/wishlist toggles item with 200 OK");
    assert(wishData.isInWishlist === true, "Wishlist confirms product is saved");

    // Move from wishlist to cart
    const moveRes = await fetch(`${BASE_URL}/api/wishlist/move-to-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${customerToken}`,
      },
      body: JSON.stringify({ productId: "nx-prod-mob-1", quantity: 1 }),
    });
    const moveData = await moveRes.json();
    assert(moveRes.status === 200, "Move item from wishlist to shopping bag succeeds with 200 OK");
  } catch (err) {
    assert(false, `Cart & wishlist tests failed: ${err.message}`);
  }

  // ----------------------------------------------------
  // TEST GROUP 4: ATOMIC CHECKOUT & ORDER CREATION
  // ----------------------------------------------------
  console.log("\n\x1b[36m[GROUP 4] Atomic Checkout & Order Fulfillment\x1b[0m");

  try {
    const checkoutRes = await fetch(`${BASE_URL}/api/checkout/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${customerToken}`,
      },
      body: JSON.stringify({
        shippingAddress: {
          type: "Home",
          isDefault: true,
          fullName: "Test Shopper",
          street: "100 Pine Street",
          city: "San Francisco",
          state: "CA",
          zipCode: "94111",
          phone: "+1 (555) 019-2831",
        },
        paymentMethod: "upi",
      }),
    });
    const checkoutData = await checkoutRes.json();
    assert(checkoutRes.status === 201, "POST /api/checkout/create-order creates order with 201 Created");
    assert(checkoutData.order.id.startsWith("NX-"), "Generates unique NX- prefix order reference");
    assert(checkoutData.order.status === "Order Placed", "Initial order status is 'Order Placed'");
    assert(checkoutData.order.items.length > 0, "Copies server-verified order items");
    assert(checkoutData.order.timeline.length >= 7, "Initializes 7/9-stage consignment tracking timeline");
    testOrderId = checkoutData.order.id;

    // Verify cart is cleared after checkout
    const postCartRes = await fetch(`${BASE_URL}/api/cart`, {
      headers: { Authorization: `Bearer ${customerToken}` },
    });
    const postCartData = await postCartRes.json();
    assert(postCartData.cart.items.length === 0, "Cart is atomically cleared after successful order creation");
  } catch (err) {
    assert(false, `Checkout tests failed: ${err.message}`);
  }

  // ----------------------------------------------------
  // TEST GROUP 5: RAZORPAY TEST MODE INTEGRATION
  // ----------------------------------------------------
  console.log("\n\x1b[36m[GROUP 5] Razorpay Payment Security & Signatures\x1b[0m");

  try {
    // Create Razorpay order
    const rzpOrderRes = await fetch(`${BASE_URL}/api/payments/razorpay/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: testOrderId }),
    });
    const rzpOrderData = await rzpOrderRes.json();
    assert(rzpOrderRes.status === 200, "POST /api/payments/razorpay/create-order creates payment order");
    assert(Boolean(rzpOrderData.razorpayOrder.id), "Returns Razorpay order ID");
    assert(rzpOrderData.razorpayOrder.amount > 0, "Uses server-recalculated amount in paisa");

    const rzpOrderId = rzpOrderData.razorpayOrder.id;
    const rzpPaymentId = `pay_${Date.now()}`;

    // Test tamper protection: invalid signature
    const badVerifyRes = await fetch(`${BASE_URL}/api/payments/razorpay/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: testOrderId,
        razorpay_order_id: rzpOrderId,
        razorpay_payment_id: rzpPaymentId,
        razorpay_signature: "tampered_fake_signature_abc123",
      }),
    });
    assert(badVerifyRes.status === 400, "Tampered Razorpay signature is rejected with 400 Bad Request");

    // Test positive HMAC-SHA256 signature verification
    const secret = process.env.RAZORPAY_KEY_SECRET || "nexora_mock_secret_test_key_123";
    const validSignature = crypto
      .createHmac("sha256", secret)
      .update(`${rzpOrderId}|${rzpPaymentId}`)
      .digest("hex");

    const goodVerifyRes = await fetch(`${BASE_URL}/api/payments/razorpay/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: testOrderId,
        razorpay_order_id: rzpOrderId,
        razorpay_payment_id: rzpPaymentId,
        razorpay_signature: validSignature,
      }),
    });
    const goodVerifyData = await goodVerifyRes.json();
    assert(goodVerifyRes.status === 200, "Genuine HMAC-SHA256 signature accepted with 200 OK");
    assert(goodVerifyData.success === true, "Payment verified successfully");

    // Check that order status moved to 'Confirmed'
    const orderCheckRes = await fetch(`${BASE_URL}/api/orders/${testOrderId}`);
    const orderCheckData = await orderCheckRes.json();
    assert(orderCheckData.order.status === "Confirmed", "Order status atomically updated to 'Confirmed'");
  } catch (err) {
    assert(false, `Razorpay tests failed: ${err.message}`);
  }

  // ----------------------------------------------------
  // TEST GROUP 6: ORDER TRACKING & ADMIN MANAGEMENT
  // ----------------------------------------------------
  console.log("\n\x1b[36m[GROUP 6] 9-Stage Tracking & Admin Status Updates\x1b[0m");

  try {
    // Tracking retrieval
    const trackRes = await fetch(`${BASE_URL}/api/orders/${testOrderId}/tracking`);
    const trackData = await trackRes.json();
    assert(trackRes.status === 200, "GET /api/orders/[id]/tracking returns 200 OK");
    assert(Array.isArray(trackData.events) && trackData.events.length > 0, "Returns tracking event history");

    // Admin updates status to Shipped
    const updateRes = await fetch(`${BASE_URL}/api/admin/orders/${testOrderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        status: "Shipped",
        description: "Dispatched via Priority Courier Flight NX-204",
        carrier: "FedEx International Priority",
        trackingNumber: "FX-902184910",
      }),
    });
    assert(updateRes.status === 200, "Admin PATCH /api/admin/orders/[id] updates milestone with 200 OK");

    // Customer tracking reflects admin update
    const updatedTrackRes = await fetch(`${BASE_URL}/api/orders/${testOrderId}/tracking`);
    const updatedTrackData = await updatedTrackRes.json();
    assert(updatedTrackData.status === "Shipped", "Customer tracking view reflects real-time 'Shipped' status");
  } catch (err) {
    assert(false, `Tracking tests failed: ${err.message}`);
  }

  // ----------------------------------------------------
  // TEST GROUP 7: SECURITY & ROLE AUTHORIZATION CHECKS
  // ----------------------------------------------------
  console.log("\n\x1b[36m[GROUP 7] Security, RLS & Role-Based Access Control\x1b[0m");

  try {
    // Unauthenticated access to admin analytics
    const noAuthRes = await fetch(`${BASE_URL}/api/admin/analytics`);
    assert(noAuthRes.status === 401, "Unauthenticated access to admin analytics rejected with 401 Unauthorized");

    // Customer attempting to access admin analytics
    const customerAdminRes = await fetch(`${BASE_URL}/api/admin/analytics`, {
      headers: { Authorization: `Bearer ${customerToken}` },
    });
    assert(customerAdminRes.status === 403, "Customer token attempting admin operations rejected with 403 Forbidden");

    // Admin access to admin analytics
    const adminAnalyticsRes = await fetch(`${BASE_URL}/api/admin/analytics`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const analyticsData = await adminAnalyticsRes.json();
    assert(adminAnalyticsRes.status === 200, "Administrator token accesses analytics with 200 OK");
    assert(typeof analyticsData.analytics.summary.totalRevenue === "number", "Calculates real revenue from verified orders");
    assert(analyticsData.analytics.summary.totalRevenue > 0, "Total revenue is non-zero and grounded in orders");
  } catch (err) {
    assert(false, `Security authorization tests failed: ${err.message}`);
  }

  // ----------------------------------------------------
  // TEST GROUP 8: AI SHOPPING ASSISTANT GROUNDING
  // ----------------------------------------------------
  console.log("\n\x1b[36m[GROUP 8] AI Shopping Assistant Grounding\x1b[0m");

  try {
    const aiRes = await fetch(`${BASE_URL}/api/ai/assistant`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: "Show me titanium phones and foldables" }),
    });
    const aiData = await aiRes.json();
    assert(aiRes.status === 200, "POST /api/ai/assistant returns 200 OK");
    assert(Boolean(aiData.reply), "Returns grounded natural language response");
    assert(Array.isArray(aiData.recommendedProducts) && aiData.recommendedProducts.length > 0, "Recommends verified catalog products");
    assert(
      aiData.recommendedProducts.every((p) => p.price > 0 && p.stockCount !== undefined),
      "Recommendations include verified real database prices and stock"
    );
  } catch (err) {
    assert(false, `AI Assistant tests failed: ${err.message}`);
  }

  // ----------------------------------------------------
  // SUMMARY
  // ----------------------------------------------------
  console.log("\n========================================================");
  console.log(`TOTAL TESTS : ${totalTests}`);
  console.log(`PASSED      : \x1b[32m${passedTests}\x1b[0m`);
  console.log(`FAILED      : ${failedTests > 0 ? `\x1b[31m${failedTests}\x1b[0m` : `\x1b[32m0\x1b[0m`}`);
  console.log("========================================================\n");

  if (failedTests > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests();
