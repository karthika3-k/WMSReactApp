"use client"
import api from "@/app/services/api";
import { showErrorToast, showSuccessToast } from "@/app/utils/toastConfig";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Loader from "../../Common/Loader";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa"
import Table from "../../Table/Table";
import Pagination from "../../Pagination/Pagination";
import Link from "next/link";
import Grid from "../Grid";
import BinConfigForm from "../../Form/BinConfigForm";
import { BinMaster } from "@/app/component/types/BinMaster";
import * as XLSX from "xlsx";
import { HiArrowDownTray, HiDocument, HiMapPin } from "react-icons/hi2";
import ConfirmDialog from "../../Common/ConfirmDialog";
import BinMasterForm from "../../Form/BinMasterForm";
import { toast, ToastContainer } from "react-toastify";
import { Warehouse } from "../../types/Warehouse";
import { TbBuildingWarehouse, TbRulerMeasure, TbRulerMeasure2 } from "react-icons/tb";
import { MdOutlineAirplanemodeActive, MdOutlineAirplanemodeInactive } from "react-icons/md";

let user = null
if (typeof window !== "undefined") {
    debugger
    user = localStorage.getItem("userName");
}
let role = "admin";
const binMasterColumns = [
    { name: "WareHouse", field: "whsCode", className: "hidden md:table-cell", visible: true },
    { name: "Bin Location Code", field: "binLocCode", className: "hidden md:table-cell", visible: true },
    { name: "SL1 Code", field: "sl1Code", className: "hidden md:table-cell", visible: true },
    { name: "SL2 Code", field: "sl2Code", className: "hidden md:table-cell", visible: true },
    { name: "SL3 Code", field: "sl3Code", className: "hidden md:table-cell", visible: true },
    { name: "SL4 Code", field: "sl4Code", className: "hidden md:table-cell", visible: true },
    { name: "SL5 Code", field: "sl5Code", className: "hidden md:table-cell", visible: true },
    { name: "Height", field: "height", className: "hidden md:table-cell", visible: true },
    { name: "Width", field: "width", className: "hidden md:table-cell", visible: true },
    { name: "Length", field: "length", className: "hidden md:table-cell", visible: true },
    { name: "Filter1", field: "filter1", className: "hidden md:table-cell", visible: true },
    { name: "Filter2", field: "filter2", className: "hidden md:table-cell", visible: true },
    { name: "Filter3", field: "filter3", className: "hidden md:table-cell", visible: true },
    { name: "Quantity", field: "quantity", className: "hidden md:table-cell", visible: true },
    { name: "Level", field: "level", className: "hidden md:table-cell", visible: true },
    { name: "Active", field: "active", className: "hidden md:table-cell", visible: true },
    { name: "Actions", field: "actions", visible: true }
];

