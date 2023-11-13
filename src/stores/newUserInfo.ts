import { create } from "zustand";
import { persist } from "zustand/middleware";

const StorageKey = "newUserInfo";

interface NewUserInfoStateType {
  accountId: number;
  nickname: string;
  positionId: number;
  stackIds: number[];
  // eslint-disable-next-line no-unused-vars
  setAccountId: (accountId: number) => void;
  // eslint-disable-next-line no-unused-vars
  setNickname: (nickname: string) => void;
  // eslint-disable-next-line no-unused-vars
  setPositionId: (positionId: number) => void;
  // eslint-disable-next-line no-unused-vars
  setStackIds: (stackIds: number[]) => void;
}

const useNewUserInfoStore = create(
  persist<NewUserInfoStateType>(
    (set) => ({
      accountId: 0,
      nickname: "",
      positionId: 0,
      stackIds: [],
      setAccountId: (accountId) => set({ accountId }),
      setNickname: (nickname) => set({ nickname }),
      setPositionId: (positionId) => set({ positionId }),
      setStackIds: (stackIds) => set({ stackIds }),
    }),
    {
      name: StorageKey,
    },
  ),
);

export default useNewUserInfoStore;
