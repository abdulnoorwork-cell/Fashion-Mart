import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { useContext } from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteOutline, MdOutlineReviews } from 'react-icons/md'
import { BsCartPlus } from "react-icons/bs";
import { TfiWrite } from 'react-icons/tfi'
import { RiBox3Line } from 'react-icons/ri'
import DashboardNavbar from './DashboardNavbar'

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const { backendUrl, navigate, isAdmin, currency, products, fetchProducts, fetchLatestProducts, latestProducts, latestBlogs, blogs, fetchBlogs, fetchUserOrders, fetchLatestBlogs, loading, blogLoading, orderLoading, setOrderLoading, fetchAdminOrders, allReviews } = useContext(AppContext);

  const deleteBlog = async (blogId) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/blog/delete/${blogId}`, {
        headers: {
          Authorization: `${isAdmin}`
        },
        withCredentials: true
      });
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchBlogs();
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error)
      if (error.response.status === 500) {
        localStorage.removeItem('token');
        window.location.href = "/admin"
      }
    }
  }

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
        await fetchLatestProducts()
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error)
      if (error.response.status === 500) {
        localStorage.removeItem('token');
        window.location.href = "/admin"
      }
    }
  }

  const fetchLatestOrders = async () => {
    try {
      setOrderLoading(true)
      let response = await axios.get(`${backendUrl}/api/order/get-latest-orders`, {
        headers: {
          Authorization: `${isAdmin}`
        },
        withCredentials: true
      })
      if (response.data) {
        setOrders(response.data)
        setOrderLoading(false)
      } else {
        setOrderLoading(false)
        console.log(error.response.data.messege);
      }
    } catch (error) {
      setOrderLoading(false)
      console.log(error)
    }
  }

  const updateOrderStatus = async (orderid, event) => {
    try {

      let response = await axios.put(`${backendUrl}/api/order/update-order/${orderid}`, { order_status: event.target.value }, {
        headers: {
          Authorization: `${isAdmin}`
        },
        withCredentials: true
      });
      if (response.data.success) {
        await fetchAdminOrders()
        await fetchUserOrders()
        await fetchLatestOrders()
        toast.success(response.data.messege);
      } else {
        toast.error(response.data.messege)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchLatestBlogs()
    fetchLatestProducts()
    fetchLatestOrders();
  }, [])

  return (
    <div className='flex-1 min-h-screen'>
      <DashboardNavbar />
      <div className='p-4 md:p-6 lg:p-8'>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Products</p>
                <h2 className="text-3xl font-bold mt-2">
                  {products.length}
                </h2>
              </div>
              <BsCartPlus size={38} />
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Orders</p>
                <h2 className="text-3xl font-bold mt-2">
                  {orders?.length}
                </h2>
              </div>
              <RiBox3Line size={38} />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Blogs</p>
                <h2 className="text-3xl font-bold mt-2">
                  {blogs.length}
                </h2>
              </div>
              <TfiWrite size={38} />
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Reviews</p>
                <h2 className="text-3xl font-bold mt-2">
                  {allReviews?.length}
                </h2>
              </div>
              <MdOutlineReviews size={38} />
            </div>
          </div>

        </div>
        {/* Products */}
        <div>
          <div className="flex items-center justify-between mb-4 mt-8">
            <h3 className="text-xl font-bold text-gray-800">
              Latest Products
            </h3>

            <button
              onClick={() => navigate("/admin/products")}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All →
            </button>
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
            {Array.isArray(latestProducts) && latestProducts.length > 0 ?
              <div className='overflow-hidden bg-white rounded-bl-xl rounded-br-xl border border-t-0 border-dashed border-gray-300'>
                <div className='text-sm'>
                  <div>
                    {Array.isArray(latestProducts) && latestProducts
                      ?.slice(-3)
                      .reverse().map((product, index) => (
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
                            <button
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
                            </button>

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

        {/* blogs */}
        <div className="flex items-center justify-between mb-4 mt-8">
          <h3 className="text-xl font-bold text-gray-800">
            Latest Blogs
          </h3>

          <button
            onClick={() => navigate("/admin/blogs")}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View All →
          </button>
        </div>
        <div className="
  text-xs
  uppercase
  py-3
  px-4
  font-semibold
  grid
  xl:grid-cols-[2.5fr_3fr_1fr_1fr_1fr]
  lg:grid-cols-[2.5fr_3fr_1fr_1fr]
  sm:grid-cols-[2fr_3fr_1fr]
  grid-cols-[1fr]
  gap-4
  bg-gray-100
  border
  border-gray-200
  rounded-t-xl
  text-gray-600
">
          <label>Blog</label>
          <label className="hidden sm:block">Description</label>
          <label className="hidden lg:block mx-auto">Category</label>
          <label className="hidden xl:block mx-auto">Date</label>
          <label className="mx-auto">Action</label>
        </div>
        {blogLoading ? <div className="flex items-center justify-center bg-white rounded-bl-xl rounded-br-xl border border-t-0 border-dashed border-gray-300">
          <img src='/images/loading_animation.svg' alt="loader" className='mx-auto' />
        </div> : <div>
          {Array.isArray(latestBlogs) && latestBlogs.length > 0 ?
            <div className="w-full">
              <div className="overflow-hidden bg-white rounded-bl-xl rounded-br-xl border border-t-0 border-dashed border-gray-300">

                {latestBlogs?.slice(-3).reverse().map((blog) => (
                  <div
                    key={blog?.id}
                    className="
      grid
      xl:grid-cols-[2.5fr_3fr_1fr_1fr_1fr]
      lg:grid-cols-[2.5fr_3fr_1fr_1fr]
      sm:grid-cols-[2fr_3fr_1fr]
      grid-cols-[1fr]
      gap-4
      items-center
      p-4
      border-b
      border-gray-200
      hover:bg-gray-50
      transition-all
    "
                  >

                    {/* Blog Info */}
                    <div className="flex items-center gap-4">
                      <img
                        src={blog?.image?.url}
                        alt={blog?.title}
                        className="
          w-20
          h-16
          object-cover
          rounded-lg
          border
          border-gray-200
          shrink-0
        "
                      />

                      <div>
                        <h4 className="font-semibold text-gray-800 line-clamp-2">
                          {blog?.title}
                        </h4>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="hidden sm:block">
                      <div
                        className="text-sm text-gray-600 line-clamp-3"
                        dangerouslySetInnerHTML={{
                          __html: blog?.description
                            ?.replace(
                              /style="[^"]*color:[^";]+;?[^"]*"/gi,
                              ""
                            )
                            ?.replace(/color:[^;"]+;?/gi, "")
                        }}
                      />
                    </div>

                    {/* Category */}
                    <div className="hidden lg:flex justify-center">
                      <span
                        className="
          px-3
      py-1
      text-xs
      bg-blue-50
      text-blue-600
      rounded-full
      font-medium
        "
                      >
                        {blog?.category || "General"}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="hidden xl:flex justify-center">
                      <span
                        className="
          px-3
          py-1
          rounded-full
          text-xs
          font-medium
          bg-gray-100
          text-gray-500
        "
                      >
                        {new Date(blog?.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() =>
                          navigate(`/admin/updateblog/${blog?.id}`)
                        }
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
                      </button>

                      <button
                        onClick={() => deleteBlog(blog?.id)}
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
            </div> :
            <div className="flex items-center justify-center min-h-[180px] bg-white rounded-bl-xl rounded-br-xl border border-t-0 border-dashed border-gray-300">
              <p className="text-gray-500">
                No blogs found
              </p>
            </div>}
        </div>}
        {/* Orders */}
        <div className="flex items-center justify-between mb-4 mt-8">
          <h3 className="text-xl font-bold text-gray-800">
            Latest Orders
          </h3>

          <button
            onClick={() => navigate("/admin/orders")}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View All →
          </button>
        </div>
        <div className='flex flex-col text-gray-800'>
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
            {orders.length > 0 ?
              <div className='overflow-hidden bg-white rounded-bl-xl rounded-br-xl border border-t-0 border-dashed border-gray-300'>
                {orders?.map((order, index) => (
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
      </div >
    </div>
  )
}

export default Dashboard