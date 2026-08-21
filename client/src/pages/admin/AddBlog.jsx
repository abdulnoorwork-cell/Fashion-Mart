import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import upload_area from '/images/upload_area.svg'
import { useContext } from 'react';
import Quill from 'quill';
import { LuPlus, LuUpload } from 'react-icons/lu';
import DashboardNavbar from './DashboardNavbar';

const AddBlog = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null)
  const [error, setError] = useState('')
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');

  const { backendUrl, isAdmin, fetchBlogs, fetchLatestBlogs,navigate } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', quillRef.current.root.innerHTML);
      formData.append('image', image);
      formData.append('category', category);

      const response = await axios.post(`${backendUrl}/api/blog/add`, formData, {
        headers: {
          Authorization: `${isAdmin}`
        },
        withCredentials: true
      })
      if (response.data) {
        toast.success(response.data.message);
        await fetchBlogs()
        await fetchLatestBlogs()
        setLoading(false);
        setImage(false);
        setTitle('');
        setCategory('');

        if (quillRef.current) {
          quillRef.current.root.innerHTML = '';
        }
        setTimeout(() => {
          navigate('/admin/blogs')
        }, 1000)
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error)
      setError(error.response.data.message)
      if (error.response.status === 500) {
        localStorage.removeItem('token');
        window.location.href = "/admin"
        setError(error.response.data.message)
      }
    }
  }

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
    }
  }, [])

  return (
    <div className='flex-1 min-h-screen'>
      <DashboardNavbar />
      <div className='flex items-center justify-center w-full p-4 md:p-6 lg:p-8 text-gray-600'>
        <form
          onSubmit={onSubmitHandler}
          className="w-full flex justify-center"
        >
          <div className="w-full max-w-4xl bg-white rounded-2xl border border-gray-200 p-6 md:p-8">

            {/* Header */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Create New Blog
              </h3>
              <p className="text-gray-500 mt-1">
                Add a new article to your blog.
              </p>
            </div>

            {/* Upload Image */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image
              </label>

              <label
                htmlFor="image"
                className="
          flex flex-col items-center justify-center
          w-full lg:h-[200px] sm:h-[180px] h-[160px]
          border-2 border-dashed border-gray-300
          rounded-lg
          cursor-pointer
          bg-gray-50
          hover:border-blue-500
          transition
        "
              >
                {!image ? (
                  <>
                    <LuUpload className="text-3xl text-gray-400 mb-2.5" />
                    <p className="text-sm text-gray-500">
                      Click to upload image
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG, JPEG, WEBP
                    </p>
                  </>
                ) : (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="preview"
                    className="h-full w-full object-cover rounded-lg"
                  />
                )}

                <input
                  id="image"
                  type="file"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
              <h6 className='text-red-600 mt-2 leading-none text-xs'>{error === 'All fields are required' || error === 'Invalid format (jpg, jpeg, png, webp only)' ? error : null}</h6>
            </div>

            {/* Title */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blog Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title..."
                required
                className="
          w-full
          px-4 py-3
          rounded-lg
          border border-gray-300
          focus:outline-none
          focus:ring-1
          focus:ring-blue-500
          focus:border-blue-500
        "
              />
              <h6 className='text-red-600 mt-2 leading-none text-xs'>{error === 'All fields are required' || error === 'Title must be between 12–120 characters' ? error : null}</h6>
            </div>

            {/* Category */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blog Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="
      w-full
      px-4
      py-3
      bg-white
      rounded-lg
      border
      border-gray-300
      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
      focus:border-blue-500
      transition
    "
              >
                <option value="">Select Category</option>

                <option value="Fitness">Fitness</option>
                <option value="Fashion">Fashion</option>
                <option value="LifeStyle">LifeStyle</option>
                <option value="Footwear">Footwear</option>
              </select>
              <h6 className='text-red-600 mt-2 leading-none text-xs'>{error === 'All fields are required' ? error : null}</h6>
            </div>

            {/* Editor */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blog Description
              </label>

              <div
                ref={editorRef}
                className="
          bg-white
          min-h-[200px]
          max-h-[400px]
          border border-gray-300
          rounded-lg
          overflow-hidden
          overflow-y-auto
        "
              />
              <h6 className='text-red-600 mt-2 leading-none text-xs'>{error === 'All fields are required' || error === 'Description must be at least 256 characters' ? error : null}</h6>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="
        flex items-center justify-center gap-2
        bg-blue-600
        hover:bg-blue-700
        disabled:opacity-60
        text-white
        font-medium
        px-8 py-3
        rounded-xl
        transition
      "
            >
              <LuPlus size={18} />

              {loading ? "Adding Blog..." : "Publish Blog"}
            </button>

          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBlog