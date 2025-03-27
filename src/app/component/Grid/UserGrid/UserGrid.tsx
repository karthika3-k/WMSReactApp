"use client"
import api from "@/app/services/api";
import { showErrorToast, showSuccessToast } from "@/app/utils/toastConfig";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Loader from "../../Common/Loader";
import { FaEdit, FaPlus, FaTrash, FaUser, FaUserShield } from "react-icons/fa"
import Table from "../../Table/Table";
import Pagination from "../../Pagination/Pagination";
import Image from "next/image";
import Link from "next/link";
import Grid from "../Grid";
import AddUserForm from "../../Form/AddUserForm";
import { User } from "@/app/component/types/User";
import ConfirmDialog from "../../Common/ConfirmDialog";
import { MdOutlineAirplanemodeActive, MdOutlineAirplanemodeInactive } from "react-icons/md";


let role = "admin";
const userColumns = [
    // { name: "User Id", field: "userId", visible: true },
    { name: "User Name", field: "userName", className: "hidden md:table-cell", visible: true },
    // { name: "Password", field: "password", className: "hidden md:table-cell", visible: true },
    { name: "Warehouse", field: "wareHouse", className: "hidden md:table-cell", visible: true },
    { name: "Role", field: "role", className: "hidden md:table-cell", visible: true },
    { name: "Device ID", field: "deviceId", className: "hidden md:table-cell", visible: true },
    { name: "Is Active", field: "isActive", className: "hidden md:table-cell", visible: true },
    { name: 'Actions', field: 'actions', visible: true },];

