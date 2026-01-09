import React, { useEffect, useState } from "react";
import MyContainer from "../components/MyContainer";
import { Link } from "react-router";
import { motion } from "motion/react";
import axios from "axios";
import { FaHeart, FaUser } from "react-icons/fa6";
import { Fade } from "react-awesome-reveal";

const ArtWorks = () => {
  const [artworks, setArtworks] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const categories = [
    "All",
    "Abstract",
    "Landscape",
    "Portrait",
    "Surrealism",
    "Contemporary",
    "Nature",
    "Botanical",
    "Fantasy",
    "Urban",
    "Impressionism",
    "Collage",
    "Cultural",
    "Street Photography",
    "Floral",
    "Realism",
    "Conceptual",
    "Seascape",
    "Figurative",
    "Abstract Expressionism",
  ];

  const loadArtworks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://artrium-server.vercel.app/artworks?search=${search}&category=${selectedCategory}`
      );
      setArtworks(res.data);
    } catch (err) {
      console.error("Failed to load artworks", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadArtworks(search);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, selectedCategory]);

  if (loading) {
    return (
      <div className="my-16 transition-colors duration-300">
        <MyContainer>
          <h1 className="text-3xl font-bold text-center mb-12 ">
            Explore Artworks
          </h1>

          <div className="relative max-w-2xl mx-auto mb-12">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search by title, artist, or category..."
                className="input w-full rounded-full pl-6 pr-32 focus:border-purple-500 outline-none h-14 shadow-lg transition-all"
              />
              <div className="absolute right-2 flex gap-2">
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="btn btn-ghost btn-sm rounded-full"
                  >
                    ✕
                  </button>
                )}
                <button
                  onClick={() => loadArtworks(search)}
                  className="btn bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 border-none text-white rounded-full px-6"
                >
                  Search
                </button>
              </div>
            </div>
            {search && (
              <p className=" mt-2 ml-6">
                Showing results for:{" "}
                <span className="font-semibold text-purple-600 dark:text-purple-400">
                  "{search}"
                </span>
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300  h-64 rounded-t-lg"></div>
                <div className="p-4 bg-gray-100  rounded-b-lg">
                  <div className="h-4 bg-gray-300  rounded mb-2"></div>
                  <div className="h-3 bg-gray-300  rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </MyContainer>
      </div>
    );
  }

  return (
    <div className="py-16 px-5full">
      <title>Explore Artworks</title>
      <MyContainer>
        <h1 className="text-3xl font-bold text-center mb-12 text-base-content">
          Explore Artworks
        </h1>

        <div className="relative max-w-2xl mx-auto mb-12">
          <div className="relative flex items-center">
            <input
              type="text"
              value={search}
              placeholder="Search by title, artist, or category..."
              className="input w-full rounded-full pl-6 pr-32 focus:border-purple-500 outline-none h-14 shadow-lg transition-all"
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="absolute right-2 flex gap-2">
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="btn btn-ghost btn-sm rounded-full"
                >
                  ✕
                </button>
              )}
              <button
                onClick={() => loadArtworks(search)}
                className="btn bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 border-none text-white rounded-full px-6"
              >
                Search
              </button>
            </div>
          </div>
          {search && (
            <p className=" mt-2 ml-6">
              Showing results for:{" "}
              <span className="font-semibold text-purple-600 dark:text-purple-400">
                "{search}"
              </span>
            </p>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <Fade key={cat}>
              <button
                onClick={() => setSelectedCategory(cat)}
                className={`cursor-pointer px-6 py-2 rounded-full border transition-all ${
                  selectedCategory === cat
                    ? "bg-purple-600 text-white border-purple-600 shadow-md"
                    : "bg-base-100 hover:border-purple-400"
                }`}
              >
                {cat}
              </button>
            </Fade>
          ))}
        </div>

        {artworks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artworks.map((artwork) => (
              <motion.div
                key={artwork._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="group rounded-lg  shadow-md hover:shadow-xl border border-base-300 transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden ">
                  <img
                    src={artwork?.imageUrl}
                    alt={artwork.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 bg-purple-600 dark:bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
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
                    className="block w-full text-center bg-linear-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 text-white py-2.5 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 backdrop-blur-md rounded-3xl border border-dashed border-gray-400 dark:border-slate-600">
            <h3 className="text-xl font-medium">No artworks found.</h3>
            <p className="mt-2">Try adjusting your search terms or keywords.</p>
            <button
              onClick={() => setSearch("")}
              className="btn btn-link text-purple-600 dark:text-purple-400 font-bold"
            >
              Clear all filters
            </button>
          </div>
        )}
      </MyContainer>
    </div>
  );
};

export default ArtWorks;
