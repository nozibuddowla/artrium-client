import React, { useState } from "react";
import MyContainer from "./MyContainer";
import { MdOutlineEmail } from "react-icons/md";
import { CiAt } from "react-icons/ci";
import { FcLock } from "react-icons/fc";
import { FaCalendar, FaHeart, FaStar } from "react-icons/fa6";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div
      className="py-20 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/newsletter-bg.png')",
      }}
    >
      <MyContainer>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/90 backdrop-blur-xs rounded-full mb-6">
            <MdOutlineEmail size={40} color="#9810fa " />
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Join Our Creative Community
          </h2>

          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest artworks, exclusive
            collections, and inspiring stories delivered to your inbox.
          </p>

          {/* Subscription Form */}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              {/* Email Input */}
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-6 py-4 rounded-full bg-white/95 backdrop-blur-sm text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-white/50 transition-all shadow-lg"
                  disabled={isLoading}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <CiAt size={20} color="#99a1af" />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-4 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Subscribing...
                  </span>
                ) : (
                  "Subscribe Now"
                )}
              </button>
            </div>
          </form>

          {/* Privacy Note */}
          <div className="mt-6 flex justify-center items-center gap-2">
            <FcLock />{" "}
            <span className="text-sm text-gray-700 ">
              {" "}
              We respect your privacy. Unsubscribe at any time.
            </span>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 text-gray-700 bg-white/90 backdrop-blur-xs rounded-2xl p-4">
              <div className="shrink-0">
                <FaStar size={32} color="#FFF176" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-sm">Exclusive Content</h4>
                <p className="text-xs text-gray-600">
                  First access to new collections
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-700 bg-white/90 backdrop-blur-xs rounded-2xl p-4">
              <div className="shrink-0">
                <FaCalendar size={32} color="#7bf1a8" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-sm">Weekly Updates</h4>
                <p className="text-xs text-gray-600">
                  Art tips and inspiration
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-700 bg-white/90 backdrop-blur-xs rounded-2xl p-4">
              <div className="shrink-0">
                <FaHeart size={32} color="#E57373" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-sm">Special Offers</h4>
                <p className="text-xs text-gray-600">
                  Subscriber-only discounts
                </p>
              </div>
            </div>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default Newsletter;
