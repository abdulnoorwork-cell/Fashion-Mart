import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import axios from 'axios';
import profile_image from '../../../public/images/profile_image.png'
import { AiFillStar } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa6";
import toast from 'react-hot-toast';
import DashboardNavbar from './DashboardNavbar';
import {X} from 'lucide-react'

const Reviews = () => {
    const [model, setModel] = useState(false)
    const [singleReview, setSingleReview] = useState([]);
    const [reply, setReply] = useState('')
    const [replyLoading, setReplyLoading] = useState(false);
    const { backendUrl, isAdmin, currency, fetchAllReviews, loading, allReviews } = useContext(AppContext);

    const fetchSingleReview = async (review_id) => {
        try {
            let response = await axios.get(`${backendUrl}/api/review/get-single-review/${review_id}`, {
                headers: {
                    Authorization: `${isAdmin}`
                },
                withCredentials: true
            })
            if (response.data) {
                setModel(true)
                setSingleReview(response.data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleReply = async (review_id) => {
        try {
            setReplyLoading(true)
            let response = await axios.post(`${backendUrl}/api/review/reply/add`, { review_id, reply }, {
                headers: {
                    Authorization: `${isAdmin}`
                },
                withCredentials: true
            })
            if (response.data.success) {
                toast.success(response.data.messege)
                setReply('')
                setModel(false)
                setReplyLoading(false);
                fetchAllReviews()
            }
            setReplyLoading(false)
        } catch (error) {
            console.log(error)
            setReplyLoading(false)
            toast.error(error.response.data.messege)
        }
    }

    return (
        <div className='flex-1 min-h-screen'>
            <DashboardNavbar />
            <div className='p-4 md:p-6 lg:p-8 text-gray-800'>
                <div className='flex flex-col w-full'>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h3 className="text-3xl font-bold">
                                Customer Reviews
                            </h3>
                            <p className="text-gray-500 mt-1">
                                Manage customer feedback and product reviews
                            </p>
                        </div>

                        <div className="bg-orange-50 text-orange-600 px-5 py-3 rounded-2xl font-semibold">
                            Total Reviews: {allReviews.length}
                        </div>
                    </div>

                    {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

                        <div className="bg-white rounded-2xl border border-gray-200 p-5">
                            <h5 className="text-gray-600 text-sm">
                                Total Reviews
                            </h5>
                            <h3 className="text-3xl font-bold mt-2">
                                {allReviews.length}
                            </h3>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-200 p-5">
                            <h5 className="text-gray-600 text-sm">
                                Average Rating
                            </h5>
                            <h3 className="text-3xl font-bold mt-2">
                                {(
                                    allReviews.reduce((a, b) => a + b.rating, 0) /
                                    allReviews.length || 0
                                ).toFixed(1)}
                            </h3>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-200 p-5">
                            <h5 className="text-gray-600 text-sm">
                                Pending Replies
                            </h5>
                            <h3 className="text-3xl font-bold mt-2">
                                {allReviews.filter(r => !r.reply).length}
                            </h3>
                        </div>

                    </div> */}
                    <h3 className="text-xl font-bold mb-4">Reviews</h3>
                    <div>
                        {loading ? <div className="flex items-center justify-center min-h-[180px] bg-white rounded-bl-xl rounded-br-xl border border-t-0 border-dashed border-gray-300">
                            <img src='/images/loading_animation.svg' alt="loader" className='mx-auto' />
                        </div> : <div>
                            {allReviews.length > 0 ?
                                <div className="grid gap-4">

                                    {allReviews?.slice().reverse().map((review) => (

                                        <div
                                            key={review.id}
                                            className="
      bg-white
      rounded-xl
      border
      border-gray-200
      p-5
      hover:bg-gray-50
      transition-all
      duration-300
    "
                                        >

                                            <div className="flex flex-col xl:flex-row gap-5">

                                                {/* Customer */}
                                                <div className="flex items-center gap-3 xl:min-w-[250px]">

                                                    <img
                                                        src={review.image ? review.image.url : profile_image}
                                                        alt=""
                                                        className="
            w-14
            h-14
            rounded-full
            object-cover
            bg-gray-200
            "
                                                    />

                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">
                                                            {review.name}
                                                        </h4>

                                                        <p className="text-sm text-gray-600">
                                                            {review.email}
                                                        </p>
                                                    </div>

                                                </div>

                                                {/* Review */}
                                                <div className="flex-1">

                                                    <div className="flex items-center gap-1 text-yellow-500 mb-2">

                                                        {[...Array(review.rating)].map((_, i) => (
                                                            <AiFillStar key={i} />
                                                        ))}

                                                    </div>

                                                    <p className="text-gray-700 text-sm">
                                                        {review.review}
                                                    </p>

                                                </div>

                                                {/* Product */}
                                                <div className="flex items-center gap-3 xl:w-[280px]">

                                                    <img
                                                        src={review?.images?.[0]?.url}
                                                        alt=""
                                                        className="
            w-16
            h-16
            rounded-xl
            object-cover
            bg-gray-200
            "
                                                    />

                                                    <div>

                                                        <h4 className="font-medium line-clamp-2">
                                                            {review.product_name}
                                                        </h4>

                                                        <p className="text-orange-600 font-semibold mt-1">
                                                            {currency}. {review.offerPrice}
                                                        </p>

                                                    </div>

                                                </div>

                                                {/* Date */}
                                                <div className="xl:w-[140px]">

                                                    <span
                                                        className="
            inline-flex
            px-3
            py-1
            rounded-full
            bg-gray-100
            text-gray-600
            text-xs
            font-medium
            "
                                                    >
                                                        {new Date(review.created_at).toLocaleDateString()}
                                                    </span>

                                                </div>

                                                {/* Reply Button */}
                                                <div>

                                                    <button
                                                        onClick={() => fetchSingleReview(review.id)}
                                                        className="
            flex
            items-center
            gap-2
            bg-blue-500
            hover:bg-blue-600
            text-white
            px-4
            py-2
            rounded-xl
            transition
            text-[13px]
            "
                                                    >
                                                        <FaRegCommentDots size={16} />
                                                        Reply
                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    ))}

                                </div> :
                                <div className="flex items-center justify-center min-h-[180px] bg-white rounded-bl-xl rounded-br-xl border border-t-0 border-dashed border-gray-300">
                                    <p className="text-gray-600">
                                        No reviews found
                                    </p>
                                </div>
                            }
                        </div>}
                    </div>
                </div >

                {/* ================= ADMIN REPLY SECTION ================= */}
                <div
                    className={`
  fixed inset-0 z-50
  flex items-center justify-center
  p-4
  ${model ? "flex" : "hidden"}
`}
                >

                    <div
                        className="
    w-full
    max-w-2xl
    bg-white
    rounded-3xl
    shadow-2xl
    overflow-hidden
    "
                    >

                        <div className="bg-blue-600 text-white px-6 py-4 flex justify-between">

                            <div className="font-semibold text-lg">
                                Reply to Review
                            </div>

                            <button onClick={() => setModel(false)}>
                                <X />
                            </button>

                        </div>

                        <div className="p-6">

                            <div className="flex items-center gap-3 mb-5">

                                <img
                                    src={
                                        singleReview.profile_image
                                            ? JSON.parse(singleReview.profile_image).url
                                            : profile_image
                                    }
                                    alt=""
                                    className="w-14 h-14 rounded-full"
                                />

                                <div>
                                    <h4 className="font-semibold">
                                        {singleReview.name}
                                    </h4>

                                    <p className="text-gray-600 text-sm">
                                        {singleReview.email}
                                    </p>
                                </div>

                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 mb-5">
                                {singleReview.review}
                            </div>

                            <textarea
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                                rows={5}
                                placeholder="Write your reply..."
                                className="
        w-full
        border
        border-gray-600
        rounded-xl
        p-4
        outline-none
        focus:ring-1
        focus:border-none
        focus:ring-orange-500
        "
                            />

                            <div className="flex justify-end gap-3 mt-5">

                                <button
                                    onClick={() => setModel(false)}
                                    className="
          px-5
          py-3
          border
          border-gray-600
          rounded-xl
          "
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={() => handleReply(singleReview.id)}
                                    className="
          bg-blue-500
          hover:bg-blue-600
          text-white
          px-5
          py-3
          rounded-xl
          "
                                >
                                    {replyLoading ? "Sending..." : "Send Reply"}
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div >
    )
}

export default Reviews