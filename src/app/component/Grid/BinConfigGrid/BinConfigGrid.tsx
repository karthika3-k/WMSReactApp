// "use client";
// import api from "@/app/services/api";
// import { showErrorToast, showSuccessToast } from "@/app/utils/toastConfig";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import Loader from "../../Common/Loader";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import Table from "../../Table/Table";
// import Pagination from "../../Pagination/Pagination";
// import Grid from "../Grid";
// import BinConfigForm from "../../Form/BinConfigForm";
// import { BinCnfg } from "@/app/component/types/BinConfig";

// let role = "admin";

// const userColumns = [
//     { name: "Warehouse", field: "whsCode", className: "hidden md:table-cell", visible: true },
//     { name: "Is Active", field: "isActive", className: "hidden md:table-cell", visible: true },
//     { name: "CreatedOn", field: "createdOn", className: "hidden md:table-cell", visible: true },
//     { name: "Actions", field: "actions", visible: true },
// ];

// const BinConfigGrid = () => {
//     const [binConfg, setBinConfg] = useState<BinCnfg[]>([]);
//     const [binConfgList, setBinConfgList] = useState<BinCnfg[]>([]);
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [searchTerm, setSearchTerm] = useState<string>("");
//     const [selectedBinConfig, setSelectedBinConfig] = useState<BinCnfg | null>(null);

//     const rowPerPage = 7;
//     const router = useRouter();

//     // Fetch BinConfigs List
//     useEffect(() => {
//         const fetchBinConfigs = async () => {
//             setIsLoading(true);
//             try {
//                 const response = await api.get("/BinConfig/BinConfigList");
//                 const data = response.data;
//                 const filteredBinConfig = data.map((binConfig: any) => ({
//                     binConfigId: binConfig.binConfigId,
//                     binCode: binConfig.binCode,
//                     binName: binConfig.binName,
//                     prefix: binConfig.prefix,
//                     whsCode: binConfig.whsCode,
//                     isActive: binConfig.isActive,
//                     createdOn: binConfig.createdOn,
//                 }));
//                 setBinConfg(filteredBinConfig);
//             } catch (error) {
//                 console.error("Error fetching BinConfigs:", error);
//             }
//             setIsLoading(false);
//         };
//         fetchBinConfigs();
//     }, []);

//     // Fetch BinConfig List by Warehouse Code
//     const fetchBinConfigByWhsCode = async (whsCode: string) => {
//         setIsLoading(true);
//         try {
//             const response = await api.get(`/BinConfig/BinConfigListbyWhsCode?whsCode=${whsCode}`);
//             const data = response.data;
//             const filteredBinConfigLists = data.map((binConfig: any) => ({
//                 binConfigId: binConfig.binConfigId,
//                 binCode: binConfig.binCode,
//                 binName: binConfig.binName,
//                 prefix: binConfig.prefix,
//                 whsCode: binConfig.whsCode,
//                 isActive: binConfig.isActive,
//                 createdOn: binConfig.createdOn,
//             }));
//             setBinConfgList(filteredBinConfigLists);
//         } catch (error) {
//             console.error("Error fetching BinConfig by WhsCode:", error);
//         }
//         setIsLoading(false);
//     };

//     // UseEffect to fetch BinConfig based on selectedBinConfig's whsCode
//     useEffect(() => {
//         if (selectedBinConfig && selectedBinConfig.whsCode) {
//             const whsCode = Array.isArray(selectedBinConfig.whsCode)
//                 ? selectedBinConfig.whsCode.join(", ")
//                 : selectedBinConfig.whsCode;
//             fetchBinConfigByWhsCode(whsCode);
//         }
//     }, [selectedBinConfig]);

//     // Handle Add BinConfig
//     const handleAddBinConfig = (newBin: BinCnfg) => {
//         setBinConfgList((prevUsers) => [newBin, ...prevUsers]);
//         let whsCode = Array.isArray(newBin.whsCode) ? newBin.whsCode.join(", ") : newBin.whsCode;
//         fetchBinConfigByWhsCode(whsCode);
//     };

//     // Handle Edit BinConfig
//     const handleEdit = (binCnfg: BinCnfg) => {
//         setSelectedBinConfig(binCnfg);
//         setTimeout(() => {
//             document.getElementById("my-drawer-4")?.click();
//         }, 100);
//     };


