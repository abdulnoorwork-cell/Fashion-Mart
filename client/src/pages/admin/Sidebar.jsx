import React from 'react'
import { NavLink } from 'react-router-dom'
import toast from 'react-hot-toast';
import { MdFormatListBulleted } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { IoHomeOutline } from "react-icons/io5";
import { BsCartPlus } from "react-icons/bs";
import { BsCartCheck } from "react-icons/bs";
import { RiBox3Line } from "react-icons/ri";
import { TfiWrite } from "react-icons/tfi";
import { CgHeart } from "react-icons/cg";
import { MdOutlineReviews } from "react-icons/md";
import { BiLogOut } from 'react-icons/bi';

const Sidebar = () => {

    return (
        <div className='sticky top-0 h-screen flex flex-col bg-[#111827] text-white pt-6'>
            <div className="px-5 pb-6 border-b border-white/10 md:block hidden">
                <h2 className="text-xl font-bold">
                    Admin Panel
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                    Ecommerce Management
                </p>
            </div>
            <NavLink end={true} to={'/admin'} className={({ isActive }) => `flex items-center gap-2 pl-5 p-3 md:min-w-48 cursor-pointer ${isActive
                ? 'bg-[#3858e9] text-white'
                : 'hover:bg-white/10 text-gray-300'} `}>
                <span className='text-xl'><RxDashboard /></span>
                {/* <img src={home_icon} alt="" className='min-w-4 w-5' /> */}
                <span className='hidden md:inline-block font-medium tracking-wide text-[15px]'>Dashboard</span>
            </NavLink>
            <NavLink end={true} to={'/admin/addproduct'} className={({ isActive }) => `flex items-center gap-2 pl-5 p-3 md:min-w-48 cursor-pointer ${isActive
                ? 'bg-[#3858e9] text-white'
                : 'hover:bg-white/10 text-gray-300'} `}>
                <span className='text-xl'><BsCartPlus /></span>
                {/* <img src={add_icon} alt="" className='min-w-4 w-5' /> */}
                <span className='hidden md:inline-block font-medium tracking-wide text-[15px]'>Add Product</span>
            </NavLink>
            <NavLink end={true} to={'/admin/addblog'} className={({ isActive }) => `flex items-center gap-2 pl-5 p-3 md:min-w-48 cursor-pointer ${isActive
                ? 'bg-[#3858e9] text-white'
                : 'hover:bg-white/10 text-gray-300'} `}>
                <span className='text-xl'><TfiWrite /></span>
                {/* <img src={add_icon} alt="" className='min-w-4 w-5' /> */}
                <span className='hidden md:inline-block font-medium tracking-wide text-[15px]'>Add Blog</span>
            </NavLink>
            <NavLink end={true} to={'/admin/products'} className={({ isActive }) => `flex items-center gap-2 pl-5 p-3 md:min-w-48 cursor-pointer ${isActive
                ? 'bg-[#3858e9] text-white'
                : 'hover:bg-white/10 text-gray-300'} `}>
                <span className='text-xl'><BsCartCheck /></span>
                {/* <img src={list_icon} alt="" className='min-w-4 w-5' /> */}
                <span className='hidden md:inline-block font-medium tracking-wide text-[15px]'>Products List</span>
            </NavLink>
            <NavLink end={true} to={'/admin/wishlist'} className={({ isActive }) => `flex items-center gap-2 pl-5 p-3 md:min-w-48 cursor-pointer ${isActive
                ? 'bg-[#3858e9] text-white'
                : 'hover:bg-white/10 text-gray-300'} `}>
                <span className='text-xl'><CgHeart /></span>
                {/* <img src={list_icon} alt="" className='min-w-4 w-5' /> */}
                <span className='hidden md:inline-block font-medium tracking-wide text-[15px]'>Wishlist</span>
            </NavLink>
            <NavLink end={true} to={'/admin/blogs'} className={({ isActive }) => `flex items-center gap-2 pl-5 p-3 md:min-w-48 cursor-pointer ${isActive
                ? 'bg-[#3858e9] text-white'
                : 'hover:bg-white/10 text-gray-300'} `}>
                <span className='text-xl'><MdFormatListBulleted /></span>
                {/* <img src={list_icon} alt="" className='min-w-4 w-5' /> */}
                <span className='hidden md:inline-block font-medium tracking-wide text-[15px]'>Blog List</span>
            </NavLink>
            <NavLink end={true} to={'/admin/orders'} className={({ isActive }) => `flex items-center gap-2 pl-5 p-3 md:min-w-48 cursor-pointer ${isActive
                ? 'bg-[#3858e9] text-white'
                : 'hover:bg-white/10 text-gray-300'} `}>
                <span className='text-xl'><RiBox3Line /></span>
                {/* <img src={list_icon} alt="" className='min-w-4 w-5' /> */}
                <span className='hidden md:inline-block font-medium tracking-wide text-[15px]'>Order List</span>
            </NavLink>
            <NavLink end={true} to={'/admin/reviews'} className={({ isActive }) => `flex items-center gap-2 pl-5 p-3 md:min-w-48 cursor-pointer ${isActive
                ? 'bg-[#3858e9] text-white'
                : 'hover:bg-white/10 text-gray-300'} `}>
                <span className='text-xl'><MdOutlineReviews /></span>
                {/* <img src={list_icon} alt="" className='min-w-4 w-5' /> */}
                <span className='hidden md:inline-block font-medium tracking-wide text-[15px]'>Reviews</span>
            </NavLink>
        </div>
    )
}

export default Sidebar