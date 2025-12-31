import React, { useEffect, useState } from "react";
import MyContainer from "./MyContainer";
import { Link } from "react-router";

const FeaturedArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("./artworks.json")
      .then((res) => res.json())
      .then((data) => {
        setArtworks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching artworks:", err);
        setLoading(false);
      });
  }, []);

  console.log(artworks);

  if (loading) {
    return (
      <div className="my-16">
        <MyContainer>
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Featured Artworks
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 h-64 rounded-t-lg"></div>
                <div className="p-4 bg-gray-100 rounded-b-lg">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </MyContainer>
      </div>
    );
  }

  return (
    <div className="my-16">
      <MyContainer>
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Featured Artworks
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork, index) => (
            <div
              key={index}
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <img
                  src={artwork?.imageUrl}
                  alt={artwork.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {artwork.category}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5">
                <h4 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                  {artwork.title}
                </h4>

                <p className="text-gray-600 text-sm mb-4 flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {artwork.artistName}
                </p>

                {/* View Details Button */}
                <Link
                  to={`/artwork/${artwork._id}`}
                  className="block w-full text-center bg-linear-to-r from-purple-600 to-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {artworks.length > 0 && (
          <div className="text-center mt-12">
            <Link
              to="/all-products"
              className="inline-block px-8 py-3 bg-white text-purple-600 font-semibold rounded-full border-2 border-purple-600 hover:bg-purple-100 transition-all duration-300"
            >
              Explore More Artworks →
            </Link>
          </div>
        )}
      </MyContainer>
    </div>
  );
};

export default FeaturedArtworks;
