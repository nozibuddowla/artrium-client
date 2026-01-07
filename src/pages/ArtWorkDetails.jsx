import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import MyContainer from "../components/MyContainer";
import Loader from "../components/Loader";
import { FaHeart, FaStar } from "react-icons/fa6";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const ArtWorkDetails = () => {
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:3000/artworks/${id}`)
      .then((res) => res.json())
      .then((data) => {
        //   console.log(data);
        setArtwork(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching artworks:", err);
        setLoading(false);
      });
  }, []);

  // console.log(artworks);

  const handleLike = () => {
    fetch(`http://localhost:3000/artworks/${id}/like`, { method: "PATCH" })
      .then((res) => res.json())
      .then(() => {
        // Update local state to show the new like count immediately
        setArtwork({ ...artwork, likes: (artwork.likes || 0) + 1 });
      });
  };

  const handleFavorite = () => {
    if (!user) return Swal.fire("Error", "Please login first!", "error");
    const favoriteItem = {
      artworkId: artwork._id,
      title: artwork.title,
      imageUrl: artwork.imageUrl,
      userName: artwork.userName,
      price: artwork.price,
      userEmail: user.email,
    };

    fetch("http://localhost:3000/favorites", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(favoriteItem),
    })
      .then((res) => {
        if (res.status === 400) {
          Swal.fire(
            "Note",
            "This artwork is already in your favorites!",
            "info"
          );
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.insertedId) {
          Swal.fire("Added!", "Added to your favorites.", "success");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        Swal.fire("Error", "Something went wrong.", "error");
      });
  };

  

  if (loading) {
    return (
      <div>
        <MyContainer>
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        </MyContainer>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div>
        <MyContainer>
          <div className="flex flex-col justify-center items-center my-10">
            <h1 className="font-bold text-2xl">Artwork not found!</h1>
          </div>
        </MyContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <MyContainer>
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold">{artwork?.title}</h1>
          <p className="text-xl text-gray-600 mt-2">By {artwork?.userName}</p>
          <div className="mt-8">
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="w-full max-h-150 object-contain rounded-lg shadow-xl"
            />
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Details</h3>
              <div className="space-y-3">
                <p>
                  <span className="font-semibold">Category:</span>{" "}
                  {artwork.category}
                </p>
                <p>
                  <span className="font-semibold">Medium:</span>{" "}
                  {artwork.medium}
                </p>
                <p>
                  <span className="font-semibold">Dimensions:</span>{" "}
                  {artwork.dimensions}
                </p>
                <p>
                  <span className="font-semibold">Price:</span> ${artwork.price}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {artwork.description}
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <button
                onClick={handleLike}
                className="btn bg-red-50 text-red-600 border-red-200 hover:bg-red-600 hover:text-white rounded-full px-8"
              >
                <FaHeart /> Like ({artwork.likes || 0})
              </button>

              <button
                onClick={handleFavorite}
                className="btn bg-[#C89446] text-white hover:bg-[#b0823b] border-none rounded-full px-8"
              >
                <FaStar /> Add to Favorites
              </button>
            </div>

            <div className="p-8 bg-gray-50 rounded-2xl flex items-center gap-6">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-[#C89446] ring-offset-base-100 ring-offset-2">
                  {/* Placeholder or artist photo if available */}
                  <img src={artwork.userPhoto} alt={artwork.userName} />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold">
                  {artwork.userName}
                </h3>
                <p className="text-gray-500">{artwork.userEmail}</p>
                <div className="mt-2 inline-block bg-purple-100 text-purple-700 font-bold px-3 py-1 rounded-full text-lg">
                  {artwork.artistTotalCount} Artworks
                </div>
              </div>
            </div>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default ArtWorkDetails;
