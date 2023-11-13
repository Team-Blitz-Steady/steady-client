import { useEffect, useState } from "react";
import getSteadies from "@/services/steady/getSteadies";
import type { Steadies } from "@/services/types";
import Icon from "../_common/Icon";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPost: React.Dispatch<React.SetStateAction<Steadies>>;
}

const Pagination = ({ page, setPage, setPost }: PaginationProps) => {
  const [currPage, setCurrPage] = useState(page);
  const firstNum = currPage - (currPage % 5) + 1;
  const lastNum = currPage - (currPage % 5) + 5;

  const handlePageSteadies = async (page: number) => {
    const data = await getSteadies(page.toString());
    setPost(data);
  };

  useEffect(() => {
    if (page !== 0) {
      handlePageSteadies(page);
    }
  }, [page]);

  return (
    <div className="flex">
      <button
        onClick={() => {
          setPage(page - 1);
          setCurrPage(page - 2);
        }}
        disabled={page === 0}
        className="flex h-35 w-35 items-center justify-center rounded-15 text-center font-bold shadow-md enabled:hover:bg-st-primary enabled:hover:text-st-white disabled:cursor-not-allowed disabled:opacity-20"
      >
        <Icon
          name="chevron-left"
          size={20}
          color="black"
        />
      </button>
      <button
        className={`${
          page === firstNum && "bg-st-primary text-st-white"
        } h-35 w-35 rounded-15 text-center font-bold shadow-md hover:bg-st-primary hover:text-st-white`}
        onClick={() => {
          setPage(firstNum);
        }}
        aria-current={page === firstNum ? "page" : undefined}
      >
        {firstNum}
      </button>
      <div>
        {Array(3)
          .fill(1)
          .map((_, i) => {
            return (
              <button
                key={i + 1}
                className={`${
                  page === firstNum + 1 + i && "bg-st-primary text-st-white"
                } h-35 w-35 rounded-15 text-center font-bold shadow-md hover:bg-st-primary hover:text-st-white`}
                onClick={() => {
                  setPage(firstNum + 1 + i);
                }}
                aria-current={page === firstNum + 1 + i ? "page" : undefined}
              >
                {firstNum + 1 + i}
              </button>
            );
          })}
      </div>
      <button
        className={`${
          page === lastNum && "bg-st-primary text-st-white"
        } h-35 w-35 rounded-15 text-center font-bold shadow-md hover:bg-st-primary hover:text-st-white`}
        onClick={() => {
          setPage(lastNum);
        }}
        aria-current={page === lastNum ? "page" : undefined}
      >
        {lastNum}
      </button>
      <button
        onClick={() => {
          setPage(page + 1);
          setCurrPage(page);
        }}
        className="flex h-35 w-35 items-center justify-center rounded-15 text-center font-bold shadow-md hover:bg-st-primary hover:text-st-white"
      >
        <Icon
          name="chevron-right"
          size={20}
          color="black"
        />
      </button>
    </div>
  );
};

export default Pagination;
