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
import { BinCnfg } from "@/app/component/types/BinConfig";

let role = "admin";
const userColumns = [
    // { name: "User Id", field: "userId", visible: true },
    { name: "BinCode", field: "binCode", className: "hidden md:table-cell", visible: true },
    { name: "BinName", field: "binName", className: "hidden md:table-cell", visible: true },
    { name: "Prefix", field: "prefix", className: "hidden md:table-cell", visible: true },
    { name: "WareHouse", field: "whsCode", className: "hidden md:table-cell", visible: true },
    { name: "Starting No", field: "startNo", className: "hidden md:table-cell", visible: true },
    { name: "Ending No", field: "endNo", className: "hidden md:table-cell", visible: true },
    { name: 'Actions', field: 'actions', visible: true },];

const UserGrid = () => {
    const [binConfg, setBinConfg] = useState<BinCnfg[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1); // Add page state
    const [searchTerm, setSearchTerm] = useState(""); // Add a search term state
    const drawerCheckboxRef = useRef<HTMLInputElement>(null);
    const [selectedBinConfig, setSelectedBinConfig] = useState<BinCnfg | null>(null);

    const rowPerPage = 7;
    useEffect(() => {
        const fetchBinConfigs = async () => {
            setIsLoading(true);
            try {
                const response = await api.get('/BinConfig/BinConfigList');
                const data = response.data;
                debugger
                const filteredBinConfig = data.map((binConfig: any) => ({
                    binConfigId: binConfig.binConfigId,
                    binCode: binConfig.binCode,
                    binName: binConfig.binName,
                    prefix: binConfig.prefix,
                    whsCode: binConfig.whsCode,
                    startNo: binConfig.startNo,
                    endNo: binConfig.endNo,
                }));
                setBinConfg(filteredBinConfig);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
            setIsLoading(false);
        };
        fetchBinConfigs();
    }, []);

    const router = useRouter();

    // const handleAddClick = () => {
    //     router.push('/pages/adduser');
    // };
    const handleEdit = (binCnfg: BinCnfg) => {
        setSelectedBinConfig(binCnfg);
        debugger;
        setTimeout(() => {
            document.getElementById('my-drawer-4')?.click();
        }, 100);
        
    };

    const handleDelete = async (binCnfg: BinCnfg) => {
        try {
            const values = {
                userId: binCnfg.binConfigId,
            };
            const response = await api.delete(`/BinConfig/DeleteBinConfig?id=${values.userId}`);
            debugger
            if (response.status === 200 || response.status == 201) {
                if (response.data !== null) {
                    showSuccessToast('User Deleted Successfully');
                    router.refresh();
                } else {
                    showErrorToast('User Deletion Failed');
                }
            } else {
                showErrorToast('Error');
            }
            setBinConfg(binConfg.filter((u) => u.binConfigId !== binCnfg.binConfigId));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const filteredUsers = binConfg.filter((binConfg) =>
        Object.values(binConfg)
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    if (isLoading) return <Loader />;

    const indexOfLastRow = currentPage * rowPerPage;
    const indexOfFirstRow = indexOfLastRow - rowPerPage;
    const currentData = filteredUsers.slice(indexOfFirstRow, indexOfLastRow);
    const renderRow = (item: BinCnfg) => {
        return (
            <tr key={item.binConfigId} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-accent/20">
                {/* <td className="flex items-center gap-4 p-4">
                    <Image src="/userlogo.png"
                        alt=""
                        width={40}
                        height={40}
                        className="md:hidden xl:block w-10 h-10 rounded-full object-cover" />
                    <div className="flex flex-col">
                        <h3 className="font-semibold">{item.userName}</h3>
                    </div>
                </td> */}
                <td className="hidden md:table-cell">{item.binCode}</td>
                <td className="hidden md:table-cell">{item.binName}</td>
                <td className="hidden md:table-cell">{item.prefix}</td>
                <td className="hidden md:table-cell">{item.whsCode}</td>
                <td className="hidden md:table-cell">{item.startNo}</td>
                <td className="hidden md:table-cell">{item.endNo}</td>
                <td>
                    <div className="flex items-center gap-2">
                        <Link href={`/Grid/UserGrid/${item.binConfigId}`}>
                            {/* <button className="w-7 h-7 flex items-center justify-center rounded-full bg-sky-100"> */}
                            {/* Add an icon if necessary */}
                            {/* </button> */}
                        </Link>
                        {role === "admin" && (
                            <button onClick={() => handleEdit(item)} className="btn btn-outline btn-accent">
                                <FaEdit />
                            </button>

                        )}

                        {role === "admin" && (
                            <button
                                onClick={() => handleDelete(item)}
                                className="btn btn-outline btn-error"
                            >
                                <FaTrash />
                            </button>
                        )}
                    </div>
                </td>
            </tr>
        );
    };

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* TOP */}
            <Grid header="All BinConfig" role="admin" FormComponent={<BinConfigForm binConfigData={selectedBinConfig || undefined} />} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {/* LIST */}
            <Table columns={userColumns} renderRow={renderRow} data={currentData} />
            {/* PAGINATION */}
            <Pagination data={binConfg} rowPerPage={rowPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />

        </div>
    );
};

export default UserGrid;
