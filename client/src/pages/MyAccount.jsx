import React, { useContext, useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBoxOpen,
  FaShoppingBag,
  FaSignOutAlt,
} from "react-icons/fa";
import profile_image from '../../public/images/profile_image.png'
import { AppContext } from "../context/AppContext";
import { useRef } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";

const MyAccount = () => {
  const [recentOrders, setRecentOrders] = useState([])

  const [label, setLabel] = useState("Dashboard");
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState('');
  const [previewImage, setPreviewImage] = useState(profile_image);
  const file = useRef();
  const { token, userId, backendUrl, currency, navigate, wishlist, toggleWishlist, fetchUserOrders, orders, cartCount, logout } = useContext(AppContext);

  const updateUserHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('image', image || '');
      let response = await axios.put(`${backendUrl}/api/user/update/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token}`
        },
        withCredentials: true
      })
      if (response.data) {
        setLabel('Dashboard')
        setLoading(false)
        toast.success(response.data.messege);
        fetchUser();
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error(error.response.data.messege);
    }
  }

  const fetchUserData = async () => {
    if (token && userId) {
      try {
        let response = await axios.get(`${backendUrl}/api/user/user-data/${userId}`, {
          headers: {
            Authorization: `${token}`
          },
          withCredentials: true
        })

        if (response.data) {
          setName(response.data.name)
          setEmail(response.data.email);
          setPhone(response.data.phone);
          setPreviewImage(response.data.image?.url)
          await fetchUserOrders()
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const fetchLatestUserOrders = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/order/latest-user-orders/${userId}`, {
        headers: {
          Authorization: `${token}`
        },
        withCredentials: true
      })
      if (response.data) {
        setRecentOrders(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUserData()
    fetchUserOrders()
    fetchLatestUserOrders()
  }, [userId, token])

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      setImage(file)
      setPreviewImage(fileReader?.result)
    }
  }
  
  return (
    <section className="min-h-screen text-white">

      {/* Hero Section */}
      <div className="relative h-[300px]">
        <img
          src="/images/about-banner.jpg"
          alt="About Us"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
          <h1 className="text-4xl md:text-6xl font-black uppercase italic">
            My Account
          </h1>

          <p className="max-w-3xl text-gray-300 mt-3 sm:mt-4">
            Manage your profile and orders
          </p>
        </div>
      </div>

      <div className="container mx-auto px-5 py-16">

        <div className="grid lg:grid-cols-[350px_1fr] gap-8">

          {/* Sidebar */}
          <div className="bg-[#1A1A1A] border border-white/10 p-8">

            <div className="flex flex-col items-center">

              <img
                src={
                  [previewImage] ||
                  "/images/profile_image.png"
                }
                alt=""
                className="
                  w-30
                  h-30
                  rounded-full
                  object-cover
                  border-4
                  border-white/10
                "
              />

              <h3 className="text-2xl font-bold mt-5">
                {name || "Guest User"}
              </h3>

              <p className="text-gray-400 mt-1">
                Customer Account
              </p>

            </div>

            <div className="mt-10 space-y-4">

              <button
                onClick={() => setLabel("Dashboard")}
                className="
    w-full
    flex
    items-center
    gap-3
    bg-[#222]
    hover:bg-[#2a2a2a]
    p-4
    transition
  "
              >
                <FaUserCircle />
                Dashboard
              </button>

              <button
                onClick={() => { navigate("/orders"); scrollTo(0, 0) }}
                className="
                  w-full
                  flex
                  items-center
                  gap-3
                  bg-[#222]
                  hover:bg-[#2a2a2a]
                  p-4
                  transition
                "
              >
                <FaShoppingBag />
                My Orders
              </button>

              <button
                onClick={() => { navigate("/wishlist"); scrollTo(0, 0) }}
                className="
                  w-full
                  flex
                  items-center
                  gap-3
                  bg-[#222]
                  hover:bg-[#2a2a2a]
                  p-4
                  transition
                "
              >
                <FaBoxOpen />
                Wishlist
              </button>

              <button
                onClick={() => setLabel("Edit Profile")}
                className="
    w-full
    flex
    items-center
    gap-3
    bg-[#222]
    hover:bg-[#2a2a2a]
    p-4
    transition
  "
              >
                <FaUserCircle />
                Edit Profile
              </button>

              <button
                onClick={logout}
                className="
                  w-full
                  flex
                  items-center
                  gap-3
                  bg-red-600
                  hover:bg-red-700
                  p-4
                  transition
                "
              >
                <FaSignOutAlt />
                Logout
              </button>

            </div>

          </div>

          {/* Content */}
          <div className="space-y-8">

            {/* Profile Info */}
            <div>

              {label === "Edit Profile" ? (

                <div className="bg-[#1A1A1A] border border-white/10 p-8">

                  <h3 className="text-2xl font-bold mb-8">
                    Edit Profile
                  </h3>

                  <form
                    onSubmit={updateUserHandler}
                    className="space-y-6"
                  >

                    <div className="flex flex-col items-center">

                      <img
                        src={previewImage}
                        alt=""
                        onClick={() => file.current.click()}
                        className="
              w-30
              h-30
              rounded-full
              object-cover
              border-4
              border-white/10
              cursor-pointer
            "
                      />

                      <input
                        type="file"
                        hidden
                        ref={file}
                        onChange={imageHandler}
                      />

                      <p className="text-gray-400 text-sm mt-3">
                        Click image to change
                      </p>

                    </div>

                    <div className="grid md:grid-cols-2 gap-6">

                      <div>
                        <label className="block mb-2 text-sm text-gray-400">
                          Full Name
                        </label>

                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="
                w-full
                bg-[#222]
                border
                border-white/10
                p-4
                outline-none
              "
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-sm text-gray-400">
                          Email
                        </label>

                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="
                w-full
                bg-[#222]
                border
                border-white/10
                p-4
                outline-none
              "
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-sm text-gray-400">
                          Phone
                        </label>

                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="
                w-full
                bg-[#222]
                border
                border-white/10
                p-4
                outline-none
              "
                        />
                      </div>

                    </div>

                    <button
                      type="submit"
                      className="
            bg-white
            text-black
            px-8
            py-3
            font-bold
            hover:bg-gray-200
            transition
          "
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </button>

                  </form>

                </div>

              ) : (

                <div className="space-y-8">

                  {/* Profile Info */}
                  <div className="bg-[#1A1A1A] border border-white/10 p-8">

                    <h3 className="text-2xl font-bold mb-8">
                      Personal Information
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">

                      <div>
                        <label className="text-gray-400 text-sm">
                          Full Name
                        </label>

                        <div className="mt-2 bg-[#222] p-4 flex items-center gap-3">
                          <FaUser />
                          {name}
                        </div>
                      </div>

                      <div>
                        <label className="text-gray-400 text-sm">
                          Email Address
                        </label>

                        <div className="mt-2 bg-[#222] p-4 flex items-center gap-3">
                          <FaEnvelope />
                          {email}
                        </div>
                      </div>

                      <div>
                        <label className="text-gray-400 text-sm">
                          Phone Number
                        </label>

                        <div className="mt-2 bg-[#222] p-4 flex items-center gap-3">
                          <FaPhone />
                          {phone || "Not Added"}
                        </div>
                      </div>

                    </div>

                  </div>

                  {/* Stats */}
                  <div className="grid md:grid-cols-3 gap-6">

                    <div className="bg-[#1A1A1A] border border-white/10 p-6">
                      <h4 className="text-gray-400 text-sm">
                        Total Orders
                      </h4>

                      <h2 className="text-4xl font-bold mt-3">
                        {orders?.length || 0}
                      </h2>
                    </div>

                    <div className="bg-[#1A1A1A] border border-white/10 p-6">
                      <h4 className="text-gray-400 text-sm">
                        Wishlist Items
                      </h4>

                      <h2 className="text-4xl font-bold mt-3">
                        {wishlist?.length || 0}
                      </h2>
                    </div>

                    <div className="bg-[#1A1A1A] border border-white/10 p-6">
                      <h4 className="text-gray-400 text-sm">
                        Cart Items
                      </h4>

                      <h2 className="text-4xl font-bold mt-3">
                        {cartCount || 0}
                      </h2>
                    </div>

                  </div>

                </div>

              )}

            </div>

            {/* Recent Orders */}
            <div className="bg-[#1A1A1A] border border-white/10 p-8">

              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold">
                  Recent Orders
                </h3>

                <button
                  onClick={() => { navigate("/orders"); scrollTo(0, 0) }}
                  className="text-gray-300 hover:text-white"
                >
                  View All →
                </button>
              </div>

              <div className="space-y-4">

                {recentOrders.map((item) => (
                  <div
                    key={item.id}
                    className="
                      flex
                      items-center
                      justify-between
                      bg-[#222]
                      p-4
                    "
                  >
                    <div>
                      <h5 className="font-semibold">
                        Order #{item.id}
                      </h5>

                      <p className="text-gray-400 text-sm">
                        {item.name}
                      </p>
                    </div>

                    <span className="text-green-500 font-medium text-sm capitalize">
                      {item.order_status.charAt(0).toUpperCase() + item.order_status.slice(1).toLowerCase()}
                    </span>
                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default MyAccount;