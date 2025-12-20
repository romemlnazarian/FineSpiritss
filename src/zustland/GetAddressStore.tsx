import {create} from 'zustand';

export type Address = {
  street: string;
  city: string;
  postalCode: string;
  country: string;
};

interface AddressState {
  address: Address | null;
  setAddress: (address: Address | null) => void;
  clearAddress: () => void;
}

const useAddressStore = create<AddressState>((set) => ({
  address: null,
  setAddress: (address) => set({ address }),
  clearAddress: () => set({ address: null }),
}));

export default useAddressStore;

