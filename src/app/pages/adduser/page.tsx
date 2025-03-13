import AddUserForm from "@/app/component/Form/AddUserForm";
import Navbar from "@/app/component/Navbar/Navbar";
import Sidebar from "@/app/component/Sidebar/Sidebar";

const adduser: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
            <Navbar />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-10 bg-white">
                    <AddUserForm/>
                </main>
            </div>
        </div>
    );
};
export default adduser;