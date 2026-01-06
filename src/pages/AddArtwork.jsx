import React, { useContext, useState } from "react";
import MyContainer from "../components/MyContainer";
import { FaEye, FaImage, FaPlus, FaUser } from "react-icons/fa6";
import { CiImageOn } from "react-icons/ci";
import { LiaComment } from "react-icons/lia";
import { LuBadgeDollarSign, LuTag } from "react-icons/lu";
import { GoPencil } from "react-icons/go";
import { MdOutlineDescription, MdOutlineZoomOutMap } from "react-icons/md";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const AddArtwork = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const categories = [
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
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target;

    const imageUrl = form.imageUrl.value;
    const title = form.title.value;
    const category = form.category.value;
    const medium = form.medium.value;
    const description = form.description.value;
    const dimensions = form.dimensions.value || "Not specified";
    const price = parseFloat(form.price.value) || 0;
    const visibility = form.visibility.value;
    const userName = user?.displayName || "Anonymous";
    const userEmail = user?.email;
    const createdAt = new Date().toISOString();

    const artworkData = {
      imageUrl,
      title,
      category,
      medium,
      description,
      dimensions,
      price,
      visibility,
      userName,
      userPhoto: user?.photoURL,
      userEmail,
      createdAt,
      likes: 0
    };

    //   console.log(artworkData);

    try {
      const res = await axios.post(
        "http://localhost:3000/artworks",
        artworkData
      );

      if (res.data.insertedId) {
        toast.success("Artwork added successfully!");
        form.reset();
        navigate("/exploreArtworks");
      }
    } catch (err) {
      console.error("Error adding artwork:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-indigo-50 py-20">
      <title>Add New Artwork</title>
      <MyContainer>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-purple-600 to-indigo-600 rounded-full mb-4">
              <FaPlus size={32} color="#fff" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
              Add New Artwork
            </h1>
            <p className="text-gray-600 text-lg">
              Share your creative masterpiece with the community
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image URL */}
              <div className="form-control">
                <label className="label">
                  <span className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <CiImageOn color="#8E24AA" size={20} />
                    Image URL
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-200 focus:border-transparent outline-none transition-all"
                  required
                />
                <p className="text-xs text-gray-500 mt-1 ml-1">
                  Enter a valid image URL from Unsplash, Imgur, or similar
                </p>
              </div>

              {/* Title */}
              <div className="form-control">
                <label className="label">
                  <span className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <LiaComment color="#8E24AA" size={20} />
                    Artwork Title
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter artwork title"
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-200 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              {/* Category & Medium */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category */}
                <div className="form-control">
                  <label className="label">
                    <span className="text-sm font-bold text-gray-800 flex items-center gap-2">
                      <LuTag color="#8E24AA" size={20} />
                      Category
                      <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <select
                    name="category"
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-200 focus:border-transparent outline-none transition-all"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Medium/Tools */}
                <div className="form-control">
                  <label className="label">
                    <span className="text-sm font-bold text-gray-800 flex items-center gap-2">
                      <GoPencil color="#8E24AA" size={20} />
                      Medium/Tools
                      <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="medium"
                    placeholder="e.g., Oil on Canvas, Digital Art"
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-200 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="form-control">
                <label className="label">
                  <span className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <MdOutlineDescription color="#8E24AA" size={20} />
                    Description
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                <textarea
                  name="description"
                  rows="4"
                  placeholder="Describe your artwork, inspiration, and techniques..."
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-200 focus:border-transparent outline-none transition-all resize-none"
                  required
                ></textarea>
              </div>

              {/* Dimensions & Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Dimensions */}
                <div className="form-control">
                  <label className="label">
                    <span className="text-sm font-bold text-gray-800 flex items-center gap-2">
                      <MdOutlineZoomOutMap color="#8E24AA" size={20} />
                      Dimensions
                      <span className="text-gray-500 text-xs">(Optional)</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="dimensions"
                    placeholder='e.g., 24" x 36"'
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-200 focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Price */}
                <div className="form-control">
                  <label className="label">
                    <span className="text-sm font-bold text-gray-800 flex items-center gap-2">
                      <LuBadgeDollarSign color="#8E24AA" size={20} />
                      Price (USD)
                      <span className="text-gray-500 text-xs">(Optional)</span>
                    </span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-200 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Visibility */}
              <div className="form-control">
                <label className="label">
                  <span className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <FaEye color="#8E24AA" size={20} />
                    Visibility
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer px-6 py-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-purple-300 transition-all">
                    <input
                      type="radio"
                      name="visibility"
                      value="public"
                      className="w-4 h-4 accent-purple-600"
                      defaultChecked
                    />
                    <span className="text-gray-700 font-medium">Public</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer px-6 py-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-purple-300 transition-all">
                    <input
                      type="radio"
                      name="visibility"
                      value="private"
                      className="w-4 h-4 accent-purple-600"
                    />
                    <span className="text-gray-700 font-medium">Private</span>
                  </label>
                </div>
              </div>

              {/* Read-only User Info */}
              <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-100">
                <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaUser color="#8E24AA" size={20} />
                  Artist Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">
                      Name
                    </label>
                    <input
                      type="text"
                      value={user?.displayName || "Anonymous"}
                      className="w-full px-4 py-2 bg-white rounded-lg border border-purple-200 text-gray-700 cursor-not-allowed"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user?.email || ""}
                      className="w-full px-4 py-2 bg-white rounded-lg border border-purple-200 text-gray-700 cursor-not-allowed"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Adding Artwork...
                    </>
                  ) : (
                    <>
                      <FaPlus size={24} color="#fff" />
                      Add Artwork
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default AddArtwork;
