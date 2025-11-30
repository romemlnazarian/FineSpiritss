import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RecommendedState = {
  recommended: any[];
  setRecommended: (items: any[]) => void;
  resetRecommended: () => void;
};

const useRecommendedStore = create<RecommendedState>()(
  persist(
    (set) => ({
      recommended: [],
      setRecommended: (items: any[]) =>
        set({recommended: Array.isArray(items) ? items : []}),
      resetRecommended: () => set({recommended: []}),
    }),
    {
      name: 'recommended-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({recommended: state.recommended}),
    },
  ),
);

export default useRecommendedStore;