//     const handleDelete = async (binCnfg: BinCnfg) => {
//         try {
//             const response = await api.delete(`/BinConfig/DeleteBinConfig?id=${binCnfg.binConfigId}`);
//             if (response.status === 200 || response.status === 201) {
//                 showSuccessToast("BinConfig Deleted Successfully");
//                 setBinConfg(binConfg.filter((config) => config.binConfigId !== binCnfg.binConfigId));

//                 const whsCode = Array.isArray(binCnfg.whsCode) ? binCnfg.whsCode.join(", ") : binCnfg.whsCode;

//                 fetchBinConfigByWhsCode(whsCode); 
//             } else {
//                 showErrorToast("BinConfig Deletion Failed");
//             }
//         } catch (error) {
//             console.error("Error deleting BinConfig:", error);
//             showErrorToast("Error Deleting BinConfig");
//         }
//     };

//     // Filtered BinConfig data
//     const filteredBinConfigs = binConfg.filter((binConfig) =>
//         Object.values(binConfig)
//             .join(" ")
//             .toLowerCase()
//             .includes(searchTerm.toLowerCase())
//     );

//     if (isLoading) return <Loader />;

//     // Paginate Data
//     const reversedUsers = [...filteredBinConfigs].reverse();
//     const indexOfLastRow = currentPage * rowPerPage;
//     const indexOfFirstRow = indexOfLastRow - rowPerPage;
//     const currentData = reversedUsers.slice(indexOfFirstRow, indexOfLastRow);

//     // Render Table Row
//     const renderRow = (item: BinCnfg) => {
//         return (
//             <tr key={item.binConfigId} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-accent/20">
//                 <td className="hidden md:table-cell">{item.whsCode}</td>
//                 <td className="hidden md:table-cell">
//                     <button className={`btn btn-soft text-[16px] font-medium ${item.isActive ? "btn-success" : "btn-error"}`}>
//                         {item.isActive ? "Active" : "Inactive"}
//                     </button>
//                 </td>
//                 <td className="hidden md:table-cell">
//                     {item.createdOn ? new Date(item.createdOn.replace(" ", "T")).toLocaleString() : "N/A"}
//                 </td>
//                 <td>
//                     <div className="flex items-center gap-2">
//                         {role === "admin" && (
//                             <button onClick={() => handleEdit(item)} className="text-success hover:scale-150">
//                                 <FaEdit />
//                             </button>
//                         )}
//                         {role === "admin" && (
//                             <button onClick={() => handleDelete(item)} className="text-error hover:scale-150">
//                                 <FaTrash />
//                             </button>
//                         )}
//                     </div>
//                 </td>
//             </tr>
//         );
//     };

//     return (
//         <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
//             {/* Header */}
//             <Grid
//                 header="All BinConfig"
//                 role="admin"
//                 FormComponent={<BinConfigForm onAddUser={handleAddBinConfig} selectedBinConfig={binConfgList || undefined} />}
//                 searchTerm={searchTerm}
//                 setSearchTerm={setSearchTerm}
//             />
//             {/* Table */}
//             <Table columns={userColumns} renderRow={renderRow} data={currentData} />
//             {/* Pagination */}
//             <Pagination data={binConfg} rowPerPage={rowPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
//         </div>
//     );
// };

// export default BinConfigGrid;

"use client";
import api from "@/app/services/api";
import { showErrorToast, showSuccessToast } from "@/app/utils/toastConfig";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../../Common/Loader"; // Corrected the import of Loader
import { FaEdit, FaTrash } from "react-icons/fa";
import Table from "../../Table/Table";
import Pagination from "../../Pagination/Pagination";
import Grid from "../Grid";
import BinConfigForm from "../../Form/BinConfigForm";
import { BinCnfg } from "@/app/component/types/BinConfig";
import Link from "next/link";
import ConfirmDialog from "../../Common/ConfirmDialog";
import { ToastContainer } from "react-toastify";

let role = "admin";

const userColumns = [
    { name: "Warehouse", field: "whsCode", className: "hidden md:table-cell", visible: true },
    { name: "Is Active", field: "isActive", className: "hidden md:table-cell", visible: true },
    { name: "CreatedOn", field: "createdOn", className: "hidden md:table-cell", visible: true },
    { name: "Actions", field: "actions", visible: true },
];

