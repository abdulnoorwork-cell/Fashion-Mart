import React, { useContext, useState } from "react";
import {
  FaGoogle,
  FaFacebookF,
  FaEye,
  FaEnvelope,
  FaLock,
  FaEyeSlash,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { backendUrl, navigate } = useContext(AppContext)

  const onLoginHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      let response = await axios.post(`${backendUrl}/api/user/login`, { email, password }, {
        headers: { "Content-Type": 'application/json' },
        withCredentials: true
      })
      if (response.data.success) {
        setLoading(false)
        setError('')
        // ⏰ assume token expires in 1 hour (same as backend)
        const expiryTime = Date.now() + 60 * 60 * 1000;
        localStorage.setItem('expiryTime', expiryTime);
        localStorage.setItem('User', JSON.stringify(response.data))
        toast.success(response.data.message)
        setEmail('');
        setPassword('');
        navigate('/')
        scrollTo(0, 0)
        setTimeout(() => {
          window.location.reload()
          navigate('/')
        }, 800)
        setTimeout(() => {
          localStorage.removeItem('User')
          localStorage.removeItem('expiryTime')
        }, response.data.expiresIn * 1000)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
      setError(error.response.data.message)
    }
  }
  return (
    <section className="text-white">
      <div className="w-full grid lg:grid-cols-2 overflow-hidden">

        {/* Left Side */}
        <div className="hidden lg:block relative">
          <img
            src="/images/slide-img-5.jpg"
            alt="Fashion"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60"></div>

          <div className="absolute inset-0 flex flex-col justify-center px-12">
            <h2 className="text-white text-5xl font-black italic uppercase mb-6">
              Welcome Back
            </h2>

            <p className="text-gray-300 sm:text-lg max-w-md">
              Sign in to access your account, track orders,
              manage your wishlist, and enjoy a personalized
              shopping experience.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="xl:p-20 sm:p-16 px-10 py-16 min-h-screen">
          <div className="w-full flex flex-col justify-center h-full">

            <h1 className="text-white text-3xl sm:text-4xl font-black uppercase italic mb-3">
              Sign In
            </h1>

            <p className="text-gray-400 sm:mb-8 mb-6">
              Enter your credentials to continue.
            </p>

            {/* Social Login */}
            {/* <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                className="
                  flex items-center justify-center gap-3
                  border border-white/10
                  py-3
                  hover:border-white/30
                  transition
                "
              >
                <FaGoogle />
                Google
              </button>
            </div> */}

            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-white/10 flex-1"></div>

              <span className="text-gray-500 text-sm">
                OR
              </span>

              <div className="h-px bg-white/10 flex-1"></div>
            </div>

            {/* Form */}
            <form onSubmit={onLoginHandler} className="space-y-5">

              {/* Email */}
              <div>
                <label className="block text-sm mb-2 text-gray-300">
                  Email Address
                </label>

                <div className="relative">

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="
                      w-full
        bg-[#151515]
        border
        border-white/10
        sm:p-4
        p-3
        outline-none
        focus:border-white/30
                    "
                  />
                </div>
                <h6 className='text-red-600 mt-2 leading-none text-xs'>{error === 'Please enter your email' || error === 'Invalid email' ? error : null}</h6>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm mb-2 text-gray-300">
                  Password
                </label>

                <div className="relative">

                  <input
                    type={passwordShow ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="
                      w-full
          bg-[#151515]
          border
          border-white/10
          sm:px-4 px-3
          sm:py-4 py-3
          pr-12
          outline-none
          focus:border-white/30
                    "
                  />

                  <button
                    type="button"
                    onClick={() => setPasswordShow(!passwordShow)}
                    className="
                            absolute
                            right-4
                            top-1/2
                            -translate-y-1/2
                            text-gray-400
                          "
                  >
                    {passwordShow ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
                <h6 className='text-red-600 mt-2 leading-none text-xs'>{error === 'Please enter your password' || error === 'Incorrent password' ? error : null}</h6>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <input type="checkbox" />
                  Remember Me
                </label>

                <a
                  href="/forgot-password"
                  className="text-sm text-white hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="
                  w-full
      bg-white
      text-black
      mt-4
      sm:py-4 py-3.5
      font-bold
      uppercase
      hover:bg-gray-200
      transition
      disabled:opacity-60
                "
              >
                {loading ? "Signing In..." : "Login"}
              </button>
            </form>

            {/* Register */}
            <p className="text-center text-gray-400 mt-8">
              Don't have an account?{" "}
              <Link
                onClick={() => { scrollTo(0, 0) }}
                to="/register"
                className="text-white hover:underline"
              >
                Create Account
              </Link>
            </p>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Login;