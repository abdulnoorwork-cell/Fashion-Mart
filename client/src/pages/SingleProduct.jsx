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

  const [reviews, setReviews] = useState([]);
  const [canReview, setCanReview] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewImages, setReviewImages] = useState([]);

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

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/review/product-reviews/${id}`,
        { withCredentials: true }
      );

      if (response.data) {
        setReviews(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const imageHandler = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        setReviewImages((prev) => [...prev, reader.result]);
      };

      reader.readAsDataURL(file);
    });
  };

  const addReviewHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${backendUrl}/api/review/add`,
        {
          product_id: id,
          rating,
          review: reviewText,
          images: reviewImages,
        },
        {
          headers: {
            Authorization: token,
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);

        setRating(5);
        setReviewText("");
        setReviewImages([]);

        fetchReviews();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed"
      );
    }
  };

  useEffect(() => {
    fetchProduct()
    fetchRelatedProduct()
    fetchReviews();
  }, [id, product.category])

  return (
    <section className="min-h-screen text-white container mx-auto px-5">
      {/* Breadcrumb */}
      <div className="pt-6">
        <div className="py-4 text-gray-300 text-sm uppercase font-medium tracking-wide">
          <span className="cursor-pointer hover:text-[#E46254] transition duration-150" onClick={() => { navigate('/'); scrollTo(0, 0) }}>Home</span> / <span className="cursor-pointer hover:text-[#E46254] transition duration-150" onClick={() => { navigate('/shop'); scrollTo(0, 0) }}>Shop</span> / <span onClick={() => { navigate(`/collection/${product.category}`); scrollTo(0, 0) }} className="cursor-pointer hover:text-[#E46254] transition duration-150">{product.category}</span> / <span className="text-[#E46254]">{product.name}</span>
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
                className="w-full h-full max-h-screen object-cover bg-gray-200 border border-gray-800"
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
                      ? "border border-[#E46254]"
                      : "border-0"
                    }
                  `}
                >
                  <img
                    src={img.url}
                    alt=""
                    className="w-full h-[60px] sm:h-[70px] md:h-[80px] xl:h-[13vh] object-cover"
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
                ({reviews.length} Reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 sm:mb-8 mb-6">
              <span className="text-3xl sm:text-4xl font-semibold">
                {currency}. {product.offerPrice?.toLocaleString()}
              </span>

              <span className="text-[#E46254] sm:text-lg line-through">
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
        <div className="mt-16">
          <h2 className="text-3xl font-bold sm:mb-8 mb-6">
            Description
          </h2>

          <div className="bg-[#222] sm:p-8 p-5 border border-white/10">
            <p className="text-gray-300 sm:leading-7" dangerouslySetInnerHTML={{ __html: product.description }}>
            </p>
          </div>
        </div>

        {/* Add Review */}
        <form
          onSubmit={addReviewHandler}
          className="bg-[#222] border border-white/10 p-6 mt-14"
        >
          <h3 className="text-2xl font-bold mb-5">
            Write A Review
          </h3>

          <div className="mb-5">

            <div className="flex items-center gap-1 text-xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className={`
          cursor-pointer transition-all duration-200
          ${star <= (hoverRating || rating)
                      ? "text-yellow-400"
                      : "text-gray-600"
                    }
        `}
                />
              ))}
            </div>

            <p className="text-sm text-gray-400 mt-2">
              {rating} out of 5 stars
            </p>
          </div>

          <textarea
            rows={5}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review..."
            className="w-full bg-black p-4 mb-5 outline-none focus:border focus:border-[#E46254]"
          />

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={imageHandler}
            className="mb-5"
          />

          {reviewImages.length > 0 && (
            <div className="grid grid-cols-4 gap-3 mb-5">
              {reviewImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  className="h-24 w-full object-cover"
                />
              ))}
            </div>
          )}

          <button
            type="submit"
            className="bg-[#E46254] hover:bg-red-500 text-black transition duration-150 px-8 py-3 font-semibold"
          >
            Submit Review
          </button>
        </form>

        {/* Reviews */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">
            Customer Reviews ({reviews.length})
          </h2>

          {reviews.length === 0 ? (
            <div className="bg-[#222] border border-white/10 p-8 text-center">
              <p className="text-gray-400">
                No reviews available yet.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-[#222] border border-white/10 p-6"
                >
                  {/* User */}
                  <div className="flex items-start gap-4">
                    <img
                      src={
                        review.image?.url ||
                        "/images/profile_image.png"
                      }
                      alt=""
                      className="w-14 h-14 rounded-full object-cover"
                    />

                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <h4 className="font-semibold text-lg">
                            {review.name}
                          </h4>

                          <p className="text-gray-500 text-sm">
                            {new Date(
                              review.created_at
                            ).toLocaleDateString()}
                          </p>
                        </div>

                        {/* Rating */}
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={
                                i < review.rating
                                  ? "opacity-100"
                                  : "opacity-20"
                              }
                            />
                          ))}
                        </div>
                      </div>

                      {/* Review Text */}
                      <p className="text-gray-300 mt-4 leading-7">
                        {review.review}
                      </p>

                      {/* Review Images */}
                      {review.images?.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-5">
                          {review.images.map((img, i) => (
                            <img
                              key={i}
                              src={img.url}
                              alt=""
                              className="w-full h-28 object-cover rounded-lg border border-white/10"
                            />
                          ))}
                        </div>
                      )}

                      {/* Admin Reply */}
                      {review.reply && (
                        <div className="mt-5 ml-4 border-l-4 border-[#E46254] pl-4 py-3 bg-black/30">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-red-500 px-2 py-1 text-xs font-semibold rounded">
                              ADMIN
                            </span>

                            <span className="text-gray-500 text-xs">
                              {new Date(
                                review.reply_created_at
                              ).toLocaleDateString()}
                            </span>
                          </div>

                          <p className="text-gray-300">
                            {review.reply}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Products */}
        <div className="py-16 lg:py-20">
          <h2 className="text-3xl sm:text-4xl font-black italic uppercase text-center sm:mb-14 md:mb-12 mb-10">
            Related Products
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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