import {useCallback, useEffect, useRef, useState} from 'react';
import useAuthStore from '../zustland/AuthStore';
import {refreshTokenModel} from '../model/Auth/RefreshTokenModel';
import {
  addCardModel,
  deleteCardModel,
  updateCardModel,
} from '../model/Card/CardModel';
import {useToast} from '../utiles/Toast/ToastProvider';
import useCartBadgeStore from '../zustland/cartBadgeStore';

const DEFAULT_DEBOUNCE_MS = 1000;

type Options = {
  productId: number | string;
  initialCount?: number;
  debounceMs?: number;
  onSynced?: (quantity: number) => void;
};

export function useDebouncedCartActions({
  productId,
  initialCount = 0,
  debounceMs = DEFAULT_DEBOUNCE_MS,
  onSynced,
}: Options) {
  const {token, refreshToken, setToken, setRefreshToken} = useAuthStore();
  const {show} = useToast();
  const [count, setCount] = useState(initialCount);
  const [syncedCount, setSyncedCount] = useState(initialCount);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const syncedCountRef = useRef(initialCount);
  const countRef = useRef(initialCount);
  const pendingTargetRef = useRef<number | null>(null);

  useEffect(() => {
    syncedCountRef.current = syncedCount;
  }, [syncedCount]);

  useEffect(() => {
    setCount(initialCount);
    setSyncedCount(initialCount);
    syncedCountRef.current = initialCount;
    countRef.current = initialCount;
    pendingTargetRef.current = null;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [initialCount, productId]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const applyDisplayCount = useCallback((nextCount: number) => {
    const previousCount = countRef.current;
    const normalizedCount = Math.max(0, nextCount);
    countRef.current = normalizedCount;
    setCount(normalizedCount);

    const wasInCart = previousCount > 0;
    const willBeInCart = normalizedCount > 0;
    if (!wasInCart && willBeInCart) {
      useCartBadgeStore.getState().adjustCount(1);
    } else if (wasInCart && !willBeInCart) {
      useCartBadgeStore.getState().adjustCount(-1);
    }
  }, []);

  const failSync = useCallback(
    (error: string, rollbackCount: number, targetQuantity: number) => {
      if (pendingTargetRef.current === targetQuantity) {
        pendingTargetRef.current = null;
        applyDisplayCount(rollbackCount);
      }
      show(error, {type: 'error'});
    },
    [applyDisplayCount, show],
  );

  const finalizeSync = useCallback(
    (nextCount: number) => {
      syncedCountRef.current = nextCount;
      setSyncedCount(nextCount);

      if (pendingTargetRef.current === nextCount) {
        pendingTargetRef.current = null;
      }

      // Keep optimistic UI if user already moved to a newer quantity
      if (!timerRef.current) {
        countRef.current = nextCount;
        setCount(nextCount);
      }

      onSynced?.(nextCount);
    },
    [onSynced],
  );

  const withUnauthorizedRetry = useCallback(
    (retry: (accessToken: string) => void) => {
      refreshTokenModel(
        refreshToken,
        refreshedTokens => {
          setToken(refreshedTokens.access);
          setRefreshToken(refreshedTokens.refresh);
          retry(refreshedTokens.access);
        },
        () => {},
      );
    },
    [refreshToken, setRefreshToken, setToken],
  );

  const syncQuantity = useCallback(
    (targetQuantity: number) => {
      const productIdNum = Number(productId);
      const rollbackCount = syncedCountRef.current;
      pendingTargetRef.current = targetQuantity;

      if (!Number.isFinite(productIdNum)) {
        return;
      }

      const runUpdate = (accessToken: string) => {
        updateCardModel(
          accessToken,
          productIdNum,
          targetQuantity,
          () => finalizeSync(targetQuantity),
          error => failSync(error, rollbackCount, targetQuantity),
          () => withUnauthorizedRetry(accessToken => runUpdate(accessToken)),
        );
      };

      const runDelete = (accessToken: string) => {
        deleteCardModel(
          accessToken,
          productIdNum,
          () => finalizeSync(0),
          error => failSync(error, rollbackCount, targetQuantity),
          () => withUnauthorizedRetry(accessToken => runDelete(accessToken)),
        );
      };

      const runAdd = (accessToken: string) => {
        addCardModel(
          accessToken,
          productIdNum,
          () => {
            if (targetQuantity > 1) {
              runUpdate(accessToken);
            } else {
              finalizeSync(targetQuantity);
            }
          },
          error => failSync(error, rollbackCount, targetQuantity),
          () => withUnauthorizedRetry(accessToken => runAdd(accessToken)),
        );
      };

      const execute = (accessToken: string) => {
        if (targetQuantity <= 0) {
          if (rollbackCount > 0) {
            runDelete(accessToken);
          } else {
            finalizeSync(0);
          }
          return;
        }

        if (rollbackCount <= 0) {
          runAdd(accessToken);
          return;
        }

        if (targetQuantity === rollbackCount) {
          finalizeSync(targetQuantity);
          return;
        }

        runUpdate(accessToken);
      };

      if (!token) {
        failSync('error please try again', rollbackCount, targetQuantity);
        return;
      }

      execute(token);
    },
    [productId, token, finalizeSync, failSync, withUnauthorizedRetry],
  );

  const queueQuantity = useCallback(
    (nextCount: number) => {
      const normalizedCount = Math.max(0, nextCount);
      applyDisplayCount(normalizedCount);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        syncQuantity(normalizedCount);
      }, debounceMs);
    },
    [applyDisplayCount, debounceMs, syncQuantity],
  );

  const onSubmit = useCallback(() => {
    queueQuantity(countRef.current + 1);
  }, [queueQuantity]);

  const onQuantityChange = useCallback(
    (value: number, _type: string) => {
      queueQuantity(value);
    },
    [queueQuantity],
  );

  const removeImmediately = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    applyDisplayCount(0);
    syncQuantity(0);
  }, [applyDisplayCount, syncQuantity]);

  return {
    count,
    syncedCount,
    onSubmit,
    onQuantityChange,
    removeImmediately,
  };
}
