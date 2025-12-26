import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AddressState = {
  address: null | object;
  setAddress: (items: null | object) => void;
  resetAddress: () => void;
};

const GetAddressStore = create<AddressState>()(
  persist(
    (set) => ({
      address: null,
      setAddress: (items: null | object) =>
        set({ address: items }),
      resetAddress: () => set({ address: null }),
    }),
    {
      name: 'address_state',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({address: state.address}),
    },
  ),
);

export default GetAddressStore;
