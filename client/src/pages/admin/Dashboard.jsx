import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { AppContext } from "../../context/AppContext";

import {
  ArrowRight,
  Box,
  CalendarDays,
  Clock3,
  FileText,
  Package,
  ShoppingBag,
  Star,
  // Trash3,
  Users,
} from "lucide-react";

import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const Dashboard = () => {
  const {
    backendUrl,
    navigate,
    isAdmin,
    currency,
    products,
    fetchProducts,
    fetchLatestProducts,
    latestProducts,
    latestBlogs,
    blogs,
    fetchBlogs,
    fetchUserOrders,
    fetchLatestBlogs,
    loading,
    blogLoading,
    orderLoading,
    setOrderLoading,
    fetchAdminOrders,
    allReviews,
  } = useContext(AppContext);

  const [orders, setOrders] = useState([]);

  /* =========================================================
     FETCH LATEST ORDERS
  ========================================================= */

  const fetchLatestOrders = async () => {
    try {
      setOrderLoading(true);

      const response = await axios.get(
        `${backendUrl}/api/order/get-latest-orders`,
        {
          headers: {
            Authorization: `${isAdmin}`,
          },
          withCredentials: true,
        }
      );

      if (response.data) {
        setOrders(Array.isArray(response.data) ? response.data : []);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Failed to fetch latest orders"
      );
    } finally {
      setOrderLoading(false);
    }
  };

  /* =========================================================
     DELETE BLOG
  ========================================================= */

  const deleteBlog = async (blogId) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/blog/delete/${blogId}`,
        {
          headers: {
            Authorization: `${isAdmin}`,
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchBlogs();
        await fetchLatestBlogs();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete blog"
      );

      console.log(error);

      if (error?.response?.status === 500) {
        localStorage.removeItem("token");
        window.location.href = "/admin";
      }
    }
  };

  /* =========================================================
     DELETE PRODUCT
  ========================================================= */

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/product/delete/${productId}`,
        {
          headers: {
            Authorization: `${isAdmin}`,
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);

        await fetchProducts();
        await fetchLatestProducts();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete product"
      );

      console.log(error);

      if (error?.response?.status === 500) {
        localStorage.removeItem("token");
        window.location.href = "/admin";
      }
    }
  };

  /* =========================================================
     UPDATE ORDER STATUS
  ========================================================= */

  const updateOrderStatus = async (order_id, event) => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/order/update-order/${order_id}`,
        {
          order_status: event.target.value,
        },
        {
          headers: {
            Authorization: `${isAdmin}`,
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        await fetchAdminOrders();
        await fetchUserOrders();
        await fetchLatestOrders();

        toast.success(
          response.data.message || response.data.messege || "Order updated"
        );
      } else {
        toast.error(
          response.data.message || response.data.messege || "Update failed"
        );
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Unable to update order"
      );
    }
  };

  /* =========================================================
     INITIAL DATA
  ========================================================= */

  useEffect(() => {
    fetchLatestBlogs();
    fetchLatestProducts();
    fetchLatestOrders();
  }, []);

  /* =========================================================
     DATA
  ========================================================= */

  const recentProducts = useMemo(() => {
    if (!Array.isArray(latestProducts)) return [];

    return [...latestProducts].slice(-4).reverse();
  }, [latestProducts]);

  const recentBlogs = useMemo(() => {
    if (!Array.isArray(latestBlogs)) return [];

    return [...latestBlogs].slice(-4).reverse();
  }, [latestBlogs]);

  /* =========================================================
     STATUS COLORS
  ========================================================= */

  const getStatusColor = (status) => {
    switch (status?.trim()) {
      case "PLACED":
        return "bg-slate-100 text-slate-700 border-slate-200";

      case "PACKING":
        return "bg-amber-50 text-amber-700 border-amber-200";

      case "SHIPPED":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "OUT FOR DELIVERY":
        return "bg-orange-50 text-orange-700 border-orange-200";

      case "DELIVERED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
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

      {/* =====================================================
            STAT CARDS
        ===================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        {/* Products */}

        <div
          className="
              group relative overflow-hidden
              bg-white
              border border-gray-200
              rounded-2xl
              p-5
              
              hover:shadow-lg
              hover:-translate-y-0.5
              transition-all duration-300
            "
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Products
              </p>

              <h3 className="text-3xl font-bold text-gray-900 mt-2">
                {products?.length || 0}
              </h3>

              <p className="text-xs text-gray-400 mt-2">
                Products in your store
              </p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingBag size={23} />
            </div>
          </div>

          <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-blue-50 opacity-60" />
        </div>

        {/* Orders */}

        <div
          className="
              group relative overflow-hidden
              bg-white
              border border-gray-200
              rounded-2xl
              p-5
              
              hover:shadow-lg
              hover:-translate-y-0.5
              transition-all duration-300
            "
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Recent Orders
              </p>

              <h3 className="text-3xl font-bold text-gray-900 mt-2">
                {orders?.length || 0}
              </h3>

              <p className="text-xs text-gray-400 mt-2">
                Latest customer orders
              </p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Package size={23} />
            </div>
          </div>

          <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-emerald-50 opacity-60" />
        </div>

        {/* Blogs */}

        <div
          className="
              group relative overflow-hidden
              bg-white
              border border-gray-200
              rounded-2xl
              p-5
              
              hover:shadow-lg
              hover:-translate-y-0.5
              transition-all duration-300
            "
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Blogs
              </p>

              <h3 className="text-3xl font-bold text-gray-900 mt-2">
                {blogs?.length || 0}
              </h3>

              <p className="text-xs text-gray-400 mt-2">
                Published articles
              </p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
              <FileText size={23} />
            </div>
          </div>

          <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-violet-50 opacity-60" />
        </div>

        {/* Reviews */}

        <div
          className="
              group relative overflow-hidden
              bg-white
              border border-gray-200
              rounded-2xl
              p-5
              
              hover:shadow-lg
              hover:-translate-y-0.5
              transition-all duration-300
            "
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Reviews
              </p>

              <h3 className="text-3xl font-bold text-gray-900 mt-2">
                {allReviews?.length || 0}
              </h3>

              <p className="text-xs text-gray-400 mt-2">
                Customer feedback
              </p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
              <Star size={23} />
            </div>
          </div>

          <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-orange-50 opacity-60" />
        </div>
      </div>

      {/* =====================================================
            QUICK ACTIONS
        ===================================================== */}

      <div className="bg-gray-900 rounded-2xl p-5 sm:p-6 mb-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>
            <p className="text-sm text-gray-400 mb-1">
              Quick Actions
            </p>

            <h3 className="text-xl font-bold">
              Manage your store
            </h3>
          </div>

          <div className="flex flex-wrap gap-3">

            <button
              onClick={() => navigate("/admin/addproduct")}
              className="
                  px-4 py-2.5
                  bg-white text-gray-900
                  rounded-xl
                  text-sm font-semibold
                  hover:bg-gray-100
                  transition
                "
            >
              + Add Product
            </button>

            <button
              onClick={() => navigate("/admin/addblog")}
              className="
                  px-4 py-2.5
                  bg-white/10
                  border border-white/10
                  rounded-xl
                  text-sm font-semibold
                  hover:bg-white/20
                  transition
                "
            >
              + Write Blog
            </button>

            <button
              onClick={() => navigate("/admin/orders")}
              className="
                  px-4 py-2.5
                  bg-white/10
                  border border-white/10
                  rounded-xl
                  text-sm font-semibold
                  hover:bg-white/20
                  transition
                "
            >
              Manage Orders
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
            RECENT PRODUCTS
        ===================================================== */}

      <section className="mb-8">

        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              Recent Products
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Recently added products to your store
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/products")}
            className="
                hidden sm:flex
                items-center gap-1
                text-sm font-semibold
                text-blue-600
                hover:text-blue-700
              "
          >
            View all
            <ArrowRight size={16} />
          </button>
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
          ) : recentProducts.length > 0 ? (
            <div>
              {recentProducts.map((product, index) => (
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

        <button
          onClick={() => navigate("/admin/products")}
          className="
              sm:hidden
              flex items-center gap-1
              mt-3
              text-sm font-semibold
              text-blue-600
            "
        >
          View all products
          <ArrowRight size={15} />
        </button>
      </section>

      {/* =====================================================
            BLOGS
        ===================================================== */}

      <section className="mb-8">

        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              Recent Blogs
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Latest content published on your website
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/blogs")}
            className="
                hidden sm:flex
                items-center gap-1
                text-sm font-semibold
                text-blue-600
              "
          >
            View all
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden ">

          {/* Header */}

          <div
            className="
                hidden lg:grid
                grid-cols-[2fr_1fr_1fr_80px]
                gap-5
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
            <span>Blog</span>
            <span>Category</span>
            <span>Date</span>
            <span className="text-center">Action</span>
          </div>

          {blogLoading ? (
            <div className="min-h-[220px] flex items-center justify-center">
              <img
                src="/images/loading_animation.svg"
                alt="Loading"
                className="w-12 h-12"
              />
            </div>
          ) : recentBlogs.length > 0 ? (
            recentBlogs.map((blog) => (
              <div
                key={blog?.id}
                className="
    p-4
    border-b border-gray-100
    last:border-b-0
    hover:bg-gray-50
    transition
  "
              >

                {/* Desktop Layout */}
                <div className="hidden lg:grid lg:grid-cols-[2fr_1fr_1fr_80px] gap-5 items-center">

                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={blog?.image?.url}
                      alt={blog?.title}
                      className="
    w-16 h-16
    sm:w-24 sm:h-20
    rounded-xl
    object-cover
    border border-gray-200
    shrink-0
  "
                    />

                    <div className="min-w-0">
                      <h4 className="font-semibold text-gray-800 line-clamp-2">
                        {blog?.title}
                      </h4>
                    </div>
                  </div>

                  <div>
                    <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold">
                      {blog?.category || "General"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <CalendarDays size={13} />
                    {blog?.created_at
                      ? new Date(blog.created_at).toLocaleDateString()
                      : "—"}
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/updateblog/${blog?.id}`)
                      }
                      className="
          h-8 w-8
          rounded-md
          bg-green-50
          text-green-600
          flex items-center justify-center
          hover:bg-green-100
          transition
        "
                    >
                      <FaEdit size={15} />
                    </button>

                    <button
                      onClick={() => deleteBlog(blog?.id)}
                      className="
          h-8 w-8
          rounded-md
          bg-red-50
          text-red-600
          flex items-center justify-center
          hover:bg-red-100
          transition
        "
                    >
                      <MdDeleteOutline size={18} />
                    </button>
                  </div>

                </div>

                {/* Mobile & Tablet Layout */}
                <div className="lg:hidden">

                  <div className="flex gap-4">

                    <img
                      src={blog?.image?.url}
                      alt={blog?.title}
                      className="
          w-24 h-20
          rounded-xl
          object-cover
          border border-gray-200
          shrink-0
        "
                    />

                    <div className="flex-1 min-w-0">

                      <h4 className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-2 break-words">
                        {blog?.title}
                      </h4>

                      <div className="flex flex-wrap gap-2 mt-3">

                        <button
                          onClick={() =>
                            navigate(`/admin/updateblog/${blog?.id}`)
                          }
                          className="
        h-8 w-8
        rounded-md
        bg-green-50
        text-green-600
        flex items-center justify-center
      "
                        >
                          <FaEdit size={14} />
                        </button>

                        <button
                          onClick={() => deleteBlog(blog?.id)}
                          className="
        h-8 w-8
        rounded-md
        bg-red-50
        text-red-600
        flex items-center justify-center
      "
                        >
                          <MdDeleteOutline size={18} />
                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            ))
          ) : (
            <div className="min-h-[220px] flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <FileText size={24} className="text-gray-400" />
              </div>

              <p className="font-semibold text-gray-700">
                No blogs found
              </p>

              <p className="text-sm text-gray-400 mt-1">
                Start publishing content for your customers.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
            ORDERS
        ===================================================== */}

      <section className="pb-8">

        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              Recent Orders
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Monitor and manage your latest orders
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/orders")}
            className="
                hidden sm:flex
                items-center gap-1
                text-sm font-semibold
                text-blue-600
              "
          >
            View all
            <ArrowRight size={16} />
          </button>
        </div>

        {orderLoading ? (
          <div className="bg-white border border-gray-200 rounded-2xl min-h-[240px] flex items-center justify-center">
            <img
              src="/images/loading_animation.svg"
              alt="Loading"
              className="w-12 h-12"
            />
          </div>
        ) : orders.length > 0 ? (
          <div className="grid gap-5">

            {orders.map((order) => (
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
      </section>

      {/* MOBILE VIEW ALL */}

      <div className="sm:hidden pb-5">
        <button
          onClick={() => navigate("/admin/orders")}
          className="
              flex items-center gap-1
              text-sm font-semibold
              text-blue-600
            "
        >
          View all orders
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;