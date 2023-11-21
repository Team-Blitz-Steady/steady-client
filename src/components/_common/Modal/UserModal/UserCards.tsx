import Image from "next/image";
import Book from "@/images/book.svg";
import Fire from "@/images/fire.svg";
import Heart from "@/images/heart.svg";
import MegaFon from "@/images/megafon.svg";
import ThumbsUp from "@/images/thumbs_up.svg";

const userCardsType = [ThumbsUp, Fire, Book, MegaFon, Heart];

const UserCards = () => {
  return (
    <div className="flex w-full items-center justify-evenly">
      {userCardsType.map((card, id) => (
        <Image
          key={id}
          src={card}
          alt="유저 카드 이미지"
          width={30}
          height={30}
        />
      ))}
    </div>
  );
};

export default UserCards;
