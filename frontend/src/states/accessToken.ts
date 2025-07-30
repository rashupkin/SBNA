import { create } from "zustand";

interface IAccessTokenStore {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const useAccessTokenStore = create<IAccessTokenStore>((set) => ({
  token: null,
  isAuthenticated: false,
  setToken: (token) => set({ token }),
}));
