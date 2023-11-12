"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

interface DateSelectorProps {
  className?: string;
  initialLabel?: string;
  initialDate?: Date;
  // eslint-disable-next-line no-unused-vars
  onDateChange?: (date: Date) => void;
}

const DateSelector = ({
  className,
  initialLabel,
  initialDate,
  onDateChange,
}: DateSelectorProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (initialDate) {
      setDate(initialDate);
      if (onDateChange) {
        onDateChange(initialDate);
      }
    }
  }, [initialDate, onDateChange]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-between text-left font-normal",
            !date && "text-muted-foreground",
            className,
          )}
        >
          {date ? (
            <span className={"mx-auto"}>
              {format(date, "yyyy년 MM월 dd일")}
            </span>
          ) : (
            <span className={"mx-auto"}>{initialLabel}</span>
          )}
          <CalendarIcon className="ml-8 h-16 w-16" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selected) => {
            setDate(selected);
            if (onDateChange && selected) {
              onDateChange(selected);
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateSelector;
