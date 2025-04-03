
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
import { withAuth } from "@/app/utils/auth";
import { Device } from "@/app/component/types/Device";
import ConfirmDialog from "../../Common/ConfirmDialog";

let role = "admin";
let user = null;
let accessToken = null;
if (typeof window !== "undefined") {
    debugger
    user = localStorage.getItem("userName");
    accessToken = localStorage.getItem("authToken");
}
const deviceColumns = [
    //{ name: "DeviceId", field: "deviceId", visible: false },
    { name: "User Name", field: "userName", className: "hidden md:table-cell", visible: true },
    { name: "Device SerialNo", field: "deviceSerialNo", className: "hidden md:table-cell", visible: true },
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
   // const rowPerPage = 7;
    const [searchTerm, setSearchTerm] = useState(""); // Add a search term state
    const [devices, setDevices] = useState<Device[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1); // Add page state
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [rowPerPage, setRowPerPage] = useState(3);
    const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
    const filteredUsers = devices.filter((Device) =>
        Object.values(Device)
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );
    const reversedUsers = [...filteredUsers].reverse();
    const indexOfLastRow = currentPage * rowPerPage;
    const indexOfFirstRow = indexOfLastRow - rowPerPage;
    const currentData = reversedUsers.slice(indexOfFirstRow, indexOfLastRow);
    const fetchDevices = async () => {
        setIsLoading(true);
        try {

            const response = await api.get('/Device/DeviceList', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
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
    useEffect(() => {

        fetchDevices();
    }, []);
    // Reset pagination when the search term changes
    useEffect(() => {
        setCurrentPage(1); // Reset to first page when search term changes
    }, [searchTerm]);
    const router = useRouter();

    const handleAddDevice = (newDevice: Device) => {
        debugger
        setDevices((prevDevices) => [newDevice, ...prevDevices]);
        fetchDevices();
    };

    const handleEdit = (device: Device) => {
        debugger
        setSelectedDevice(null);
        debugger;
        setTimeout(() => {
            setSelectedDevice(device);
            document.getElementById('my-drawer-4')?.click();
        }, 100);

    };

    const handleDelete = async (device: Device) => {
        try {
            debugger
            const values = {
                DeviceId: device.deviceId,
            };
            const response = await api.delete(`/Device/DeleteDevice?id=${values.DeviceId}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            if (response.status === 200) {
                if (response.data.ErrorCode === 200) {
                    showSuccessToast('Device Deleted Successfully');
                } else {
                    showErrorToast('Device Deletion Failed');
                }
            } else {
                showErrorToast('Error');
            }
            setDevices(devices.filter((u) => u.deviceId !== device.deviceId));
        } catch (error) {
            console.error("Error deleting user:", error);
        } finally {
            setIsDialogOpen(false);
        }
    };
    const handleRowPerPageChange = (newRowPerPage: number) => {
        const maxPage = Math.ceil(filteredUsers.length / newRowPerPage);
        setRowPerPage(newRowPerPage);
    
        // Reset to the last page if the current page exceeds the total pages
        if (currentPage > maxPage) {
          setCurrentPage(maxPage);
        }
      };
    const handleCancelDelete = () => {
        debugger
        setIsDialogOpen(false);
    };
    const handleConfirmDelete = async () => {


        debugger
        if (!selectedDevice) return;

        try {
            const response = await api.delete(`/Device/DeleteDevice?id=${selectedDevice.deviceId}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            if (response.status === 200 || response.status === 201 || response.status === 204) {
                setDevices(devices.filter((u) => u.deviceId !== selectedDevice.deviceId));
                //handleDelete(response.data);
                showSuccessToast('Device Deleted Successfully');
                fetchDevices();
            } else {
                showErrorToast('Device Deletion Failed');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            showErrorToast('An error occurred');
        } finally {
            debugger
            setIsDialogOpen(false);
            setSelectedDevice(null);
        }
    };
    const handleDeleteClick = (device: Device) => {
        setSelectedDevice(device);
        setIsDialogOpen(true);
        
    };


    if (isLoading) return <Loader />;

    const renderRow = (item: Device) => {
        return (
            <tr key={item.deviceId} className="border-b border-gray-200 h-15 text-[16px] font-medium text-sm hover:bg-[#8c57ff]/20">

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
                            <button onClick={() => handleEdit(item)} className="text-[#8c57ff] hover:scale-150">
                                <FaEdit />
                            </button>

                        )}

                        {role === "admin" && (
                            <button
                                onClick={() => handleDeleteClick(item)}
                                className="text-error hover:scale-150"
                            >
                                <FaTrash />
                            </button>
                        )}
                        <ConfirmDialog

                            isOpen={isDialogOpen}
                            title="Confirm Deletion"
                            message={`Are you sure you want to delete ${selectedDevice?.userName}?`}
                            onConfirm={handleConfirmDelete}
                            onCancel={handleCancelDelete}
                        />
                    </div>
                </td>
            </tr>
        );
    };

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* TOP */}
            <Grid header="All Devices" role="admin" FormComponent={<DeviceForm onAddDevice={handleAddDevice} 
            deviceData={selectedDevice || undefined} />} searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} showAddButton={true} setRowPerPage={handleRowPerPageChange}/>
            {/* LIST */}
            <Table columns={deviceColumns} renderRow={renderRow} data={currentData} />
            {/* PAGINATION */}
            <Pagination data={filteredUsers} rowPerPage={rowPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
};

export default withAuth(DeviceGrid);