const BinConfigGrid = () => {
    const [binConfg, setBinConfg] = useState<BinCnfg[]>([]);
    const [binConfgList, setBinConfgList] = useState<BinCnfg[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedBinConfig, setSelectedBinConfig] = useState<BinCnfg | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const rowPerPage = 7;
    const router = useRouter();

    // Fetch BinConfigs List
    useEffect(() => {
        const fetchBinConfigs = async () => {
            setIsLoading(true);
            try {
                const response = await api.get("/BinConfig/BinConfigList");
                const data = response.data;
                const filteredBinConfig = data.map((binConfig: any) => ({
                    binConfigId: binConfig.binConfigId,
                    binCode: binConfig.binCode,
                    binName: binConfig.binName,
                    prefix: binConfig.prefix,
                    whsCode: binConfig.whsCode,
                    isActive: binConfig.isActive,
                    createdOn: binConfig.createdOn,
                }));
                setBinConfg(filteredBinConfig);
            } catch (error) {
                console.error("Error fetching BinConfigs:", error);
            }
            setIsLoading(false);
        };
        fetchBinConfigs();
    }, []);

    // Fetch BinConfig List by Warehouse Code
    const fetchBinConfigByWhsCode = async (whsCode: string) => {
        setIsLoading(true);
        try {
            const response = await api.get(`/BinConfig/BinConfigListbyWhsCode?whsCode=${whsCode}`);
            const data = response.data;
            const filteredBinConfigLists = data.map((binConfig: any) => ({
                binConfigId: binConfig.binConfigId,
                binCode: binConfig.binCode,
                binName: binConfig.binName,
                prefix: binConfig.prefix,
                whsCode: binConfig.whsCode,
                isActive: binConfig.isActive,
                createdOn: binConfig.createdOn,
            }));
            setBinConfgList(filteredBinConfigLists);
           
        } catch (error) {
            console.error("Error fetching BinConfig by WhsCode:", error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (selectedBinConfig && selectedBinConfig.whsCode) {
            const whsCode = Array.isArray(selectedBinConfig.whsCode)
                ? selectedBinConfig.whsCode.join(", ")
                : selectedBinConfig.whsCode;
            fetchBinConfigByWhsCode(whsCode);
        }
    }, [selectedBinConfig]);

    // Handle Add BinConfig
    const handleAddBinConfig = async (newBin: BinCnfg) => {
        // Optimistically update the local state by adding the new bin config
        setBinConfg((prevConfigs) => [newBin, ...prevConfigs]);
    debugger
        try {
            // Fetch the updated list of BinConfigs
            const response = await api.get("/BinConfig/BinConfigList");
            debugger
            const data = response.data;
    
            // Map the response to a standardized format
            const filteredBinConfig = data.map((binConfig: any) => ({
                binConfigId: binConfig.binConfigId,
                binCode: binConfig.binCode,
                binName: binConfig.binName,
                prefix: binConfig.prefix,
                whsCode: binConfig.whsCode,
                isActive: binConfig.isActive,
                createdOn: binConfig.createdOn,
            }));
    
            // Update the state with the freshly fetched bin configurations
            setBinConfg(filteredBinConfig);
    
        } catch (error) {
            console.error("Error fetching BinConfigs:", error);
        }
    debugger
        // If you want to refresh the page or specific part, use router.refresh()
        router.refresh();
    };
    
    const handleEdit = async (binConfig: BinCnfg) => {
        try {
            if (binConfig.whsCode) {
                const whsCode = Array.isArray(binConfig.whsCode) ? binConfig.whsCode.join(", ") : binConfig.whsCode;
                const response = await api.get(`/BinConfig/BinConfigListbyWhsCode?whsCode=${whsCode}`);
                const data = response.data;
                const filteredBinConfigLists = data.map((binCnfig: any) => ({
                    binConfigId: binCnfig.binConfigId,
                    binCode: binCnfig.binCode,
                    binName: binCnfig.binName,
                    prefix: binCnfig.prefix,
                    whsCode: binCnfig.whsCode,
                    isActive: binCnfig.isActive,
                    createdOn: binCnfig.createdOn,
                }));
                setBinConfgList(filteredBinConfigLists);
                setTimeout(() => {
                    document.getElementById("my-drawer-4")?.click(); 
                }, 100);
            }
        } catch (error) {
            console.error("Error handling edit:", error);
            showErrorToast("Error while fetching data or opening the drawer.");
        }
    };

    const handleDelete = async (binCnfg: BinCnfg) => {
        try {
            debugger
            const response = await api.delete(`/BinConfig/DeleteBinConfig?whsCode=${binCnfg.whsCode}`);
            if (response.status === 200 || response.status === 201 || response.status === 204) {
                showSuccessToast("BinConfig Deleted Successfully");

                setBinConfg((prevConfigs) => prevConfigs.filter((config) => config.binConfigId !== binCnfg.binConfigId));
                setBinConfgList((prevConfigs) => prevConfigs.filter((config) => config.binConfigId !== binCnfg.binConfigId));

                const whsCode = Array.isArray(binCnfg.whsCode) ? binCnfg.whsCode.join(", ") : binCnfg.whsCode;
                fetchBinConfigByWhsCode(whsCode);
            } else {
                showErrorToast("BinConfig Deletion Failed");
            }
        } catch (error) {
            console.error("Error deleting BinConfig:", error);
            showErrorToast("Error Deleting BinConfig");
        }
    };

    const handleDeleteClick = (binCnfg: BinCnfg) => {
        setSelectedBinConfig(binCnfg);
        setIsDialogOpen(false);
        handleDelete(binCnfg);
        
    };

    const handleCancelDelete = () => {
        setIsDialogOpen(false);
        setSelectedBinConfig(null);
    };

    // Filtered BinConfig data
    const filteredBinConfigs = binConfg.filter((binConfig) =>
        Object.values(binConfig)
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    if (isLoading) return <Loader />;

    // Paginate Data
    const reversedUsers = [...filteredBinConfigs].reverse();
    const indexOfLastRow = currentPage * rowPerPage;
    const indexOfFirstRow = indexOfLastRow - rowPerPage;
    const currentData = reversedUsers.slice(indexOfFirstRow, indexOfLastRow);

    // Render Table Row
    const renderRow = (item: BinCnfg) => {
        return (
            <tr key={item.binConfigId} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-accent/20">
                <td className="hidden md:table-cell">{item.whsCode}</td>
                <td className="hidden md:table-cell">
                    <button className={`btn btn-soft text-[16px] font-medium ${item.isActive ? "btn-success" : "btn-error"}`}>
                        {item.isActive ? "Active" : "Inactive"}
                    </button>
                </td>
                <td className="hidden md:table-cell">
                    {item.createdOn ? new Date(item.createdOn.replace(" ", "T")).toLocaleString() : "N/A"}
                </td>
                <td>
                    <div className="flex items-center gap-2">
                        <Link href={`/Grid/BinConfigGrid/${item.binConfigId}`}></Link>
                        {role === 'admin' && (
                            <>
                                <button
                                    className="text-success hover:scale-150"
                                    onClick={() => handleEdit(item)}
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className="text-error hover:scale-150"
                                    onClick={() => {
                                        setSelectedBinConfig(item); 
                                        setIsDialogOpen(true); 
                                    }}
                                >
                                    <FaTrash />
                                </button>
                            </>
                        )}
                        <ConfirmDialog
                            isOpen={isDialogOpen}
                            title="Confirm Deletion"
                            message={`Are you sure you want to delete ${selectedBinConfig?.whsCode || "this BinConfig"}?`}
                            onConfirm={() => handleDeleteClick(item)}
                            onCancel={handleCancelDelete}
                        />
                    </div>
                </td>
            </tr>
        );
    };

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* Header */}
            <Grid
                header="All BinConfig"
                role="admin"
                FormComponent={<BinConfigForm onAddUser={handleAddBinConfig} selectedBinConfig={binConfgList} />}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                showAddButton ={true}
            />
            {/* Table */}
            <Table columns={userColumns} renderRow={renderRow} data={currentData} />
            {/* Pagination */}
            <Pagination data={binConfg} rowPerPage={rowPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <ToastContainer />
        </div>
    );
};

export default BinConfigGrid;
