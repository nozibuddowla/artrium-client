import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Loader from "../components/Loader";
import MyContainer from "../components/MyContainer";
import Swal from "sweetalert2";
import axios from "axios";
import { Fade, Slide } from "react-awesome-reveal";
import { Link } from "react-router";

const MyFavorites = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);

        if (user?.email) {
          const response = await axios.get(
            `https://artrium-server.vercel.app/favorites?email=${user.email}`
          );
          setFavorites(response.data);
        }
      } catch (err) {
        console.error("Error fetching artworks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  const handleUnfavorite = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove the item from favorites!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#C89446",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://artrium-server.vercel.app/favorites/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              const remaining = favorites.filter((fav) => fav._id !== id);
              setFavorites(remaining);
              Swal.fire("Removed!", "Artwork removed.", "success");
            }
          });
      }
    });
  };

  if (loading) return <Loader />;

  return (
    <div className="py-10 px-5">
      <MyContainer>
        <Slide direction="left" triggerOnce>
          <h2 className="text-3xl font-bold mb-8">My Favorites</h2>
        </Slide>
        {favorites.length === 0 ? (
          <Fade>
            <p>You haven't added any favorites yet.</p>
          </Fade>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Fade cascade damping={0.1}>
              {favorites.map((item) => (
                <div
                  key={item._id}
                  className="group relative overflow-hidden rounded-2xl shadow-lg aspect-square"
                >
                  <img
                    src={item.imageUrl}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <Link
                      className="text-white text-xl font-bold"
                      to={`/artwork/details/${item.artworkId}`}
                    >
                      {item.title}
                    </Link>
                    <p className="text-white">{item.userName}</p>
                    <div className="card-actions mt-4">
                      <button
                        onClick={() => handleUnfavorite(item._id)}
                        className="btn btn-error btn-outline hover:text-white w-full"
                      >
                        Unfavorite
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Fade>
          </div>
        )}
      </MyContainer>
    </div>
  );
};

export default MyFavorites;
