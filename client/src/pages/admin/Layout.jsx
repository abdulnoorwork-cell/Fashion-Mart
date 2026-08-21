import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar';
import { AppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { useContext } from 'react';
import { BiLogOut } from "react-icons/bi";
import { IoHomeSharp } from 'react-icons/io5';

const Layout = () => {
  return (
    <div className=''>
      <div className='flex min-h-[96vh] bg-[#f0f0f0]'>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout