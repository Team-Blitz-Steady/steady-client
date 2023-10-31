"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "@/components/_common/Selector/core/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-12", className)}
      classNames={{
        months:
          "flex flex-col sm:flex-row space-y-16 sm:space-x-16 sm:space-y-0",
        month: "space-y-16",
        caption: "flex justify-center pt-4 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-4 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-28 w-28 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-4",
        nav_button_next: "absolute right-4",
        table: "w-full border-collapse space-y-4",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-36 font-normal text-[0.8rem]",
        row: "flex w-full mt-8",
        cell: "h-36 w-36 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-36 w-36 p-0 font-normal aria-selected:opacity-100",
        ),
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeftIcon className="h-36 w-36" />,
        IconRight: () => <ChevronRightIcon className="h-36 w-36" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
