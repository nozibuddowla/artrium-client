import React, { useEffect, useState } from "react";
import MyContainer from "./MyContainer";
import Lottie from "lottie-react";
import { Link } from "react-router";

const TopArtists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lottie animation data for trophy/award
  const trophyAnimation = {
    v: "5.7.4",
    fr: 60,
    ip: 0,
    op: 120,
    w: 200,
    h: 200,
    nm: "Trophy",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Trophy",
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: {
            a: 1,
            k: [
              { t: 0, s: [0], e: [5] },
              { t: 30, s: [5], e: [-5] },
              { t: 60, s: [-5], e: [5] },
              { t: 90, s: [5], e: [0] },
              { t: 120, s: [0] },
            ],
          },
          p: { a: 0, k: [100, 100, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: {
            a: 1,
            k: [
              { t: 0, s: [90, 90, 100], e: [110, 110, 100] },
              { t: 60, s: [110, 110, 100], e: [90, 90, 100] },
              { t: 120, s: [90, 90, 100] },
            ],
          },
        },
        shapes: [
          {
            ty: "gr",
            it: [
              {
                ty: "rc",
                d: 1,
                s: { a: 0, k: [50, 60] },
                p: { a: 0, k: [0, 0] },
                r: { a: 0, k: 5 },
              },
              {
                ty: "fl",
                c: { a: 0, k: [1, 0.843, 0, 1] },
                o: { a: 0, k: 100 },
              },
            ],
          },
        ],
      },
    ],
  };

  useEffect(() => {
    fetch("./topArtists.json")
      .then((res) => res.json())
      .then((data) => {
        setArtists(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching top artists:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="my-16 bg-linear-to-br from-purple-50 to-indigo-50">
        <MyContainer>
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <Lottie
                animationData={trophyAnimation}
                loop={true}
                style={{ width: 100, height: 100 }}
              />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold">
              Loading Top Artists...
            </h3>
          </div>
        </MyContainer>
      </div>
    );
  }

  return (
    <div className="my-16 bg-linear-to-br from-purple-50 to-indigo-50 pb-16 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-300 rounded-full blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-indigo-300 rounded-full blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-pink-300 rounded-full blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <MyContainer>
        <div className="text-center mb-12 relative z-10">
          <div className="inline-block mb-4">
            <Lottie
              animationData={trophyAnimation}
              loop={true}
              style={{ width: 80, height: 80 }}
            />
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            🏆 Top Artists of the Week
          </h3>
          <p className="text-gray-600 text-lg">
            Celebrating our most inspiring creators
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {artists.map((artist, index) => (
            <div key={artist._id} className="artist-card group text-center">
              <div className="relative inline-block mb-4">
                {/* Animated Rank Badge */}
                <div className="absolute -top-2 -left-2 w-10 h-10 rank-badge rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg z-10 transform group-hover:scale-110 transition-transform duration-300">
                  #{index + 1}
                </div>

                {/* Artist Avatar with Glow Effect */}
                <div className="relative w-40 h-40 mx-auto">
                  <div className="absolute inset-0 bg-linear-to-r from-purple-400 to-pink-400 rounded-full blur-md opacity-0 group-hover:opacity-75 transition-opacity duration-500"></div>
                  <img
                    src={artist.profileImage}
                    alt={artist.name}
                    className="relative w-full h-full rounded-full object-cover border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Verified Badge */}
                  {artist.verified && (
                    <div className="absolute bottom-2 right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* Artist Info */}
              <h4 className="text-xl font-bold text-gray-800 mb-1">
                {artist.name}
              </h4>
              <p className="text-gray-600 text-sm mb-3">
                {artist.artworkCount} Artworks
              </p>

              {/* Animated Stats */}
              <div className="flex justify-center gap-4 mb-4">
                <div className="flex items-center gap-1 text-sm text-gray-600 transform group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-4 h-4 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {artist.likes.toLocaleString()}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600 transform group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {artist.views.toLocaleString()}
                </div>
              </div>

              {/* View Profile Button */}
              <Link
                to={`/artist/${artist._id}`}
                className="inline-block px-6 py-2 bg-white text-purple-600 font-semibold rounded-full border-2 border-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      </MyContainer>
    </div>
  );
};

export default TopArtists;
