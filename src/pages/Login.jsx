import React from "react";
import MyContainer from "../components/MyContainer";
import { Link } from "react-router";

const Login = () => {
  return (
    <div className="py-20">
      <MyContainer>
        <div className="max-w-150 mx-auto px-4">
          <div className="hero-content flex-col">
            {/* Header */}
            <h1 className="text-4xl 2xl:text-5xl font-bold font-serif mb-10 text-gray-900">
              Login
            </h1>

            <form className="space-y-6">
              {/* Username/Email Field */}
              <div className="form-control w-full">
                <label className="label mb-2">
                  <span className="text-sm font-bold text-gray-800">
                    Username or email address{" "}
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your username or email address..."
                  className="w-full px-6 py-4 bg-[#F7F7F7] rounded-full border-none focus:ring-2 focus:ring-gray-200 outline-none placeholder:text-gray-400 text-gray-700 transition-all"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="form-control w-full">
                <label className="label mb-2">
                  <span className="text-sm font-bold text-gray-800">
                    Password <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password..."
                  className="w-full px-6 py-4 bg-[#F7F7F7] rounded-full border-none focus:ring-2 focus:ring-gray-200 outline-none placeholder:text-gray-400 text-gray-700 transition-all"
                  required
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between py-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border-gray-300 rounded focus:ring-0 accent-[#C89446]"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    Remember me
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-gray-500 hover:text-gray-900 underline underline-offset-4 decoration-dotted transition-colors"
                >
                  Lost your password?
                </Link>
              </div>

              <div className="w-full flex items-center gap-2">
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                  Don't have an account?
                </span>
                <Link
                  to="/signup"
                  className="text-sm text-gray-500 hover:text-gray-900 underline underline-offset-4 decoration-dotted transition-colors"
                >
                  Register
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-5 bg-linear-to-br from-[#632ee3] to-[#9f62f2]  text-white font-bold uppercase tracking-[0.2em] text-sm rounded-full transition-all duration-300 transform active:scale-[0.98] shadow-md hover:shadow-lg mt-4"
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default Login;
