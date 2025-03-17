import Dashboard from "@/app/component/Form/Dashboard";
import TableSearch from "@/app/component/TableSearch/TableSearch";
import { FaFilter, FaSort, FaPlus } from 'react-icons/fa';
import Link from "next/link";
import Pagination from "@/app/component/Pagination/Pagination";
import Table from "@/app/component/Table/Table";
import UserGrid from "@/app/component/Grid/UserGrid/UserGrid";


const Userlist = () => {
    return (
        <Dashboard>
            <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
                {/* top */}
                <div className="flex item-center justify-between">
                    <h1 className="hidden md:block text-lg fot-semibold">All Users</h1>
                    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                        <TableSearch />
                        <div className="flex items-center gap-4 self-end">
                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-100">
                                <FaFilter />
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-100">
                                <FaSort />
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-100">
                                <Link href='/pages/adduser'>
                                    <FaPlus />
                                </Link>

                            </button>
                        </div>
                    </div>
                </div>
                {/* list */}
              <UserGrid/>
                {/* pagination */}
                <Pagination />
            </div>
        </Dashboard>
    );
};
export default Userlist;