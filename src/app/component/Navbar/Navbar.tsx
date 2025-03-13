"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation'; // Use next.js router for redirection
import { FaLock, FaSignOutAlt, FaEye, FaEyeSlash } from "react-icons/fa";

// A simple confirmation dialog component
const ConfirmationDialog: React.FC<{ onConfirm: () => void; onCancel: () => void }> = ({ onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <p className="text-lg mb-4 text-gray-700">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-4">
                <button onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                    Cancel
                </button>
                <button onClick={onConfirm} className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
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
        e.preventDefault();
        if (newPassword === confirmPassword) {
            const userID = typeof window !== "undefined" ? localStorage.getItem("userID") : null;

            if (userID) {
                // Call your API to change the password here
                // Example:
                // const response = await axios.post('/path-to-change-password', { userID, password: newPassword });

                setNewPassword(""); // Clear form fields after successful password change
                setConfirmPassword(""); // Clear form fields after successful password change
                onCancel(); // Close the form
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
                            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition duration-200"
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
    const router = useRouter(); // Using Next.js Router for navigation
    const username = typeof window !== 'undefined' ? localStorage.getItem("userName") || "John Smith" : "John Smith";
    const profileImageUrl = "/userlogo.png";
    const companyLogo = "/Techativelogo.png"

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
        router.push("/"); // Redirect to home after logout
        setLogoutDialogOpen(false);
    };

    const cancelLogout = () => setLogoutDialogOpen(false);

    const openPasswordChangeForm = () => setPasswordChangeOpen(true);
    const closePasswordChangeForm = () => setPasswordChangeOpen(false);

    return (
        <header className="w-full bg-gradient-to-b from-indigo-700 to-indigo-800 text-indigo-100 p-2 shadow-md flex justify-between items-center">
            <div>
                <img
                    src={companyLogo}
                    alt="Profile"
                    className="w-45 h-10 border-2 border-indigo-100"
                />
            </div>
            <h1 className="text-xl font-bold items-center">WareHouse Management System</h1>
            <div className="flex items-center gap-6">
                <div className="relative">
                    <div className="flex items-center gap-2">
                        <span className="text-lg text-indigo-100">{username}</span>
                        <img
                            src={profileImageUrl}
                            alt="Profile"
                            className="w-10 h-10 rounded-full border-2 border-indigo-100"
                            onClick={toggleDropdown}
                        />
                    </div>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-blue-400 text-Teal-100 rounded-lg shadow-lg">
                            <ul>
                                <li
                                    onClick={openPasswordChangeForm}
                                    className="flex items-center px-4 py-2 hover:bg-blue-300 cursor-pointer"
                                >
                                    <FaLock className="w-5 h-5 mr-2" />
                                    Change Password
                                </li>
                                <li
                                    onClick={handleLogout}
                                    className="flex items-center px-4 py-2 hover:bg-blue-300 cursor-pointer"
                                >
                                    <FaSignOutAlt className="w-5 h-5 mr-2" />
                                    Logout
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {isLogoutDialogOpen && <ConfirmationDialog onConfirm={confirmLogout} onCancel={cancelLogout} />}
            {isPasswordChangeOpen && <PasswordChangeForm onCancel={closePasswordChangeForm} />}
        </header>
    );
};

export default Navbar;









// const Navbar: React.FC = () => {
//     return (
//         <header className="w-full bg-gray-900 text-white p-4 shadow-md">
//             <div className="flex justify-between items-center">
//                 <h1 className="text-xl font-bold">Warehouse Management System</h1>
//                 <div className="flex items-center gap-4">
//                     <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
//                         Sign Out
//                     </button>
//                 </div>
//             </div>
//         </header>
//     );
// };
// export default Navbar;