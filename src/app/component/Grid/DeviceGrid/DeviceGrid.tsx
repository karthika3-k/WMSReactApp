
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

type Device = {
    deviceId: number;
    userName: string;
    deviceSerialNo: string;
    // CreatedBy: string;
    // CreatedOn: Date;
    // UpdatedBy: string;
    // UpdatedOn: Date;
};
let role = "admin";
const deviceColumns = [
    { name: "DeviceId", field: "deviceId", visible: true },
    { name: "UserName", field: "userName", className: "hidden md:table-cell", visible: true },
    { name: "DeviceSerialNo", field: "deviceSerialNo", className: "hidden md:table-cell", visible: true },
    // { name: "CreatedBy", field: "CreatedBy",className: "hidden md:table-cell", visible: true },
    // { name: "CreatedOn", field: "CreatedOn", className: "hidden md:table-cell",visible: true },
    // { name: "UpdatedBy", field: "UpdatedBy", className: "hidden md:table-cell",visible: true },
    // { name: "UpdatedOn", field: "UpdatedOn", className: "hidden md:table-cell",visible: true },
    { name: 'Actions', field: 'actions', visible: true },

];

const DeviceGrid = () => {


    const [devices, setDevices] = useState<Device[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
        const deviceParam = JSON.stringify(device);
        router.push(`/pages/adddevice?userData=${encodeURIComponent(deviceParam)}`);
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

                <td className="hidden md:table-cell">{item.deviceId}</td>
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
                            <button
                                onClick={() => handleEdit(item)}
                                className="w-7 h-7 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600"
                            >
                                <FaEdit />
                            </button>
                        )}

                        {role === "admin" && (
                            <button
                                onClick={() => handleDelete(item)}
                                className="w-7 h-7 flex items-center justify-center rounded-full bg-red-100 text-red-600"
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
            <Grid header="All Devices" role="admin" FormComponent={<DeviceForm />} />
            {/* LIST */}
            <Table columns={deviceColumns} renderRow={renderRow} data={devices} />
            {/* PAGINATION */}
            <Pagination data={devices} rowPerPage={7} />
        </div>
    );
};

export default DeviceGrid;
