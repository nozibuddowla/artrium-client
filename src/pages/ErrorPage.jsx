import React from "react";
import { Link, useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error); // Keep this for developers to see in console

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full">
          <svg
            className="w-10 h-10 text-red-600"
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

        <h2 className="text-3xl font-bold mb-2">
          Something went wrong
        </h2>
        <p className=" mb-8">
          {error.statusText ||
            error.message ||
            "An unexpected error occurred while loading the gallery."}
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
          >
            Try Refreshing
          </button>
          <Link to="/" className="text-purple-600 font-medium hover:underline">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
