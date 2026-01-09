import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import MyContainer from "../components/MyContainer";
import Loader from "../components/Loader";
import { FaHeart, FaStar } from "react-icons/fa6";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";

const ArtWorkDetails = () => {
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const loadArtworksDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://artrium-server.vercel.app/artworks/${id}`
      );
      setArtwork(res.data);
    } catch (err) {
      console.error("Failed to load artwork details", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (user?.email && id) {
        try {
          const res = await axios.get(
            `https://artrium-server.vercel.app/favorites?email=${user.email}`
          );
          // Check if current artwork ID exists in user's favorites list
          const favorite = res.data.some((fav) => fav.artworkId === id);
          setIsFavorite(favorite);
        } catch (err) {
          console.error("Error checking favorite status", err);
        }
      }
    };

    loadArtworksDetails();
    checkFavoriteStatus();
  }, [id, user]);

  // console.log(artworks);

  const handleLike = async () => {
    if (!user) {
      return Swal.fire("Error", "Please login to like this artwork!", "error");
    }

    try {
      // Axios patch: URL, then Data, then Config
      const response = await axios.patch(
        `https://artrium-server.vercel.app/artworks/${id}/like`,
        {
          userEmail: user.email,
        }
      );

      if (response.data.modifiedCount > 0) {
        // Logic to update the local state so the UI reflects the change
        const adjustment = response.data.isLiked ? 1 : -1;
        setArtwork({
          ...artwork,
          likes: (artwork.likes || 0) + adjustment,
        });

        // Show toast based on whether it was a like or unlike
        if (response.data.isLiked) {
          toast.success("Added to liked artworks!");
        } else {
          toast.info("Removed from liked artworks.");
        }
      }
    } catch (err) {
      console.error("Failed to like:", err);
      toast.error("Something went wrong!");
    }
  };

  const handleFavorite = async () => {
    if (!user) return Swal.fire("Error", "Please login first!", "error");
    if (isFavorite)
      return Swal.fire("Info", "This is already in your collection.", "info");

    const favoriteItem = {
      artworkId: artwork._id,
      title: artwork.title,
      imageUrl: artwork.imageUrl,
      userName: artwork.userName,
      price: artwork.price,
      userEmail: user.email,
    };

    try {
      const response = await axios.post(
        "https://artrium-server.vercel.app/favorites",
        favoriteItem
      );

      if (response.data.insertedId) {
        setIsFavorite(true);
        Swal.fire({
          title: "Added!",
          text: "Added to your favorites.",
          icon: "success",
          confirmButtonColor: "#C89446",
        });
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setIsFavorite(true);
        Swal.fire("Note", "This artwork is already in your favorites!", "info");
      } else {
        console.error("Error saving favorite:", err);
        Swal.fire("Error", "Something went wrong while saving.", "error");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center transition-colors">
        <MyContainer>
          <Loader />
        </MyContainer>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="min-h-screen dark:bg-slate-900 transition-colors">
        <MyContainer>
          <div className="flex flex-col justify-center items-center py-20">
            <h1 className="font-bold text-2xl">Artwork not found!</h1>
          </div>
        </MyContainer>
      </div>
    );
  }

  return (
    <div className="py-20">
      <MyContainer>
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold">{artwork?.title}</h1>
          <p className="text-xl mt-2">By {artwork?.userName}</p>

          <div className="mt-8">
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="w-full max-h-150 object-contain rounded-lg shadow-xl"
            />
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 border-b dark:border-slate-700 pb-2">
                Details
              </h3>
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
              <h3 className="text-2xl font-bold mb-4 border-b dark:border-slate-700 pb-2">
                Description
              </h3>
              <p className="leading-relaxed">{artwork.description}</p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleLike}
                className="btn bg-red-100 text-red-600 border-red-900 hover:bg-red-600 hover:text-white rounded-full px-8 transition-all"
              >
                <FaHeart /> Like ({artwork.likes || 0})
              </button>

              <button
                onClick={handleFavorite}
                disabled={isFavorite}
                className={`btn rounded-full px-8 shadow-lg transition-all duration-500 border-none ${
                  isFavorite
                    ? "bg-green-600 text-white cursor-default scale-105"
                    : "bg-[#C89446] text-white hover:bg-[#b0823b] hover:scale-105 shadow-yellow-900/20"
                }`}
              >
                {isFavorite ? (
                  <>
                    <FaStar className="text-yellow-300" /> In Favorites
                  </>
                ) : (
                  <>
                    <FaStar /> Add to Favorites
                  </>
                )}
              </button>
            </div>

            <div className="p-6 rounded-2xl flex items-center gap-6 border">
              <div className="avatar">
                <div className="w-20 rounded-full ring ring-[#C89446] ring-offset-base-100 dark:ring-offset-slate-800 ring-offset-2">
                  <Link to={`/artist/${artwork.userEmail}`}>
                    <img
                      src={artwork.userPhoto}
                      alt={artwork.userName}
                      className="object-cover"
                    />
                  </Link>
                </div>
              </div>
              <div>
                <Link to={`/artist/${artwork.userEmail}`}>
                  <h3 className="text-xl font-bold hover:text-[#C89446] transition-colors">
                    {artwork.userName}
                  </h3>
                </Link>
                <p className="text-sm">{artwork.userEmail}</p>
                <div className="mt-2 inline-block bg-purple-900/40 font-bold px-3 py-1 rounded-full text-sm">
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
