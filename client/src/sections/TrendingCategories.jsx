import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Heading from "../components/Heading";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const categories = [
    {
        id: 1,
        title: "APPAREL",
        image: "/images/apparel-category.webp",
        link: '/collection/apparel'
    },
    {
        id: 2,
        title: "GYMWEAR",
        image: "/images/gymwear-category.webp",
        link: '/collection/gymwear'
    },
    {
        id: 3,
        title: "FOOTWEAR",
        image: "/images/footwear-category.webp",
        link: '/collection/footwear'
    },
    {
        id: 4,
        title: "ACTIVEWEAR",
        image: "/images/activewear-category.webp",
        link: '/collection/activewear'
    },
];

const promotions = [
    {
        id: 1,
        image: "/images/men-category-banner.webp",
        button: "SHOP MEN",
        link: "/collection/men",
    },
    {
        id: 2,
        image: "/images/women-category-banner.webp",
        button: "SHOP WOMEN",
        link: "/collection/women",
    },
];

export default function TrendingCategories() {
    const {navigate} = useContext(AppContext)
    return (
        <section className="pt-13 lg:pt-16 space-y-12">
            <div className="lg:px-12 md:px-10 sm:px-8 px-5">
                {/* Heading */}
                <Heading heading='Trending Categories' />

                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categories.map((item) => (
                        <div
                            key={item.id}
                            onClick={()=>{navigate(`${item.link}`);scrollTo(0,0)}}
                            className="group relative overflow-hidden bg-black cursor-pointer"
                        >
                            {/* Image */}
                            <div className="overflow-hidden h-full lg:h-[440px] 2xl:h-[60vh]">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                                />
                            </div>

                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition duration-500" />

                            {/* Bottom Content */}
                            <div className="absolute bottom-0 left-0 right-0 z-10">
                                <div className="flex items-center justify-between px-5 py-4 bg-black/50 backdrop-blur-sm">
                                    <h3 className="text-white text-lg sm:text-xl md:text-2xl font-black italic">
                                        {item.title}
                                    </h3>

                                    <ArrowRight
                                        size={26}
                                        className="text-white transition-transform duration-300 group-hover:translate-x-2"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ================================
          PROMOTIONAL BANNERS
      ================================= */}

            <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
                {promotions.map((item) => (
                    <Link
                        to={item.link}
                        onClick={()=>{scrollTo(0,0)}}
                        key={item.id}
                        className="group relative 
              h-full
              sm:h-[530px]
              2xl:h-[70vh] overflow-hidden"
                    >
                        {/* Image */}
                        <img
                            src={item.image}
                            alt={item.button}
                            className="
                w-full h-full
                object-cover
                transition-transform
                duration-1000
                ease-out
                group-hover:scale-105
              "
                        />

                        {/* Dark Overlay */}
                        <div
                            className="
                absolute inset-0
                bg-black/35
                transition-all
                duration-500
                group-hover:bg-black/45
              "
                        />

                        {/* Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <button
                                className="
                  relative
                  px-7 py-3 sm:py-3.5
                  bg-white
                  text-black
                  text-sm
                  font-black
                  italic
                  tracking-wide
                  transition-all
                  duration-300
                  group-hover:bg-black
                  group-hover:text-white
                  group-hover:scale-105
                  min-w-[165px]
                "
                            >
                                {item.button}
                            </button>
                        </div>
                    </Link>
                ))}
            </div>

        </section>
    );
}