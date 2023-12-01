import { CopyIcon } from "@radix-ui/react-icons";
import { Badge } from "@radix-ui/themes";
import useCopySteadyContact from "@/hooks/useCopySteadyContact";

const ContactTag = ({ contactUrl }: { contactUrl: string }) => {
  const { copySteadyContact } = useCopySteadyContact();

  return (
    <Badge
      color={"indigo"}
      size={"2"}
    >
      <button
        className="flex items-center gap-10"
        onClick={() => copySteadyContact(contactUrl)}
      >
        <div>연락 수단</div>
        <CopyIcon />
      </button>
    </Badge>
  );
};

export default ContactTag;
