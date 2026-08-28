import React, { useEffect } from 'react'
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import {
  ShoppingBag,
} from "lucide-react";

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

  /* =========================================================
     FORMAT PRICE
  ========================================================= */

  const formatPrice = (price) => {
    if (price === undefined || price === null) return "0";

    return Number(price).toLocaleString();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">
          Products
        </h3>
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden ">

        {/* Desktop Header */}

        <div
          className="
                hidden xl:grid
                grid-cols-[2.2fr_1fr_1fr_1.2fr_1.2fr_1fr_80px]
                gap-4
                px-5 py-4
                bg-gray-50
                border-b border-gray-200
                text-xs
                font-bold
                uppercase
                tracking-wide
                text-gray-500
              "
        >
          <span>Product</span>
          <span>Category</span>
          <span>Price</span>
          <span>Sizes</span>
          <span>Colors</span>
          <span>Date</span>
          <span className="text-center">Action</span>
        </div>

        {loading ? (
          <div className="min-h-[220px] flex items-center justify-center">
            <img
              src="/images/loading_animation.svg"
              alt="Loading"
              className="w-12 h-12"
            />
          </div>
        ) : products.length > 0 ? (
          <div>
            {products.map((product, index) => (
              <div
                key={product?.id || index}
                className="
    p-4
    border-b border-gray-100
    last:border-b-0
    hover:bg-gray-50
    transition
  "
              >
                {/* Desktop */}
                <div className="hidden xl:grid grid-cols-[2.2fr_1fr_1fr_1.2fr_1.2fr_1fr_80px] gap-4 items-center">

                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={product?.images?.[0]?.url}
                      alt={product?.name}
                      className="w-14 h-14 rounded-xl object-cover border border-gray-200"
                    />

                    <div>
                      <h4 className="font-semibold text-gray-800 line-clamp-2">
                        {product?.name}
                      </h4>
                    </div>
                  </div>

                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 w-fit">
                    {product?.category}
                  </span>

                  <div className="font-bold">
                    {currency} {formatPrice(product?.offerPrice)}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {product?.sizes?.map((size, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs rounded-md bg-gray-100 border"
                      >
                        {size}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {product?.colors?.map((color, i) => (
                      <span
                        key={i}
                        className="w-6 h-6 rounded-full border"
                        style={{ backgroundColor: color.toLowerCase() }}
                      />
                    ))}
                  </div>

                  <div className="text-sm text-gray-500">
                    {new Date(product?.created_at).toLocaleDateString()}
                  </div>

                  <button
                    onClick={() => deleteProduct(product?.id)}
                    className="h-8 w-8 rounded-md bg-red-50 text-red-600 flex items-center justify-center"
                  >
                    <MdDeleteOutline size={19} />
                  </button>
                </div>

                {/* Mobile & Tablet */}
                <div className="xl:hidden">

                  <div className="flex gap-4">
                    <img
                      src={product?.images?.[0]?.url}
                      alt={product?.name}
                      className="w-20 h-20 rounded-xl object-cover border border-gray-200 shrink-0"
                    />

                    <div className="flex-1 min-w-0">

                      <div className="flex justify-between gap-3">
                        <h4 className="font-semibold text-gray-800 line-clamp-2">
                          {product?.name}
                        </h4>

                        <button
                          onClick={() => deleteProduct(product?.id)}
                          className="h-8 w-8 rounded-md bg-red-50 text-red-600 flex items-center justify-center shrink-0"
                        >
                          <MdDeleteOutline size={18} />
                        </button>
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">

                        <div>
                          <p className="text-gray-400">Category</p>
                          <p className="font-medium">{product?.category}</p>
                        </div>

                        <div>
                          <p className="text-gray-400">Price</p>
                          <p className="font-bold">
                            {currency} {formatPrice(product?.offerPrice)}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-400">Sizes</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {product?.sizes?.slice(0, 4).map((size, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 text-xs rounded-md bg-gray-100 border"
                              >
                                {size}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-gray-400">Colors</p>
                          <div className="flex gap-1 mt-1">
                            {product?.colors?.slice(0, 4).map((color, i) => (
                              <span
                                key={i}
                                className="w-5 h-5 rounded-full border"
                                style={{
                                  backgroundColor: color.toLowerCase(),
                                }}
                              />
                            ))}
                          </div>
                        </div>

                      </div>

                      <div className="mt-3 text-xs text-gray-500">
                        Added:{" "}
                        {product?.created_at
                          ? new Date(product.created_at).toLocaleDateString()
                          : "—"}
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="min-h-[220px] flex flex-col items-center justify-center text-center px-5">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <ShoppingBag
                size={24}
                className="text-gray-400"
              />
            </div>

            <p className="font-semibold text-gray-700">
              No products found
            </p>

            <p className="text-sm text-gray-400 mt-1">
              Add your first product to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductList