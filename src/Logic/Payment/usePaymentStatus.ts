import {useCallback, useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';

import {getPaymentStatusModel} from '../../model/Payment/PaymentModel';
import {refreshTokenModel} from '../../model/Auth/RefreshTokenModel';
import useAuthStore from '../../zustland/AuthStore';
import type {PaymentStatusResponse} from '../../model/Payment/paymentTypes';

const POLL_INTERVAL_MS = 2000;
const MAX_POLL_DURATION_MS = 60000;

/**
 * Polls the backend for a payment's authoritative status. Stops once the status
 * is final or after MAX_POLL_DURATION_MS, whichever comes first. Also refreshes
 * when the app returns to the foreground (e.g. after the checkout browser or a
 * bank app closes). A delayed webhook shows as pending, never as failure.
 */
export function usePaymentStatus(paymentId: string) {
  const {token, refreshToken, setToken, setRefreshToken} = useAuthStore();
  const [data, setData] = useState<PaymentStatusResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timedOut, setTimedOut] = useState(false);
  const startedAtRef = useRef<number>(Date.now());

  const fetchStatus = useCallback(
    (accessToken: string): Promise<PaymentStatusResponse | null> =>
      new Promise(resolve => {
        getPaymentStatusModel(
          accessToken,
          paymentId,
          (result: PaymentStatusResponse) => {
            setData(result);
            setIsLoading(false);
            resolve(result);
          },
          () => {
            setIsLoading(false);
            resolve(null);
          },
          () => {
            // 401 -> refresh once and retry.
            refreshTokenModel(
              refreshToken,
              newTokens => {
                setToken(newTokens.access);
                setRefreshToken(newTokens.refresh);
                getPaymentStatusModel(
                  newTokens.access,
                  paymentId,
                  (result: PaymentStatusResponse) => {
                    setData(result);
                    setIsLoading(false);
                    resolve(result);
                  },
                  () => {
                    setIsLoading(false);
                    resolve(null);
                  },
                );
              },
              () => {
                setIsLoading(false);
                resolve(null);
              },
            );
          },
        );
      }),
    [paymentId, refreshToken, setToken, setRefreshToken],
  );

  const refresh = useCallback(
    () => fetchStatus(token),
    [fetchStatus, token],
  );

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const poll = async () => {
      const result = await refresh();
      if (cancelled) {
        return;
      }

      const isTimedOut =
        Date.now() - startedAtRef.current >= MAX_POLL_DURATION_MS;

      if (!result?.is_final && !isTimedOut) {
        timer = setTimeout(poll, POLL_INTERVAL_MS);
      } else if (isTimedOut && !result?.is_final) {
        setTimedOut(true);
      }
    };

    void poll();

    return () => {
      cancelled = true;
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [refresh]);

  // Refresh when the app becomes active again.
  useEffect(() => {
    const subscription = AppState.addEventListener('change', state => {
      if (state === 'active') {
        void refresh();
      }
    });
    return () => subscription.remove();
  }, [refresh]);

  return {data, isLoading, timedOut, refresh};
}
