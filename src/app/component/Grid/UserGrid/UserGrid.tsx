"use client"
import api from "@/app/services/api";
import { showErrorToast, showSuccessToast } from "@/app/utils/toastConfig";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../../Common/Loader";
import Grid from "../Grid";


interface User {
    userId: number,
    userName: string,
    password: string,
    wareHouse: string,
    role: string,
    deviceId: string,
    isActive: boolean,
}
const UserGrid: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const userColumns = [
        { name: "User Id", field: "userId", visible: true },
        { name: "UserName", field: "userName", visible: true },
        { name: "Password", field: "password", visible: true },
        { name: "WareHouse", field: "wareHouse", visible: true },
        { name: "Role", field: "role", visible: true },
        { name: "Device ID", field: "deviceId", visible: true },
        { name: "IsActive", field: "isActive", visible: true },
        { name: 'Actions', field: 'actions', visible: true },
    ];

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                debugger;
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
        debugger;
        const userParam = JSON.stringify(user);
        debugger;
        router.push(`/pages/adduser?userData=${encodeURIComponent(userParam)}`);
    };

    const handleDelete = async (user: User) => {
        try {
            const values = {
                userId: user.userId,
            };
            var response = await api.post(`/User/DeleteUser?id=${values}`);
            const data = response.data;
            if (response.status === 200) {
                if (response.data.ErrorCode === 200) {
                    showSuccessToast('User Deleted Successfully');
                } else {
                    showErrorToast('User Deleted Failed');
                }
            } else {
                showErrorToast('error');
            }
            debugger
            setUsers(users.filter((u) => u.userId !== user.userId));

        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    if (isLoading) return <Loader />
    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <Grid<User>
                gridKey="UserGrid"
                title="User Management"
                data={users}
                columnConfig={userColumns}
                rowPerPage={7}
                onDelete={handleDelete}
                handleAddClick={handleAddClick}
                addButtonLabel="ADD User"
                handleEditClick={handleEdit}
            />

        </div>


    );
};
export default UserGrid;