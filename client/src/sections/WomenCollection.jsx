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

const WomenCollection = () => {
  const { backendUrl } = useContext(AppContext);
  const [selectedProduct, setSelectedProduct] = useState(null)

  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])

  const fetchCategoryProducts = async () => {
    try {
      setLoading(true)
      let response = await axios.get(`${backendUrl}/api/product/category-products/${'Women'}`, { withCredentials: true })
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
      <section className="py-13 lg:py-16">
        <div className="lg:px-12 md:px-10 sm:px-8 px-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Heading heading='Women Collection' />
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
            spaceBetween={16}
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 12
              },
              640: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
              1280: {
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

          {/* View All Button */}
          {/* <div className="flex justify-center mt-12">
          <button
            className="
              bg-white
              text-black
              px-10
              py-3
              sm:py-3.5
              font-black
              uppercase
              tracking-wide
              hover:bg-black
              hover:text-white
              border
              border-white
              transition
            "
          >
            View All
          </button>
        </div> */}

        </div>
      </section>
    </>
  );
};

export default React.memo(WomenCollection);