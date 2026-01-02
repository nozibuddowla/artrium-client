import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import MyContainer from "./MyContainer";

const CommunityHighlights = () => {
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lottie animation for community/celebration
  const celebrationAnimation = {
    v: "5.7.4",
    fr: 60,
    ip: 0,
    op: 120,
    w: 200,
    h: 200,
    nm: "Celebration",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Star",
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: {
            a: 1,
            k: [
              { t: 0, s: [0], e: [360] },
              { t: 120, s: [360] },
            ],
          },
          p: { a: 0, k: [100, 100, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: {
            a: 1,
            k: [
              { t: 0, s: [80, 80, 100], e: [120, 120, 100] },
              { t: 60, s: [120, 120, 100], e: [80, 80, 100] },
              { t: 120, s: [80, 80, 100] },
            ],
          },
        },
        shapes: [
          {
            ty: "gr",
            it: [
              {
                ty: "sr",
                sy: 1,
                d: 1,
                pt: { a: 0, k: 5 },
                p: { a: 0, k: [0, 0] },
                r: { a: 0, k: 0 },
                or: { a: 0, k: 30 },
                ir: { a: 0, k: 12 },
              },
              {
                ty: "fl",
                c: { a: 0, k: [0.4, 0.2, 0.9, 1] },
                o: { a: 0, k: 100 },
              },
            ],
          },
        ],
      },
    ],
  };

  useEffect(() => {
    fetch("./communityHighlights.json")
      .then((res) => res.json())
      .then((data) => {
        setHighlights(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching community highlights:", error);
        setLoading(false);
      });
  }, []);

  const getHighlightIcon = (type) => {
    switch (type) {
      case "trending":
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "featured":
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      case "achievement":
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const getHighlightColor = (type) => {
    switch (type) {
      case "trending":
        return "from-orange-400 to-pink-500";
      case "featured":
        return "from-purple-400 to-indigo-500";
      case "achievement":
        return "from-green-400 to-teal-500";
      default:
        return "from-gray-400 to-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="my-16">
        <MyContainer>
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <Lottie
                animationData={celebrationAnimation}
                loop={true}
                style={{ width: 100, height: 100 }}
              />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold">
              Loading Community Highlights...
            </h3>
          </div>
        </MyContainer>
      </div>
    );
  }

  return (
    <div className="my-16 relative">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <MyContainer>
        <div className="text-center mb-12 relative z-10">
          <div className="inline-block mb-4">
            <Lottie
              animationData={celebrationAnimation}
              loop={true}
              style={{ width: 80, height: 80 }}
            />
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            ✨ Community Highlights
          </h3>
          <p className="text-gray-600 text-lg">
            What's happening in our creative community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="highlight-card group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Highlight Image */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  src={highlight.imageUrl}
                  alt={highlight.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Animated Type Badge */}
                <div
                  className={`type-badge absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r ${getHighlightColor(
                    highlight.type
                  )} text-white text-sm font-semibold flex items-center gap-2 shadow-lg z-20`}
                >
                  {getHighlightIcon(highlight.type)}
                  {highlight.type.charAt(0).toUpperCase() +
                    highlight.type.slice(1)}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
                  {highlight.title}
                </h4>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {highlight.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={highlight.authorAvatar}
                      alt={highlight.authorName}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-200 group-hover:ring-purple-400 transition-all duration-300"
                    />
                    <span className="text-sm text-gray-700 font-medium">
                      {highlight.authorName}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {highlight.timeAgo}
                  </span>
                </div>

                {/* Animated Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1 transform group-hover:scale-110 transition-transform duration-300">
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
                    {highlight.likes}
                  </div>
                  <div className="flex items-center gap-1 transform group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-4 h-4 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {highlight.comments}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </MyContainer>
    </div>
  );
};

export default CommunityHighlights;
