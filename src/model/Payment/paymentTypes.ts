export type PaymentStatus =
  | 'created'
  | 'registered'
  | 'pending'
  | 'verifying'
  | 'paid'
  | 'failed'
  | 'cancelled'
  | 'refunded';

export interface CheckoutResponse {
  id: number;
  status: string;
  currency: string;
  total: string;
  is_paid: boolean;
}

export interface CreatePaymentResponse {
  payment_id: string;
  order_id: number;
  status: PaymentStatus;
  amount: number;
  currency: string;
  payment_url: string;
  expires_at: string | null;
  reused: boolean;
}

export interface PaymentStatusResponse {
  payment_id: string;
  order_id: number;
  status: PaymentStatus;
  is_final: boolean;
  paid_at: string | null;
}
