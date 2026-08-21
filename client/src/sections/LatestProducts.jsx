import React, { useContext, useState, useEffect } from "react";

import Heading from "../components/Heading";
import { AppContext } from "../context/AppContext";
import QuickViewModel from "../components/QuickViewModel";
import ProductCard from "../components/ProductCard";


const LatestProducts = () => {
  const { latestProducts } = useContext(AppContext);
  const [selectedProduct, setSelectedProduct] = useState(null)
  return (
    <>
      <QuickViewModel product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <section className="pt-16 lg:pt-20">
        <div className="lg:px-12 md:px-10 sm:px-8 px-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Heading heading='Latest Products' />
          </div>

          {/* Products */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
            {latestProducts.map((product) => (
              <ProductCard key={product.id} product={product} setSelectedProduct={setSelectedProduct} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default React.memo(LatestProducts);