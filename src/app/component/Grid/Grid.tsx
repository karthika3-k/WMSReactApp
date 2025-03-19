

import React, { ReactNode, useRef } from "react";
import TableSearch from "../TableSearch/TableSearch";
import { FaPlus } from "react-icons/fa"; // Assuming you're using FontAwesome for the "+" icon
import { User } from "@/types/User";


// Define the props type for the Grid component
interface GridProps {
  header: string;
  userData?: User;
  role: string;
  FormComponent?: ReactNode;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

const Grid: React.FC<GridProps> = ({ header, userData, role, FormComponent, searchTerm, setSearchTerm }) => {
  const drawerCheckboxRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex items-center justify-between ">
      <h1 className="hidden md:block text-lg font-semibold">{header}</h1>
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
        <TableSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="flex items-center gap-4  self-end">
          {role === "admin" && (
            <div className="drawer drawer-end">
              <input
                id="my-drawer-4"
                type="checkbox"
                ref={drawerCheckboxRef}
                className="drawer-toggle"
              />

              <div className="drawer-content">
                <button
                  onClick={() => {
                    if (drawerCheckboxRef.current) {
                      drawerCheckboxRef.current.checked = true; // ✅ Open the drawer
                    }
                  }}
                 className="btn btn-outline btn-accent"
                >
                  <FaPlus />
                </button>
              </div>

              {/* Dynamic Drawer Content */}
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer-4"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <div className="menu bg-base-200 text-base-content min-h-full w-[500px] p-4">
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
