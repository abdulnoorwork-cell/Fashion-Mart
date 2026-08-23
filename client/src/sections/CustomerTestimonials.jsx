import React, { useContext } from "react";
import { FaStar } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css"
import "swiper/css/navigation"
import Heading from "../components/Heading";
import { AppContext } from "../context/AppContext";

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
  const { allReviews } = useContext(AppContext)
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
            1024: {
              slidesPerView: 2,
            }
          }}>
          {allReviews.map((review) => (
            <SwiperSlide
              key={review.id}
              className="h-auto"
            >
              <div className="space-y-6 text-white h-full">
                <div
                  key={review.id}
                  className="bg-[#222] border border-white/10 p-6 h-full"
                >
                  {/* User */}
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <img
                      src={
                        review.image?.url ||
                        "/images/profile_image.png"
                      }
                      alt=""
                      className="w-14 h-14 rounded-full object-cover"
                    />

                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <h4 className="font-semibold text-lg">
                            {review.name}
                          </h4>

                          <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded-full">
                            Verified Purchase
                          </span>

                          <p className="text-gray-500 text-sm mt-1">
                            {new Date(
                              review.created_at
                            ).toLocaleDateString()}
                          </p>
                        </div>

                        {/* Rating */}
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={
                                i < review.rating
                                  ? "opacity-100"
                                  : "opacity-20"
                              }
                            />
                          ))}
                        </div>
                      </div>

                      {/* Review Text */}
                      <p className="text-gray-300 mt-4 leading-6">
                        {review.review}
                      </p>

                      {/* Review Images */}
                      {review.images?.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-5">
                          {review.images.map((img, i) => (
                            <img
                              key={i}
                              src={img.url}
                              alt=""
                              className="w-full h-28 object-cover rounded-lg border border-white/10"
                            />
                          ))}
                        </div>
                      )}

                      {/* Admin Reply */}
                      {review.reply && (
                        <div className="mt-5 ml-4 border-l-4 border-[#E46254] pl-4 py-3 bg-black/30">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-red-500 px-2 py-1 text-xs font-semibold rounded">
                              ADMIN
                            </span>

                            <span className="text-gray-500 text-xs">
                              {new Date(
                                review.reply_created_at
                              ).toLocaleDateString()}
                            </span>
                          </div>

                          <p className="text-gray-300">
                            {review.reply}
                          </p>
                        </div>
                      )}
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