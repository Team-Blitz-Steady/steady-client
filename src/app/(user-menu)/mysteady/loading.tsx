import Spinner from "@/components/_common/Spinner";

const Loading = () => {
  return (
    <div className="absolute left-2/4 top-2/4">
      <Spinner size="large" />
    </div>
  );
};

export default Loading;
