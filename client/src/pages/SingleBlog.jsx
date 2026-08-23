import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaArrowRight,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import FadeUp from "../components/FadeUp";

const SingleBlog = () => {
  const [blog, setBlog] = useState([]);
  const [relatedBlogs, setRelatedBlogs] = useState([])
  const { id } = useParams();
  const { backendUrl, blogs } = useContext(AppContext)
  const fetchBog = async () => {
    try {
      let response = await axios.get(`${backendUrl}/api/blog/blog-detail/${id}`, { withCredentials: true });
      if (response.data) {
        setBlog(response.data);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchRelatedBlogs = async () => {
    try {
      let response = await axios.post(`${backendUrl}/api/blog/related-blogs`, { category: blog.category }, { withCredentials: true })
      if (response.data) {
        setRelatedBlogs(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchBog();
  }, [id])

  useEffect(() => {
    if (blog.category) {
      fetchRelatedBlogs()
    }
  }, [blog.category])

  const cleanHTML = blog?.description
    ?.replace(/style="[^"]*color:[^";]+;?[^"]*"/gi, "")
    ?.replace(/color:[^;"]+;?/gi, "");
  return (
    <section className="text-white">
      {/* Hero Section */}

      <div className="relative">

        <div className="flex flex-col items-center justify-center text-center px-5 py-14 max-w-4xl mx-auto">
          <span className="bg-white text-black px-4 py-2 text-xs font-bold uppercase">
            {blog?.category}
          </span>
          <h1 className="text-4xl md:text-5xl 2xl:text-6xl font-black uppercase italic mt-6">
            {blog?.title}
          </h1>

          <div className="flex justify-center gap-5 mt-6 text-gray-300 max-sm:text-sm">
            <span>By Abdul Noor</span>
            <span>•</span>
            <span>August 14, 2026</span>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="max-w-7xl mx-auto px-5 pb-16 lg:pb-20 min-h-screen">
        <img
          src={blog?.image?.url}
          alt={blog?.title}
          className="w-full h-full object-cover mb-10"
        />

        <div className="space-y-8 text-gray-300 leading-7" dangerouslySetInnerHTML={{ __html: cleanHTML }}>
        </div>

        {/* Tags */}
        <div className="mt-14 flex flex-wrap gap-3">
          <span className="bg-[#222] px-4 py-2">Fitness</span>
          <span className="bg-[#222] px-4 py-2">Running</span>
          <span className="bg-[#222] px-4 py-2">Lifestyle</span>
          <span className="bg-[#222] px-4 py-2">Training</span>
        </div>

        {/* Share */}
        <div className="mt-14 border-t border-white/10 pt-8">
          <h3 className="text-xl font-bold mb-4">
            Share This Article
          </h3>

          <div className="flex gap-4">
            <button className="w-12 h-12 bg-[#222] flex items-center justify-center">
              <FaFacebookF />
            </button>

            <button className="w-12 h-12 bg-[#222] flex items-center justify-center">
              <FaTwitter />
            </button>

            <button className="w-12 h-12 bg-[#222] flex items-center justify-center">
              <FaLinkedinIn />
            </button>
          </div>
        </div>
      </div>

      {/* Related Blogs */}
      <section className="py-16 lg:py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-4xl font-black italic uppercase text-center mb-14">
            Related Articles
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedBlogs.map((blog, index) => (
              <FadeUp key={blog.id} delay={index * 0.2}>
                <div
                  key={blog.id}
                  className="
                  bg-[#222]
                  overflow-hidden
                  border
                  border-white/10
                  group
                "
                >
                  <div className="overflow-hidden">
                    <img
                      src={blog.image?.url}
                      alt={blog.title}
                      className="
                      w-full
                      h-72
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-110
                    "
                    />
                  </div>

                  <div className="p-6">
                    <div
                      className="
                    text-white
                    text-xl
                    mb-4
                    group-hover:text-gray-300
                    transition
                    line-clamp-3
                    cursor-pointer
                    font-bold
                    uppercase
                    italic
                  "
                    >
                      {blog.title}
                    </div>

                    <button className="flex items-center gap-3 hover:gap-5 transition-all">
                      Read More
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default SingleBlog;