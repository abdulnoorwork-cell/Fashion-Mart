import React, { useContext } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { AppContext } from '../context/AppContext'

const BlogCard = ({blog}) => {
    const {navigate} = useContext(AppContext);
    return (
        <article
            onClick={()=>{navigate(`/blogs/${blog.category}/${blog.title}/${blog?.id}`);scrollTo(0,0)}}
            key={blog.id}
            className="
                bg-[#222]
                overflow-hidden
                h-full
                border
                border-white/10
                hover:border-white/30
                transition-all
                duration-300
                group
              "
        >
            {/* Image */}
            <div className="overflow-hidden">
                <img
                    src={blog.image?.url}
                    alt={blog.title}
                    className="
                    w-full
                    h-full
                    sm:h-[35vh]
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-110
                  "
                />
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                    <span
                        className="
                      bg-white
                      text-black
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      uppercase
                    "
                    >
                        {blog.category}
                    </span>

                    <span className="text-gray-400 text-sm font-medium">
                        {new Date(blog.created_at).toDateString()}
                    </span>
                </div>

                <div
                    className="
                    text-white
                    text-xl
                    sm:text-2xl
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

                <p className="text-gray-400 mb-6 line-clamp-3">
                    {blog.description}
                </p>

                <button
                    onClick={()=>{navigate(`/blogs/${blog.category}/${blog.title}/${blog?.id}`);scrollTo(0,0)}}
                    className="
                    flex
                    items-center
                    gap-1.5
                    bg-white
                    text-black
                    px-5 py-2.5
                    font-semibold
                    hover:gap-3
                    transition-all
                  "
                >
                    Read More
                    <FaArrowRight />
                </button>
            </div>
        </article>
    )
}

export default BlogCard