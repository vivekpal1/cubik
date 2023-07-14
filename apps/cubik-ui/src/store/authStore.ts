import { create } from 'zustand';

type Key = {
  sig: string;
  wallet: string;
};

type State = {
  authenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  persist: boolean;
  setPersist: (value: boolean) => void;
  key: Key;
  setKey: (value: Key) => void;
};

export const useAuthStore = create<State>((set) => ({
  authenticated: false,
  setAuthenticated: (value: boolean) => set({ authenticated: value }),
  key: { sig: '', wallet: '' },
  setPersist: (value: boolean) => set({ persist: value }),
  persist: false,
  setKey: (value: Key) => set({ key: value }),
}));
