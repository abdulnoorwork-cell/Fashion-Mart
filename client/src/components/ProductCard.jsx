import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AppContext } from '../context/AppContext'
import { FaHeart, FaShoppingBag } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { FaMinus, FaPlus } from "react-icons/fa6";

const ProductCard = ({ product, setSelectedProduct }) => {
    const { currency, navigate, toggleWishlist, isInWishlist, addToCart } = useContext(AppContext);
    return (
        <div
            key={product.id}
            className="bg-[#222222] overflow-hidden group h-full"
        >

            {/* Image Area */}
            <div className="relative overflow-hidden w-full max-h-full">

                {/* Discount */}
                <span className="absolute top-3 left-3 z-10 bg-[#E46254] text-white md:text-sm text-xs py-1 pl-2.5 pr-3.5">
                    Flat {Math.round(((product.price - product.offerPrice) / product.price) * 100)}% Off
                </span>

                {/* Wishlist */}
                <button
                    onClick={() => toggleWishlist(product.id)}
                    className="
                                   absolute top-3 right-3
                                   md:w-10 md:h-10
                                   w-9 h-9
                                   rounded-full
                                   bg-black
                                   text-white
                                   max-sm:hidden
                                   flex items-center justify-center
                                   md:text-xl text-lg
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
            <div className="sm:p-5 p-4">
                <h6 className="md:text-sm max-sm:hidden text-xs text-gray-400 mb-2">
                    {product.category}
                </h6>

                <h3
                    onClick={() => { navigate(`/collection/${(product.category).toLowerCase()}/${(product.name).toLowerCase()}/${product.id}`); scrollTo(0, 0) }}
                    className="text-lg font-semibold 2xl:mb-3 md:mb-2 mb-1 cursor-pointer text-gray-100 line-clamp-2 max-md:leading-tight">
                    {product.name}
                </h3>

                <div className='flex flex-col md:flex-row md:items-center md:gap-3 md:mb-5 mb-3.5'>
                    <h6 className="text-lg text-[#E46254]">
                        {currency}. {product.offerPrice?.toLocaleString()}
                    </h6>
                    <p className="line-through text-gray-500 font-medium max-md:text-sm">
                        {currency}. {product.price?.toLocaleString()}
                    </p>
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
                                  p-3
                                  uppercase
                                  font-bold
                                  flex
                                  items-center
                                  justify-center
                                  gap-2
                                  md:text-sm
                                  text-xs
                                "
                >
                    <FaShoppingBag className="max-md:hidden" />
                    Add To Cart
                </button>
            </div>
        </div>
    )
}

export default ProductCard