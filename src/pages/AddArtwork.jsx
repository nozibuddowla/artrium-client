import React, { useContext, useState } from "react";
import MyContainer from "../components/MyContainer";
import { FaEye, FaPlus, FaUser } from "react-icons/fa6";
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
    "Cultural",
    "Street Photography",
    "Floral",
    "Realism",
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
      likes: 0,
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
    <div className="min-h-screen py-20">
      <title>Add New Artwork</title>
      <MyContainer>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-purple-600 to-indigo-600 rounded-full mb-4 shadow-lg shadow-purple-500/20">
              <FaPlus size={32} color="#fff" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Add New Artwork
            </h1>
            <p className="text-lg">
              Share your creative masterpiece with the community
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-3xl shadow-xl p-8 md:p-10 border border-base-300 overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image URL */}
              <div className="form-control">
                <label className="label">
                  <span className="text-sm font-bold flex items-center gap-2">
                    <CiImageOn
                      className="text-purple-600 dark:text-purple-400"
                      size={20}
                    />
                    Image URL <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3  rounded-xl border dark:border-gray-200 border-slate-700 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  required
                />
                <p className="text-xs mt-1 ml-1">
                  Enter a valid image URL (Unsplash, Imgur, etc.)
                </p>
              </div>

              {/* Title */}
              <div className="form-control">
                <label className="label">
                  <span className="text-sm font-bold flex items-center gap-2">
                    <LiaComment
                      className="text-purple-600 dark:text-purple-400"
                      size={20}
                    />
                    Artwork Title <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter artwork title"
                  className="w-full px-4 py-3 rounded-xl border dark:border-gray-200 border-slate-700 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  required
                />
              </div>

              {/* Category & Medium */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="text-sm font-bold flex items-center gap-2">
                      <LuTag
                        className="text-purple-600 dark:text-purple-400"
                        size={20}
                      />
                      Category <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <select
                    name="category"
                    className="w-full px-4 py-3 rounded-xl border dark:border-gray-200 border-slate-700 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    required
                  >
                    <option
                      value=""
                      className="dark:text-gray-900 text-gray-200"
                    >
                      Select a category
                    </option>
                    {categories.map((cat) => (
                      <option
                        key={cat}
                        value={cat}
                        className="dark:text-gray-900 text-gray-200"
                      >
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="text-sm font-bold flex items-center gap-2">
                      <GoPencil
                        className="text-purple-600 dark:text-purple-400"
                        size={20}
                      />
                      Medium/Tools <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="medium"
                    placeholder="Oil on Canvas, Digital Art"
                    className="w-full px-4 py-3 rounded-xl border dark:border-gray-200 border-slate-700 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="form-control">
                <label className="label">
                  <span className="text-sm font-bold flex items-center gap-2">
                    <MdOutlineDescription
                      className="text-purple-600 dark:text-purple-400"
                      size={20}
                    />
                    Description <span className="text-red-500">*</span>
                  </span>
                </label>
                <textarea
                  name="description"
                  rows="4"
                  placeholder="Describe your artwork..."
                  className="w-full px-4 py-3 rounded-xl border dark:border-gray-200 border-slate-700  focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none"
                  required
                ></textarea>
              </div>

              {/* Dimensions & Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="text-sm font-bold  flex items-center gap-2">
                      <MdOutlineZoomOutMap
                        className="text-purple-600 dark:text-purple-400"
                        size={20}
                      />
                      Dimensions <span className="text-xs">(Optional)</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="dimensions"
                    placeholder='e.g., 24" x 36"'
                    className="w-full px-4 py-3 rounded-xl border dark:border-gray-200 border-slate-700 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="text-sm font-bold flex items-center gap-2">
                      <LuBadgeDollarSign
                        className="text-purple-600 dark:text-purple-400"
                        size={20}
                      />
                      Price (USD) <span className="text-xs">(Optional)</span>
                    </span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 rounded-xl border dark:border-gray-200 border-slate-700 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Visibility */}
              <div className="form-control">
                <label className="label">
                  <span className="text-sm font-bold flex items-center gap-2">
                    <FaEye
                      className="text-purple-600 dark:text-purple-400"
                      size={20}
                    />
                    Visibility <span className="text-red-500">*</span>
                  </span>
                </label>
                <div className="flex gap-4">
                  {["public", "private"].map((mode) => (
                    <label
                      key={mode}
                      className="flex items-center gap-2 cursor-pointer px-6 py-3 rounded-xl border dark:border-gray-200 border-slate-700 hover:border-purple-300 dark:hover:border-purple-500/50 transition-all"
                    >
                      <input
                        type="radio"
                        name="visibility"
                        value={mode}
                        className="w-4 h-4 accent-purple-600"
                        defaultChecked={mode === "public"}
                      />
                      <span className="font-medium capitalize">{mode}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Read-only User Info */}
              <div className="rounded-2xl p-6 border-2 dark:border-purple-100 border-slate-700 transition-all">
                <h3 className="text-sm font-bold  mb-4 flex items-center gap-2">
                  <FaUser
                    className="text-purple-600 dark:text-purple-400"
                    size={18}
                  />
                  Artist Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs  mb-1 block">Name</label>
                    <input
                      type="text"
                      value={user?.displayName || "Anonymous"}
                      className="w-full px-4 py-2 rounded-lg border dark:border-purple-200 border-slate-700 cursor-not-allowed"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="text-xs mb-1 block">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user?.email || ""}
                      className="w-full px-4 py-2 rounded-lg border dark:border-purple-200 border-slate-700 cursor-not-allowed"
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
                  className="w-full py-4 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-md"></span>
                  ) : (
                    <>
                      <FaPlus size={20} color="#fff" />
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
