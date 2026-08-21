import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaGoogle,
  FaFacebookF,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { AppContext } from '../context/AppContext'
import axios from "axios";
import toast from "react-hot-toast";
import profileImage from '../../public/images/profile_image.png'

const Signup = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [profile_image, setProfile_Image] = useState('');
  const [previewImage, setPreviewImage] = useState(profileImage);

  const { backendUrl, navigate } = useContext(AppContext)

  const file = useRef();
  const imageHandler = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfile_Image(file)
      setPreviewImage(reader.result)
    }
  }

  const onSignupHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('phone', phone);
      formData.append('profile_image', profile_image || '')
      let response = await axios.post(`${backendUrl}/api/user/signup`, formData, {
        headers: { "Content-Type": 'multipart/form-data' },
        withCredentials: true
      })
      if (response.data.success) {
        setLoading(false)
        setError('')
        toast.success(response.data.message)
        setName('');
        setEmail('');
        setPassword('');
        setPhone('');
        navigate('/login')
        scrollTo(0, 0)
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

          <div className="absolute inset-0 bg-black/50"></div>

          <div className="absolute inset-0 flex flex-col justify-center px-12">
            <h2 className="text-white text-5xl font-black italic uppercase mb-6">
              Join Our Community
            </h2>

            <p className="text-gray-300 sm:text-lg max-w-md">
              Create an account to access exclusive collections,
              track orders, save favorites, and receive special offers.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="xl:p-20 sm:p-16 px-10 py-16 min-h-screen">
          <div className="w-full flex flex-col justify-center h-full">
            <h1 className="text-white text-3xl sm:text-4xl font-black uppercase italic mb-3">
              Sign Up
            </h1>

            <p className="text-gray-400 sm:mb-8 mb-6">
              Create your account and start shopping.
            </p>

            {/* Social Login */}
            {/* <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                className="
                  flex
                  items-center
                  justify-center
                  gap-3
                  border
                  border-white/10
                  py-3
                  hover:border-white/30
                  transition
                "
              >
                <FaGoogle />
                Google
              </button>
            </div> */}

            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-white/10 flex-1"></div>
              <span className="text-gray-500 text-sm">
                OR
              </span>
              <div className="h-px bg-white/10 flex-1"></div>
            </div>

            {/* Form */}
            <form onSubmit={onSignupHandler} className="space-y-5">

              {/* Profile Image */}
              <div className="flex flex-col items-center mb-6">

                <div
                  onClick={() => file.current.click()}
                  className="relative cursor-pointer group"
                >
                  <img
                    src={previewImage}
                    alt="Profile"
                    className="
          sm:w-26
          sm:h-26
          w-24
          h-24
          rounded-full
          object-cover
          border-2
          border-white/10
        "
                  />

                  <div
                    className="
          absolute
          inset-0
          rounded-full
          bg-black/60
          opacity-0
          group-hover:opacity-100
          transition-all
          flex
          items-center
          justify-center
          text-xs
          font-medium
          text-white
        "
                  >
                    Upload
                  </div>
                </div>

                <input
                  ref={file}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={imageHandler}
                />

                <p className="text-xs text-gray-500 mt-2">
                  JPG, PNG or WEBP
                </p>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
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
                <h6 className='text-red-600 mt-2 leading-none text-xs'>{error === 'Fullname is required' || error === 'Name must contain 3–40 characters' ? error : null}</h6>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm mb-2">
                  Email Address
                </label>

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
                <h6 className='text-red-600 mt-2 leading-none text-xs'>{error === 'Email is required' || error === 'Email already exists' || error === 'Email must contain 12–60 characters' ? error : null}</h6>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm mb-2">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={passwordShow ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
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
                <h6 className='text-red-600 mt-2 leading-none text-xs'>{error === 'Password is required' || error === 'Password must contain 8–80 characters' ? error : null}</h6>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm mb-2">
                  Phone Number
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone (Optional)"
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

              {/* Error */}
              {/* {error && (
                <div className="text-red-500 text-sm">
                  {error}
                </div>
              )} */}

              {/* Terms */}
              {/* <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  required
                  className="mt-1"
                />

                <p className="text-sm text-gray-400">
                  I agree to the Terms & Conditions and Privacy Policy.
                </p>
              </div> */}

              {/* Submit */}
              <button
                disabled={loading}
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
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center text-gray-400 mt-8">
              Already have an account?{" "}
              <Link
                onClick={() => { scrollTo(0, 0) }}
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

export default Signup;