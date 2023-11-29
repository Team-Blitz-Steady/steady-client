"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Box } from "@radix-ui/themes";

interface SideBarItem {
  id?: string;
  label: string;
  href: string;
}

interface SideBarProps {
  children?: ReactNode;
  sidebarItems: SideBarItem[];
  listType?: string;
  className?: string;
}

const SideBar = ({
  children,
  sidebarItems,
  listType,
  className,
}: SideBarProps) => {
  const pathname = usePathname();
  const page = pathname.split("/")[2];

  return (
    <Box
      className={cn(
        `${
          listType === "mypage"
            ? "h-700 min-w-200 lg:w-250 xl:w-250"
            : "h-900 w-250"
        } flex flex-col items-center gap-15 overflow-y-auto overflow-x-hidden rounded-20 border-1 border-solid border-st-gray-100 p-20 max-md:hidden`,
        className,
      )}
    >
      {sidebarItems.map((item, id) => (
        <Link
          href={item.href}
          key={id}
        >
          <div
            className={`${
              listType === "mypage" ? "min-w-150 lg:w-150 xl:w-200" : "w-200"
            } h-full rounded-5 p-20 text-18 font-bold transition duration-100 ${
              item.href.split("/")[2] === page
                ? "bg-st-skyblue-50 text-st-primary"
                : " hover:bg-st-gray-50"
            }`}
          >
            {item.label}
          </div>
        </Link>
      ))}
      {children}
    </Box>
  );
};

export default SideBar;
