import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { SelectItem as SelectItemProps } from "@/components/_common/Selector/types/selectItem";

interface SingleSelectorProps {
  items: SelectItemProps[];
  initialLabel?: string;
  initialData?: string | number;
  className?: string;
  // eslint-disable-next-line no-unused-vars
  onSelectedChange?: (selected: string) => void;
}

const SingleSelector = ({
  items,
  initialLabel,
  initialData,
  className,
  onSelectedChange,
}: SingleSelectorProps) => {
  return (
    <Select
      defaultValue={initialData?.toString()}
      onValueChange={(value) => {
        if (onSelectedChange) {
          onSelectedChange(value);
        }
      }}
    >
      <SelectTrigger className={cn(className)}>
        <SelectValue
          className={cn("font-semibold")}
          placeholder={initialLabel}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map(({ value, label }) => (
            <SelectItem
              key={value}
              value={value}
            >
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SingleSelector;
