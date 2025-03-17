"use client"
import Dashboard from "@/app/component/Form/Dashboard";
import DeviceForm from "@/app/component/Form/DeviceForm";
import Pagination from "@/app/component/Pagination/Pagination";
import TableSearch from "@/app/component/TableSearch/TableSearch";
import Link from "next/link";
import { FaFilter, FaPlus, FaSort } from "react-icons/fa";

const Device: React.FC = () => {
    return (
        <Dashboard>
            <DeviceForm />
        </Dashboard>
    );
};
export default Device;