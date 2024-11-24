import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserInfoState {
  userInfo: {
    memberId: number;
    fg: string;
  };
  changeUserInfo: (value: { memberId: number; fg: string }) => void;
}

const useUserInfoStore = create(
  persist<UserInfoState>(
    (set) => ({
      userInfo: {
        memberId: 0,
        fg: '',
      },
      changeUserInfo: (value: { memberId: number; fg: string }) => set({ userInfo: value }),
    }),
    {
      name: 'userInfo',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useUserInfoStore };
