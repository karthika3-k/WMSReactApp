"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/app/services/api";
import { showErrorToast, showSuccessToast } from "@/app/utils/toastConfig";

const DeviceForm: React.FC = () => {
    const [formData, setFormData] = useState({
        deviceId: 0,
        username: '',
        devicenumber: '',
        createdBy: '',
        createdOn: '',
        updatedBy: '',
        updatedOn: '',
    });

    const [errors, setErrors] = useState({
        username: '',
        devicenumber: '',
    });

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const userDataParam = searchParams.get("userData");

        // ✅ Fix: Initialize `device` inside useEffect to ensure client-side access
        const device = typeof window !== "undefined" ? localStorage.getItem("userName") : null;

        if (userDataParam) {
            try {
                const parsedDeviceData = JSON.parse(decodeURIComponent(userDataParam));
                setFormData({
                    deviceId: parsedDeviceData.DeviceId || 0,
                    username: parsedDeviceData.UserName || "",
                    devicenumber: parsedDeviceData.DeviceSerialNo || "",
                    createdBy: parsedDeviceData.CreatedBy || device || "",
                    createdOn: parsedDeviceData.CreatedOn || "",
                    updatedBy: parsedDeviceData.UpdatedBy || "",
                    updatedOn: parsedDeviceData.UpdatedOn || "",
                });
            } catch (error) {
                console.error("Error parsing device data:", error);
            }
        } else {
            // ✅ Set default values for `createdBy` on load
            setFormData((prevData) => ({
                ...prevData,
                createdBy: device || ""
            }));
        }
    }, [searchParams]);

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

        const userRequest = {
            deviceId: formData.deviceId,
            username: formData.username,
            deviceSerialNo: formData.devicenumber, // ✅ Ensured consistent naming
            createdBy: formData.createdBy,
            createdOn: formData.deviceId > 0 ? formData.createdOn : new Date().toISOString(),
            updatedBy: formData.deviceId > 0 ? formData.updatedBy : '',
            updatedOn: formData.deviceId > 0 ? new Date().toISOString() : '',
        };

        try {
            const response = await api.post('/Device/CreateDevice', userRequest);

            if (response.status === 200 && response.data.ErrorCode === 200) {
                showSuccessToast(`User ${formData.deviceId > 0 ? 'Updated' : 'Created'} Successfully!`);
                handleCancel();
                router.push('/pages/adduser');
            } else {
                showErrorToast(`User ${formData.deviceId > 0 ? 'Updated' : 'Created'} failed.`);
            }
        } catch (error) {
            showErrorToast(`User ${formData.deviceId > 0 ? 'Updated' : 'Created'} failed.`);
            console.error('Error adding/editing user:', error);
        }
    };

    const handleCancel = () => {
        setFormData({
            deviceId: 0,
            username: '',
            devicenumber: '',
            createdBy: '',
            createdOn: '',
            updatedBy: '',
            updatedOn: '',
        });
        router.push('/pages/device');
    };

    return (
        <div className="w-full p-10 bg-slate-100 text-indigo-800 rounded-xl shadow-xl max-w-4xl mx-auto mt-10">
            <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-8">Device</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-semibold text-indigo-700">
                            UserName
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username} // ✅ Fixed value binding
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg bg-white border border-indigo-300 text-indigo-800 placeholder-indigo-500 shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                            placeholder="Enter Your UserName"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="devicenumber" className="block mb-2 text-sm font-semibold text-indigo-700">
                            Device Serial Number
                        </label>
                        <input
                            type="text"
                            id="devicenumber"
                            name="devicenumber"
                            value={formData.devicenumber}  // ✅ Fixed value binding
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg bg-white border border-indigo-300 text-indigo-800 placeholder-indigo-500 shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                            placeholder="Enter Your Device No"
                            required
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none transition-all"
                    >
                        {formData.deviceId > 0 ? 'Update' : 'Save'}
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 focus:outline-none transition-all"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DeviceForm;
