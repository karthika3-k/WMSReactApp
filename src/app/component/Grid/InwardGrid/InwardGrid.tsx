"use client"
import { withAuth } from "@/app/utils/auth"
import Grid from "../Grid";
import { ChangeEvent, useEffect, useState } from "react";
import { Inward } from "@/app/component/types/Inward";
import Table from "../../Table/Table";
import Pagination from "../../Pagination/Pagination";
import api from "@/app/services/api";
import { FaCheckCircle } from "react-icons/fa";
import { showErrorToast, showSuccessToast } from "@/app/utils/toastConfig";
import { RxReset } from "react-icons/rx";

let user = null;
let accessToken = null;
if (typeof window !== "undefined") {
  debugger
  user = localStorage.getItem("userName");
  accessToken = localStorage.getItem("authToken");
}
const inwardColumns = [
  { name: "", field: "select", type: "checkbox", visible: true }, // Checkbox column
  { name: "Doc Entry", field: "docEntry", className: "hidden md:table-cell", visible: true },
  { name: "Doc Num", field: "docNum", className: "hidden md:table-cell", visible: true },
  { name: "Doc Date", field: "docDate", className: "hidden md:table-cell", visible: true },
  { name: "Trans Type", field: "transType", className: "hidden md:table-cell", visible: true },
  { name: "Card Code", field: "cardCode", className: "hidden md:table-cell", visible: true },
  { name: "Card Name", field: "cardName", className: "hidden md:table-cell", visible: true },
  { name: "Item Code", field: "itemCode", className: "hidden md:table-cell", visible: true },
  { name: "Item Name", field: "itemName", className: "hidden md:table-cell", visible: true },
  { name: "Quantity", field: "quantity", className: "hidden md:table-cell", visible: true },
  // { name: "Created Date", field: "createdDateTime", className: "hidden md:table-cell", visible: true },
  // { name: "User Sign", field: "userSign", className: "hidden md:table-cell", visible: true },

];


