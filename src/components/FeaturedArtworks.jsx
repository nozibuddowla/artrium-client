import React, { useEffect, useState } from "react";
import MyContainer from "./MyContainer";
import { Link } from "react-router";
import { motion } from "motion/react";
import axios from "axios";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaHeart, FaUser } from "react-icons/fa";

const FeaturedArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          "http://localhost:3000/artworks/featured"
        );

        setArtworks(response.data);
      } catch (error) {
        console.error("Error fetching artworks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  //   console.log(artworks);

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
        <h3 className="text-3xl font-bold text-center mb-12 text-base-content">
          Featured Artworks
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.slice(0, 6).map((artwork) => (
            <motion.div
              key={artwork._id}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1, transition: { duration: 0.5 } }}
              className="group border border-base-300 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-base-200">
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
                <h4 className="text-xl font-bold text-base-content mb-2 line-clamp-1">
                  {artwork.title}
                </h4>

                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <FaUser size={16} />
                    <span className="text-base-content/70">
                      {artwork.userName}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 font-medium text-pink-600 dark:text-pink-400">
                    <FaHeart /> {artwork.likes || 0}
                  </span>
                </div>

                {/* View Details Button */}
                <Link
                  to={`/artwork/details/${artwork._id}`}
                  className="block w-full text-center bg-linear-to-r from-purple-600 to-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        {artworks.length > 0 && (
          <div className="flex items-center justify-center mt-12">
            <Link
              to="/exploreArtworks"
              className="inline-block px-8 py-3 bg-base-100 text-primary font-semibold rounded-full border-2 border-primary hover:bg-primary hover:text-primary-content transition-all duration-300 w-full md:w-1/3 text-center"
            >
              <span>Explore More Artworks</span>
            </Link>
          </div>
        )}
      </MyContainer>
    </div>
  );
};

export default FeaturedArtworks;
