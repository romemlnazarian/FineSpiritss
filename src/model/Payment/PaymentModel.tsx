import {GET, POST} from '../../api/Network';
import {Route} from '../../api/Route';

/**
 * Freeze the current cart into an Order. Returns the created order.
 * The server computes the total; the client never sends an amount.
 */
export const checkoutModel = (
  token: string,
  callback: (data: any) => void,
  errorcallback: (data: string) => void,
  callbackUnauthorized?: () => void,
) => {
  POST(
    Route.root,
    Route.checkout,
    (data, status) => {
      if (status === 201 || status === 200) {
        callback(data);
      } else if (status === 401) {
        callbackUnauthorized?.();
      } else {
        console.log('checkout error', data, status);
        errorcallback(data?.detail || 'Unable to start checkout.');
      }
    },
    token,
    {},
  );
};

/**
 * Register a Przelewy24 payment for an order and get the hosted checkout URL.
 */
export const createP24PaymentModel = (
  token: string,
  orderId: number,
  callback: (data: any) => void,
  errorcallback: (data: string) => void,
  callbackUnauthorized?: () => void,
) => {
  POST(
    Route.root,
    Route.p24_create,
    (data, status) => {
      if (status === 200) {
        callback(data);
      } else if (status === 401) {
        callbackUnauthorized?.();
      } else {
        console.log('create payment error', data, status);
        errorcallback(data?.detail || 'Unable to start payment.');
      }
    },
    token,
    {order_id: orderId},
  );
};

/**
 * Read the authoritative payment status from the backend.
 */
export const getPaymentStatusModel = (
  token: string,
  paymentId: string,
  callback: (data: any) => void,
  errorcallback: (data: string) => void,
  callbackUnauthorized?: () => void,
) => {
  GET(
    Route.root,
    `${Route.payment_status}${paymentId}/status/`,
    (data, status) => {
      if (status === 200) {
        callback(data);
      } else if (status === 401) {
        callbackUnauthorized?.();
      } else {
        console.log('payment status error', data, status);
        errorcallback('Unable to check payment status.');
      }
    },
    token,
  );
};
