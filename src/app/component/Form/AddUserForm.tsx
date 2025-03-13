"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/app/services/api";
import { showErrorToast, showSuccessToast } from "@/app/utils/toastConfig";
const user = localStorage.getItem("userName");
const AddUserForm: React.FC = () => {
    const [formData, setFormData] = useState({
        userId: 0,
        username: '',
        password: '',
        confirmPassword: '',
        wareHouse: '',
        role: '',
        deviceId: '',
        isActive: true,
        createdBy: user,
        createdOn: '',
        updatedBy: '',
        updatedOn: '',
        isDeleted: false,
    });
    const [errors, setErrors] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        wareHouse: '',
        role: '',
        deviceId: '',
    });
    type UserData = {
        isAdmin: boolean;
    };
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showrole, setShowRole] = useState<string[]>([]);
    const [userNameError, setUserNameError] = useState('');
    const router = useRouter();
    const [parsedUserData, setParsedUserData] = useState<UserData | null>(null);
    const searchParams = useSearchParams();

    const role = ['User', 'Admin'];

    useEffect(() => {
        const userDataParam = searchParams.get("userData");
        if (userDataParam) {
            try {
                const userDataParamAgain = JSON.parse(userDataParam);
                setParsedUserData(userDataParamAgain);
                debugger
                const parsedUserData = JSON.parse(decodeURIComponent(userDataParam));
                setFormData({
                    userId: parsedUserData.userID || 0,
                    username: parsedUserData.userName || "",
                    isActive: parsedUserData.isActive ?? true,
                    role: parsedUserData.role || 'Standard',
                    password: parsedUserData.password || "",
                    confirmPassword: parsedUserData.password || "",
                    wareHouse: parsedUserData.wareHouse || "",
                    deviceId: parsedUserData.deviceId || "",
                    createdBy: parsedUserData.createdBy || "",
                    createdOn: parsedUserData.createdOn || "",
                    updatedBy: parsedUserData.updatedBy || "",
                    updatedOn: parsedUserData.updatedOn || "",
                    isDeleted: false
                });
            } catch (error) {
                console.error("Error parsing user data:", error);
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
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('User Data', formData);
        let userRequest;
        if (formData.userId > 0) {
            userRequest = {
                userId: formData.userId,
                userName: formData.username,
                password: formData.password,
                wareHouse: formData.wareHouse,
                role: formData.role,
                deviceId: formData.deviceId,
                createdBy: user,
                createdOn: '',
                isActive: formData.isActive,
                updatedBy: '',
                updatedOn: '',
                isDeleted: false,
            }
        } else {
            debugger;
            userRequest = {
                userId: formData.userId,
                userName: formData.username,
                password: formData.password,
                wareHouse: formData.wareHouse,
                role: formData.role,
                deviceId: formData.deviceId,
                createdBy: user,
                createdOn: new Date().toISOString(),
                isActive: formData.isActive,
                updatedBy: user,
                updatedOn: new Date().toISOString(),
                isDeleted: false,
            }

        }
        try {
            debugger;
            const response = await api.post('/User/CreateUser', userRequest);
            debugger
            if (response.status === 200) {
                if (response.data.ErrorCode === 200) {
                    showSuccessToast(`User ${formData.userId > 0 ? 'Updated' : 'Created'} Successfully!`);
                    handleCancel();
                    router.push('/pages/adduser');
                } else {
                    showErrorToast(`User ${formData.userId > 0 ? 'Updated' : 'Created'} failed.`);
                }
            } else {
                showErrorToast(`User ${formData.userId > 0 ? 'Updated' : 'Created'} failed.`);
            }
        } catch (error) {
            showErrorToast(`User ${formData.userId > 0 ? 'Updated' : 'Created'} failed.`);
            console.error('Error adding/editing user:', error);
        }
    };
    const handleCancel = () => {
        setFormData({
            userId: 0,
            username: '',
            password: '',
            confirmPassword: '',
            wareHouse: '',
            role: '',
            deviceId: '',
            isActive: false,
            createdBy: user,
            createdOn: '',
            updatedBy: '',
            updatedOn: '',
            isDeleted: false,
        });
        router.push('/pages/adduser');
    };

    const handleBackClick = () => {
        router.back();
    };
    return (
        <div className="w-full p-10 bg-slate-100 text-indigo-800 rounded-xl shadow-xl max-w-4xl mx-auto mt-10">

            <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-8">Add New User</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-semibold text-indigo-700">UserName</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg bg-white border border-indigo-300 text-indigo-800 placeholder-indigo-500 shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                            placeholder="Enter Username"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-semibold text-indigo-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg bg-white border border-indigo-300 text-indigo-800 placeholder-indigo-500 shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                            placeholder="Enter Password"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-semibold text-indigo-700">confirmPassword</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg bg-white border border-indigo-300 text-indigo-800 placeholder-indigo-500 shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                            placeholder="ReEnter Your Password"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="role" className="block mb-2 text-sm font-semibold text-indigo-700">Role Type</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg bg-white border border-indigo-300 text-indigo-800 placeholder-indigo-500 shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                            required
                        >
                            <option value="" disabled>Select User Type</option>
                            {role.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="wareHouse" className="block mb-2 text-sm font-semibold text-indigo-700">Warehouse</label>
                    <input
                        type="text"
                        id="wareHouse"
                        name="wareHouse"
                        value={formData.wareHouse}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-white border border-indigo-300 text-indigo-800 placeholder-indigo-500 shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                        placeholder="Enter Warehouse"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="deviceId" className="block mb-2 text-sm font-semibold text-indigo-700">Device ID</label>
                    <input
                        type="text"
                        id="deviceId"
                        name="deviceId"
                        value={formData.deviceId}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-white border border-indigo-300 text-indigo-800 placeholder-indigo-500 shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                        placeholder="Enter Device ID"
                        required
                    />
                </div>

                <div className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded border-indigo-300 text-blue-500 focus:ring-2 focus:ring-blue-400"
                    />
                    <label htmlFor="isActive" className="text-sm font-semibold text-indigo-700">Is Active</label>
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none transition-all"
                    >
                        {formData.userId > 0 ? 'Update' : 'Add User'}
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
export default AddUserForm;