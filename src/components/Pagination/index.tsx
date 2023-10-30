interface PaginationProps {
  totalPosts: number;
  limit: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ totalPosts, limit, page, setPage }: PaginationProps) => {
  const numPages = Math.ceil(totalPosts / limit) + page;

  return (
    <div>
      <div>
        {Array(numPages)
          .fill(1)
          .map((_, i) => {
            return (
              <button
                key={i + 1}
                className="h-35 w-35 rounded-15 text-center font-bold shadow-md hover:bg-st-primary hover:text-st-white"
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default Pagination;
