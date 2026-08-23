import React from "react";
import { FaStar } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css"
import "swiper/css/navigation"
import Heading from "../components/Heading";

const testimonials = [
  {
    id: 1,
    name: "Ahmed Khan",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzVRVcZrCYz6YguqgD_cLlssd3dr3ymolkJM1cHnWSwA&s=10",
    productImage:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    productName: "Black Curve Nova",
    review:
      "The quality exceeded my expectations. The fabric feels premium and the fit is perfect. Definitely ordering again.",
    rating: 5,
  },
  {
    id: 2,
    name: "Usman Ali",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzVRVcZrCYz6YguqgD_cLlssd3dr3ymolkJM1cHnWSwA&s=10",
    productImage:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600",
    productName: "Flite Prima",
    review:
      "Fast delivery and excellent customer service. One of the best activewear brands I have tried.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ali Raza",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzVRVcZrCYz6YguqgD_cLlssd3dr3ymolkJM1cHnWSwA&s=10",
    productImage:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600",
    productName: "Ultrex 360",
    review:
      "Very comfortable and stylish. Great for workouts and everyday wear. Highly recommended.",
    rating: 5,
  },
  {
    id: 4,
    name: "Ahmed Khan",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzVRVcZrCYz6YguqgD_cLlssd3dr3ymolkJM1cHnWSwA&s=10",
    productImage:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    productName: "Black Curve Nova",
    review:
      "The quality exceeded my expectations. The fabric feels premium and the fit is perfect. Definitely ordering again.",
    rating: 5,
  },
  {
    id: 5,
    name: "Ahmed Khan",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzVRVcZrCYz6YguqgD_cLlssd3dr3ymolkJM1cHnWSwA&s=10",
    productImage:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    productName: "Black Curve Nova",
    review:
      "The quality exceeded my expectations. The fabric feels premium and the fit is perfect. Definitely ordering again.",
    rating: 5,
  },
  {
    id: 6,
    name: "Usman Ali",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzVRVcZrCYz6YguqgD_cLlssd3dr3ymolkJM1cHnWSwA&s=10",
    productImage:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600",
    productName: "Flite Prima",
    review:
      "Fast delivery and excellent customer service. One of the best activewear brands I have tried.",
    rating: 5,
  },
];

const CustomerTestimonials = () => {
  return (
    <section className="sm:py-13 sm:lg:py-16 pb-13">
      <div className="lg:px-12 md:px-10 sm:px-8 px-5">
        {/* Heading */}
        <div className="text-center">
          <Heading heading='What Our Customers Say' />
        </div>

        {/* Testimonial Cards */}
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{
            delay: 2000,
            disableOnInteraction: false
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
              slidesPerView: 3
            },
            1280: {
              slidesPerView: 4,
            },
          }}>
          {testimonials.map((item) => (
            <SwiperSlide
              key={item.id}
              className="h-auto"
            >
              <div className="bg-[#222]
      border border-white/10
      overflow-hidden
      h-full
      flex flex-col
      hover:border-white/30
      hover:-translate-y-2
      transition-all
      duration-300">
                {/* Product Image */}
                <div className="bg-gray-200 overflow-hidden">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-500
                    hover:scale-110
                  "
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Product Name */}
                  <h3 className="text-white text-xl font-bold mb-4">
                    {item.productName}
                  </h3>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(item.rating)].map((_, index) => (
                      <FaStar
                        key={index}
                        className="text-yellow-400"
                        size={16}
                      />
                    ))}
                  </div>

                  {/* Review */}
                  <p className="text-gray-300 mb-6 line-clamp-4">
                    "{item.review}"
                  </p>

                  {/* Customer */}
                  <div className="mt-auto flex items-center gap-4 pt-5 border-t border-white/10">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="2xl:w-14 2xl:h-14 w-12 h-12 rounded-full object-cover"
                    />

                    <div>
                      <h4 className="text-white font-semibold">
                        {item.name}
                      </h4>

                      <p className="text-gray-500 text-sm">
                        Verified Customer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default React.memo(CustomerTestimonials);