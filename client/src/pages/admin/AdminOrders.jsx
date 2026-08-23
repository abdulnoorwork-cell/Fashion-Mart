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

    console.log(adminOrders)

    return (
        <div className="flex-1 min-h-screen">
            <DashboardNavbar />
            <div className="p-4 md:p-6 lg:p-8 text-gray-800">
                <div className='flex flex-col w-full'>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Orders</h3>
                    <div className='xl:grid hidden xl:grid-cols-[2fr_2fr_1fr_2fr_1fr] md:grid-cols-[2fr_2fr_1fr] sm:grid-cols-2 gap-2 py-3 px-3 text-xs uppercase font-semibold bg-gray-200 border border-dashed border-gray-300 rounded-tl-xl rounded-tr-xl'>
                        <label>Order</label>
                        <label className='max-sm:hidden'>Delivery</label>
                        <label className=''>Amount</label>
                        <label className='max-xl:hidden'>Payment</label>
                        <label className='mx-auto'>Status</label>
                    </div>
                    {orderLoading ? <div className="flex items-center justify-center min-h-[180px] bg-white rounded-bl-xl rounded-br-xl border border-t-0 border-dashed border-gray-300">
                        <img src='/images/loading_animation.svg' alt="loader" className='mx-auto' />
                    </div> : <div className='text-sm'>
                        {adminOrders.length > 0 ?
                            <div className='overflow-hidden bg-white rounded-bl-xl rounded-br-xl border border-t-0 border-dashed border-gray-300'>
                                {adminOrders?.map((order, index) => (
                                    <div key={index} className="border-b
            border-gray-200
            hover:bg-gray-50
            transition-all
            duration-200
            p-4
            grid xl:grid-cols-[2fr_2fr_1fr_2fr_1fr] md:grid-cols-[2fr_2fr_1fr] sm:grid-cols-2 items-center gap-3">
                                        <div className="order_image_parent flex gap-2">
                                            <img className="w-14 h-14 rounded-sm object-cover border border-gray-200 bg-gray-200" src={order.images[0].url ? order.images[0].url : parcel_icon} alt="product_image" />
                                            <div className="flex flex-col justify-center">
                                                <h6 className="font-medium text-sm sm:text-base">
                                                    {order?.name} <span className={`text-blue-600`}>x{order?.quantity}</span>
                                                </h6>
                                                <div className='flex flex-col leading-none gap-1 mt-1'>
                                                    <h6>{order.size && "Size:"} {order.size && order.size}</h6>
                                                    <h6>{order.color && "Color:"} {order.color && order.color}</h6>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h6 className='font-medium mb-1'>{order.address.firstName} {order.address.lastName}</h6>
                                            <p className='text-xs text-gray-600'>{order.address.address}, {order.address.city}, {order.address.postal_code}</p>
                                            <p className='text-xs text-gray-600'>{order.address.email}</p>
                                            <p className='text-xs text-gray-600'>{order.address.phone}</p>
                                        </div>

                                        <h6 className="font-medium">{currency}. {(order?.total_amount).toLocaleString()}</h6>

                                        <div className="flex flex-col text-xs font-medium">
                                            <h6>Method: {order.payment_method.charAt(0).toUpperCase() + order.payment_method.slice(1).toLowerCase()}</h6>
                                            <h6>Date: {new Date(order.created_at).toDateString()}</h6>
                                            <h6>Payment: {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1).toLowerCase()}</h6>
                                        </div>
                                        <select value={order.order_status?.trim()} onChange={(event) => updateOrderStatus(order.id, event)} className='p-2 font-medium border border-gray-600 focus:border-blue-600 w-fit rounded-sm'>
                                            <option value="PLACED">Order Placed</option>
                                            <option value="PACKING">Packing</option>
                                            <option value="SHIPPED">Shipped</option>
                                            <option value="OUT FOR DELIVERY">Out for delivery</option>
                                            <option value="DELIVERED">Delivered</option>
                                        </select>
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