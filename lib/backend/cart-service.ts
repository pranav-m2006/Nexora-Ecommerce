import { CartItem } from "../types";
import { productRepo, cartRepo } from "./db";

export interface CartCalculationResult {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  originalSubtotal: number;
  discount: number;
  shipping: number;
  total: number;
  inStock: boolean;
  validationErrors: string[];
}

export const cartService = {
  async calculateServerCart(userId: string): Promise<CartCalculationResult> {
    const rawItems = await cartRepo.getByUserId(userId);
    return this.validateAndCalculate(rawItems);
  },

  async validateAndCalculate(items: CartItem[]): Promise<CartCalculationResult> {
    const validatedItems: CartItem[] = [];
    const validationErrors: string[] = [];
    let subtotal = 0;
    let originalSubtotal = 0;
    let itemCount = 0;
    let allInStock = true;

    for (const item of items) {
      const realProduct = await productRepo.getById(item.product.id);
      if (!realProduct) {
        validationErrors.push(`Product "${item.product.name}" is no longer available in the catalog.`);
        continue;
      }

      if (!realProduct.inStock || realProduct.stockCount < item.quantity) {
        allInStock = false;
        validationErrors.push(
          `Only ${realProduct.stockCount} units of "${realProduct.name}" are currently available.`
        );
      }

      // Always use trusted server-side price from database
      const quantity = Math.max(1, item.quantity);
      itemCount += quantity;
      subtotal += realProduct.price * quantity;
      originalSubtotal += (realProduct.originalPrice || realProduct.price) * quantity;

      validatedItems.push({
        product: realProduct,
        quantity,
        selectedVariant: item.selectedVariant,
      });
    }

    const discount = Math.max(0, originalSubtotal - subtotal);
    const shipping = subtotal > 150 || subtotal === 0 ? 0 : 15.0;
    const total = subtotal > 0 ? Math.round((subtotal + shipping) * 100) / 100 : 0;

    return {
      items: validatedItems,
      itemCount,
      subtotal: Math.round(subtotal * 100) / 100,
      originalSubtotal: Math.round(originalSubtotal * 100) / 100,
      discount: Math.round(discount * 100) / 100,
      shipping,
      total,
      inStock: allInStock,
      validationErrors,
    };
  },
};
