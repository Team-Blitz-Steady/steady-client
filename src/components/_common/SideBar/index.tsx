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

  return (
    <Theme>
      <Box
        className={`${boxStyles} border-st-gray-100 flex flex-col items-center border-solid border-5 rounded-[20px]`}
      >
        {sidebarItems.map((item, id) => (
          <Link
            href={item.href}
            key={id}
          >
            <div
              className={`${itemStyles} text-[18px] font-bold transition duration-100 ${
                selectedItem === id
                  ? "bg-st-skyblue text-st-primary"
                  : " hover:bg-st-gray-50"
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
