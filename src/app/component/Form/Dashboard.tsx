"use client";
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';

interface DashboardProps {
  children: React.ReactNode;
}
const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div className='w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4'>
        <Link href='/pages/admin' className='flex items-center justify-center lg:justify-start gap-2'>
          <Image
            src="/Techativelogo.png"
            alt="background image"
            width={130}
            height={100}
          />
        </Link>
        <Sidebar />
      </div>
      <div className='w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA]'>
        <Navbar />
        <div className='overflow-scroll max-h-[calc(100vh-50px)]'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
