import React, { useContext, useEffect, useState } from "react";
import MyContainer from "../components/MyContainer";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import { Link } from "react-router";
import {
  MdDelete,
  MdOutlineDescription,
  MdOutlineZoomOutMap,
} from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { LuBadgeDollarSign, LuTag } from "react-icons/lu";
import { GoPencil } from "react-icons/go";
import { CiImageOn } from "react-icons/ci";
import { LiaComment } from "react-icons/lia";
import { FaEye } from "react-icons/fa6";
import Swal from "sweetalert2";

const MyGallery = () => {
  const [myArtworks, setMyArtworks] = useState([]);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const { user } = useContext(AuthContext);

  const loadArtworks = async () => {
    const res = await axios.get(
      `http://localhost:3000/my-gallery?email=${user?.email}`
    );
    setMyArtworks(res.data);
  };

  useEffect(() => {
    if (user?.email) {
      loadArtworks();
    }
  }, [user?.email]);

  //   console.log(myArtworks);

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

  // --- UPDATE HNADLER ---
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const id = form.id.value;

    const visibilityValue =
      form.visibility.value || selectedArtwork?.visibility;

    const updatedData = {
      title: form.title.value,
      category: form.category.value,
      medium: form.medium.value,
      description: form.description.value,
      price: form.price.value,
      visibility: visibilityValue,
      dimensions: form.dimensions.value,
      imageUrl: form.imageUrl.value,
    };

    try {
      const res = await axios.put(
        `http://localhost:3000/artworks/${id}`,
        updatedData
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "Artwork updated successfully", "success");
        document.getElementById("update-modal").checked = false; // Close DaisyUI modal
        loadArtworks(); // Refresh list
      }
    } catch (err) {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  // --- DELETE HANDLER ---
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.delete(`http://localhost:3000/artworks/${id}`);

        Swal.fire("Deleted!", "Your artwork has been removed.", "success");
        setMyArtworks(myArtworks.filter((art) => art._id !== id));
      }
    });
  };

  return (
    <div
      className="py-16 px-5 bg-cover bg-center bg-no-repeat bg-fixed min-h-screen w-full"
      style={{
        backgroundImage: "url('/newsletter-bg.png')",
        backgroundSize: "cover",
      }}
    >
      <title>My Artworks</title>
      <MyContainer>
        <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">
          My Artworks
        </h1>
        <div className="overflow-x-auto rounded-box border border-white/20 bg-white/40 backdrop-blur-md shadow-xl">
          <table className="table table-pin-rows table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Medium</th>
                <th>Dimension</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {myArtworks.map((artWork) => (
                <tr key={artWork._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/artwork/details/${artWork?._id}`}
                        className="avatar"
                      >
                        <div className="mask mask-squircle h-16 w-16">
                          <img src={artWork?.imageUrl} alt={artWork?.title} />
                        </div>
                      </Link>
                      <div>
                        <Link
                          to={`/artwork/details/${artWork?._id}`}
                          className="font-bold"
                        >
                          {artWork?.title}
                        </Link>
                        <div className="text-sm opacity-50">
                          {artWork.category}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td> {artWork?.medium} </td>
                  <td> {artWork?.dimensions} </td>
                  <td> {artWork?.price} </td>
                  <td className="flex items-center gap-2">
                    <button
                      onClick={() => handleDelete(artWork?._id)}
                      className="btn btn-error"
                    >
                      <MdDelete size={18} color="white" />
                    </button>
                    <label
                      htmlFor="update-modal"
                      className="btn bg-linear-to-br from-[#632ee3] to-[#9f62f2]"
                      onClick={() => setSelectedArtwork(artWork)}
                    >
                      <FaEdit size={18} color="white" />
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <input
          type="checkbox"
          id="update-modal"
          className="modal-toggle"
        />
        <div className="modal bg-black/50 backdrop-blur-sm">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg">Update Artwork</h3>
            <form
              onSubmit={handleUpdate}
              key={selectedArtwork?._id}
              className="space-y-4 mt-4"
            >
              <input
                type="hidden"
                name="id"
                defaultValue={selectedArtwork?._id}
              />

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
                  defaultValue={selectedArtwork?.imageUrl}
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
                  defaultValue={selectedArtwork?.title}
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
                    defaultValue={selectedArtwork?.category}
                    required
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
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
                    defaultValue={selectedArtwork?.medium}
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
                  defaultValue={selectedArtwork?.description}
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
                    defaultValue={selectedArtwork?.dimensions}
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
                    defaultValue={selectedArtwork?.price}
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
                      defaultChecked={selectedArtwork?.visibility === "public"}
                    />
                    <span className="text-gray-700 font-medium">Public</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer px-6 py-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-purple-300 transition-all">
                    <input
                      type="radio"
                      name="visibility"
                      value="private"
                      className="w-4 h-4 accent-purple-600"
                      defaultChecked={selectedArtwork?.visibility === "private"}
                    />
                    <span className="text-gray-700 font-medium">Private</span>
                  </label>
                </div>
              </div>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <label htmlFor="update-modal" className="btn">
                  Close
                </label>
              </div>
            </form>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default MyGallery;
