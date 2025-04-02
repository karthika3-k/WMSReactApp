"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import { withAuth } from '@/app/utils/auth';
import { BsPinAngleFill, BsPinFill } from 'react-icons/bs';

let user = null;
let accessToken = null;
if (typeof window !== "undefined") {
  debugger
  user = localStorage.getItem("userName");
  accessToken = localStorage.getItem("authToken");
}
interface DashboardProps {
  children: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(
    () => JSON.parse(localStorage.getItem("isSidebarOpen") || "true")
  );

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("isSidebarOpen", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? "w-[250px]" : "w-[50px]"
          } bg-white transition-all duration-300 flex flex-col items-center p-4`}
      >
        {/* Pin Button & Logo in Same Row */}
        <div className="flex items-center w-full justify-between">
          {isSidebarOpen && (
            <Link href="/pages/admin" className="flex items-center">
              <Image
                src="/Techativelogo.png"
                alt="Techative Logo"
                width={160}
                height={40}
                className="object-cover"
              />
            </Link>
          )}
         <button
            className="p-2 rounded-full hover:bg-gray-200"
            onClick={() => setIsSidebarOpen((prev:boolean) => !prev)}
          >
            {isSidebarOpen ? (
              <BsPinFill className="w-5 h-5 text-gray-600" />
            ) : (
              <BsPinAngleFill className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        
        {/* <div className={`mt-6 flex flex-col space-y-4 w-full ${isSidebarOpen ? "block" : "hidden"}`}> */}
        <Sidebar isSidebarOpen={isSidebarOpen} />
        {/* </div> */}
      </div>

      {/* Main Content */}
      <div
        className={`${isSidebarOpen ? "w-[calc(100%-200px)]" : "w-[calc(100%-50px)]"
          } transition-all duration-300 bg-[#F7F8FA]`}
      >
        <Navbar />
        <div className="overflow-auto max-h-[calc(100vh-50px)] p-4">{children}</div>
      </div>
    </div>
  );

};

export default withAuth(Dashboard);
