import React, { useContext } from 'react'
import { AnimatePresence, motion } from "motion/react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { AppContext } from '../context/AppContext';
import { useState } from 'react';

const QuickViewModel = ({ product, onClose }) => {
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const { backendUrl, currency, navigate, toggleWishlist, isInWishlist, addToCart, qty, setQty } = useContext(AppContext);
    return (
        <AnimatePresence mode="wait">
            {product && (
                <>
                    {/* Overlay */}
                    <div
                        onClick={onClose}
                        className="fixed inset-0 bg-black/70 z-40"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.2 }}
                        className="fixed right-0 top-0 min-h-screen w-full sm:w-[450px] bg-[#111] text-white z-50">

                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-800">
                            <h3 className="font-bold text-xl uppercase">
                                Choose Options
                            </h3>

                            <button
                                onClick={onClose}
                                className="text-3xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6">

                            {/* Product */}
                            <div
                                onClick={() => { navigate(`/collection/${(product.category).toLowerCase()}/${(product.name).toLowerCase()}/${product.id}`); scrollTo(0, 0) }}
                                className="flex gap-4 mb-8">
                                <img
                                    src={product.images?.[0]?.url}
                                    alt=""
                                    className="w-28 h-28 object-cover bg-white"
                                />

                                <div>
                                    <h4 className="font-bold uppercase text-lg">
                                        {product.name}
                                    </h4>

                                    <div className="mt-2">
                                        <span className="text-[#E46254] text-lg">
                                            {currency}. {product.offerPrice?.toLocaleString()}
                                        </span>

                                        <span className="line-through ml-2 text-gray-400">
                                            {currency}. {product.price?.toLocaleString()}
                                        </span>
                                    </div>
                                    <small
                                        onClick={() => { navigate(`/collection/${(product.category).toLowerCase()}/${(product.name).toLowerCase()}/${product.id}`); scrollTo(0, 0) }}
                                        className="text-base transition cursor-pointer hover:text-gray-300">View Details</small>
                                </div>
                            </div>

                            {/* Sizes */}
                            {product?.sizes?.length > 0 && (
                                <div className="mb-8">
                                    <h5 className="font-semibold mb-3 uppercase">
                                        Size
                                    </h5>

                                    <div className="flex flex-wrap gap-2">
                                        {product.sizes?.map((size, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedSize(size)}
                                                className={`w-12 h-12 border font-semibold transition-all
                       ${selectedSize === size
                                                        ? "bg-[#E46254] border-[#E46254]"
                                                        : "border-gray-600 hover:border-white"
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Colors */}
                            {product?.colors?.length > 0 && (
                                <div className="mb-8">
                                    <h5 className="font-semibold mb-3 uppercase">
                                        Color
                                    </h5>

                                    <div className="flex gap-3 flex-wrap">
                                        {product.colors?.map((color, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedColor(color)}
                                                className={`w-10 h-10 rounded-full border-2 transition-all
                       ${selectedColor === color
                                                        ? "border-white scale-110"
                                                        : "border-gray-600"
                                                    }`}
                                                style={{ backgroundColor: color.toLowerCase() }}
                                            />
                                        ))}
                                    </div>

                                    {selectedColor && (
                                        <p className="mt-3 text-sm text-gray-300 capitalize">
                                            Color: {selectedColor}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* quantity */}
                            <div className="mb-8">
                                <h5 className="font-semibold mb-3 uppercase">
                                    Quantity
                                </h5>

                                <div className="flex items-center border border-gray-700 w-fit h-[40px] px-4 gap-1">
                                    <button
                                        onClick={() =>
                                            qty > 1 &&
                                            setQty(qty - 1)
                                        }
                                    >
                                        <FaMinus />
                                    </button>

                                    <span className="px-6">
                                        {qty}
                                    </span>

                                    <button
                                        onClick={() => setQty(qty + 1)}
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800 bg-[#111]">
                            <button
                                onClick={() => {
                                    addToCart(
                                        product.id,
                                        selectedSize,
                                        selectedColor,
                                        qty
                                    );
                                }}
                                className="w-full bg-[#E46254] hover:bg-orange-600 py-4 font-bold uppercase transition-all text-black"
                            >
                                Add To Cart
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default QuickViewModel