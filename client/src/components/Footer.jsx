import React from "react";

import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
  FaArrowRight,
} from "react-icons/fa6";

const aboutLinks = [
  "Our Journey",
  "Blogs",
  "Contact Us",
  "Happy Customers",
];

const quickLinks = [
  "Privacy Policy",
  "Refund Policy",
  "Store Location",
  "Shipping Information",
];

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black text-white">


      {/* ================================
          MAIN FOOTER
      ================================= */}

      <div className="border-b border-white/10">

        <div className="
          lg:px-12 md:px-10 sm:px-8 px-5
          py-16
          lg:py-20
        ">

          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-12
            lg:gap-16
            max-sm:text-center
          ">

            {/* ================================
                BRAND
            ================================= */}

            <div className="flex flex-col max-sm:items-center">

              {/* Logo */}
              <div className="mb-10">

                <img src="/images/logo.webp" alt="logo" />

              </div>

              {/* Heading */}
              <h3 className="
                text-white
                md:text-base
                font-black
                italic
                uppercase
                mb-6
              ">
                We are the best activewear brand in Pakistan.
              </h3>

              {/* Description */}
              <p className="
                max-w-xl
                text-gray-300
                leading-7
              ">
                Pushing boundaries with high-performance activewear
                designed for athletes and everyday champions.
              </p>

            </div>


            {/* ================================
                ABOUT
            ================================= */}

            <div>

              <h3 className="
              text-lg
                font-black
                italic
                uppercase
                mb-7
              ">
                About
              </h3>

              <ul className="space-y-4">

                {aboutLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="
                        text-sm
                        text-gray-300
                        hover:text-white
                        transition-colors
                      "
                    >
                      {link}
                    </a>
                  </li>
                ))}

              </ul>

            </div>


            {/* ================================
                QUICK LINKS
            ================================= */}

            <div>

              <h3 className="
              text-lg
                font-black
                italic
                uppercase
                mb-7
              ">
                Quick Links
              </h3>

              <ul className="space-y-4">

                {quickLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="
                        text-sm
                        text-gray-300
                        hover:text-white
                        transition-colors
                      "
                    >
                      {link}
                    </a>
                  </li>
                ))}

              </ul>

            </div>

            {/* ================================
              NEWSLETTER
          ================================= */}

            <div className="
            flex flex-col
            gap-10
          ">

              <div>

                <h3 className="
                text-lg
                font-black
                italic
                uppercase
                mb-4
              ">
                  Newsletter
                </h3>

                <p className="
                text-gray-300
              ">
                  Sign up for exclusive offers, original stories,
                  events and more.
                </p>

              </div>


              {/* Newsletter */}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="w-full"
              >

                <div className="
                flex
                items-center
                border
                border-white/20
                focus-within:border-white/50
                transition
              ">

                  <input
                    type="email"
                    placeholder="Your email"
                    className="
                    w-full
                    bg-transparent
                    outline-none
                    px-5
                    py-4
                    text-sm
                    text-white
                    placeholder:text-gray-500
                  "
                  />

                  <button
                    type="submit"
                    className="
                    px-5
                    text-gray-300
                    hover:text-white
                    transition
                  "
                  >
                    <FaArrowRight size={18} />
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      </div>


      {/* ================================
          SOCIAL MEDIA
      ================================= */}

      <div className="
        flex
        justify-center
        items-center
        gap-6
        py-6
        border-b
        border-white/10
      ">

        {/* Facebook */}
        <a
          href="#"
          aria-label="Facebook"
          className="
            text-white
            hover:text-gray-400
            transition
          "
        >
          <FaFacebookF size={18} />
        </a>


        {/* YouTube */}
        <a
          href="#"
          aria-label="YouTube"
          className="
            text-white
            hover:text-gray-400
            transition
          "
        >
          <FaYoutube size={20} />
        </a>


        {/* Instagram */}
        <a
          href="#"
          aria-label="Instagram"
          className="
            text-white
            hover:text-gray-400
            transition
          "
        >
          <FaInstagram size={20} />
        </a>


        {/* X */}
        <a
          href="#"
          aria-label="X"
          className="
            text-white
            hover:text-gray-400
            transition
          "
        >
          <FaXTwitter size={19} />
        </a>


        {/* LinkedIn */}
        <a
          href="#"
          aria-label="LinkedIn"
          className="
            text-white
            hover:text-gray-400
            transition
          "
        >
          <FaLinkedinIn size={19} />
        </a>

      </div>


      {/* ================================
          COPYRIGHT + PAYMENTS
      ================================= */}

      <div className="
        max-w-[1600px]
        mx-auto
        px-6
        md:px-10
        lg:px-12
        py-5
      ">

        <div className="
          flex
          flex-col-reverse
          md:flex-row
          items-center
          justify-between
          gap-5
        ">

          {/* Copyright */}
          <p className="max-sm:text-center text-sm text-gray-300">
            © 2026 by Abdul Noor. All rights researved.
          </p>


          {/* Payment Methods */}
          <div className="
            flex
            items-center
            gap-4
            flex-wrap
            justify-center
          ">

            <span className="text-sm font-bold text-gray-400">
              JazzCash
            </span>

            <span className="text-sm font-bold text-gray-400">
              easypaisa
            </span>

            <span className="text-sm font-bold text-gray-400">
              foodpanda
            </span>

            <span className="text-sm font-bold text-gray-400">
              Mastercard
            </span>

            <span className="
              text-xl
              font-bold
              italic
              text-gray-400
            ">
              VISA
            </span>

            <span className="text-sm font-bold text-gray-400">
              PayPak
            </span>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;