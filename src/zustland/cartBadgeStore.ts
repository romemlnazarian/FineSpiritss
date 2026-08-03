import {create} from 'zustand';

type CartBadgeState = {
  count: number;
  setCount: (count: number) => void;
  adjustCount: (delta: number) => void;
  resetCount: () => void;
};

export function getCartItemsCount(data: any): number {
  if (Array.isArray(data?.products)) {
    return data.products.length;
  }

  const summaryCount = Number(data?.summary?.unique_items_count);
  if (Number.isFinite(summaryCount) && summaryCount >= 0) {
    return summaryCount;
  }

  return 0;
}

const useCartBadgeStore = create<CartBadgeState>(set => ({
  count: 0,
  setCount: count =>
    set({count: Number.isFinite(count) && count > 0 ? Math.floor(count) : 0}),
  adjustCount: delta =>
    set(state => ({
      count: Math.max(0, state.count + (Number.isFinite(delta) ? delta : 0)),
    })),
  resetCount: () => set({count: 0}),
}));

export default useCartBadgeStore;
