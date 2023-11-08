interface TagProps {
  status: "RECRUITING" | "CLOSED" | "FINISHED";
}

const STATUS = {
  RECRUITING: "모집중",
  CLOSED: "마감",
  FINISHED: "종료",
};

const Tag = ({ status, ...props }: TagProps) => {
  return (
    <div
      className="flex h-40 w-80 items-center justify-center rounded-50 bg-st-primary p-5"
      {...props}
    >
      <div className="max-mobile:text-13 flex h-full w-full items-center justify-center rounded-50 bg-st-white text-16 font-bold">
        {STATUS[status]}
      </div>
    </div>
  );
};

export default Tag;
