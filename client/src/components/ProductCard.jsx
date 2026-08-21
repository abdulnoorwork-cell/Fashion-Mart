import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AppContext } from '../context/AppContext'
import { FaHeart, FaShoppingBag } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { FaMinus, FaPlus } from "react-icons/fa6";

const ProductCard = ({ product, setSelectedProduct }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const { currency, navigate, toggleWishlist, isInWishlist, addToCart } = useContext(AppContext);
    return (
        <div
            key={product.id}
            className="bg-[#222222] overflow-hidden group h-full"
        >

            {/* Image Area */}
            <div className="relative overflow-hidden w-full h-78">

                {/* Discount */}
                <span className="absolute top-3 z-10 bg-[#E46254] text-white text-sm font-semibold py-1.5 pl-2.5 pr-3.5 uppercase rounded-tr-full rounded-br-full">
                    {Math.round(((product.price - product.offerPrice) / product.price) * 100)}% Off
                </span>

                {/* Wishlist */}
                <button
                    onClick={() => toggleWishlist(product.id)}
                    className="
                                   absolute top-3 right-3
                                   w-11 h-11
                                   rounded-full
                                   bg-black
                                   text-white
                                   flex items-center justify-center
                                   text-xl
                                   z-10
                                 "
                >
                    {isInWishlist(product.id) ? <FaHeart /> : <FiHeart />}
                </button>

                <img
                    onClick={() => { navigate(`/collection/${(product.category).toLowerCase()}/${(product.name).toLowerCase()}/${product.id}`); scrollTo(0, 0) }}
                    src={product.images?.[0]?.url}
                    alt={product.name}
                    className="w-full h-full
                      object-cover
                      cursor-pointer
                      transition
                      duration-400
                      group-hover:scale-110"
                />
                {product?.images?.[1]?.url && <img
                    onClick={() => { navigate(`/collection/${(product.category).toLowerCase()}/${(product.name).toLowerCase()}/${product.id}`); scrollTo(0, 0) }}
                    src={product?.images?.[1]?.url}
                    alt="hover"
                    className="w-full h-full
                      object-cover
                      cursor-pointer
                      transition
                      duration-400
                      group-hover:scale-110
                      absolute top-0 left-0
                      opacity-0
                      group-hover:opacity-100"
                />}
            </div>

            {/* Content */}
            <div className="p-5">
                <h6 className="text-sm text-gray-400 mb-2">
                    {product.category}
                </h6>

                <h3
                    onClick={() => { navigate(`/collection/${(product.category).toLowerCase()}/${(product.name).toLowerCase()}/${product.id}`); scrollTo(0, 0) }}
                    className="text-lg font-semibold mb-3 cursor-pointer text-gray-100 line-clamp-1">
                    {product.name}
                </h3>

                <div className='flex items-center gap-3 mb-5'>
                    <h6 className="text-lg text-[#E46254]">
                        {currency}. {product.offerPrice?.toLocaleString()}
                    </h6>
                    <h6 className="line-through text-gray-500">
                        {currency}. {product.price?.toLocaleString()}
                    </h6>
                </div>

                <button
                    onClick={() => {
                        const sizes =
                            product?.sizes &&
                            Array.isArray(product.sizes) &&
                            product.sizes.length > 0;

                        const colors =
                            product?.colors &&
                            Array.isArray(product.colors) &&
                            product.colors.length > 0;

                        if (sizes || colors) {
                            setSelectedProduct(product);
                        } else {
                            addToCart(product?.id, 1);
                        }
                    }}
                    className="
                                  w-full
                                  bg-white
                                  text-black
                                  py-3
                                  uppercase
                                  font-bold
                                  flex
                                  items-center
                                  justify-center
                                  gap-2
                                "
                >
                    <FaShoppingBag />
                    Add To Cart
                </button>
            </div>
        </div>
    )
}

export default ProductCard