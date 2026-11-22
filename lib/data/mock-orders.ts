import { Order } from "../types";

export const mockOrders: Order[] = [
  {
    id: "NX-892410",
    date: "2026-11-20T14:30:00Z",
    status: "Shipped",
    subtotal: 789.00,
    shipping: 0.00,
    discount: 50.00,
    total: 739.00,
    estimatedDelivery: "November 24, 2026",
    trackingNumber: "TRK-983210492",
    carrier: "Express Priority Logistics",
    paymentMethod: "Credit Card ending in 4242",
    shippingAddress: {
      id: "addr-1",
      type: "Home",
      isDefault: true,
      fullName: "Alex Rivera",
      street: "742 Evergreen Terrace",
      apartment: "Apt 4B",
      city: "San Francisco",
      state: "CA",
      zipCode: "94107",
      phone: "+1 (555) 392-8172",
    },
    items: [
      {
        productId: "nx-prod-1",
        name: "Nexora Studio Over-Ear Headphones",
        brand: "Nexora Acoustics",
        price: 349.00,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
        variant: { "Color": "Matte Charcoal" }
      },
      {
        productId: "nx-prod-3",
        name: "Minimalist Chrono Watch 40mm",
        brand: "Vanguard Horology",
        price: 440.00,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
        variant: { "Strap": "Brushed Titanium" }
      }
    ],
    timeline: [
      {
        step: "1",
        label: "Order Placed",
        date: "Nov 20, 02:30 PM",
        description: "Order received and queued for authorization.",
        completed: true,
        current: false,
      },
      {
        step: "2",
        label: "Confirmed",
        date: "Nov 20, 02:45 PM",
        description: "Payment confirmed and inventory allocated at San Jose fulfillment center.",
        completed: true,
        current: false,
      },
      {
        step: "3",
        label: "Processing",
        date: "Nov 20, 04:10 PM",
        description: "Quality verification and dispatch batching initiated.",
        completed: true,
        current: false,
      },
      {
        step: "4",
        label: "Packed",
        date: "Nov 21, 09:20 AM",
        description: "Carefully packaged with tamper-evident seal and eco-cushioning.",
        completed: true,
        current: false,
      },
      {
        step: "5",
        label: "Shipped",
        date: "Nov 21, 01:15 PM",
        description: "Departed regional hub in transit to local distribution center.",
        completed: true,
        current: true,
      },
      {
        step: "6",
        label: "Out for Delivery",
        date: "Estimated Nov 24, 08:00 AM",
        description: "Assigned to courier route for final-mile delivery.",
        completed: false,
        current: false,
      },
      {
        step: "7",
        label: "Delivered",
        date: "Estimated Nov 24, 02:00 PM",
        description: "Secure delivery to recipient address with signature.",
        completed: false,
        current: false,
      },
    ]
  },
  {
    id: "NX-875192",
    date: "2026-11-12T10:15:00Z",
    status: "Delivered",
    subtotal: 220.00,
    shipping: 15.00,
    discount: 0.00,
    total: 235.00,
    estimatedDelivery: "Delivered on Nov 15, 2026",
    trackingNumber: "TRK-771920841",
    carrier: "Express Priority Logistics",
    paymentMethod: "Apple Pay",
    shippingAddress: {
      id: "addr-1",
      type: "Home",
      isDefault: true,
      fullName: "Alex Rivera",
      street: "742 Evergreen Terrace",
      apartment: "Apt 4B",
      city: "San Francisco",
      state: "CA",
      zipCode: "94107",
      phone: "+1 (555) 392-8172",
    },
    items: [
      {
        productId: "nx-prod-7",
        name: "Merino Wool Modular Overshirt",
        brand: "Atelier Forma",
        price: 220.00,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80",
        variant: { "Size": "M", "Color": "Raw Slate" }
      }
    ],
    timeline: [
      { step: "1", label: "Order Placed", date: "Nov 12, 10:15 AM", description: "Order confirmed.", completed: true, current: false },
      { step: "2", label: "Confirmed", date: "Nov 12, 10:20 AM", description: "Payment cleared.", completed: true, current: false },
      { step: "3", label: "Processing", date: "Nov 12, 11:45 AM", description: "Inventory packed.", completed: true, current: false },
      { step: "4", label: "Packed", date: "Nov 13, 08:30 AM", description: "Ready for carrier.", completed: true, current: false },
      { step: "5", label: "Shipped", date: "Nov 13, 03:00 PM", description: "In transit.", completed: true, current: false },
      { step: "6", label: "Out for Delivery", date: "Nov 15, 09:10 AM", description: "Courier en route.", completed: true, current: false },
      { step: "7", label: "Delivered", date: "Nov 15, 01:45 PM", description: "Signed for by resident.", completed: true, current: true },
    ]
  }
];
