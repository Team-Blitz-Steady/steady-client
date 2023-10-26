import Image from "next/image";

interface AvatarProps {
  src: string;
  size: number;
}

const Avatar = ({ src, size }: AvatarProps) => {
  return (
    <Image
      className={"rounded-full"}
      src={src}
      alt={"S"}
      width={size}
      height={size}
    />
  );
};

export default Avatar;
