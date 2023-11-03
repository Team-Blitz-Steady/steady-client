"use client";

import type { KeyboardEvent } from "react";
import { useCallback, useRef, useState } from "react";
import * as React from "react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Badge } from "@radix-ui/themes";
import { Command } from "cmdk";

interface HashTagInputProps {
  placeholder?: string;
  tagSize?: "1" | "2";
  initialData?: string[];
  className?: string;
}

const HashTagInput = ({
  placeholder = "해쉬 태그를 입력해주세요!",
  initialData,
  tagSize = "1",
  className,
}: HashTagInputProps) => {
  const [tags, setTags] = useState<string[]>(initialData || []);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const { toast } = useToast();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const input = inputRef.current;
      if (input) {
        if (event.key === "Delete" || event.key === "Backspace") {
          if (input.value === "") {
            setTags((prev) => {
              const prevTags = [...prev];
              prevTags.pop();
              return prevTags;
            });
          }
        }
        if (event.key === "Escape") {
          input.blur();
        }
      }
    },
    [setTags],
  );

  const handleAddHashTag = useCallback(() => {
    if (inputValue === "") {
      (() => {
        toast({ description: "태그를 입력해주세요!", variant: "red" });
      })();
      return;
    }
    if (tags.includes(inputValue)) {
      (() => {
        toast({
          description: "이미 추가된 태그입니다!",
          variant: "red",
        });
      })();
      return;
    }
    setTags((prev) => {
      const newTags = [...prev];
      newTags.push(inputValue);
      setInputValue("");
      return newTags;
    });
  }, [inputValue, toast, tags, setTags]);

  const handleDeleteHashTag = useCallback(
    (tag: string) => {
      setTags((prev) => prev.filter((item) => item !== tag));
    },
    [setTags],
  );
  return (
    <Command onKeyDown={handleKeyDown}>
      <div className={cn("flex flex-row items-center", className)}>
        <div>
          {tags.map((tag, idx) => {
            return (
              <Badge
                className={cn("mr-5")}
                key={idx}
                size={tagSize}
                variant="soft"
              >
                {`# ${tag}`}
                <button
                  className={cn("")}
                  onClick={() => handleDeleteHashTag(tag)}
                >
                  <Cross2Icon className="ml-4 h-12 w-12 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
        </div>
        {tags.length < 5 && (
          <Command.Input
            ref={inputRef}
            className={cn(
              "group flex h-40 flex-row items-center justify-between rounded-md border border-input px-10 py-4 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
              className,
            )}
            onKeyDown={(event) => {
              if (event.nativeEvent.isComposing) {
                return;
              }
              if (event.key === "Enter") {
                handleAddHashTag();
              }
            }}
            onValueChange={setInputValue}
            value={inputValue}
            placeholder={placeholder}
          />
        )}
      </div>
    </Command>
  );
};

export default HashTagInput;
