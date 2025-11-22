import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Profile = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  birthdate: string;
  date_joined: string;
};


type ProfileState = {
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
  updateProfile: (partial: Partial<Profile>) => void;
  resetProfile: () => void;
};

const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile: Profile | null) => set({profile}),
      updateProfile: (partial: Partial<Profile>) =>
        set(state => ({
          profile: {
            ...(state.profile ?? ({} as Profile)),
            ...partial,
          } as Profile,
        })),
      resetProfile: () => set({profile: null}),
    }),
    {
      name: 'profile-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        profile: state.profile,
      }),
    },
  ),
);

export default useProfileStore;


