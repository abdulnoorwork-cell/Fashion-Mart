import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { AppContext } from '../../context/AppContext'
import parcel_icon from '/images/parcel_icon.svg'
import DashboardNavbar from './DashboardNavbar'

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

    return (
        <div className="flex-1 min-h-screen">
            <DashboardNavbar />
            <div className="p-4 md:p-6 lg:p-8 text-gray-800">
                <div className='flex flex-col w-full'>
                    {orderLoading ? <div className="flex items-center justify-center min-h-[180px] bg-white rounded-bl-xl rounded-br-xl border border-t-0 border-dashed border-gray-300">
                        <img src='/images/loading_animation.svg' alt="loader" className='mx-auto' />
                    </div> : <div className='text-sm'>
                        {adminOrders.length > 0 ?
                            <div className="grid gap-4">
                                {adminOrders?.map((order) => (
                                    <div
                                        key={order.id}
                                        className="
      bg-white
      rounded-2xl
      border
      border-gray-200
      hover:bg-gray-50
      transition-all
      duration-300
      p-6
    "
                                    >
                                        <div className="grid xl:grid-cols-[1.5fr_1.5fr_1fr_1fr] gap-6">

                                            {/* Product */}
                                            <div className="flex gap-4">
                                                <img
                                                    src={
                                                        order.images?.[0]?.url
                                                            ? order.images[0].url
                                                            : parcel_icon
                                                    }
                                                    alt=""
                                                    className="
            w-24
            h-24
            rounded-xl
            object-cover
            border
            border-gray-200
          "
                                                />

                                                <div>
                                                    <h4 className="font-semibold text-lg">
                                                        {order.name}
                                                    </h4>

                                                    <p className="text-sm text-gray-500 mt-1">
                                                        Qty: {order.quantity}
                                                    </p>

                                                    <div className="flex items-center gap-2 mt-3">
                                                        {order.size && (
                                                            <span
                                                                className="
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-medium
                  bg-gray-100
                "
                                                            >
                                                                {order.size}
                                                            </span>
                                                        )}

                                                        {order.color && (
                                                            <span
                                                                className="
                  w-6
                  h-6
                  rounded-full
                  border
                  border-gray-300
                "
                                                                style={{
                                                                    backgroundColor:
                                                                        order.color.toLowerCase(),
                                                                }}
                                                            />
                                                        )}
                                                    </div>

                                                    <p className="font-bold text-lg mt-3">
                                                        {currency}.{" "}
                                                        {order.total_amount?.toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Customer */}
                                            <div>
                                                <h4 className="font-semibold mb-2">
                                                    Customer Details
                                                </h4>

                                                <div className="text-sm text-gray-600 space-y-1">
                                                    <p>
                                                        {order.address.firstName}{" "}
                                                        {order.address.lastName}
                                                    </p>

                                                    <p>{order.address.email}</p>

                                                    <p>{order.address.phone}</p>

                                                    <p>
                                                        {order.address.address},{" "}
                                                        {order.address.city}
                                                    </p>

                                                    <p>{order.address.postal_code}</p>
                                                </div>
                                            </div>

                                            {/* Payment */}
                                            <div>
                                                <h4 className="font-semibold mb-2">
                                                    Payment Info
                                                </h4>

                                                <div className="space-y-2 text-sm">
                                                    <div>
                                                        <span className="text-gray-500">
                                                            Method:
                                                        </span>{" "}
                                                        <span className="font-medium">
                                                            {order.payment_method.charAt(0).toUpperCase() + order.payment_method.slice(1).toLowerCase()}
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <span className="text-gray-500">
                                                            Payment:
                                                        </span>{" "}
                                                        <span
                                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${order.payment_status === "PAID"
                                                                    ? "bg-green-100 text-green-700"
                                                                    : "bg-red-100 text-red-700"
                                                                }`}
                                                        >
                                                            {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1).toLowerCase()}
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <span className="text-gray-500">
                                                            Date:
                                                        </span>{" "}
                                                        {new Date(
                                                            order.created_at
                                                        ).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Status */}
                                            <div>
                                                <div
                                                    className={`
            inline-flex
            px-3
            py-1
            rounded-full
            text-xs
            font-semibold
            mb-4
            ${getStatusColor(order.order_status)}
          `}
                                                >
                                                    {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1).toLowerCase()}
                                                </div>

                                                <select
                                                    value={order.order_status?.trim()}
                                                    onChange={(event) =>
                                                        updateOrderStatus(order.id, event)
                                                    }
                                                    className="
            w-full
            border
            border-gray-300
            rounded-xl
            px-3
            py-3
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
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
                            </div> :
                            <div className="flex items-center justify-center min-h-[180px] bg-white rounded-bl-xl rounded-br-xl border border-t-0 border-dashed border-gray-300">
                                <p className="text-gray-500">
                                    No orders found
                                </p>
                            </div>
                        }
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default AdminOrders