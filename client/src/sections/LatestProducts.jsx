import React, { useContext, useState } from "react";
import { easeInOut, motion } from "framer-motion";
import Heading from "../components/Heading";
import { AppContext } from "../context/AppContext";
import QuickViewModel from "../components/QuickViewModel";
import ProductCard from "../components/ProductCard";

const LatestProducts = () => {
  const { latestProducts } = useContext(AppContext);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <>
      <QuickViewModel
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <section className="pt-13 lg:pt-16">
        <div className="lg:px-12 md:px-10 sm:px-8 px-5">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-between mb-6"
          >
            <Heading heading="Latest Products" />
          </motion.div>

          {/* Products Grid */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {latestProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <ProductCard
                  product={product}
                  setSelectedProduct={setSelectedProduct}
                />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default React.memo(LatestProducts);