import React, { useContext, useState } from "react";
import {
  FaHeart
} from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";
import QuickViewModel from "../components/QuickViewModel";

const Wishlist = () => {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const { wishlist, navigate } = useContext(AppContext);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.96,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <>
      <QuickViewModel product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <section className="min-h-screen text-white">

        {/* Hero */}
        <div className="relative h-[300px]">
          <img
            src="/images/slide-img-5.jpg"
            alt="Shop"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/70"></div>

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-black uppercase italic">
              My Wishlist
            </h1>

            <p className="max-w-3xl text-gray-300 mt-3 sm:mt-4 text-center px-4">
              Save your favorite products for later
            </p>
          </motion.div>
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
              <motion.div
                className="flex justify-between items-center mb-10"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}>
                <h2 className="text-3xl font-bold">
                  Wishlist Items ({wishlist.length})
                </h2>
              </motion.div>

              {/* Products */}
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.05 }}>
                {wishlist.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                    whileHover={{
                      y: -8,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <ProductCard
                      product={product}
                      setSelectedProduct={setSelectedProduct}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Actions */}
              <motion.div
                className="flex flex-col md:flex-row gap-4 justify-center mt-14"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}>
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    y: -3,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
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
                </motion.button>
              </motion.div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Wishlist;