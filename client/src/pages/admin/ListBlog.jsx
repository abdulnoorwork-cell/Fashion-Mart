import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from 'react-icons/md'
import { CalendarDays, FileText } from 'lucide-react';

const ListBlog = () => {
  const { backendUrl, navigate, isAdmin, blogs, fetchBlogs, blogLoading } = useContext(AppContext);

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

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">
          Blogs
        </h3>
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
        ) : blogs.length > 0 ? (
          blogs.map((blog) => (
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
    </div>
  )
}

export default ListBlog