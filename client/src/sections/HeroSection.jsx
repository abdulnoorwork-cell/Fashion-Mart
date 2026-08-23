import React, { useContext, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FadeUp from '../components/FadeUp'
import { AnimatePresence, motion } from "motion/react";
import {AppContext} from '../context/AppContext'

const slides = [
  {
    id: 1,
    image: "/images/slide-img-1.webp",
    title: "Elevate Your Everyday Style",
    description:
      "Discover premium fashion crafted for comfort, confidence, and modern living.",
    buttonText: "Shop Collection",
    link: '/shop'
  },
  {
    id: 2,
    image: "/images/slide-img-2.webp",
    title: "Performance Meets Comfort",
    description:
      "Explore activewear designed to keep up with your lifestyle and every movement.",
    buttonText: "Shop Activewear",
    link: '/shop'
  },
  {
    id: 3,
    image: "/images/slide-img-5.jpg",
    title: "New Season, New Arrivals",
    description:
      "Refresh your wardrobe with the latest trends and timeless essentials.",
    buttonText: "Explore Now",
    link: '/shop'
  },
  {
    id: 4,
    image: "/images/slide-img-3.webp",
    title: "Exclusive Summer Sale",
    description:
      "Enjoy special offers on our best-selling collections for a limited time.",
    buttonText: "Shop Sale",
    link: '/shop'
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const {navigate} = useContext(AppContext)

  const changeSlide = (newIndex) => {
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrent(newIndex);
    }, 350);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const nextSlide = () => {
    const nextIndex = (current + 1) % slides.length;
    changeSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex =
      current === 0 ? slides.length - 1 : current - 1;
    changeSlide(prevIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (current + 1) % slides.length;
      changeSlide(nextIndex);
    }, 4000);

    return () => clearInterval(timer);
  }, [current]);

  return (
    <section className="relative w-full h-[90vh] overflow-hidden">
      {/* Background Images */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full h-full"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Default Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Dark Transition Overlay */}
      <div
        className={`absolute inset-0 bg-black z-20 pointer-events-none transition-opacity duration-700 ${isTransitioning ? "opacity-80" : "opacity-0"
          }`}
      />

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 z-20 flex items-center justify-center"
        >
          <div className="max-w-3xl text-center px-6">
            <span className="inline-block mb-4 uppercase tracking-[5px] max-sm:text-sm text-white">
              New Collection
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl sm:mb-6 mb-5">
              {slides[current].title}
            </h1>

            <p className="text-base md:text-lg text-gray-200 mb-8 max-w-xl mx-auto">
              {slides[current].description}
            </p>

            <button
            onClick={()=>{navigate(`${slides[current].link}`);scrollTo(0,0)}}
            className="min-w-[180px] px-8 py-3 sm:py-3.5 tracking-wide bg-amber-500 text-black hover:bg-white transition duration-200">
              {slides[current].buttonText}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="cursor-pointer absolute left-6 top-1/2 -translate-y-1/2 z-20 sm:w-12 sm:h-12 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="cursor-pointer absolute right-6 top-1/2 -translate-y-1/2 z-20 sm:w-12 sm:h-12 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => changeSlide(index)}
            className={`cursor-pointer rounded-full transition-all duration-300 ${current === index
              ? "w-8 h-2 bg-white"
              : "w-2 h-2 bg-white/50"
              }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;