interface TagProps {
  status: string;
}

const Tag = ({ status, ...props }: TagProps) => {
  return (
    <div
      className="h-40 w-80 rounded-50 bg-st-primary p-5"
      {...props}
    >
      <div className="max-mobile:text-15 h-full w-full rounded-50 bg-st-white text-center text-20 font-bold">
        {status === "모집" ? "모집" : "마감"}
      </div>
    </div>
  );
};

export default Tag;
