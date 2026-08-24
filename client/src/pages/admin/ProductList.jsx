import React, { useEffect } from 'react'
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import cross_icon from '/images/cross_icon.svg'
import { useContext } from 'react';
import { BsCartCheck } from 'react-icons/bs';
import { MdDeleteOutline } from 'react-icons/md';
import DashboardNavbar from './DashboardNavbar';
import { FaEdit } from 'react-icons/fa';

const ProductList = () => {
  const { backendUrl, currency, isAdmin, products, fetchProducts, loading } = useContext(AppContext);

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/product/delete/${productId}`, {
        headers: {
          Authorization: `${isAdmin}`
        },
        withCredentials: true
      });
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchProducts();
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <div className='flex-1 min-h-screen'>
      <DashboardNavbar />
      <div className='p-4 md:p-6 lg:p-8'>
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              Products
            </h3>
          </div>
          <div className="
          grid
          xl:grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr]
          lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]
          sm:grid-cols-[2fr_1fr_1fr_1fr]
          grid-cols-1
          gap-3
          py-3
          px-4
          text-xs
          uppercase
          font-semibold
          bg-gray-100
          border
          border-gray-200
          rounded-t-xl
          text-gray-600
        ">
            <label>Product</label>
            <label className="mx-auto max-xl:hidden">Category</label>
            <label className="mx-auto max-sm:hidden">Price</label>
            <label className="mx-auto max-sm:hidden">Sizes</label>
            <label className="mx-auto max-sm:hidden">Colors</label>
            <label className="mx-auto max-xl:hidden">Date</label>
            <label className="mx-auto lg:block hidden">Action</label>
          </div>
          {loading ? <div className="flex items-center justify-center min-h-[180px] bg-white rounded-bl-xl rounded-br-xl border border-t-0 border-dashed border-gray-300">
            <img src='/images/loading_animation.svg' alt="loader" className='mx-auto' />
          </div> : <div>
            {Array.isArray(products) && products.length > 0 ?
              <div className='overflow-hidden bg-white rounded-bl-xl rounded-br-xl border border-t-0 border-dashed border-gray-300'>
                <div className='text-sm'>
                  <div>
                    {Array.isArray(products) && products?.reverse().map((product, index) => (
                        <div
                          key={index}
                          className="
            border-b
            border-gray-200
            hover:bg-gray-50
            transition-all
            duration-200
            p-4
            grid
            xl:grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr]
          lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]
            sm:grid-cols-[2fr_1fr_1fr_1fr]
            grid-cols-1
            gap-3
            items-center
          "
                        >
                          {/* Product */}
                          <div className="flex items-center gap-3 max-sm:mx-auto">
                            <img
                              src={product?.images?.[0]?.url}
                              alt={product?.name}
                              className="w-14 h-14 rounded-sm object-cover border border-gray-200 bg-gray-200"
                            />

                            <div>
                              <h6 className="font-medium text-gray-800 line-clamp-2">
                                {product?.name}
                              </h6>
                            </div>
                          </div>

                          {/* Category */}
                          <div className="xl:block hidden text-center">
                            <span className="
              px-3
              py-1
              text-xs
              bg-blue-50
              text-blue-600
              rounded-full
              font-medium
            ">
                              {product?.category}
                            </span>
                          </div>

                          {/* Price */}
                          <div className="text-center font-semibold text-green-600">
                            {currency}. {product?.offerPrice?.toLocaleString()}
                          </div>

                          {/* Sizes */}
                          <div className="flex flex-wrap gap-1 justify-center">
                            {product?.sizes?.length > 0 ? (
                              product.sizes.map((size, i) => (
                                <span
                                  key={i}
                                  className="
                    px-2
                    py-1
                    text-xs
                    font-medium
                    bg-gray-100
                    rounded
                    border
                    border-gray-200
                  "
                                >
                                  {size}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-400">
                                —
                              </span>
                            )}
                          </div>

                          {/* Colors */}
                          <div className="flex flex-wrap gap-1 justify-center">
                            {product?.colors?.length > 0 ? (
                              product.colors.map((color, i) => (
                                <span
                                  key={i}
                                  className="
                    px-2
                    py-1
                    text-xs
                    bg-purple-50
                    text-purple-600
                    rounded
                    border
                    border-gray-200
                    font-medium
                  "
                                >
                                  {color}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-400">
                                —
                              </span>
                            )}
                          </div>

                          {/* Date */}
                          <div className="px-3
          py-1
          rounded-full
          text-xs
          font-medium
          bg-gray-100
          text-gray-500
          w-fit
          mx-auto">
                            {new Date(product?.created_at).toLocaleDateString()}
                          </div>

                          {/* Actions */}
                          <div className="flex justify-center gap-2">
                            {/* <button
                              onClick={() => navigate(`/admin/updateproduct/${product?.id}`)}
                              className="
                      h-8
                      w-8
                      rounded
                      bg-green-50
                      text-green-600
                      flex
                      items-center
                      justify-center
                      hover:bg-green-100
                      transition
                    "
                            >
                              <FaEdit size={15} />
                            </button> */}

                            <button
                              onClick={() => deleteProduct(product?.id)}
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
                  </div>
                </div>
              </div> :
              <div className="flex items-center justify-center min-h-[180px] bg-white rounded-bl-xl rounded-br-xl border border-t-0 border-dashed border-gray-300">
                <p className="text-gray-500">
                  No products found
                </p>
              </div>}
          </div>}
        </div>
      </div>
    </div>
  )
}

export default ProductList