const UserGrid = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1); // Add page state
    const [searchTerm, setSearchTerm] = useState(""); // Add a search term state
    const drawerCheckboxRef = useRef<HTMLInputElement>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const rowPerPage = 10;
    const fetchUsers = async () => {
        debugger
        setIsLoading(true);
        try {
            const response = await api.get('/User/UserList');
            const data = response.data;
            const filteredUsers = data.map((user: any) => ({
                userId: user.userId,
                userName: user.userName,
                password: user.password,
                wareHouse: user.wareHouse,
                role: user.role,
                deviceId: user.deviceId || [],  // ✅ Default to empty array
                isActive: user.isActive,
            }));
            setUsers(filteredUsers);

        } catch (error) {
            console.error("Error fetching users:", error);
        }
        setIsLoading(false);
    };
    useEffect(() => {

        fetchUsers();
    }, []);

    const router = useRouter();

    const [formData, setFormData] = useState({
        userId: 0,
        username: '',
        password: '',
        confirmPassword: '',
        wareHouse: '',
        role: '',
        deviceId: '',
        isActive: true,
        createdBy: '',
        createdOn: '',
        updatedBy: '',
        updatedOn: '',
        isDeleted: false,
    });

    const handleCancel = () => {
        //setFormData(null);
        setFormData({
            userId: 0,
            username: '',
            password: '',
            confirmPassword: '',
            wareHouse: '',
            role: '',
            deviceId: '',
            isActive: false,
            createdBy: '',
            createdOn: '',
            updatedBy: '',
            updatedOn: '',
            isDeleted: false,
        });
        //router.push('/pages/adduser');
    };

    const handleAddUser = (newUser: User) => {
        debugger
        setUsers((prevUsers) => [newUser, ...prevUsers]);
        fetchUsers();
        router.refresh();
    };
    const handleEdit = (user: User) => {
        debugger;
        setSelectedUser(null); // Reset state to trigger re-render

        setTimeout(() => {
            setSelectedUser(user); // Set new selected user after reset
            document.getElementById('my-drawer-4')?.click();
        }, 100);
    };

    useEffect(() => {
        setCurrentPage(1); // Reset to first page when search term changes
    }, [searchTerm]);

    const handleDelete = async (user: User) => {
        try {
            debugger
            const values = {
                userId: user.userId,
            };
            const response = await api.delete(`/User/DeleteUser?id=${values.userId}`);
            debugger
            if (response.status === 200 || response.status == 201 || response.status == 204) {
                if (response.data !== null) {
                    setUsers(users.filter((u) => u.userId !== response.data.userId));
                    showSuccessToast('User Deleted Successfully');
                    fetchUsers();
                } else {
                    showErrorToast('User Deletion Failed');
                }
            } else {
                showErrorToast('Error');
            }
            //setUsers(users.filter((u) => u.userId !== user.userId));
        } catch (error) {
            console.error("Error deleting user:", error);
        } finally {
            // setIsDialogOpen(false);
        }
    };

    function getInitials(name: string) {
        if (!name) return '';
        const nameParts = name.trim().split(/\s+/);
        if (nameParts.length === 1) {
            // Single name, return the first letter
            return nameParts[0].charAt(0).toUpperCase();
        } else {
            // Multiple names, return the first letter of the first and last parts
            const firstInitial = nameParts[0].charAt(0).toUpperCase();
            const lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
            return firstInitial + lastInitial;
        }
    }

    function getRoleIcon(role: string) {
        switch (role.toLowerCase()) {
            case 'admin':
                return <FaUserShield className="text-blue-500" />;
            case 'user':
                return <FaUser className="text-green-500" />;
            default:
                return null;
        }
    }


    const filteredUsers = users.filter((user) =>
        Object.values(user)
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    if (isLoading) return <Loader />;


    const reversedUsers = [...filteredUsers].reverse();

    const indexOfLastRow = currentPage * rowPerPage;
    const indexOfFirstRow = indexOfLastRow - rowPerPage;
    const currentData = reversedUsers.slice(indexOfFirstRow, indexOfLastRow);

    const handleDeleteClick = (user: User) => {

        setSelectedUser(user);
        setIsDialogOpen(true);
        //handleConfirmDelete();
        //handleDelete(user);
        //handleCancel();
    };

    const handleConfirmDelete = async () => {
        debugger
        if (!selectedUser) return;
        debugger
        try {
            const response = await api.delete(`/User/DeleteUser?id=${selectedUser.userId}`);
            if (response.status === 200 || response.status === 201 || response.status === 204) {
                setUsers(users.filter((u) => u.userId !== selectedUser.userId));
                //handleDelete(response.data);
                showSuccessToast('User Deleted Successfully');
                handleCancel();
                fetchUsers();
            } else {
                showErrorToast('User Deletion Failed');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            showErrorToast('An error occurred');
        } finally {
            setIsDialogOpen(false);
        }
    };

    const handleClose = () => {
        debugger
        setIsDialogOpen(false);
    };
    const handleCancelDelete = () => {
        debugger
        setIsDialogOpen(false);
    };
    const renderRow = (item: User) => {
        return (
            <tr key={item.userId} className="border-b border-gray-200 h-15 text-[16px] font-medium text-sm hover:bg-accent/20">
                {/* <td className="flex items-center gap-4 p-4">
                    <Image src="/userlogo.png"
                        alt=""
                        width={40}
                        height={40}
                        className="md:hidden xl:block w-10 h-10 rounded-full object-cover" />
                    <div className="flex flex-col">
                        <h3 className="font-semibold">{item.userName}</h3>
                    </div>
                </td> */}
                <td className="hidden md:table-cell">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold">
                            {getInitials(item.userName)}
                        </div>
                        <span className="ml-3">{item.userName}</span>
                    </div>
                </td>
                {/* <td className="hidden md:table-cell">{item.password}</td> */}
                <td className="hidden md:table-cell">{item.wareHouse}</td>
                <td className="hidden md:table-cell">
                    <div className="flex items-center">
                        {getRoleIcon(item.role)}
                        <span className="ml-2">{item.role}</span>
                    </div>
                </td>
                <td className="hidden md:table-cell">{item.deviceId}</td>
                <td className="hidden md:table-cell">
                    {item.isActive ? (
                        <MdOutlineAirplanemodeActive className="text-[#8c57ff] text-xl" />
                    ) : (
                        <MdOutlineAirplanemodeInactive className="text-[#ff5757] text-xl" />
                    )}
                </td>
                <td>
                    <div className="flex items-center gap-2">
                        <Link href={`/Grid/UserGrid/${item.userId}`}>
                            {/* Add an icon or user details here */}
                        </Link>
                        {role === 'admin' && (
                            <>
                                <button
                                    className="text-success hover:scale-150"
                                    onClick={() => handleEdit(item)}
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className="text-error hover:scale-150"
                                    onClick={() => handleDeleteClick(item)}
                                >
                                    <FaTrash />
                                </button>
                            </>
                        )}

                        <ConfirmDialog

                            isOpen={isDialogOpen}
                            title="Confirm Deletion"
                            message={`Are you sure you want to delete ${selectedUser?.userName}?`}
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
            <Grid header="User List" role="admin" FormComponent={<AddUserForm onAddUser={handleAddUser} userData={selectedUser || undefined} />} searchTerm={searchTerm} setSearchTerm={setSearchTerm} showAddButton={true} />
            {/* LIST */}
            <Table columns={userColumns} renderRow={renderRow} data={currentData} />
            {/* PAGINATION */}
            <Pagination data={filteredUsers} rowPerPage={rowPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
};

export default UserGrid;
