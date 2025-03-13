import React, { ReactNode } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className='flex h-screen'>
            <Sidebar />
            <div className='flex-1 flex flex-col'>
                <Navbar />
                <main className='flex-1 p-6'>{children}</main>
            </div>
        </div>
    );
};
export default Layout;