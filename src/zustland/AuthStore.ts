import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  token: string;
  setToken: (value: string) => void;
  refreshToken: string;
  setRefreshToken: (value: string) => void;
  userData: object | null;
  setUserData: (value: object | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  ageConfirmed: boolean;
  setAgeConfirmed: (value: boolean) => void;
  ageGateAcknowledged: boolean;
  setAgeGateAcknowledged: (value: boolean) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
     userData:null,
     setUserData: (value: object | null) => {
        set({ userData: value });
      },
      token: '',
      setToken: (value: string) => {
        set({ token: value });
      },
      refreshToken:'',
      setRefreshToken: (value: string) => {
        set({ refreshToken: value });
      },
      isLoggedIn: false,
      setIsLoggedIn: (value: boolean) => {
        set({ isLoggedIn: value });
      },
      ageConfirmed: false,
      setAgeConfirmed: (value: boolean) => {
        set({ ageConfirmed: value });
      },
      ageGateAcknowledged: false,
      setAgeGateAcknowledged: (value: boolean) => {
        set({ ageGateAcknowledged: value });
      },
    }),
    {
      name: 'localization-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuthStore;
