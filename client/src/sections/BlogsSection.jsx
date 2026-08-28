import React, { useContext } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import BlogCard from "../components/BlogCard";
import { AppContext } from "../context/AppContext";
import Heading from "../components/Heading";

const BlogsSection = () => {
  const { latestBlogs, navigate } = useContext(AppContext);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.96,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="pb-13 lg:pb-16">
      <div className="lg:px-12 md:px-10 sm:px-8 px-5">

        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <Heading heading="Latest Blogs" />
          </div>

          <motion.button
            onClick={() => {
              navigate("/blogs");
              scrollTo(0, 0);
            }}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="
              hidden md:flex
              items-center
              gap-2
              text-white
              hover:text-gray-300
              transition-colors
            "
          >
            View All <FaArrowRight />
          </motion.button>
        </motion.div>

        {/* Blog Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {latestBlogs.map((blog) => (
            <motion.div
              key={blog.id}
              variants={cardVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.25 },
              }}
            >
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Button */}
        <motion.div
          className="md:hidden flex justify-center mt-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            onClick={() => {
              navigate("/blogs");
              scrollTo(0, 0);
            }}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
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
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};

export default React.memo(BlogsSection);