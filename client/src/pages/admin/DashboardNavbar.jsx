import React from "react";
import toast from "react-hot-toast";
import { BiMenu, BiLogOut, BiSearch, BiBell } from "react-icons/bi";
import { IoGrid } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const DashboardNavbar = ({ setSidebarOpen }) => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");

        toast.success("Logout Successfully");

        setTimeout(() => {
            window.location.href = "/admin";
        }, 800);
    };

    return (
        <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/80 border-b border-gray-200">
            <div className="h-16 px-4 sm:px-6 flex items-center justify-between gap-1">

                {/* Left */}
                <div className="flex items-center gap-3">

                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="
      lg:hidden
      w-10
      h-10
      rounded-xl
      max-sm:text-white
      bg-gray-800
      sm:bg-gray-100
      transition
      flex
      items-center
      justify-center
    "
                    >
                        <BiMenu size={24} />
                    </button>

                    <div
                        onClick={() => {
                            navigate("/admin");
                            window.scrollTo(0, 0);
                        }}
                        className="flex items-center gap-2 sm:gap-3 cursor-pointer"
                    >
                        <div className="w-10 h-10 rounded-xl bg-black text-white hidden sm:flex items-center justify-center shadow-lg">
                            <IoGrid size={20} />
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-900 leading-none">
                                Dashboard
                            </h3>

                            <p className="max-sm:hidden text-xs text-gray-500">
                                Management Panel
                            </p>
                        </div>
                    </div>

                </div>

                {/* Center Search */}
                {/* <div className="hidden lg:flex items-center relative w-full max-w-md mx-8">
                    <BiSearch
                        size={18}
                        className="absolute left-4 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search..."
                        className="
              w-full
              pl-11
              pr-4
              py-2.5
              rounded-xl
              bg-gray-100
              border
              border-gray-200
              outline-none
              focus:border-black
              transition
            "
                    />
                </div> */}

                {/* Right */}
                <div className="flex items-center gap-3">

                    {/* Notification */}

                    {/* <button
                        className="
              relative
              w-11
              h-11
              rounded-xl
              bg-gray-100
              hover:bg-gray-200
              transition
              flex
              items-center
              justify-center
            "
                    >
                        <BiBell size={20} />

                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                    </button> */}

                    {/* Admin Info */}
                    <div className="hidden sm:flex items-center gap-3">
                        <div className="text-right">
                            <h4 className="text-sm font-semibold text-gray-800">
                                Admin
                            </h4>

                            <p className="text-xs text-gray-500">
                                Super Administrator
                            </p>
                        </div>

                        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold">
                            A
                        </div>
                    </div>

                    {/* Logout */}
                    <button
                        onClick={logout}
                        className="
              flex
              items-center
              gap-2
              px-4
              py-2.5
              rounded-xl
              bg-red-50
              text-red-600
              hover:bg-red-100
              transition-all
            "
                    >
                        <BiLogOut size={18} />

                        <span className="hidden md:block">
                            Logout
                        </span>
                    </button>

                </div>
            </div>
        </header>
    );
};

export default DashboardNavbar;