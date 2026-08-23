import React, { useContext, useState } from "react";
import { FaSearch, FaArrowRight } from "react-icons/fa";
import BlogCard from "../components/BlogCard";
import { AppContext } from "../context/AppContext";
import FadeUp from '../components/FadeUp'

const categories = [
  "All",
  "Fitness",
  "Fashion",
  "LifeStyle",
  "Footwear",
];

const Blogs = () => {
  const { blogs, navigate } = useContext(AppContext)
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage = 6;

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(
    filteredBlogs.length / blogsPerPage
  );

  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;

  const currentBlogs = filteredBlogs.slice(
    startIndex,
    endIndex
  );
  return (
    <section className="text-white">
      {/* Hero Section */}
      <div className="relative h-[300px]">
        <img
          src="/images/blogs-banner.jpg"
          alt=""
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-5">
          <h1 className="text-4xl md:text-6xl font-black uppercase italic">
            Our Blog
          </h1>

          <p className="max-w-3xl text-gray-300 mt-3 sm:mt-4">
            Discover fitness tips, fashion insights, product guides,
            and lifestyle inspiration from our experts.
          </p>
        </div>
      </div>

      <div className="px-5 md:px-8 lg:px-12 py-13 min-h-screen">
        {/* Search + Categories */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between mb-14">
          {/* Search */}
          <div className="relative max-w-md w-full h-fit">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1) }}
              placeholder="Search blogs..."
              className="
                 w-full
    bg-[#222]
    border border-white/10
    2xl:py-4 py-3.5 pl-12 pr-4
    outline-none
    focus:border-white/30
              "
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => { setSelectedCategory(category); setCurrentPage(1) }}
                className={`
      px-5 py-3 border transition
      ${selectedCategory === category
                    ? "bg-white text-black border-white"
                    : "bg-[#222] border-white/10 hover:border-white/30"
                  }
    `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Blog */}
        <div className="grid lg:grid-cols-2 sm:gap-10 gap-8 items-center mb-16 lg:mb-20">
          <FadeUp>
            <img
              src={blogs[0]?.image?.url}
              onClick={()=>{navigate(`/blogs/${blogs[0]?.category}/${blogs[0]?.id}`);scrollTo(0,0)}}
              alt={blogs[0]?.image?.title}
              className="w-full h-full object-cover"
            />
          </FadeUp>

          <FadeUp delay={0.2}>
            <span className="bg-white text-black px-4 py-2 text-xs uppercase font-bold">
              Featured
            </span>

            <h2 onClick={()=>{navigate(`/blogs/${blogs[0]?.category}/${blogs[0]?.id}`);scrollTo(0,0)}} className="text-3xl sm:text-4xl 2xl:text-5xl font-black mt-6 mb-6 line-clamp-3">
              {blogs[0]?.title}
            </h2>

            <p className="text-gray-400 sm:leading-7 mb-7 line-clamp-5">
              {blogs[0]?.description}
            </p>

            <button onClick={()=>{navigate(`/blogs/${blogs[0]?.category}/${blogs[0]?.id}`);scrollTo(0,0)}} className="flex items-center gap-3 font-semibold hover:gap-5 transition-all">
              Read Article
              <FaArrowRight />
            </button>
          </FadeUp>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {currentBlogs.map((blog, index) => (
            <FadeUp key={blog.id} delay={index * 0.2}>
              <BlogCard key={blog.id} blog={blog} />
            </FadeUp>
          ))}
        </div>

        {/* Results Info */}
        <div className="mt-12 text-center text-gray-400">
          Showing{" "}
          <span className="text-white font-semibold">
            {filteredBlogs.length === 0 ? 0 : startIndex + 1}
          </span>
          -
          <span className="text-white font-semibold">
            {Math.min(endIndex, filteredBlogs.length)}
          </span>{" "}
          of{" "}
          <span className="text-white font-semibold">
            {filteredBlogs.length}
          </span>{" "}
          articles
        </div>

        {/* Professional Pagination */}
        {totalPages > 1 && <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">

          {/* Previous */}
          <button
            disabled={currentPage === 1}
            onClick={() => { setCurrentPage((prev) => prev - 1); scrollTo(0, 0) }}
            className="
      px-5 py-3
      bg-[#222]
      border border-white/10
      hover:border-white/30
      disabled:opacity-40
      disabled:cursor-not-allowed
      transition
    "
          >
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((page) => (
            <button
              key={page}
              onClick={() => { setCurrentPage(page); scrollTo(0, 0) }}
              className={`
        w-12 h-12
        font-semibold
        transition
        ${currentPage === page
                  ? "bg-white text-black"
                  : "bg-[#222] border border-white/10 hover:border-white/30"
                }
      `}
            >
              {page}
            </button>
          ))}

          {/* Next */}
          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => { setCurrentPage((prev) => prev + 1); scrollTo(0, 0) }}
            className="
      px-5 py-3
      bg-[#222]
      border border-white/10
      hover:border-white/30
      disabled:opacity-40
      disabled:cursor-not-allowed
      transition
    "
          >
            Next
          </button>

        </div>}

      </div>
    </section>
  );
};

export default Blogs;