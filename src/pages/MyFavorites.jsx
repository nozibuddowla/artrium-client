import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Loader from "../components/Loader";
import MyContainer from "../components/MyContainer";
import Swal from "sweetalert2";

const MyFavorites = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/favorites?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setFavorites(data);
          setLoading(false);
        });
    }
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
        fetch(`http://localhost:3000/favorites/${id}`, { method: "DELETE" })
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
        <h2 className="text-3xl font-bold mb-8">My Favorites</h2>
        {favorites.length === 0 ? (
          <p>You haven't added any favorites yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((item) => (
              <div key={item._id} className="card bg-base-100 shadow-xl border">
                <figure className="px-4 pt-4">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="rounded-xl h-48 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{item.title}</h2>
                  <p>By {item.userName}</p>
                  <p className="font-bold bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    ${item.price}
                  </p>
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
          </div>
        )}
      </MyContainer>
    </div>
  );
};

export default MyFavorites;
