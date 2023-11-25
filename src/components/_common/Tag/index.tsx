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
      className="flex h-30 w-50 items-center justify-center rounded-50 bg-st-primary p-5 md:h-40 md:w-80"
      {...props}
    >
      <div className="max-mobile:text-13 flex h-full w-full items-center justify-center rounded-50 bg-st-white text-10 font-bold md:text-16">
        {STATUS[status]}
      </div>
    </div>
  );
};

export default Tag;
