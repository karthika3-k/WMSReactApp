import Dashboard from "@/app/component/Form/Dashboard";
import UserGrid from "@/app/component/Grid/UserGrid/UserGrid";
import { Suspense } from "react";

const Userlist = () => {
    return (
        <Dashboard>
             <Suspense fallback={<div>Loading...</div>}>
            <UserGrid />
            </Suspense>
        </Dashboard>
    );
};
export default Userlist;