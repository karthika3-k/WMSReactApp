import { FaArrowLeft, FaArrowRight, FaEdit } from "react-icons/fa";

type PaginationProps = {
  rowPerPage: number;
  data: any[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({ rowPerPage, data, currentPage, setCurrentPage }: PaginationProps) => {
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
        className="btn btn-outline btn-accent"
      >
       <FaArrowLeft />
      </button>
      <div className="flex items-center gap-2 text-sm">
        {/* Dynamically generate page numbers */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => paginate(pageNumber)}
            className={`px-2 rounded-sm ${pageNumber === currentPage ? "bg-accent/20" : ""}`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={isNextDisabled}
        className="btn btn-outline btn-accent"
      >
       <FaArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
