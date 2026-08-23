import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Contact = () => {
  
  return (
    <section className="min-h-screen text-white">
      {/* Hero Section */}
      <div className="relative h-[300px] flex items-center justify-center">
        <img
          src="/images/contact-banner.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative text-center px-5">
          <h1 className="text-4xl md:text-6xl font-black uppercase italic">
            Contact Us
          </h1>

          <p className="max-w-3xl text-gray-300 mt-3 sm:mt-4">
            Have questions about our products or services? We'd love to hear
            from you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto lg:px-12 md:px-8 px-5 py-13 lg:py-16">
        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <div className="bg-[#222] p-8 border border-white/10 text-center">
            <FaPhoneAlt className="mx-auto text-3xl mb-4" />

            <h3 className="font-bold text-xl mb-2">
              Call Us
            </h3>

            <p className="text-gray-400">
              +92 319 7453657
            </p>
          </div>

          <div className="bg-[#222] p-8 border border-white/10 text-center">
            <FaEnvelope className="mx-auto text-3xl mb-4" />

            <h3 className="font-bold text-xl mb-2">
              Email Us
            </h3>

            <p className="text-gray-400">
              abdulnoorwork@gmail.com
            </p>
          </div>

          <div className="bg-[#222] p-8 border border-white/10 text-center">
            <FaMapMarkerAlt className="mx-auto text-3xl mb-4" />

            <h3 className="font-bold text-xl mb-2">
              Visit Us
            </h3>

            <p className="text-gray-400">
              Haripur, KPK, Pakistan
            </p>
          </div>
        </div>

        {/* Form + Info */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-[#222] p-8 border border-white/10">
            <h2 className="text-3xl font-bold mb-8">
              Send Message
            </h2>

            <form className="space-y-6" action="https://api.web3forms.com/submit" method="POST">
              <input type="hidden" name="access_key" value="44a0df73-c478-46b6-af8f-27518e08c08e" />
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  className="
                    w-full
                    bg-[#151515]
                    border
                    border-white/10
                    px-5
                    py-4
                    outline-none
                    focus:border-white
                  "
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="
                    w-full
                    bg-[#151515]
                    border
                    border-white/10
                    px-5
                    py-4
                    outline-none
                    focus:border-white
                  "
                  required
                />
              </div>

              <div>
                <input
                  type="number"
                  name="phone"
                  placeholder="Phone"
                  className="
                    w-full
                    bg-[#151515]
                    border
                    border-white/10
                    px-5
                    py-4
                    outline-none
                    focus:border-white
                  "
                  required
                />
              </div>

              <div>
                <textarea
                  name="message"
                  rows="6"
                  placeholder="Your Message"
                  className="
                    w-full
                    bg-[#151515]
                    border
                    border-white/10
                    px-5
                    py-4
                    outline-none
                    resize-none
                    focus:border-white
                  "
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="
                  bg-white
                  text-black
                  px-10
                  py-4
                  font-bold
                  uppercase
                  hover:bg-gray-200
                  transition
                "
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold mb-8">
              Get In Touch
            </h2>

            <p className="text-gray-400 leading-8 mb-10">
              Our team is always ready to assist you with product inquiries,
              order support, partnerships, or any questions about our brand.
            </p>

            <div className="space-y-6">
              <div className="border-b border-white/10 pb-6">
                <h3 className="font-semibold text-xl mb-2">
                  Customer Support
                </h3>

                <p className="text-gray-400">
                  Available Monday - Saturday
                </p>

                <p className="text-gray-400">
                  9:00 AM - 6:00 PM
                </p>
              </div>

              <div className="border-b border-white/10 pb-6">
                <h3 className="font-semibold text-xl mb-2">
                  Office Address
                </h3>

                <p className="text-gray-400">
                  Haripur, Khyber Pakhtunkhwa,
                  Pakistan
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-4">
                  Follow Us
                </h3>

                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-12 h-12 border border-white/10 flex items-center justify-center hover:border-white"
                  >
                    <FaFacebookF />
                  </a>

                  <a
                    href="#"
                    className="w-12 h-12 border border-white/10 flex items-center justify-center hover:border-white"
                  >
                    <FaInstagram />
                  </a>

                  <a
                    href="#"
                    className="w-12 h-12 border border-white/10 flex items-center justify-center hover:border-white"
                  >
                    <FaLinkedinIn />
                  </a>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-10 bg-[#222] border border-white/10 flex items-center justify-center">
              <iframe
                title="map"
                width="100%"
                height="350"
                loading="lazy"
                src="https://maps.google.com/maps?q=karachi&t=&z=13&ie=UTF8&iwloc=&output=embed"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;