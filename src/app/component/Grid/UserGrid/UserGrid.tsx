"use client"
import api from "@/app/services/api";
import { showErrorToast, showSuccessToast } from "@/app/utils/toastConfig";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Loader from "../../Common/Loader";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa"
import Table from "../../Table/Table";
import Pagination from "../../Pagination/Pagination";
import Image from "next/image";
import Link from "next/link";
import Grid from "../Grid";
import AddUserForm from "../../Form/AddUserForm";
import { User } from "@/types/User";

let role = "admin";
const userColumns = [
    // { name: "User Id", field: "userId", visible: true },
    { name: "UserName", field: "userName", className: "hidden md:table-cell", visible: true },
    { name: "Password", field: "password", className: "hidden md:table-cell", visible: true },
    { name: "WareHouse", field: "wareHouse", className: "hidden md:table-cell", visible: true },
    { name: "Role", field: "role", className: "hidden md:table-cell", visible: true },
    { name: "Device ID", field: "deviceId", className: "hidden md:table-cell", visible: true },
    { name: "IsActive", field: "isActive", className: "hidden md:table-cell", visible: true },
    { name: 'Actions', field: 'actions', visible: true },];

const UserGrid = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1); // Add page state
    const [searchTerm, setSearchTerm] = useState(""); // Add a search term state
    const drawerCheckboxRef = useRef<HTMLInputElement>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const rowPerPage = 7;
    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const response = await api.get('/User/UserList');
                const data = response.data;
                debugger
                const filteredUsers = data.map((user: any) => ({
                    userId: user.userId,
                    userName: user.userName,
                    password: user.password,
                    wareHouse: user.wareHouse,
                    role: user.role,
                    deviceId: user.deviceId,
                    isActive: user.isActive,
                }));
                debugger
                setUsers(filteredUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
            setIsLoading(false);
        };
        fetchUsers();
    }, []);

    const router = useRouter();

    // const handleAddClick = () => {
    //     router.push('/pages/adduser');
    // };
    const handleEdit = (user: User) => {
        setSelectedUser(user);
        debugger;
        setTimeout(() => {
            document.getElementById('my-drawer-4')?.click();
        }, 100);

    };

    const handleDelete = async (user: User) => {
        try {
            const values = {
                userId: user.userId,
            };
            const response = await api.delete(`/User/DeleteUser?id=${values.userId}`);
            debugger
            if (response.status === 200 || response.status==201) {
                if (response.data !== null) {
                    showSuccessToast('User Deleted Successfully');
                } else {
                    showErrorToast('User Deletion Failed');
                }
            } else {
                showErrorToast('Error');
            }
            setUsers(users.filter((u) => u.userId !== user.userId));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const filteredUsers = users.filter((user) =>
        Object.values(user)
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    if (isLoading) return <Loader />;

    const indexOfLastRow = currentPage * rowPerPage;
    const indexOfFirstRow = indexOfLastRow - rowPerPage;
    const currentData = filteredUsers.slice(indexOfFirstRow, indexOfLastRow);
    const renderRow = (item: User) => {
        return (
            <tr key={item.userId} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-accent/20">
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
                <td className="hidden md:table-cell">{item.userName}</td>
                <td className="hidden md:table-cell">{item.password}</td>
                <td className="hidden md:table-cell">{item.wareHouse}</td>
                <td className="hidden md:table-cell">{item.role}</td>
                <td className="hidden md:table-cell">{item.deviceId}</td>
                <td className="hidden md:table-cell">
                    <input
                        type="checkbox"
                        checked={item.isActive}
                        readOnly
                    />
                </td>
                <td>
                    <div className="flex items-center gap-2">
                        <Link href={`/Grid/UserGrid/${item.userId}`}>
                            {/* <button className="w-7 h-7 flex items-center justify-center rounded-full bg-sky-100"> */}
                            {/* Add an icon if necessary */}
                            {/* </button> */}
                        </Link>
                        {role === "admin" && (
                            <button onClick={() => handleEdit(item)} className="btn btn-outline btn-accent">
                              <FaEdit />
                            </button>

                        )}

                        {role === "admin" && (
                            <button
                                onClick={() => handleDelete(item)}
                                className="btn btn-outline btn-error"
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
            <Grid header="All User" role="admin" FormComponent={<AddUserForm userData={selectedUser || undefined} />} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {/* LIST */}
            <Table columns={userColumns} renderRow={renderRow} data={currentData} />
            {/* PAGINATION */}
            <Pagination data={users} rowPerPage={rowPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />

        </div>
    );
};

export default UserGrid;
