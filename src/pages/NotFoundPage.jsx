import React from "react";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 overflow-hidden relative">
      <div className="max-w-4xl mx-auto text-center z-10 relative">
        <h1 className="art-404 mb-8">404</h1>

        {/* Main Message */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Oops! This Canvas is Blank
        </h2>

        <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
          Looks like this masterpiece hasn't been created yet. The page you're
          looking for seems to have wandered off the gallery.
        </p>

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
        <p className="mt-12 text-sm">
          "Every artist was first an amateur, but every URL should lead
          somewhere!"
          <span className="block mt-1">— Not Ralph Waldo Emerson</span>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
