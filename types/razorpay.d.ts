declare module 'razorpay' {
  export interface RazorpayOptions {
    key_id: string;
    key_secret: string;
  }

  export interface OrderCreateOptions {
    amount: number | string;
    currency: string;
    receipt?: string;
    notes?: Record<string, string>;
    partial_payment?: boolean;
  }

  export interface RazorpayOrder {
    id: string;
    entity: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt?: string;
    offer_id?: string | null;
    status: 'created' | 'attempted' | 'paid';
    attempts: number;
    notes?: Record<string, string>;
    created_at: number;
  }

  export interface RazorpayOrders {
    create(options: OrderCreateOptions): Promise<RazorpayOrder>;
    fetch(orderId: string): Promise<RazorpayOrder>;
  }

  export interface RazorpayPayments {
    fetch(paymentId: string): Promise<any>;
    capture(paymentId: string, amount: number, currency: string): Promise<any>;
  }

  export default class Razorpay {
    constructor(options: RazorpayOptions);
    orders: RazorpayOrders;
    payments: RazorpayPayments;
  }
}
