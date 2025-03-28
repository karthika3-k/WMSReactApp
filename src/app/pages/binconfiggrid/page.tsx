import Dashboard from "@/app/component/Form/Dashboard";
import BinConfigGrid from "@/app/component/Grid/BinConfigGrid/BinConfigGrid";
import { Suspense } from "react";

const Devicelist = () => {
    return (
        <Dashboard>
            <Suspense fallback={<div>Loading...</div>}>
            <BinConfigGrid />
            </Suspense>
        </Dashboard>
    );
};
export default Devicelist;