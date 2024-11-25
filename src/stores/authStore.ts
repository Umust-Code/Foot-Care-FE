import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
}

const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      // 추후 보안을 위해, boolean이 아닌 토큰 문자열로 변경해야함
      isAuth: false,
      setIsAuth: (value) =>
        set({
          isAuth: value,
        }),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

interface AdminState {
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
}

const useAdminStore = create(
  persist<AdminState>(
    (set) => ({
      // 추후 보안을 위해, boolean이 아닌 토큰 문자열로 변경해야함
      isAdmin: false,
      setIsAdmin: (value) => set({ isAdmin: value }),
    }),
    {
      name: 'admin',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useAuthStore, useAdminStore };
