"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/app/services/api";
import { showErrorToast, showSuccessToast } from "@/app/utils/toastConfig";
//const user = localStorage.getItem("userName");
let user=null
if (typeof window !== "undefined") {
    user = localStorage.getItem("userName");
  }
const DeviceForm: React.FC = () => {
    const [formData, setFormData] = useState({
        
        deviceId: 0,
        username :user,
        devicenumber:'',      
        createdBy: user,
        createdOn: '',
        updatedBy: '',
        updatedOn: '',
       
    });
    const [errors, setErrors] = useState({
        username :user,
        devicenumber:'',     
    });
    type UserData = {
        isAdmin: boolean;
    };
    const [showrole, setShowRole] = useState<string[]>([]);
    const [userNameError, setUserNameError] = useState('');
    const router = useRouter();
    const [parsedDeviceData, setParsedUserData] = useState<UserData | null>(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        const userDataParam = searchParams.get("userData");
        if (userDataParam) {
            try {
                const userDataParamAgain = JSON.parse(userDataParam);
                setParsedUserData(userDataParamAgain);
                debugger
                const parsedDeviceData = JSON.parse(decodeURIComponent(userDataParam));
                setFormData({
                    deviceId: parsedDeviceData.DeviceId || 0,
                    username: parsedDeviceData.UserName || "",
                    devicenumber:parsedDeviceData.DeviceSerialNo||"",
                    createdBy: parsedDeviceData.CreatedBy || "",
                    createdOn: parsedDeviceData.CreatedOn || "",
                    updatedBy: parsedDeviceData.UpdatedBy || "",
                    updatedOn: parsedDeviceData.UpdatedOn || "",
                });
            } catch (error) {
                console.error("Error parsing device data:", error);
            }
        }
    }, [searchParams]);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const target = e.target as HTMLInputElement;
            setFormData({ ...formData, [name]: target.checked });
        }
        else {
            setFormData({ ...formData, [name]: value });
        }
    };
   
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('User Data', formData);
        let userRequest;
        if (formData.deviceId > 0) {
            userRequest = {
                deviceId: formData.deviceId,
                userName: formData.username,
                devicenumber: formData.devicenumber,                
                createdBy: user,
                createdOn: '',                
                updatedBy: '',
                updatedOn: '',
                
            }
        } else {
            debugger;
            userRequest = {
                deviceId  : formData.deviceId,
                userName: formData.username,
                deviceSerialNo: formData.devicenumber,                
                createdBy: user,
                createdOn: new Date().toISOString(),               
                updatedBy: '',
                updatedOn: new Date().toISOString(),
            }

        }
        try {
            debugger;
            const response = await api.post('/Device/CreateDevice', userRequest);
            debugger
            if (response.status === 200) {
                if (response.data.ErrorCode === 200) {
                    showSuccessToast(`User ${formData.deviceId > 0 ? 'Updated' : 'Created'} Successfully!`);
                    handleCancel();
                    router.push('/pages/adduser');
                } else {
                    showErrorToast(`User ${formData.deviceId > 0 ? 'Updated' : 'Created'} failed.`);
                }
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
            username :user,
            devicenumber:'',      
            createdBy: user,
            createdOn: '',
            updatedBy: '',
            updatedOn: '',
           
        });
        router.push('/pages/device');
    };

    const handleBackClick = () => {
        router.back();
    };
    return (
        <div className="w-full p-10 bg-slate-100 text-indigo-800 rounded-xl shadow-xl max-w-4xl mx-auto mt-10">

            <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-8">Device</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* <div>
                        <label htmlFor="deviceId" className="block mb-2 text-sm font-semibold text-indigo-700">DeviceId</label>
                        <input
                            type="text"
                            id="deviceId"
                            name="deviceId"
                            value={formData.deviceId}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg bg-white border border-indigo-300 text-indigo-800 placeholder-indigo-500 shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                            placeholder="Enter deviceId"
                            required
                        />
                    </div> */}

                    
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="userName" className="block mb-2 text-sm font-semibold text-indigo-700">UserName</label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                           // value={formData.username}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg bg-white border border-indigo-300 text-indigo-800 placeholder-indigo-500 shadow-inner 
                            focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                            placeholder="Enter Your UserName"
                            required
                        />
                    </div>
                   
                </div>

               

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="devicenumber" className="block mb-2 text-sm font-semibold text-indigo-700">Device Serial Number</label>
                        <input
                            type="text"
                            id="devicenumber"
                            name="devicenumber"
                            value={formData.devicenumber}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg bg-white border border-indigo-300 text-indigo-800 placeholder-indigo-500 shadow-inner 
                            focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
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