"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/app/services/api";
import { showErrorToast, showSuccessToast } from "@/app/utils/toastConfig";
import { Device } from "@/app/component/types/Device";

interface DeviceFormProps {
    deviceData?: Device | null;
}
const DeviceForm: React.FC<DeviceFormProps> = ({ deviceData }) => {
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
        const deviceRequest = {
            //deviceId: formData.deviceId,
            username: formData.username,
            deviceSerialNo: formData.devicenumber, // ✅ Ensured consistent naming
            // createdBy: formData.createdBy,
            // createdOn: new Date().toISOString(),
            // updatedBy: formData.deviceId > 0 ? formData.updatedBy : '',
            // updatedOn: new Date().toISOString(),
        };

        try {
            const response = await api.post('/Device/CreateDevice', deviceRequest);

            if (response.status === 200 || response.status === 201) {
                showSuccessToast(`Device ${formData.deviceId > 0 ? 'Updated' : 'Created'} Successfully!`);
                handleCancel();
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
        <div className="w-full p-10 text-indigo-800 rounded-xl max-h-[700px] overflow-y-auto overflow-x-hidden bg-slate-100 shadow-xl max-w-4xl mx-auto mt-10">

            <button
                className="text-red-500 text-3xl absolute top-4 right-4 p-3 rounded-full hover:scale-125 transition-transform duration-200 ease-in-out focus:outline-none"
                onClick={handleBackClick}
                aria-label="Back"
            >
                <span aria-hidden="true">&times;</span>
            </button>

            <h2 className="text-xl font-medium text-center text-black mb-8">
                Add New Device
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                                className="input input-md w-full p-2 rounded-lg border-2 border-black-300 focus:ring-indigo-500"
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
                                className="input input-md w-full p-2 rounded-lg border-2 border-black-300 focus:ring-indigo-500"
                                placeholder="Enter Your Device No"
                                required
                            />
                        </label>
                    </div>
                </div>

                {/* Submit and Cancel Buttons */}
                <div className="flex justify-end gap-4 mt-6">
                    <button
                        type="submit"
                        className="btn btn-accent text-white font-inter"
                    >
                        {formData.deviceId > 0 ? 'Update' : 'Save'}
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="btn btn-outline btn-error hover:bg-red-100 hover:text-red-600 font-inter"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );


};

export default DeviceForm;
