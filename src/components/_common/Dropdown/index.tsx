"use client";

import type { ReactNode } from "react";
import { useState } from "react";
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
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu.Root
      open={open}
      onOpenChange={setOpen}
    >
      <DropdownMenu.Trigger>
        <Button
          variant={"ghost"}
          className={"hover:bg-transparent cursor-pointer"}
          onClick={() => setOpen((prev) => !prev)}
        >
          {children}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content onInteractOutside={() => setOpen(false)}>
        {options.map((option, idx) => (
          <Link
            href={option.linkTo}
            onClick={() => setOpen(false)}
            key={idx}
            className={"p-0 hover:bg-st-primary"}
          >
            <DropdownMenu.Item className={"cursor-pointer hover:bg-st-primary"}>
              {option.label}
            </DropdownMenu.Item>
          </Link>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
