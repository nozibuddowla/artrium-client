import React, { useEffect, useState } from "react";
import MyContainer from "../components/MyContainer";
import { Link } from "react-router";
import { motion } from "motion/react";
import axios from "axios";
import { CiUser } from "react-icons/ci";
import { FaHeart, FaUser } from "react-icons/fa6";

const ArtWorks = () => {
  const [artworks, setArtworks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadArtworks = async (searchQuery = "") => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/artworks?search=${searchQuery}`
      );
      setArtworks(res.data);
    } catch (err) {
      console.error("Failed to load artworks", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArtworks();
  }, []);

  if (loading) {
    return (
      <div className="my-16">
        <MyContainer>
          <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Explore Artworks
          </h1>
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
        <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Explore Artworks
        </h1>

        <div className="flex items-center justify-between gap-4 max-w-2xl mx-auto mb-12">
          <input
            type="text"
            placeholder="Search by title or artist..."
            className="input w-full rounded-full px-6 border-gray-300 focus:border-purple-500 outline-none h-12"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => loadArtworks(search)}
            className="btn bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-colors"
          >
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork) => (
            <motion.div
              key={artwork._id}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1, transition: { duration: 0.5 } }}
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

                <div className="flex justify-between items-center mb-4">
                  <div className=" flex items-center gap-2">
                    <FaUser size={16} color="#4a5565" />
                    <span className="text-gray-600">
                      {" "}
                      {artwork.userName}{" "}
                    </span>
                  </div>
                  {/* Added Likes Count per instructions */}
                  <span className="flex items-center gap-1 font-medium text-pink-600">
                    <FaHeart />  {artwork.likes || 0}
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
      </MyContainer>
    </div>
  );
};

export default ArtWorks;
