import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { AppContext } from '../../context/AppContext'
import {
    Box,
    Clock3,
} from "lucide-react";

const AdminOrders = () => {
    const { currency, backendUrl, isAdmin, fetchUserOrders, orderLoading, setOrderLoading, fetchAdminOrders, adminOrders } = useContext(AppContext);

    const updateOrderStatus = async (order_id, event) => {
        try {

            let response = await axios.put(`${backendUrl}/api/order/update-order/${order_id}`, { order_status: event.target.value }, {
                headers: {
                    Authorization: `${isAdmin}`
                },
                withCredentials: true
            });
            if (response.data.success) {
                console.log(response.data)
                await fetchAdminOrders()
                await fetchUserOrders()
                toast.success(response.data.messege);
            } else {
                toast.error(response.data.messege)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAdminOrders()
        fetchUserOrders()
    }, [])

    const getStatusColor = (status) => {
        switch (status) {
            case "PLACED":
                return "bg-gray-100 text-gray-700";
            case "PACKING":
                return "bg-yellow-100 text-yellow-700";
            case "SHIPPED":
                return "bg-blue-100 text-blue-700";
            case "OUT FOR DELIVERY":
                return "bg-orange-100 text-orange-700";
            case "DELIVERED":
                return "bg-green-100 text-green-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const formatStatus = (status) => {
        if (!status) return "Unknown";

        return status
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    /* =========================================================
     FORMAT PRICE
  ========================================================= */

    const formatPrice = (price) => {
        if (price === undefined || price === null) return "0";

        return Number(price).toLocaleString();
    };

    return (
        <div>
            <div className='flex flex-col w-full'>
                {orderLoading ? (
                    <div className="bg-white border border-gray-200 rounded-2xl min-h-[240px] flex items-center justify-center">
                        <img
                            src="/images/loading_animation.svg"
                            alt="Loading"
                            className="w-12 h-12"
                        />
                    </div>
                ) : adminOrders.length > 0 ? (
                    <div className="grid gap-5">

                        {adminOrders.map((order) => (
                            <div
                                key={order?.id}
                                className="
                    bg-white
                    border border-gray-200
                    rounded-2xl
                    p-5 sm:p-6
                    
                    hover:shadow-xl
                    transition
                  "
                            >

                                <div className="grid xl:grid-cols-[1.5fr_1.3fr_1fr_1fr] gap-7">

                                    {/* PRODUCT */}

                                    <div className="flex gap-4">
                                        <img
                                            src={
                                                order?.images?.[0]?.url ||
                                                "/images/placeholder.png"
                                            }
                                            alt={order?.name}
                                            className="
                          w-20 h-20 sm:w-24 sm:h-24
                          rounded-xl
                          object-cover
                          border border-gray-200
                          bg-gray-100
                          shrink-0
                        "
                                        />

                                        <div className="min-w-0">
                                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
                                                Product
                                            </p>

                                            <h3 className="font-bold text-gray-900 line-clamp-2">
                                                {order?.name}
                                            </h3>

                                            <p className="text-sm text-gray-500 mt-1">
                                                Quantity: {order?.quantity}
                                            </p>

                                            <div className="flex flex-wrap items-center gap-2 mt-3">

                                                {order?.size && (
                                                    <span className="px-2.5 py-1 bg-gray-100 border border-gray-200 rounded-lg text-xs font-medium text-gray-600">
                                                        Size: {order.size}
                                                    </span>
                                                )}

                                                {order?.color && (
                                                    <span className="flex items-center gap-2 px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-600">
                                                        <span
                                                            className="w-3.5 h-3.5 rounded-full border border-gray-300"
                                                            style={{
                                                                backgroundColor:
                                                                    order.color.toLowerCase(),
                                                            }}
                                                        />

                                                        {order.color}
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-lg font-bold text-gray-900 mt-3">
                                                {currency} {formatPrice(order?.total_amount)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* CUSTOMER */}

                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
                                            Customer
                                        </p>

                                        <div className="space-y-1.5 text-sm text-gray-600">
                                            <p className="font-semibold text-gray-800">
                                                {order?.address?.firstName}{" "}
                                                {order?.address?.lastName}
                                            </p>

                                            <p className="break-all">
                                                {order?.address?.email}
                                            </p>

                                            <p>{order?.address?.phone}</p>

                                            <p>
                                                {order?.address?.address},{" "}
                                                {order?.address?.city}
                                            </p>

                                            <p>{order?.address?.postal_code}</p>
                                        </div>
                                    </div>

                                    {/* PAYMENT */}

                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
                                            Payment
                                        </p>

                                        <div className="space-y-3 text-sm">

                                            <div>
                                                <span className="text-gray-400">
                                                    Method
                                                </span>

                                                <p className="font-semibold text-gray-800 mt-0.5">
                                                    {order?.payment_method
                                                        ? order.payment_method
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                        order.payment_method
                                                            .slice(1)
                                                            .toLowerCase()
                                                        : "N/A"}
                                                </p>
                                            </div>

                                            <div>
                                                <span className="text-gray-400">
                                                    Payment Status
                                                </span>

                                                <p className="mt-1">
                                                    <span
                                                        className={`
                                inline-flex
                                px-2.5 py-1
                                rounded-full
                                text-xs
                                font-semibold
                                ${order?.payment_status === "PAID"
                                                                ? "bg-emerald-50 text-emerald-700"
                                                                : "bg-red-50 text-red-600"
                                                            }
                              `}
                                                    >
                                                        {order?.payment_status || "PENDING"}
                                                    </span>
                                                </p>
                                            </div>

                                            <div>
                                                <span className="text-gray-400">
                                                    Order Date
                                                </span>

                                                <p className="font-medium text-gray-700 mt-0.5 flex items-center gap-1.5">
                                                    <Clock3 size={14} />

                                                    {order?.created_at
                                                        ? new Date(
                                                            order.created_at
                                                        ).toLocaleDateString()
                                                        : "—"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* STATUS */}

                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
                                            Order Status
                                        </p>

                                        <span
                                            className={`
                          inline-flex
                          px-3 py-1.5
                          rounded-full
                          border
                          text-xs
                          font-bold
                          mb-4
                          ${getStatusColor(order?.order_status)}
                        `}
                                        >
                                            {formatStatus(order?.order_status)}
                                        </span>

                                        <select
                                            value={order?.order_status?.trim() || "PLACED"}
                                            onChange={(event) =>
                                                updateOrderStatus(order?.id, event)
                                            }
                                            className="
                          w-full
                          border border-gray-200
                          bg-gray-50
                          rounded-xl
                          px-3 py-3
                          text-sm
                          font-medium
                          text-gray-700
                          outline-none
                          focus:bg-white
                          focus:border-blue-500
                          focus:ring-4
                          focus:ring-blue-50
                          transition
                        "
                                        >
                                            <option value="PLACED">
                                                Order Placed
                                            </option>

                                            <option value="PACKING">
                                                Packing
                                            </option>

                                            <option value="SHIPPED">
                                                Shipped
                                            </option>

                                            <option value="OUT FOR DELIVERY">
                                                Out For Delivery
                                            </option>

                                            <option value="DELIVERED">
                                                Delivered
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white border border-gray-200 rounded-2xl min-h-[240px] flex flex-col items-center justify-center text-center">
                        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                            <Box size={25} className="text-gray-400" />
                        </div>

                        <p className="font-semibold text-gray-700">
                            No orders found
                        </p>

                        <p className="text-sm text-gray-400 mt-1">
                            New orders will appear here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminOrders