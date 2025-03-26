

import React, { ReactNode, useRef } from "react";
import TableSearch from "../TableSearch/TableSearch";
import { FaPlus } from "react-icons/fa";
import { User } from "@/app/component/types/User";


interface GridProps {
  header: string;
  userData?: User;
  role: string;
  FormComponent?: ReactNode;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  showAddButton: boolean;
};

const Grid: React.FC<GridProps> = ({ header, userData, role, FormComponent, searchTerm, setSearchTerm, showAddButton }) => {
  const drawerCheckboxRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex items-center justify-between ">
      <h1 className="hidden md:block text-2xl  font-semibold">{header}</h1>
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
        <TableSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="flex items-center gap-4 self-end">
          {role === "admin" && (
            <div className="drawer drawer-end">
              <input
                id="my-drawer-4"
                type="checkbox"
                ref={drawerCheckboxRef}
                className="drawer-toggle"
              />

              <div className="drawer-content">
                {showAddButton && ( // Only applies to the button
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
      </div>
    </div>
  );
};

export default Grid;
