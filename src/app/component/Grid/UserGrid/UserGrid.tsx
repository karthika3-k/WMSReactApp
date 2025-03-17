// "use client"
// import api from "@/app/services/api";
// import { showErrorToast, showSuccessToast } from "@/app/utils/toastConfig";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import Loader from "../../Common/Loader";
// import Grid from "../Grid";


// interface User {
//     userId: number,
//     userName: string,
//     password: string,
//     wareHouse: string,
//     role: string,
//     deviceId: string,
//     isActive: boolean,
// }
// const UserGrid: React.FC = () => {
//     const [users, setUsers] = useState<User[]>([]);
//     const [isLoading, setIsLoading] = useState<boolean>(false);

//     const userColumns = [
//         { name: "User Id", field: "userId", visible: true },
//         { name: "UserName", field: "userName", visible: true },
//         { name: "Password", field: "password", visible: true },
//         { name: "WareHouse", field: "wareHouse", visible: true },
//         { name: "Role", field: "role", visible: true },
//         { name: "Device ID", field: "deviceId", visible: true },
//         { name: "IsActive", field: "isActive", visible: true },
//         { name: 'Actions', field: 'actions', visible: true },
//     ];

//     useEffect(() => {
//         const fetchUsers = async () => {
//             setIsLoading(true);
//             try {
//                 debugger;
//                 const response = await api.get('/User/UserList');
//                 const data = response.data;
//                 const filteredUsers = data.map((user: any) => ({
//                     userId: user.userId,
//                     userName: user.userName,
//                     password: user.password,
//                     wareHouse: user.wareHouse,
//                     role: user.role,
//                     deviceId: user.deviceId,
//                     isActive: user.isActive,
//                 }));
//                 setUsers(filteredUsers);
//             } catch (error) {
//                 console.error("Error fetching users:", error);
//             }
//             setIsLoading(false);
//         };
//         fetchUsers();
//     }, []);
//     const router = useRouter();

//     const handleAddClick = () => {
//         router.push('/pages/adduser');

//     };

//     const handleEdit = (user: User) => {
//         debugger;
//         const userParam = JSON.stringify(user);
//         debugger;
//         router.push(`/pages/adduser?userData=${encodeURIComponent(userParam)}`);
//     };

//     const handleDelete = async (user: User) => {
//         try {
//             const values = {
//                 userId: user.userId,
//             };
//             var response = await api.post(`/User/DeleteUser?id=${values}`);
//             const data = response.data;
//             if (response.status === 200) {
//                 if (response.data.ErrorCode === 200) {
//                     showSuccessToast('User Deleted Successfully');
//                 } else {
//                     showErrorToast('User Deleted Failed');
//                 }
//             } else {
//                 showErrorToast('error');
//             }
//             debugger
//             setUsers(users.filter((u) => u.userId !== user.userId));

//         } catch (error) {
//             console.error("Error deleting user:", error);
//         }
//     };

//     if (isLoading) return <Loader />
//     return (
//         <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
//             <Grid<User>
//                 gridKey="UserGrid"
//                 title="User Management"
//                 data={users}
//                 columnConfig={userColumns}
//                 rowPerPage={7}
//                 onDelete={handleDelete}
//                 handleAddClick={handleAddClick}
//                 addButtonLabel="ADD User"
//                 handleEditClick={handleEdit}
//             />

//         </div>


//     );
// };
// export default UserGrid;







"use client"
import api from "@/app/services/api";
import { showErrorToast, showSuccessToast } from "@/app/utils/toastConfig";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../../Common/Loader";
import { FaPlus } from "react-icons/fa"
import TableSearch from "../../TableSearch/TableSearch";
import { role } from "@/app/lib/data";
import Table from "../../Table/Table";
import Pagination from "../../Pagination/Pagination";
import Image from "next/image";
import Link from "next/link";
import Grid from "../Grid";

type User = {
    userId: number;
    userName: string;
    password: string;
    wareHouse: string;
    role: string;
    deviceId: string[];
    isActive: boolean;
};

const userColumns = [
    { name: "User Id", field: "userId", visible: true },
    { name: "UserName", field: "userName", className: "hidden md:table-cell", visible: true },
    { name: "Password", field: "password", className: "hidden md:table-cell",visible: true },
    { name: "WareHouse", field: "wareHouse",className: "hidden md:table-cell", visible: true },
    { name: "Role", field: "role", className: "hidden md:table-cell",visible: true },
    { name: "Device ID", field: "deviceId", className: "hidden md:table-cell",visible: true },
    { name: "IsActive", field: "isActive", className: "hidden md:table-cell",visible: true },
    { name: 'Actions', field: 'actions', visible: true },
];

const UserGrid = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchUsers = async () => {
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
                    deviceId: user.deviceId,
                    isActive: user.isActive,
                }));
                setUsers(filteredUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
            setIsLoading(false);
        };
        fetchUsers();
    }, []);

    const router = useRouter();

    const handleAddClick = () => {
        router.push('/pages/adduser');
    };

    const handleEdit = (user: User) => {
        const userParam = JSON.stringify(user);
        router.push(`/pages/adduser?userData=${encodeURIComponent(userParam)}`);
    };

    const handleDelete = async (user: User) => {
        try {
            const values = {
                userId: user.userId,
            };
            const response = await api.post(`/User/DeleteUser?id=${values.userId}`);
            if (response.status === 200) {
                if (response.data.ErrorCode === 200) {
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

    if (isLoading) return <Loader />;

    const renderRow = (item: User) => {
        return (
            <tr key={item.userId} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purple-100">
                <td className="flex items-center gap-4 p-4">
                    <Image src="/userlogo.png"
                        alt=""
                        width={40}
                        height={40}
                        className="md:hidden xl:block w-10 h-10 rounded-full object-cover" />
                    <div className="flex flex-col">
                        <h3 className="font-semibold">{item.userName}</h3>
                    </div>
                </td>
                <td className="hidden md:table-cell">{item.userName}</td>
                <td className="hidden md:table-cell">{item.password}</td>
                <td className="hidden md:table-cell">{item.wareHouse}</td>
                <td className="hidden md:table-cell">{item.role}</td>
                <td className="hidden md:table-cell">{item.deviceId}</td>
                <td className="hidden md:table-cell">{item.isActive}</td>               
                <td>
                    <div className="flex items-center gap-2">
                        <Link href={`/Grid/UserGrid/${item.userId}`}>
                            {/* <button className="w-7 h-7 flex items-center justify-center rounded-full bg-sky-100"> */}
                                {/* Add an icon if necessary */}
                            {/* </button> */}
                        </Link>
                        {role === "admin" && (
                            <button onClick={() => handleEdit(item)} className="w-7 h-7 flex items-center justify-center rounded-full bg-yellow-100">
                                Edit
                            </button>
                        )}
                        {role === "admin" && (
                            <button onClick={() => handleDelete(item)} className="w-7 h-7 flex items-center justify-center rounded-full bg-red-100">
                                Delete
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
            <Grid header= "All User" handleAddClick= {handleAddClick} role= "admin" />
            {/* LIST */}
            <Table columns={userColumns} renderRow={renderRow} data={users} />
            {/* PAGINATION */}
            <Pagination />
        </div>
    );
};

export default UserGrid;
