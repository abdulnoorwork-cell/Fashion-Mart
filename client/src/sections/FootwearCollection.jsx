import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import Heading from "../components/Heading";
import { AppContext } from "../context/AppContext";
import QuickViewModel from "../components/QuickViewModel";
import ProductCard from "../components/ProductCard";

const FootwearCollection = () => {
  const { backendUrl } = useContext(AppContext);
  const [selectedProduct, setSelectedProduct] = useState(null)

  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])

  const fetchCategoryProducts = async () => {
    try {
      setLoading(true)
      let response = await axios.get(`${backendUrl}/api/product/category-products/${'Footwear'}`, { withCredentials: true })
      if (response.data) {
        setProducts(response.data)
        setLoading(false)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategoryProducts();
  }, [])

  return (
    <>
      <QuickViewModel product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <section className="pb-16 lg:pb-20">
        <div className="lg:px-12 md:px-10 sm:px-8 px-5">
          {/* Header */}
          <div>
            <Heading heading='Footwear Collection' />
          </div>

          {/* Products */}
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            loop={true}
            spaceBetween={20}
            breakpoints={{
              0: {
                slidesPerView: 1.1,
              },
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
              1536: {
                slidesPerView: 5,
              },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard key={product.id} product={product} setSelectedProduct={setSelectedProduct} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default React.memo(FootwearCollection);