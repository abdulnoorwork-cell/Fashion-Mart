import React, { useContext, useEffect, useState } from "react";
import {
  FaStar,
  FaHeart,
  FaMinus,
  FaPlus,
  FaShoppingBag,
} from "react-icons/fa";
import FadeUp from "../components/FadeUp";
import ProductCard from '../components/ProductCard'
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FiHeart } from "react-icons/fi";

colors: ["Black",
  "White",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Pink",
  "Purple",
  "Gray",
  "Brown",]

const SingleProduct = () => {

  const [activeImage, setActiveImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const [product, setProduct] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { id } = useParams()
  const { backendUrl, toggleWishlist, isInWishlist, currency, navigate, addToCart, qty, setQty, } = useContext(AppContext);

  const fetchProduct = async () => {
    try {
      let response = await axios.get(`${backendUrl}/api/product/product-detail/${id}`, { withCredentials: true });
      if (response.data) {
        setProduct(response.data)
        setActiveImage(response.data.images?.[0])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchRelatedProduct = async () => {
    try {
      let response = await axios.get(`${backendUrl}/api/product/latest-category-products/${product.category}`, { withCredentials: true });
      if (response.data) {
        setRelatedProducts(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProduct()
    fetchRelatedProduct()
  }, [id, product.category])

  return (
    <section className="min-h-screen text-white lg:px-12 md:px-10 sm:px-8 px-5">
      {/* Breadcrumb */}
      <div className="pt-6">
        <div className="py-4 text-gray-300 text-sm uppercase font-medium tracking-wide">
          <span className="cursor-pointer hover:text-red-500 transition duration-150" onClick={() => { navigate('/'); scrollTo(0, 0) }}>Home</span> / <span className="cursor-pointer hover:text-red-500 transition duration-150" onClick={() => { navigate('/shop'); scrollTo(0, 0) }}>Shop</span> / <span onClick={() => { navigate(`/collection/${product.category}`); scrollTo(0, 0) }} className="cursor-pointer hover:text-red-500 transition duration-150">{product.category}</span> / <span className="text-red-500">{product.name}</span>
        </div>
      </div>

      {/* Product Section */}
      <div>
        <div className="grid lg:grid-cols-2 2xl:gap-16 xl:gap-14 sm:gap-12 gap-10">

          {/* Images */}
          <div>
            <div className="bg-white mb-5">
              <img
                src={activeImage?.url}
                alt=""
                className="w-full h-full lg:min-h-[75vh] max-h-screen object-cover bg-gray-200 border border-gray-800"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {product?.images?.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`
                    bg-gray-200
                    ${activeImage === img
                      ? "border border-red-500"
                      : "border-0"
                    }
                  `}
                >
                  <img
                    src={img.url}
                    alt=""
                    className="w-full h-[60px] sm:h-[70px] md:h-[80px] xl:h-[15vh] object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <span className="bg-red-500 px-3 py-1 text-sm font-bold">
              {Math.round(((product.price - product.offerPrice) / product.price) * 100)}% OFF
            </span>

            <h1 className="text-3xl sm:text-4xl font-black mt-5 mb-3 sm:mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} />
                ))}
              </div>

              <span className="text-gray-400">
                (124 Reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 sm:mb-8 mb-6">
              <span className="text-3xl sm:text-4xl font-semibold">
                {currency}. {product.offerPrice?.toLocaleString()}
              </span>

              <span className="text-red-500 sm:text-lg line-through">
                {currency}. {product.price?.toLocaleString()}
              </span>
            </div>

            {/* Short Description */}
            <p className="text-gray-300 sm:mb-10 mb-8 sm:leading-7" dangerouslySetInnerHTML={{ __html: product.about }}>
            </p>

            {/* Colors */}
            <div className="mb-8">
              <h3 className="font-semibold mb-4">
                Select Color
              </h3>

              <div className="flex flex-wrap gap-3">
                {product?.colors?.map((color) => (
                  <button
                    key={color}
                    type="button"
                    title={color}
                    onClick={() => setSelectedColor(color)}
                    className={`
        w-9 h-9 rounded-full border-2 transition-all duration-200
        ${selectedColor === color
                        ? "border-white scale-110"
                        : "border-white/20 hover:border-white/60"
                      }
      `}
                    style={{
                      backgroundColor: color.toLowerCase(),
                    }}
                  />
                ))}
              </div>
            </div>

            {selectedColor && (
              <p className="mt-3 text-sm text-gray-300 capitalize">
                Color: {selectedColor}
              </p>
            )}

            {/* Sizes */}
            <div className="mb-8">
              <h3 className="font-semibold mb-4">
                Select Size
              </h3>

              <div className="flex flex-wrap gap-3">
                {product?.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`
                      w-12 h-12 border hover:bg-[#222] transition duration-100
                      ${selectedSize === size
                        ? "bg-white text-black border-white"
                        : "border-white/20"
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-10">
              <h3 className="font-semibold mb-4">
                Quantity
              </h3>

              <div className="flex items-center w-fit border border-white/10">
                <button
                  onClick={() =>
                    qty > 1 &&
                    setQty(qty - 1)
                  }
                  className="sm:w-12 sm:h-12 w-10 h-10 flex items-center justify-center"
                >
                  <FaMinus />
                </button>

                <span className="w-14 text-center">
                  {qty}
                </span>

                <button
                  onClick={() =>
                    setQty(qty + 1)
                  }
                  className="sm:w-12 sm:h-12 w-10 h-10 flex items-center justify-center"
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={() =>
                  addToCart(
                    product.id,
                    selectedSize,
                    selectedColor,
                    qty
                  )
                }
                className="
                  px-8
                  min-w-[200px]
                  bg-white
                  text-black
                  py-4
                  font-bold
                  uppercase
                  flex
                  items-center
                  justify-center
                  gap-3
                "
              >
                <FaShoppingBag />
                Add To Cart
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className="
                  bg-[#222222]
                  hover:bg-[#2c2c2c]
                  px-6
                  py-4
                  flex items-center
                  justify-center
                  text-[21px]
                "
              >
                {isInWishlist(product.id) ? <FaHeart /> : <FiHeart />}
              </button>
            </div>

            {/* Info */}
            <div className="space-y-3 text-gray-400 border-t border-white/10 pt-6 text-sm">
              <p>
                <span className="text-white">Category:</span>{" "}
                {product.category}
              </p>

              <p>
                <span className="text-white">SKU:</span>{" "}
                BCN-2026
              </p>

              <p>
                <span className="text-white">Availability:</span>{" "}
                In Stock
              </p>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-16 lg:mt-20">
          <h2 className="text-3xl font-bold sm:mb-8 mb-6">
            Description
          </h2>

          <div className="bg-[#222] sm:p-8 p-5 border border-white/10">
            <p className="text-gray-300 sm:leading-7" dangerouslySetInnerHTML={{ __html: product.description }}>
            </p>
          </div>
        </div>

        {/* Related Products */}
        <div className="py-16 lg:py-20">
          <h2 className="text-3xl sm:text-4xl font-black italic uppercase text-center sm:mb-14 md:mb-12 mb-10">
            Related Products
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
            {relatedProducts.map((product, index) => (
              <FadeUp key={product.id} delay={index * 0.2}>
                <ProductCard key={product.id} product={product} />
              </FadeUp>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SingleProduct;