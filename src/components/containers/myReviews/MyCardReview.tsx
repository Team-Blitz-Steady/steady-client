import Image from "next/image";
import { cn } from "@/lib/utils";
import { Tooltip } from "@radix-ui/themes";
import type { MyReviewsType } from "@/services/types";
import { CardTooltip } from "@/constants/cardTooltip";
import { subBoxStyles, subMyPageTextStyles } from "@/constants/commonStyle";

const MyCardReview = ({
  myReviewData,
  title,
}: {
  myReviewData: MyReviewsType;
  title: string;
}) => {
  return (
    <div className={cn("flex flex-col gap-30")}>
      <div className={cn(subMyPageTextStyles.title)}>{title}</div>
      <div className={cn(subBoxStyles, "justify-evenly")}>
        {myReviewData.userCards.map((card, index) => (
          <div
            key={card.cardId}
            className={cn(
              subMyPageTextStyles.content,
              "flex h-full flex-col items-center justify-center gap-5",
            )}
          >
            <Tooltip content={CardTooltip[index]}>
              <Image
                src={card.imageUrl}
                alt="카드 이미지"
                width={40}
                height={80}
              />
            </Tooltip>

            <div className={cn(subMyPageTextStyles.content)}>
              {`( ${card.count} )`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCardReview;
