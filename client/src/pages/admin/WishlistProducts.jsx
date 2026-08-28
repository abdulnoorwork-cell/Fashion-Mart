import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { FaHeart } from "react-icons/fa";
import toast from 'react-hot-toast';
import { MdDeleteOutline } from 'react-icons/md';
import DashboardNavbar from './DashboardNavbar';

const WishlistProducts = () => {
    const [wishlistLoading, setWishlistLoading] = useState(false)
    const { backendUrl, isAdmin, currency, fetchProducts, wishlistProducts, fetchWishlistProducts } = useContext(AppContext);

    const deleteWishlistProduct = async (productId) => {
        try {
            const response = await axios.delete(`${backendUrl}/api/wishlist/remove-wishlist-product/${productId}`, {
                headers: {
                    Authorization: `${isAdmin}`
                },
                withCredentials: true
            });
            if (response.data.success) {
                toast.success(response.data.messege)
                await fetchWishlistProducts()
                await fetchProducts()
            }
        } catch (error) {
            toast.error(error.response.data.messege);
            console.log(error)
        }
    }

    useEffect(() => {
        fetchWishlistProducts()
    }, [])

    return (
        <div className="flex flex-col w-full">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                        Wishlist Products
                    </h3>

                    <p className="text-gray-500 mt-1">
                        Products most loved by your customers
                    </p>
                </div>

                <div className="bg-red-50 text-red-600 px-5 py-3 rounded-xl font-semibold">
                    Total Wishlist: {wishlistProducts.length}
                </div>
            </div>

            {wishlistLoading ? (
                <div className="flex items-center justify-center min-h-[220px] bg-white rounded-2xl border border-gray-200">
                    <img
                        src="/images/loading_animation.svg"
                        alt="loader"
                        className="w-12 h-12"
                    />
                </div>
            ) : wishlistProducts.length > 0 ? (
                <div className="grid gap-4">

                    {wishlistProducts.slice().reverse().map((w, i) => (

                        <div
                            key={i}
                            className="
            bg-white
            border border-gray-200
            rounded-2xl
            p-4
            hover:shadow-lg
            transition-all
          "
                        >

                            <div className="flex flex-col lg:flex-row gap-5">

                                {/* Product */}
                                <div className="flex items-center gap-3 flex-1 min-w-0">

                                    <img
                                        src={w.images?.[0]?.url}
                                        alt={w.name}
                                        className="
                  w-16 h-16
                  rounded-xl
                  object-cover
                  border border-gray-200
                  bg-gray-100
                  shrink-0
                "
                                    />

                                    <div className="min-w-0">
                                        <h4 className="font-semibold text-gray-900 line-clamp-2">
                                            {w.name}
                                        </h4>

                                        <p className="text-sm text-gray-500 mt-1 lg:hidden">
                                            {w.category}
                                        </p>
                                    </div>

                                </div>

                                {/* Category */}
                                <div className="lg:w-[140px]">
                                    <span
                                        className="
                  inline-flex
                  px-3 py-1
                  rounded-full
                  bg-blue-50
                  text-blue-600
                  text-xs
                  font-semibold
                "
                                    >
                                        {w.category}
                                    </span>
                                </div>

                                {/* Price */}
                                <div className="lg:w-[120px]">
                                    <p className="font-bold text-gray-900">
                                        {currency}. {w.offerPrice}
                                    </p>
                                </div>

                                {/* Wishlist Count */}
                                <div className="lg:w-[120px]">

                                    <div className="flex items-center gap-2">

                                        <span className="text-red-500">
                                            <FaHeart />
                                        </span>

                                        <span className="font-semibold">
                                            {w.total_wishes}
                                        </span>

                                    </div>

                                </div>

                                {/* Action */}
                                <div className="lg:w-[80px]">

                                    <button
                                        onClick={() => deleteWishlistProduct(w.id)}
                                        className="
                  w-full lg:w-10
                  h-10
                  rounded-lg
                  bg-red-50
                  text-red-600
                  flex
                  items-center
                  justify-center
                  hover:bg-red-100
                  transition
                "
                                    >
                                        <MdDeleteOutline size={20} />
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>
            ) : (
                <div className="flex flex-col items-center justify-center min-h-[220px] bg-white rounded-2xl border border-gray-200">

                    <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                        <FaHeart className="text-gray-400" size={24} />
                    </div>

                    <p className="font-semibold text-gray-700">
                        No wishlist products found
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                        Wishlist products will appear here.
                    </p>

                </div>
            )}

        </div>
    )
}

export default WishlistProducts