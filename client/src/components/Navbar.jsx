import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { RiMenu2Line } from "react-icons/ri";
import { X, ArrowRight, House, UserRound,Phone,Store,NotebookPen } from "lucide-react";
import { AppContext } from '../context/AppContext'
import { FiHeart } from 'react-icons/fi';

const navLinks = [
  {
    id: 1,
    name: 'Home',
    link: '/',
    icon: <House size={20} />
  },
  {
    id: 2,
    name: 'About Us',
    link: '/about',
    icon: <UserRound size={20} />
  },
  {
    id: 3,
    name: 'Collection',
    link: '/shop',
    arrow: true,
    icon: <Store size={20} />
  },
  {
    id: 4,
    name: 'Blogs',
    link: '/blogs',
    icon: <NotebookPen size={20} />
  },
  {
    id: 5,
    name: 'Contact Us',
    link: '/contact',
    icon: <Phone size={20} />
  },
]

const Navbar = () => {
  const { navigate, cartCount, wishlist } = useContext(AppContext)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className='lg:flex hidden bg-black h-[90px] items-center justify-between px-12 border-b border-gray-600/50 z-40 sticky top-0 left-0 text-white'>
        <img onClick={() => { navigate('/'); scrollTo(0, 0) }} className='cursor-pointer' src="/images/logo.webp" alt="logo" />
        <nav className='flex items-center justify-center'>
          {
            navLinks.map((nav, i) => (
              <NavLink key={i} to={nav.link} onClick={() => { scrollTo(0, 0) }} className={`flex gap-1.5 px-3 uppercase max-sm:text-sm text-[14.8px] font-medium hover:text-red-500 transition duration-200 tracking-wider`}>
                <span>{nav.icon}</span>
                {nav.name}
              </NavLink>
            ))
          }
        </nav>
        <div className='flex items-center gap-4'>
          {/* User Login */}
          <span
            onClick={() => { navigate('/login'); scrollTo(0, 0) }}
            className='cursor-pointer'>
            <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="transparent" aria-hidden="true" focusable="false" role="presentation" class="icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </span>
          {/* Search */}
          <span className='cursor-pointer'>
            <svg width="24" height="24" viewBox="-2 -2 34 34" aria-hidden="true" focusable="false" role="presentation" class="icon"><path d="m29.6 27.4-6.7-6.7c1.7-2.1 2.7-4.8 2.7-7.7C25.6 6.1 20 .5 13.1.5S.5 6.1.5 13 6.1 25.5 13 25.5c2.9 0 5.6-1 7.7-2.7l6.7 6.7 2.2-2.1ZM3.5 13c0-5.2 4.3-9.5 9.5-9.5s9.5 4.3 9.5 9.5-4.3 9.5-9.5 9.5-9.5-4.3-9.5-9.5Z" fill="currentColor"></path></svg>
          </span>
          {/* Wishlist */}
          <span
            onClick={() => { navigate('/wishlist'); scrollTo(0, 0) }}
            className='cursor-pointer relative'>
            <FiHeart size={23} />
            {wishlist.length > 0 &&
              <small className='absolute right-[-6px] bottom-[0px] text-black bg-[#E46254] leading-[18px] text-[10px] w-[16px] h-[16px] rounded-full flex items-center justify-center'>{wishlist.length}</small>}
          </span>
          {/* Cart */}
          <span
            onClick={() => { navigate('/cart'); scrollTo(0, 0) }}
            className='cursor-pointer relative'>
            <svg width="24" height="23" viewBox="0 -2 37 35" aria-hidden="true" focusable="false" role="presentation" class="icon"><path d="m.7 11.5 9.3 18h16.9l9.3-18H.7Zm24.3 15H12l-6.7-12h26.4l-6.7 12Zm-6-23c4.2 0 7 3.3 7 5.5h3C29 5 24.7.5 19 .5S9 5 9 9h3c0-2.2 2.8-5.5 7-5.5Z" fill="currentColor"></path></svg>
            {cartCount > 0 &&
              <small className='absolute right-[-6px] bottom-[0px] text-black bg-[#E46254] leading-[18px] text-[10px] w-[16px] h-[16px] rounded-full flex items-center justify-center'>{cartCount}</small>}
          </span>
        </div>
      </header>

      {/* Mobile Navar */}
      <header className='lg:hidden flex bg-black h-[85px] items-center justify-between gap-5 md:px-10 sm:px-8 px-5 border-b border-gray-600/50 z-40 sticky top-0 left-0 text-white'>
        {/* nav_icon */}
        <span onClick={() => { setIsOpen(true) }} className='text-2xl cursor-pointer'>
          <RiMenu2Line />
        </span>
        <img onClick={() => { navigate('/'); scrollTo(0, 0) }} className='cursor-pointer' src="/images/logo.webp" alt="logo" />
        <div
          className={`fixed inset-0 z-50 text-lg bg-black text-white max-w-[500px] transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-8 left-6 cursor-pointer"
          >
            <X size={24} />
          </button>

          {/* Menu Content */}
          <div className="pt-28 px-8">
            <nav className="space-y-5">
              {navLinks.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.link}
                  onClick={() => { scrollTo(0, 0); setIsOpen(false) }}
                  className="flex items-center gap-1.5 tracking-wider hover:opacity-80 uppercase font-medium max-sm:text-sm text-[15px]  hover:text-red-500 transition duration-200"
                >
                  <span>{item.name}</span>

                  {item.arrow && (
                    <ArrowRight
                      size={21}
                      strokeWidth={1.5}
                      className="mt-1"
                    />
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Login */}
            <div className="mt-12">
              <Link
                to={'/login'}
                onClick={() => { scrollTo(0, 0); setIsOpen(false) }}
                className="text-gray-400 hover:text-white transition font-medium"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
        <div className='flex items-center sm:gap-5 gap-4'>
          <span className='cursor-pointer'>
            <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="transparent" aria-hidden="true" focusable="false" role="presentation" class="icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </span>
          <span className='cursor-pointer'>
            <svg width="24" height="24" viewBox="-2 -2 34 34" aria-hidden="true" focusable="false" role="presentation" class="icon"><path d="m29.6 27.4-6.7-6.7c1.7-2.1 2.7-4.8 2.7-7.7C25.6 6.1 20 .5 13.1.5S.5 6.1.5 13 6.1 25.5 13 25.5c2.9 0 5.6-1 7.7-2.7l6.7 6.7 2.2-2.1ZM3.5 13c0-5.2 4.3-9.5 9.5-9.5s9.5 4.3 9.5 9.5-4.3 9.5-9.5 9.5-9.5-4.3-9.5-9.5Z" fill="currentColor"></path></svg>
          </span>
          <span className='cursor-pointer'>
            <svg width="24" height="23" viewBox="0 -2 37 35" aria-hidden="true" focusable="false" role="presentation" class="icon"><path d="m.7 11.5 9.3 18h16.9l9.3-18H.7Zm24.3 15H12l-6.7-12h26.4l-6.7 12Zm-6-23c4.2 0 7 3.3 7 5.5h3C29 5 24.7.5 19 .5S9 5 9 9h3c0-2.2 2.8-5.5 7-5.5Z" fill="currentColor"></path></svg>
          </span>
        </div>
      </header>
      {isOpen && <div className='bg-black/50 fixed top-0 right-0 bottom-0 left-0'></div>}
    </>
  )
}

export default Navbar