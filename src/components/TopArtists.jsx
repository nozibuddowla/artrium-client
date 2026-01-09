import React, { useEffect, useState } from "react";
import MyContainer from "./MyContainer";
import Lottie from "lottie-react";
import { Link } from "react-router";
import { Fade, Slide } from "react-awesome-reveal";
import axios from "axios";

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
              { t: 60, s: [5], e: [-5] },
              { t: 120, s: [-5] },
            ],
          },
          p: { a: 0, k: [100, 100, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: {
            a: 1,
            k: [
              { t: 0, s: [90, 90], e: [110, 110] },
              { t: 60, s: [110, 110], e: [90, 90] },
            ],
          },
        },
        shapes: [
          {
            ty: "gr",
            it: [
              {
                ty: "rc",
                s: { a: 0, k: [50, 60] },
                p: { a: 0, k: [0, 0] },
                r: { a: 0, k: 5 },
              },
              { ty: "fl", c: { a: 0, k: [1, 0.84, 0, 1] } },
            ],
          },
        ],
      },
    ],
  };

  useEffect(() => {
    const getTopArtists = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/top-artists");
        setArtists(res.data);
      } catch (error) {
        console.error("Error fetching top artists:", error);
      } finally {
        setLoading(false);
      }
    };
    getTopArtists();
  }, []);

  if (loading) {
    return (
      <div className="my-16 flex justify-center items-center dark:text-white">
        <div className="text-center">
          <Lottie
            animationData={trophyAnimation}
            style={{ width: 100, height: 100 }}
          />
          <h3 className="text-2xl font-bold mt-4">Loading Artists...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="my-16 pb-16 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-300 dark:bg-purple-900 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-indigo-300 dark:bg-indigo-900 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <MyContainer>
        <div className="text-center mb-12 relative z-10">
          <div className="flex justify-center mb-4">
            <Lottie
              animationData={trophyAnimation}
              loop={true}
              style={{ width: 80, height: 80 }}
            />
          </div>
          <Slide direction="down" triggerOnce>
            <h3 className="text-3xl md:text-4xl font-bold mb-3">
              🏆 Top Artists of the Week
            </h3>
          </Slide>
          <Fade>
            <p className="text-lg">
              Celebrating our most inspiring creators
            </p>
          </Fade>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {artists.map((artist, index) => (
            <div key={artist._id || index} className="group text-center">
              <div className="relative inline-block mb-4">
                <div className="absolute -top-2 -left-2 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg z-10 transform group-hover:scale-110 transition-transform">
                  #{index + 1}
                </div>
                <div className="relative w-40 h-40 mx-auto">
                  <div className="absolute inset-0 bg-linear-to-r from-purple-400 to-pink-400 rounded-full blur-md opacity-0 group-hover:opacity-75 transition-opacity"></div>
                  <img
                    src={artist.profileImage}
                    alt={artist.name}
                    className="relative w-40 h-40 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-xl group-hover:scale-105 transition-transform"
                  />
                  {artist.verified && (
                    <div className="absolute bottom-2 right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white ">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              <h4 className="text-xl font-bold mb-1">
                {artist.name}
              </h4>
              <p className="mb-3">
                {artist.artworkCount} Artworks
              </p>
              <Link
                to={`/artist/${artist._id}`}
                className="inline-block px-6 py-2 text-purple-600 dark:text-purple-400 font-semibold rounded-full border-2 border-purple-600 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-500 transition-all"
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
