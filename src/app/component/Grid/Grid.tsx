// "use client"
// import React, { useState } from 'react';
// import { FaCog, FaArrowUp, FaArrowDown, FaEdit, FaTrashAlt } from 'react-icons/fa';



// interface RowData {
//     [key: string]: any;
// }
// interface Column {
//     name: string;
//     field: string;
//     visible: boolean;
// }

// interface GridProps<T extends RowData> {
//     gridKey: string;
//     title: string;
//     data: T[];
//     columnConfig: Column[];
//     rowPerPage: number;
//     onDelete: (rowData: T) => void;  // Change RowData to T, which is User
//     handleAddClick: () => void;
//     addButtonLabel: string;
//     handleEditClick: (rowData: T) => void;  // Change RowData to T, which is User
// }

// const Grid = <T extends RowData>({ gridKey, title, data, columnConfig, rowPerPage, onDelete, handleAddClick, addButtonLabel, handleEditClick }
//     : GridProps<T>) => {
//     const [columns, setColumns] = useState(columnConfig);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [isSettingsOpen, setIsSettingsOpen] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');

//     const toggleColumnVisibility = (index: number) => {
//         const updatedColumns = [...columns];
//         updatedColumns[index].visible = !updatedColumns[index].visible;
//         setColumns(updatedColumns);
//     };
//     const moveColumnUp = (index: number) => {
//         if (index === 0) return;
//         const updatedColumns = [...columns];
//         [updatedColumns[index - 1], updatedColumns[index]] = [updatedColumns[index], updatedColumns[index - 1]];
//         setColumns(updatedColumns);
//     };

//     const moveColumnDown = (index: number) => {
//         if (index === columns.length - 1) return;
//         const updatedColumns = [...columns];
//         [updatedColumns[index + 1], updatedColumns[index]] = [updatedColumns[index], updatedColumns[index + 1]];
//         setColumns(updatedColumns);
//     };

//     const handleSaveSettings = () => {
//         console.log('Settings Saved:', columns);
//         setIsSettingsOpen(false);
//     };

//     const handleCloseSettings = () => {
//         setIsSettingsOpen(false);
//     };

//     // Calculate current page data
//     const indexOfLastRow = currentPage * rowPerPage;
//     const indexOfFirstRow = indexOfLastRow - rowPerPage;
//     const currentRows = data
//         .filter((row) =>
//             Object.values(row).some(value =>
//                 value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
//             )
//         )
//         .slice(indexOfFirstRow, indexOfLastRow);

//     const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

//     const totalPages = Math.ceil(data.length / rowPerPage);

//     return (
//         <div className="p-6 bg-gradient-to-r from-gray-400 to-gray-600 min-h-screen">
//             <h1 className="text-3xl font-bold text-center mb-6 text-white">{title}</h1>

//             <div className="flex justify-start mb-2">
//                 <input
//                     type="text"
//                     placeholder="Search..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="p-2 rounded-lg border-2 border-gray-300 w-44"
//                 />
//             </div>

//             {/* Settings Button */}
//             <div className="flex justify-end mb-4">
//                 <button
//                     onClick={() => setIsSettingsOpen(!isSettingsOpen)}
//                     className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600"
//                 >
//                     <FaCog />
//                 </button>
//             </div>

//             {/* Settings Popup */}
//             {isSettingsOpen && (
//                 <div className="absolute top-16 right-10 bg-white shadow-lg rounded-lg p-4 w-64 z-10">
//                     <h3 className="text-lg font-semibold mb-2">Column Settings</h3>
//                     {columns.map((col, index) => (
//                         <div key={`${col.field}-${col.name}`} className="flex items-center mb-2">
//                             <input
//                                 type="checkbox"
//                                 checked={col.visible}
//                                 onChange={() => toggleColumnVisibility(index)}
//                                 className="mr-2"
//                             />
//                             <span className="mr-2">{col.name}</span>
//                             <div className="flex space-x-2 ml-auto">
//                                 <button
//                                     onClick={() => moveColumnUp(index)}
//                                     className="text-blue-500"
//                                     disabled={index === 0}
//                                 >
//                                     <FaArrowUp />
//                                 </button>
//                                 <button
//                                     onClick={() => moveColumnDown(index)}
//                                     className="text-blue-500"
//                                     disabled={index === columns.length - 1}
//                                 >
//                                     <FaArrowDown />
//                                 </button>
//                             </div>
//                         </div>
//                     ))}

//                     <div className="flex justify-between mt-4">
//                         <button
//                             onClick={handleSaveSettings}
//                             className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                         >
//                             Save
//                         </button>
//                         <button
//                             onClick={handleCloseSettings}
//                             className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                         >
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             )}

//             <table className="w-full border-collapse rounded-lg shadow-lg overflow-hidden bg-white mt-8">
//                 <thead>
//                     <tr className="bg-gray-600 text-white">
//                         {columns.map(
//                             (col) =>
//                                 col.visible && (
//                                     <th
//                                         key={col.field}
//                                         className="p-4 text-left font-semibold text-sm uppercase tracking-wide"
//                                     >
//                                         {col.name}
//                                     </th>
//                                 )
//                         )}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {currentRows.map((row, rowIndex) => (
//                         <tr
//                             key={`${row.userID}-${rowIndex}`}
//                             className={`text-center ${rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'} hover:bg-gray-300 transition-colors`}
//                         >
//                             {columns.map(
//                                 (col) =>
//                                     col.visible && (
//                                         <td
//                                             key={`${col.field}-${row.userID}`}
//                                             className={`p-4 border-b`}
//                                         >
//                                             {col.field === 'actions' ? (
//                                                 <>
//                                                     <button className="px-2 py-1 bg-yellow-500 text-white rounded mr-2 hover:bg-yellow-600">
//                                                         <FaEdit />
//                                                     </button>
//                                                     <button
//                                                         className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                                                         onClick={() => onDelete(row)}  // Pass full row data
//                                                     >
//                                                         <FaTrashAlt />
//                                                     </button>
//                                                 </>
//                                             ) : col.field === 'isActive' || col.field === 'isAdmin' ? (
//                                                 <input
//                                                     type="checkbox"
//                                                     checked={row[col.field]}
//                                                     readOnly
//                                                 />
//                                             ) : (
//                                                 row[col.field]
//                                             )}
//                                         </td>
//                                     )
//                             )}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {/* Pagination Controls */}
//             <div className="flex justify-between items-center mt-6">
//                 <button
//                     onClick={() => paginate(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className="px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300"
//                 >
//                     Previous
//                 </button>
//                 <div>
//                     <span className="px-2">{`Page ${currentPage} of ${totalPages}`}</span>
//                 </div>
//                 <button
//                     onClick={() => paginate(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     className="px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300"
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// }
// export default Grid;

import React from "react"; // Don't forget to import React
import TableSearch from "../TableSearch/TableSearch";
import { FaPlus } from "react-icons/fa"; // Assuming you're using FontAwesome for the "+" icon

// Define the props type for the Grid component
type GridProps = {
  header: string;
  handleAddClick: () => void;
  role: string;
};

// Define the Grid component and use the correct syntax
const Grid: React.FC<GridProps> = ({ header, handleAddClick, role }) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="hidden md:block text-lg font-semibold">{header}</h1>
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
        <TableSearch />
        <div className="flex items-center gap-4 self-end">
          {role === "admin" && (
            <button
              onClick={handleAddClick}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow"
            >
              <FaPlus />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Grid;
