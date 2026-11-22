export interface ProductVariant {
  id: string;
  name: string;
  options: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  categorySlug: string;
  subcategory: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  badge?: string;
  images: string[];
  thumbnail: string;
  shortDescription: string;
  description: string;
  specs: Record<string, string>;
  variants?: ProductVariant[];
  tags: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  itemCount: number;
  featuredProductsCount?: number;
  subcategories: string[];
}

export interface CartItem {
  product: Product;
  selectedVariant?: Record<string, string>;
  quantity: number;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  verified: boolean;
  title: string;
  comment: string;
  helpfulCount: number;
}

export interface Address {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  isDefault: boolean;
  fullName: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

export type OrderStatus = 
  | 'Order Placed'
  | 'Confirmed'
  | 'Processing'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled'
  | 'Returned';

export interface TrackingStep {
  step: string;
  label: string;
  date: string;
  description: string;
  completed: boolean;
  current: boolean;
}

export interface OrderItem {
  productId: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  image: string;
  variant?: Record<string, string>;
}

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  shippingAddress: Address;
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  estimatedDelivery: string;
  trackingNumber: string;
  carrier: string;
  timeline: TrackingStep[];
}

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
  totalOrders: number;
  addresses: Address[];
}

export interface FilterState {
  category?: string;
  subcategory?: string;
  priceRange: [number, number];
  brands: string[];
  minRating: number;
  inStockOnly: boolean;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
}

export interface AdminProductMetric {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  salesCount: number;
  image: string;
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  joinedDate: string;
  status: 'Active' | 'Inactive';
}
