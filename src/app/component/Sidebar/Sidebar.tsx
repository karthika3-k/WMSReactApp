"use client"
import { useState } from "react";
import {FaWarehouse, FaRecycle, FaRulerCombined, FaUserAlt, FaMobileAlt, FaBox, FaTruck, FaTruckLoading, FaStoreAlt, FaAngleUp, FaAngleDown, FaUserPlus } from 'react-icons/fa'
import Link from "next/link";

const Sidebar: React.FC = () => {
    const [isInventoryOpen, setIsInventoryOpen] = useState(false);
    const [isAdminOpen, setIsAdminOpen] = useState(false);
    const [isMasterOpen, setIsMasterOpen] = useState(false);

    const toggleSubMenu = (menu: string) => {
        if (menu === 'inventory') {
            setIsInventoryOpen(!isInventoryOpen);
        } else if (menu === 'admin') {
            setIsAdminOpen(!isAdminOpen);
        } else if (menu === 'master') {
            setIsMasterOpen(!isMasterOpen);
        }
    };

    const menuItems = [
        { name: 'Master', path: '', icon: <FaWarehouse />, hasSubMenu: true },
        { name: 'Admin', path: '', icon: <FaUserAlt />, hasSubMenu: true },
        { name: 'Inventory', path: '', icon: <FaBox />, hasSubMenu: true },
    ];

    const inventorySubMenuItems = [
        { name: 'Inward', path: '', icon: <FaTruck /> },
        { name: 'Outward', path: '', icon: <FaTruckLoading /> },
        { name: 'PO Confirmation Wizard', path: '', icon: <FaStoreAlt /> }
    ];

    const adminSubMenuItems = [
        { name: 'User', path: '/pages/usergrid', icon: <FaUserPlus /> },
    ];

    const masterSubMenuItems = [
        { name: 'Bin Configuration', path: '', icon: <FaRecycle /> },
        { name: 'Bin Master', path: '', icon: <FaRulerCombined /> },
        { name: 'Device', path: '', icon: <FaMobileAlt /> },
    ];

    return (
        <div className="mt-4 text-sm">

            {menuItems.map((item) => (
                <div key={item.name}> {/* Ensure uniqueness of the key */}
                    <div className="relative">
                        {/* Parent link that toggles submenu visibility */}
                        {item.hasSubMenu ? (
                            <div
                                onClick={() => toggleSubMenu(item.name.toLowerCase())}
                                className="block py-2 px-2 rounded flex items-center hover:bg-indigo-700 cursor-pointer"
                            >
                                {item.icon && (
                                    <span className="mr-2">
                                        {item.icon}
                                    </span>
                                )}
                                <span className="hidden lg:flex text-black-400 font-light items-center">
                                    {item.name}
                                    <button className="ml-auto text-lg">
                                        {['Inventory', 'Admin', 'Master'].includes(item.name) && (
                                            item.name === 'Inventory' && isInventoryOpen ||
                                                item.name === 'Admin' && isAdminOpen ||
                                                item.name === 'Master' && isMasterOpen ? (
                                                <FaAngleUp />
                                            ) : (
                                                <FaAngleDown />
                                            )
                                        )}
                                    </button>
                                </span>

                            </div>
                        ) : (
                            // Direct link for items with no submenus
                            <Link
                                href={item.path}
                                className="block py-2 px-4 rounded flex items-center hover:bg-teal-700"
                            >
                                {item.icon && <span className="mr-2">{item.icon}</span>}
                                <span className="hidden lg:flex text-black-400 font-light items-center"> {item.name}</span>
                            </Link>
                        )}
                    </div>

                    {/* Only show submenu if the parent is open */}
                    {item.hasSubMenu && ((item.name === 'Inventory' && isInventoryOpen) || (item.name === 'Admin' && isAdminOpen) || (item.name === 'Master' && isMasterOpen)) &&  (
                        <div className="pl-2 mt-2 transition-all duration-300 transform ease-in-out">
                            <div className="relative">
                                {/* Vertical line with sliding effect */}
                                <div
                                    className={`absolute left-0 top-0 h-full w-1 bg-indigo-600 rounded-tl-full rounded-br-full transition-all duration-300 transform ${isInventoryOpen ? 'translate-x-0' : '-translate-x-full'}`}
                                ></div>
                                <div className="pl-0">
                                    {/* Submenu items */}
                                    {item.name === 'Inventory' && inventorySubMenuItems.map((subItem) => (
                                        <Link
                                            href={subItem.path}
                                            key={subItem.name}
                                            className="block py-2 px-4 text-sm hover:bg-indigo-700 rounded-md flex items-center"
                                        >
                                            <span className="mr-2">{subItem.icon}</span>
                                            <span className="hidden lg:flex text-black-400 font-light items-center"> {subItem.name}</span>
                                        </Link>
                                    ))}
                                    {item.name === 'Admin' && adminSubMenuItems.map((subItem) => (
                                        <Link
                                            href={subItem.path}
                                            key={subItem.name}
                                            className="block py-2 px-4 text-sm hover:bg-indigo-700 rounded-md flex items-center"
                                        >
                                            <span className="mr-2">{subItem.icon}</span>
                                            <span className="hidden lg:flex text-black-400 font-light items-center"> {subItem.name}</span>
                                        </Link>
                                    ))}
                                    {item.name === 'Master' && masterSubMenuItems.map((subItem) => (
                                        <Link
                                            href={subItem.path}
                                            key={subItem.name}
                                            className="block py-2 px-4 text-sm hover:bg-indigo-700 rounded-md flex items-center"
                                        >
                                            <span className="mr-2">{subItem.icon}</span>
                                            <span className="hidden lg:flex text-black-400 font-light items-center"> {subItem.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}

        </div>
    );
};

export default Sidebar;
