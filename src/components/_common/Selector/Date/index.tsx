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
}

const DateSelector = ({
  className,
  initialLabel,
  initialDate,
}: DateSelectorProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (initialDate) {
      setDate(initialDate);
    }
  }, [initialDate]);

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
            format(date, "PPP")
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
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateSelector;
