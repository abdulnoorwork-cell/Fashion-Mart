import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import DashboardNavbar from "./DashboardNavbar";

const AdminLayout = () => {
  const [sideBarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      
      <div className="flex min-h-screen">
        
        <Sidebar
          sideBarOpen={sideBarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="flex-1 min-w-0">
          
          <DashboardNavbar
            setSidebarOpen={setSidebarOpen}
          />

          <main className="p-4 sm:p-6 2xl:p-8 text-gray-800 max-w-[1800px] mx-auto">
            <Outlet />
          </main>

        </div>

      </div>

    </div>
  );
};

export default AdminLayout;