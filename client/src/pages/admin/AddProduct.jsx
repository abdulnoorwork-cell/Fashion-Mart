import React, { useContext, useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { LuPlus, LuUpload } from "react-icons/lu";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const colorOptions = [
  "Black",
  "White",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Pink",
  "Purple",
  "Gray",
  "Brown",
];

const sizeOptions = ["S", "M", "L", "XL", "XXL"];

const AddProduct = () => {
  const [error, setError] = useState('')
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const editorRef = useRef(null);
  const quillRef = useRef(null)
  const editorRef2 = useRef(null);
  const quillRef2 = useRef(null)
  const { backendUrl, isAdmin, fetchProducts, navigate } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(null);
  const [offerPrice, setOfferPrice] = useState(null);
  const [images, setImages] = useState([]);
  const [previewImage, setPreviewImage] = useState([])

  const file = useRef()

  const imagesHandler = async (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previewUrls = files.map(file => URL.createObjectURL(file))
    setPreviewImage(previewUrls)
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
        reader.onload = error => reject(error);
      }
    })
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true);
      const base64Images = [];

      for (const img of images) {
        const base64 = await convertBase64(img);
        base64Images.push(base64);
      }
      const formData = new FormData();
      formData.append('name', name);
      formData.append('category', category);
      formData.append('price', price);
      formData.append('offerPrice', offerPrice);
      formData.append('about', quillRef.current.root.innerHTML);
      formData.append('description', quillRef2.current.root.innerHTML);
      formData.append('sizes', JSON.stringify(selectedSizes));
      formData.append('colors', JSON.stringify(selectedColors));
      base64Images.forEach((img) => {
        formData.append("images", img);
      })

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: {
          Authorization: `${isAdmin}`
        },
        withCredentials: true
      })
      if (response.data) {
        toast.success(response.data.message);
        setLoading(false);
        setImages([]);
        setPreviewImage([]);
        setName('');
        setCategory('');
        setPrice('');
        setOfferPrice('');
        setSelectedSizes([]);
        setSelectedColors([])
        quillRef.current.root.innerHTML = ''
        quillRef2.current.root.innerHTML = ''
        await fetchProducts()
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

  // initiate Quill only once
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
    }
    if (!quillRef2.current && editorRef2.current) {
      quillRef2.current = new Quill(editorRef2.current, { theme: 'snow' })
    }
  }, [])

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((item) => item !== color)
        : [...prev, color]
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size]
    );
  }

  return (
    <div className='flex items-center justify-center w-full text-gray-600'>
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-4xl bg-white rounded-2xl border border-gray-200 p-6 md:p-8"
      >
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            Add New Product
          </h3>
          <p className="text-gray-500 mt-1">
            Create and manage your products.
          </p>
        </div>

        {/* Images */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Featured Image <small className="text-red-600 text-lg leading-none">*</small>
          </label>
          {previewImage.length < 1 ? <div onClick={() => file.current.click()} className="
          flex flex-col items-center justify-center
          w-full lg:h-[200px] sm:h-[180px] h-[160px]
          border-2 border-dashed border-gray-300
          rounded-lg
          cursor-pointer
          bg-gray-50
          hover:border-blue-500
          transition
        ">
            <>
              <LuUpload className="text-3xl text-gray-400 mb-2.5" />
              <p className="text-gray-500">
                Drag & drop images here
              </p>
              <p className="text-sm text-gray-400 mt-1">
                PNG, JPG, JPEG, WEBP
              </p>
            </>
          </div> : <div className='grid grid-cols-4 items-center gap-2'>{previewImage.map((img, index) => (
            <figure><img key={index} src={img} className='rounded cursor-pointer w-full h-full max-h-[90px] object-cover border border-gray-300 bg-gray-100' alt="product-name" /></figure>
          ))}</div>}
          <input type="file" ref={file} multiple onChange={imagesHandler} hidden id='image' />
          <h6 className='text-red-600 mt-2 leading-none text-xs'>{error === 'Please fill required fields' || error === 'Invalid format (jpg, jpeg, png, webp only)' ? error : null}</h6>
        </div>

        {/* Product Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Product Name <small className="text-red-600 text-lg leading-none">*</small>
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none"
            />
            <h6 className='text-red-600 mt-2 leading-none text-xs'>{error === 'Please fill required fields' || error === 'Name must be between 8-120 characters' ? error : null}</h6>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Category <small className="text-red-600 text-lg leading-none">*</small>
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none"
            >
              <option value="">Select Category</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Footwear">Footwear</option>
              <option value="Apparel">Apparel</option>
              <option value="Gymwear">Gymwear</option>
              <option value="Activewear">Activewear</option>
            </select>
            <h6 className='text-red-600 mt-2 leading-none text-xs'>{error === 'Please fill required fields' ? error : null}</h6>
          </div>
        </div>

        {/* Price & Stock */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Price <small className="text-red-600 text-lg leading-none">*</small>
            </label>

            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="120"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none"
            />
            <h6 className='text-red-600 mt-2 leading-none text-xs'>{error === 'Please fill required fields' || error === 'Price must be greater than 10' || error === 'Offer price must be less than price' ? error : null}</h6>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Offer Price <small className="text-red-600 text-lg leading-none">*</small>
            </label>

            <input
              type="number"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              placeholder="80"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none"
            />
            <h6 className='text-red-600 mt-2 leading-none text-xs'>{error === 'Please fill required fields' || error === 'Offer price must be greater than 8' || error === 'Offer price must be less than price' ? error : null}</h6>
          </div>
        </div>

        {/* Colors */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3">
            Colors (Optional)
          </label>

          <div className="flex flex-wrap gap-3">
            {colorOptions.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => toggleColor(color)}
                className={`px-4 py-2 rounded-lg border text-xs transition ${selectedColors.includes(color)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300"
                  }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3">
            Sizes (Optional)
          </label>

          <div className="flex flex-wrap gap-3">
            {sizeOptions.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`min-w-[55px] px-4 py-2 rounded-lg border text-xs transition ${selectedSizes.includes(size)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300"
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            About Product <small className="text-red-600 text-lg leading-none">*</small>
          </label>

          <div
            ref={editorRef}
            className="bg-white
          min-h-[130px]
          max-h-[300px]
          border border-gray-300
          rounded-lg
          max-w-full
          overflow-hidden
          overflow-y-auto"
          />
          <h6 className='text-red-600 mt-2 leading-none text-xs'>{error === 'Please fill required fields' || error === 'About product must be at least 256 characters' ? error : null}</h6>
        </div>

        {/* Description */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2">
            Product Description <small className="text-red-600 text-lg leading-none">*</small>
          </label>

          <div
            ref={editorRef2}
            className="bg-white
          min-h-[150px]
          max-h-[350px]
          border border-gray-300
          rounded-lg
          max-w-full
          overflow-hidden
          overflow-y-auto"
          />
          <h6 className='text-red-600 mt-2 leading-none text-xs'>{error === 'Please fill required fields' || error === 'Description must be at least 500 characters' ? error : null}</h6>
        </div>

        {/* Featured */}
        {/* <div className="mb-8 flex items-center gap-3">
            <input
              type="checkbox"
              checked={featured}
              onChange={() => setFeatured(!featured)}
            />

            <label className="text-sm">
              Mark as Featured Product
            </label>
          </div> */}

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

          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;