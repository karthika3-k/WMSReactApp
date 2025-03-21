
"use client"
import api from "@/app/services/api";
import { showErrorToast, showSuccessToast } from "@/app/utils/toastConfig";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../../Common/Loader";
import Table from "../../Table/Table";
import Pagination from "../../Pagination/Pagination";
import Link from "next/link";
import Grid from "../Grid";
import DeviceForm from "../../Form/DeviceForm";
import { FaEdit, FaTrash } from "react-icons/fa";

import { Device } from "@/app/component/types/Device";

let role = "admin";
const deviceColumns = [
    //{ name: "DeviceId", field: "deviceId", visible: false },
    { name: "UserName", field: "userName", className: "hidden md:table-cell", visible: true },
    { name: "DeviceSerialNo", field: "deviceSerialNo", className: "hidden md:table-cell", visible: true },
    // { name: "CreatedBy", field: "CreatedBy",className: "hidden md:table-cell", visible: true },
    // { name: "CreatedOn", field: "CreatedOn", className: "hidden md:table-cell",visible: true },
    // { name: "UpdatedBy", field: "UpdatedBy", className: "hidden md:table-cell",visible: true },
    // { name: "UpdatedOn", field: "UpdatedOn", className: "hidden md:table-cell",visible: true },
    { name: 'Actions', field: 'actions', visible: true },

];
interface AddUserFormProps {
    deviceData?: Device | null;
}

const DeviceGrid: React.FC<AddUserFormProps> = ({ deviceData }) => {
    const rowPerPage = 7;
    const [searchTerm, setSearchTerm] = useState(""); // Add a search term state
    const [devices, setDevices] = useState<Device[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1); // Add page state

    const [selectedUser, setSelectedUser] = useState<Device | null>(null);
    const filteredUsers = devices.filter((Device) =>
        Object.values(Device)
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );
    const indexOfLastRow = currentPage * rowPerPage;
    const indexOfFirstRow = indexOfLastRow - rowPerPage;
    const currentData = filteredUsers.slice(indexOfFirstRow, indexOfLastRow);
    useEffect(() => {
        const fetchDevices = async () => {
            setIsLoading(true);
            try {

                const response = await api.get('/Device/DeviceList');
                const data = response.data;
                const filteredDevices = data.map((device: any) => ({
                    deviceId: device.deviceId,
                    userName: device.userName,
                    deviceSerialNo: device.deviceSerialNo,
                    // CreatedBy: device.CreatedBy,
                    // CreatedOn: device.CreatedOn,
                    // UpdatedBy: device.UpdatedBy,
                    // UpdatedOn: device.UpdatedOn,
                }));
                setDevices(filteredDevices);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
            setIsLoading(false);
        };
        fetchDevices();
    }, []);

    const router = useRouter();

    const handleAddClick = () => {
        router.push('/pages/adddevice');
    };

   const handleEdit = (device: Device) => {
    debugger
           setSelectedUser(device);
           debugger;
           setTimeout(() => {
               document.getElementById('my-drawer-4')?.click();
           }, 100);
   
       };

    const handleDelete = async (device: Device) => {
        try {
            const values = {
                DeviceId: device.deviceId,
            };
            const response = await api.post(`/User/DeleteUser?id=${values.DeviceId}`);
            if (response.status === 200) {
                if (response.data.ErrorCode === 200) {
                    showSuccessToast('User Deleted Successfully');
                } else {
                    showErrorToast('User Deletion Failed');
                }
            } else {
                showErrorToast('Error');
            }
            setDevices(devices.filter((u) => u.deviceId !== device.deviceId));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    if (isLoading) return <Loader />;

    const renderRow = (item: Device) => {
        return (
            <tr key={item.deviceId} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purple-100">

                {/* <td className="hidden md:table-cell">{item.deviceId}</td> */}
                <td className="hidden md:table-cell">{item.userName}</td>
                <td className="hidden md:table-cell">{item.deviceSerialNo}</td>
                {/* <td className="hidden md:table-cell">{item.CreatedBy}</td>
                <td className="hidden md:table-cell">{item.CreatedOn.toLocaleDateString()}</td>
                <td className="hidden md:table-cell">{item.UpdatedBy}</td>
                <td className="hidden md:table-cell">{item.UpdatedOn.toLocaleDateString()}</td>*/}
                <td>
                    <div className="flex items-center gap-2">
                        <Link href={`/Grid/UserGrid/${item.deviceId}`}>
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
            <Grid header="All Devices" role="admin" FormComponent={<DeviceForm deviceData={selectedUser || undefined} />} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {/* LIST */}
            <Table columns={deviceColumns} renderRow={renderRow} data={currentData} />
            {/* PAGINATION */}
            <Pagination data={devices} rowPerPage={rowPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
};

export default DeviceGrid;
