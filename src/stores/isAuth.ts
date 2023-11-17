import { create } from "zustand";
import { persist } from "zustand/middleware";

const AuthStoreKey = "isAuth";

interface AuthStateType {
  isAuth: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsAuth: (isAuth: boolean) => void;
}

const useAuthStore = create(
  persist<AuthStateType>(
    (set) => ({
      isAuth: false,
      setIsAuth: (isAuth: boolean) => set({ isAuth }),
    }),
    {
      name: AuthStoreKey,
    },
  ),
);

export default useAuthStore;
