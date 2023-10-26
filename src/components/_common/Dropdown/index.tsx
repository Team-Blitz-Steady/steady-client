"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Button, DropdownMenu } from "@radix-ui/themes";

interface OptionsType {
  label: string;
  linkTo: string;
}

interface DropdownProps {
  children: ReactNode;
  options: OptionsType[];
}

const Dropdown = ({ children, options }: DropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button
          variant={"ghost"}
          className={"hover:bg-transparent"}
        >
          {children}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {options.map((option, idx) => (
          <DropdownMenu.Item
            key={idx}
            className={"hover:bg-st-primary"}
          >
            <Link href={option.linkTo}>{option.label}</Link>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
