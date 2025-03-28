import Dashboard from "@/app/component/Form/Dashboard";
import DeviceGrid from "@/app/component/Grid/DeviceGrid/DeviceGrid";
import { Suspense } from "react";

const Devicelist = () => {
    return (
        <Dashboard>
             <Suspense fallback={<div>Loading...</div>}>
            <DeviceGrid />
            </Suspense>
        </Dashboard>
    );
};
export default Devicelist;