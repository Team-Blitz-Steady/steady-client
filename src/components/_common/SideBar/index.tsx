"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import { Box, Theme } from "@radix-ui/themes";

interface SideBarItem {
  id?: string;
  label?: string;
  href: string;
}

interface SideBarProps {
  sidebarItems: SideBarItem[];
  children?: ReactNode;
  boxStyles: string;
  itemStyles: string;
}

const SideBar = ({
  children,
  sidebarItems,
  itemStyles,
  boxStyles,
}: SideBarProps) => {
  const [selectedItem, setSelectedItem] = useState(0);

  // TODO: @JIY00N2 색상 값 상수화 필요
  return (
    <Theme>
      <Box
        className={`${boxStyles} border-[#BDE3FF] flex flex-col items-center border-solid border-5 rounded-[20px]`}
      >
        {sidebarItems.map((item, id) => (
          <Link
            href={item.href}
            key={id}
          >
            <div
              className={`${itemStyles} text-[18px] font-bold transition duration-100 ${
                selectedItem === id
                  ? "bg-[#BDE3FF] text-[#2F69FF]"
                  : " hover:bg-[#b4b4b4]"
              }`}
              onClick={() => setSelectedItem(id)}
            >
              {item.label}
            </div>
          </Link>
        ))}
        {children}
      </Box>
    </Theme>
  );
};

export default SideBar;
