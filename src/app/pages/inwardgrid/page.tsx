import Dashboard from "@/app/component/Form/Dashboard";
import InwardGrid from "@/app/component/Grid/InwardGrid/InwardGrid";
import { Suspense } from "react";

const Inwardlist = () => {
    return (
        <Dashboard>
             <Suspense fallback={<div>Loading...</div>}>
            <InwardGrid />
            </Suspense>
        </Dashboard>
    );
};
export default Inwardlist;