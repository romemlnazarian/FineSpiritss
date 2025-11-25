import {create} from 'zustand';

type DeleteAccountDoneState = {
  deleteAccountDone: boolean;
  setDeleteAccountDone: (value: boolean) => void;
  resetDeleteAccountDone: () => void;
};

const useDeleteAccountDoneStore = create<DeleteAccountDoneState>()(set => ({
  deleteAccountDone: false,
  setDeleteAccountDone: (value: boolean) => set({deleteAccountDone: value}),
  resetDeleteAccountDone: () => set({deleteAccountDone: true}),
}));

export default useDeleteAccountDoneStore;


