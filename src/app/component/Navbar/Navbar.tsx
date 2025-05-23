"use client"
import { FaSearch, FaComments, FaLock, FaSignOutAlt, FaEye, FaEyeSlash, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import api from "@/app/services/api";
import { showSuccessToast } from "@/app/utils/toastConfig";
import { ToastContainer } from "react-toastify";

// A simple confirmation dialog component
const ConfirmationDialog: React.FC<{ onConfirm: () => void; onCancel: () => void }> = ({ onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <p className="text-lg mb-4 text-gray-700">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-4">
                <button onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                    Cancel
                </button>
                <button onClick={onConfirm} className="bg-[#b08aff] text-white px-4 py-2 rounded-lg hover:bg-teal-700">
                    Logout
                </button>
            </div>
        </div>
    </div>
);

// Updated Password Change Form with a Beautiful Design
const PasswordChangeForm: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        debugger
        e.preventDefault();
        if (newPassword === confirmPassword) {
            const userID = typeof window !== "undefined" ? localStorage.getItem("userID") : null;
            const username = typeof window !== 'undefined' ? localStorage.getItem("userName") : null;
            if (userID) {

                const response = await api.put(`/Login/UpdateUserPwd?id=${userID}&userName=${username}&password=${newPassword}`);
                debugger
                const da = response.status;
                if (response.status === 200 || response.status === 201) {
                    const message = `Psssword Updated Successfully!`;
                    showSuccessToast(message);
                    setNewPassword("");
                    setConfirmPassword("");
                    onCancel();

                }

            } else {
                alert("No user ID found");
            }
        } else {
            alert("Passwords do not match");
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Change Your Password</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-lg text-gray-700 mb-2" htmlFor="new-password">New Password</label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                id="new-password"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                placeholder="Enter a strong new password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-lg text-gray-700 mb-2" htmlFor="confirm-password">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirm-password"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="Confirm your new password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-[#b08aff] text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition duration-200"
                        >
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const Navbar: React.FC = () => {
    const router = useRouter();
    const username = typeof window !== 'undefined' ? localStorage.getItem("userName") || "John Smith" : "John Smith";
    const userRole = typeof window !== 'undefined' ? localStorage.getItem("userRole") || "Admin" : "Admin";
    const profileImageUrl = "/userlogo.png";
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false);
    const [isPasswordChangeOpen, setPasswordChangeOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
    const handleLogout = () => setLogoutDialogOpen(true);

    const confirmLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        localStorage.removeItem("userID");
        localStorage.removeItem("admin");
        router.push("/");
        setLogoutDialogOpen(false);
    };

    const cancelLogout = () => setLogoutDialogOpen(false);

    const openPasswordChangeForm = () => setPasswordChangeOpen(true);
    const closePasswordChangeForm = () => setPasswordChangeOpen(false);
    return (
        <div className="flex items-center justify-between p-4 w-full">
           <h1 className="flex-grow text-center uppercase tracking-wide font-semibold text-purple-600 text-shadow z-10">Warehouse Management System</h1>
            <div className="flex items-center gap-6 justify-end">
                <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
                    <FaComments />
                </div>
                <div className="flex flex-col">
                    <span className="text-xs leading-3 font-medium">{username}</span>
                    <span className="text-[10px] text-black-100 text-right">{userRole}</span>
                </div>

                <div className="relative">
                    <img
                        src={profileImageUrl}
                        alt="Profile"
                        className="w-10 h-10 rounded-full border-2 border-indigo-100 cursor-pointer"
                        onClick={toggleDropdown}
                    />

                    {/* Dropdown Menu with Casual Background Color */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-3 w-56 bg-[#b08aff] rounded-lg z-10 shadow-lg p-3">
                            <ul className="space-y-2">
                                {/* Profile */}
                                <li className="text-center text-white font-semibold">
                                    My Profile
                                </li>
                                <hr className="border-gray-300" />
                                {/* Change Password */}
                                <li
                                    onClick={openPasswordChangeForm}
                                    className="flex items-center text-white px-4 py-2 hover:bg-blue-300 rounded-md cursor-pointer transition duration-300 ease-in-out"
                                >
                                    <FaLock className="w-5 h-5 mr-2" />
                                    Change Password
                                </li>
                                {/* Logout */}
                                <li
                                    onClick={handleLogout}
                                    className="flex items-center text-white px-4 py-2 hover:bg-blue-300 rounded-md cursor-pointer transition duration-300 ease-in-out"
                                >
                                    <FaSignOutAlt className="w-5 h-5 mr-2" />
                                    Logout
                                </li>
                            </ul>
                        </div>

                    )}
                </div>
            </div>
            {/* Render Logout Confirmation Dialog */}
            {isLogoutDialogOpen && (
                <ConfirmationDialog onConfirm={confirmLogout} onCancel={cancelLogout} />
            )}

            {/* Render Change Password Form */}
            {isPasswordChangeOpen && <PasswordChangeForm onCancel={closePasswordChangeForm} />}
            <ToastContainer />
        </div>
    );
};
export default Navbar;