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
        <div className='flex-1 min-h-screen'>
            <DashboardNavbar />
            <div className='p-4 md:p-6 lg:p-8 text-gray-800'>
                <div className='flex flex-col w-full'>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Wishlist</h3>
                    <div className='admin_products_label grid sm:grid-cols-[3fr_1fr_1fr_1fr_1fr] grid-cols-[3fr_1fr_1fr] items-center gap-2 sm:py-3 py-2 px-3 text-xs uppercase font-semibold bg-gray-200 border border-dashed border-gray-300 rounded-tl-xl rounded-tr-xl'>
                        <label>Product</label>
                        <label className='mx-auto hidden sm:block'>Category</label>
                        <label className='mx-auto hidden sm:block'>Price</label>
                        <label className='mx-auto hidden sm:block'>Wishlist</label>
                        <label className='mx-auto hidden sm:block'>Action</label>
                    </div>
                    {wishlistLoading ? <div className="flex items-center justify-center min-h-[180px] bg-white rounded-bl-xl rounded-br-xl border border-t-0 border-dashed border-gray-300">
                        <img src='/images/loading_animation.svg' alt="loader" className='mx-auto' />
                    </div> :
                        <div className='text-sm'>
                            {wishlistProducts.length > 0 ?
                                <div className='overflow-hidden bg-white rounded-bl-xl rounded-br-xl border border-t-0 border-dashed border-gray-300'>
                                    {wishlistProducts?.reverse().map((w, i) => (
                                        <div key={i} className='border-b
            border-gray-200
            hover:bg-gray-50
            transition-all
            duration-200
            p-4
            grid sm:grid-cols-[3fr_1fr_1fr_1fr_1fr] grid-cols-1 gap-3 items-center'>
                                            <div className='main_img flex items-center sm:gap-4 gap-3'>
                                                <img className='w-14 h-14 rounded-sm object-cover border border-gray-200 bg-gray-200' src={w.images[0].url} alt="" />
                                                <div className='flex flex-col'>
                                                    <h6 className='leading-[1.3em] font-medium'>{w?.name}</h6>
                                                </div>
                                            </div>
                                            <h6 className='sm:mx-auto sm:text-center px-3
              py-1
              text-xs
              bg-blue-50
              text-blue-600
              rounded-full
              font-medium
              w-fit'>{w?.category}</h6>
                                            <h6 className='sm:mx-auto sm:text-center font-medium leading-[1.4em]'>{currency}.{w?.offerPrice}</h6>
                                            <h6 className='sm:mx-auto sm:text-center leading-[1.4em] font-medium flex items-center gap-1'><span className='text-red-500 text-[15px]'><FaHeart /></span> {w?.total_wishes < 10 ? "0" + w?.total_wishes : 1}</h6>
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={() => deleteWishlistProduct(w?.id)}
                                                    className="
                                                              h-8
                                                              w-8
                                                              rounded
                                                              bg-red-50
                                                              text-red-600
                                                              flex
                                                              items-center
                                                              justify-center
                                                              hover:bg-red-100
                                                              transition
                                                      "
                                                >
                                                    <MdDeleteOutline size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div> :
                                <div className="flex items-center justify-center min-h-[180px] bg-white rounded-bl-xl rounded-br-xl border border-t-0 border-dashed border-gray-300">
                                    <p className="text-gray-500">
                                        No products found
                                    </p>
                                </div>
                            }
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default WishlistProducts