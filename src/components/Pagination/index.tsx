import Button, { buttonSize } from "../_common/Button";

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
              <Button
                key={i + 1}
                className={`${buttonSize.pg} hover:bg-st-primary hover:text-st-white`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Button>
            );
          })}
      </div>
    </div>
  );
};

export default Pagination;
