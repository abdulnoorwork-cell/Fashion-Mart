import React, { useContext } from "react";
import { FaArrowRight } from "react-icons/fa";
import BlogCard from "../components/BlogCard";
import { AppContext } from "../context/AppContext";
import FadeUp from "../components/FadeUp";
import Heading from "../components/Heading";

const BlogsSection = () => {
  const { latestBlogs, navigate } = useContext(AppContext);
  return (
    <section className="pb-16 lg:pb-20">
      <div className="lg:px-12 md:px-10 sm:px-8 px-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Heading heading='Latest Blogs' />
          </div>

          <button
            onClick={() => { Navigate('/blogs'); scrollTo(0, 0) }}
            className="
              hidden md:flex
              items-center
              gap-2
              text-white
              hover:text-gray-300
              transition
            "
          >
            View All <FaArrowRight />
          </button>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestBlogs.map((blog,index) => (
            <FadeUp key={blog.id} delay={index*0.2}>
              <BlogCard key={blog.id} blog={blog} />
            </FadeUp>
          ))}
        </div>

        {/* Mobile Button */}
        <div className="md:hidden flex justify-center mt-10">
          <button
            className="
              bg-white
              text-black
              px-8
              py-3
              font-bold
              uppercase
            "
          >
            View All Blogs
          </button>
        </div>
      </div>
    </section>
  );
};

export default React.memo(BlogsSection);