import { create } from "zustand";
import { persist } from "zustand/middleware";

const StorageKey = "newUserInfo";

interface NewUserInfoStateType {
  accountId: number;
  nickname: string;
  positionId: number;
  stacksId: number[];
  // eslint-disable-next-line no-unused-vars
  setAccountId: (accountId: number) => void;
  // eslint-disable-next-line no-unused-vars
  setNickname: (nickname: string) => void;
  // eslint-disable-next-line no-unused-vars
  setPositionId: (positionId: number) => void;
  // eslint-disable-next-line no-unused-vars
  setStackIds: (stacksId: number[]) => void;
}

const useNewUserInfoStore = create(
  persist<NewUserInfoStateType>(
    (set) => ({
      accountId: 0,
      nickname: "",
      positionId: 0,
      stacksId: [],
      setAccountId: (accountId) => set({ accountId }),
      setNickname: (nickname) => set({ nickname }),
      setPositionId: (positionId) => set({ positionId }),
      setStackIds: (stacksId) => set({ stacksId }),
    }),
    {
      name: StorageKey,
    },
  ),
);

export default useNewUserInfoStore;
