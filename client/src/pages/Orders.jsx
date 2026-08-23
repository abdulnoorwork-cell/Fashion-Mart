import React, { useContext, useEffect } from "react";
import {
    FaBox,
    FaTruck,
    FaCheckCircle,
    FaClock,
} from "react-icons/fa";
import { AppContext } from "../context/AppContext";

const Orders = () => {
    const { orders, fetchUserOrders, currency } =
        useContext(AppContext);

    useEffect(() => {
        fetchUserOrders();
    }, []);

    const statusColor = (status) => {
        switch (status) {
            case "PACKING":
                return "bg-yellow-500/20 text-yellow-400";

            case "SHIPPED":
                return "bg-blue-500/20 text-blue-400";

            case "OUT FOR DELIVERY":
                return "bg-orange-500/20 text-orange-400";

            case "DELIVERED":
                return "bg-green-500/20 text-green-400";

            default:
                return "bg-gray-500/20 text-gray-400";
        }
    };

    return (
        <section className="min-h-screen text-white">

            {/* Hero */}
            <div className="relative h-[300px]">

                <img
                    src="/images/about-banner.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/70"></div>

                <div className="absolute inset-0 flex flex-col items-center justify-center">

                    <h1 className="text-5xl md:text-6xl font-black uppercase italic">
                        My Orders
                    </h1>

                    <p className="text-gray-300 mt-4">
                        Track and manage your orders
                    </p>

                </div>
            </div>

            <div className="container mx-auto px-5 py-16">

                {/* Stats */}
                <div className="grid md:grid-cols-4 gap-6 mb-10">

                    <div className="bg-[#1A1A1A] p-6 border border-white/10">
                        <FaBox size={28} />
                        <h3 className="text-3xl font-bold mt-3">
                            {orders.length}
                        </h3>
                        <p className="text-gray-400 mt-1">
                            Total Orders
                        </p>
                    </div>

                    <div className="bg-[#1A1A1A] p-6 border border-white/10">
                        <FaClock size={28} />
                        <h3 className="text-3xl font-bold mt-3">
                            {
                                orders.filter(
                                    (item) =>
                                        item.order_status === "PACKING"
                                ).length
                            }
                        </h3>
                        <p className="text-gray-400 mt-1">
                            Processing
                        </p>
                    </div>

                    <div className="bg-[#1A1A1A] p-6 border border-white/10">
                        <FaTruck size={28} />
                        <h3 className="text-3xl font-bold mt-3">
                            {
                                orders.filter(
                                    (item) =>
                                        item.order_status ===
                                        "OUT FOR DELIVERY"
                                ).length
                            }
                        </h3>
                        <p className="text-gray-400 mt-1">
                            Shipping
                        </p>
                    </div>

                    <div className="bg-[#1A1A1A] p-6 border border-white/10">
                        <FaCheckCircle size={28} />
                        <h3 className="text-3xl font-bold mt-3">
                            {
                                orders.filter(
                                    (item) =>
                                        item.order_status ===
                                        "DELIVERED"
                                ).length
                            }
                        </h3>
                        <p className="text-gray-400 mt-1">
                            Delivered
                        </p>
                    </div>

                </div>

                {/* Orders */}
                {orders.length === 0 ? (
                    <div className="bg-[#1A1A1A] border border-white/10 p-16 text-center">

                        <h3 className="text-3xl font-bold">
                            No Orders Found
                        </h3>

                        <p className="text-gray-400 mt-3">
                            You haven't placed any orders yet.
                        </p>

                    </div>
                ) : (
                    <div className="space-y-6">

                        {orders.map((order, index) => (
                            <div
                                key={index}
                                className="
                  bg-[#1A1A1A]
                  border
                  border-white/10
                  p-6
                "
                            >
                                <div className="flex flex-wrap justify-between gap-4">

                                    {/* Left */}
                                    <div className="flex gap-4">

                                        <img
                                            src={order.images?.[0]?.url}
                                            alt=""
                                            className="
                        w-24
                        h-24
                        object-cover
                        border
                        border-white/10
                      "
                                        />

                                        <div>

                                            <h3 className="font-bold text-lg">
                                                {order.name}
                                            </h3>

                                            <p className="text-gray-400 mt-1">
                                                Qty: {order.quantity}
                                            </p>

                                            <p className="text-gray-400">
                                                Order ID: #{order._id}
                                            </p>

                                            <p className="text-gray-400">
                                                {new Date(
                                                    order.created_at
                                                ).toDateString()}
                                            </p>

                                        </div>

                                    </div>

                                    {/* Right */}
                                    <div className="text-right">

                                        <h6 className="text-xl font-semibold">
                                            {currency}. {order.price?.toLocaleString()}
                                        </h6>

                                        <span
                                            className={`
                        inline-block
                        mt-3
                        px-4
                        py-2
                        text-sm
                        font-medium
                        ${statusColor(
                                                order.order_status
                                            )}
                      `}
                                        >
                                            {order.order_status?.charAt(0).toUpperCase() + order.order_status.slice(1).toLowerCase()}
                                        </span>

                                    </div>

                                </div>

                                {/* Address */}
                                <div className="border-t border-white/10 mt-5 pt-5">

                                    <h4 className="font-semibold mb-2">
                                        Shipping Address
                                    </h4>

                                    <p className="text-gray-400">
                                        {
                                            order.address.firstName
                                        }{" "}
                                        {
                                            order.address.lastName
                                        }
                                    </p>

                                    <p className="text-gray-400">
                                        {
                                            order.address.address
                                        }
                                    </p>

                                    <p className="text-gray-400">
                                        {
                                            order.address.city
                                        }{" "}
                                        -
                                        {
                                            order.address.postal_code
                                        }
                                    </p>

                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </section>
    );
};

export default Orders;