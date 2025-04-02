"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  FaWarehouse,
  FaRecycle,
  FaRulerCombined,
  FaUserAlt,
  FaMobileAlt,
  FaBox,
  FaTruck,
  FaTruckLoading,
  FaStoreAlt,
  FaAngleUp,
  FaAngleDown,
  FaUserPlus,
} from "react-icons/fa";

type SidebarProps = {
  isSidebarOpen: boolean;
};
const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  type MenuKey = "Inventory" | "Admin" | "Master";
  // Menu items with submenus
  const menuItems = [
    { name: "Master", icon: <FaWarehouse />, hasSubMenu: true },
    { name: "Admin", icon: <FaUserAlt />, hasSubMenu: true },
    { name: "Inventory", icon: <FaBox />, hasSubMenu: true },
  ];

  // Submenu items for each parent
  const inventorySubMenuItems = [
    { name: "Inward", path: "/inward", icon: <FaTruck /> },
    { name: "Outward", path: "/outward", icon: <FaTruckLoading /> },
    { name: "PO Confirmation Wizard", path: "/po-confirmation", icon: <FaStoreAlt /> },
  ];

  const adminSubMenuItems = [
    { name: "User", path: "/pages/usergrid", icon: <FaUserPlus /> },
  ];

  const masterSubMenuItems = [
    { name: "Bin Configuration", path: "/pages/binconfiggrid", icon: <FaRecycle /> },
    { name: "Bin Master", path: "/pages/binmastergrid", icon: <FaRulerCombined /> },
    { name: "Device", path: "/pages/devicegrid", icon: <FaMobileAlt /> },
  ];

  // Toggle states if you want manual toggling (optional)
  const [openMenus, setOpenMenus] = useState<{ [key in MenuKey]: boolean }>({
    Inventory: false,
    Admin: false,
    Master: false,
  });
  

  const isSubMenuOpen = (menuName: MenuKey, subItems: { path: string }[]) => {
    return subItems.some((sub) => pathname.includes(sub.path)) || openMenus[menuName];
  };
  
  const toggleSubMenu = (menuName: MenuKey) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };
  return (
    <div className={`mt-4 text-sm ${isSidebarOpen ? "w-64" : "w-16"} transition-all duration-300`}>
      {menuItems.map((item) => (
        <div key={item.name}>
          <div className="relative">
            {item.hasSubMenu ? (
              <div
                onClick={() => toggleSubMenu(item.name as MenuKey)}
                className="block py-2 px-2 rounded flex items-center hover:bg-[#8c57ff]/20 cursor-pointer"
              >
                <span className="mr-2">{item.icon}</span>
                {isSidebarOpen && (
                  <span className="text-black-400 font-light flex items-center">
                    {item.name}
                    <button className="ml-auto text-lg">
                      {item.name === "Inventory" && isSubMenuOpen("Inventory", inventorySubMenuItems) ? (
                        <FaAngleUp />
                      ) : item.name === "Admin" && isSubMenuOpen("Admin", adminSubMenuItems) ? (
                        <FaAngleUp />
                      ) : item.name === "Master" && isSubMenuOpen("Master", masterSubMenuItems) ? (
                        <FaAngleUp />
                      ) : (
                        <FaAngleDown />
                      )}
                    </button>
                  </span>
                )}
              </div>
            ) : (
              <Link
                href={item.name}
                className="block py-2 px-4 rounded flex items-center hover:bg-[#8c57ff]/20"
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {isSidebarOpen && <span className="text-black-400 font-light">{item.name}</span>}
              </Link>
            )}
          </div>

          {/* Submenus */}
          {item.hasSubMenu &&
            ((item.name === "Inventory" && isSubMenuOpen("Inventory", inventorySubMenuItems)) ||
              (item.name === "Admin" && isSubMenuOpen("Admin", adminSubMenuItems)) ||
              (item.name === "Master" && isSubMenuOpen("Master", masterSubMenuItems))) && (
              <div className="pl-2 mt-2 transition-all duration-300 transform ease-in-out">
                {(item.name === "Inventory" ? inventorySubMenuItems : item.name === "Admin" ? adminSubMenuItems : masterSubMenuItems).map(
                  (subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.path}
                      className={`block py-2 px-4 text-sm hover:bg-[#8c57ff]/20 rounded-md flex items-center ${
                        pathname === subItem.path ? "bg-[#8c57ff]/40" : ""
                      }`}
                    >
                      <span className="mr-2">{subItem.icon}</span>
                      {isSidebarOpen && <span className="text-black-400 font-light">{subItem.name}</span>}
                    </Link>
                  )
                )}
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
