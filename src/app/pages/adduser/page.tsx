import { Suspense } from 'react';
import AddUserForm from "@/app/component/Form/AddUserForm";
import Dashboard from "@/app/component/Form/Dashboard";
const adduser: React.FC = () => {
    return (        
            <Dashboard>
                 <Suspense fallback={<div>Loading...</div>}>
                <AddUserForm />
                </Suspense>
            </Dashboard>      
    );
};
export default adduser;