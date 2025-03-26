"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/app/services/api";
import { showErrorToast, showSuccessToast } from "@/app/utils/toastConfig";
import { User } from "@/app/component/types/User";
import { ToastContainer } from "react-toastify";
import UserGrid from "../Grid/UserGrid/UserGrid";
//const user = localStorage.getItem("userName");
let user = null
if (typeof window !== "undefined") {
    user = localStorage.getItem("userName");
}
interface AddUserFormProps {
    userData?: User | null;
    onAddUser: (newUser: User) => void;
}
const AddUserForm: React.FC<AddUserFormProps> = ({ userData, onAddUser }) => {
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
        if (typeof window !== "undefined") {
            if (userData) {
                setFormData({
                    ...formData,
                    userId: userData.userId || 0,
                    username: userData.userName || "",
                    isActive: userData.isActive ?? true,
                    role: userData.role || 'Standard',
                    password: userData.password || "",
                    confirmPassword: userData.password || "",
                    wareHouse: userData.wareHouse || "",
                    deviceId: Array.isArray(userData.deviceId)
                        ? userData.deviceId.join(', ')
                        : userData.deviceId || ''  // ✅ Ensures deviceId is handled safely
                });
            }
        }
    }, [userData]);




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
    const validateForm = () => {

        let isValid = true;
        const newErrors: any = {};

        if (!formData.username) {
            newErrors.userName = "Username is required";
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
            isValid = false;
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
            showErrorToast(`Password Mismatching`);
            isValid = false;
        }
        if (!formData.role) {
            newErrors.role = "Role is required";
            isValid = false;
        }
        if (!formData.wareHouse) {
            newErrors.wareHouse = "WareHouse is required";
            isValid = false;
        }
        if (!formData.deviceId) {
            newErrors.deviceId = "Device is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };
    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        if (validateForm()) {

            console.log('UserForm Submitted:', formData);
            let userRequest;
            if (formData.userId > 0) {
                userRequest = {
                    userId: formData.userId,
                    userName: formData.username,
                    password: formData.password,
                    wareHouse: formData.wareHouse,
                    role: formData.role,
                    deviceId: formData.deviceId,
                    createdBy: '',
                    createdOn: new Date().toISOString(),
                    isActive: formData.isActive,
                    updatedBy: user,
                    updatedOn: new Date().toISOString(),
                    isDeleted: false,
                }
            } else {

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

                let response;
                if (formData.userId > 0) {

                    const values = {
                        userId: userRequest.userId,
                    };
                    response = await api.put(`/User/UpdateUser?id=${values.userId}`, userRequest);
                    console.log(response);
                }
                else {
                    response = await api.post('/User/CreateUser', userRequest);
                }
                if (response.status === 200 || response.status === 201) {
                    debugger
                    if (response.data !== null) {
                        // handleCancel();
                        // console.log(`User ${formData.userId > 0 ? 'Updated' : 'Created'} Successfully!`);
                        // showSuccessToast(`User ${formData.userId > 0 ? 'Updated' : 'Created'} Successfully!`);
                        // onAddUser(response.data);
                        const message = `User ${formData.userId > 0 ? 'Updated' : 'Created'} Successfully!`;
                        showSuccessToast(message);
                        setTimeout(() => {
                            handleCancel();
                            console.log(message);
                            onAddUser(response.data);
                        }, 1000);
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
        //router.push('/pages/adduser');
    };

    const handleBackClick = () => {
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
        // Retrieve the checkbox element by its ID
        const drawerCheckbox = document.getElementById('my-drawer-4') as HTMLInputElement | null;

        // Check if the element exists
        if (drawerCheckbox) {
            // Set the checked property to false to close the drawer
            drawerCheckbox.checked = false;
        }
    };

    return (
        <div className="w-full p-10 text-indigo-800 rounded-xl max-h-[700px] overflow-y-auto overflow-x-hidden p-4">

            <button
                className="text-red-500 text-3xl absolute top-4 right-4 p-3 rounded-full  hover:scale-125 transition-transform duration-200 ease-in-out focus:outline-none"
                onClick={handleBackClick}
                aria-label="Add User"
            >
                <span aria-hidden="true">&times;</span>
            </button>


            <h2 className="text-xl font-medium text-center text-black mb-8">
                {formData.userId > 0 ? 'Update User' : 'Add New User'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">  {/* Updated grid structure */}

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
                                className="input input-md w-full p-2 h-11 rounded-lg border-2 border-gray-300 focus:border-black  focus:outline-none"
                                placeholder="Username"
                                required
                            />
                        </label>

                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="floating-label text-black font-medium">
                            <span>Password</span>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="input input-md w-full p-2 h-11 rounded-lg border-2 border-gray-300 focus:border-black  focus:outline-none"
                                placeholder="Password"
                                required
                            />
                        </label>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <label className="floating-label text-black font-medium">
                            <span>Confirm Password</span>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="input input-md w-full p-2 h-11 rounded-lg border-2 border-gray-300 focus:border-black  focus:outline-none"
                                placeholder="Confirm Password"
                                required
                            />
                        </label>
                    </div>

                    {/* Role Type */}
                    <div className="relative">
                        <label className="floating-label text-black font-medium">
                            <span>Role Type</span>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                className="input input-md w-full p-2 h-11 rounded-lg border-2 border-gray-300 focus:border-black  focus:outline-none"
                                required
                            >
                                <option value="" disabled>Select User Type</option>
                                {role.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </label>
                    </div>

                    {/* Warehouse */}
                    <div className="relative">
                        <label className="floating-label text-black font-medium">
                            <span>Warehouse</span>
                            <input
                                type="text"
                                id="wareHouse"
                                name="wareHouse"
                                value={formData.wareHouse}
                                onChange={handleInputChange}
                                className="input input-md w-full p-2 h-11 rounded-lg border-2 border-gray-300 focus:border-black  focus:outline-none"
                                placeholder="Warehouse"
                                required
                            />
                        </label>
                    </div>

                    {/* Device ID */}
                    <div className="relative">
                        <label className="floating-label text-black font-medium">
                            <span>Device ID</span>
                            <input
                                type="text"
                                id="deviceId"
                                name="deviceId"
                                value={formData.deviceId}
                                onChange={handleInputChange}
                                className="input input-md w-full p-2 h-11 rounded-lg border-2 border-gray-300 focus:border-black  focus:outline-none"
                                placeholder="Device ID"
                                required
                            />
                        </label>
                    </div>


                    {/* Is Active */}
                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            id="isActive"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-indigo-300 text-black focus:ring-2 focus:ring-blue-400"
                        />
                        <label htmlFor="isActive" className="text-sm font-medium text-black">
                            Is Active
                        </label>
                    </div>
                </div>

                {/* Submit and Cancel Buttons */}
                <div className="flex justify-end gap-4 mt-6">
                    <button
                        type="submit"
                        className="btn btn-accent text-white font-inter"
                    >
                        {formData.userId > 0 ? 'Update' : 'Save'}
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="btn btn-outline btn-error hover:bg-red-100 hover:text-red-600 font-inter"
                    >
                        Clear
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>


    );

};
export default AddUserForm;