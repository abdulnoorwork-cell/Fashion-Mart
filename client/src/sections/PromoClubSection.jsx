import React from "react";
import { FaArrowRight } from "react-icons/fa6";

const promotions = [
  {
    id: 1,
    image: "/images/padel_club.webp",
    title: "ONE DEGREE PADEL CLUB",
    button: "JOIN NOW",
    subtitle: "EXCLUSIVELY 10% OFF",
  },
  {
    id: 2,
    image: "/images/gearup_gameon.webp",
    title: "GEAR UP, GAME ON",
    button: "JOIN NOW",
    description:
      "From early miles to late-night reps, street runs to gym floors, we move with you at every pace. Built for those who push one degree harder—step up, stay relentless, and give it All It Takes.",
  },
];

const PromoClubSection = () => {
  return (
    <section className="w-full bg-[#151515] text-white">

      {/* =====================================================
          PROMOTIONAL BANNERS
      ====================================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-2 w-full">

        {promotions.map((item) => (
          <div
            key={item.id}
            className="
              group
              relative
              h-full
              sm:h-[530px]
              2xl:h-[70vh]
              overflow-hidden
            "
          >

            {/* Background Image */}
            <img
              src={item.image}
              alt={item.title}
              className="
                absolute
                inset-0
                w-full
                h-full
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
                absolute
                inset-0
                bg-black/35
                transition-all
                duration-500
                group-hover:bg-black/45
              "
            />

            {/* Content */}
            <div
              className="
                absolute
                inset-0
                z-10
                flex
                flex-col
                items-center
                justify-center
                text-center
                px-6
              "
            >

              {/* Small Text */}
              {item.id === 2 && (
                <span
                  className="
                    text-[10px]
                    md:text-xs
                    uppercase
                    tracking-wider
                    mb-3
                  "
                >
                  Limited Edition
                </span>
              )}

              {/* Title */}
              <h2
                className="
                  text-3xl
                  sm:text-4xl
                  md:text-5xl
                  lg:text-4xl
                  xl:text-5xl
                  font-black
                  italic
                  uppercase
                  tracking-tight
                  mb-6
                  drop-shadow-lg
                "
              >
                {item.title}
              </h2>

              {/* Button */}
              <button
                className="
                  bg-white
                  text-black
                  px-8
                  py-3
                  sm:py-3.5
                  text-xs
                  md:text-sm
                  font-black
                  italic
                  uppercase
                  tracking-wide
                  transition-all
                  duration-300
                  hover:bg-black
                  hover:text-white
                  hover:scale-105
                "
              >
                {item.button}
              </button>

              {/* Subtitle */}
              {item.subtitle && (
                <p className="mt-4 text-xs uppercase">
                  {item.subtitle}
                </p>
              )}

              {/* Description */}
              {item.description && (
                <p
                  className="
                    max-w-2xl
                    mt-5
                    text-xs
                    md:text-sm
                    leading-6
                    text-white
                  "
                >
                  {item.description}
                </p>
              )}

            </div>
          </div>
        ))}

      </div>

    </section>
  );
};

export default PromoClubSection;