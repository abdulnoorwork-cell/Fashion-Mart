import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { backendUrl, navigate } = useContext(AppContext);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      setResetToken(token);
    } else {
      toast.error("Reset token not found");
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${backendUrl}/api/user/reset-password`,
        {
          token: resetToken,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.messege);

        setPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);

      toast.error(
        error?.response?.data?.messege ||
          "Failed to reset password"
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
              Create New Password
            </h2>

            <p className="text-gray-300 max-w-md">
              Your new password should be strong and secure.
              Choose a password that you haven't used before.
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
              Reset Password
            </h1>

            <p className="text-gray-400 mb-8">
              Enter your new password below.
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* Password */}
              <div>
                <label className="block mb-2">
                  New Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                    className="
                      w-full
                      bg-[#151515]
                      border
                      border-white/10
                      px-4
                      py-4
                      pl-12
                      pr-12
                      outline-none
                      focus:border-white/30
                    "
                  />

                  <FaLock
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-500
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-500
                    "
                  >
                    {showPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block mb-2">
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    required
                    className="
                      w-full
                      bg-[#151515]
                      border
                      border-white/10
                      px-4
                      py-4
                      pl-12
                      pr-12
                      outline-none
                      focus:border-white/30
                    "
                  />

                  <FaLock
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-500
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-500
                    "
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
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
                "
              >
                {loading
                  ? "Updating Password..."
                  : "Reset Password"}
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

export default ResetPassword;