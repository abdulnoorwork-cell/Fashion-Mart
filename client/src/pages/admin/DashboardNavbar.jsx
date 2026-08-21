import React from 'react'
import toast from 'react-hot-toast';
import { BiLogOut } from "react-icons/bi";
import { IoHomeSharp } from 'react-icons/io5';

const DashboardNavbar = () => {
    const logout = () => {
        localStorage.removeItem('token');
        toast.success('Logout Successfully');

        setTimeout(() => {
            window.location.href = '/admin'
        }, 800);
    };
    return (
        <div className='sticky top-0 z-50 flex items-center justify-between px-6 h-16 bg-white border-b border-gray-200'>
            <div
                onClick={() => {
                    navigate('/admin');
                    window.scrollTo(0, 0);
                }}
                className="flex items-center gap-2 cursor-pointer"
            >
                <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                    <IoHomeSharp />
                </div>

                <div>
                    <h3 className="font-bold text-gray-800 leading-none">
                        Dashboard
                    </h3>
                </div>
            </div>
            <button
                onClick={logout}
                className="
        flex items-center gap-2
        px-4 py-2
        rounded-lg
        border border-gray-200
        text-gray-700
        bg-red-50
        text-red-600
        transition
      "
            >
                <BiLogOut size={18} />
                <span className="hidden sm:block">
                    Logout
                </span>
            </button>
            {/* <div className='flex items-center gap-1.5 cursor-pointer'>
              <span className='sm:text-sm text-xs'>Abdul Hasnat</span>
              <img src={blank_profile} className='w-6 h-6' alt="profile" />
            </div> */}
        </div>
    )
}

export default DashboardNavbar