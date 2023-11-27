"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/components/ui/use-toast";
import Logo from "@/images/logo.svg";
import { cn } from "@/lib/utils";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { MyProfileType } from "@/services/types";
import getProfileImageLink from "@/services/user/getProfileImageLink";
import updateMyProfile from "@/services/user/updateMyProfile";
import Button, { buttonSize } from "@/components/_common/Button";
import { MyProfileKey } from "@/constants/queryKeys";

const ProfileImageUpload = ({ userData }: { userData: MyProfileType }) => {
  const [imageSrc, setImageSrc] = useState("");
  const [imageFile, setImageFile] = useState<File>();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const onUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = event.target.files?.[0];
    reader.onloadend = () => {
      setImageSrc(reader.result as string);
    };
    if (file) {
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const handleCancelImage = () => {
    setImageSrc("");
    setImageFile(undefined);
  };

  const handleUploadImage = () => {
    if (!imageFile) {
      toast({ description: "이미지를 선택해주세요.", variant: "red" });
      return;
    }
    getProfileImageLink(imageFile.name).then((res) => {
      const options = { headers: { "Content-Type": imageFile.type } };
      axios.put(res.presignedUrl, imageFile, options).then(() => {
        const newData = {
          bio: userData.bio,
          profileImage: res.objectUrl,
          nickname: userData.nickname,
          positionId: userData.position.id,
          stacksId: userData.stacks.map((stack) => stack.id),
        };
        updateMyProfile(newData).then(() => {
          queryClient.invalidateQueries({ queryKey: MyProfileKey });
          toast({
            description: "프로필 이미지가 수정되었습니다.",
            variant: "green",
          });
        });
        setImageSrc("");
        setImageFile(undefined);
      });
    });
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="h-30"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger
          className={cn("flex w-auto justify-center text-center text-18")}
          chevronIconProps={"ml-10"}
        >
          프로필 이미지 수정
        </AccordionTrigger>
        <AccordionContent
          className={cn("mx-auto flex items-center justify-center")}
        >
          <div
            className={cn(
              "z-10 flex h-300 w-700 flex-col items-center justify-center gap-y-10 rounded-lg border-2 border-dashed border-st-gray-200 bg-st-white",
            )}
          >
            <div className={"relative h-150 w-150"}>
              <Image
                src={imageSrc || Logo}
                alt={"내 프로필 이미지"}
                width={150}
                height={150}
                className="border-black aspect-square rounded-full border-2 transition-opacity group-hover:opacity-50"
              />
              {imageSrc && (
                <div
                  className={
                    "absolute right-5 top-0 flex h-30 w-30 cursor-pointer items-center justify-center rounded-full bg-st-white-50"
                  }
                  onClick={handleCancelImage}
                >
                  <Cross2Icon className={"h-25 w-25"} />
                </div>
              )}
            </div>
            <label htmlFor={"profile-image"}>
              <div
                className={cn(
                  "flex h-35 w-90 cursor-pointer items-center justify-center rounded-15 bg-st-primary font-bold text-st-white shadow-md",
                )}
              >
                파일 선택
              </div>
            </label>
            <input
              type="file"
              id="profile-image"
              accept="image/png, image/jpeg, image/jpg"
              className="hidden"
              multiple={false}
              onChange={onUploadImage}
            />
            {imageSrc && (
              <>
                <Button
                  className={cn(buttonSize.sm, "bg-st-primary text-st-white")}
                  onClick={handleUploadImage}
                >
                  수정 완료
                </Button>
              </>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProfileImageUpload;
