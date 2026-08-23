import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { RiMenu2Line } from "react-icons/ri";
import { X, ArrowRight, House, UserRound, Phone, Store, NotebookPen } from "lucide-react";
import { AppContext } from '../context/AppContext'
import { FiHeart } from 'react-icons/fi';

const navLinks = [
  {
    id: 1,
    name: 'Home',
    link: '/',
    icon: <House size={18} />
  },
  {
    id: 2,
    name: 'About Us',
    link: '/about',
    icon: <UserRound size={18} />
  },
  {
    id: 3,
    name: 'Collection',
    link: '/shop',
    arrow: true,
    icon: <Store size={18} />
  },
  {
    id: 4,
    name: 'Blogs',
    link: '/blogs',
    icon: <NotebookPen size={18} />
  },
  {
    id: 5,
    name: 'Contact Us',
    link: '/contact',
    icon: <Phone size={18} />
  },
]

const Navbar = () => {
  const {
    navigate,
    cartCount,
    wishlist,
    token,
    products,
    blogs,
  } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false)

  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const searchHandler = (value) => {
    setSearch(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    const query = value.toLowerCase();

    const productResults = products
      ?.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      )
      .map((item) => ({
        ...item,
        type: "product",
      }));

    const blogResults = blogs
      ?.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      )
      .map((item) => ({
        ...item,
        type: "blog",
      }));

    setResults([...productResults, ...blogResults]);
  };

  return (
    <>
      <header className='lg:flex hidden bg-black h-[90px] items-center justify-between px-12 border-b border-gray-600/50 z-40 sticky top-0 left-0 text-white'>
        <img onClick={() => { navigate('/'); scrollTo(0, 0) }} className='cursor-pointer' src="/images/logo.webp" alt="logo" />
        <nav className='flex items-center justify-center'>
          {
            navLinks.map((nav, i) => (
              <NavLink key={i} to={nav.link} onClick={() => { scrollTo(0, 0) }} className={`flex gap-1.5 px-3 uppercase text-sm font-medium hover:text-red-500 transition duration-200 tracking-wider`}>
                <span>{nav.icon}</span>
                {nav.name}
              </NavLink>
            ))
          }
        </nav>
        <div className='flex items-center gap-3.5'>
          {/* User */}
          {token ? <span
            onClick={() => { navigate('/my-account'); scrollTo(0, 0) }}
            className='cursor-pointer'>
            <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="transparent" aria-hidden="true" focusable="false" role="presentation" class="icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </span> : <span
            onClick={() => { navigate('/login'); scrollTo(0, 0) }}
            className='cursor-pointer'>
            <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="transparent" aria-hidden="true" focusable="false" role="presentation" class="icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </span>}
          {/* Search */}
          <span
          onClick={() => setSearchOpen(true)}
          className='cursor-pointer'>
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
      <header className='lg:hidden flex bg-black h-[85px] items-center justify-between gap-5 md:px-10 sm:px-8 px-5 border-b border-gray-600/50 sticky top-0 left-0 text-white z-30'>
        {/* nav_icon */}
        <span onClick={() => { setIsOpen(true) }} className='sm:text-2xl text-[23px] cursor-pointer'>
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
            <X size={22} />
          </button>

          {/* Menu Content */}
          <div className="pt-28 px-8">
            <nav className="space-y-5">
              {navLinks.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.link}
                  onClick={() => { scrollTo(0, 0); setIsOpen(false) }}
                  className="flex items-center gap-2 tracking-wider hover:opacity-80 uppercase font-medium text-sm  hover:text-red-500 transition duration-200"
                >
                  <span>{item.icon}</span>
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
            <div className="mt-12 text-[17px]">
              {token ? <NavLink
                to={'/my-account'}
                onClick={() => { scrollTo(0, 0); setIsOpen(false) }}
                className="text-gray-400 hover:text-white transition font-medium flex gap-1.5"
              >
                <svg width="21" height="21" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="transparent" aria-hidden="true" focusable="false" role="presentation" class="icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> My Account
              </NavLink> : <NavLink
                to={'/login'}
                onClick={() => { scrollTo(0, 0); setIsOpen(false) }}
                className="text-gray-400 hover:text-white transition font-medium"
              >
                Log in
              </NavLink>}
            </div>
          </div>
        </div>
        {isOpen && <div
          className="fixed inset-0 bg-black/70 z-40"
        />}
        <div className='mobile_nav_icons flex items-center sm:gap-3.5 gap-3'>
          {/* User */}
          {token ? <span
            onClick={() => { navigate('/my-account'); scrollTo(0, 0) }}
            className='user cursor-pointer'>
            <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="transparent" aria-hidden="true" focusable="false" role="presentation" class="icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </span> : <span
            onClick={() => { navigate('/login'); scrollTo(0, 0) }}
            className='user cursor-pointer'>
            <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="transparent" aria-hidden="true" focusable="false" role="presentation" class="icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </span>}
          {/* Search */}
          <span
          onClick={() => setSearchOpen(true)}
          className='cursor-pointer'>
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
      {searchOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/80 z-[999]"
            onClick={() => {
              setSearchOpen(false);
              setSearch("");
              setResults([]);
            }}
          />

          <div className="fixed top-0 left-0 w-full z-[1000] bg-black border-b border-gray-600/50">

            <div className="max-w-4xl mx-auto p-6">

              <div className="flex items-center gap-4">

                <input
                  autoFocus
                  value={search}
                  onChange={(e) => searchHandler(e.target.value)}
                  placeholder="Search products & blogs..."
                  className="
              flex-1
              bg-[#1A1A1A]
              text-white
              border
              border-gray-600/50
              px-5
              sm:py-4
              py-3
              outline-none
            "
                />

                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setSearch("");
                    setResults([]);
                  }}
                  className="text-white"
                >
                  <X size={24} />
                </button>

              </div>

              {search.length > 0 && (
                <div className="mt-4 max-h-[500px] overflow-y-auto bg-[#111]">

                  {results.length > 0 ? (
                    results.map((item) => (
                      <div
                        key={`${item.type}-${item.id}`}
                        onClick={() => {
                          if (item.type === "product") {
                            navigate(
                              `/collection/${item.category.toLowerCase()}/${item.name.toLowerCase()}/${item.id}`
                            );
                          } else {
                            navigate(`/blogs/${item.category}/${item?.id}`);
                            scrollTo(0,0)
                          }

                          setSearchOpen(false);
                          setSearch("");
                          setResults([]);
                          scrollTo(0, 0);
                        }}
                        className="
                    flex
                    items-center
                    gap-4
                    p-4
                    border-b
                    border-gray-800
                    cursor-pointer
                    hover:bg-[#1A1A1A]
                  "
                      >
                        <img
                          src={
                            item.type === "product"
                              ? item.images?.[0]?.url
                              : item.image?.url
                          }
                          alt=""
                          className="w-14 h-14 object-cover"
                        />

                        <div>

                          <h4 className="text-white font-medium">
                            {item.name || item.title}
                          </h4>

                          <p className="text-xs text-gray-400 uppercase">
                            {item.type}
                          </p>

                        </div>

                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-gray-400">
                      No results found
                    </div>
                  )}

                </div>
              )}

            </div>

          </div>
        </>
      )}
    </>
  )
}

export default Navbar