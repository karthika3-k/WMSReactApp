"use client"
import Dashboard from "@/app/component/Form/Dashboard";
import DeviceForm from "@/app/component/Form/DeviceForm";
import { Suspense } from "react";

const Device: React.FC = () => {
    return (
        <Dashboard>
             <Suspense fallback={<div>Loading...</div>}>
            <DeviceForm />
            </Suspense>
        </Dashboard>
    );
};
export default Device;