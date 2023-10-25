import {
  ArrowLeftIcon,
  BellIcon,
  CalendarIcon,
  ChatBubbleIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Cross1Icon,
  EyeOpenIcon,
  GearIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";

interface IconProps {
  name: string;
  size: number;
  color: string;
}

const Icon = ({ name = "", size = 5, color = "#000000" }: IconProps) => {
  let content;
  switch (name) {
    case "search":
      content = (
        <MagnifyingGlassIcon
          width={size}
          height={size}
          color={color}
        />
      );
      break;
    case "pencil":
      content = (
        <Pencil1Icon
          width={size}
          height={size}
          color={color}
        />
      );
      break;
    case "cross":
      content = (
        <Cross1Icon
          width={size}
          height={size}
          color={color}
        />
      );
      break;
    case "chevron-down":
      content = (
        <ChevronDownIcon
          width={size}
          height={size}
          color={color}
        />
      );
      break;
    case "eye":
      content = (
        <EyeOpenIcon
          width={size}
          height={size}
          color={color}
        />
      );
      break;
    case "chat":
      content = (
        <ChatBubbleIcon
          width={size}
          height={size}
          color={color}
        />
      );
      break;
    case "calendar":
      content = (
        <CalendarIcon
          width={size}
          height={size}
          color={color}
        />
      );
      break;
    case "bell":
      content = (
        <BellIcon
          width={size}
          height={size}
          color={color}
        />
      );
      break;
    case "gear":
      content = (
        <GearIcon
          width={size}
          height={size}
          color={color}
        />
      );
      break;
    case "trash":
      content = (
        <TrashIcon
          width={size}
          height={size}
          color={color}
        />
      );
      break;
    case "arrow-left":
      content = (
        <ArrowLeftIcon
          width={size}
          height={size}
          color={color}
        />
      );
      break;
    case "chevron-left":
      content = (
        <ChevronLeftIcon
          width={size}
          height={size}
          color={color}
        />
      );
      break;
    case "chevron-right":
      content = (
        <ChevronRightIcon
          width={size}
          height={size}
          color={color}
        />
      );
      break;
    case "heart":
      content = (
        <HeartIcon
          width={size}
          height={size}
          color={color}
        />
      );
      break;
    default:
      content = "";
  }
  return <div>{content}</div>;
};

export default Icon;