const InwardGrid = () => {
  const [inwards, setInwards] = useState<Inward[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(3);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedInwards, setSelectedInwards] = useState<Inward[]>([]);

  const [allocateQty, setAllocateQty] = useState('');


  const fetchInwards = async () => {
    debugger
    setIsLoading(true);
    try {
      const response = await api.get(`/Inward/InwardList?userSign=${user}`, {
        params: {
          userSign: user  // ✅ Adds ?userSign=username to the URL
        },
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const data = response.data;
      const filteredInwards = data.map((inward: any) => ({
        id: inward.id,
        docEntry: inward.docEntry ?? null,
        docNum: inward.docNum ?? null,
        docDate: inward.docDate ? new Date(inward.docDate) : null,
        transType: inward.transType ?? null,
        cardCode: inward.cardCode ?? '',
        cardName: inward.cardName ?? '',
        itemCode: inward.itemCode ?? '',
        itemName: inward.itemName ?? '',
        quantity: inward.quantity ?? 0,
        createdDateTime: inward.createdDateTime ? new Date(inward.createdDateTime) : null,
        userSign: inward.userSign ?? '',
        isAllocated: inward.isAllocated ?? ''
      }));

      setInwards(filteredInwards);

    } catch (error) {
      console.error("Error fetching inwards:", error);
    }
    setIsLoading(false);
  };
  useEffect(() => {

    fetchInwards();
  }, []);

  const filteredInwards = inwards.filter((inward) =>
    Object.values(inward)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  const reversedUsers = [...filteredInwards].reverse();

  const indexOfLastRow = currentPage * rowPerPage;
  const indexOfFirstRow = indexOfLastRow - rowPerPage;
  const currentData = reversedUsers.slice(indexOfFirstRow, indexOfLastRow);

  const handleRowPerPageChange = (newRowPerPage: number) => {
    const maxPage = Math.ceil(filteredInwards.length / newRowPerPage);
    setRowPerPage(newRowPerPage);

    // Reset to the last page if the current page exceeds the total pages
    if (currentPage > maxPage) {
      setCurrentPage(maxPage);
    }
  };

  const renderRow = (item: Inward) => {
    function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>, item: Inward): void {
      if (e.target.checked) {
        setSelectedInwards(prev => [...prev, item]); // Add to selection
      } else {
        setSelectedInwards(prev => prev.filter(i => i.id !== item.id)); // Remove from selection
      }
    }
    return (
      <tr className="border-b border-gray-200 h-15 text-[14px] font-medium hover:bg-[#8c57ff]/10">
        {/* Radio Button */}
        <td className="px-2 py-2 text-center">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-indigo-600"
            checked={selectedInwards.some(x => x.id === item.id)} // to track checked state
            onChange={(e) => handleCheckboxChange(e, item)}
          />
        </td>
        {/* Doc Entry */}
        <td className="hidden md:table-cell">{item.docEntry ?? '-'}</td>

        {/* Doc Num */}
        <td className="hidden md:table-cell">{item.docNum ?? '-'}</td>

        {/* Doc Date */}
        <td className="hidden md:table-cell">
          {item.docDate ? new Date(item.docDate).toLocaleDateString() : '-'}
        </td>

        {/* Trans Type */}
        <td className="hidden md:table-cell">{item.transType ?? '-'}</td>

        {/* Card Code */}
        <td className="hidden md:table-cell">{item.cardCode ?? '-'}</td>

        {/* Card Name */}
        <td className="hidden md:table-cell">{item.cardName ?? '-'}</td>

        {/* Item Code */}
        <td className="hidden md:table-cell">{item.itemCode ?? '-'}</td>

        {/* Item Name */}
        <td className="hidden md:table-cell">{item.itemName ?? '-'}</td>

        {/* Quantity */}
        <td className="hidden md:table-cell">{item.quantity ?? '-'}</td>

        {/* Created Date */}
        {/* <td className="hidden md:table-cell">
          {item.createdDateTime ? new Date(item.createdDateTime).toLocaleString() : '-'}
        </td> */}

        {/* User Sign */}
        {/* <td className="hidden md:table-cell">{item.userSign ?? '-'}</td> */}


      </tr>
    );
  };

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">

      {/* TOP */}
      <Grid header="Inward List" role="admin" FormComponent={null} searchTerm={searchTerm}
        setSearchTerm={setSearchTerm} showAddButton={false} setRowPerPage={handleRowPerPageChange} />
      {/* CENTERED INPUT */}
      <div className="flex justify-start my-4 gap-4">
        <div className="relative w-half max-w-md">
          <label className="floating-label text-black font-medium">
            <span>Allocate Qty</span>
            <input
              type="number"
              id="allocateQty"
              name="allocateQty"
              value={allocateQty}
              onChange={(e) => setAllocateQty(e.target.value)}
              className="input input-md w-half p-2 h-8 rounded-lg border-2 border-gray-300 focus:border-black focus:outline-none"
              placeholder="Allocate Qty"
            />

          </label>

        </div>
        <button type="button"
          onClick={async () => {
            if (!selectedInwards) {
              showErrorToast('No row selected');
              return;
            }

            if (!allocateQty) {
              showErrorToast('No quantity entered');
              return;
            }

            const inwardChildRequestList = selectedInwards.map((item) => ({
              id: item.id,
              baseEntry: item.docEntry, // this must be exactly as your input
              itemCode: item.itemCode,
              itemName: item.itemName,
              quantity: parseFloat(allocateQty)
            }));

            debugger
            try {
              const response = await api.post(
                '/Inward/CreateInwardChild',
                inwardChildRequestList, // ✅ send array directly!
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`
                  }
                }
              );

              showSuccessToast(response.data.message || "Data inserted successfully");



              const childresponse = await api.put(
                `/Inward/UpdateInward?userSign=${user}`,
                inwardChildRequestList,
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`
                  }
                }
              );
              if (childresponse.status === 200) {
                // ✅ Update was successful
                fetchInwards(); // refresh the list
                setAllocateQty('');
              } else {

                showErrorToast("Failed to update Inward data.");
              }


            } catch (error) {

              showErrorToast("Failed to insert data");
            }
          }}
          className="bg-[#8c57ff] text-white text-sm w-8 h-7 rounded-md hover:bg-[#7a4ce2]  mt-0.5 flex items-center justify-center"

        >
          <FaCheckCircle className="text-xl" />
        </button>
        <button
  className="bg-[#8c57ff] text-white text-sm w-8 h-7 rounded-md hover:bg-[#7a4ce2] mt-0.5 flex items-center justify-center"
  onClick={() => setSelectedInwards([])} // Reset allocateQty
>
  <RxReset className="text-xl" />
</button>


      </div>
      {/* LIST */}
      <Table columns={inwardColumns} renderRow={renderRow} data={currentData} />
      {/* PAGINATION */}
      <Pagination data={filteredInwards} rowPerPage={rowPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />

    </div>
  );
}

export default withAuth(InwardGrid);