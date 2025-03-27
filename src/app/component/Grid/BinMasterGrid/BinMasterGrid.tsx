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
import { TbBuildingWarehouse, TbDeviceAnalytics, TbDeviceDesktopOff, TbRulerMeasure, TbRulerMeasure2 } from "react-icons/tb";
import { MdOutlineAirplanemodeActive, MdOutlineAirplanemodeInactive } from "react-icons/md";

let user = null
if (typeof window !== "undefined") {
    debugger
    user = localStorage.getItem("userName");
}
let role = "admin";



const BinMastserGrid = () => {
    const [binMaster, setBinMaster] = useState<BinMaster[]>([]);
    const [wareHouse, setWareHouse] = useState<Warehouse[]>([]);
    const [selectedWhsCode, setSelectedWhsCode] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1); // Add page state
    const [searchTerm, setSearchTerm] = useState(""); // Add a search term state
    const drawerCheckboxRef = useRef<HTMLInputElement>(null);
    const [isClient, setIsClient] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isActionVisible, setActionIsVisible] = useState(true);
    const [selectedMaster, setSelectedMaster] = useState<BinMaster | null>(null);
    

    const rowPerPage = 5;
    useEffect(() => {
        setIsClient(true);
        const fetchWareHouse = async () => {
            const fetchWareHouseData = await wareHouseTypes();
            setWareHouse(fetchWareHouseData);
        };
        fetchWareHouse();
    }, []);
    const binMasterColumns = [
        // { name: "WareHouse", field: "whsCode", className: "hidden md:table-cell px-2", visible: true },
        { name: "Bin Location Code", field: "binLocCode", className: "hidden md:table-cell px-2", visible: true },
        { name: "SL1 Code", field: "sl1Code", className: "hidden md:table-cell px-2", visible: true },
        { name: "SL2 Code", field: "sl2Code", className: "hidden md:table-cell px-2", visible: true },
        { name: "SL3 Code", field: "sl3Code", className: "hidden md:table-cell px-2", visible: true },
        { name: "SL4 Code", field: "sl4Code", className: "hidden md:table-cell px-2", visible: true },
        { name: "SL5 Code", field: "sl5Code", className: "hidden md:table-cell px-2", visible: true },
        { name: "Height", field: "height", className: "hidden md:table-cell px-2", visible: true },
        { name: "Width", field: "width", className: "hidden md:table-cell px-2", visible: true },
        { name: "Length", field: "length", className: "hidden md:table-cell px-2", visible: true },
        { name: "Filter1", field: "filter1", className: "hidden md:table-cell px-2", visible: true },
        { name: "Filter2", field: "filter2", className: "hidden md:table-cell px-2", visible: true },
        { name: "Filter3", field: "filter3", className: "hidden md:table-cell px-2", visible: true },
        { name: "Quantity", field: "quantity", className: "hidden md:table-cell px-2", visible: true },
        { name: "Level", field: "level", className: "hidden md:table-cell px-2", visible: true },
        { name: "Active", field: "active", className: "hidden md:table-cell px-2", visible: true },
        ...(isActionVisible
            ? [{ name: "Actions", field: "actions", className: "px-2", visible: true }]
            : [])
    ];
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
           
            setActionIsVisible(false);
            setIsVisible(true);
        };
    };
    useEffect(() => {
        setCurrentPage(1); // Reset to first page when search term changes
    }, [searchTerm]);

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
            <tr key={item.binID} className="border-b h-15 text-[14px] border-gray-200 even:bg-slate-50 text-sm hover:bg-[#8c57ff]/20">
                {/* <td className="hidden md:table-cell">{item.binID}</td> */}
{/* 
                <td className="hidden md:table-cell">
                    <div className="flex items-center gap-1 text-center">
                        <TbBuildingWarehouse className="text-primary shrink-0" />
                        <span>{item.whsCode}</span>
                    </div>
                </td> */}
                <td className="hidden md:table-cell text-center">
                    <div className="flex items-center gap-1">

                        <span>{item.binLocCode}</span>
                    </div>
                </td>
                <td className="hidden md:table-cell text-center">{item.sL1Code}</td>
                <td className="hidden md:table-cell text-center">{item.sL2Code}</td>
                <td className="hidden md:table-cell text-center">{item.sL3Code}</td>
                <td className="hidden md:table-cell text-center">{item.sL4Code}</td>
                <td className="hidden md:table-cell text-center">{item.sL5Code}</td>

                <td className="hidden md:table-cell ">
                    <div className="flex items-center justify-center gap-1">
                        {/* <TbRulerMeasure2 className="text-primary shrink-0" /> */}
                        <span>{item.height}</span>
                    </div>
                </td>
                <td className="hidden md:table-cell">
                    <div className="flex items-center justify-center gap-1">
                        {/* <TbRulerMeasure className="text-primary shrink-0" /> */}
                        <span>{item.width}</span>
                    </div>
                </td>
                <td className="hidden md:table-cell text-center">{item.length}</td>
                <td className="hidden md:table-cell text-center">{item.filter1}</td>
                <td className="hidden md:table-cell text-center">{item.filter2}</td>
                <td className="hidden md:table-cell text-center">{item.filter3}</td>
                <td className="hidden md:table-cell text-center">{item.quantity}</td>
                <td className="hidden md:table-cell text-center">{item.level}</td>
                <td className="hidden md:table-cell text-center">
                    <div className="flex justify-center">
                        {item.active ? (
                            <TbDeviceAnalytics className="text-[#8c57ff] text-xl" />
                        ) : (
                            <TbDeviceDesktopOff className="text-[#ff5757] text-xl" />
                        )}
                    </div>
                </td>

                {/* <td className="hidden md:table-cell">{item.userSign}</td> */}

                {/* Actions Column */}

                {isActionVisible && (
                    <td className="text-center">
                        <div className="flex items-center gap-2 justify-center">
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
                        </div>
                    </td>
                )}

            </tr>

        );
    };
    const handleDownloadExcel = () => {

        if (typeof window === "undefined") return; // Ensure it's running on client-side

        // Define headers
        const headers = [
            "WhsCode", "BinLocCode", "SL1Code", "SL2Code", "SL3Code",
            "SL4Code", "SL5Code", "Height", "Width", "Length",
            "Filter1", "Filter2", "Filter3", "Quantity", "Level", "Active"
        ];

        // Define data rows
        const data = [
            ["CWBLR", "CWBLR-F1-R1-B1", "F1", "R1", "B1", "D1", "SB1", 100, 200, 120, "LG", "LED", "WHITE", 40, 2, "Y"]
        ];

        // Combine headers and data
        const worksheetData = [headers, ...data];

        // Create a worksheet and a workbook
        const ws = XLSX.utils.aoa_to_sheet(worksheetData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "BinMaster");

        // Generate Excel file as a Blob
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

        // Create a temporary anchor element
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "BinMaster.xlsx"; // File will be saved in the Downloads folder
        document.body.appendChild(a);
        a.click();

        // Clean up
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };


    const handleInsertData = async () => {
        try {

            if (binMaster.length === 0) {
                toast.error("No data to save!");
                return;
            }

            // Ensure data format matches the API model
            const binRequest = binMaster.map(({ binID, ...rest }) => ({
                ...rest,
                active: rest.active === true, // Ensure it's a boolean
            }));

            const response = await api.post('/BinMaster/CreateBinMasterTemp', binRequest);


            if (response.status === 201 || response.status === 200) {

                const valResponse = await api.get('/BinMaster/ValBinMasterData', {
                    params: { userSign: binRequest[0].userSign }  // Correct way to pass query params
                });

                if (valResponse.status === 201 || valResponse.status === 200) {
                    const mainResponse = await api.post('/BinMaster/CreateBinMaster ', valResponse.data);
                    if (mainResponse.status === 201 || mainResponse.status === 200) {
                        toast.success("Data saved successfully!");
                        debugger
                        const delResponse = await api.delete(`/BinMaster/DeleteBinMasterTemp?userSign=${binRequest[0].userSign}`);
                        debugger
                        console.log(delResponse);
                    }
                }
                else {
                    toast.error("Failed to save data!");
                }
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
                setActionIsVisible(true);
                setIsVisible(false);
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
                        Import
                    </button>
                    <button onClick={handleDownloadExcel} className="btn btn-soft bg-[#b08aff] ml-4  text-white flex items-center gap-2 hover:bg-[#8c57ff] rounded-full">
                        <HiArrowDownTray />
                    </button>
                </div>


            </div>

            {/* TOP */}
            <Grid header="Bin Master" role="admin" FormComponent={<BinMasterForm onUpdateChanges={onUpdateChange} binMasterData={selectedMaster || undefined} />} searchTerm={searchTerm} setSearchTerm={setSearchTerm} showAddButton={false} />
            {/* LIST */}
            <Table columns={binMasterColumns} renderRow={renderRow} data={currentData} />
            {/* PAGINATION */}
            <Pagination data={filteredUsers} rowPerPage={rowPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <div className="flex justify-end mb-4">
                {isVisible && (
                    <button
                        className="btn btn-soft bg-[#b08aff] text-white flex items-center gap-2 hover:bg-[#8c57ff]"
                        onClick={handleInsertData} >
                        <HiDocument /> Save
                    </button>
                )}
            </div>
            <ToastContainer position="bottom-right" />
        </div>

    );
};

export default BinMastserGrid;

