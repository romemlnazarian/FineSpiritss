import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LocalizationState {
  language: string;
  setLanguage: (lang: string) => void;
}

const useLocalizationStore = create<LocalizationState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (lang: string) => {
        set({ language: lang });
      },
    }),
    {
      name: 'localization-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useLocalizationStore;
