import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import upload_area from '/images/upload_area.svg'
import { LuPlus, LuUpload } from 'react-icons/lu';
import { useContext } from 'react';
import Quill from 'quill';
import DashboardNavbar from './DashboardNavbar';

const UpdateBlog = () => {
  const [blog, setBlog] = useState([]);
  const { blogId } = useParams();
  const editorRef = useRef(null);
  const quillRef = useRef(null)
  const navigate = useNavigate()

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  const { backendUrl, isAdmin, fetchBlogs } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const fetchBog = async () => {
    try {
      let response = await axios.get(`${backendUrl}/api/blog/blog-detail/${blogId}`, {
        headers: {
          Authorization: `${isAdmin}`
        },
        withCredentials: true
      });
      if (response.data) {
        setBlog(response.data)
        setTitle(response.data.title);
        setCategory(response.data.category)
        if (quillRef.current) {
          quillRef.current.root.innerHTML = response.data.description
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('category', category);
      formData.append('description', quillRef.current.root.innerHTML);
      formData.append('image', image || '');

      const response = await axios.put(`${backendUrl}/api/blog/update/${blogId}`, formData, {
        headers: {
          Authorization: `${isAdmin}`
        }
      })
      if (response.data.success) {
        toast.success(response.data.message);
        setLoading(false);
        await fetchBlogs()
        setTimeout(() => {
          navigate('/admin/listblog')
        }, 1000)
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error)
      if (error.response.status === 500) {
        localStorage.removeItem('token');
        window.location.href = "/admin"
      }
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
    }
  }, [])

  useEffect(() => {
    fetchBog();
  }, [])

  return (
    // <form onSubmit={onSubmitHandler} className='flex items-center w-full justify-center px-4 py-8 md:px-8 lg:py-10 h-full min-h-[85vh]'>
    //   <div className='bg-black/30 backdrop-blur-xs flex flex-col w-full h-fit max-w-[700px] p-6 md:p-10 shadow rounded'>
    //     <label htmlFor="image">
    //       <img src={!image ? blog.image && blog.image.url : URL.createObjectURL(image)} className='rounded cursor-pointer max-h-24 max-w-24' alt="" />
    //       <input type="file" onChange={(e) => setImage(e.target.files[0])} hidden id='image' />
    //     </label>
    //     <h6 className='mt-4'>Blog title</h6>
    //     <input type="text" placeholder='Type...' value={title} onChange={(e) => setTitle(e.target.value)} className='w-full mt-2 p-2 min-h-10 placeholder:font-light border border-gray-300 outline-none rounded text-sm' required />
    //     <h6 className='mt-4 mb-2'>Blog Description</h6>
    //     <div ref={editorRef} className='w-full relative border border-gray-300 min-h-[160px] max-h-[360px] overflow-y-auto'></div>
    //     <button type='submit' className='mt-7 flex items-center gap-1 sm:text-sm text-xs px-8 w-fit py-[10px] bg-orange-600 text-white rounded-md cursor-pointer'>{loading ? 'Updating...' : 'Save Changes'}</button>
    //   </div>
    // </form>
    <div className='p-4 md:p-6 lg:p-8'>
      <form
        onSubmit={onSubmitHandler}
        className="w-full flex justify-center text-gray-600"
      >
        <div className="w-full max-w-4xl bg-white rounded-2xl border border-gray-200 p-6 md:p-8">

          {/* Header */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Update Blog
            </h3>
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
              w-full h-[200px]
              border-2 border-dashed border-gray-300
              rounded-lg
              cursor-pointer
              hover:border-blue-500
              hover:bg-blue-50
              transition
            "
            >
              {!image ? (
                <>
                  <img src={blog.image && blog.image.url} alt={blog.title} className='h-full w-full object-cover rounded-lg' />
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
              border border-gray-300
              rounded-lg
              overflow-hidden
            "
            />
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

            {loading ? "Saving Changes..." : "Update Blog"}
          </button>

        </div>
      </form>
    </div>
  )
}

export default UpdateBlog