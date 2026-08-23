import React, { useContext, useState, useEffect } from "react";

import Heading from "../components/Heading";
import { AppContext } from "../context/AppContext";
import QuickViewModel from "../components/QuickViewModel";
import ProductCard from "../components/ProductCard";
import FadeUp from "../components/FadeUp";


const LatestProducts = () => {
  const { latestProducts } = useContext(AppContext);
  const [selectedProduct, setSelectedProduct] = useState(null)
  console.log(latestProducts)
  return (
    <>
      <QuickViewModel product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <section className="pt-13 lg:pt-16">
        <div className="lg:px-12 md:px-10 sm:px-8 px-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Heading heading='Latest Products' />
          </div>

          {/* Products */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {latestProducts.map((product,index) => (
              <FadeUp key={product.id} delay={index * 0.2}>
                <ProductCard key={product.id} product={product} setSelectedProduct={setSelectedProduct} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default React.memo(LatestProducts);