const BinMastserGrid = () => {
    const [binMaster, setBinMaster] = useState<BinMaster[]>([]);
    const [wareHouse, setWareHouse] = useState<Warehouse[]>([]);
    const [selectedWhsCode, setSelectedWhsCode] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1); // Add page state
    const [searchTerm, setSearchTerm] = useState(""); // Add a search term state
    const drawerCheckboxRef = useRef<HTMLInputElement>(null);
    const [selectedMaster, setSelectedMaster] = useState<BinMaster | null>(null);

    const rowPerPage = 10;
    useEffect(() => {
        const fetchWareHouse = async () => {
            const fetchWareHouseData = await wareHouseTypes();
            setWareHouse(fetchWareHouseData);
        };
        fetchWareHouse();
    }, []);
    // useEffect(() => {

    //     const fetchBinMaster = async () => {
    //         setIsLoading(true);
    //         try {
    //             const response = await api.get('/BinMaster/BinMasterList');
    //             const data = response.data;
    //             debugger
    //             const filteredBinConfig = data.map((binMaster: any) => ({
    //                 binId: binMaster.binId,
    //                 whsCode: binMaster.whsCode,
    //                 binLocCode: binMaster.binLocCode,
    //                 sl1Code: binMaster.sl1Code,
    //                 sl2Code: binMaster.sl2Code,
    //                 sl3Code: binMaster.sl3Code,
    //                 sl4Code: binMaster.sl4Code,
    //                 sl5Code: binMaster.sl5Code,
    //                 height: binMaster.height,
    //                 width: binMaster.width,
    //                 length: binMaster.length,
    //                 filter1: binMaster.filter1,
    //                 filter2: binMaster.filter2,
    //                 filter3: binMaster.filter3,
    //                 quantity: binMaster.quantity,
    //                 level: binMaster.level,
    //                 active: binMaster.active,
    //                 userSign: binMaster.userSign,
    //             }));

    //             setBinMaster(filteredBinConfig);
    //         } catch (error) {
    //             console.error("Error fetching users:", error);
    //         }
    //         setIsLoading(false);
    //     };
    //     fetchBinMaster();
    // }, []);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleImportClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const wareHouseTypes = async () => {
        try {
            const response = await api.get('/WareHouse/WareHouseList');
            const wareHouseData = response.data;
            const wareHouseNames = wareHouseData.map((item: { whsCode: string, whsName: string }) => ({
                whsCode: item.whsCode,
                whsName: item.whsName
            }));
            return wareHouseNames;
        } catch (error) {
            console.error("Error fetching warehouse types:", error);
            return [];
        }
    };

    // Function to handle file selection and reading
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsBinaryString(file);

        reader.onload = (e) => {
            const binaryData = e.target?.result;
            const workbook = XLSX.read(binaryData, { type: "binary" });

            // Assuming data is in the first sheet
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // Convert sheet to JSON format
            const parsedData: any[] = XLSX.utils.sheet_to_json(sheet);

            // Map data to match BinMaster fields
            const formattedData: BinMaster[] = parsedData.map((row) => ({
                binID: 0, // Default ID, you can also generate a unique ID
                whsCode: row.WhsCode || "",
                binLocCode: row.BinLocCode || "",
                sL1Code: row.SL1Code || "",
                sL2Code: row.SL2Code || "",
                sL3Code: row.SL3Code || "",
                sL4Code: row.SL4Code || "",
                sL5Code: row.SL5Code || "",
                height: row.Height || 0,
                width: row.Width || 0,
                length: row.Length || 0,
                filter1: row.Filter1 || "",
                filter2: row.Filter2 || "",
                filter3: row.Filter3 || "",
                quantity: row.Quantity || 0,
                level: row.Level || 0,
                active: row.Active === "Y",
                userSign: user || "", // Default empty string
            }));

            setBinMaster(formattedData);

        };
    };

    const router = useRouter();

    // const handleAddClick = () => {
    //     router.push('/pages/adduser');
    // };
    const handleEdit = (binMaster: BinMaster) => {
        debugger;

        setSelectedMaster(null);

        setTimeout(() => {
            setSelectedMaster(binMaster);
            document.getElementById('my-drawer-4')?.click();
        }, 100);

    };

    const handleDelete = async (binMaster: BinMaster) => {
        try {
            debugger
            const values = {
                userId: binMaster.binID,    
            };
            const response = await api.delete(`/BinMaster/DeleteBinMaster?id=${values.userId}`);
            debugger
            if (response.status === 200 || response.status == 201 || response.status == 204) {
                if (response.data !== null) {
                    showSuccessToast('Deleted Successfully');
                    router.refresh();
                    
                    // Corrected line
                    setBinMaster((prevBinMasters) => prevBinMasters.filter(bm => bm.binID !== binMaster.binID));
                } else {
                    showErrorToast('Deletion Failed');
                }
            } else {
                showErrorToast('Error');
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };
    

    const filteredUsers = binMaster.filter((binMaster) =>
        Object.values(binMaster)
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    if (isLoading) return <Loader />;

    const indexOfLastRow = currentPage * rowPerPage;
    const indexOfFirstRow = indexOfLastRow - rowPerPage;
    const currentData = filteredUsers.slice(indexOfFirstRow, indexOfLastRow);
    const renderRow = (item: BinMaster) => {
        return (
            <tr key={item.binID} className="border-b h-15 text-[16px] border-gray-200 even:bg-slate-50 text-sm hover:bg-[#8c57ff]/20">
                {/* <td className="hidden md:table-cell">{item.binID}</td> */}

                <td className="hidden md:table-cell">
                    <div className="flex items-center gap-1">
                        <TbBuildingWarehouse className="text-primary shrink-0" />
                        <span>{item.whsCode}</span>
                    </div>
                </td>
                <td className="hidden md:table-cell">
                    <div className="flex items-center gap-1">
                        <HiMapPin className="text-primary shrink-0" />
                        <span>{item.binLocCode}</span>
                    </div>
                </td>
                <td className="hidden md:table-cell">{item.sL1Code}</td>
                <td className="hidden md:table-cell">{item.sL2Code}</td>
                <td className="hidden md:table-cell">{item.sL3Code}</td>
                <td className="hidden md:table-cell">{item.sL4Code}</td>
                <td className="hidden md:table-cell">{item.sL5Code}</td>

                <td className="hidden md:table-cell">
                    <div className="flex items-center gap-1">
                        <TbRulerMeasure2 className="text-primary shrink-0" />
                        <span>{item.height}</span>
                    </div>
                </td>
                <td className="hidden md:table-cell">
                    <div className="flex items-center gap-1">
                        <TbRulerMeasure className="text-primary shrink-0" />
                        <span>{item.height}</span>
                    </div>
                </td>
                <td className="hidden md:table-cell">{item.length}</td>
                <td className="hidden md:table-cell">{item.filter1}</td>
                <td className="hidden md:table-cell">{item.filter2}</td>
                <td className="hidden md:table-cell">{item.filter3}</td>
                <td className="hidden md:table-cell">{item.quantity}</td>
                <td className="hidden md:table-cell">{item.level}</td>
                <td className="hidden md:table-cell">
                    {item.active ? (
                        <MdOutlineAirplanemodeActive className="text-[#8c57ff] text-xl" />
                    ) : (
                        <MdOutlineAirplanemodeInactive className="text-[#ff5757] text-xl" />
                    )}
                </td>
                {/* <td className="hidden md:table-cell">{item.userSign}</td> */}

                {/* Actions Column */}
                <td>
                    <div className="flex items-center gap-2">
                        <Link href={`/Grid/BinMasterGrid/${item.binID}`}>
                            {/* Add an icon or user details here */}
                        </Link>
                        {role === 'admin' && (
                            <>
                                <button
                                    className="text-[#8c57ff] hover:scale-150"
                                    onClick={() => handleEdit(item)}
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className="text-error hover:scale-150"
                                 onClick={() => handleDelete(item)}
                                >
                                    <FaTrash />
                                </button>
                            </>
                        )}

                        {/* <ConfirmDialog

                            isOpen={isDialogOpen}
                            title="Confirm Deletion"
                            message={`Are you sure you want to delete ${selectedUser?.userName}?`}
                            onConfirm={handleConfirmDelete}
                            onCancel={handleCancelDelete}
                        /> */}

                    </div>

                </td>
            </tr>

        );
    };

    const handleInsertData = async () => {
        try {
            debugger
            if (binMaster.length === 0) {
                toast.error("No data to save!");
                return;
            }

            // Ensure data format matches the API model
            const binRequest = binMaster.map(({ binID, ...rest }) => ({
                ...rest,
                active: rest.active === true, // Ensure it's a boolean
            }));

            const response = await api.post('/BinMaster/CreateBinMaster', binRequest);

            if (response.status === 201 || response.status === 200) {
                toast.success("Data saved successfully!");
            } else {
                toast.error("Failed to save data!");
            }
        } catch (error) {
            console.error("Insert Error:", error);
            toast.error("An error occurred while saving data.");
        }
    };
    const handleWhsChange = async (e: any) => {
        debugger
        const whsCode = e.target.value;
        setSelectedWhsCode(whsCode);

        if (whsCode) {
            try {
                const response = await api.get(`/BinMaster/BinMasterByWhs?whsCode=${whsCode}`);
                setBinMaster(response.data); // Update grid data
            } catch (error) {
                console.error("Error fetching bin data:", error);
            }
        }
    };

    const onUpdateChange = (whsCode: string) => {
        debugger
        //const whsCode = e.target.value;
        setSelectedWhsCode("null");

        setTimeout(async () => {
            setSelectedWhsCode(whsCode);

            if (whsCode) {
                try {
                    const response = await api.get(`/BinMaster/BinMasterByWhs?whsCode=${whsCode}`);
                    setBinMaster(response.data); // Update grid data
                } catch (error) {
                    console.error("Error fetching bin data:", error);
                }
            }
        }, 100);



    };



    return (
        // const [wareHouse, setWareHouse] = useState<Warehouse[]>([]);
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">

            <div className="flex items-center justify-between space-x-4 mb-4"> {/* Added space between elements */}
                {/* Dropdown */}
                <div className="relative flex items-center">
                    <label className="floating-label text-black font-medium">
                        <span>Warehouse Code</span>
                        <select
                            id="whsCode"
                            name="whsCode"
                            value={selectedWhsCode} // ✅ Corrected value
                            onChange={handleWhsChange}
                            className="input input-md p-2 rounded-lg border-2 border-gray-300 focus:ring-indigo-500 focus:outline-none font-medium text-center"
                            required
                            style={{ fontSize: '10px' }} // Font size for selected value
                        >
                            <option value="" disabled>
                                Select Warehouse Code
                            </option>
                            {wareHouse.map((item, index) => (
                                <option key={index} value={item.whsCode}>
                                    {item.whsName}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                {/* File Input */}
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    ref={fileInputRef} // Using ref instead of id
                    onChange={handleFileUpload}
                    className="hidden"
                />

                {/* Button */}
                <div className="flex justify-end">
                    <button
                        className="btn btn-soft bg-[#b08aff] text-white flex items-center gap-2 hover:bg-[#8c57ff]"
                        onClick={handleImportClick}
                    >
                        Import <HiArrowDownTray />
                    </button>
                </div>
            </div>

            {/* TOP */}
            <Grid header="Bin Master" role="admin" FormComponent={<BinMasterForm onUpdateChanges={onUpdateChange} binMasterData={selectedMaster || undefined} />} searchTerm={searchTerm} setSearchTerm={setSearchTerm} showAddButton={false} />
            {/* LIST */}
            <Table columns={binMasterColumns} renderRow={renderRow} data={currentData} />
            {/* PAGINATION */}
            <Pagination data={binMaster} rowPerPage={rowPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <div className="flex justify-end mb-4">
                <button
                    className="btn btn-soft bg-[#b08aff] text-white flex items-center gap-2 hover:bg-[#8c57ff]"
                    onClick={handleInsertData} >
                    <HiDocument /> Save
                </button>
            </div>
            <ToastContainer position="bottom-right" />
        </div>

    );
};

export default BinMastserGrid;
