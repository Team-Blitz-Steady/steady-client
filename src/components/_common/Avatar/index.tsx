"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";

interface AvatarProps {
  src: string;
  alt?: string;
  size: number;
}

const Avatar = ({ src, alt = "S", size }: AvatarProps) => {
  return (
    <AvatarPrimitive.Root
      className={`inline-flex h-[${size}px] w-[${size}px] select-none items-center justify-center overflow-hidden rounded-full align-middle`}
    >
      <AvatarPrimitive.Image
        className={"h-full w-full rounded-[inherit] object-cover"}
        src={src}
        alt={alt}
      />
      <AvatarPrimitive.AvatarFallback>{alt}</AvatarPrimitive.AvatarFallback>
    </AvatarPrimitive.Root>
  );
};

export default Avatar;
