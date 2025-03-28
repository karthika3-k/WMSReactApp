import Dashboard from "@/app/component/Form/Dashboard";
import BinMastserGrid from "@/app/component/Grid/BinMasterGrid/BinMasterGrid";
import { Suspense } from "react";

const Devicelist = () => {
    return (
        <Dashboard>
             <Suspense fallback={<div>Loading...</div>}>
            <BinMastserGrid />
            </Suspense>
        </Dashboard>
    );
};
export default Devicelist;