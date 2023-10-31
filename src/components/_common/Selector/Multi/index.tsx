import type { ChangeEvent, KeyboardEvent } from "react";
import { useCallback, useRef, useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Badge } from "@radix-ui/themes";
import { Command } from "cmdk";
import type { SelectItem } from "@/components/_common/Selector/types/selectItem";

interface MultiSelectorProps {
  items: SelectItem[];
}

const MultiSelector = ({ items }: MultiSelectorProps) => {
  const inputRef = useRef<ChangeEvent<HTMLInputElement>>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<SelectItem[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleUnselect = useCallback((item: SelectItem) => {
    setSelected((prev) => prev.filter(({ value }) => value !== item.value));
  }, []);

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
    [],
  );

  const selectables = items.filter((item) => !selected.includes(item));

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="bg-transparent w-180 overflow-visible"
    >
      <div className="group rounded-md border border-input px-12 py-8 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex h-25 w-160 flex-row gap-4 overflow-hidden overflow-x-scroll whitespace-nowrap scrollbar-hide">
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
              placeholder="Select frameworks..."
              className="bg-transparent ml-8 flex-1 outline-none placeholder:text-muted-foreground"
            />
          ) : null}
        </div>
      </div>
      <div className="relative mt-8">
        {open && selectables.length > 0 ? (
          <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-sm font-normal text-popover-foreground shadow-md outline-none animate-in">
            <Command.Group className="h-full overflow-auto">
              {selectables.map((item) => {
                return (
                  <Command.Item
                    key={item.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      setInputValue("");
                      setSelected((prev) => [...prev, item]);
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
