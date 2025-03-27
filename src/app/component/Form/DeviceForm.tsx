"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/app/services/api";
import { showErrorToast, showSuccessToast } from "@/app/utils/toastConfig";
import { Device } from "@/app/component/types/Device";
import { ToastContainer } from "react-toastify";

interface DeviceFormProps {
    deviceData?: Device | null;
    onAddDevice: (newDevice: Device) => void;
}
const DeviceForm: React.FC<DeviceFormProps> = ({ deviceData, onAddDevice }) => {
    const [formData, setFormData] = useState({
        deviceId: 0,
        username: '',
        devicenumber: '',

    });

    const [errors, setErrors] = useState({
        username: '',
        devicenumber: '',
    });

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (deviceData) {
                setFormData({
                    deviceId: deviceData.deviceId || 0,
                    username: deviceData.userName || "",
                    devicenumber: deviceData.deviceSerialNo || "",

                });
            }
        }
    }, [deviceData]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Device Data:', formData);
        debugger;
        let deviceRequest;
        deviceRequest = {
            deviceId: formData.deviceId,
            username: formData.username,
            deviceSerialNo: formData.devicenumber, // ✅ Ensured consistent naming
            // createdBy: formData.createdBy,
            // createdOn: new Date().toISOString(),
            // updatedBy: formData.deviceId > 0 ? formData.updatedBy : '',
            // updatedOn: new Date().toISOString(),
        };
        if (formData.deviceId > 0) {
            deviceRequest = {
                deviceId: formData.deviceId,
                username: formData.username,
                deviceSerialNo: formData.devicenumber, // ✅ Ensured consistent naming
                // createdBy: formData.createdBy,
                // createdOn: new Date().toISOString(),
                // updatedBy: formData.deviceId > 0 ? formData.updatedBy : '',
                // updatedOn: new Date().toISOString(),
            };
        } else {

            deviceRequest = {
                deviceId: formData.deviceId,
                username: formData.username,
                deviceSerialNo: formData.devicenumber, // ✅ Ensured consistent naming
                // createdBy: formData.createdBy,
                // createdOn: new Date().toISOString(),
                // updatedBy: formData.deviceId > 0 ? formData.updatedBy : '',
                // updatedOn: new Date().toISOString(),
            };
        }

        try {
            let response;
            if (formData.deviceId > 0) {

                const values = {
                    deviceId: deviceRequest.deviceId,
                };
                response = await api.put(`/Device/UpdateDevice?id=${values.deviceId}`, deviceRequest);
                console.log(response);
            }
            else {
                response = await api.post('/Device/CreateDevice', deviceRequest);
            }


            if (response.status === 200 || response.status === 201) {
                const message = `Device ${formData.deviceId > 0 ? 'Updated' : 'Created'} Successfully!`;
                showSuccessToast(message);
                setTimeout(() => {
                    handleBackClick();
                    console.log(message);
                    onAddDevice(response.data);
                }, 1000);
                //router.push('/pages/adddevie');
            } else {
                showErrorToast(`Device ${formData.deviceId > 0 ? 'Updated' : 'Created'} failed.`);
            }
        } catch (error) {
            showErrorToast(`Device ${formData.deviceId > 0 ? 'Updated' : 'Created'} failed.`);
            console.error('Error adding/editing device:', error);
        }
    };

    const handleCancel = () => {
        setFormData({
            deviceId: 0,
            username: '',
            devicenumber: '',
            // createdBy: '',
            // createdOn: '',
            // updatedBy: '',
            // updatedOn: '',
        });
        //router.push('/pages/device');
    };
    const handleBackClick = () => {
        handleCancel();
        const drawerCheckbox = document.getElementById('my-drawer-4') as HTMLInputElement | null;

        // Check if the element exists
        if (drawerCheckbox) {
            // Set the checked property to false to close the drawer
            drawerCheckbox.checked = false;
        }
    };

    return (
        <div className="w-full text-indigo-800 rounded-xl max-h-[900px] overflow-y-auto overflow-x-hidden relative">
            <div className="flex justify-between items-center p-6">
                <h2 className="text-xl font-medium text-left text-black ml-2">
                    {formData.deviceId > 0 ? 'Update Device' : ' Add New Device'}
                </h2>
                <button
                    className="text-red-500 text-3xl rounded-full hover:scale-125  transition-transform duration-200 ease-in-out focus:outline-none"
                    onClick={handleBackClick}
                    aria-label="Back"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 p-4">
                <div className="grid grid-cols-1 gap-6">

                    {/* Username */}
                    <div className="relative">
                        <label className="floating-label text-black font-medium">
                            <span>Username</span>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="input input-md w-half p-2 h-13 rounded-lg border-2 border-gray-300 focus:border-black focus:outline-none"
                                placeholder="Enter Your UserName"
                                required
                            />
                        </label>
                    </div>

                    {/* Device Serial Number */}
                    <div className="relative">
                        <label className="floating-label text-black font-medium">
                            <span>Device Serial Number</span>
                            <input
                                type="text"
                                id="devicenumber"
                                name="devicenumber"
                                value={formData.devicenumber}
                                onChange={handleInputChange}
                                className="input input-md w-half p-2 h-13 rounded-lg border-2 border-gray-300 focus:border-black  focus:outline-none"
                                placeholder="Enter Your Device No"
                                required
                            />
                        </label>
                    </div>
                </div>

                {/* Submit and Cancel Buttons */}
                <div className="flex justify-end gap-4 mt-4 p-4">
                    <button
                        type="submit"
                        className="btn btn-soft bg-[#b08aff] text-white flex items-center gap-2 hover:bg-[#8c57ff]"
                    >
                        {formData.deviceId > 0 ? 'Update' : 'Save'}
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="btn btn-outline btn-error hover:text-white"
                    >
                        Clear
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );


};

export default DeviceForm;
