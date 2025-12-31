import React from "react";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center px-4 overflow-hidden relative">
      {/* Floating Art Elements Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-400 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-indigo-400 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-pink-400 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center z-10 relative">
        {/* 404 Number with Art Style */}
        <div className="relative inline-block mb-8">
          <h1 className="art-404">404</h1>

          {/* Decorative Paint Palette */}
          <div className="absolute -top-8 -right-8 palette-icon">
            <svg
              width="80"
              height="80"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 10C27.909 10 10 27.909 10 50C10 72.091 27.909 90 50 90C55.523 90 60 85.523 60 80C60 77.273 58.977 74.773 57.273 72.909C55.636 71.114 54.545 68.75 54.545 66.136C54.545 60.614 59.023 56.136 64.545 56.136H72.727C83.773 56.136 92.727 47.182 92.727 36.136C92.727 21.318 73.182 10 50 10Z"
                fill="#667eea"
                opacity="0.3"
              />
              <circle cx="30" cy="35" r="6" fill="#f87171" />
              <circle cx="45" cy="25" r="6" fill="#fbbf24" />
              <circle cx="65" cy="30" r="6" fill="#34d399" />
              <circle cx="35" cy="55" r="6" fill="#60a5fa" />
              <circle cx="60" cy="50" r="6" fill="#a78bfa" />
            </svg>
          </div>
        </div>

        {/* Main Message */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Oops! This Canvas is Blank
        </h2>

        <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Looks like this masterpiece hasn't been created yet. The page you're
          looking for seems to have wandered off the gallery.
        </p>

        {/* Art-themed Icons */}
        <div className="flex justify-center gap-6 mb-12">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-2">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="text-sm text-gray-600">No Art Found</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
              <svg
                className="w-8 h-8 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <span className="text-sm text-gray-600">Lost Inspiration</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-2">
              <svg
                className="w-8 h-8 text-pink-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <span className="text-sm text-gray-600">Wrong Gallery</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="px-8 py-4 bg-linear-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to Gallery
          </Link>
        </div>

        {/* Fun Message */}
        <p className="mt-12 text-gray-500 text-sm">
          "Every artist was first an amateur, but every URL should lead
          somewhere!"
          <span className="block mt-1">— Not Ralph Waldo Emerson</span>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
