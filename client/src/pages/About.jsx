import React from "react";
import {
  FaAward,
  FaUsers,
  FaShippingFast,
  FaTshirt,
} from "react-icons/fa";
import FadeUp from '../components/FadeUp'
import Heading from '../components/Heading'

const features = [
  {
    id: 1,
    name: "Premium Quality",
    description: "High-performance fabrics built for comfort and durability.",
    icon: <FaTshirt />
  },
  {
    id: 2,
    name: "Fast Delivery",
    description: "Reliable shipping to ensure your orders arrive on time.",
    icon: <FaShippingFast />
  },
  {
    id: 3,
    name: "Trusted Brand",
    description: "Thousands of athletes and customers trust our products.",
    icon: <FaUsers />
  },
  {
    id: 4,
    name: "Proven Excellence",
    description: "Designed with quality and customer satisfaction in mind.",
    icon: <FaAward />
  },
]

const team = [
  {
    name: "Abdul Noor",
    role: "Founder & Developer",
    image:
      "/images/team-1.jpg",
  },
  {
    name: "Sarah Ahmed",
    role: "Marketing Manager",
    image:
      "/images/team-2.jpg",
  },
  {
    name: "Ali Khan",
    role: "Operations Manager",
    image:
      "/images/team-3.jpg",
  },
]

const About = () => {
  return (
    <section className="text-white">
      {/* Hero Section */}
      <div className="relative h-[300px]">
        <img
          src="/images/about-banner.jpg"
          alt="About Us"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
          <h1 className="text-4xl md:text-6xl font-black uppercase italic">
            About Us
          </h1>

          <p className="max-w-3xl text-gray-300 mt-3 sm:mt-4">
            Premium activewear designed for athletes,
            fitness enthusiasts, and everyday champions.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <FadeUp>
              <h6 className="text-gray-400 uppercase tracking-widest">
                Our Story
              </h6>

              <h2 className="text-4xl md:text-5xl font-black italic mt-4 mb-8">
                Built For Performance
              </h2>

              <p className="text-gray-400 leading-8 mb-6">
                We started with one mission: create premium activewear
                that combines style, comfort, and performance.
              </p>

              <p className="text-gray-400 leading-8">
                Every product is designed to help people push their
                limits, whether they are training in the gym, running
                outdoors, or simply living an active lifestyle.
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <img
                src="/images/about-image.jpg"
                alt=""
                className="w-full h-full"
              />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-20 bg-[#1d1d1d]">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="text-4xl sm:text-5xl font-black">50K+</h3>
              <p className="text-gray-400 mt-3">
                Happy Customers
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-4xl sm:text-5xl font-black">100K+</h3>
              <p className="text-gray-400 mt-3">
                Orders Delivered
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-4xl sm:text-5xl font-black">4.9</h3>
              <p className="text-gray-400 mt-3">
                Customer Rating
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-4xl sm:text-5xl font-black">98%</h3>
              <p className="text-gray-400 mt-3">
                Satisfaction Rate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center">
            <Heading heading={'Why Choose Us'} />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, index) => (
              <FadeUp delay={index * 0.2}>
                <div key={item.id} className="bg-[#222] p-8 border border-white/10 h-full">
                  <span className="text-4xl">{item.icon}</span>

                  <h3 className="text-xl font-bold mb-3 mt-6">
                    {item.name}
                  </h3>

                  <p className="text-gray-400">
                    {item.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-20 bg-[#1d1d1d]">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center">
            <Heading heading={'Meet Our Team'} />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <FadeUp key={index} delay={index * 0.2}>
                <div
                  key={index}
                  className="bg-[#222] overflow-hidden"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-[350px] sm:h-[400px] object-cover"
                  />

                  <div className="p-6 text-center">
                    <h3 className="text-2xl font-bold">
                      {member.name}
                    </h3>

                    <p className="text-gray-400 mt-2">
                      {member.role}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24">
        <FadeUp>
          <div className="max-w-4xl mx-auto text-center px-5">
            <h2 className="text-4xl md:text-5xl font-black italic uppercase">
              Join Our Journey
            </h2>

            <p className="text-gray-400 mt-5 mb-9">
              Discover premium products designed for performance,
              comfort, and everyday success.
            </p>

            <button className="bg-white text-black px-10 py-3.5 font-bold uppercase hover:bg-gray-200 transition">
              Shop Collection
            </button>
          </div>
        </FadeUp>
      </section>
    </section>
  );
};

export default About;