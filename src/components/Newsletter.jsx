import React, { useState } from "react";
import MyContainer from "./MyContainer";
import { MdOutlineEmail } from "react-icons/md";
import { FaCalendar, FaHeart, FaStar } from "react-icons/fa6";
import { toast } from "react-toastify";

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
      toast.error("Invalid email address");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
      setIsLoading(false);
    }, 1500);
  };

  const Feature = ({ icon, title, desc }) => (
    <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md p-4 rounded-xl flex items-center gap-4 border border-white/10">
      <div className="text-3xl">{icon}</div>
      <div className="text-left">
        <h4 className="font-bold text-sm text-white">{title}</h4>{" "}
        <p className="text-xs text-white/70">{desc}</p>{" "}
      </div>
    </div>
  );

  return (
    <div className="py-20 relative">
      <div className="absolute inset-0 opacity-20 bg-[url('/newsletter-bg.png')] bg-cover bg-center"></div>
      <MyContainer>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white dark:bg-slate-800 rounded-full mb-6 shadow-2xl">
            <MdOutlineEmail
              size={40}
              className="text-purple-600 dark:text-purple-400"
            />
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Join Our Creative Community
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Get exclusive collections and inspiring stories delivered to your
            inbox.
          </p>

          {/* Subscription Form */}
          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 px-6 py-4 rounded-full bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-4 focus:ring-purple-400 outline-none"
            />
            <button
              disabled={isLoading}
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 rounded-full font-bold transition-all disabled:bg-gray-400"
            >
              {isLoading ? "..." : "Subscribe"}
            </button>
          </form>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Feature
              icon={<FaStar color="#FFF176" />}
              title="Exclusive Content"
              desc="First access"
            />
            <Feature
              icon={<FaCalendar color="#7bf1a8" />}
              title="Weekly Updates"
              desc="Tips & Tricks"
            />
            <Feature
              icon={<FaHeart color="#E57373" />}
              title="Special Offers"
              desc="Discounts"
            />
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default Newsletter;
