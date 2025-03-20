import { Suspense } from 'react';
import BinConfigForm from "@/app/component/Form/BinConfigForm";
import Dashboard from "@/app/component/Form/Dashboard";
const addbinconfig: React.FC = () => {
    return (        
            <Dashboard>
                 <Suspense fallback={<div>Loading...</div>}>
                <BinConfigForm />
                </Suspense>
            </Dashboard>      
    );
};
export default addbinconfig;