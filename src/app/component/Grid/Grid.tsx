import React, { ReactNode, useRef } from 'react';
import TableSearch from "../TableSearch/TableSearch";
import { FaPlus } from 'react-icons/fa';
import { User } from "@/app/component/types/User";
import { withAuth } from "@/app/utils/auth";

interface GridProps {
  header: string;
  userData?: User;
  role: string;
  FormComponent?: ReactNode;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  showAddButton: boolean;
  setRowPerPage: (newRowPerPage: number) => void;
};

const Grid: React.FC<GridProps> = ({
  header,
  userData,
  role,
  FormComponent,
  searchTerm,
  setSearchTerm,
  showAddButton,
  setRowPerPage,
}) => {
  const drawerCheckboxRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center justify-between">
      <h1 className="hidden md:block text-2xl font-semibold">{header}</h1>
      <div className="flex flex-col md:flex-row items-center">
        <TableSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="flex items-center gap-4 self-end">
          {role === 'admin' && (
            <div className="drawer drawer-end">
              <input
                id="my-drawer-4"
                type="checkbox"
                ref={drawerCheckboxRef}
                className="drawer-toggle"
              />

              <div className="drawer-content ml-4">
                {showAddButton && (
                  <button
                    onClick={() => {
                      if (drawerCheckboxRef.current) {
                        drawerCheckboxRef.current.checked = true;
                      }
                    }}
                    className="btn btn-outline border-[#8c57ff] text-[#8c57ff] hover:bg-[#8c57ff] hover:text-white"
                  >
                    <FaPlus />
                  </button>
                )}
                {/* <label htmlFor="rows-per-page" className="mr-2">Rows per page:</label> */}
                <select
                  id="rows-per-page"
                  className="select select-bordered ml-5 py-2 px-3 text-sm w-15 h-10"
                  onChange={(e) => setRowPerPage(Number(e.target.value))}
                >
                  <option value={3}>3</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>

              {/* Dynamic Drawer Content */}
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer-4"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                  onClick={(e) => e.preventDefault()} // Prevents the drawer from closing
                ></label>
                <div className="menu bg-base-200 text-base-content min-h-full w-[380px]">
                  {FormComponent ? FormComponent : <p>No content available</p>}
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Dropdown to select rows per page */}
        <div className="mt-2 md:mt-0 ">

        </div>
      </div>
    </div>
  );
};

export default withAuth(Grid);
