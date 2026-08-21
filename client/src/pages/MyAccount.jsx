import React, { useContext } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBoxOpen,
  FaShoppingBag,
  FaSignOutAlt,
} from "react-icons/fa";
import { AppContext } from "../context/AppContext";

const MyAccount = () => {
  const { user, navigate } = useContext(AppContext);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <section className="bg-[#111111] min-h-screen text-white">

      {/* Hero */}
      <div className="relative h-[300px]">
        <img
          src="/images/slide-img-5.jpg"
          alt=""
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-black uppercase italic">
              My Account
            </h1>

            <p className="text-gray-300 mt-3">
              Manage your profile and orders
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">

        <div className="grid lg:grid-cols-[350px_1fr] gap-8">

          {/* Sidebar */}
          <div className="bg-[#1A1A1A] border border-white/10 p-8">

            <div className="flex flex-col items-center">

              <img
                src={
                  user?.profile_image?.url ||
                  "/images/profile_image.png"
                }
                alt=""
                className="
                  w-32
                  h-32
                  rounded-full
                  object-cover
                  border-4
                  border-white/10
                "
              />

              <h3 className="text-2xl font-bold mt-5">
                {user?.name || "Guest User"}
              </h3>

              <p className="text-gray-400 mt-1">
                Customer Account
              </p>

            </div>

            <div className="mt-10 space-y-4">

              <button
                onClick={() => navigate("/orders")}
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
                onClick={() => navigate("/wishlist")}
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
                onClick={logoutHandler}
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
                    {user?.name}
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 text-sm">
                    Email Address
                  </label>

                  <div className="mt-2 bg-[#222] p-4 flex items-center gap-3">
                    <FaEnvelope />
                    {user?.email}
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 text-sm">
                    Phone Number
                  </label>

                  <div className="mt-2 bg-[#222] p-4 flex items-center gap-3">
                    <FaPhone />
                    {user?.phone || "Not Added"}
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
                  12
                </h2>
              </div>

              <div className="bg-[#1A1A1A] border border-white/10 p-6">
                <h4 className="text-gray-400 text-sm">
                  Wishlist Items
                </h4>

                <h2 className="text-4xl font-bold mt-3">
                  8
                </h2>
              </div>

              <div className="bg-[#1A1A1A] border border-white/10 p-6">
                <h4 className="text-gray-400 text-sm">
                  Cart Items
                </h4>

                <h2 className="text-4xl font-bold mt-3">
                  4
                </h2>
              </div>

            </div>

            {/* Recent Orders */}
            <div className="bg-[#1A1A1A] border border-white/10 p-8">

              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold">
                  Recent Orders
                </h3>

                <button
                  onClick={() => navigate("/orders")}
                  className="text-gray-300 hover:text-white"
                >
                  View All →
                </button>
              </div>

              <div className="space-y-4">

                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
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
                        Order #ODR00{item}
                      </h5>

                      <p className="text-gray-400 text-sm">
                        2 Products
                      </p>
                    </div>

                    <div className="text-green-500 font-medium">
                      Delivered
                    </div>
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