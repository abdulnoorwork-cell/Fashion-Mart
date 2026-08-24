import axios from "axios";
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { backendUrl } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        `${backendUrl}/api/user/forgot-password`,
        { email },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.messege);
        setEmail("");
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);

      toast.error(
        error?.response?.data?.messege ||
        "Something went wrong"
      );
    }
  };

  return (
    <section className="min-h-screen text-white flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden border border-white/10 bg-[#1d1d1d]">

        {/* Left Side */}
        <div className="hidden lg:block relative">
          <img
            src="/images/slide-img-5.jpg"
            alt=""
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60" />

          <div className="absolute inset-0 flex flex-col justify-center px-12">
            <h2 className="sm:text-5xl text-4xl font-black italic uppercase mb-5">
              Reset Password
            </h2>

            <p className="text-gray-300 max-w-md">
              Enter your registered email address and we'll
              send you a password reset link to regain access
              to your account.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-12 flex items-center">
          <div className="w-full max-w-md mx-auto">

            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition"
            >
              <IoArrowBack />
              Back to Login
            </Link>

            <h1 className="text-4xl font-black uppercase italic mb-3">
              Forgot Password
            </h1>

            <p className="text-gray-400 mb-8">
              We'll send a password reset link to your email.
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label className="block mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Enter your email"
                    className="
                      w-full
                      bg-[#151515]
                      border
                      border-white/10
                      px-4
                      py-4
                      pl-12
                      outline-none
                      focus:border-white/30
                      transition
                    "
                  />

                  <MdOutlineEmail
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-500
                      text-xl
                    "
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  bg-white
                  text-black
                  py-4
                  font-bold
                  uppercase
                  hover:bg-gray-200
                  transition
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                "
              >
                {loading
                  ? "Sending Reset Link..."
                  : "Send Reset Link"}
              </button>
            </form>

            <p className="text-center text-gray-400 mt-8">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-white hover:underline"
              >
                Sign In
              </Link>
            </p>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ForgotPassword;