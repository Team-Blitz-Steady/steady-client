"use client";

import { cn } from "@/lib/utils";
import { Tabs } from "@radix-ui/themes";
import Button, { buttonSize } from "@/components/_common/Button";
import { AlertModal } from "@/components/_common/Modal";
import {
  subBoxStyles,
  subContentStyles,
  subMyPageTextStyles,
} from "@/constants/commonStyle";

const members = [
  {
    id: "1",
    nickname: "엄청 긴 닉네임",
    label: "설명",
  },
  {
    id: "2",
    nickname: "엄청 긴 닉네임",
    label: "설명",
  },
  {
    id: "3",
    nickname: "엄청 긴 닉네임",
    label: "설명",
  },
  {
    id: "4",
    nickname: "엄청 긴 닉네임",
    label: "설명",
  },
  {
    id: "5",
    nickname: "엄청 긴 닉네임",
    label: "설명",
  },
  {
    id: "6",
    nickname: "엄청 긴 닉네임",
    label: "설명",
  },
  {
    id: "7",
    nickname: "엄청 긴 닉네임",
    label: "설명",
  },
  {
    id: "8",
    nickname: "엄청 긴 닉네임",
    label: "설명",
  },
  {
    id: "9",
    nickname: "엄청 긴 닉네임",
    label: "설명",
  },
  {
    id: "10",
    nickname: "엄청 긴 닉네임",
    label: "설명",
  },
];

const SteadyManageMembersPage = () => {
  return (
    <div className="flex overflow-x-auto">
      <Tabs.Root defaultValue={`${members[0].id}`}>
        <Tabs.List className="flex gap-10">
          {members.map((v, id) => (
            <Tabs.Trigger
              key={id}
              value={`${id + 1}`}
              className="cursor-pointer"
            >
              {v.nickname}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <div>
          {members.map((v, id) => (
            <Tabs.Content
              key={id}
              value={`${id + 1}`}
              className="p-30"
            >
              <div>
                <div>{v.label}</div>
                <div className={cn(subContentStyles)}>
                  <div className={cn(subBoxStyles, "justify-between")}>
                    <div className={cn(subMyPageTextStyles.content)}>
                      회원 탈퇴 시 전체 프로필 정보가 삭제 됩니다.
                    </div>
                    <AlertModal
                      trigger={
                        <Button
                          className={`${buttonSize.lg} bg-st-red text-st-white`}
                        >
                          회원 탈퇴
                        </Button>
                      }
                      actionButton={
                        <Button
                          className={`${buttonSize.sm} bg-st-red text-st-white`}
                        >
                          탈퇴
                        </Button>
                      }
                    >
                      정말 스테디를 탈퇴하시겠습니까?
                    </AlertModal>
                  </div>
                </div>
              </div>
            </Tabs.Content>
          ))}
        </div>
      </Tabs.Root>
    </div>
  );
};

export default SteadyManageMembersPage;
