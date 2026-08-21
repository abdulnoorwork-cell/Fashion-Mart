import React, { useContext, useState } from "react";
import {
  FaHeart,
  FaShoppingBag,
  FaTrash,
} from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
  const { wishlist, currency, toggleWishlist, navigate } = useContext(AppContext);

  return (
    <section className="min-h-screen text-white">

      {/* Hero */}
      <div className="relative h-[350px]">
        <img
          src="/images/slide-img-5.jpg"
          alt="Shop"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-black uppercase italic">
            My Wishlist
          </h1>

          <p className="max-w-3xl text-gray-300 mt-3 sm:mt-4 text-center px-4">
            Save your favorite products for later
          </p>
        </div>
      </div>

      <div className="px-5 md:px-8 lg:px-12 py-16 min-h-screen">
        {wishlist.length === 0 ? (
          <div className="text-center py-24">
            <FaHeart
              className="mx-auto text-gray-600 mb-6"
              size={70}
            />

            <h2 className="text-3xl font-bold mb-4">
              Your Wishlist Is Empty
            </h2>

            <p className="text-gray-400 mb-8">
              Start adding products you love.
            </p>

            <button
              onClick={() => { navigate('/shop'); scrollTo(0, 0) }}
              className="
                bg-white
                text-black
                px-8
                py-4
                font-bold
                uppercase
              "
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold">
                Wishlist Items ({wishlist.length})
              </h2>
            </div>

            {/* Products */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
              {wishlist.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col md:flex-row gap-4 justify-center mt-14">
              <button
                onClick={() => { navigate('/'); scrollTo(0, 0) }}
                className="
                  border
                  border-white
                  px-8
                  py-4
                  uppercase
                  font-semibold
                "
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Wishlist;