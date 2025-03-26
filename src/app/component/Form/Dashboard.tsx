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
      <Sidebar/>
    </div>
    <div className='fixed w-full'>
      <Navbar/>
      </div>
    
    <div className='w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] '>
    {/* Fixed Navbar with left padding */}
   
    {/* Add padding to the content below the navbar to avoid overlap */}
    <div className="pt-[70px]"> {/* Adjust this based on the navbar height */}
      {children}
    </div>
    </div>
  </div>  
  );
};

export default Dashboard;
