"use client";

import type { KeyboardEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Badge } from "@radix-ui/themes";
import { Command } from "cmdk";
import type { SelectItem } from "@/components/_common/Selector/types/selectItem";

interface MultiSelectorProps {
  items: SelectItem[];
  initialLabel?: string;
  initialData?: SelectItem[];
  className?: string;
  // eslint-disable-next-line no-unused-vars
  onSelectedChange?: (selected: SelectItem[]) => void;
}

const MultiSelector = ({
  items,
  initialLabel,
  initialData,
  className,
  onSelectedChange,
}: MultiSelectorProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<SelectItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const handleUnselect = useCallback(
    (item: SelectItem) => {
      setSelected((prev) => {
        const newSelected = prev.filter(({ value }) => value !== item.value);
        onSelectedChange?.(newSelected);
        return newSelected;
      });
    },
    [setSelected, onSelectedChange],
  );
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const input = inputRef.current;
      if (input !== null) {
        if (event.key === "Delete" || event.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        if (event.key === "Escape") {
          input.blur();
        }
      }
    },
    [setSelected],
  );
  useEffect(() => {
    if (initialData) {
      setSelected(initialData);
    }
  }, []);
  const selectables = items.filter(
    (item) => !selected.some(({ value }) => value === item.value),
  );
  return (
    <Command
      onKeyDown={handleKeyDown}
      className={cn("bg-transparent overflow-visible")}
    >
      <div
        className={cn(
          "group flex flex-row items-center justify-between rounded-md border border-input px-12 py-8 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          className,
        )}
      >
        <div className="flex h-25 w-full flex-row gap-4 overflow-hidden overflow-x-scroll whitespace-nowrap scrollbar-hide">
          {selected.map((item) => {
            return (
              <Badge
                key={item.value}
                variant="soft"
              >
                {item.label}
                <button
                  className="ml-4 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(item);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(item)}
                >
                  <Cross2Icon className="h-12 w-12 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {selectables.length > 0 ? (
            <Command.Input
              ref={inputRef}
              value={inputValue}
              onValueChange={setInputValue}
              onBlur={() => setOpen(false)}
              onFocus={() => setOpen(true)}
              placeholder={selected.length > 0 ? "" : initialLabel}
              className={cn(
                "bg-transparent ml-8 flex-1 cursor-pointer outline-none placeholder:text-center placeholder:text-muted-foreground",
              )}
            />
          ) : null}
        </div>
        {selected.length === 0 && !open && (
          <ChevronDownIcon className="h-16 w-16 opacity-50" />
        )}
      </div>
      <div className={cn("relative mt-8", className)}>
        {open && selectables.length > 0 ? (
          <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-sm font-normal text-popover-foreground shadow-md outline-none animate-in">
            <Command.Group className="h-full overflow-auto">
              {selectables.map((item) => {
                return (
                  <Command.Item
                    key={item.value}
                    onMouseDown={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                    }}
                    onSelect={() => {
                      setInputValue("");
                      setSelected((prev) => [...prev, item]);
                      onSelectedChange?.([...selected, item]);
                    }}
                    className={
                      "cursor-pointer px-35 py-8 hover:bg-accent hover:text-accent-foreground"
                    }
                  >
                    {item.label}
                  </Command.Item>
                );
              })}
            </Command.Group>
          </div>
        ) : null}
      </div>
    </Command>
  );
};
export default MultiSelector;
