import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import cross_icon from '/images/cross_icon.svg'
import { useContext } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from 'react-icons/md'
import DashboardNavbar from './DashboardNavbar';

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
    <div className='flex-1 min-h-screen'>
      <DashboardNavbar />
      <div className="p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            Blogs
          </h3>
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
          {Array.isArray(blogs) && blogs.length > 0 ?
            <div className="w-full">
              <div className="overflow-hidden bg-white rounded-bl-xl rounded-br-xl border border-t-0 border-dashed border-gray-300">

                {blogs?.reverse().map((blog) => (
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
      </div>
    </div>
  )
}

export default ListBlog