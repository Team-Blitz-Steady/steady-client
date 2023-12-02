import { useToast } from "@/components/ui/use-toast";

const useCopySteadyContact = () => {
  const { toast } = useToast();

  const copySteadyContact = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        description: "연락 수단 복사 성공!",
        variant: "green",
      });
    } catch (error) {
      toast({
        description: "연락 수단 복사 실패!",
        variant: "red",
      });
      console.error("복사에 실패했습니다.");
    }
  };

  return { copySteadyContact };
};

export default useCopySteadyContact;
