import { useState } from "react";

type PaginationProps = {
  rowPerPage: number;
  data: any[];
};

const Pagination = ({ rowPerPage, data }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate current page data
  const indexOfLastRow = currentPage * rowPerPage;
  const indexOfFirstRow = indexOfLastRow - rowPerPage;
  const currentData = data.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data.length / rowPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handle "Prev" and "Next" button disabling
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={isPrevDisabled}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        {/* Dynamically generate page numbers */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => paginate(pageNumber)}
            className={`px-2 rounded-sm ${pageNumber === currentPage ? "bg-purple-100" : ""}`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={isNextDisabled}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
