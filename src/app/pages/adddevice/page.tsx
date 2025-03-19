import { Suspense } from 'react';
import DeviceForm from "@/app/component/Form/DeviceForm";
import Dashboard from "@/app/component/Form/Dashboard";
const adddevice: React.FC = () => {
    return (        
            <Dashboard>
                < DeviceForm/>
            </Dashboard>      
    );
};
export default adddevice;